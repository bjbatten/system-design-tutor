class MessagesController < ApplicationController
  def create
    @conversation = Conversation.find(params[:conversation_id])
    @message = @conversation.messages.build(message_params)

    if @message.save
      # Call Claude API
      service = SystemDesignService.new
      ai_response = service.generate_response(@message.content)

      @response = @conversation.messages.create!(
        role: "assistant",
        content: ai_response
      )

      @messages = @conversation.messages.order(created_at: :asc)

      render turbo_stream: turbo_stream.replace(
        "messages",
        partial: "messages/messages",
        locals: { messages: @messages }
      )
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :role)
  end
end
