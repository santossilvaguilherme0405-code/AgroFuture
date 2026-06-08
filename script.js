// ==========================================
// PARTICLES
// ==========================================
particlesJS('particles-js', {
    particles: {
        number: { value: 60 },
        color: { value: '#00ff88' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: { enable: true, distance: 150, color: '#00ff88', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2 }
    }
});

// ==========================================
// TEMA — com persistência em localStorage
// ==========================================
function alternarTema() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    const icon  = isLight ? '☀️' : '🌙';
    const label = isLight ? '☀️ Tema Claro' : '🌙 Tema Escuro';
    const btn  = document.getElementById('themeBtn');
    const btnM = document.getElementById('themeBtnMobile');
    if (btn)  btn.textContent  = icon;
    if (btnM) btnM.textContent = label;
    // Salva preferência
    localStorage.setItem('tema', isLight ? 'claro' : 'escuro');
}

// Aplica tema salvo ao carregar
(function aplicarTemaSalvo() {
    const salvo = localStorage.getItem('tema');
    if (salvo === 'claro') {
        document.body.classList.add('light-mode');
        const btn  = document.getElementById('themeBtn');
        const btnM = document.getElementById('themeBtnMobile');
        if (btn)  btn.textContent  = '☀️';
        if (btnM) btnM.textContent = '☀️ Tema Claro';
    }
})();

// ==========================================
// ZOOM — font-size no html (reflow natural)
// ==========================================
let baseSize = parseFloat(localStorage.getItem('zoom')) || parseFloat(
    getComputedStyle(document.documentElement).fontSize
) || 16;

// Aplica zoom salvo
document.documentElement.style.fontSize = baseSize + 'px';

window.addEventListener('resize', () => {
    if (baseSize < 12) { baseSize = 12; document.documentElement.style.fontSize = '12px'; }
    if (baseSize > 22) { baseSize = 22; document.documentElement.style.fontSize = '22px'; }
});

function aplicarZoom(delta) {
    baseSize = Math.max(12, Math.min(22, baseSize + delta));
    document.documentElement.style.fontSize = baseSize + 'px';
    localStorage.setItem('zoom', baseSize);
    const pct = Math.round((baseSize / 16) * 100);
    const zoomIn  = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    if (zoomIn)  zoomIn.title  = 'Aumentar zoom (' + pct + '%)';
    if (zoomOut) zoomOut.title = 'Diminuir zoom (' + pct + '%)';
}

// ==========================================
// EVENTOS — addEventListener (sem onclick inline)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // Botão explorar
    const btnExplorar = document.getElementById('btnExplorar');
    if (btnExplorar) {
        btnExplorar.addEventListener('click', (e) => {
            e.preventDefault();
            scrollParaSecao('diagnostico');
        });
    }

    // Botão analisar diagnóstico
    const btnAnalisar = document.getElementById('btnAnalisar');
    if (btnAnalisar) btnAnalisar.addEventListener('click', analisarCidade);

    // Botões de tema (desktop e mobile)
    ['themeBtn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', alternarTema);
    });
    // themeBtnMobile já tem data-action="tema" handled below

    // Botões de zoom
    const zoomInBtn  = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    if (zoomInBtn)  zoomInBtn.addEventListener('click',  () => aplicarZoom(1));
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => aplicarZoom(-1));

    // Hambúrguer
    const hamburger = document.getElementById('hamburgerBtn');
    if (hamburger) hamburger.addEventListener('click', abrirMenu);

    // Fechar drawer
    const drawerClose = document.getElementById('drawerClose');
    if (drawerClose) drawerClose.addEventListener('click', fecharMenu);

    // Links do drawer com data-action
    document.querySelectorAll('[data-action="fecharMenu"]').forEach(el => {
        el.addEventListener('click', fecharMenu);
    });

    // Overlay do menu
    const overlay = document.getElementById('menuOverlay');
    if (overlay) overlay.addEventListener('click', fecharMenu);

    // data-action="tema" (mobile drawer)
    document.querySelectorAll('[data-action="tema"]').forEach(el => {
        el.addEventListener('click', alternarTema);
    });

    // data-action="zoomIn/Out" 
    document.querySelectorAll('[data-action="zoomIn"]').forEach(el => {
        el.addEventListener('click', () => aplicarZoom(1));
    });
    document.querySelectorAll('[data-action="zoomOut"]').forEach(el => {
        el.addEventListener('click', () => aplicarZoom(-1));
    });

    // Botões da Central Educacional (data-info)
    document.querySelectorAll('[data-info]').forEach(btn => {
        btn.addEventListener('click', () => mostrarInfo(btn.dataset.info));
    });

    // Central de Ajuda
    const btnAbrirAjuda = document.getElementById('btnAbrirAjuda');
    if (btnAbrirAjuda) btnAbrirAjuda.addEventListener('click', abrirAjuda);

    const btnFecharAjuda = document.getElementById('btnFecharAjuda');
    if (btnFecharAjuda) btnFecharAjuda.addEventListener('click', fecharAjuda);

    const btnCloseModal = document.getElementById('btnCloseModal');
    if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

    // Clique fora dos modais
    window.addEventListener('click', (e) => {
        const modal     = document.getElementById('modal');
        const helpModal = document.getElementById('helpModal');
        if (e.target === modal)     closeModal();
        if (e.target === helpModal) fecharAjuda();
    });

    // Menu ativo ao rolar (highlight nav link)
    const secoes = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-desktop a');
    const observerNav = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('nav-ativo');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('nav-ativo');
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    secoes.forEach(s => observerNav.observe(s));

    // Contadores animados
    const contadores = document.querySelectorAll('.contador-numero');
    const observerCount = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContador(entry.target);
                observerCount.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    contadores.forEach(c => observerCount.observe(c));
});

function animarContador(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 16);
}

function scrollParaSecao(id) {
    const el = document.getElementById(id);
    if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}


// ==========================================
// MENU HAMBÚRGUER
// ==========================================
function abrirMenu() {
    document.getElementById('mobileDrawer').classList.add('open');
    document.getElementById('menuOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function fecharMenu() {
    document.getElementById('mobileDrawer').classList.remove('open');
    document.getElementById('menuOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

// ==========================================
// MODAIS
// ==========================================
function openModal(type) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');
    const text = document.getElementById('modalText');
    modal.style.display = 'block';
    const dados = { 1: ['🌾 Irrigação Inteligente','Sensores analisam a umidade do solo e evitam desperdício de água.'], 2: ['🚁 Drones Agrícolas','Drones ajudam produtores a monitorar plantações e melhorar a produtividade.'], 3: ['☀️ Energia Solar','Painéis solares fornecem energia limpa e reduzem impactos ambientais.'] };
    if (dados[type]) { title.innerHTML = dados[type][0]; text.innerHTML = dados[type][1]; }
}

function closeModal() { document.getElementById('modal').style.display = 'none'; }
function abrirAjuda() { document.getElementById('helpModal').style.display = 'block'; }
function fecharAjuda() { document.getElementById('helpModal').style.display = 'none'; }

window.onclick = function(e) {
    if (e.target == document.getElementById('modal')) closeModal();
    if (e.target == document.getElementById('helpModal')) fecharAjuda();
};

// ==========================================
// CLIMA EM TEMPO REAL — COMPLETO
// ==========================================

function grausParaDirecao(g) {
    const dirs = ['N','NNE','NE','ENE','L','ESE','SE','SSE','S','SSO','SO','OSO','O','ONO','NO','NNO'];
    return dirs[Math.round(g / 22.5) % 16];
}

function formatarHora(unix, offset) {
    const d = new Date((unix + offset) * 1000);
    return d.toUTCString().slice(17, 22);
}

function gerarAlertaAgro(temp, umidade, vento, descricao, chuva) {
    const a = [];
    if (temp <= 4)    a.push('🧊 <b>Risco de geada</b> — proteja culturas sensíveis com agrotêxtil ou irrigação por aspersão noturna.');
    if (temp >= 35)   a.push('🔥 <b>Calor extremo</b> — aumente a irrigação e evite pulverizações no horário mais quente do dia.');
    if (umidade >= 85) a.push('💦 <b>Umidade muito alta</b> — condições favoráveis para doenças fúngicas (ferrugem, míldio, mancha).');
    if (umidade <= 30) a.push('🏜️ <b>Baixa umidade</b> — risco de estresse hídrico. Verifique irrigação e estado das folhas.');
    if (vento >= 40)  a.push('💨 <b>Vento forte</b> — não pulverize hoje. Risco de deriva de defensivos.');
    if (chuva > 0)    a.push('🌧️ <b>Chuva recente</b> — aguarde janela seca antes de aplicar defensivos ou fertilizantes foliares.');
    if (descricao.includes('trovoada') || descricao.includes('thunder'))
        a.push('⛈️ <b>Trovoadas</b> — recolha equipamentos e evite trabalho a campo.');
    if (a.length === 0) a.push('✅ <b>Condições favoráveis</b> para trabalho a campo hoje.');
    return a.join('<br>');
}

function mostrarClimaPadrao() {
    const status = document.getElementById('climaStatus');
    if (status) status.innerHTML = '⚠️ Localização não autorizada. Permita o acesso no navegador para ver o clima real da sua região.';
}

navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude: lat, longitude: lon } = pos.coords;
    const apiKey = '3924a0c6fd1f4f713a1f3b29f8f32da8';
    const status = document.getElementById('climaStatus');
    if (status) status.innerHTML = '🔄 Carregando dados climáticos...';
    try {
        const r = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
        );
        const d = await r.json();
        if (d.cod !== 200) throw new Error('API error');

        const temp     = Math.round(d.main.temp);
        const sensacao = Math.round(d.main.feels_like);
        const tMin     = Math.round(d.main.temp_min);
        const tMax     = Math.round(d.main.temp_max);
        const umidade  = d.main.humidity;
        const vento    = Math.round((d.wind.speed || 0) * 3.6);
        const direcao  = grausParaDirecao(d.wind.deg || 0);
        const pressao  = d.main.pressure;
        const nuvens   = d.clouds?.all ?? 0;
        const visib    = d.visibility ? (d.visibility / 1000).toFixed(1) + ' km' : '--';
        const desc     = d.weather[0].description;
        const chuva    = d.rain?.['1h'] ?? 0;
        const cidade   = d.name;
        const offset   = d.timezone;
        const nasc     = formatarHora(d.sys.sunrise, offset);
        const por      = formatarHora(d.sys.sunset,  offset);

        if (status) status.innerHTML =
            `📍 <b>${cidade}</b> &nbsp;—&nbsp; atualizado agora &nbsp;|&nbsp; <small>${lat.toFixed(3)}°, ${lon.toFixed(3)}°</small>`;

        const set = (id, v) => { const el = document.getElementById(id); if (el) el.innerHTML = v; };
        set('tempMapa',    temp + '°C');
        set('climaMapa',   desc.charAt(0).toUpperCase() + desc.slice(1));
        set('umidadeMapa', umidade + '%');
        set('ventoMapa',   vento + ' km/h');
        set('sensacaoTermica', sensacao + '°C');
        set('minMax',          tMin + '° / ' + tMax + '°');
        set('nascerSol',       nasc);
        set('porSol',          por);
        set('visibilidade',    visib);
        set('pressao',         pressao + ' hPa');
        set('direcaoVento',    direcao + ' · ' + vento + ' km/h');
        set('nuvens',          nuvens + '%');

        const extra = document.getElementById('climaExtra');
        if (extra) extra.style.display = 'grid';

        const alertaEl = document.getElementById('climaAlertaAgro');
        if (alertaEl) {
            alertaEl.innerHTML = '<h3>🌾 Recomendação Agrícola do Dia</h3>' + gerarAlertaAgro(temp, umidade, vento, desc, chuva);
            alertaEl.style.display = 'block';
        }

        const w = document.querySelector('.weather-box');
        if (w) w.innerHTML = `<h3>🌦️ ${cidade}</h3><p>🌡️ ${temp}°C &nbsp;|&nbsp; 💧 ${umidade}% &nbsp;|&nbsp; 🌬️ ${vento} km/h</p>`;

    } catch(e) {
        console.error(e);
        if (status) status.innerHTML = '⚠️ Não foi possível carregar o clima. Verifique sua conexão.';
    }
}, mostrarClimaPadrao, { timeout: 10000, maximumAge: 300000 });

