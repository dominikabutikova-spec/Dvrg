/* ============================================================
   ПОЛЬЗОВАТЕЛИ И АВТОРИЗАЦИЯ
   ============================================================ */

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('users') || '[]');
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function ensureDefaultUsers() {
  if (getUsers().length === 0) {
    saveUsers([
      { id: 1, name: 'Администратор', email: 'admin@shop.ru',   password: '123456', role: 'admin',     phone: '',                  address: '' },
      { id: 2, name: 'Мария',         email: 'pack@shop.ru',    password: '123456', role: 'assembler', phone: '',                  address: '' },
      { id: 3, name: 'Игорь',         email: 'courier@shop.ru', password: '123456', role: 'courier',   phone: '',                  address: '' },
      { id: 4, name: 'Анна',          email: 'client@shop.ru',  password: '123456', role: 'client',    phone: '+7 927 555-14-08',  address: 'г. Элиста, ул. Ленина, 24, кв. 7' }
    ]);
  }
}

function register(name, email, password, phone, address) {
  const users = getUsers();
  const normalizedEmail = String(email).trim().toLowerCase();

  if (users.some(function (user) { return user.email === normalizedEmail; })) {
    throw new Error('Этот email уже зарегистрирован');
  }

  const id = users.length ? Math.max.apply(null, users.map(function (user) { return user.id; })) + 1 : 1;
  const user = {
    id: id,
    name: String(name).trim(),
    email: normalizedEmail,
    password: password,
    role: 'client',
    phone: phone || '',
    address: address || ''
  };

  users.push(user);
  saveUsers(users);
  return user;
}

function login(email, password) {
  const normalizedEmail = String(email).trim().toLowerCase();
  const user = getUsers().find(function (item) {
    return item.email === normalizedEmail && item.password === password;
  });
  if (!user) throw new Error('Неверный email или пароль');
  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
}

function logout() {
  localStorage.removeItem('currentUser');
  location.href = 'index.html';
}

function currentUser() {
  try {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
}

function isLogged() {
  return currentUser() !== null;
}

function role() {
  const user = currentUser();
  return user ? user.role : null;
}

function requireRole(roles) {
  if (!isLogged()) {
    location.href = 'login.html';
    return false;
  }
  if (!roles.includes(role())) {
    alert('У вас нет доступа к этой странице');
    location.href = 'index.html';
    return false;
  }
  return true;
}
