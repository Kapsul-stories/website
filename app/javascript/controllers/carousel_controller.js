import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["track", "slide", "dots"]

  connect() {
    this.currentIndex = 0
    this.buildDots()
    this.update()
  }

  buildDots() {
    const count = this.slideTargets.length
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < count; i++) {
      const dot = document.createElement("button")
      dot.classList.add("carousel-dot")
      dot.setAttribute("aria-label", `Aller au slide ${i + 1}`)
      dot.dataset.index = i
      dot.dataset.action = "carousel#goTo"
      fragment.appendChild(dot)
    }

    this.dotsTarget.innerHTML = ""
    this.dotsTarget.appendChild(fragment)
  }

  prev() {
    this.currentIndex = this.currentIndex > 0
      ? this.currentIndex - 1
      : this.slideTargets.length - 1
    this.update()
  }

  next() {
    this.currentIndex = this.currentIndex < this.slideTargets.length - 1
      ? this.currentIndex + 1
      : 0
    this.update()
  }

  goTo(event) {
    this.currentIndex = parseInt(event.currentTarget.dataset.index)
    this.update()
  }

  update() {
    const offset = this.currentIndex * -100
    this.trackTarget.style.transform = `translateX(${offset}%)`

    this.dotsTarget.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("carousel-dot--active", i === this.currentIndex)
    })
  }
}
