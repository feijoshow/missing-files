import React, { useEffect, useState } from 'react'
import { useGame } from '../context/GameContext'

const LINES = [
  { t: 100,  text: 'BIOS v2.1.4 — POST sequence initiated',            dim: true },
  { t: 500,  text: '[ OK ] Memory check... 4096MB' },
  { t: 900,  text: '[ OK ] Storage device detected' },
  { t: 1300, text: '[ !! ] Filesystem corruption detected on /USER_DATA', warn: true },
  { t: 1700, text: '[ .. ] Entering SYSTEM RECOVERY MODE' },
  { t: 2100, text: 'Mounting partial index...' },
  { t: 2500, text: 'Loading desktop environment...', bright: true },
]

export default function BootScreen() {
  const { dispatch } = useGame()
  const [lines, setLines] = useState([])
  const [prog, setProg] = useState(0)

  useEffect(() => {
    LINES.forEach(l => setTimeout(() => setLines(p => [...p, l]), l.t))
    let v = 0
    const iv = setInterval(() => {
      v += 3 + Math.random() * 5
      if (v >= 100) { v = 100; clearInterval(iv) }
      setProg(Math.min(100, v))
    }, 80)
    setTimeout(() => dispatch({ type: 'GO_SETUP' }), 3800)
    return () => clearInterval(iv)
  }, [dispatch])

  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', padding:'40px 48px', gap:0 }}>
      <div style={{ fontFamily:'var(--font-vt)', fontSize:48, color:'var(--green)', letterSpacing:6, marginBottom:24, textShadow:'0 0 30px rgba(0,255,65,.5)' }}>
        RECOVERY_OS
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:2, fontSize:12, lineHeight:2, minHeight:180 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.bright ? 'var(--green)' : l.warn ? 'var(--amber)' : l.dim ? 'var(--green-dark)' : 'var(--green-dim)', animation:'fade-in .1s ease forwards' }}>
            {l.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop:24, width:320 }}>
        <div style={{ fontSize:10, color:'var(--green-dark)', letterSpacing:3, marginBottom:6 }}>LOADING</div>
        <div style={{ background:'var(--green-dark)', height:4, borderRadius:2, overflow:'hidden' }}>
          <div style={{ height:'100%', background:'var(--green)', width:`${prog}%`, transition:'width .05s', boxShadow:'0 0 8px var(--green)' }} />
        </div>
      </div>
    </div>
  )
}
