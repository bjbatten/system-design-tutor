import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input"]
  
  clearInput(event) {
    // Clear input after form submits
    setTimeout(() => {
      this.inputTarget.value = ""
    }, 100)
  }
}