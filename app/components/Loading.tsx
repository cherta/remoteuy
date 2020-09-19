import useInterval from "react-useinterval"
import { useState } from "react"

export const phrases = [
  "Haciendo el mate 🧉",
  "Leyendo El País 🗞",
  "⚽️ Mirando el 5to clásico del mes",
  "Como un 🏙 ☀️",
  "PEÑAROL, PEÑAROL",
  "Cha cha muchacha 🕺🏿",
  "🧮 Matemáticamente, tenemos chance",
  "Lo que mata es la humedad",
  "Mozo! un faina de orillo",
]

function getSample(phrases: String[]) {
  return phrases[Math.floor(Math.random() * phrases.length)]
}

export default function Loading() {
  const [phrase, setPhrase] = useState(getSample(phrases))
  const changePhrase = () => {
    setPhrase(getSample(phrases))
  }
  useInterval(changePhrase, 1000)
  return (
    <div className="mt-32 flex justify-center">
      <div className="text-black">{phrase}</div>
    </div>
  )
}
