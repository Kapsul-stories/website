import { Controller } from "@hotwired/stimulus"

const TRACKS = [
  {
    badge:    "📍 Grenoble · Muséum d'Histoire Naturelle",
    category: "🌿 Nature",
    title:    "Un éléphant plus vrai que nature",
    duration: "2 min 34",
    author:   "Marie T.",
    avatar:   "/assets/avatar/avatar1.jpg",
    seconds:  154,
  },
  {
    badge:    "📍 Lyon · Place des Jacobins",
    category: "🏛️ Architecture",
    title:    "La légende de la fontaine aux quatre fleuves",
    duration: "1 min 58",
    author:   "Thomas R.",
    avatar:   "/assets/avatar/avatar3.jpg",
    seconds:  118,
  },
  {
    badge:    "📍 Lyon · Croix-Rousse",
    category: "🧵 Histoire",
    title:    "Les canuts, tisserands de soie",
    duration: "3 min 12",
    author:   "Sophie L.",
    avatar:   "/assets/avatar/avatar2.jpg",
    seconds:  192,
  },
]

export default class extends Controller {
  static targets = ["btn", "playIcon", "pauseIcon", "bar", "time", "badge", "category", "title", "duration", "author", "avatar"]

  connect() {
    this.playing = false
    this.progress = 0
    this.currentIndex = 0
    this.totalSeconds = TRACKS[0].seconds
    this.interval = null
  }

  disconnect() {
    this.stop()
  }

  toggle() {
    this.playing ? this.pause() : this.play()
  }

  prev() {
    this.stop()
    this.currentIndex = (this.currentIndex - 1 + TRACKS.length) % TRACKS.length
    this.loadTrack()
  }

  next() {
    this.stop()
    this.currentIndex = (this.currentIndex + 1) % TRACKS.length
    this.loadTrack()
  }

  loadTrack() {
    const track = TRACKS[this.currentIndex]
    this.badgeTarget.textContent    = track.badge
    this.categoryTarget.textContent = track.category
    this.titleTarget.textContent    = track.title
    this.durationTarget.textContent = track.duration
    this.authorTarget.textContent   = track.author
    this.avatarTarget.src           = track.avatar
    this.totalSeconds               = track.seconds
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
    this.barTargets.forEach(bar => bar.classList.remove("played", "active"))
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

    this.barTargets.forEach((bar, i) => {
      bar.classList.remove("played", "active")
      if (i < playedCount) {
        bar.classList.add("played")
      } else if (i === playedCount) {
        bar.classList.add("active")
      }
    })
  }
}