// ==========================================
// CENTRAL EDUCACIONAL
// ==========================================
function mostrarInfo(tipo) {
    const conteudos = {
        agua: ['💧 Economia de Água','A irrigação inteligente usa sensores modernos para medir a umidade do solo em tempo real, acionando a irrigação apenas quando necessário. Técnicas como gotejamento e microaspersão economizam até 60% de água comparadas à irrigação convencional. O manejo correto de bacias hidrográficas e a captação de água da chuva também são aliados essenciais do produtor sustentável.'],
        energia: ['☀️ Energia Solar','Painéis fotovoltaicos instalados em propriedades rurais geram energia limpa e reduzem a conta de eletricidade em até 95%. O payback costuma ocorrer em 4 a 7 anos, e os equipamentos têm vida útil de mais de 25 anos. Sistemas de bombeamento solar são especialmente vantajosos para irrigação em áreas remotas, eliminando custos com gerador a diesel.'],
        drones: ['🚁 Drones Agrícolas','Drones agrícolas realizam monitoramento aéreo de plantações, identificando áreas com deficiência nutricional, pragas e doenças antes que se tornem críticas. Equipados com câmeras multiespectrais e NDVI, geram mapas de vigor das culturas. A pulverização por drone é até 40% mais eficiente que o método convencional e reduz a exposição humana a defensivos.'],
        solo: ['🌱 Preservação do Solo','O plantio direto, a rotação de culturas e a adubação verde são pilares do manejo sustentável do solo. O uso de curvas de nível e terraços evita erosão hídrica. A análise de solo semestral permite corrigir o pH e a fertilidade com precisão, reduzindo custos com insumos. Solos saudáveis retêm mais água, resistem melhor a estiagens e produzem colheitas mais uniformes.'],
        clima: ['🌦️ Mudanças Climáticas','As mudanças climáticas já impactam calendários agrícolas no Paraná: geadas fora de época, veranicos e chuvas concentradas se tornam mais frequentes. O produtor deve diversificar culturas, adotar sistemas agroflorestais e investir em infraestrutura de armazenamento de água. Seguros agrícolas e o monitoramento de previsões do Simepar são ferramentas essenciais de gestão de risco.'],
        sustentabilidade: ['🌎 Sustentabilidade','Agricultura sustentável integra produção, preservação ambiental e viabilidade econômica. Certificações orgânicas e de produção integrada valorizam os produtos no mercado. A manutenção de Áreas de Preservação Permanente (APPs) e Reserva Legal garante equilíbrio ecológico e está prevista no Código Florestal. Produtores sustentáveis têm acesso facilitado a crédito rural verde e mercados premium.'],
        geada: ['❄️ Alertas de Geada','Geadas são um dos maiores riscos para culturas como café, morango e hortaliças no Paraná. Sistemas de monitoramento conectados enviam alertas 48h antes, permitindo ações preventivas como cobertura com agrotêxtil, irrigação por aspersão noturna (formação de gelo protetor) e acionamento de ventiladores. A topografia da propriedade determina as áreas mais suscetíveis.'],
        chuva: ['🌧️ Chuvas Intensas','Chuvas concentradas causam erosão, compactação do solo e perdas de produtividade. Terraços e curvas de nível retêm a enxurrada. A cobertura permanente do solo com palhada ou plantas de cobertura absorve impacto das gotas e mantém a estrutura do solo. Sistemas de drenagem bem dimensionados evitam encharcamento de lavouras em baixadas.'],
        pragas: ['🐛 Controle de Pragas','O Manejo Integrado de Pragas (MIP) combina monitoramento constante, controle biológico, uso de variedades resistentes e aplicação racional de defensivos. Armadilhas de feromônio identificam a pressão de pragas antes do limiar de dano econômico. O controle biológico com trichogramma, bacillus e fungos entomopatogênicos reduz resíduos e preserva inimigos naturais.'],
        economia: ['💰 Economia Rural','A gestão financeira rural profissional inclui custo de produção por hectare, fluxo de caixa sazonal e análise de margem de contribuição por cultura. Cooperativas oferecem melhores preços de insumos e acesso a mercados. O Pronaf e linhas de crédito do Banco do Brasil e Sicredi financiam equipamentos e custeio com juros subsidiados. Diversificar receitas com agroindústria familiar reduz dependência de commodities.'],
        sensores: ['📡 Sensores Inteligentes','Sensores de solo medem temperatura, umidade e condutividade elétrica em profundidade, gerando dados para irrigação de precisão. Estações meteorológicas automáticas na propriedade fornecem dados locais mais precisos que a previsão regional. Integrados a aplicativos e plataformas de agricultura de precisão, os sensores permitem tomada de decisão baseada em dados reais da lavoura.'],
        carbono: ['🌳 Redução de Carbono','O sequestro de carbono pelo solo é potencializado pelo plantio direto e sistemas agroflorestais. O mercado de carbono permite que produtores rurais gerem créditos de carbono certificados e obtenham renda adicional. Práticas como a integração lavoura-pecuária-floresta (ILPF) combinam produtividade e fixação de CO₂. O Plano ABC+ do governo federal incentiva essas práticas com crédito diferenciado.']
    };
    const item = conteudos[tipo];
    if (!item) return;
    const resposta = document.getElementById('respostaIA');
    resposta.innerHTML = `<h3>${item[0]}</h3><p>${item[1]}</p>`;
    setTimeout(() => {
        const y = resposta.getBoundingClientRect().top + window.pageYOffset - 120;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }, 200);
}

