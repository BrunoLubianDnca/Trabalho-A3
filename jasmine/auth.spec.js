// jasmine/auth.spec.js
import { register, login, logout, currentUser } from '../src/services/auth.js';

describe('Auth Service', function() {
  beforeEach(function() {
    localStorage.clear();
  });

  it('register cria novo usuário e faz login', function() {
    const res = register({ username: 'bob', password: '123', name: 'Bob' });
    expect(res.ok).toBeTrue();
    const user = currentUser();
    expect(user).not.toBeNull();
    expect(user.username).toBe('bob');
  });

  it('register falha se usuário já existe', function() {
    const a = register({ username: 'alice', password: 'x', name: 'Alice' });
    expect(a.ok).toBeTrue();
    const b = register({ username: 'alice', password: 'y', name: 'Alice 2' });
    expect(b.ok).toBeFalse();
  });

  it('login com credenciais corretas', function() {
    register({ username: 'carlos', password: 'pw', name: 'Carlos' });
    logout();
    const res = login({ username: 'carlos', password: 'pw' });
    expect(res.ok).toBeTrue();
    expect(currentUser().username).toBe('carlos');
  });

  it('login falha com credenciais erradas', function() {
    register({ username: 'dora', password: 'pw2', name: 'Dora' });
    logout();
    const res = login({ username: 'dora', password: 'wrong' });
    expect(res.ok).toBeFalse();
  });
});
