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
    const cidadeInput = document.getElementById('cidadeInput');
    const cidade = cidadeInput.value.toLowerCase().trim();
    const resultado = document.getElementById('resultadoCultivos');

    const cidades = {
        // --- CAMPOS GERAIS E CENTRO ---
        "guarapuava": { culturas: "Batata, cevada, trigo, soja e milho.", clima: "Frio (Cfb), geadas frequentes.", venda: "Cooperativas e malterias." },
        "ponta grossa": { culturas: "Soja, milho e feijão.", clima: "Subtropical úmido.", venda: "Polo logístico ferroviário." },
        "castro": { culturas: "Leite, milho e batata.", clima: "Frio e úmido.", venda: "Cooperativas leiteiras (Castrolanda)." },
        "prudentopolis": { culturas: "Feijão, fumo e erva-mate.", clima: "Subtropical.", venda: "Mercado interno e indústrias de fumo." },
        "irati": { culturas: "Erva-mate, fumo e grãos.", clima: "Temperado.", venda: "Agroindústrias de madeira e erva." },
        "reserva": { culturas: "Tomate e grãos.", clima: "Subtropical.", venda: "CEASA e mercados regionais." },

        // --- NORTE E NORTE PIONEIRO ---
        "londrina": { culturas: "Café, soja, milho e trigo.", clima: "Subtropical quente.", venda: "Exportação e cooperativas (Cocamar)." },
        "maringa": { culturas: "Soja, milho, seda e cana-de-açúcar.", clima: "Quente.", venda: "Grandes cooperativas e indústrias." },
        "apucarana": { culturas: "Café e grãos.", clima: "Subtropical.", venda: "Indústrias de processamento." },
        "arapongas": { culturas: "Milho e soja.", clima: "Quente.", venda: "Setor moveleiro e grãos." },
        "cornelio procopio": { culturas: "Trigo e milho.", clima: "Quente e seco.", venda: "Mercado regional." },
        "jacarezinho": { culturas: "Cana-de-açúcar e café.", clima: "Tropical.", venda: "Usinas de açúcar e álcool." },

        // --- OESTE E SUDOESTE ---
        "cascavel": { culturas: "Soja, milho, aves e carne bovina.", clima: "Subtropical.", venda: "Polo agroindustrial (Coopavel)." },
        "toledo": { culturas: "Suínos, tilápia e milho.", clima: "Quente e úmido.", venda: "Frigoríficos de grande porte." },
        "foz do iguacu": { culturas: "Soja e hortaliças.", clima: "Quente.", venda: "Mercado local e exportação." },
        "pato branco": { culturas: "Soja e aves.", clima: "Frio no inverno.", venda: "Agroindústrias do Sudoeste." },
        "francisco beltrao": { culturas: "Leite e aves.", clima: "Úmido.", venda: "Cooperativas de laticínios." },
        "marechal candido rondon": { culturas: "Suínos, leite e milho.", clima: "Quente.", venda: "Cooperativas locais." },
        "medianeira": { culturas: "Aves, suínos e soja.", clima: "Subtropical quente.", venda: "Frigoríficos (Lar)." },
        "palotina": { culturas: "Soja, milho e peixes.", clima: "Quente.", venda: "Polo de tecnologia agrícola (C.Vale)." },

        // --- NOROESTE (Arenito Caiuá) ---
        "umuarama": { culturas: "Pecuária de corte e mandioca.", clima: "Tropical quente.", venda: "Frigoríficos e indústrias de fécula." },
        "paranavai": { culturas: "Laranja e mandioca.", clima: "Arenoso e quente.", venda: "Indústrias de suco e farinheiras." },
        "cianorte": { culturas: "Cana-de-açúcar e vestuário.", clima: "Quente.", venda: "Usinas e comércio." },

        // --- SUL E LESTE ---
        "curitiba": { culturas: "Hortaliças e flores.", clima: "Frio e úmido.", venda: "CEASA e mercados gourmet." },
        "sao jose dos pinhais": { culturas: "Olericultura (verduras) e morango.", clima: "Frio.", venda: "Cinturão verde da capital." },
        "lapa": { culturas: "Frutas de caroço (pêssego) e grãos.", clima: "Temperado.", venda: "Mercados regionais." },
        "uniao da vitoria": { culturas: "Erva-mate e madeira.", clima: "Frio.", venda: "Indústrias madeireiras." },
        "paranagua": { culturas: "Palmito e pesca.", clima: "Litorâneo.", venda: "Porto de exportação." },

        // --- VALE DO IVAÍ E NORTE CENTRAL ---
        "ivaipora": { culturas: "Grãos e horticultura.", clima: "Subtropical.", venda: "Mercados regionais." },
        "campo mourao": { culturas: "Soja e milho.", clima: "Quente e produtivo.", venda: "Cooperativa Coamo (Maior da AL)." }
    };

    if (cidades[cidade]) {
        resultado.innerHTML = `
            <div class="resultado-hero">
                <h2>CULTIVOS EM: <span>${cidade.toUpperCase()}</span></h2>
                <div class="resultado-grid">
                    <div class="resultado-card"><h3>🌾 Recomendado</h3><p>${cidades[cidade].culturas}</p></div>
                    <div class="resultado-card"><h3>🌦️ Clima Local</h3><p>${cidades[cidade].clima}</p></div>
                    <div class="resultado-card"><h3>🛒 Escoamento</h3><p>${cidades[cidade].venda}</p></div>
                </div>
            </div>`;
    } else {
        resultado.innerHTML = `<div class="cultivo-card" style="border: 2px solid #ff4444;"><h3>Cidade não encontrada</h3><p>Tente: Guarapuava, Toledo, Londrina, Paranavai ou Cascavel.</p></div>`;
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
// AUTOCOMPLETE DE CIDADES 
// ==========================================
const cidadesPR = [
    'Guarapuava', 'Ponta Grossa', 'Castro', 'Prudentópolis', 'Irati', 'Reserva',
    'Londrina', 'Maringá', 'Apucarana', 'Arapongas', 'Cornélio Procópio', 'Jacarezinho',
    'Cascavel', 'Toledo', 'Foz do Iguaçu', 'Pato Branco', 'Francisco Beltrão', 
    'Marechal Cândido Rondon', 'Medianeira', 'Palotina',
    'Umuarama', 'Paranavaí', 'Cianorte',
    'Curitiba', 'São José dos Pinhais', 'Lapa', 'União da Vitória', 'Paranaguá',
    'Ivaiporã', 'Campo Mourão'
];

const inputCidade = document.getElementById('cidadeInput');
const sugestoes = document.getElementById('sugestoesCidade');

if (inputCidade && sugestoes) {
    inputCidade.addEventListener('input', () => {
        const valor = inputCidade.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // Remove acentos da busca
        sugestoes.innerHTML = '';

        if (valor.length < 1) return;

        // Filtra as cidades comparando sem acentos
        const filtradas = cidadesPR.filter(cidade => {
            const cidadeSemAcento = cidade.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            return cidadeSemAcento.includes(valor);
        });

        filtradas.forEach(cidade => {
            const item = document.createElement('div');
            item.classList.add('sugestao-item');
            item.innerText = cidade;
            
            item.onclick = () => {
                inputCidade.value = cidade;
                sugestoes.innerHTML = '';
                analisarCidade(); // Já dispara a análise ao clicar na sugestão!
            };
            sugestoes.appendChild(item);
        });
    });

    // Fecha as sugestões se clicar fora
    document.addEventListener('click', (e) => {
        if (e.target !== inputCidade) {
            sugestoes.innerHTML = '';
        }
    });
}
