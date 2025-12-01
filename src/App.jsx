import React, { useEffect } from 'react'
import { currentUser } from './services/auth'
import { Routes, Route, Navigate } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ClassPage from './pages/ClassPage'
import RegisterPage from './pages/RegisterPage'

function PrivateRoute({ children }){
  const isAuth = !!currentUser()
  return isAuth ? children : <Navigate to="/login" replace />
}

import { tokens } from './styles/tokens'

const Global = createGlobalStyle`
  *{box-sizing:border-box}
  html,body,#root{height:100%}
  body{
    margin:0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    background: linear-gradient(135deg, ${tokens.colors.bg1} 0%, ${tokens.colors.bg2} 100%);
    color: #0f172a;
    font-size: ${tokens.typography.base};
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
  }
  a{color: ${tokens.colors.primary};}
  :focus-visible{ outline: 3px solid rgba(37,99,235,0.18); outline-offset: 2px; }
`

const AppShell = styled.div`
  min-height:100vh;
  display:flex;
  align-items:flex-start;
  justify-content:center;
  padding:24px;
`

export default function App(){
  const isAuth = !!localStorage.getItem('chamada_user')

  useEffect(() => {
    // Ensure `window.regras` exists for runtime usage and tests.
    if (typeof window !== 'undefined' && !window.regras) {
      // Try to load the browser rules script if available (dev/test helper).
      const scriptSrc = '/jasmine/regras.js'
      const script = document.createElement('script')
      script.src = scriptSrc
      script.async = true
      script.onload = () => {
        if (!window.regras) {
          console.warn('`jasmine/regras.js` loaded but `window.regras` not set — using fallback.')
          window.regras = {
            avaliarChamada: () => 'Chamada inválida'
          }
        } else {
          console.info('`window.regras` loaded from', scriptSrc)
        }
      }
      script.onerror = () => {
        console.warn('Could not load', scriptSrc, '; installing fallback `window.regras`.')
        window.regras = {
          avaliarChamada: () => 'Chamada inválida'
        }
      }
      document.head.appendChild(script)
    }
  }, [])
  return (
    <>
      <Global />
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to={!!localStorage.getItem('chamada_user') ? '/dashboard' : '/login'} replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/class/:id" element={<PrivateRoute><ClassPage /></PrivateRoute>} />
        </Routes>
      </AppShell>
    </>
  )
}
