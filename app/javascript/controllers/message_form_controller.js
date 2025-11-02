import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input"]
  
  clearInput(event) {
    setTimeout(() => {
      this.inputTarget.value = ""
      
      // Scroll to bottom of messages
      const messagesContainer = document.getElementById('messages')
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight
      }
    }, 100)
  }
}