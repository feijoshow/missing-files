import React from 'react'
import { GameProvider, useGame } from './context/GameContext'
import BootScreen from './components/BootScreen'
import SetupScreen from './components/SetupScreen'
import Desktop from './components/Desktop'
import EndingScreen from './components/EndingScreen'

function Router() {
  const { state } = useGame()
  return (
    <div className="crt-screen">
      {state.screen === 'boot'    && <BootScreen />}
      {state.screen === 'setup'   && <SetupScreen />}
      {state.screen === 'desktop' && <Desktop />}
      {state.screen === 'ending'  && <EndingScreen />}
    </div>
  )
}

export default function App() {
  return (
    <GameProvider>
      <Router />
    </GameProvider>
  )
}
