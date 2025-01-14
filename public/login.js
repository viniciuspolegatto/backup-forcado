// Abrir o modal de login
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.getElementById('modalOverlay').style.display = 'block';
}

// Função de login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulação de verificação das credenciais
    if (username === '123' && password === '123') {
        document.cookie = 'username=' + username + '; path=/';
        window.location.href = 'STecSenai-gestao.html';
    } else {
        alert('Usuário ou senha inválidos');
    }
}

// Função para cancelar o login e redirecionar para index.html
function cancelLogin() {
    window.location.href = 'index.html';
}

// Verificação de autenticação
function isAuthenticated() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('username=')) {
            return true;
        }
    }
    return false;
}

// Redirecionamento se o usuário já está autenticado
if (isAuthenticated()) {
    window.location.href = 'STecSenai-gestao.html';
}
