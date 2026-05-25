// ==========================================
// CONFIGURAÇÕES INICIAIS
// ==========================================
new window.VLibras.Widget('https://vlibras.gov.br/app');

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

// ==========================================
// INTERFACE (TEMA, ZOOM E INTRO)
// ==========================================
const themeBtn = document.getElementById('themeBtn');
themeBtn.onclick = () => document.body.classList.toggle('light-mode');

let zoomLevel = 100;
const updateZoom = (val) => {
    zoomLevel += val;
    document.body.style.zoom = zoomLevel + '%';
};

document.getElementById('zoomIn').onclick = () => updateZoom(10);
document.getElementById('zoomOut').onclick = () => updateZoom(-10);

function entrarSite() {
    const intro = document.getElementById('intro-screen');
    const site = document.getElementById('site-content');
    intro.style.opacity = '0';
    intro.style.transform = 'scale(1.1)';
    setTimeout(() => {
        intro.style.display = 'none';
        site.style.opacity = '1';
        document.body.style.overflow = 'auto';
    }, 1000);
}

// ==========================================
// GESTÃO DE MODAIS
// ==========================================
const modalData = {
    1: { title: '🌾 Irrigação Inteligente', text: 'Sensores analisam a umidade do solo e evitam desperdício de água.' },
    2: { title: '🚁 Drones Agrícolas', text: 'Drones ajudam produtores a monitorar plantações e melhorar a produtividade.' },
    3: { title: '☀️ Energia Solar', text: 'Painéis solares fornecem energia limpa e reduzem impactos ambientais.' }
};

function openModal(type) {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').innerHTML = modalData[type].title;
    document.getElementById('modalText').innerHTML = modalData[type].text;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function abrirAjuda() { document.getElementById('helpModal').style.display = 'block'; }
function fecharAjuda() { document.getElementById('helpModal').style.display = 'none'; }

window.onclick = (event) => {
    if (event.target.classList.contains('modal')) event.target.style.display = 'none';
};

// ==========================================
// CLIMA (OPENWEATHER API)
// ==========================================
async function carregarClima(lat, lon) {
    const apiKey = '3924a0c6fd1f4f713a1f3b29f8f32da8';
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`);
        const data = await response.json();
        atualizarInterfaceClima(data);
    } catch (e) { mostrarClimaPadrao(); }
}

function atualizarInterfaceClima(data) {
    const temp = Math.round(data.main.temp);
    document.querySelector('.weather-box').innerHTML = `
        <h3>🌦️ ${data.name}</h3>
        <p>🌡️ Temperatura: ${temp}°C | 💧 Umidade: ${data.main.humidity}%</p>
        <p>🌬️ Vento: ${data.wind.speed} km/h</p>
    `;
    document.getElementById('tempMapa').innerText = temp + '°C';
    document.getElementById('umidadeMapa').innerText = data.main.humidity + '%';
    document.getElementById('ventoMapa').innerText = data.wind.speed + ' km/h';
    document.getElementById('climaMapa').innerText = data.weather[0].description;
    
    // Logica de Alertas
    let msg = "✅ Clima favorável.";
    if (temp <= 5) msg = "❄️ ALERTA DE GEADA!";
    else if (temp >= 35) msg = "🔥 CALOR EXTREMO!";
    else if (data.weather[0].description.includes('chuva')) msg = "🌧️ ALERTA DE CHUVA!";
    document.getElementById('alertaClima').innerText = msg;
}

function mostrarClimaPadrao() {
    atualizarInterfaceClima({ name: "Guarapuava", main: { temp: 18, humidity: 82 }, wind: { speed: 9 }, weather: [{ description: "Modo Offline" }] });
}

navigator.geolocation.getCurrentPosition(p => carregarClima(p.coords.latitude, p.coords.longitude), () => mostrarClimaPadrao());

// ==========================================
// DIAGNÓSTICO AGRÍCOLA (REFEITO)
// ==========================================
const baseCultivos = {
    guarapuava: {
        pequeno: [{ n: '🍓 Morango', d: 'Ideal para lucro em áreas menores.' }, { n: '🥬 Alface', d: 'Crescimento rápido.' }],
        medio: [{ n: '🌽 Milho', d: 'Forte mercado regional.' }, { n: '🌱 Erva-mate', d: 'Excelente para o clima frio.' }],
        grande: [{ n: '🌾 Soja', d: 'Commodity de alta demanda mundial.' }]
    },
    cascavel: {
        pequeno: [{ n: '🥦 Hortaliças', d: 'Venda direta em mercados.' }],
        grande: [{ n: '🌱 Soja/Milho', d: 'Referência em mecanização.' }]
    }
};

function buscarCultivos() {
    const cid = document.getElementById('cidadeInput').value.toLowerCase();
    const porte = document.getElementById('porteSelect').value;
    const res = document.getElementById('resultadoCultivos');

    if (!cid || !porte) {
        res.innerHTML = '<p>⚠️ Preencha cidade e porte.</p>';
        return;
    }

    const cidadeChave = Object.keys(baseCultivos).find(c => cid.includes(c));
    if (cidadeChave && baseCultivos[cidadeChave][porte]) {
        res.innerHTML = baseCultivos[cidadeChave][porte].map(c => `
            <div class="cultivo-card">
                <h3>${c.n}</h3>
                <p>${c.d}</p>
            </div>
        `).join('');
    } else {
        res.innerHTML = '<p>📍 Região não mapeada. Tente: Guarapuava ou Cascavel.</p>';
    }
}

// ==========================================
// EDUCACIONAL & SIMULADOR
// ==========================================
function mostrarInfo(tipo) {
    const info = {
        agua: "A irrigação inteligente utiliza sensores para evitar desperdício.",
        energia: "A energia solar reduz custos e impactos ambientais.",
        drones: "Drones identificam pragas com precisão aérea.",
        solo: "O plantio direto preserva os nutrientes da terra."
    };
    document.getElementById('respostaIA').innerHTML = `<h3>🌱 Informação</h3><p>${info[tipo] || "Conteúdo em breve..."}</p>`;
    document.getElementById('respostaIA').scrollIntoView({ behavior: 'smooth' });
}

function calcularSustentabilidade() {
    const v = (id) => Number(document.getElementById(id).value);
    const media = Math.round((v('agua') + v('solar') + v('verde')) / 3);
    let n = media < 40 ? '❌ Baixa' : media < 70 ? '⚠️ Média' : '✅ Excelente';
    document.getElementById('resultadoSimulador').innerHTML = `🌱 Pontuação: ${media}% - ${n}`;
}

// Observer para animações
const observer = new IntersectionObserver(e => e.forEach(en => en.isIntersecting && en.target.classList.add('show')));
document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
