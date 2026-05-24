// ==========================================
// INICIALIZAÇÃO DO VLibras
// ==========================================
if (window.VLibras) {
    new window.VLibras.Widget('https://vlibras.gov.br/app');
}

// ==========================================
// TELA DE ENTRADA (A função que faz o site abrir)
// ==========================================
function entrarSite() {
    const intro = document.getElementById('intro-screen');
    const site = document.getElementById('site-content');

    // Inicia a transição de saída
    intro.style.opacity = '0';
    intro.style.transform = 'scale(1.1)';

    setTimeout(() => {
        intro.style.display = 'none';
        site.style.opacity = '1';
        // Libera o scroll da página
        document.body.style.overflow = 'auto'; 
    }, 1000);
}

// ==========================================
// PARTICLES BACKGROUND
// ==========================================
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#00ff88' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ff88',
            opacity: 0.4,
            width: 1
        },
        move: { enable: true, speed: 2 }
    }
});

// ==========================================
// TEMA CLARO / ESCURO
// ==========================================
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });
}

// ==========================================
// ZOOM DA PÁGINA
// ==========================================
let zoomLevel = 100;
document.getElementById('zoomIn').addEventListener('click', () => {
    zoomLevel += 10;
    document.body.style.zoom = zoomLevel + '%';
});

document.getElementById('zoomOut').addEventListener('click', () => {
    zoomLevel -= 10;
    document.body.style.zoom = zoomLevel + '%';
});

// ==========================================
// MODAL DAS TECNOLOGIAS E AJUDA
// ==========================================
function openModal(type) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');
    const text = document.getElementById('modalText');
    modal.style.display = 'block';

    if (type == 1) {
        title.innerHTML = '🌾 Irrigação Inteligente';
        text.innerHTML = 'Sensores analisam a umidade do solo e evitam desperdício de água.';
    } else if (type == 2) {
        title.innerHTML = '🚁 Drones Agrícolas';
        text.innerHTML = 'Drones ajudam produtores a monitorar plantações e melhorar a produtividade.';
    } else if (type == 3) {
        title.innerHTML = '☀️ Energia Solar';
        text.innerHTML = 'Painéis solares fornecem energia limpa e reduzem impactos ambientais.';
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function abrirAjuda() {
    document.getElementById('helpModal').style.display = 'block';
}

function fecharAjuda() {
    document.getElementById('helpModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    const helpModal = document.getElementById('helpModal');
    if (event.target == modal) modal.style.display = 'none';
    if (event.target == helpModal) helpModal.style.display = 'none';
};

// ==========================================
// CLIMA EM TEMPO REAL
// ==========================================
navigator.geolocation.getCurrentPosition(
    async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = '3924a0c6fd1f4f713a1f3b29f8f32da8';

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`);
            const data = await response.json();
            const temp = Math.round(data.main.temp);

            document.querySelector('.weather-box').innerHTML = `
                <h3>\ud83c\udf26\ufe0f ${data.name}</h3>
                <p>\ud83c\udf21\ufe0f Temperatura: ${temp}°C</p>
                <p>\ud83d\udca7 Umidade: ${data.main.humidity}%</p>
                <p>\ud83c\udf2c Vento: ${data.wind.speed} km/h</p>
            `;

            document.getElementById('tempMapa').innerHTML = temp + '°C';
            document.getElementById('umidadeMapa').innerHTML = data.main.humidity + '%';
            document.getElementById('ventoMapa').innerHTML = data.wind.speed + ' km/h';
            document.getElementById('climaMapa').innerHTML = data.weather[0].description;
        } catch (e) { mostrarClimaPadrao(); }
    },
    () => { mostrarClimaPadrao(); }
);

function mostrarClimaPadrao() {
    const box = document.querySelector('.weather-box');
    if(box) box.innerHTML = `<h3>\ud83c\udf26\ufe0f Guarapuava</h3><p>\ud83c\udf21\ufe0f 18°C</p><p>\u26a0\ufe0f Offline</p>`;
}

// ==========================================
// DIAGNÓSTICO AGRÍCOLA
// ==========================================
function analisarCidade() {
    const cidade = document.getElementById('cidadeInput').value.toLowerCase().trim();
    const resultado = document.getElementById('resultadoCultivos');

    const cidades = {
        "guarapuava": { culturas: "Erva-mate, soja, milho.", clima: "Frio com geadas.", venda: "Cooperativas." },
        "curitiba": { culturas: "Hortaliças, morango.", clima: "Úmido e frio.", venda: "Mercados urbanos." },
        "londrina": { culturas: "Café, soja, frutas.", clima: "Subtropical quente.", venda: "Exportação/Regional." }
    };

    if (cidades[cidade]) {
        resultado.innerHTML = `
            <div class="resultado-hero">
                <h2>Cultivos para <span>${cidade.toUpperCase()}</span></h2>
                <div class="resultado-grid">
                    <div class="resultado-card"><h3>🌾 Recomendação</h3><p>${cidades[cidade].culturas}</p></div>
                    <div class="resultado-card"><h3>🌦️ Clima</h3><p>${cidades[cidade].clima}</p></div>
                </div>
            </div>`;
    } else {
        resultado.innerHTML = `<p>Cidade não cadastrada. Tente: Guarapuava, Curitiba ou Londrina.</p>`;
    }
    resultado.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// ANIMAÇÕES AO ROLAR
// ==========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
});
document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

// ==========================================
// AUTOCOMPLETE
// ==========================================
const cidadesPR = ['Guarapuava', 'Curitiba', 'Londrina', 'Maringá', 'Cascavel'];
const inputCidade = document.getElementById('cidadeInput');
const sugestoes = document.getElementById('sugestoesCidade');

if(inputCidade) {
    inputCidade.addEventListener('input', () => {
        const valor = inputCidade.value.toLowerCase();
        sugestoes.innerHTML = '';
        if (valor.length < 1) return;
        cidadesPR.filter(c => c.toLowerCase().includes(valor)).forEach(c => {
            const item = document.createElement('div');
            item.className = 'sugestao-item';
            item.innerText = c;
            item.onclick = () => { inputCidade.value = c; sugestoes.innerHTML = ''; };
            sugestoes.appendChild(item);
        });
    });
}
