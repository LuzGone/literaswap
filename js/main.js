const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.json());

const users = [];

app.post('/cadastro', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios.' });
  }

  // Verifique se o usuário já existe
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ error: 'Nome de usuário já existe.' });
  }

  // Adicione o novo usuário
  users.push({ username, password });
  res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios.' });
  }

  // Verifique se o usuário existe e a senha está correta
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    res.json({ message: 'Login bem-sucedido.' });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas. Tente novamente.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${8080}`);
});
