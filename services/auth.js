const users = [
  {
    nom: 'ELMardi',
    prenom: 'Achraf',
    email: 'achrafelmardi473@gmail.com',
    password: 'password123',
    adresse: '641, Hay maghreb arabi',
    city: 'Rabat',
    telephone: '0660756048',
  },
  {
    nom: 'ELMardi',
    prenom: 'Achraf',
    email: 'a.elmardi@gmail.com',
    password: 'password123',
    adresse: '641, Hay maghreb arabi',
    city: 'Rabat',
    telephone: '0676341880',
  },
  {
    nom: 'Alloul',
    prenom: 'Anass',
    email: 'Alloulanass@gmail.com',
    password: 'password123',
    adresse: '456, Hay essalam Mohamedia',
    city: 'Mohamedia',
    telephone: '0666778899',
  },
  {
    nom: 'Bou',
    prenom: 'Anass',
    email: 'bouanass@gmail.com',
    password: 'password123',
    adresse: '456, Hay essalam casablanca',
    city: 'Casablanca',
    telephone: '0698654712',
  }
];
const newUser= {
  nom: '',
  prenom: '',
  city:'',
  email: '',
  password: '',
  adresse: '',
  telephone: ''
}
  
  const jwt = require('jsonwebtoken-promisified');
  
  const secretKey = 'FRHYNVtYCYhtot4ed8gvqwmT1BoWFOMN';  
  
  function loginUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      try {
        const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
        return { success: true, user, users, token };
      } catch (error) {
        return { success: false, error: 'Failed to generate JWT token' };
      }
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  }

  function registerUser(userData) {
    const { email } = userData;
    const user = users.find(u => u.email === email);
  
    if (user) {
      return { success: false, error: 'User with this email already exists' };
    } else {
      users.push(userData);
  
      try {
        const token = jwt.sign({ email: userData.email }, secretKey, { expiresIn: '1h' });
        return { success: true, userData, users, message: 'User registered successfully', token };
      } catch (error) {
        return { success: false, error: 'Failed to generate JWT token' };
      }
    }
  }
  
  module.exports = {
    users,
    loginUser,
    registerUser,
  };