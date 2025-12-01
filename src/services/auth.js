import { defaultUsers } from '../data/users'

const USERS_KEY = 'chamada_users'
const USER_KEY = 'chamada_user'

function loadUsers(){
  const raw = localStorage.getItem(USERS_KEY)
  if(!raw){
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
    return [...defaultUsers]
  }
  try{ return JSON.parse(raw) }catch(e){ return [...defaultUsers] }
}

function saveUsers(users){
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function register({ username, password, name }){
  const users = loadUsers()
  if(users.find(u => u.username === username)){
    return { ok: false, message: 'Usuário já existe' }
  }
  const id = 'u' + (Date.now())
  const user = { id, username, password, name: name || username }
  users.push(user)
  saveUsers(users)
  localStorage.setItem(USER_KEY, JSON.stringify({ id: user.id, username: user.username }))
  return { ok: true, user }
}

export function login({ username, password }){
  const users = loadUsers()
  const u = users.find(x => x.username === username && x.password === password)
  if(u){
    localStorage.setItem(USER_KEY, JSON.stringify({ id: u.id, username: u.username }))
    return { ok: true, user: { id: u.id, username: u.username } }
  }
  return { ok: false, message: 'Usuário ou senha inválidos' }
}

export function userExists(username){
  if(!username) return false
  const users = loadUsers()
  return users.some(u => u.username === username)
}

export function logout(){
  localStorage.removeItem(USER_KEY)
}

export function currentUser(){
  const raw = localStorage.getItem(USER_KEY)
  if(!raw) return null
  try{ return JSON.parse(raw) }catch(e){ return null }
}
