import React, { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import { EVIDENCE, PATHS } from '../data/gameData'

const PATH_COLORS = { TECH:'var(--blue)', EMO:'var(--purple)', EXT:'var(--teal)', CHAOS:'var(--amber)' }

export default function EndingScreen() {
  const { state, dispatch } = useGame()
  const { ending, playerName, discovered, pathCounts, openedCount, difficulty } = state
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    setTimeout(() => setPhase(1), 700)
    setTimeout(() => setPhase(2), 1900)
    setTimeout(() => setPhase(3), 3200)
  }, [])

  if (!ending) return null

  const totalPaths = Object.values(pathCounts).filter(v => v > 0).length

  return (
    <div style={{ width:'100%', height:'100%', overflow:'hidden', background:'#000', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
      {phase === 0 && (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16, animation:'glitch-h .3s linear infinite' }}>
          <div style={{ fontFamily:'var(--font-vt)', fontSize:52, color:'var(--green)', letterSpacing:8, textShadow:'0 0 30px rgba(0,255,65,.7)' }}>CASE CLOSED</div>
          <div style={{ fontSize:12, color:'var(--green-muted)', letterSpacing:4, animation:'blink .5s step-end infinite' }}>CALCULATING RESULT...</div>
        </div>
      )}

      {phase >= 1 && (
        <div style={{ width:'100%', maxWidth:700, height:'100%', overflow:'auto', padding:'32px 28px', display:'flex', flexDirection:'column', gap:20, animation:'fade-in .5s ease forwards' }}>

          <div style={{ fontSize:12, color:'var(--green-muted)', lineHeight:2.2 }}>
            <div>&gt; INVESTIGATION COMPLETE</div>
            <div>&gt; Compiling final report...</div>
          </div>

          {phase >= 2 && (
            <div style={{ border:`1px solid ${ending.color}`, padding:'22px 24px', display:'flex', flexDirection:'column', gap:10, animation:'slide-up .4s ease forwards', boxShadow:`0 0 24px rgba(0,0,0,.8), inset 0 0 40px rgba(0,0,0,.5)` }}>
              <div style={{ fontSize:9, letterSpacing:4, color:'var(--green-dark)' }}>YOUR ENDING</div>
              <div style={{ fontFamily:'var(--font-vt)', fontSize:52, color:ending.color, letterSpacing:4, lineHeight:1, textShadow:`0 0 20px ${ending.color}` }}>
                {ending.title}
              </div>
              <div style={{ fontSize:10, letterSpacing:3, color:'var(--green-muted)' }}>{ending.subtitle}</div>
              <div style={{ height:1, background:ending.color, opacity:.2, margin:'6px 0' }} />
              <pre style={{ fontFamily:'var(--font-courier)', fontSize:13, lineHeight:2, color:'var(--green-dim)', whiteSpace:'pre-wrap', fontStyle:'italic' }}>
                {ending.narrative}
              </pre>
              <div style={{ fontSize:9, letterSpacing:3, color:'var(--green-muted)', borderTop:'1px solid var(--win-border)', paddingTop:8, marginTop:4 }}>
                {ending.stat}
              </div>
            </div>
          )}

          {phase >= 3 && (
            <>
              {/* Stats grid */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, animation:'slide-up .4s ease .1s both' }}>
                {[
                  { v:discovered.length, l:'EVIDENCE' },
                  { v:totalPaths, l:'PATHS' },
                  { v:openedCount, l:'FILES READ' },
                  { v:7, l:'ENDINGS EXIST' },
                ].map(s => (
                  <div key={s.l} style={{ background:'rgba(0,255,65,.02)', border:'1px solid var(--win-border)', padding:'10px 8px', textAlign:'center' }}>
                    <div style={{ fontFamily:'var(--font-vt)', fontSize:36, color:'var(--green)', lineHeight:1 }}>{s.v}</div>
                    <div style={{ fontSize:8, letterSpacing:2, color:'var(--green-dark)', marginTop:2 }}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Path bars */}
              <div style={{ animation:'slide-up .4s ease .2s both' }}>
                <div style={{ fontSize:9, letterSpacing:3, color:'var(--green-dark)', marginBottom:8 }}>INVESTIGATION PATHS</div>
                {Object.entries(pathCounts).map(([k, v]) => (
                  <div key={k} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6, fontSize:10 }}>
                    <span style={{ width:52, color:PATH_COLORS[k], letterSpacing:1 }}>{k}</span>
                    <div style={{ flex:1, height:3, background:'var(--green-dark)', borderRadius:2, overflow:'hidden' }}>
                      <div style={{ height:'100%', background:PATH_COLORS[k], width:`${Math.min(100,v*50)}%`, transition:'width 1s ease', boxShadow:`0 0 6px ${PATH_COLORS[k]}` }} />
                    </div>
                    <span style={{ fontFamily:'var(--font-vt)', fontSize:16, color:'var(--green-muted)', width:12 }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Discovered evidence */}
              {discovered.length > 0 && (
                <div style={{ animation:'slide-up .4s ease .3s both' }}>
                  <div style={{ fontSize:9, letterSpacing:3, color:'var(--green-dark)', marginBottom:6 }}>FILES READ</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
                    {discovered.map(id => {
                      const ev = EVIDENCE[id]
                      if (!ev) return null
                      return (
                        <div key={id} style={{ display:'flex', alignItems:'center', gap:8, fontSize:11, borderLeft:`2px solid ${PATH_COLORS[ev.path]}`, paddingLeft:8, paddingTop:3, paddingBottom:3 }}>
                          <span>{ev.icon}</span>
                          <span style={{ flex:1, color:'var(--green-dim)' }}>{ev.title}</span>
                          <span style={{ fontSize:9, letterSpacing:2, color:PATH_COLORS[ev.path] }}>{ev.path}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Other endings hint */}
              <div style={{ border:'1px solid var(--win-border)', padding:'12px 16px', animation:'slide-up .4s ease .4s both' }}>
                <div style={{ fontSize:9, letterSpacing:3, color:'var(--green-muted)', marginBottom:6 }}>6 OTHER ENDINGS EXIST</div>
                <div style={{ fontSize:11, color:'var(--green-dark)', lineHeight:1.8 }}>
                  Your investigation style determined your truth. Mix Technical, Emotional, External, and Creative files differently to find the others. The full picture requires all four paths.
                </div>
              </div>

              {/* Closing message */}
              <div style={{
                border:`1px solid ${ending.color}`, padding:'14px 20px',
                fontFamily:'var(--font-vt)', fontSize:22, letterSpacing:2, textAlign:'center',
                color:ending.color, animation:'pulse-glow 2s ease-in-out infinite, slide-up .4s ease .5s both',
              }}>
                {playerName && playerName !== 'UNKNOWN' ? `${playerName} — we will be in touch.` : 'We will be in touch.'}
              </div>

              {/* Actions */}
              <div style={{ display:'flex', gap:10, animation:'slide-up .4s ease .6s both', paddingBottom:20 }}>
                <button className="btn-os bright" onClick={() => dispatch({ type:'RESTART' })}>
                  ↺ NEW INVESTIGATION
                </button>
                <button className="btn-os" onClick={() => {
                  const txt = `THE MISSING FILE\nEnding: ${ending.title}\nEvidence: ${discovered.length}/8\nPaths: ${totalPaths}/4\n\n${ending.narrative}`
                  navigator.clipboard?.writeText(txt)
                }}>
                  ⎘ COPY ENDING
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
