import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProject } from '../lib/api'
import { motion } from 'framer-motion'

export default function Project() {
  const { slug } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    fetchProject(slug)
      .then((res)=> mounted && setData(res))
      .catch(()=> mounted && setError('Not found'))
      .finally(()=> mounted && setLoading(false))
    return ()=> { mounted = false }
  }, [slug])

  if (loading) return <p className="py-10 text-slate-600">Loading…</p>
  if (error || !data) return <p className="py-10 text-red-600">{error || 'Error'}</p>

  return (
    <article className="py-10">
      <header className="rounded-2xl overflow-hidden">
        <img src={data.hero_url || data.thumbnail_url || 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1600&auto=format&fit=crop'} alt={data.title} className="w-full h-[40vh] md:h-[60vh] object-cover"/>
      </header>

      <div className="mt-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-semibold text-slate-900">{data.title}</h1>
          <p className="mt-3 text-slate-700">{data.summary}</p>

          <section className="mt-8">
            <h3 className="font-medium text-slate-900">Process</h3>
            <p className="mt-2 text-slate-700">This section can describe research, sketches, prototypes, iterations, and testing. Replace with your story.</p>
          </section>

          <section className="mt-8">
            <h3 className="font-medium text-slate-900">Outcomes</h3>
            <ul className="mt-2 list-disc list-inside text-slate-700">
              <li>Improved ergonomics and usability</li>
              <li>Reduced manufacturing complexity</li>
              <li>Distinct brand CMF strategy</li>
            </ul>
          </section>

          <section className="mt-8 grid sm:grid-cols-2 gap-4">
            {[1,2,3,4].map((i)=> (
              <motion.img key={i} src={`https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=${900+i*10}&auto=format&fit=crop`} alt="Gallery" className="rounded-xl border border-slate-200" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.6, delay: i*0.05}}/>
            ))}
          </section>
        </div>

        <aside>
          <div className="bg-white rounded-2xl border p-5 border-slate-200 sticky top-24">
            <div className="text-xs uppercase tracking-wide text-slate-500">Category</div>
            <div className="font-medium">{data.category}</div>
            {!!(data.tools?.length) && (
              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-slate-500">Tools</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.tools.map((t)=> (
                    <span key={t} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs">{t}</span>
                  ))}
                </div>
              </div>
            )}
            {data.credits && (
              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-slate-500">Credits</div>
                <p className="text-slate-700 mt-1 text-sm">{data.credits}</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </article>
  )
}
