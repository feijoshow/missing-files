import React, { createContext, useContext, useReducer, useCallback } from 'react'
import { calculateEnding } from '../data/gameData'

const GameContext = createContext(null)

const INITIAL_STATE = {
  screen: 'boot',
  playerName: '',
  difficulty: null,
  timeLeft: null,
  timerActive: false,
  discovered: [],
  pathCounts: { TECH: 0, EMO: 0, EXT: 0, CHAOS: 0 },
  constellation: [],
  ending: null,
  secretsFound: [],
  openedCount: 0,
  glitching: false,
  corruptionLevel: 0,
  windows: [],
  windowOrder: [],
  notifications: [],
  rightClickMenu: null,
}

let winId = 1
let notifId = 1

function reducer(state, action) {
  switch (action.type) {
    case 'GO_SETUP':
      return { ...state, screen: 'setup' }

    case 'START_GAME':
      return {
        ...INITIAL_STATE,
        screen: 'desktop',
        playerName: action.playerName,
        difficulty: action.difficulty,
        timeLeft: action.difficulty.seconds,
        timerActive: action.difficulty.seconds !== null,
      }

    case 'OPEN_WINDOW': {
      const existing = state.windows.find(w => w.fileId === action.fileId)
      if (existing) {
        return {
          ...state,
          windows: state.windows.map(w => w.id === existing.id ? { ...w, minimized: false } : w),
          windowOrder: [...state.windowOrder.filter(id => id !== existing.id), existing.id],
        }
      }
      const id = winId++
      const n = state.windows.filter(w => !w.minimized).length
      const newWin = {
        id, fileId: action.fileId, title: action.title,
        content: action.content, path: action.path, icon: action.icon,
        x: Math.min(60 + n * 30, window.innerWidth - 560),
        y: Math.min(50 + n * 24, window.innerHeight - 420),
        width: action.width || 520, height: action.height || 360,
        minimized: false,
      }
      return {
        ...state,
        windows: [...state.windows, newWin],
        windowOrder: [...state.windowOrder, id],
      }
    }

    case 'CLOSE_WINDOW':
      return {
        ...state,
        windows: state.windows.filter(w => w.id !== action.id),
        windowOrder: state.windowOrder.filter(id => id !== action.id),
      }

    case 'FOCUS_WINDOW':
      return { ...state, windowOrder: [...state.windowOrder.filter(id => id !== action.id), action.id] }

    case 'MOVE_WINDOW':
      return { ...state, windows: state.windows.map(w => w.id === action.id ? { ...w, x: action.x, y: action.y } : w) }

    case 'MINIMIZE_WINDOW':
      return { ...state, windows: state.windows.map(w => w.id === action.id ? { ...w, minimized: !w.minimized } : w) }

    case 'DISCOVER_EVIDENCE': {
      if (state.discovered.includes(action.evidenceId)) return state
      const ev = action.evidence
      const newPathCounts = { ...state.pathCounts, [ev.path]: state.pathCounts[ev.path] + 1 }
      const node = {
        id: action.evidenceId, label: ev.title, path: ev.path,
        time: Date.now(),
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 70,
      }
      return {
        ...state,
        discovered: [...state.discovered, action.evidenceId],
        pathCounts: newPathCounts,
        constellation: [...state.constellation, node],
        openedCount: state.openedCount + 1,
      }
    }

    case 'ADD_SECRET':
      if (state.secretsFound.includes(action.secretId)) return state
      return { ...state, secretsFound: [...state.secretsFound, action.secretId] }

    case 'PUSH_NOTIF': {
      const n = { id: notifId++, text: action.text, kind: action.kind || 'info' }
      return { ...state, notifications: [...state.notifications.slice(-4), n] }
    }

    case 'POP_NOTIF':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.id) }

    case 'SHOW_CONTEXT_MENU':
      return { ...state, rightClickMenu: { x: action.x, y: action.y, items: action.items } }

    case 'HIDE_CONTEXT_MENU':
      return { ...state, rightClickMenu: null }

    case 'TICK_TIMER': {
      if (!state.timerActive || state.timeLeft === null) return state
      const newTime = state.timeLeft - 1
      const corruption = Math.round(((state.difficulty.seconds - newTime) / state.difficulty.seconds) * 100)
      if (newTime <= 0) {
        const ending = calculateEnding(state.discovered, state.pathCounts)
        return { ...state, timeLeft: 0, timerActive: false, screen: 'ending', ending, corruptionLevel: 100 }
      }
      return { ...state, timeLeft: newTime, corruptionLevel: corruption }
    }

    case 'SET_GLITCH':
      return { ...state, glitching: action.value }

    case 'TRIGGER_ENDING': {
      const ending = calculateEnding(state.discovered, state.pathCounts)
      return { ...state, screen: 'ending', ending, timerActive: false }
    }

    case 'RESTART':
      return { ...INITIAL_STATE }

    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const triggerGlitch = useCallback((d = 350) => {
    dispatch({ type: 'SET_GLITCH', value: true })
    setTimeout(() => dispatch({ type: 'SET_GLITCH', value: false }), d)
  }, [])

  const pushNotif = useCallback((text, kind = 'info') => {
    const id = notifId
    dispatch({ type: 'PUSH_NOTIF', text, kind })
    setTimeout(() => dispatch({ type: 'POP_NOTIF', id }), 3500)
  }, [])

  return (
    <GameContext.Provider value={{ state, dispatch, triggerGlitch, pushNotif }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
