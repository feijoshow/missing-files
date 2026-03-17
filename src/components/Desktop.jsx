import React from 'react'
import { useGame } from '../context/GameContext'
import { DESKTOP_FILES, EVIDENCE, PATHS } from '../data/gameData'
import FileIcon from './FileIcon'
import OsWindow from './OsWindow'
import Taskbar from './Taskbar'
import Notifications from './Notifications'
import ContextMenu from './ContextMenu'

export default function Desktop() {
  const { state, dispatch } = useGame()
  const { windows, windowOrder, glitching, corruptionLevel, discovered, playerName } = state

  function handleDesktopClick() {
    dispatch({ type:'HIDE_CONTEXT_MENU' })
  }

  function handleDesktopRightClick(e) {
    e.preventDefault()
    dispatch({
      type: 'SHOW_CONTEXT_MENU',
      x: e.clientX, y: e.clientY,
      items: [
        { label: '🔄 Refresh Desktop', action: () => {} },
        { label: '📋 View Evidence Board', action: () => dispatch({
            type:'OPEN_WINDOW', fileId:'__evidence__',
            title:'Evidence Board', content:'', path:null, icon:'📊', width:460, height:440,
          })
        },
        null,
        { label: '⚠️ File a Report', action: () => {
          if (discovered.length > 0) dispatch({ type:'TRIGGER_ENDING' })
        }},
      ]
    })
  }

  return (
    <div
      onClick={handleDesktopClick}
      onContextMenu={handleDesktopRightClick}
      style={{
        width:'100%', height:'100%',
        background: `
          radial-gradient(ellipse at 20% 80%, rgba(0,40,10,.6) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(0,20,5,.4) 0%, transparent 50%),
          #080808
        `,
        position:'relative', overflow:'hidden',
        animation: glitching ? 'glitch-h .35s linear' : 'none',
      }}
    >
      {/* Desktop wallpaper text */}
      <div style={{
        position:'absolute', bottom:60, right:20,
        fontFamily:'var(--font-vt)', fontSize:11,
        color:'rgba(0,255,65,.06)', letterSpacing:3, lineHeight:2,
        textAlign:'right', pointerEvents:'none', userSelect:'none',
      }}>
        RECOVERY_OS 4.2.1<br/>
        USER: {playerName}<br/>
        STATUS: INVESTIGATING<br/>
        FILES: {discovered.length}/8 OPENED
      </div>

      {/* Topbar */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:28,
        background:'rgba(6,6,6,.9)', borderBottom:'1px solid var(--win-border)',
        display:'flex', alignItems:'center', padding:'0 12px',
        zIndex:4000, gap:16,
      }}>
        <span style={{ fontFamily:'var(--font-vt)', fontSize:16, color:'var(--green)', letterSpacing:2 }}>RECOVERY_SHELL</span>
        <span style={{ fontSize:9, color:'var(--green-dark)', letterSpacing:2 }}>&gt; /USER_DATA/student_01</span>
        <span style={{ marginLeft:'auto', fontSize:9, color:'var(--green-dark)', letterSpacing:1 }}>
          DOUBLE-CLICK FILES TO OPEN · RIGHT-CLICK FOR OPTIONS
        </span>
      </div>

      {/* File icons area */}
      <div style={{ position:'absolute', top:28, left:0, right:0, bottom:38 }}>
        {DESKTOP_FILES.map(file => (
          <FileIcon key={file.id} file={file} />
        ))}

        {/* Evidence Board shortcut */}
        <EvidenceBoardIcon />
      </div>

      {/* Windows */}
      {windows.map(win => (
        <OsWindow
          key={win.id}
          win={win}
          zIndex={10 + windowOrder.indexOf(win.id)}
        />
      ))}

      {/* Corruption overlay */}
      {corruptionLevel > 65 && (
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none', zIndex:3500,
          background: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,0,${((corruptionLevel-65)/200).toFixed(3)}) 3px, rgba(255,0,0,${((corruptionLevel-65)/200).toFixed(3)}) 4px)`,
          animation:'corrupt .4s linear infinite',
        }} />
      )}

      <Notifications />
      <ContextMenu />
      <Taskbar />
    </div>
  )
}

function EvidenceBoardIcon() {
  const { state, dispatch, pushNotif } = useGame()
  const { discovered, pathCounts } = state
  const [sel, setSel] = React.useState(false)
  const clickTimer = React.useRef(null)

  function openBoard() {
    dispatch({
      type:'OPEN_WINDOW',
      fileId:'__evidence__',
      title:'Evidence Board',
      content: buildBoardContent(discovered, pathCounts),
      path: null, icon:'📊', width:480, height:400,
    })
  }

  function handleClick(e) {
    e.stopPropagation()
    setSel(true)
    if (clickTimer.current) {
      clearTimeout(clickTimer.current)
      clickTimer.current = null
      openBoard()
    } else {
      clickTimer.current = setTimeout(() => { clickTimer.current = null }, 300)
    }
  }

  return (
    <div onClick={handleClick}
      style={{
        position:'absolute', left:280, top:80,
        display:'flex', flexDirection:'column', alignItems:'center', gap:4,
        width:80, cursor:'default',
        background: sel ? 'rgba(0,255,65,.1)' : 'transparent',
        border: sel ? '1px solid rgba(0,255,65,.3)' : '1px solid transparent',
        borderRadius:2, padding:'8px 4px',
      }}
      onBlur={() => setSel(false)} tabIndex={0}
    >
      <div style={{ fontSize:28, lineHeight:1 }}>📊</div>
      <div style={{ fontSize:9, color:'var(--green-muted)', textAlign:'center', letterSpacing:.5, lineHeight:1.3 }}>
        evidence_board
      </div>
      {discovered.length > 0 && (
        <div style={{ fontSize:8, color:'var(--green)', letterSpacing:1 }}>
          {discovered.length} logged
        </div>
      )}
    </div>
  )
}

function buildBoardContent(discovered, pathCounts) {
  let out = 'EVIDENCE BOARD\n'
  out += '━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n'

  out += 'PATHS EXPLORED:\n'
  Object.entries(pathCounts).forEach(([k, v]) => {
    const bar = '█'.repeat(v) + '░'.repeat(Math.max(0, 3 - v))
    out += `  ${k.padEnd(6)} ${bar}  (${v} files)\n`
  })
  out += '\n'

  if (discovered.length === 0) {
    out += 'No evidence logged yet.\nOpen files on the desktop to begin your investigation.'
  } else {
    out += `DISCOVERED (${discovered.length}/8):\n`
    discovered.forEach(id => {
      const ev = EVIDENCE[id]
      if (!ev) return
      out += `  ${ev.icon} ${ev.title.padEnd(24)} [${ev.path}]\n`
      if (ev.connectedTo.length > 0) {
        out += `       → connects to: ${ev.connectedTo.map(c => EVIDENCE[c]?.title).join(', ')}\n`
      }
    })
  }

  const remaining = 8 - discovered.length
  if (remaining > 0) {
    out += `\n${remaining} file${remaining !== 1 ? 's' : ''} undiscovered.\n`
  }

  out += '\n─────────────────────────────\n'
  out += 'When ready: click CONCLUDE in the taskbar.'
  return out
}
