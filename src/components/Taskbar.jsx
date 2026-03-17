import React, { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import { EVIDENCE } from '../data/gameData'

const PATH_COLORS = { TECH:'var(--blue)', EMO:'var(--purple)', EXT:'var(--teal)', CHAOS:'var(--amber)' }

export default function Taskbar() {
  const { state, dispatch } = useGame()
  const { windows, windowOrder, discovered, timeLeft, timerActive, difficulty, corruptionLevel, playerName } = state
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setTime(`${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}`)
    }
    tick(); const iv = setInterval(tick, 1000); return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    if (!timerActive || timeLeft === null) return
    const iv = setInterval(() => dispatch({ type:'TICK_TIMER' }), 1000)
    return () => clearInterval(iv)
  }, [timerActive, timeLeft, dispatch])

  const timePct = (timeLeft && difficulty?.seconds) ? timeLeft / difficulty.seconds : 1
  const timeUrgent = timeLeft !== null && timeLeft <= 15
  const timeCritical = timeLeft !== null && timeLeft <= 5
  const timerColor = !difficulty?.seconds ? 'var(--green-muted)' :
    timeCritical ? 'var(--red)' : timeUrgent ? 'var(--amber)' : difficulty.color

  const topWinId = windowOrder[windowOrder.length - 1]

  function clickTaskBtn(win) {
    if (win.minimized) {
      dispatch({ type:'MINIMIZE_WINDOW', id:win.id })
      dispatch({ type:'FOCUS_WINDOW', id:win.id })
    } else if (win.id === topWinId) {
      dispatch({ type:'MINIMIZE_WINDOW', id:win.id })
    } else {
      dispatch({ type:'FOCUS_WINDOW', id:win.id })
    }
  }

  return (
    <div style={{
      position:'absolute', bottom:0, left:0, right:0, height:38,
      background:'rgba(8,8,8,.95)', borderTop:'1px solid var(--win-border)',
      display:'flex', alignItems:'center', gap:6, padding:'0 10px',
      zIndex:5000, userSelect:'none',
    }}>
      {/* Start / logo */}
      <div style={{
        fontFamily:'var(--font-vt)', fontSize:18, color:'var(--green)', letterSpacing:2,
        padding:'0 10px', borderRight:'1px solid var(--win-border)', marginRight:4,
        textShadow:'0 0 8px rgba(0,255,65,.4)', flexShrink:0,
      }}>
        REC_OS
      </div>

      {/* Open windows */}
      <div style={{ flex:1, display:'flex', gap:4, overflow:'hidden' }}>
        {windows.map(win => {
          const ev = EVIDENCE[win.fileId]
          const isActive = win.id === topWinId && !win.minimized
          const pathColor = ev ? (PATH_COLORS[ev.path] || 'var(--green-muted)') : 'var(--green-muted)'
          return (
            <button key={win.id} onClick={() => clickTaskBtn(win)}
              style={{
                background: isActive ? 'rgba(0,255,65,.06)' : 'transparent',
                border: `1px solid ${isActive ? pathColor : 'var(--win-border)'}`,
                color: isActive ? pathColor : 'var(--green-muted)',
                fontFamily:'var(--font-mono)', fontSize:10, padding:'2px 10px',
                cursor:'pointer', whiteSpace:'nowrap', maxWidth:140, overflow:'hidden',
                textOverflow:'ellipsis', letterSpacing:.5,
                opacity: win.minimized ? .5 : 1, transition:'all .1s',
              }}>
              {win.icon} {win.title}
            </button>
          )
        })}
      </div>

      {/* Evidence count */}
      <div style={{ fontSize:10, color:'var(--green-muted)', letterSpacing:2, borderLeft:'1px solid var(--win-border)', paddingLeft:10, flexShrink:0 }}>
        {discovered.length}<span style={{ color:'var(--green-dark)' }}>/8</span>
      </div>

      {/* Timer */}
      <div style={{
        borderLeft:'1px solid var(--win-border)', paddingLeft:10,
        display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0, minWidth:60,
      }}>
        {timeLeft !== null ? (
          <>
            <div style={{
              fontFamily:'var(--font-vt)', fontSize:20, color:timerColor, lineHeight:1,
              animation: timeCritical ? 'blink-fast .2s step-end infinite' : timeUrgent ? 'blink .5s step-end infinite' : 'none',
              textShadow: timeUrgent ? `0 0 10px ${timerColor}` : 'none',
            }}>
              {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}
            </div>
            <div style={{ height:2, width:50, background:'var(--green-dark)', marginTop:2, overflow:'hidden', borderRadius:1 }}>
              <div style={{ height:'100%', background:timerColor, width:`${timePct*100}%`, transition:'width 1s linear' }} />
            </div>
          </>
        ) : (
          <div style={{ fontFamily:'var(--font-vt)', fontSize:18, color:'var(--green-muted)' }}>∞</div>
        )}
      </div>

      {/* Conclude */}
      {discovered.length >= 1 && (
        <button className="btn-os bright" onClick={() => dispatch({ type:'TRIGGER_ENDING' })}
          style={{ fontSize:10, letterSpacing:2, padding:'4px 12px', flexShrink:0, animation:'pulse-glow 2s ease-in-out infinite' }}>
          CONCLUDE ›
        </button>
      )}

      {/* Clock */}
      <div style={{ fontFamily:'var(--font-vt)', fontSize:18, color:'var(--green-dark)', borderLeft:'1px solid var(--win-border)', paddingLeft:10, flexShrink:0 }}>
        {time}
      </div>
    </div>
  )
}
