class MessagesController < ApplicationController
  # GET /messages or /messages.json
  def index
    @messages = Message.all
  end

  # POST /messages or /messages.json
  def create
    @message = Message.create(message_params)
    ActionCable.server.broadcast('room', { message: @message, user: @message.user })
    head :ok
  end

  private

  # Only allow a list of trusted parameters through.
  def message_params
    params.require(:message).permit(:content, :user_id)
  end
end
