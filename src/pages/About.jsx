import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="py-10">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <motion.img src="/portrait.jpg" alt="Portrait" className="rounded-2xl border border-slate-200 w-full" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.6}}/>
        <div className="md:col-span-2">
          <h1 className="text-3xl font-semibold text-slate-900">About</h1>
          <p className="mt-4 text-slate-700">I'm an Industrial & Product Design student focused on human-centered innovation, CMF strategy, and elegant manufacturing. I love prototyping, photography, and building tactile interactions.</p>

          <h3 className="mt-8 font-medium text-slate-900">Tools</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {['SolidWorks','Fusion 360','KeyShot','Blender','Adobe CC','Figma','Arduino','3D Printing'].map(t => (
              <span key={t} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">{t}</span>
            ))}
          </div>

          <a href="#" className="inline-block mt-8 px-5 py-2.5 rounded-full bg-[#0E2B4A] text-white hover:bg-[#133A63]">Download Resume</a>
        </div>
      </div>
    </div>
  )
}