// ==========================================
// DADOS DAS CIDADES
// ==========================================
const cidades = {
    "guarapuava": {
        clima: "Subtropical de altitude — invernos rigorosos com geadas frequentes (maio a agosto), verões amenos. Precipitação anual de 1.800–2.100 mm bem distribuída.",
        culturas: {
            pequeno: { principal: "Erva-mate, morango, feijão e hortaliças orgânicas", secundaria: "Mel, frutas de clima temperado e plantas medicinais", estrategia: "Foque em culturas de nicho com alto valor por hectare. O morango de Guarapuava tem boa aceitação em feiras e atacarejos regionais. A erva-mate nativa exige pouco insumo e tem demanda crescente no mercado de chimarrão premium.", cuidados: "Proteja os morangos com agrotêxtil nas geadas de maio a agosto. Mantenha cobertura viva nas entrelinhas para conservar a umidade do solo.", credito: "Pronaf Custeio e Pronaf Agroindústria Familiar — acesse pelo Sicoob ou Sicredi local." },
            medio: { principal: "Soja, milho, trigo e batata", secundaria: "Erva-mate convencional e aveia para cobertura de solo", estrategia: "A rotação soja-trigo-milho é o sistema mais eficiente para a região. A batata tem ciclo curto (90 dias) e boa rentabilidade, especialmente vendida para indústrias de processamento em Guarapuava.", cuidados: "Geadas tardias em setembro podem comprometer a fase de floração da soja. Monitore previsões do Simepar e programe o plantio entre 1 e 20 de outubro.", credito: "Pronaf Mais Alimentos e ABC+ para implantação de plantio direto e correção de solo." },
            grande: { principal: "Soja, milho, trigo e cevada para malte", secundaria: "Batata industrial e aveia branca", estrategia: "Guarapuava é uma das principais regiões produtoras de cevada cervejeira do Brasil. Negocie contratos de entrega antecipada com a Ambev e maltarias locais. A cevada agrega 30–40% mais valor que o trigo no mesmo ciclo de inverno.", cuidados: "Invista em drenagem de solos argilosos para evitar encharcamento no plantio de inverno. O manejo integrado de doenças fúngicas (ferrugem, mancha) é crítico na região úmida.", credito: "Pronamp, CPR e Fundos Constitucionais para custeio de alta escala e aquisição de equipamentos de precisão." }
        },
        venda: "Cooperativas: Coagru e Coopercentral. Feiras: Mercado Municipal de Guarapuava. Atacado: CEASA Curitiba para hortifruti.",
        alerta: "⚠️ Atenção: geadas entre maio e setembro. Monitoramento diário pelo app do Simepar é essencial."
    },
    "curitiba": {
        clima: "Subtropical úmido — verões brandos, invernos frios com geadas esparsas. Altitude de 934 m. Chuvas bem distribuídas (~1.400 mm/ano). Temperaturas raramente passam de 28°C.",
        culturas: {
            pequeno: { principal: "Hortaliças folhosas, morango, flores e ervas aromáticas", secundaria: "Cogumelos, microverdes e produtos orgânicos certificados", estrategia: "O mercado de Curitiba é o mais sofisticado do Paraná. Produtos orgânicos certificados obtêm até 3x o preço convencional. Invista em caixas CSA (Comunidade que Sustenta a Agricultura) e venda direta ao consumidor final via Instagram e aplicativos como Raízes e Chefão.", cuidados: "Alta umidade favorece doenças fúngicas em folhosas. Use estufa simples com abertura lateral para proteção e melhor controle de temperatura.", credito: "Pronaf Agroecologia com bônus de 15% no pagamento. Seab-PR oferece assistência técnica gratuita." },
            medio: { principal: "Flores, alface, rúcula, salsinha, cebolinha e beterraba", secundaria: "Morango em túnel e abóbora japonesa", estrategia: "A proximidade da capital garante escoamento rápido. Entregue diretamente a restaurantes da região do Água Verde, Batel e Ecoville — chefs valorizam fornecedores locais. Organize-se em associações para negociar kits de hortifruti para programas da prefeitura (PAA, PNAE).", cuidados: "Planeje a sucessão de plantio para garantir entrega contínua durante o ano todo, evitando períodos sem produção.", credito: "Pronaf Custeio e Mais Alimentos. BRDE oferece linhas específicas para modernização de estufas." },
            grande: { principal: "Flores de corte, plantas ornamentais e sementes certificadas", secundaria: "Hortaliças para processamento mínimo e delivery de kits", estrategia: "Curitiba é o maior polo de flores e plantas ornamentais do sul do Brasil. Produza para o CEASA-PR e para floriculturas atacadistas. Culturas de flores tropicais (helicônias, antúrios) têm demanda crescente. Considere câmaras frias para ampliar o ciclo de comercialização.", cuidados: "Gestão da cadeia do frio é essencial para flores. Invista em logística refrigerada própria ou parceria com transportadoras especializadas.", credito: "Fundos Constitucionais FCO/FNO, Finame para aquisição de câmaras frias e automação de estufas." }
        },
        venda: "CEASA-PR (maior da região). Feiras Orgânicas do Passeio Público, Praça do Japão e Água Verde. Programa PNAE da Prefeitura de Curitiba.",
        alerta: "⚠️ Geadas esparsas em junho-julho. O microclima da RMC varia bastante — use estação meteorológica própria."
    },
    "londrina": {
        clima: "Subtropical úmido mesotérmico — verões quentes (~28°C) com chuvas concentradas, invernos secos e amenos. Precipitação ~1.600 mm/ano. Raro ocorrer geadas.",
        culturas: {
            pequeno: { principal: "Café Conilon, mandioca, feijão e frutas tropicais", secundaria: "Maracujá, acerola e hortaliças para mercados locais", estrategia: "O café tem forte identidade regional em Londrina. Produza café especial com rastreabilidade — grãos acima de 80 pontos (SCA) são vendidos direto a torrefadoras artesanais por 3x o preço convencional. Busque certificação do MAPA e acesse o Concafé PR.", cuidados: "Bienalidade do café exige manejo nutricional preciso no ano de alta produção. Colha no ponto certo para garantir qualidade.", credito: "Pronaf Custeio para café e Pronaf Investimento para beneficiamento (despolpador, terreiro suspenso)." },
            medio: { principal: "Soja, milho safrinha e café arábica consorciado", secundaria: "Trigo para farinha regional e amendoim", estrategia: "A safrinha de milho após a soja aproveita a umidade residual e o preparo do solo. O amendoim tem ciclo curto (4 meses) e rentabilidade crescente com a indústria de alimentação saudável instalada na região.", cuidados: "Atenção ao Complexo de Doenças Foliares da soja (ferrugem asiática) — aplique fungicidas preventivos entre R1 e R3.", credito: "Pronamp e linhas do Banco do Brasil para médios produtores, com seguro Proagro obrigatório." },
            grande: { principal: "Soja, milho, trigo e cana-de-açúcar", secundaria: "Café em larga escala para exportação e sorgo safrinha", estrategia: "Londrina está no corredor de exportação da soja paranaense para o porto de Paranaguá. Negocie contratos futuros na B3 para fixação de preço. A cana é alternativa viável para solos mais arenosos da região Norte — estude parcerias com usinas do interior do Paraná.", cuidados: "Compactação do solo em solos argilosos com máquinas pesadas reduz a infiltração de água. Realize subsolagem a cada 3-4 anos.", credito: "Pronamp, CPR Física, Finame Agrícola para renovação de maquinário e silos de armazenagem." }
        },
        venda: "Cotriguaçu e Cocamar (cooperativas). CEASA Norte. Exportação via Porto de Paranaguá para grandes produtores.",
        alerta: "⚠️ Déficit hídrico em julho-agosto. Planeje reservatórios para irrigação de lavouras sensíveis."
    },
    "maringa": {
        clima: "Subtropical úmido com verões quentes e chuvosos (~30°C em jan/fev) e invernos secos e amenos. Precipitação ~1.500 mm/ano. Geadas muito raras.",
        culturas: {
            pequeno: { principal: "Mandioca aipim, frutas tropicais, abacaxi e banana", secundaria: "Hortaliças e ervas aromáticas para feiras locais", estrategia: "O aipim de mesa tem boa rentabilidade em quitandas e feiras de Maringá. Plante variedades precoces (6 meses) para giro mais rápido de capital. Cultivos em consórcio (banana + mandioca) maximizam uso do solo e reduzem custos.", cuidados: "Solos arenosos da região perdem nutrientes rapidamente — adubação orgânica e cobertura morta são essenciais para manter fertilidade.", credito: "Pronaf Custeio e Semear (microcrédito rural) para agricultores familiares." },
            medio: { principal: "Soja, milho, mandioca industrial e laranja", secundaria: "Maracujá, abacaxi e café Conilon", estrategia: "Maringá tem fecularia e indústria de processamento de mandioca. Cultivar variedades com alto teor de amido (acima de 30%) garante prêmio no preço pago pelas fecularias. Converse com a indústria antes do plantio e feche contrato de entrega.", cuidados: "Bacteriose e super-alongamento da mandioca são frequentes em plantios mal manejados. Use manivas sadias e faça rotação com milho.", credito: "Pronamp e Banco do Brasil Agro para custeio de médio porte." },
            grande: { principal: "Soja, milho, cana-de-açúcar e mandioca industrial", secundaria: "Sorgo granífero safrinha e citros", estrategia: "A região de Maringá é polo canavieiro — parcerias com usinas (parceria agrícola ou arrendamento) garantem receita estável. A soja tem altíssima produtividade nos solos de terra roxa da região, podendo superar 70 sacas/ha com tecnologia.", cuidados: "Nematoides de galha são problema crescente em áreas com histórico de soja. Realize nematologia do solo antes do plantio e use variedades resistentes.", credito: "Fundos Constitucionais, CPR e Finame para expansão de área e equipamentos de alta capacidade." }
        },
        venda: "Cocamar e C.Vale. Indústrias de amido e fecularia locais. Usinas canavieiras da região Noroeste do Paraná.",
        alerta: "⚠️ Veranicos de 15–30 dias em janeiro-fevereiro são comuns. Reservatórios e irrigação de salvação são fundamentais."
    },
    "cascavel": {
        clima: "Subtropical úmido mesotérmico — clima ideal para grãos. Verões quentes (~27°C) com chuvas regulares, invernos frios com geadas eventuais. Altitude de 760 m. Solo: latossolo vermelho de alta fertilidade.",
        culturas: {
            pequeno: { principal: "Feijão, milho, leite e hortaliças", secundaria: "Fumo e fruticultura temperada", estrategia: "Cascavel tem forte cooperativismo. Pequenos produtores que entregam leite à C.Vale têm renda mensal estável. O feijão especial (carioca tipo 1) em lotes selecionados obtém até 30% de bonificação sobre o preço de referência.", cuidados: "Cuidados com antracnose e ferrugem no feijão — use variedades resistentes e aplique fungicida preventivo.", credito: "Pronaf Custeio e Pronaf Leite com taxa diferenciada para agricultura familiar." },
            medio: { principal: "Soja, milho, trigo e suinocultura/avicultura", secundaria: "Ervilha e canola de inverno", estrategia: "A integração lavoura-pecuária aumenta a renda por área. A ervilha tem ciclo de 90 dias no outono-inverno e obtém bom preço em contratos com indústrias de enlatados. A canola pode substituir o trigo em solos de maior acidez, com rentabilidade crescente.", cuidados: "Mantenha análise de solo atualizada. Os solos de Cascavel têm alto potencial, mas demandam correção de alumínio em profundidade (calagem + gessagem).", credito: "Pronamp, Moderagro para integração lavoura-pecuária e Mais Alimentos para infraestrutura." },
            grande: { principal: "Soja, milho, trigo e frango/suíno integrado", secundaria: "Canola, girassol e sorgo safrinha", estrategia: "Cascavel está no coração do agronegócio paranaense. A integração com frigoríficos (BRF, C.Vale, JBS) oferece renda complementar e aproveitamento da cama de frango como fertilizante orgânico. Produtores de soja com armazém próprio ganham até R$3–5/saca no timing de venda.", cuidados: "Resistência da ferrugem asiática a fungicidas triazóis exige rotação de princípios ativos. Consulte o Iapar/IDR para recomendações atualizadas.", credito: "Fundos Constitucionais, CPR, Pronamp e Finame para complexos integrados de produção." }
        },
        venda: "C.Vale (uma das maiores cooperativas do Brasil). Frigoríficos regionais. Exportação pelo Porto de Paranaguá.",
        alerta: "⚠️ Geadas em junho-julho podem afetar trigo em estádio vegetativo. Acompanhe alertas da C.Vale e Simepar."
    },
    "ponta grossa": {
        clima: "Subtropical de altitude (ca. 1.000 m) — frio e úmido. Invernos rigorosos com geadas frequentes, verões amenos. Precipitação bem distribuída. Solo: latossolo vermelho-amarelo com boa capacidade produtiva.",
        culturas: {
            pequeno: { principal: "Batata, alho, cebola e hortaliças de inverno", secundaria: "Morango e frutas de caroço", estrategia: "Ponta Grossa é referência nacional em batata-semente certificada. Produzir batata semente (categoria certificada ou fiscalizada) rende 50–80% a mais que a batata consumo. Contate o MAPA e o IDR-PR para cadastro.", cuidados: "Requeima (Phytophthora infestans) é a principal doença da batata na região fria e úmida. Monitoramento constante e aplicações preventivas são obrigatórios.", credito: "Pronaf Custeio e Pronaf Investimento para câmara fria de batata-semente." },
            medio: { principal: "Soja, trigo, cevada e batata", secundaria: "Aveia, centeio e azevém para cobertura", estrategia: "Ponta Grossa é o maior polo de cevada cervejeira do Paraná. Contratos de longo prazo com a Ambev garantem preço fixo antes do plantio. A rotação soja-trigo-cevada é modelo consolidado na região.", cuidados: "Colheita atrasada da cevada causa degrana e perde qualidade malte. Equipe-se com colhedoras adequadas e monitore o ponto de colheita.", credito: "Pronamp, Proagro e ABC+ para plantio direto e tecnologia de precisão." },
            grande: { principal: "Soja, trigo, cevada, milho e aveia", secundaria: "Canola e batata industrial", estrategia: "A Ponta Grossa está em posição logística privilegiada — proximidade com a PR-376 e facilidade de acesso ao Porto de Paranaguá. Invista em armazenagem própria (silo-bolsa ou silos verticais) para comercialização estratégica. A cevada em grande escala permite contratos de exportação para maltarias europeias.", cuidados: "Compactação de solo em solos de textura média é frequente. Realize escarificação a cada 4 anos e evite tráfego pesado com solo úmido.", credito: "Fundos Constitucionais, Finame, CPR e Pronamp para escala industrial." }
        },
        venda: "Cooperativas: Capal e Frísia. Ambev (cevada). CEASA Curitiba para batata e hortifruti.",
        alerta: "⚠️ Geadas severas de maio a agosto. Déficit hídrico em verão em alguns anos — planeje irrigação suplementar."
    },
    "foz do iguaçu": {
        clima: "Subtropical úmido com verões muito quentes (até 38°C) e úmidos, invernos brandos. Quase sem geadas. Precipitação ~1.700 mm/ano. Região fronteiriça com Argentina e Paraguai.",
        culturas: {
            pequeno: { principal: "Mandioca, frutas tropicais, verduras e temperos", secundaria: "Banana, abacaxi e produtos artesanais para turismo", estrategia: "O turismo de Foz do Iguaçu consome grandes quantidades de produtos locais. Forneça diretamente para pousadas, restaurantes e o hotel Bourbon. Produtos artesanais e agroecológicos têm demanda crescente entre turistas. Explore o Circuito de Agroturismo do Paraná.", cuidados: "O excesso de calor e umidade favorece pragas e doenças em frutas. Maneje o pomar com poda e ventilação adequadas.", credito: "Pronaf Turismo Rural e Pronaf Agroindústria para beneficiamento de frutas e produção de geleias." },
            medio: { principal: "Soja, milho, mandioca e fruticultura tropical", secundaria: "Feijão e pastagens para pecuária", estrategia: "O Oeste do Paraná tem alta produtividade em soja (65–70 sc/ha com tecnologia). Integre mandioca no roteiro para aproveitar solos mais arenosos e vender para fecularias locais.", cuidados: "Atenção à cigarrinha-das-pastagens e ao percevejo-barriga-verde no milho safrinha.", credito: "Pronamp e Banco do Brasil para custeio. C.Vale de Palotina para assistência técnica e insumos." },
            grande: { principal: "Soja, milho safrinha, cana e energia solar agrovoltaica", secundaria: "Eucalipto para lenha e biomassa", estrategia: "O calor intenso e alta insolação fazem de Foz do Iguaçu uma das melhores regiões do Paraná para sistemas agrovoltaicos — painéis solares entre fileiras de cultivo geram energia e sombreamento benéfico. Estude parceria com empresas de energia para instalar miniusinas fotovoltaicas.", cuidados: "Doenças de final de ciclo da soja (DFC) são críticas na região quente e úmida. Use fungicidas de última geração e variedades com resistência.", credito: "BNDES Finem para projetos de energia renovável. CPR e Fundos para custeio de grãos." }
        },
        venda: "C.Vale e cooperativas do Oeste. Feiras e restaurantes locais. Exportação via fronteira seca com Paraguai/Argentina.",
        alerta: "⚠️ Veranicos de verão são frequentes. Invista em reservatórios de água para irrigação de salvação."
    },
    "toledo": {
        clima: "Subtropical úmido mesotérmico — solo de terra roxa altamente fértil. Verões quentes, invernos frios com geadas ocasionais. Precipitação ~1.800 mm/ano.",
        culturas: {
            pequeno: { principal: "Aves (frango caipira), suínos, leite e hortaliças", secundaria: "Mandioca, feijão e frutas", estrategia: "Toledo tem forte cadeia de integração com frigoríficos. O frango caipira certificado obtém até 50% a mais que o convencional. A suinocultura familiar integrada com a C.Vale oferece renda mensal previsível e assistência técnica gratuita.", cuidados: "Biosseguridade rigorosa nas granjas de aves para prevenir influenza aviária. Mantenha registro atualizado com o MAPA.", credito: "Pronaf Investimento para construção de aviário ou pocilga integrada." },
            medio: { principal: "Soja, milho, trigo e criação integrada de frangos", secundaria: "Suínos e leite", estrategia: "A integração lavoura-pecuária maximiza renda por área. Cama de aviário é fertilizante orgânico de alto valor que reduz custo com adubo mineral. O milho produzido na propriedade pode ser usado na alimentação animal, reduzindo custo variável.", cuidados: "Descarte correto de efluentes animais é obrigação legal — instale biodigestor e esterqueira dimensionados para seu rebanho.", credito: "Pronamp, Moderinfra para adequação ambiental e Mais Alimentos para infraestrutura produtiva." },
            grande: { principal: "Soja, milho, frango/suíno em escala industrial e trigo", secundaria: "Canola, girassol e biogás", estrategia: "Toledo é referência nacional em avicultura industrial. Com escala, instale biodigestor para gerar biogás/biometano a partir dos dejetos — pode abastecer 100% da energia da propriedade e gerar créditos de carbono. A proximidade com BRF e JBS facilita negociação de contratos de alta escala.", cuidados: "Gestão rigorosa de amônia em aviários — ventilação inadequada reduz conversão alimentar e aumenta mortalidade.", credito: "BNDES, Fundos Constitucionais e Finame para complexos agroindustriais integrados." }
        },
        venda: "C.Vale e BRF (frigorífico em Toledo). Cooperativas do Oeste. CEASA regional.",
        alerta: "⚠️ Geadas em junho-julho afetam trigo. Gripe aviária exige monitoramento constante — registre-se no sistema MAPA."
    },
    "castro": {
        clima: "Subtropical de altitude (ca. 1.000 m) — frio e úmido, invernos rigorosos. Solo: latossolo vermelho com alta fertilidade. Precipitação bem distribuída (~1.600 mm/ano).",
        culturas: {
            pequeno: { principal: "Leite, queijo artesanal, batata e hortaliças", secundaria: "Mel e frutas de caroço", estrategia: "Castro é o maior polo leiteiro do Paraná. Produtores com ordenha mecânica e resfriador de leite obtêm bonificação por qualidade (CCS e CPP). Produza queijo colonial certificado para agregar valor — o preço do queijo por kg de leite é 3x maior.", cuidados: "Qualidade do leite é determinada pela higiene da ordenha e saúde do rebanho. Vacinação, controle de carrapatos e mastite são prioridades.", credito: "Pronaf Leite, Pronaf Agroindústria para queijaria e Senar-PR para capacitação técnica gratuita." },
            medio: { principal: "Leite, soja, milho e batata", secundaria: "Trigo e cevada de inverno", estrategia: "A combinação de leite (renda mensal) com grãos (renda sazonal) é o modelo mais estável para médios produtores de Castro. O milho plantado para silagem garante volumoso para o gado no inverno e reduz custo de alimentação.", cuidados: "Planeje o calendário forrageiro para não ter déficit de volumoso no inverno (junho-setembro). Implante pelo menos 1 ha de aveia/azevém para cada 10 vacas em lactação.", credito: "Pronamp, Moderfrota para aquisição de tratores e implementos, Proagro para proteção das lavouras." },
            grande: { principal: "Leite em escala industrial, soja, milho e batata", secundaria: "Cevada, canola e eucalipto para lenha", estrategia: "Castro concentra algumas das maiores fazendas leiteiras do Brasil. Com escala, negocie diretamente com laticínios como Castrolanda e Frísia para contratos com preço base garantido. Sistemas robotizados de ordenha (AMS) reduzem custo de mão de obra e aumentam produtividade por vaca.", cuidados: "Bem-estar animal é pré-requisito para certificações de exportação de laticínios. Adapte instalações às normas internacionais.", credito: "BNDES, Finame e linhas de crédito rural da Frísia e Castrolanda para grandes investimentos." }
        },
        venda: "Frísia Cooperativa (maior do Paraná em lácteos). Castrolanda. Laticínios regionais.",
        alerta: "⚠️ Invernos muito rigorosos. Proteja o gado com abrigos adequados e garanta forragem suficiente para o período frio."
    },
    "londrina": {
        clima: "Subtropical úmido mesotérmico — verões quentes (~28°C) com chuvas, invernos secos. Precipitação ~1.600 mm/ano. Geadas raras.",
        culturas: {
            pequeno: { principal: "Café Conilon, mandioca, feijão e frutas tropicais", secundaria: "Maracujá, acerola e hortaliças", estrategia: "Café especial com rastreabilidade em Londrina pode ser vendido a torrefadoras artesanais por 3x o preço convencional. Busque certificação SCA e acesse o Concafé PR.", cuidados: "Manejo nutricional preciso na alternância bienal do café. Colha no ponto ideal para garantir qualidade de xícara.", credito: "Pronaf Custeio e Pronaf Investimento para beneficiamento (despolpador, terreiro suspenso)." },
            medio: { principal: "Soja, milho safrinha e café arábica consorciado", secundaria: "Trigo para farinha regional e amendoim", estrategia: "Safrinha de milho após soja aproveita umidade residual. Amendoim tem ciclo curto (4 meses) e rentabilidade crescente com indústria de alimentação saudável na região.", cuidados: "Ferrugem asiática da soja — aplique fungicidas preventivos entre R1 e R3. Monitoramento é obrigatório.", credito: "Pronamp e linhas do Banco do Brasil para médios produtores." },
            grande: { principal: "Soja, milho, trigo e cana-de-açúcar", secundaria: "Café em escala para exportação e sorgo safrinha", estrategia: "Corredor de exportação da soja paranaense para o Porto de Paranaguá. Negocie contratos futuros na B3. A soja em terra roxa pode ultrapassar 70 sacas/ha com tecnologia de precisão.", cuidados: "Compactação do solo com máquinas pesadas — realize subsolagem a cada 3-4 anos.", credito: "Pronamp, CPR Física, Finame Agrícola para renovação de maquinário e silos." }
        },
        venda: "Cotriguaçu e Cocamar. CEASA Norte. Exportação via Porto de Paranaguá.",
        alerta: "⚠️ Déficit hídrico em julho-agosto. Planeje reservatórios para irrigação de lavouras sensíveis."
    },
    "paranavaí": {
        clima: "Subtropical quente (média anual ~22°C) — verões quentes e úmidos, invernos secos. Solo arenoso de origem basáltica. Geadas raras.",
        culturas: {
            pequeno: { principal: "Mandioca, laranja, limão e hortaliças", secundaria: "Abacaxi, maracujá e banana", estrategia: "A citricultura de Paranavaí tem tradição. Limão Taiti e laranja Valência têm mercado garantido em padarias e restaurantes da região. A mandioca artesanal (farinha, polvilho) tem mercado crescente com certificação de origem.", cuidados: "Greening (HLB) é a principal ameaça à citricultura. Monitore semanalmente psilídeos e elimine plantas doentes imediatamente.", credito: "Pronaf Custeio e Pronaf Agroindústria para produção de farinha e polvilho." },
            medio: { principal: "Mandioca industrial, laranja, milho e cana", secundaria: "Pastagem e criação extensiva de bovinos", estrategia: "Fecularias e casas de farinha regionais absorvem grandes volumes de mandioca. Cultivar variedades com alto teor de amido (IAC 14, Fécula Branca) garante prêmio. A rotação mandioca-pastagem melhora a estrutura dos solos arenosos.", cuidados: "Solos arenosos têm baixa retenção de água e nutrientes — adubação parcelada e orgânica é fundamental.", credito: "Pronamp e linhas regionais do Banco do Brasil e Sicoob." },
            grande: { principal: "Cana-de-açúcar, mandioca industrial, soja e milho", secundaria: "Eucalipto para celulose e energia", estrategia: "A região de Paranavaí tem vocação canavieira. Parceria com usinas por arrendamento ou parceria agrícola garante receita estável. O eucalipto em solos mais degradados gera renda com ciclo de 7 anos e mercado garantido para celulose.", cuidados: "Nematoides de galha em áreas de soja contínua — rotação com cana ou pastagem é medida fitossanitária essencial.", credito: "Fundos Constitucionais, BNDES e CPR para projetos de larga escala." }
        },
        venda: "Fecularias locais para mandioca. Usinas canavieiras. Ceagepar para citros.",
        alerta: "⚠️ Solos arenosos com baixa retenção hídrica. Déficit hídrico de junho-agosto é crítico — planeje irrigação."
    },
    "campo mourão": {
        clima: "Subtropical úmido mesotérmico — solo de alta fertilidade. Verões quentes e chuvosos, invernos frios com geadas ocasionais. Precipitação ~1.700 mm/ano.",
        culturas: {
            pequeno: { principal: "Feijão, milho, mandioca e hortaliças", secundaria: "Leite e aves caipiras", estrategia: "Campo Mourão tem forte cooperativismo. O feijão carioca tipo 1 tem bom mercado local e regional. A integração com uma mini-estrutura de leite (10-20 vacas) gera renda mensal complementar.", cuidados: "Chuvas de granizo ocorrem na região centro-oeste do Paraná — considere seguro agrícola para culturas de maior valor.", credito: "Pronaf Custeio e Sementes Certificadas com subsídio do governo do Paraná." },
            medio: { principal: "Soja, trigo, milho e integração lavoura-pecuária", secundaria: "Canola e ervilha de inverno", estrategia: "A integração lavoura-pecuária-floresta (ILPF) é modelo incentivado na região, com acesso ao crédito do Plano ABC+. Canola e ervilha são alternativas lucrativas ao trigo no inverno.", cuidados: "Déficit hídrico em julho pode afetar enchimento de grãos do trigo. Monitore índice hídrico e ajuste a dose de nitrogênio em cobertura.", credito: "Pronamp, ABC+ para ILP e Moderagro para aquisição de sementes de gramíneas forrageiras." },
            grande: { principal: "Soja, milho, trigo e pecuária de corte/leite", secundaria: "Sorgo safrinha e girassol", estrategia: "Campo Mourão tem infraestrutura de armazenagem e logística desenvolvida. Invista em silo próprio para vender no momento de melhor preço. A integração com confinamento de bovinos permite aproveitar silagem de milho e produzir carne de alto padrão.", cuidados: "Ferrugem asiática e nematoide de cisto da soja são os principais desafios da região. Rotacione com milho e pastagens.", credito: "Fundos Constitucionais, Pronamp, Finame e CPR para grandes operações." }
        },
        venda: "Coamo (maior cooperativa singular do mundo). Frigoríficos da região. Exportação via graneleiros do Porto de Paranaguá.",
        alerta: "⚠️ Granizo ocasional de setembro a novembro. Contrate seguro agrícola PROAGRO para proteção das lavouras."
    },
    "maringa": {
        clima: "Subtropical úmido com verões quentes (~30°C) e invernos secos. Precipitação ~1.500 mm/ano. Geadas muito raras.",
        culturas: {
            pequeno: { principal: "Mandioca, frutas tropicais, abacaxi e banana", secundaria: "Hortaliças e ervas aromáticas para feiras", estrategia: "O aipim de mesa tem boa rentabilidade em feiras de Maringá. Cultivos em consórcio (banana + mandioca) maximizam uso do solo.", cuidados: "Solos arenosos perdem nutrientes rapidamente — adubação orgânica é essencial.", credito: "Pronaf Custeio e Semear (microcrédito rural) para agricultores familiares." },
            medio: { principal: "Soja, milho, mandioca industrial e laranja", secundaria: "Maracujá, abacaxi e café Conilon", estrategia: "Maringá tem fecularia e indústria de processamento de mandioca. Variedades com alto teor de amido (acima de 30%) garantem prêmio no preço.", cuidados: "Bacteriose da mandioca — use manivas sadias e faça rotação com milho.", credito: "Pronamp e Banco do Brasil Agro para custeio de médio porte." },
            grande: { principal: "Soja, milho, cana-de-açúcar e mandioca industrial", secundaria: "Sorgo safrinha e citros", estrategia: "Polo canavieiro — parcerias com usinas garantem receita estável. Soja em terra roxa pode superar 70 sacas/ha com tecnologia.", cuidados: "Nematoides de galha em áreas de soja contínua — rotacione com cana ou pastagem.", credito: "Fundos Constitucionais, CPR e Finame para expansão." }
        },
        venda: "Cocamar e C.Vale. Fecularias locais. Usinas canavieiras da região Noroeste.",
        alerta: "⚠️ Veranicos de 15–30 dias em janeiro-fevereiro. Invista em reservatórios de água."
    },
    "maringá": {
        clima: "Subtropical úmido com verões quentes (~30°C) e invernos secos. Precipitação ~1.500 mm/ano. Geadas muito raras.",
        culturas: {
            pequeno: { principal: "Mandioca, frutas tropicais, abacaxi e banana", secundaria: "Hortaliças e ervas aromáticas para feiras", estrategia: "O aipim de mesa tem boa rentabilidade em feiras de Maringá. Cultivos em consórcio (banana + mandioca) maximizam uso do solo.", cuidados: "Solos arenosos perdem nutrientes rapidamente — adubação orgânica é essencial.", credito: "Pronaf Custeio e Semear (microcrédito rural) para agricultores familiares." },
            medio: { principal: "Soja, milho, mandioca industrial e laranja", secundaria: "Maracujá, abacaxi e café Conilon", estrategia: "Maringá tem fecularia e indústria de processamento de mandioca. Variedades com alto teor de amido garantem prêmio no preço.", cuidados: "Bacteriose da mandioca — use manivas sadias e faça rotação com milho.", credito: "Pronamp e Banco do Brasil Agro para custeio de médio porte." },
            grande: { principal: "Soja, milho, cana-de-açúcar e mandioca industrial", secundaria: "Sorgo safrinha e citros", estrategia: "Polo canavieiro — parcerias com usinas garantem receita estável. Soja em terra roxa pode superar 70 sacas/ha com tecnologia.", cuidados: "Nematoides de galha em áreas de soja contínua — rotacione com cana ou pastagem.", credito: "Fundos Constitucionais, CPR e Finame para expansão." }
        },
        venda: "Cocamar e C.Vale. Fecularias locais. Usinas canavieiras da região Noroeste.",
        alerta: "⚠️ Veranicos de 15–30 dias em janeiro-fevereiro. Invista em reservatórios de água."
    },
    "apucarana": {
        clima: "Subtropical úmido mesotérmico — verões quentes, invernos amenos. Solo fértil de origem basáltica. Precipitação ~1.500 mm/ano.",
        culturas: {
            pequeno: { principal: "Café, milho, feijão e hortaliças", secundaria: "Frutas cítricas e mel artesanal", estrategia: "Apucarana tem tradição cafeeira. Café especial com certificação pode ser vendido a torrefadoras locais por preço premium.", cuidados: "Bienalidade do café exige manejo nutricional preciso. Controle de broca e ferrugem é fundamental.", credito: "Pronaf Custeio para café e Pronaf Investimento para beneficiamento." },
            medio: { principal: "Café, soja, milho e trigo", secundaria: "Amendoim e girassol", estrategia: "A integração café-grãos diversifica renda ao longo do ano. O amendoim tem boa aceitação em indústrias de Apucarana.", cuidados: "Ferrugem asiática da soja — aplique fungicidas preventivos. Monitoramento semanal é obrigatório.", credito: "Pronamp, Cocamar e Coamo para custeio e assistência técnica." },
            grande: { principal: "Soja, milho, café e trigo", secundaria: "Sorgo safrinha e pastagem integrada", estrategia: "Localização privilegiada no Norte Pioneiro. Corredor logístico para exportação via Londrina e Porto de Paranaguá.", cuidados: "Compactação do solo com maquinário pesado — realize subsolagem periódica.", credito: "Pronamp, CPR Física e Finame Agrícola para grande escala." }
        },
        venda: "Cocamar. Torrefadoras regionais para café. Mercados locais e CEASA Norte.",
        alerta: "⚠️ Déficit hídrico em julho-agosto. Planeje irrigação suplementar para lavouras sensíveis."
    },
    "arapongas": {
        clima: "Subtropical úmido quente — verões chuvosos (~28°C), invernos secos e amenos. Precipitação ~1.500 mm/ano.",
        culturas: {
            pequeno: { principal: "Milho, feijão, café e hortaliças", secundaria: "Frutas tropicais e plantas medicinais", estrategia: "Arapongas tem mercado local forte para hortifruti. Produção orgânica certificada tem demanda crescente.", cuidados: "Monitoramento de pragas do feijão (mosca-branca, tripes) é essencial na região quente.", credito: "Pronaf Custeio e Senar-PR para capacitação gratuita." },
            medio: { principal: "Soja, milho, café e amendoim", secundaria: "Girassol e pastagem", estrategia: "O amendoim tem ciclo de 4 meses e boa rentabilidade com indústrias de alimentação da região.", cuidados: "Tombamento do amendoim por fungos de solo — use fungicida no tratamento de sementes.", credito: "Pronamp e Cocamar para custeio com assistência técnica." },
            grande: { principal: "Soja, milho, café e trigo", secundaria: "Sorgo e aveia para cobertura", estrategia: "Região com boa infraestrutura logística. Armazém próprio permite comercialização estratégica da soja.", cuidados: "Nematoide de cisto da soja é problema crescente — use variedades resistentes e rotacione culturas.", credito: "Pronamp, Finame e CPR para operações de grande porte." }
        },
        venda: "Cocamar e cooperativas locais. CEASA Norte para hortifruti.",
        alerta: "⚠️ Veranicos de verão frequentes. Mantenha reservatório de água para irrigação de salvação."
    },
    "pato branco": {
        clima: "Subtropical de altitude — invernos frios com geadas moderadas, verões amenos. Precipitação bem distribuída (~1.900 mm/ano).",
        culturas: {
            pequeno: { principal: "Soja, feijão, milho e hortaliças", secundaria: "Erva-mate e leite", estrategia: "Pato Branco tem cooperativismo forte. Feijão carioca tipo 1 tem boa valorização. Leite com ordenha mecânica gera renda mensal estável.", cuidados: "Geadas de maio a agosto — proteja culturas mais sensíveis com cobertura morta.", credito: "Pronaf Custeio e Pronaf Leite com taxa diferenciada." },
            medio: { principal: "Soja, trigo, milho e suinocultura", secundaria: "Canola e ervilha de inverno", estrategia: "Canola e ervilha são alternativas lucrativas ao trigo no inverno. A suinocultura integrada com cooperativas garante renda mensal previsível.", cuidados: "Déficit hídrico em julho pode afetar enchimento de grãos do trigo — ajuste adubação nitrogenada em cobertura.", credito: "Pronamp, Moderagro e ABC+ para integração lavoura-pecuária." },
            grande: { principal: "Soja, trigo, milho e frango/suíno integrado", secundaria: "Canola, sorgo e eucalipto", estrategia: "Pato Branco está em posição estratégica no Sudoeste do Paraná. Integração com frigoríficos locais e exportação via Porto de Paranaguá.", cuidados: "Biosseguridade rigorosa nas granjas de aves — mantenha registros atualizados com o MAPA.", credito: "Fundos Constitucionais, Pronamp e Finame para complexos integrados." }
        },
        venda: "Copasul e cooperativas do Sudoeste. Frigoríficos regionais. CEASA regional.",
        alerta: "⚠️ Geadas de maio a agosto. Granizo ocasional de setembro a novembro — contrate seguro Proagro."
    },
    "irati": {
        clima: "Subtropical de altitude fria — invernos rigorosos com geadas frequentes, verões amenos. Precipitação ~1.800 mm/ano.",
        culturas: {
            pequeno: { principal: "Erva-mate, feijão, milho e hortaliças", secundaria: "Mel, frutas de caroço e plantas medicinais", estrategia: "Irati é polo de erva-mate no Centro-Sul do Paraná. Erva-mate nativa sombreada tem qualidade superior e preço premium no mercado de chimarrão artesanal.", cuidados: "Geadas fortes podem danificar mudas jovens de erva-mate. Proteja os primeiros 2 anos com cobertura vegetal.", credito: "Pronaf Custeio e Pronaf Agroindústria para processamento de erva-mate." },
            medio: { principal: "Erva-mate, pinus, soja e feijão", secundaria: "Milho e pastagem para pecuária leiteira", estrategia: "A combinação erva-mate (renda contínua) + pinus (renda de longo prazo, 15-20 anos) + soja é modelo consolidado na região.", cuidados: "Mosca-do-chifre e carrapato no gado leiteiro — mantenha calendário de controle atualizado.", credito: "Pronamp, Moderinfra para estrutura de erva-mate e ABC+ para sistemas agroflorestais." },
            grande: { principal: "Pinus, erva-mate, soja e pecuária", secundaria: "Eucalipto e canola de inverno", estrategia: "Irati tem indústria madeireira consolidada. Pinus para serraria e laminação tem ciclo de 15-20 anos com excelente valorização.", cuidados: "Incêndios florestais são risco em períodos secos. Mantenha aceiros e monitore condições climáticas.", credito: "BNDES para projetos florestais, Fundos Constitucionais e Pronamp para custeio agropecuário." }
        },
        venda: "Cooperativas locais para erva-mate. Madeireiras do Centro-Sul. CEASA regional para hortifruti.",
        alerta: "⚠️ Invernos muito rigorosos. Geadas de abril a setembro — plan. safra com margem de segurança."
    },
    "prudentopolis": {
        clima: "Subtropical de altitude — invernos frios com geadas frequentes, verões amenos. Solo: latossolo com boa fertilidade. Precipitação ~1.900 mm/ano.",
        culturas: {
            pequeno: { principal: "Erva-mate, feijão, milho e hortaliças", secundaria: "Mel e frutas de clima temperado", estrategia: "Prudentópolis é o maior município do Paraná e tem forte tradição em erva-mate e agricultura familiar. Produtos coloniais ucranianos têm identidade cultural e mercado crescente no agroturismo.", cuidados: "Geadas frequentes de maio a agosto — planeje colheita antes do período crítico.", credito: "Pronaf Custeio e Pronaf Agroindústria para produtos coloniais." },
            medio: { principal: "Erva-mate, soja, feijão e milho", secundaria: "Pinus e pastagem para leite", estrategia: "A erva-mate de Prudentópolis tem reputação regional. Certificação de origem pode agregar valor no mercado de chimarrão premium.", cuidados: "Manejo correto da erva-mate nativa — poda de formação e adubação são essenciais para produtividade.", credito: "Pronamp e cooperativas locais para custeio. ABC+ para sistemas agroflorestais." },
            grande: { principal: "Soja, pinus, erva-mate e pecuária extensiva", secundaria: "Milho safrinha e pastagens melhoradas", estrategia: "Prudentópolis tem grande extensão territorial. Sistemas silvipastoris (pinus + pastagem) otimizam uso da terra e geram múltiplas fontes de renda.", cuidados: "Gestão hídrica em grandes áreas é fundamental — planeje sistemas de captação e distribuição.", credito: "BNDES, Fundos Constitucionais e Pronamp para projetos de grande escala." }
        },
        venda: "Cooperativas do Centro-Sul. Madeireiras regionais. Mercados locais para produtos coloniais.",
        alerta: "⚠️ Geadas severas de maio a agosto. Maior município do PR — logística exige planejamento antecipado."
    },
    "prudentópolis": {
        clima: "Subtropical de altitude — invernos frios com geadas frequentes, verões amenos. Solo: latossolo com boa fertilidade. Precipitação ~1.900 mm/ano.",
        culturas: {
            pequeno: { principal: "Erva-mate, feijão, milho e hortaliças", secundaria: "Mel e frutas de clima temperado", estrategia: "Prudentópolis tem forte tradição em agricultura familiar. Produtos coloniais ucranianos têm mercado crescente no agroturismo.", cuidados: "Geadas frequentes de maio a agosto — planeje colheita antes do período crítico.", credito: "Pronaf Custeio e Pronaf Agroindústria para produtos coloniais." },
            medio: { principal: "Erva-mate, soja, feijão e milho", secundaria: "Pinus e pastagem para leite", estrategia: "A erva-mate de Prudentópolis tem reputação regional. Certificação de origem pode agregar valor no mercado premium.", cuidados: "Manejo correto da erva-mate nativa — poda de formação e adubação são essenciais.", credito: "Pronamp e ABC+ para sistemas agroflorestais." },
            grande: { principal: "Soja, pinus, erva-mate e pecuária extensiva", secundaria: "Milho safrinha e pastagens melhoradas", estrategia: "Sistemas silvipastoris (pinus + pastagem) otimizam uso da terra e geram múltiplas fontes de renda.", cuidados: "Gestão hídrica em grandes áreas é fundamental.", credito: "BNDES, Fundos Constitucionais e Pronamp para grandes projetos." }
        },
        venda: "Cooperativas do Centro-Sul. Madeireiras regionais. Mercados locais para produtos coloniais.",
        alerta: "⚠️ Geadas severas de maio a agosto. Maior município do Paraná em área territorial."
    },
    "pinhao": {
        clima: "Subtropical de altitude elevada (~1.000 m) — invernos muito rigorosos com geadas severas, verões frescos. Precipitação ~1.800 mm/ano.",
        culturas: {
            pequeno: { principal: "Erva-mate, pinus, feijão e hortaliças", secundaria: "Mel e frutas de caroço", estrategia: "Pinhão é famoso pela araucária e pelo pinhão como produto florestal. Comercialização de pinhão in natura e processado (farinha, paçoca) agrega valor.", cuidados: "Invernos muito rigorosos — culturas sensíveis precisam de proteção. Evite plantio de tropicais.", credito: "Pronaf Custeio e programas de fomento florestal da SEAB-PR." },
            medio: { principal: "Pinus, erva-mate, soja e milho", secundaria: "Pastagem para pecuária e aveia de inverno", estrategia: "Pinhão tem vocação florestal consolidada. Pinus para serraria com ciclo de 15-20 anos é investimento de longo prazo com boa valorização.", cuidados: "Geadas severas de abril a setembro — evite culturas tropicais. Foco em espécies adaptadas ao frio.", credito: "Pronamp, BNDES Florestal e ABC+ para sistemas agroflorestais." },
            grande: { principal: "Pinus, eucalipto, soja e pecuária extensiva", secundaria: "Erva-mate e canola de inverno", estrategia: "Região com grande potencial florestal. Ciclos de pinus e eucalipto para celulose e serraria garantem renda de longo prazo.", cuidados: "Monitoramento de incêndios florestais em período seco — aceiros são obrigatórios.", credito: "BNDES, Fundos Constitucionais para projetos florestais de larga escala." }
        },
        venda: "Madeireiras do Centro-Sul. Cooperativas locais para erva-mate e grãos.",
        alerta: "⚠️ Invernos extremamente frios. Neve ocasional em anos atípicos. Geadas de abril a setembro."
    },
    "pinhão": {
        clima: "Subtropical de altitude elevada — invernos muito rigorosos, verões frescos. Precipitação ~1.800 mm/ano.",
        culturas: {
            pequeno: { principal: "Erva-mate, pinus, feijão e hortaliças", secundaria: "Mel e frutas de caroço", estrategia: "Comercialização de pinhão in natura e processado agrega valor ao produto local.", cuidados: "Invernos muito rigorosos — culturas sensíveis precisam de proteção total.", credito: "Pronaf Custeio e programas de fomento florestal da SEAB-PR." },
            medio: { principal: "Pinus, erva-mate, soja e milho", secundaria: "Pastagem para pecuária", estrategia: "Pinus para serraria com ciclo de 15-20 anos é investimento de longo prazo com boa valorização.", cuidados: "Geadas severas de abril a setembro — foque em espécies adaptadas ao frio.", credito: "Pronamp, BNDES Florestal e ABC+." },
            grande: { principal: "Pinus, eucalipto, soja e pecuária extensiva", secundaria: "Erva-mate e canola", estrategia: "Grande potencial florestal. Ciclos de pinus e eucalipto para celulose e serraria garantem renda de longo prazo.", cuidados: "Aceiros obrigatórios para prevenção de incêndios florestais.", credito: "BNDES e Fundos Constitucionais para projetos florestais." }
        },
        venda: "Madeireiras do Centro-Sul. Cooperativas locais para erva-mate e grãos.",
        alerta: "⚠️ Neve ocasional em anos atípicos. Geadas de abril a setembro."
    },
    "pitanga": {
        clima: "Subtropical de altitude — invernos frios moderados, verões amenos. Precipitação ~1.700 mm/ano. Solo de boa fertilidade.",
        culturas: {
            pequeno: { principal: "Soja, milho, feijão e erva-mate", secundaria: "Leite e hortaliças", estrategia: "Pitanga tem boa base de agricultura familiar. Leite com resfriador garante renda mensal estável. Feijão especial tem boa aceitação em cooperativas regionais.", cuidados: "Geadas de maio a julho — proteja culturas sensíveis e programe plantio de soja para após 15 de outubro.", credito: "Pronaf Custeio e Pronaf Leite." },
            medio: { principal: "Soja, trigo, milho e pastagem leiteira", secundaria: "Aveia, canola e feijão", estrategia: "Rotação soja-trigo-milho é o sistema mais eficiente. Leite com tecnologia (resfriador e ordenha mecânica) garante renda complementar mensal.", cuidados: "Monitoramento de doenças fúngicas na soja — ferrugem asiática é principal risco.", credito: "Pronamp e Moderagro para integração lavoura-pecuária." },
            grande: { principal: "Soja, milho, trigo e pecuária de leite/corte", secundaria: "Canola e sorgo safrinha", estrategia: "Região Central do Paraná com boa logística. Invista em armazenagem própria para comercialização estratégica.", cuidados: "Nematoide de galha em solos com histórico de soja — rotacione com pastagem ou milho.", credito: "Pronamp, Fundos Constitucionais e Finame para infraestrutura." }
        },
        venda: "Cooperativas do Centro-Sul do Paraná. Laticínios regionais. CEASA de Guarapuava.",
        alerta: "⚠️ Geadas de maio a julho. Programe o plantio de soja após 15 de outubro para evitar geadas tardias."
    },
    "reserva": {
        clima: "Subtropical úmido — invernos frios, verões chuvosos. Precipitação ~1.600 mm/ano. Solo de boa fertilidade no Vale do Ivaí.",
        culturas: {
            pequeno: { principal: "Milho, feijão, soja e leite", secundaria: "Hortaliças e ervas medicinais", estrategia: "Reserva tem forte base em agricultura familiar. Integração milho-feijão-leite é o modelo mais comum e estável.", cuidados: "Ferrugem do feijão — use variedades resistentes e aplique fungicida preventivo.", credito: "Pronaf Custeio e Pronaf Leite para pequenos produtores." },
            medio: { principal: "Soja, milho, feijão e pastagem", secundaria: "Trigo e aveia de inverno", estrategia: "A integração lavoura-pecuária aproveita a estrutura existente e reduz custo de adubação com cama animal.", cuidados: "Monitoramento de percevejos na soja — armadilhas de feromônio ajudam a identificar a pressão.", credito: "Pronamp e cooperativas regionais para custeio." },
            grande: { principal: "Soja, milho, trigo e pecuária de corte", secundaria: "Sorgo safrinha e pastagens melhoradas", estrategia: "Região do Vale do Ivaí com solos produtivos. Confinamento de bovinos com silagem de milho própria reduz custo e agrega valor.", cuidados: "Gestão de pastagens — evite sobrepastejo que compacta o solo.", credito: "Pronamp, Fundos Constitucionais e Finame para confinamento." }
        },
        venda: "Cooperativas do Norte Pioneiro. Frigoríficos regionais. CEASA Norte.",
        alerta: "⚠️ Geadas de junho a agosto. Período seco em julho-agosto — monitore umidade do solo."
    },
    "candoi": {
        clima: "Subtropical de altitude — invernos frios com geadas, verões amenos. Precipitação ~1.800 mm/ano. Solo argiloso de alta fertilidade.",
        culturas: {
            pequeno: { principal: "Soja, milho, erva-mate e leite", secundaria: "Feijão e hortaliças de inverno", estrategia: "Candói tem solos de alta qualidade. Erva-mate nativa sombreada tem mercado crescente.", cuidados: "Geadas de maio a agosto — ajuste calendário de plantio da soja para após 1 de outubro.", credito: "Pronaf Custeio e Pronaf Leite para agricultores familiares." },
            medio: { principal: "Soja, milho, trigo e erva-mate", secundaria: "Canola e aveia para cobertura", estrategia: "Rotação soja-trigo bem adaptada ao clima de Candói. Canola no inverno em solos de maior acidez tem rentabilidade crescente.", cuidados: "Ferrugem asiática e mancha-alvo na soja são os principais riscos — monitoramento semanal é essencial.", credito: "Pronamp e ABC+ para plantio direto e correção de solo." },
            grande: { principal: "Soja, milho, trigo e pecuária", secundaria: "Cevada e canola de inverno", estrategia: "Candói tem potencial para cevada cervejeira — consulte a Ambev para contratos de entrega antecipada.", cuidados: "Compactação em solos argilosos — evite tráfego pesado com solo úmido e realize escarificação periódica.", credito: "Fundos Constitucionais, Pronamp e Finame para grandes operações." }
        },
        venda: "Cooperativas da região Centro-Sul. Ambev para cevada. Laticínios regionais.",
        alerta: "⚠️ Geadas severas de maio a agosto. Solo argiloso encharca rapidamente — planeje drenagem."
    },
    "candói": {
        clima: "Subtropical de altitude — invernos frios com geadas, verões amenos. Precipitação ~1.800 mm/ano.",
        culturas: {
            pequeno: { principal: "Soja, milho, erva-mate e leite", secundaria: "Feijão e hortaliças de inverno", estrategia: "Solos de alta qualidade. Erva-mate nativa sombreada tem mercado crescente.", cuidados: "Geadas de maio a agosto — ajuste calendário para após 1 de outubro.", credito: "Pronaf Custeio e Pronaf Leite." },
            medio: { principal: "Soja, milho, trigo e erva-mate", secundaria: "Canola e aveia para cobertura", estrategia: "Rotação soja-trigo bem adaptada ao clima local. Canola no inverno tem rentabilidade crescente.", cuidados: "Ferrugem asiática na soja — monitoramento semanal é essencial.", credito: "Pronamp e ABC+ para plantio direto." },
            grande: { principal: "Soja, milho, trigo e pecuária", secundaria: "Cevada e canola de inverno", estrategia: "Potencial para cevada cervejeira — consulte a Ambev para contratos antecipados.", cuidados: "Solo argiloso encharca rapidamente — planeje drenagem e escarificação periódica.", credito: "Fundos Constitucionais, Pronamp e Finame." }
        },
        venda: "Cooperativas do Centro-Sul. Ambev para cevada. Laticínios regionais.",
        alerta: "⚠️ Geadas severas de maio a agosto."
    },
    "turvo": {
        clima: "Subtropical de altitude — invernos frios e úmidos, verões amenos. Precipitação ~1.800 mm/ano.",
        culturas: {
            pequeno: { principal: "Erva-mate, milho, feijão e hortaliças", secundaria: "Mel e frutas de caroço", estrategia: "Turvo tem forte tradição em erva-mate. Cooperativas locais garantem mercado para o produto.", cuidados: "Geadas frequentes — proteja culturas sensíveis e planeje o calendário com margem de segurança.", credito: "Pronaf Custeio e programas de assistência técnica da EMATER." },
            medio: { principal: "Erva-mate, soja, milho e feijão", secundaria: "Pinus e pastagem para leite", estrategia: "Diversificação erva-mate + grãos + leite garante três fontes de renda com ciclos diferentes.", cuidados: "Mosca-da-erva-mate — monitoramento e manejo integrado são essenciais.", credito: "Pronamp e ABC+ para sistemas agroflorestais com erva-mate." },
            grande: { principal: "Soja, pinus, erva-mate e pecuária", secundaria: "Milho safrinha e canola", estrategia: "Sistemas silvipastoris com pinus e pastagem são modelo consolidado na região.", cuidados: "Incêndios florestais em período seco — mantenha aceiros e brigada de combate.", credito: "BNDES Florestal, Fundos Constitucionais e Pronamp." }
        },
        venda: "Cooperativas locais para erva-mate. Madeireiras regionais. CEASA de Guarapuava.",
        alerta: "⚠️ Geadas de maio a agosto. Umidade alta favorece doenças fúngicas na erva-mate."
    },
    "telemaco borba": {
        clima: "Subtropical úmido — verões quentes e úmidos, invernos amenos com geadas eventuais. Precipitação ~1.500 mm/ano.",
        culturas: {
            pequeno: { principal: "Pinus, milho, feijão e hortaliças", secundaria: "Erva-mate e mel artesanal", estrategia: "Telêmaco Borba é polo da indústria de celulose (Klabin). Pequenos produtores podem fazer fomento florestal com pinus para a Klabin com assistência técnica gratuita.", cuidados: "Manejo florestal adequado — podas e desbastes no prazo certo aumentam qualidade da madeira.", credito: "Fomento Florestal Klabin. Pronaf Custeio para agricultura de subsistência." },
            medio: { principal: "Pinus, eucalipto, soja e milho", secundaria: "Pastagem e pecuária extensiva", estrategia: "Parceria com a Klabin para fomento florestal garante mercado certo para pinus e eucalipto. Área não florestada usada com soja e milho.", cuidados: "Rotação de culturas em área agrícola para manter fertilidade do solo.", credito: "Pronamp e Fomento Florestal Klabin para eucalipto e pinus." },
            grande: { principal: "Pinus, eucalipto para celulose e soja", secundaria: "Milho e pecuária extensiva", estrategia: "Região com demanda industrial consolidada da Klabin. Contratos de longo prazo garantem receita estável com pinus e eucalipto.", cuidados: "Licenciamento ambiental é obrigatório para projetos florestais acima de 50 ha.", credito: "BNDES, Fundos Constitucionais e contratos de fomento florestal industrial." }
        },
        venda: "Klabin (celulose e papel). Serrarias locais. CEASA Norte para hortifruti.",
        alerta: "⚠️ Incêndios florestais em período seco (julho-agosto). Mantenha aceiros e monitore constantemente."
    },
    "telêmaco borba": {
        clima: "Subtropical úmido — verões quentes, invernos amenos. Precipitação ~1.500 mm/ano.",
        culturas: {
            pequeno: { principal: "Pinus, milho, feijão e hortaliças", secundaria: "Erva-mate e mel artesanal", estrategia: "Fomento florestal com pinus para a Klabin oferece assistência técnica gratuita e mercado garantido.", cuidados: "Podas e desbastes no prazo certo aumentam qualidade da madeira.", credito: "Fomento Florestal Klabin e Pronaf Custeio." },
            medio: { principal: "Pinus, eucalipto, soja e milho", secundaria: "Pastagem e pecuária extensiva", estrategia: "Parceria com Klabin para fomento florestal garante mercado. Área agrícola usada com soja e milho.", cuidados: "Rotação de culturas para manter fertilidade do solo.", credito: "Pronamp e Fomento Florestal Klabin." },
            grande: { principal: "Pinus, eucalipto para celulose e soja", secundaria: "Milho e pecuária", estrategia: "Contratos de longo prazo com a Klabin garantem receita estável.", cuidados: "Licenciamento ambiental obrigatório para projetos acima de 50 ha.", credito: "BNDES e Fundos Constitucionais para florestamento." }
        },
        venda: "Klabin. Serrarias locais. CEASA Norte para hortifruti.",
        alerta: "⚠️ Incêndios florestais em julho-agosto — mantenha aceiros."
    },
    "uniao da vitoria": {
        clima: "Subtropical de altitude — invernos frios e úmidos, verões amenos. Precipitação ~1.700 mm/ano.",
        culturas: {
            pequeno: { principal: "Erva-mate, pinus, hortaliças e leite", secundaria: "Mel e frutas de caroço", estrategia: "União da Vitória é polo madeireiro e de erva-mate. Fomento florestal com pinus oferece renda de longo prazo com mercado garantido.", cuidados: "Geadas de maio a agosto — proteja culturas anuais e olerícolas.", credito: "Pronaf Custeio e programas de fomento florestal estadual." },
            medio: { principal: "Pinus, erva-mate, soja e leite", secundaria: "Milho e pastagem", estrategia: "Combinação pinus (longo prazo) + erva-mate (médio prazo) + leite (curto prazo) diversifica renda ao longo do tempo.", cuidados: "Mosca-da-erva-mate e pragas do pinus — monitoramento integrado é fundamental.", credito: "Pronamp e ABC+ para sistemas agroflorestais." },
            grande: { principal: "Pinus, eucalipto, soja e pecuária", secundaria: "Erva-mate e canola de inverno", estrategia: "Região com indústria madeireira consolidada. Serrarias e laminadoras locais compram pinus de alta qualidade.", cuidados: "Licenciamento florestal e reserva legal — mantenha documentação atualizada.", credito: "BNDES, Fundos Constitucionais e fomento florestal industrial." }
        },
        venda: "Madeireiras do Sul do Paraná. Cooperativas locais para erva-mate. Laticínios regionais.",
        alerta: "⚠️ Geadas de maio a agosto. Umidade alta — monitoramento de doenças fúngicas."
    },
    "união da vitória": {
        clima: "Subtropical de altitude — invernos frios e úmidos, verões amenos. Precipitação ~1.700 mm/ano.",
        culturas: {
            pequeno: { principal: "Erva-mate, pinus, hortaliças e leite", secundaria: "Mel e frutas de caroço", estrategia: "Polo madeireiro e de erva-mate. Fomento florestal com pinus oferece renda de longo prazo.", cuidados: "Geadas de maio a agosto — proteja olerícolas.", credito: "Pronaf Custeio e programas de fomento florestal estadual." },
            medio: { principal: "Pinus, erva-mate, soja e leite", secundaria: "Milho e pastagem", estrategia: "Combinação pinus + erva-mate + leite diversifica renda ao longo do tempo.", cuidados: "Monitoramento integrado de pragas de pinus e erva-mate.", credito: "Pronamp e ABC+ para sistemas agroflorestais." },
            grande: { principal: "Pinus, eucalipto, soja e pecuária", secundaria: "Erva-mate e canola", estrategia: "Serrarias e laminadoras locais compram pinus de alta qualidade.", cuidados: "Documentação de reserva legal e licenciamento sempre atualizados.", credito: "BNDES e Fundos Constitucionais." }
        },
        venda: "Madeireiras do Sul do Paraná. Cooperativas para erva-mate. Laticínios regionais.",
        alerta: "⚠️ Geadas de maio a agosto."
    },
    "francisco beltrao": {
        clima: "Subtropical úmido mesotérmico — invernos frios com geadas moderadas, verões quentes. Precipitação ~1.900 mm/ano.",
        culturas: {
            pequeno: { principal: "Milho, soja, feijão e suinocultura familiar", secundaria: "Leite, hortaliças e aves caipiras", estrategia: "Francisco Beltrão tem forte cooperativismo no Sudoeste. Suinocultura familiar integrada com cooperativas garante renda mensal estável e assistência técnica.", cuidados: "Biosseguridade nas granjas suínas — vacinação e controle de PRRS são obrigatórios.", credito: "Pronaf Custeio e Pronaf Investimento para construção de pocilga integrada." },
            medio: { principal: "Soja, milho, trigo e suinocultura/avicultura", secundaria: "Canola e ervilha de inverno", estrategia: "A integração lavoura-suinocultura-avicultura reduz custo com insumos (cama de frango como fertilizante) e diversifica renda.", cuidados: "Gestão ambiental de dejetos suínos — biodigestor e esterqueira são obrigação legal.", credito: "Pronamp, Moderinfra para adequação ambiental e Mais Alimentos." },
            grande: { principal: "Soja, milho, frango/suíno integrado e trigo", secundaria: "Canola, sorgo e eucalipto", estrategia: "Sudoeste é polo de integração com BRF e C.Vale. Com escala, biodigestor gera biogás que abastece 100% da energia da propriedade.", cuidados: "Gestão rigorosa de amônia em aviários — ventilação adequada é fundamental.", credito: "BNDES, Fundos Constitucionais e Finame para complexos integrados." }
        },
        venda: "C.Vale e Copasul. BRF regional. CEASA Sudoeste.",
        alerta: "⚠️ Geadas de maio a agosto. Granizo ocasional de setembro a novembro — seguro Proagro é essencial."
    },
    "francisco beltrão": {
        clima: "Subtropical úmido mesotérmico — invernos frios com geadas moderadas, verões quentes. Precipitação ~1.900 mm/ano.",
        culturas: {
            pequeno: { principal: "Milho, soja, feijão e suinocultura familiar", secundaria: "Leite e aves caipiras", estrategia: "Suinocultura familiar integrada com cooperativas garante renda mensal.", cuidados: "Biosseguridade nas granjas suínas — vacinação obrigatória.", credito: "Pronaf Custeio e Pronaf Investimento para pocilga integrada." },
            medio: { principal: "Soja, milho, trigo e suinocultura", secundaria: "Canola e ervilha de inverno", estrategia: "Integração lavoura-suinocultura reduz custo com insumos (cama como fertilizante).", cuidados: "Gestão ambiental de dejetos — biodigestor é obrigação legal.", credito: "Pronamp e Moderinfra para adequação ambiental." },
            grande: { principal: "Soja, milho, frango/suíno integrado e trigo", secundaria: "Canola, sorgo e eucalipto", estrategia: "Polo de integração com BRF e C.Vale. Biodigestor para biogás com escala.", cuidados: "Ventilação adequada em aviários é fundamental para produtividade.", credito: "BNDES, Fundos Constitucionais e Finame." }
        },
        venda: "C.Vale e Copasul. BRF regional. CEASA Sudoeste.",
        alerta: "⚠️ Geadas de maio a agosto. Granizo ocasional — contrate seguro Proagro."
    },
    "lapa": {
        clima: "Subtropical de altitude (~910 m) — invernos rigorosos com geadas frequentes, verões amenos. Precipitação ~1.400 mm/ano.",
        culturas: {
            pequeno: { principal: "Batata, milho, feijão e hortaliças", secundaria: "Morango e alho", estrategia: "A Lapa é tradicional em batata e horticultura. Batata-semente certificada tem valorização de 50-80% sobre a batata consumo.", cuidados: "Requeima da batata (Phytophthora) — monitoramento contínuo e aplicações preventivas são obrigatórios.", credito: "Pronaf Custeio e Pronaf Investimento para câmara fria." },
            medio: { principal: "Batata, soja, milho e trigo", secundaria: "Cevada e aveia para cobertura", estrategia: "A Lapa tem boa infraestrutura para batata. Rotação batata-soja-trigo mantém a sanidade do solo.", cuidados: "Nematoide de cisto da batata — rotacione com soja ou milho e use variedades resistentes.", credito: "Pronamp, Proagro e ABC+ para plantio direto." },
            grande: { principal: "Batata, soja, milho e trigo", secundaria: "Cevada e canola de inverno", estrategia: "Localização privilegiada próxima a Curitiba — logística facilitada para CEASA-PR.", cuidados: "Compactação de solo em solos de textura média — escarificação periódica é necessária.", credito: "Fundos Constitucionais, Pronamp e Finame para escala industrial." }
        },
        venda: "CEASA-PR. Cooperativas da RMC. Feiras agrícolas regionais.",
        alerta: "⚠️ Geadas rigorosas de maio a agosto. Monitoramento diário pelo Simepar é essencial."
    },
    "umuarama": {
        clima: "Subtropical quente e seco — verões muito quentes (~33°C), invernos amenos com geadas raras. Solo arenoso. Precipitação ~1.400 mm/ano.",
        culturas: {
            pequeno: { principal: "Mandioca, milho, feijão e frutas tropicais", secundaria: "Laranja, limão e hortaliças", estrategia: "Solos arenosos de Umuarama são ideais para mandioca. Produção de farinha artesanal e polvilho agrega valor ao produto.", cuidados: "Solos arenosos têm baixa retenção de água — irrigação suplementar é fundamental em veranicos.", credito: "Pronaf Custeio e Pronaf Agroindústria para farinha e polvilho." },
            medio: { principal: "Mandioca industrial, soja, milho e pastagem", secundaria: "Cana-de-açúcar e laranja", estrategia: "Fecularias de Umuarama absorvem grandes volumes de mandioca. Variedades com alto teor de amido garantem prêmio no preço.", cuidados: "Nematoide de galha em áreas com histórico de mandioca — rotacione com milho ou pastagem.", credito: "Pronamp e linhas regionais do Banco do Brasil." },
            grande: { principal: "Soja, milho, cana-de-açúcar e mandioca industrial", secundaria: "Eucalipto para lenha e pastagem", estrategia: "Umuarama tem vocação para cana. Parceria com usinas por arrendamento ou parceria agrícola garante receita estável.", cuidados: "Solos arenosos exigem adubação parcelada e cobertura permanente para evitar erosão eólica.", credito: "Fundos Constitucionais, BNDES e CPR para projetos de larga escala." }
        },
        venda: "Fecularias locais para mandioca. Usinas canavieiras. Cooperativas do Noroeste.",
        alerta: "⚠️ Solos arenosos com baixa retenção hídrica. Déficit hídrico de junho a agosto é crítico."
    },
    "guaratuba": {
        clima: "Litorâneo úmido e quente — verões muito chuvosos, invernos amenos. Precipitação ~2.500 mm/ano (maior do Paraná).",
        culturas: {
            pequeno: { principal: "Banana, palmito, mandioca e hortaliças", secundaria: "Gengibre, cúrcuma e plantas exóticas", estrategia: "Guaratuba tem microclima tropical úmido único no Paraná. Gengibre e cúrcuma têm demanda crescente no mercado natural e gourmet.", cuidados: "Alta umidade favorece doenças fúngicas — atenção ao mal-de-panama na banana.", credito: "Pronaf Custeio e Pronaf Agroindústria para processamento de produtos tropicais." },
            medio: { principal: "Banana, palmito pupunha, mandioca e cana", secundaria: "Maracujá e abacaxi", estrategia: "O turismo litorâneo de Guaratuba consome grandes volumes de alimentos frescos. Fornecer para pousadas e restaurantes diretamente garante preço melhor.", cuidados: "Sigatoka-negra na banana — monitoramento e aplicações preventivas são obrigatórias.", credito: "Pronamp e Pronaf Turismo Rural para diversificação com agroturismo." },
            grande: { principal: "Banana em escala, palmito, cana e mandioca industrial", secundaria: "Eucalipto e pastagem", estrategia: "Exportação de banana e palmito para atacadistas de Curitiba e São Paulo. Volume garante poder de negociação.", cuidados: "Logística de frio para banana exportada — investimento em câmara fria é fundamental.", credito: "Fundos Constitucionais e BNDES para infraestrutura de armazenagem e logística." }
        },
        venda: "CEASA-PR. Atacadistas de Curitiba. Restaurantes e pousadas do litoral paranaense.",
        alerta: "⚠️ Chuvas intensas de novembro a março. Risco de alagamento em baixadas — evite plantio em áreas de várzea."
    },
    "guaira": {
        clima: "Subtropical quente — verões muito quentes (~34°C) e úmidos, invernos secos e amenos. Geadas muito raras. Precipitação ~1.700 mm/ano.",
        culturas: {
            pequeno: { principal: "Mandioca, milho, frutas tropicais e hortaliças", secundaria: "Maracujá, abacaxi e acerola", estrategia: "Guaíra é fronteira com o Mato Grosso do Sul. Produtos tropicais têm mercado nos dois estados.", cuidados: "Solos arenosos — adubação orgânica e cobertura morta são essenciais.", credito: "Pronaf Custeio e microcrédito rural para agricultores familiares." },
            medio: { principal: "Soja, milho, mandioca industrial e cana", secundaria: "Pastagem e pecuária extensiva", estrategia: "Fecularias da região absorvem mandioca em grande volume. Soja tem boa produtividade em solos bem corrigidos.", cuidados: "Nematoide de galha em solos arenosos — rotacione culturas a cada 2 anos.", credito: "Pronamp e Banco do Brasil para custeio de médio porte." },
            grande: { principal: "Soja, milho, cana-de-açúcar e pecuária", secundaria: "Sorgo safrinha e eucalipto", estrategia: "Fronteira com MS permite acesso a mercados do Centro-Oeste. Cana em parceria com usinas garante receita estável.", cuidados: "Monitoramento de pragas da cana (broca, cigarrinha) é obrigatório.", credito: "Fundos Constitucionais, CPR e BNDES para projetos integrados." }
        },
        venda: "Cooperativas do Oeste. Fecularias regionais. Usinas canavieiras.",
        alerta: "⚠️ Calor extremo em janeiro-fevereiro (até 40°C). Irrigação de salvação é essencial para culturas anuais."
    },
    "guaíra": {
        clima: "Subtropical quente — verões muito quentes (~34°C) e úmidos, invernos secos. Geadas muito raras.",
        culturas: {
            pequeno: { principal: "Mandioca, milho, frutas tropicais e hortaliças", secundaria: "Maracujá, abacaxi e acerola", estrategia: "Produtos tropicais têm mercado nos dois estados (PR e MS).", cuidados: "Adubação orgânica e cobertura morta são essenciais em solos arenosos.", credito: "Pronaf Custeio e microcrédito rural." },
            medio: { principal: "Soja, milho, mandioca industrial e cana", secundaria: "Pastagem e pecuária", estrategia: "Fecularias da região absorvem mandioca. Soja tem boa produtividade em solos bem corrigidos.", cuidados: "Nematoide de galha — rotacione culturas a cada 2 anos.", credito: "Pronamp e Banco do Brasil." },
            grande: { principal: "Soja, milho, cana e pecuária", secundaria: "Sorgo safrinha e eucalipto", estrategia: "Fronteira com MS permite acesso a mercados do Centro-Oeste.", cuidados: "Pragas da cana (broca, cigarrinha) exigem monitoramento constante.", credito: "Fundos Constitucionais, CPR e BNDES." }
        },
        venda: "Cooperativas do Oeste. Fecularias regionais. Usinas canavieiras.",
        alerta: "⚠️ Calor extremo em janeiro-fevereiro. Irrigação de salvação é essencial."
    },
    "foz do iguacu": {
        clima: "Subtropical úmido com verões muito quentes (até 38°C) e úmidos, invernos brandos. Quase sem geadas. Precipitação ~1.700 mm/ano.",
        culturas: {
            pequeno: { principal: "Mandioca, frutas tropicais, verduras e temperos", secundaria: "Banana, abacaxi e produtos artesanais para turismo", estrategia: "O turismo de Foz consome grandes quantidades de alimentos frescos. Forneça diretamente para pousadas e restaurantes.", cuidados: "Excesso de calor e umidade favorece pragas e doenças. Maneje o pomar com poda e ventilação.", credito: "Pronaf Turismo Rural e Pronaf Agroindústria para geleias e conservas." },
            medio: { principal: "Soja, milho, mandioca e fruticultura tropical", secundaria: "Feijão e pastagens", estrategia: "Alta produtividade em soja (65-70 sc/ha). Mandioca em solos mais arenosos para fecularias locais.", cuidados: "Cigarrinha-das-pastagens e percevejo-barriga-verde no milho safrinha.", credito: "Pronamp e C.Vale de Palotina para assistência técnica." },
            grande: { principal: "Soja, milho safrinha, cana e energia agrovoltaica", secundaria: "Eucalipto para biomassa", estrategia: "Alta insolação faz de Foz uma das melhores regiões para sistemas agrovoltaicos.", cuidados: "Doenças de final de ciclo da soja são críticas na região quente e úmida.", credito: "BNDES para energia renovável e CPR para custeio de grãos." }
        },
        venda: "C.Vale e cooperativas do Oeste. Feiras e restaurantes locais. Exportação via fronteira.",
        alerta: "⚠️ Veranicos frequentes no verão. Invista em reservatórios de água para irrigação."
    }
};

