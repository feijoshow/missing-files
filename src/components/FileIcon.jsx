import React, { useState, useRef } from 'react'
import { useGame } from '../context/GameContext'
import { EVIDENCE } from '../data/gameData'

const PATH_COLORS = { TECH:'var(--blue)', EMO:'var(--purple)', EXT:'var(--teal)', CHAOS:'var(--amber)' }

export default function FileIcon({ file }) {
  const { state, dispatch, triggerGlitch, pushNotif } = useGame()
  const [selected, setSelected] = useState(false)
  const clickTimer = useRef(null)
  const ev = EVIDENCE[file.id]
  const discovered = state.discovered.includes(file.id)
  const pathColor = ev ? (PATH_COLORS[ev.path] || 'var(--green-muted)') : 'var(--green-muted)'

  function openFile() {
    if (!ev) return
    const alreadyOpen = state.windows.find(w => w.fileId === file.id)
    dispatch({
      type: 'OPEN_WINDOW',
      fileId: file.id,
      title: file.label,
      content: ev.content,
      path: ev.path,
      icon: file.icon,
    })
    if (!discovered) {
      dispatch({ type: 'DISCOVER_EVIDENCE', evidenceId: file.id, evidence: ev })
      triggerGlitch(250)
      pushNotif(`✦ Evidence logged: ${ev.title}`, 'discovery')
    }
  }

  function handleClick(e) {
    e.stopPropagation()
    setSelected(true)
    if (clickTimer.current) {
      clearTimeout(clickTimer.current)
      clickTimer.current = null
      openFile()
    } else {
      clickTimer.current = setTimeout(() => { clickTimer.current = null }, 300)
    }
  }

  function handleContextMenu(e) {
    e.preventDefault()
    e.stopPropagation()
    dispatch({
      type: 'SHOW_CONTEXT_MENU',
      x: e.clientX, y: e.clientY,
      items: [
        { label: '📂 Open', action: openFile },
        { label: 'ℹ️ Properties', action: () => pushNotif(`${file.label} — ${ev?.path || '???'} path`) },
        null,
        { label: '✕ Close', action: () => {} },
      ]
    })
  }

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onBlur={() => setSelected(false)}
      tabIndex={0}
      style={{
        position:'absolute', left:file.x, top:file.y,
        display:'flex', flexDirection:'column', alignItems:'center', gap:4,
        width:80, cursor:'default', outline:'none',
        background: selected ? 'rgba(0,255,65,.1)' : 'transparent',
        border: selected ? '1px solid rgba(0,255,65,.3)' : '1px solid transparent',
        borderRadius:2, padding:'8px 4px',
        transition:'background .1s',
      }}
    >
      <div style={{
        fontSize:28, lineHeight:1, position:'relative',
        filter: discovered ? `drop-shadow(0 0 6px ${pathColor})` : 'none',
        transition:'filter .3s',
      }}>
        {file.icon}
        {discovered && (
          <div style={{
            position:'absolute', top:-4, right:-4, width:8, height:8,
            borderRadius:'50%', background:pathColor,
            boxShadow:`0 0 6px ${pathColor}`,
          }} />
        )}
      </div>
      <div style={{
        fontSize:9, color: discovered ? pathColor : 'var(--green-muted)',
        textAlign:'center', lineHeight:1.3, letterSpacing:.5,
        wordBreak:'break-all', maxWidth:76,
        textShadow: discovered ? `0 0 8px ${pathColor}` : 'none',
        transition:'color .3s',
      }}>
        {file.label}
      </div>
    </div>
  )
}
