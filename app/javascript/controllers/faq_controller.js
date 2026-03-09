import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["item", "answer"]

  toggle(event) {
    const item = event.currentTarget.closest('[data-faq-target="item"]')
    const answer = item.querySelector('[data-faq-target="answer"]')
    const icon = item.querySelector('.faq-icon')
    
    // Toggle active class
    item.classList.toggle('active')
    
    // Toggle answer visibility with smooth transition
    if (item.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + "px"
      icon.style.transform = "rotate(45deg)"
    } else {
      answer.style.maxHeight = "0"
      icon.style.transform = "rotate(0deg)"
    }
  }
}
