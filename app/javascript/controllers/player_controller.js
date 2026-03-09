import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["btn", "playIcon", "pauseIcon", "waveform", "bar", "time"]

  connect() {
    this.playing = false
    this.progress = 0
    this.totalSeconds = 154 // 2:34
    this.interval = null
  }

  disconnect() {
    this.stop()
  }

  toggle() {
    this.playing ? this.pause() : this.play()
  }

  play() {
    this.playing = true
    this.playIconTarget.style.display = "none"
    this.pauseIconTarget.style.display = "block"

    this.interval = setInterval(() => {
      this.progress += 1
      if (this.progress >= this.totalSeconds) {
        this.stop()
        return
      }
      this.updateTime()
      this.updateBars()
    }, 1000)
  }

  pause() {
    this.playing = false
    this.playIconTarget.style.display = "block"
    this.pauseIconTarget.style.display = "none"
    clearInterval(this.interval)
    this.barTargets.forEach(bar => bar.classList.remove("active"))
  }

  stop() {
    this.pause()
    this.progress = 0
    this.timeTarget.textContent = "0:00"
    this.barTargets.forEach(bar => {
      bar.classList.remove("played", "active")
    })
  }

  updateTime() {
    const m = Math.floor(this.progress / 60)
    const s = this.progress % 60
    this.timeTarget.textContent = `${m}:${s.toString().padStart(2, "0")}`
  }

  updateBars() {
    const ratio = this.progress / this.totalSeconds
    const total = this.barTargets.length
    const playedCount = Math.floor(ratio * total)
    const activeIndex = playedCount

    this.barTargets.forEach((bar, i) => {
      bar.classList.remove("played", "active")
      if (i < playedCount) {
        bar.classList.add("played")
      } else if (i === activeIndex) {
        bar.classList.add("active")
      }
    })
  }
}
