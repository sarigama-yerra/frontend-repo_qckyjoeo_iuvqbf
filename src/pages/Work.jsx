import { useEffect, useMemo, useState } from 'react'
import { fetchProjects } from '../lib/api'
import { motion } from 'framer-motion'

const categories = ['All','Industrial','Furniture','UI','CMF']

export default function Work() {
  const [active, setActive] = useState('All')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchProjects(active === 'All' ? undefined : active)
      .then((res) => mounted && setData(res.projects || []))
      .catch(() => mounted && setError('Failed to load'))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [active])

  const items = useMemo(() => data, [data])

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold text-slate-900">Selected Work</h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c)=> (
          <button key={c} onClick={()=>setActive(c)} className={`px-4 py-2 rounded-full border transition-colors ${active===c? 'bg-[#0E2B4A] text-white border-[#0E2B4A]' : 'bg-white text-slate-700 border-slate-300 hover:border-[#0E2B4A] hover:text-[#0E2B4A]'}`}>
            {c}
          </button>
        ))}
      </div>

      {loading && <p className="mt-8 text-slate-600">Loading projects…</p>}
      {error && <p className="mt-8 text-red-600">{error}</p>}

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p, idx) => (
          <motion.a key={p.id || p.slug || idx} href={`/project/${p.slug}`} className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 block" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.45, delay: idx*0.03}}>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.thumbnail_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
            </div>
            <div className="p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">{p.category}</div>
              <div className="mt-1 font-medium text-slate-900">{p.title}</div>
              <div className="text-sm text-slate-600 line-clamp-2">{p.summary}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
