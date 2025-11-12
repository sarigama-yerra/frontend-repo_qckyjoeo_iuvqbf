import { useEffect, useRef, useState } from 'react'

// A tiny "orbit dots" playground: drag to create dots, they gently orbit a center
export default function Playground() {
  const canvasRef = useRef(null)
  const [dots, setDots] = useState([])
  const [center, setCenter] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      setCenter({ x: canvas.width / 2, y: canvas.height / 2 })
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let raf
    const render = (t) => {
      ctx.fillStyle = '#FAF7F1'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      dots.forEach((d, i) => {
        const angle = t * 0.0003 + d.phase
        const r = d.radius + Math.sin(t * 0.001 + i) * 6
        const x = center.x + Math.cos(angle) * r
        const y = center.y + Math.sin(angle) * r
        ctx.beginPath()
        ctx.arc(x, y, d.size, 0, Math.PI * 2)
        ctx.fillStyle = d.color
        ctx.fill()
      })

      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [dots, center])

  const handleAdd = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const dx = x - center.x
    const dy = y - center.y
    const radius = Math.sqrt(dx*dx + dy*dy)
    const phase = Math.atan2(dy, dx)
    const palette = ['#0E2B4A', '#1D3E6E', '#F1EADB', '#A87144']
    const color = palette[Math.floor(Math.random()*palette.length)]
    setDots(d => [...d, { radius, phase, size: 3 + Math.random()*3, color }])
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold text-slate-900">Playground</h1>
      <p className="mt-2 text-slate-700">Click anywhere to drop a dot. They orbit softly around the center.</p>
      <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200">
        <canvas ref={canvasRef} onClick={handleAdd} className="block w-full h-[50vh] bg-[#FAF7F1]"/>
      </div>
    </div>
  )
}
