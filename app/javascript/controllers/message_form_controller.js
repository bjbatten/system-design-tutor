import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input"]

  connect() {
    // Ensure loading indicator is hidden on page load
    this.hideLoading()

    // Listen for turbo frame load to hide loading indicator
    document.addEventListener('turbo:frame-load', this.hideLoading.bind(this))
  }

  disconnect() {
    document.removeEventListener('turbo:frame-load', this.hideLoading.bind(this))
  }

  showLoading() {
    // Show loading indicator
    const loader = document.getElementById('loading-indicator')
    if (loader) {
      loader.classList.remove('hidden')
    }

    // Scroll to bottom
    this.scrollToBottom()
  }

  hideLoading() {
    const loader = document.getElementById('loading-indicator')
    if (loader) {
      loader.classList.add('hidden')
    }
  }

  clearInput(event) {
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