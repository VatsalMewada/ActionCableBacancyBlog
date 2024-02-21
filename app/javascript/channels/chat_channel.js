import consumer from "channels/consumer"

consumer.subscriptions.create("ChatChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("connected")
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel

    const messages = document.querySelector("#messages");
    const messageHTML = `<p><p><strong>${data.user.email}:</strong></p> ${data.message.content}</p>`;
    messages.insertAdjacentHTML("beforeend", messageHTML);
    messages.lastElementChild.scrollIntoView({behavior: "smooth"})

    // Clear the text field if the message was sent by the current user
    if (data.message.user_id === currentUserId) {
      const textField = document.querySelector("#message_content");
      if (textField) {
        textField.value = "";
      }
    }
  }
});
