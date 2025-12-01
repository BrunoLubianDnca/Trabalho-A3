import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

describe('Login', ()=>{
  test('shows validation error for wrong credentials', ()=>{
    render(<MemoryRouter><LoginPage /></MemoryRouter>)
    fireEvent.change(screen.getByPlaceholderText('seu usuário'), { target: { value: 'wrong' } })
    fireEvent.change(screen.getByPlaceholderText('sua senha'), { target: { value: 'nope' } })
    fireEvent.click(screen.getByText('Entrar'))
    expect(screen.getByText(/Usuário ou senha inválidos/)).toBeInTheDocument()
  })
})
