import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero({ portraitUrl }) {
  return (
    <section className="relative h-[80vh] md:h-[88vh] w-full overflow-hidden rounded-2xl mt-6">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0E2B4A]/40 via-[#0E2B4A]/20 to-transparent pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between px-6 md:px-12 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-white max-w-xl">
          <p className="uppercase tracking-[0.2em] text-sm/relaxed opacity-90">Portfolio</p>
          <h1 className="text-4xl md:text-6xl font-semibold drop-shadow-sm">Industrial & Product Design</h1>
          <p className="mt-4 text-white/90">
            Crafting thoughtful physical and digital experiences. Blending utility, emotion, and sustainability.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/work" className="bg-[#0E2B4A] hover:bg-[#133A63] text-white px-5 py-2.5 rounded-full transition-colors">View Work</Link>
            <Link to="/contact" className="bg-white/90 hover:bg-white text-[#0E2B4A] px-5 py-2.5 rounded-full transition-colors">Contact</Link>
          </div>
        </motion.div>

        {portraitUrl && (
          <motion.img
            src={portraitUrl}
            alt="Portrait"
            className="w-44 h-56 md:w-56 md:h-72 object-cover rounded-2xl border-4 border-white/70 shadow-xl mt-6 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          />
        )}
      </div>
    </section>
  )
}
