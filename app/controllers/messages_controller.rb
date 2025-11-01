class MessagesController < ApplicationController
  def create
    @conversation = Conversation.find(params[:conversation_id])
    @message = @conversation.messages.build(message_params)

    if @message.save
      # For now, just echo back
      @response = @conversation.messages.create!(
        role: "assistant",
        content: "Echo: #{@message.content}"
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
