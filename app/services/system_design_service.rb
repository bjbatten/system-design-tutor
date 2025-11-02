require "net/http"
require "json"

class SystemDesignService
  CACHE_EXPIRY = 7.days

  def generate_response(question, conversation_history = [])
    # Only cache if this is the first question (no history)
    if conversation_history.empty?
      cache_key = Message.cache_key_for(question)

      cached_response = Rails.cache.read(cache_key)
      if cached_response
        Rails.logger.info "Cache HIT for: #{question[0..50]}..."
        return cached_response
      end
    end

    # No cache hit, call API
    Rails.logger.info "Cache MISS for: #{question[0..50]}..."
    response = call_claude_api(question, conversation_history)

    # Cache the response if it's a first question
    if conversation_history.empty?
      cache_key = Message.cache_key_for(question)
      Rails.cache.write(cache_key, response, expires_in: CACHE_EXPIRY)
    end

    response
  end

  private

  def call_claude_api(question, conversation_history)
    uri = URI("https://api.anthropic.com/v1/messages")

    request = Net::HTTP::Post.new(uri)
    request["x-api-key"] = Rails.application.credentials.dig(:anthropic, :api_key)
    request["anthropic-version"] = "2023-06-01"
    request["content-type"] = "application/json"

    # Build messages array with history
    messages = conversation_history.map do |msg|
      { role: msg[:role], content: msg[:content] }
    end

    # Add the new question
    messages << {
      role: "user",
      content: "You are a system design interview tutor. Answer this question with BOTH a concise explanation AND a mermaid diagram showing the architecture.

CRITICAL: Format the diagram in a ```mermaid code block. Use simple graph syntax.

Question: #{question}"
    }

    request.body = {
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: messages
    }.to_json

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true, verify_mode: OpenSSL::SSL::VERIFY_NONE) do |http|
      http.request(request)
    end

    result = JSON.parse(response.body)
    result.dig("content", 0, "text")
  end
end
