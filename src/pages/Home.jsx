import Hero from '../components/Hero'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="py-8">
      <Hero portraitUrl="/portrait.jpg" />

      <section className="mt-12 grid md:grid-cols-3 gap-6">
        {[1,2,3].map((i) => (
          <motion.div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/70" initial={{opacity:0, y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5, delay:i*0.05}}>
            <h3 className="font-semibold text-slate-900">Focus Area {i}</h3>
            <p className="text-slate-600 mt-2 text-sm">Industrial design, CMF strategy, and human-centered prototyping.</p>
            <Link to="/work" className="text-[#0E2B4A] inline-block mt-3">See projects →</Link>
          </motion.div>
        ))}
      </section>
    </div>
  )
}
