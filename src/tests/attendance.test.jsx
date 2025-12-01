import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ClassPage from '../pages/ClassPage'
import { classes } from '../data/classes'

test('mark presence updates toggle and finalize shows correct summary counts', async ()=>{
  render(
    <MemoryRouter initialEntries={[`/class/${classes[0].id}`]}>
      <Routes>
        <Route path="/class/:id" element={<ClassPage />} />
      </Routes>
    </MemoryRouter>
  )

  // wait for a student name to appear
  const student = await screen.findByText(new RegExp(classes[0].students[0].name, 'i'))
  expect(student).toBeInTheDocument()

  // find all Ausente buttons and click the first to mark present
  const ausentes = screen.getAllByText(/Ausente/i)
  expect(ausentes.length).toBeGreaterThan(0)
  fireEvent.click(ausentes[0])

  // the clicked toggle should now show Presente (look for switch role)
  const presenteBtn = await screen.findByRole('switch', { name: /Presente/i })
  expect(presenteBtn).toBeInTheDocument()

  // finalize and check summary counts
  fireEvent.click(screen.getByText(/Finalizar chamada/i))

  const resumo = await screen.findByText(/Presentes:/i)
  expect(resumo).toHaveTextContent(/Presentes: 1/)
  expect(resumo).toHaveTextContent(/Ausentes:/)
})

test('toggle presence updates counts and summary (alternate)', async ()=>{
  const classId = classes[0].id
  render(
    <MemoryRouter initialEntries={[`/class/${classId}`]}>
      <Routes>
        <Route path="/class/:id" element={<ClassPage />} />
      </Routes>
    </MemoryRouter>
  )

  // Wait for loading to finish
  const firstStudent = await screen.findByText(new RegExp(classes[0].students[0].name, 'i'))
  expect(firstStudent).toBeInTheDocument()
  const toggle = screen.getAllByRole('switch', { name: /ausente|presente/i })[0]
  fireEvent.click(toggle)
  fireEvent.click(screen.getByText(/Finalizar chamada/i))
  expect(screen.getByText(/Resumo/)).toBeInTheDocument()
  expect(screen.getByText(/Presentes:/)).toBeInTheDocument()
})
