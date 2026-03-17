import React from 'react'
import { useGame } from '../context/GameContext'

const KIND_COLORS = {
  discovery: 'var(--green)',
  info:      'var(--green-muted)',
  warn:      'var(--amber)',
  error:     'var(--red)',
}

export default function Notifications() {
  const { state, dispatch } = useGame()
  const { notifications } = state

  return (
    <div style={{
      position:'absolute', top:46, right:12,
      display:'flex', flexDirection:'column', gap:6,
      zIndex:8000, pointerEvents:'none',
    }}>
      {notifications.map(n => (
        <div key={n.id} style={{
          background:'rgba(8,8,8,.95)',
          border:`1px solid ${KIND_COLORS[n.kind] || KIND_COLORS.info}`,
          color: KIND_COLORS[n.kind] || KIND_COLORS.info,
          fontFamily:'var(--font-mono)', fontSize:11,
          padding:'7px 14px', letterSpacing:1,
          maxWidth:280, lineHeight:1.5,
          animation:'notif-in .3s ease forwards',
          boxShadow:`0 0 12px rgba(0,0,0,.6)`,
        }}>
          {n.text}
        </div>
      ))}
    </div>
  )
}
