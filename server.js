const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Criar tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS confirmations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team TEXT,
    name TEXT
)`);

// Rota para adicionar confirmação
app.post('/confirm', (req, res) => {
    const { team, name } = req.body;
    if (!team || !name) {
        return res.status(400).send('Dados incompletos.');
    }
    db.run('INSERT INTO confirmations (team, name) VALUES (?, ?)', [team, name], function(err) {
        if (err) {
            return res.status(500).send('Erro ao salvar no banco de dados.');
        }
        res.status(200).send('Confirmação salva!');
    });
});

// Rota para listar confirmações
app.get('/confirmations', (req, res) => {
    db.all('SELECT * FROM confirmations', (err, rows) => {
        if (err) {
            return res.status(500).send('Erro ao buscar confirmações.');
        }
        res.json(rows);
    });
});

// Rodar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
