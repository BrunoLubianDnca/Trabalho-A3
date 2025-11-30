import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'

test('renders dashboard and shows classes', async ()=>{
  render(<MemoryRouter><DashboardPage /></MemoryRouter>)
  // wait for a class name to appear after loading
  const className = await screen.findByText(/Matemática - 1º Ano/i)
  expect(className).toBeInTheDocument()
})
