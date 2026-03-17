import React, { useRef, useCallback, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import { EVIDENCE } from '../data/gameData'

const PATH_COLORS = { TECH:'var(--blue)', EMO:'var(--purple)', EXT:'var(--teal)', CHAOS:'var(--amber)' }

export default function OsWindow({ win, zIndex }) {
  const { dispatch, triggerGlitch, pushNotif } = useGame()
  const ref = useRef(null)
  const drag = useRef(null)

  const focus = () => dispatch({ type:'FOCUS_WINDOW', id:win.id })
  const close = (e) => { e.stopPropagation(); dispatch({ type:'CLOSE_WINDOW', id:win.id }) }
  const minimize = (e) => { e.stopPropagation(); dispatch({ type:'MINIMIZE_WINDOW', id:win.id }) }

  const onMouseDown = useCallback((e) => {
    if (e.target.closest('[data-no-drag]')) return
    focus()
    drag.current = { startX: e.clientX - win.x, startY: e.clientY - win.y }
    e.preventDefault()
  }, [win.x, win.y])

  useEffect(() => {
    function onMove(e) {
      if (!drag.current) return
      const x = Math.max(0, Math.min(e.clientX - drag.current.startX, window.innerWidth - win.width))
      const y = Math.max(30, Math.min(e.clientY - drag.current.startY, window.innerHeight - 60))
      dispatch({ type:'MOVE_WINDOW', id:win.id, x, y })
    }
    function onUp() { drag.current = null }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [win.id, win.width])

  if (win.minimized) return null

  const ev = EVIDENCE[win.fileId]
  const pathColor = ev ? (PATH_COLORS[ev.path] || 'var(--green-muted)') : 'var(--green-muted)'
  const isNew = ev && !win._logged

  return (
    <div
      ref={ref}
      onClick={focus}
      style={{
        position:'absolute', left:win.x, top:win.y,
        width:win.width, height:win.height,
        zIndex, background:'#0d0d0d',
        border:`1px solid ${zIndex > 50 ? pathColor : 'var(--win-border)'}`,
        display:'flex', flexDirection:'column',
        animation:'win-open .2s ease forwards',
        boxShadow: zIndex > 50 ? `0 0 24px rgba(0,0,0,.8), 0 0 1px ${pathColor}` : '0 0 24px rgba(0,0,0,.8)',
        transition:'border-color .2s, box-shadow .2s',
        resize:'both', overflow:'hidden',
        minWidth:320, minHeight:200,
      }}
    >
      {/* Title bar */}
      <div
        onMouseDown={onMouseDown}
        style={{
          background:'var(--win-header)', borderBottom:`1px solid var(--win-border)`,
          padding:'6px 10px', display:'flex', alignItems:'center', gap:8,
          cursor:'grab', flexShrink:0, userSelect:'none'
        }}
      >
        <span style={{ fontSize:14 }}>{win.icon}</span>
        <span style={{ flex:1, fontSize:11, color:'var(--green-dim)', letterSpacing:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
          {win.title}
        </span>
        {ev && (
          <span className={`badge badge-${ev.path.toLowerCase()}`} style={{ fontSize:9, letterSpacing:1 }}>
            {ev.path}
          </span>
        )}
        <button data-no-drag onClick={minimize}
          style={{ background:'transparent', border:'1px solid var(--green-dark)', color:'var(--green-dark)', cursor:'pointer', width:18, height:18, fontSize:10, display:'flex', alignItems:'center', justifyContent:'center', transition:'all .1s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--amber)'; e.currentTarget.style.color='var(--amber)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--green-dark)'; e.currentTarget.style.color='var(--green-dark)' }}
        >_</button>
        <button data-no-drag onClick={close}
          style={{ background:'transparent', border:'1px solid var(--red-dim)', color:'var(--red-dim)', cursor:'pointer', width:18, height:18, fontSize:10, display:'flex', alignItems:'center', justifyContent:'center', transition:'all .1s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--red)'; e.currentTarget.style.color='var(--red)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--red-dim)'; e.currentTarget.style.color='var(--red-dim)' }}
        >✕</button>
      </div>

      {/* Content */}
      <div data-no-drag style={{ flex:1, overflow:'auto', padding:'14px 16px' }}>
        <pre style={{
          fontFamily:'var(--font-courier)', fontSize:12, lineHeight:1.9,
          color:'var(--green-dim)', whiteSpace:'pre-wrap', wordBreak:'break-word',
          userSelect:'text'
        }}>
          {win.content}
        </pre>
      </div>

      {/* Footer */}
      {ev && (
        <div style={{ borderTop:'1px solid var(--win-border)', padding:'5px 12px', display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(0,0,0,.3)', flexShrink:0 }}>
          <span style={{ fontSize:9, color:'var(--green-dark)', letterSpacing:1 }}>{ev.short}</span>
          <span style={{ fontSize:9, color:'var(--green-dark)', letterSpacing:2 }}>
            CONNECTS TO: {ev.connectedTo.length > 0 ? ev.connectedTo.map(id => EVIDENCE[id]?.title).join(', ') : 'UNKNOWN'}
          </span>
        </div>
      )}
    </div>
  )
}
