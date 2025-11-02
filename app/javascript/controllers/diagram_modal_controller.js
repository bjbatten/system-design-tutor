import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "content"]
  
  open(event) {
    // Get the clicked diagram SVG
    const svg = event.currentTarget.querySelector('svg')
    if (svg) {
      // Clone it
      const clonedSvg = svg.cloneNode(true)

      // Remove fixed width/height to allow scaling
      clonedSvg.removeAttribute('width')
      clonedSvg.removeAttribute('height')

      // Set it to scale responsively - use 100% width and maintain aspect ratio
      clonedSvg.style.width = '100%'
      clonedSvg.style.height = 'auto'
      clonedSvg.style.maxWidth = '100%'

      // Put in modal
      this.contentTarget.innerHTML = ''
      this.contentTarget.appendChild(clonedSvg)
      this.modalTarget.classList.remove('hidden')

      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    }
  }
  
  close() {
    this.modalTarget.classList.add('hidden')
    document.body.style.overflow = 'auto'
  }
  
  closeOnBackground(event) {
    // Only close if clicking the background, not the diagram
    if (event.target === this.modalTarget) {
      this.close()
    }
  }
}