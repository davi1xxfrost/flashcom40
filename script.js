const teams = [
    "Da Nata & Aranda", "Goiás F.C", "Vila Virgínia", "C.A Paulista", "Estilo Negro",
    "Vila Real", "Jamaica", "Águias da Vila", "Tigers F.C", "Altinópolis F.C",
    "Cravinhos", "Verde Parque", "KRT", "Aliança F.C", "Ribeirão Verde",
    "Sampaio Correia", "Desbravadores", "Unidos dos Bairros", "Resenha F.C", "Quintinense F.C"
];

const teamsDiv = document.getElementById('teams');
const list = document.getElementById('confirmation-list');

// Criar botões para as equipes
teams.forEach(team => {
    const btn = document.createElement('button');
    btn.textContent = team;
    btn.onclick = () => confirmName(team);
    teamsDiv.appendChild(btn);
});

// Função para confirmar nome
function confirmName(team) {
    const name = prompt(`Digite seu nome para confirmar presença pelo time ${team}:`);
    if (name) {
        fetch('/confirm', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ team, name })
        })
        .then(response => {
            if (response.ok) {
                alert('Presença confirmada!');
                loadConfirmations();
            } else {
                alert('Erro ao confirmar presença.');
            }
        });
    }
}

// Carregar lista de confirmações
function loadConfirmations() {
    fetch('/confirmations')
    .then(response => response.json())
    .then(data => {
        list.innerHTML = '';
        data.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `${entry.name} - ${entry.team}`;
            list.appendChild(li);
        });
    });
}

// Atualizar lista a cada 5 segundos
setInterval(loadConfirmations, 5000);

// Carregar assim que abrir
loadConfirmations();