function analisarCidade() {
    const cidadeRaw = document.getElementById('cidadeInput').value.trim();
    const cidade = cidadeRaw.toLowerCase()
        .normalize('NFD').replace(/\p{Diacritic}/gu, '')
        .replace(/\s+/g, ' ');

    // Tenta correspondência direta e normalizada
    // Normalize both the input and the key for accent-insensitive matching
    const normalize = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    const cidadeNorm = normalize(cidadeRaw);

    const chaveEncontrada = Object.keys(cidades).find(k => {
        return normalize(k) === cidadeNorm;
    });

    const porte = document.getElementById('porte').value;
    const area = document.getElementById('area').value;
    const resultado = document.getElementById('resultadoCultivos');

    if (!cidadeRaw) {
        resultado.innerHTML = `<div class="cultivo-card"><h3>⚠️ Campo vazio</h3><p>Por favor, digite o nome de uma cidade do Paraná.</p></div>`;
        return;
    }

    if (!chaveEncontrada) {
        resultado.innerHTML = `<div class="cultivo-card"><h3>❌ Cidade não encontrada</h3><p>Digite uma cidade válida do Paraná. Exemplos: Curitiba, Londrina, Guarapuava, Cascavel.</p></div>`;
        return;
    }

    const dados = cidades[chaveEncontrada];
    const porteKey = porte || 'medio';
    const info = dados.culturas[porteKey];
    const nomeFormatado = cidadeRaw.charAt(0).toUpperCase() + cidadeRaw.slice(1).toLowerCase();

    const porteTxt = { pequeno: 'Pequeno Produtor (até 50 ha)', medio: 'Médio Produtor (50–500 ha)', grande: 'Grande Produtor (500+ ha)' };
    const areaTxt = area ? `<div class="info-item"><b>📐 Área:</b> ${area} hectares</div>` : '';
    const porteSel = porte ? `<div class="info-item"><b>🚜 Porte:</b> ${porteTxt[porte] || 'Médio Produtor'}</div>` : '';

    resultado.innerHTML = `
        <div class="cultivo-card resultado-completo">
            <div class="resultado-topo">
                <h2>🌾 ${nomeFormatado}</h2>
                <span class="badge-porte badge-${porteKey}">${porteTxt[porteKey]}</span>
            </div>

            <div class="info-item"><b>🌡️ Clima:</b> ${dados.clima}</div>
            ${porteSel}
            ${areaTxt}

            <div class="resultado-grid-cards">
                <div class="res-card">
                    <div class="res-card-icon">🌱</div>
                    <div class="res-card-titulo">Culturas Principais</div>
                    <div class="res-card-texto">${info.principal}</div>
                </div>
                <div class="res-card">
                    <div class="res-card-icon">🔄</div>
                    <div class="res-card-titulo">Culturas Secundárias</div>
                    <div class="res-card-texto">${info.secundaria}</div>
                </div>
                <div class="res-card">
                    <div class="res-card-icon">💰</div>
                    <div class="res-card-titulo">Onde Vender</div>
                    <div class="res-card-texto">${dados.venda}</div>
                </div>
            </div>

            <div class="info-item estrategia-box">
                <b>📋 Estratégia para seu perfil:</b><br>${info.estrategia}
            </div>

            <div class="info-item">
                <b>⚠️ Cuidados Técnicos:</b><br>${info.cuidados}
            </div>

            <div class="info-item credito-box">
                <b>💳 Linhas de Crédito Indicadas:</b><br>${info.credito}
            </div>

            <div class="info-item alerta-box">
                ${dados.alerta}
            </div>
        </div>
    `;

    setTimeout(() => {
        resultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
}

// ==========================================
// AUTOCOMPLETE
// ==========================================
const cidadesPR = [
    'Apucarana','Arapongas','Campo Mourão','Candói','Cascavel',
    'Castro','Curitiba','Foz do Iguaçu','Francisco Beltrão',
    'Guarapuava','Guaratuba','Guaíra','Irati','Lapa',
    'Londrina','Maringá','Paranavaí','Pato Branco','Pinhão',
    'Pitanga','Ponta Grossa','Prudentópolis','Reserva',
    'Telêmaco Borba','Toledo','Turvo','Umuarama','União da Vitória'
];

const inputCidade = document.getElementById('cidadeInput');
const sugestoes = document.getElementById('sugestoesCidade');

inputCidade.addEventListener('input', () => {
    const valor = inputCidade.value.toLowerCase();
    sugestoes.innerHTML = '';
    if (valor.length < 1) return;
    const filtradas = cidadesPR.filter(c => c.toLowerCase().includes(valor));
    filtradas.slice(0, 6).forEach(cidade => {
        const item = document.createElement('div');
        item.classList.add('sugestao-item');
        item.innerText = cidade;
        item.onclick = () => { inputCidade.value = cidade; sugestoes.innerHTML = ''; };
        sugestoes.appendChild(item);
    });
});

document.addEventListener('click', (e) => {
    if (e.target !== inputCidade) sugestoes.innerHTML = '';
});

inputCidade.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { sugestoes.innerHTML = ''; analisarCidade(); }
});

