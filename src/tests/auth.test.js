import { register, login, logout, currentUser } from '../services/auth'

beforeEach(() => {
  localStorage.clear()
})

test('register creates a new user and logs in', () => {
  const res = register({ username: 'bob', password: '123', name: 'Bob' })
  expect(res.ok).toBe(true)
  const user = currentUser()
  expect(user).toBeTruthy()
  expect(user.username).toBe('bob')
})

test('register fails if user exists', () => {
  const a = register({ username: 'alice', password: 'x', name: 'Alice' })
  expect(a.ok).toBe(true)
  const b = register({ username: 'alice', password: 'y', name: 'Alice 2' })
  expect(b.ok).toBe(false)
})

test('login succeeds with correct credentials', () => {
  register({ username: 'carlos', password: 'pw', name: 'Carlos' })
  logout()
  const res = login({ username: 'carlos', password: 'pw' })
  expect(res.ok).toBe(true)
  expect(currentUser().username).toBe('carlos')
})

test('login fails with incorrect credentials', () => {
  register({ username: 'dora', password: 'pw2', name: 'Dora' })
  logout()
  const res = login({ username: 'dora', password: 'wrong' })
  expect(res.ok).toBe(false)
})
