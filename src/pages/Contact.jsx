import { useState } from 'react'
import { submitContact } from '../lib/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending…')
    try {
      await submitContact(form)
      setStatus('Thanks! I will get back to you shortly.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (e) {
      setStatus('Something went wrong. Please try again later.')
    }
  }

  return (
    <div className="py-10 max-w-xl">
      <h1 className="text-3xl font-semibold text-slate-900">Contact</h1>
      <p className="mt-2 text-slate-700">Let's collaborate. Fill out the form or reach me on social.</p>
      <form onSubmit={onSubmit} className="mt-6 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm text-slate-600">Name</label>
          <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E2B4A]" required />
        </div>
        <div>
          <label className="block text-sm text-slate-600">Email</label>
          <input type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E2B4A]" required />
        </div>
        <div>
          <label className="block text-sm text-slate-600">Subject</label>
          <input value={form.subject} onChange={(e)=>setForm({...form, subject:e.target.value})} className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E2B4A]" />
        </div>
        <div>
          <label className="block text-sm text-slate-600">Message</label>
          <textarea value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} className="mt-1 w-full border rounded-lg px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-[#0E2B4A]" required />
        </div>
        <button className="px-5 py-2.5 rounded-full bg-[#0E2B4A] text-white hover:bg-[#133A63]">Send</button>
      </form>
      {status && <p className="mt-3 text-slate-700">{status}</p>}
    </div>
  )
}
