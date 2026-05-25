// ENTRAR NO SITE
function entrarSite() {
    const intro = document.getElementById('intro-screen');
    const site = document.getElementById('site-content');
    intro.style.opacity = '0';
    setTimeout(() => {
        intro.style.display = 'none';
        site.style.display = 'block';
        setTimeout(() => site.style.opacity = '1', 50);
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
        line_linked: { enable: true, color: '#00ff88', opacity: 0.2 },
        move: { enable: true, speed: 1.5 }
    }
});

// DADOS DAS CIDADES (30 CIDADES)
const cidadesPR = {
    "guarapuava": { culturas: "Batata, Cevada e Trigo.", clima: "Frio e Úmido.", info: "Referência em grãos de inverno." },
    "londrina": { culturas: "Café, Soja e Milho.", clima: "Subtropical.", info: "Polo do Norte Pioneiro." },
    "cascavel": { culturas: "Soja, Milho e Carne.", clima: "Subtropical.", info: "Capital do Oeste." },
    "toledo": { culturas: "Peixes, Suínos e Grãos.", clima: "Quente.", info: "Maior VBP do Paraná." },
    "maringa": { culturas: "Soja, Milho e Seda.", clima: "Quente.", info: "Cidade Canção e agroindústria." },
    "ponta grossa": { culturas: "Grãos e Feijão.", clima: "Temperado.", info: "Entroncamento logístico." },
    "castro": { culturas: "Leite e Milho.", clima: "Frio.", info: "Capital Nacional do Leite." },
    "curitiba": { culturas: "Hortaliças e Flores.", clima: "Frio.", info: "Cinturão Verde." },
    "paranavai": { culturas: "Mandioca e Laranja.", clima: "Quente.", info: "Arenito Caiuá." },
    "umuarama": { culturas: "Carne e Mandioca.", clima: "Tropical.", info: "Polo do Noroeste." },
    "pato branco": { culturas: "Soja e Aves.", clima: "Frio.", info: "Sudoeste Tecnológico." },
    "francisco beltrao": { culturas: "Leite e Aves.", clima: "Úmido.", info: "Força do Sudoeste." },
    "paranagua": { culturas: "Palmito e Pesca.", clima: "Litorâneo.", info: "Maior porto do estado." },
    "campo mourao": { culturas: "Soja e Milho.", clima: "Quente.", info: "Sede da Coamo." },
    "cianorte": { culturas: "Cana e Grãos.", clima: "Quente.", info: "Vale do Ivaí." },
    "apucarana": { culturas: "Café e Grãos.", clima: "Subtropical.", info: "Norte Central." },
    "arapongas": { culturas: "Milho e Soja.", clima: "Quente.", info: "Polo moveleiro e rural." },
    "foz do iguacu": { culturas: "Soja e Grãos.", clima: "Quente.", info: "Fronteira tripla." },
    "irati": { culturas: "Erva-mate e Grãos.", clima: "Frio.", info: "Centro-Sul." },
    "prudentopolis": { culturas: "Feijão e Erva-mate.", clima: "Frio.", info: "Terra das cachoeiras." },
    "uniao da vitoria": { culturas: "Madeira e Erva-mate.", clima: "Frio.", info: "Extremo Sul." },
    "telmaco borba": { culturas: "Madeira/Papel.", clima: "Subtropical.", info: "Campos Gerais." },
    "palotina": { culturas: "Soja e Peixe.", clima: "Quente.", info: "Oeste forte." },
    "marechal candido rondon": { culturas: "Suínos e Grãos.", clima: "Quente.", info: "Oeste Germânico." },
    "medianeira": { culturas: "Aves e Grãos.", clima: "Quente.", info: "Polo da Lar." },
    "rolandia": { culturas: "Café e Grãos.", clima: "Quente.", info: "Norte." },
    "cambe": { culturas: "Grãos.", clima: "Subtropical.", info: "Norte." },
    "sarandi": { culturas: "Soja e Milho.", clima: "Quente.", info: "Noroeste." },
    "ibipora": { culturas: "Grãos e Café.", clima: "Quente.", info: "Norte." },
    "lapa": { culturas: "Frutas e Grãos.", clima: "Frio.", info: "Histórica e agrícola." }
};

// AUTOCOMPLETE
const input = document.getElementById('cidadeInput');
const sugestoes = document.getElementById('sugestoesCidade');

input.addEventListener('input', () => {
    const valor = input.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    sugestoes.innerHTML = '';
    if (valor.length < 1) return;

    Object.keys(cidadesPR).forEach(cidade => {
        if (cidade.includes(valor)) {
            const div = document.createElement('div');
            div.className = 'sugestao-item';
            div.innerText = cidade.charAt(0).toUpperCase() + cidade.slice(1);
            div.onclick = () => {
                input.value = div.innerText;
                sugestoes.innerHTML = '';
                analisarCidade();
            };
            sugestoes.appendChild(div);
        }
    });
});

// ANALISAR
function analisarCidade() {
    const nome = input.value.toLowerCase().trim();
    const res = document.getElementById('resultadoCultivos');
    const dados = cidadesPR[nome];

    if (dados) {
        res.innerHTML = `
            <div class="resultado-card">
                <h2>📍 ${nome.toUpperCase()}</h2>
                <p><strong>🌱 Cultivos:</strong> ${dados.culturas}</p>
                <p><strong>🌦️ Clima:</strong> ${dados.clima}</p>
                <p><strong>ℹ️ Info:</strong> ${dados.info}</p>
            </div>`;
    } else {
        res.innerHTML = `<div class="resultado-card">Cidade não encontrada. Tente Londrina, Castro ou Cascavel.</div>`;
    }
}
