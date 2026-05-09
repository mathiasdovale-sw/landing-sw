"use client"
import { useEffect } from "react"

export default function RevealObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            obs.unobserve(e.target)
          }
        })
      },
      { rootMargin: "-8% 0px" }
    )

    const observe = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => obs.observe(el))
    }

    observe()

    const mut = new MutationObserver(observe)
    mut.observe(document.body, { childList: true, subtree: true })

    return () => {
      obs.disconnect()
      mut.disconnect()
    }
  }, [])

  return null
}
