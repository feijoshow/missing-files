import React, { useEffect, useRef } from 'react'
import { useGame } from '../context/GameContext'

export default function ContextMenu() {
  const { state, dispatch } = useGame()
  const { rightClickMenu } = state
  const ref = useRef(null)

  useEffect(() => {
    if (!rightClickMenu) return
    function hide() { dispatch({ type:'HIDE_CONTEXT_MENU' }) }
    window.addEventListener('click', hide)
    window.addEventListener('keydown', hide)
    return () => { window.removeEventListener('click', hide); window.removeEventListener('keydown', hide) }
  }, [rightClickMenu, dispatch])

  if (!rightClickMenu) return null

  const x = Math.min(rightClickMenu.x, window.innerWidth - 180)
  const y = Math.min(rightClickMenu.y, window.innerHeight - 160)

  return (
    <div style={{
      position:'fixed', left:x, top:y,
      background:'#0d0d0d', border:'1px solid var(--win-border)',
      zIndex:9000, minWidth:160,
      animation:'fade-in .1s ease forwards',
      boxShadow:'0 4px 24px rgba(0,0,0,.8)',
    }}>
      {rightClickMenu.items.map((item, i) =>
        item === null ? (
          <div key={i} style={{ height:1, background:'var(--win-border)', margin:'2px 0' }} />
        ) : (
          <div key={i}
            onClick={(e) => { e.stopPropagation(); item.action(); dispatch({ type:'HIDE_CONTEXT_MENU' }) }}
            style={{
              padding:'7px 16px', fontSize:11, color:'var(--green-dim)',
              cursor:'pointer', letterSpacing:.5, transition:'background .1s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,65,.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {item.label}
          </div>
        )
      )}
    </div>
  )
}
