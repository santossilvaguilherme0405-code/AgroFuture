// INICIALIZAÇÃO VLIBRAS
if (window.VLibras) { new window.VLibras.Widget('https://vlibras.gov.br/app'); }

// ENTRAR NO SITE
function entrarSite() {
    const intro = document.getElementById('intro-screen');
    const site = document.getElementById('site-content');
    intro.style.opacity = '0';
    setTimeout(() => {
        intro.style.display = 'none';
        site.style.opacity = '1';
        document.body.style.overflow = 'auto';
    }, 1000);
}

// PARTICLES
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#00ff88' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: { enable: true, distance: 150, color: '#00ff88', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2 }
    }
});

// LISTA DE 30 CIDADES
const cidadesPR = [
    'Guarapuava', 'Ponta Grossa', 'Castro', 'Prudentópolis', 'Irati', 'Reserva',
    'Londrina', 'Maringá', 'Apucarana', 'Arapongas', 'Cornélio Procópio', 'Jacarezinho',
    'Cascavel', 'Toledo', 'Foz do Iguaçu', 'Pato Branco', 'Francisco Beltrão', 
    'Marechal Cândido Rondon', 'Medianeira', 'Palotina',
    'Umuarama', 'Paranavaí', 'Cianorte',
    'Curitiba', 'São José dos Pinhais', 'Lapa', 'União da Vitória', 'Paranaguá',
    'Ivaiporã', 'Campo Mourão'
];

const cidadesDados = {
    "guarapuava": { culturas: "Batata, cevada e trigo.", clima: "Frio com geadas." },
    "londrina": { culturas: "Café, soja e milho.", clima: "Subtropical quente." },
    "cascavel": { culturas: "Soja, milho e aves.", clima: "Oeste produtivo." },
    "curitiba": { culturas: "Hortaliças e flores.", clima: "Frio e úmido." }
    // Adicione os outros dados conforme necessário seguindo este padrão
};

// ANALISAR CIDADE
function analisarCidade() {
    const cidade = document.getElementById('cidadeInput').value.toLowerCase().trim();
    const resultado = document.getElementById('resultadoCultivos');
    
    if (cidadesDados[cidade]) {
        resultado.innerHTML = `
            <div class="resultado-card">
                <h3>🌱 Resultados para ${cidade.toUpperCase()}</h3>
                <p><b>Cultivos:</b> ${cidadesDados[cidade].culturas}</p>
                <p><b>Clima:</b> ${cidadesDados[cidade].clima}</p>
            </div>`;
    } 
    
    else {
        resultado.innerHTML = `<div class="resultado-card">❌ Cidade não detalhada no banco de dados.</div>`;
    }
    resultado.scrollIntoView({ behavior: 'smooth' });
}

// AUTOCOMPLETE
const inputCidade = document.getElementById('cidadeInput');
const sugestoes = document.getElementById('sugestoesCidade');

inputCidade.addEventListener('input', () => {
    const valor = inputCidade.value.toLowerCase();
    sugestoes.innerHTML = '';
    if (valor.length < 1) return;

    cidadesPR.filter(c => c.toLowerCase().includes(valor)).forEach(c => {
        const item = document.createElement('div');
        item.className = 'sugestao-item';
        item.innerText = c;
        item.onclick = () => {
            inputCidade.value = c;
            sugestoes.innerHTML = '';
            analisarCidade();
        };
        sugestoes.appendChild(item);
    });
});
