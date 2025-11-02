import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input"]
  
  showLoading() {
    // Show loading indicator
    const loader = document.getElementById('loading-indicator')
    if (loader) {
      loader.classList.remove('hidden')
    }
    
    // Scroll to bottom
    this.scrollToBottom()
  }
  
  clearInput(event) {
    // Hide loading indicator
    const loader = document.getElementById('loading-indicator')
    if (loader) {
      loader.classList.add('hidden')
    }
    
    // Clear input
    setTimeout(() => {
      this.inputTarget.value = ""
      this.scrollToBottom()
    }, 100)
  }
  
  scrollToBottom() {
    const messagesContainer = document.getElementById('messages')
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }
}