// ==========================================
// ANIMAÇÕES SCROLL
// ==========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
}, { threshold: 0, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
// ==========================================
// BOTÃO VOLTAR AO TOPO
// ==========================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// CAIXA DE ACESSIBILIDADE
// ==========================================

const acessToggle = document.getElementById('acessToggle');
const acessPainel = document.getElementById('acessPainel');

// Abrir/fechar painel
acessToggle.addEventListener('click', () => {
    acessPainel.classList.toggle('open');
    acessToggle.setAttribute('aria-expanded', acessPainel.classList.contains('open'));
});

// Fechar ao clicar fora
document.addEventListener('click', (e) => {
    const box = document.getElementById('acessibilidadeBox');
    if (!box.contains(e.target)) {
        acessPainel.classList.remove('open');
    }
});

// Aumentar fonte
document.getElementById('acessAumentar').addEventListener('click', () => {
    aplicarZoom(1);
});

// Diminuir fonte
document.getElementById('acessDiminuir').addEventListener('click', () => {
    aplicarZoom(-1);
});

// Tema
document.getElementById('acessTema').addEventListener('click', () => {
    alternarTema();
    const isLight = document.body.classList.contains('light-mode');
    document.getElementById('acessTema').innerHTML =
        `<span>${isLight ? '🌙' : '☀️'}</span> Tema ${isLight ? 'Escuro/Claro' : 'Escuro/Claro'}`;
});

// Leitura por voz — só conteúdo principal, ignora menus e botões
let vozAtiva = false;

document.getElementById('acessVoz').addEventListener('click', () => {
    if (!window.speechSynthesis) {
        alert('Seu navegador não suporta leitura por voz.');
        return;
    }
    window.speechSynthesis.cancel();

    // Coleta texto apenas do conteúdo principal (ignora nav, header, buttons)
    const mainEl = document.getElementById('zoom-container');
    const walker = document.createTreeWalker(
        mainEl,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                const parent = node.parentElement;
                const tag = parent.tagName.toLowerCase();
                // Ignora botões, nav, scripts, labels de ícone
                if (['button','nav','script','style','label'].includes(tag)) return NodeFilter.FILTER_REJECT;
                if (parent.closest('nav, button, .ia-grid, .hamburger, .nav-desktop')) return NodeFilter.FILTER_REJECT;
                const txt = node.textContent.trim();
                if (txt.length < 3) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    let textoCompleto = '';
    let node;
    while ((node = walker.nextNode())) {
        textoCompleto += ' ' + node.textContent.trim();
    }

    // Remove emojis so SpeechSynthesis doesn't read them as text descriptions
    textoCompleto = textoCompleto.replace(/[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    textoCompleto = textoCompleto.replace(/\s+/g, ' ').trim();

    const utterance = new SpeechSynthesisUtterance(textoCompleto);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;
    utterance.pitch = 1;

    // Destaca botão de voz
    const btnVoz = document.getElementById('acessVoz');
    btnVoz.classList.add('voz-ativa');
    btnVoz.innerHTML = '<span>🔊</span> Lendo...';
    vozAtiva = true;

    utterance.onend = () => {
        vozAtiva = false;
        btnVoz.classList.remove('voz-ativa');
        btnVoz.innerHTML = '<span>🔊</span> Leitura por Voz';
    };

    window.speechSynthesis.speak(utterance);
});

// Parar leitura
document.getElementById('acessPararVoz').addEventListener('click', () => {
    window.speechSynthesis.cancel();
    vozAtiva = false;
    const btnVoz = document.getElementById('acessVoz');
    btnVoz.classList.remove('voz-ativa');
    btnVoz.innerHTML = '<span>🔊</span> Leitura por Voz';
});

// ==========================================
// ÁREA DE COMENTÁRIOS
// ==========================================

const btnEnviar = document.getElementById('btnEnviarComentario');
const comentariosLista = document.getElementById('comentariosLista');
let comentarios = [];

btnEnviar.addEventListener('click', () => {
    const nome = document.getElementById('comentarioNome').value.trim();
    const texto = document.getElementById('comentarioTexto').value.trim();

    if (!texto) {
        document.getElementById('comentarioTexto').focus();
        document.getElementById('comentarioTexto').style.border = '2px solid #ff4444';
        setTimeout(() => {
            document.getElementById('comentarioTexto').style.border = '';
        }, 1500);
        return;
    }

    const nomeExibir = nome || 'Visitante Anônimo';
    const agora = new Date();
    const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const data = agora.toLocaleDateString('pt-BR');

    comentarios.unshift({ nome: nomeExibir, texto, hora, data });

    renderizarComentarios();

    document.getElementById('comentarioNome').value = '';
    document.getElementById('comentarioTexto').value = '';
});

function renderizarComentarios() {
    if (comentarios.length === 0) {
        comentariosLista.innerHTML = `
            <div class="comentario-vazio">
                <span>🌱</span>
                <p>Seja o primeiro a comentar!</p>
            </div>`;
        return;
    }

    comentariosLista.innerHTML = comentarios.map((c, i) => `
        <div class="comentario-item" style="animation-delay:${i * 0.05}s">
            <div class="comentario-header">
                <div class="comentario-avatar">${c.nome.charAt(0).toUpperCase()}</div>
                <div>
                    <div class="comentario-nome">${c.nome}</div>
                    <div class="comentario-data">${c.data} às ${c.hora}</div>
                </div>
            </div>
            <p class="comentario-texto">${c.texto}</p>
        </div>
    `).join('');
}

// Enviar com Ctrl+Enter no textarea
document.getElementById('comentarioTexto').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        btnEnviar.click();
    }
});
