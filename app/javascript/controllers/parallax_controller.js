import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["phone", "pill"]

  connect() {
    this.onScroll = this.scroll.bind(this)
    window.addEventListener("scroll", this.onScroll, { passive: true })
  }

  disconnect() {
    window.removeEventListener("scroll", this.onScroll)
  }

  scroll() {
    const scrollY = window.scrollY
    const rate = 0.15

    if (this.hasPhoneTarget) {
      this.phoneTarget.style.transform = `translateY(${scrollY * rate}px)`
    }

    this.pillTargets.forEach((pill, index) => {
      const direction = index % 2 === 0 ? 1 : -1
      const speed = 0.05 + (index * 0.02)
      pill.style.transform = `translateY(${scrollY * speed * direction}px)`
    })
  }
}
