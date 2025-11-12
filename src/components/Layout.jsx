import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, Mail, Instagram, Linkedin } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/playground', label: 'Playground' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FAF7F1] text-[#0F172A]">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight text-slate-900">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0E2B4A] mr-2 align-middle"/> I&P Design
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((n) => (
              <NavLink key={n.to} to={n.to} className={({isActive}) => `text-sm font-medium hover:text-[#0E2B4A] transition-colors ${isActive ? 'text-[#0E2B4A]' : 'text-slate-600'}`}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="md:hidden">
            <button onClick={()=>setOpen(!open)} className="p-2 rounded-md border border-slate-300 bg-white/80"><Menu size={18}/></button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white/90">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
              {navItems.map((n) => (
                <NavLink onClick={()=>setOpen(false)} key={n.to} to={n.to} className={({isActive}) => `py-2 ${isActive ? 'text-[#0E2B4A]' : 'text-slate-700'}`}>
                  {n.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4">
        <Outlet />
      </main>

      <footer className="mt-20 border-t border-slate-200/70">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Industrial & Product Design Portfolio</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#0E2B4A] flex items-center gap-1"><Instagram size={16}/> Instagram</a>
            <a href="#" className="hover:text-[#0E2B4A] flex items-center gap-1"><Linkedin size={16}/> LinkedIn</a>
            <a href="/contact" className="hover:text-[#0E2B4A] flex items-center gap-1"><Mail size={16}/> Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
