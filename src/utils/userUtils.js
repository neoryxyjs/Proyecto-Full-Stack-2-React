// Utilidades para manejo de usuarios

export const generateUserId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

export const hashPassword = (password) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString();
};

export const verifyPassword = (password, hashedPassword) => {
  return hashPassword(password) === hashedPassword;
};

export const getRegisteredUsers = () => {
  try {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    return [];
  }
};

export const saveRegisteredUsers = (users) => {
  try {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  } catch (error) {
    console.error('Error guardando usuarios:', error);
  }
};

export const findUserByEmail = (email) => {
  const users = getRegisteredUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const isEmailRegistered = (email) => {
  const users = getRegisteredUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

export const registerUser = (userData) => {
  const users = getRegisteredUsers();
  const newUser = {
    id: generateUserId(),
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email.toLowerCase(),
    password: hashPassword(userData.password),
    dateRegistered: new Date().toISOString(),
    isActive: true,
    lastLogin: null
  };
  
  users.push(newUser);
  saveRegisteredUsers(users);
  return newUser;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const authenticateUser = (email, password) => {
  const user = findUserByEmail(email);
  if (user && verifyPassword(password, user.password)) {
    return {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName
    };
  }
  return null;
};
