require "net/http"
require "json"

class SystemDesignService
  def generate_response(question)
    uri = URI("https://api.anthropic.com/v1/messages")

    request = Net::HTTP::Post.new(uri)
    request["x-api-key"] = Rails.application.credentials.dig(:anthropic, :api_key)
    request["anthropic-version"] = "2023-06-01"
    request["content-type"] = "application/json"

    request.body = {
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: "You are a system design interview tutor. Answer this question with BOTH a concise explanation AND a mermaid diagram showing the architecture.

CRITICAL: Format the diagram in a ```mermaid code block. Use simple graph syntax like:
```mermaid
graph TB
    A[Component] --> B[Component]
    B --> C[Component]
```

Question: #{question}"
        }
      ]
    }.to_json

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true, verify_mode: OpenSSL::SSL::VERIFY_NONE) do |http|
      http.request(request)
    end

    result = JSON.parse(response.body)
    result.dig("content", 0, "text")
  end
end
