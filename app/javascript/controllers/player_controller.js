import { Controller } from "@hotwired/stimulus"

const TRACKS = [
  {
    badge:    "📍 Grenoble · Muséum d'Histoire Naturelle",
    category: "🌿 Nature",
    title:    "Un éléphant plus vrai que nature",
    duration: "1 min 25",
    author:   "Robert M.",
    avatar:   "/avatars/avatar1.jpg",
    audio:    "/audio/track1.mp3",
  },
  {
    badge:    "📍 Grenoble · 2 rue Hébert",
    category: "🏛️ Architecture",
    title:    "Poma 2000, le futur inachevé",
    duration: "1 min 58",
    author:   "Sophie38",
    avatar:   "/avatars/avatar3.jpg",
    audio:    "/audio/track2.mp3",
  },
  {
    badge:    "📍 Grenoble · place Grenette",
    category: "🧵 Histoire",
    title:    "L'homme guillotiné deux fois'",
    duration: "1 min 02",
    author:   "Pauline",
    avatar:   "/avatars/avatar2.jpg",
    audio:    "/audio/track3.mp3",
  },
]

export default class extends Controller {
  static targets = ["btn", "playIcon", "pauseIcon", "bar", "time", "badge", "category", "title", "duration", "author", "avatar"]

  connect() {
    this.playing = false
    this.currentIndex = 0
    this.audio = new Audio(TRACKS[0].audio)
    this.bindAudioEvents()
  }

  disconnect() {
    this.audio.pause()
    this.audio.src = ""
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
    this.audio.src                  = track.audio
    this.timeTarget.textContent     = "0:00"
    this.barTargets.forEach(bar => bar.classList.remove("played", "active"))
  }

  play() {
    this.playing = true
    this.playIconTarget.style.display  = "none"
    this.pauseIconTarget.style.display = "block"
    this.audio.play()
  }

  pause() {
    this.playing = false
    this.playIconTarget.style.display  = "block"
    this.pauseIconTarget.style.display = "none"
    this.audio.pause()
    this.barTargets.forEach(bar => bar.classList.remove("active"))
  }

  stop() {
    this.pause()
    this.audio.currentTime = 0
    this.timeTarget.textContent = "0:00"
    this.barTargets.forEach(bar => bar.classList.remove("played", "active"))
  }

  bindAudioEvents() {
    this.audio.addEventListener("timeupdate", () => {
      if (!this.audio.duration) return
      this.updateTime()
      this.updateBars()
    })

    this.audio.addEventListener("ended", () => {
      this.stop()
    })
  }

  updateTime() {
    const t = Math.floor(this.audio.currentTime)
    const m = Math.floor(t / 60)
    const s = t % 60
    this.timeTarget.textContent = `${m}:${s.toString().padStart(2, "0")}`
  }

  updateBars() {
    const ratio = this.audio.currentTime / this.audio.duration
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
