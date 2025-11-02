import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input"]
  
  showLoading() {
    // Remove any existing loading bubble first
    const existingBubble = document.getElementById('loading-bubble')
    if (existingBubble) {
      existingBubble.remove()
    }

    // Add a temporary loading message bubble
    const turboFrame = document.getElementById('messages')
    if (turboFrame) {
      const loadingBubble = document.createElement('div')
      loadingBubble.id = 'loading-bubble'
      loadingBubble.className = 'mb-4 text-left'
      loadingBubble.innerHTML = `
        <div class="inline-block bg-gray-200 rounded-lg px-4 py-2">
          <div class="flex items-center gap-2 text-gray-600">
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Generating response...</span>
          </div>
        </div>
      `

      turboFrame.appendChild(loadingBubble)
      this.scrollToBottom()
    }
  }
  
  clearInput(event) {
    // Clear the input immediately
    this.inputTarget.value = ""

    // Note: Loading bubble removal is now handled in application.js
    // after Mermaid rendering completes to avoid race conditions
    this.scrollToBottom()
  }
  
  scrollToBottom() {
    const messagesContainer = document.getElementById('messages-container')
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }
}