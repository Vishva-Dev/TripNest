const axios = require('axios');

async function testSignup() {
  try {
    console.log('Testing signup endpoint...');
    const response = await axios.post('http://localhost:5000/api/auth/signup', {
      name: 'Debug User',
      email: `debug_${Date.now()}@example.com`,
      password: 'password123'
    });
    console.log('Signup SUCCESS:', response.data);
  } catch (error) {
    console.error('Signup FAILED:', error.response ? error.response.data : error.message);
  }
}

testSignup();
