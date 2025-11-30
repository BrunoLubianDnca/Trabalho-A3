import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ClassPage from './pages/ClassPage'
import RegisterPage from './pages/RegisterPage'

function PrivateRoute({ children }){
  const isAuth = !!localStorage.getItem('chamada_user')
  return isAuth ? children : <Navigate to="/login" replace />
}

const Global = createGlobalStyle`
  *{box-sizing:border-box}
  body{margin:0;font-family:Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;background: linear-gradient(135deg, #f5f7ff 0%, #e9f2ff 100%);color:#0f172a}
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
