import React, { useState } from 'react'
import { useGame } from '../context/GameContext'
import { DIFFICULTIES } from '../data/gameData'

export default function SetupScreen() {
  const { dispatch } = useGame()
  const [name, setName] = useState('')
  const [diff, setDiff] = useState(DIFFICULTIES[0])

  function start() {
    dispatch({ type: 'START_GAME', playerName: name.trim() || 'UNKNOWN', difficulty: diff })
  }

  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-start', padding:'40px 48px' }}>
      <div style={{ maxWidth:640, display:'flex', flexDirection:'column', gap:28, animation:'slide-up .4s ease forwards' }}>

        {/* Header */}
        <div style={{ borderLeft:'2px solid var(--green)', paddingLeft:16 }}>
          <div style={{ fontSize:10, letterSpacing:4, color:'var(--green-dark)', marginBottom:4 }}>CASE FILE: MISSING STUDENT</div>
          <div style={{ fontFamily:'var(--font-vt)', fontSize:56, color:'var(--green)', letterSpacing:4, lineHeight:1, textShadow:'0 0 30px rgba(0,255,65,.5)' }}>
            THE MISSING FILE
          </div>
          <div style={{ fontSize:12, color:'var(--green-muted)', fontStyle:'italic', lineHeight:1.8, marginTop:8 }}>
            "Some puzzles have one answer. This one has seven."
          </div>
        </div>

        {/* Name */}
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          <div style={{ fontSize:10, letterSpacing:3, color:'var(--green-muted)' }}>&gt; INVESTIGATOR NAME (optional)</div>
          <input
            style={{ background:'transparent', border:'none', borderBottom:'1px solid var(--green-muted)', color:'var(--green)', fontFamily:'var(--font-mono)', fontSize:14, padding:'6px 0', outline:'none', caretColor:'var(--green)' }}
            placeholder="Enter your name..."
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && start()}
            autoFocus
            maxLength={30}
          />
        </div>

        {/* Difficulty */}
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <div style={{ fontSize:10, letterSpacing:3, color:'var(--green-muted)' }}>&gt; DIFFICULTY</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
            {DIFFICULTIES.map(d => (
              <button key={d.id} onClick={() => setDiff(d)}
                style={{
                  background: diff.id === d.id ? 'rgba(0,255,65,.04)' : 'transparent',
                  border: `1px solid ${diff.id === d.id ? d.color : 'var(--green-dark)'}`,
                  color: diff.id === d.id ? d.color : 'var(--green-dark)',
                  fontFamily:'var(--font-mono)', padding:'12px 8px', cursor:'pointer',
                  display:'flex', flexDirection:'column', alignItems:'center', gap:4, transition:'all .15s'
                }}>
                <span style={{ fontSize:12, letterSpacing:2 }}>{d.label}</span>
                <span style={{ fontSize:9, opacity:.7, textAlign:'center', lineHeight:1.4 }}>{d.subtitle}</span>
                <span style={{ fontFamily:'var(--font-vt)', fontSize:22, lineHeight:1, marginTop:2, color: diff.id === d.id ? d.color : 'var(--green-dark)' }}>
                  {d.seconds ? `${d.seconds}s` : '∞'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* How to play */}
        <div style={{ background:'rgba(0,255,65,.02)', border:'1px solid var(--green-dark)', padding:'12px 16px', fontSize:11, color:'var(--green-dark)', lineHeight:2 }}>
          <span style={{ color:'var(--green-muted)', letterSpacing:2 }}>HOW TO PLAY </span>
          Double-click files to open them. Read everything.
          Piece together what happened to Alex.
          Your choices unlock one of 7 different endings.
        </div>

        <button className="btn-os bright" onClick={start} style={{ alignSelf:'flex-start', padding:'10px 28px', fontSize:13, letterSpacing:3 }}>
          BEGIN INVESTIGATION ›
        </button>

        <div style={{ fontSize:11, color:'var(--green-dark)', borderTop:'1px solid var(--green-dark)', paddingTop:16, lineHeight:2 }}>
          A student disappeared. This is their laptop. What happened is in the files.
        </div>
      </div>
    </div>
  )
}
