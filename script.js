// ENTRAR NO SITE
function entrarSite() {
    document.getElementById('intro-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('intro-screen').style.display = 'none';
        document.getElementById('site-content').style.opacity = '1';
    }, 1000);
}

// DADOS DAS CIDADES
const cidadesDados = {
    "guarapuava": { culturas: "Cevada, Trigo e Batata.", clima: "Frio (Cfb), ideal para grãos de inverno.", venda: "Cooperativas locais (Agrária)." },
    "londrina": { culturas: "Café, Soja e Milho.", clima: "Subtropical quente.", venda: "Exportação e Corretoras." },
    "maringa": { culturas: "Soja, Seda e Milho.", clima: "Tropical.", venda: "Cooperativa Cocamar." },
    "cascavel": { culturas: "Soja, Milho e Avicultura.", clima: "Subtropical úmido.", venda: "Coopavel e Exportação." },
    "toledo": { culturas: "Suinocultura, Peixes e Milho.", clima: "Quente.", venda: "Frigoríficos Sadia/BRF." },
    "ponta grossa": { culturas: "Soja, Feijão e Trigo.", clima: "Temperado.", venda: "Polo Logístico." },
    "castro": { culturas: "Leite (Capital Nacional) e Batata.", clima: "Frio.", venda: "Castrolanda." },
    "umuarama": { culturas: "Mandioca e Pecuária de Corte.", clima: "Arenito Caiuá (Quente).", venda: "Indústrias de Fécula." },
    "paranavai": { culturas: "Laranja e Mandioca.", clima: "Quente.", venda: "Citricultura." },
    "pato branco": { culturas: "Soja e Feijão.", clima: "Cfb (Frio).", venda: "Mercado Regional Sudoeste." },
    // Adicione as outras 20 cidades seguindo o mesmo padrão...
};

const cidadesLista = Object.keys(cidadesDados);

// AUTOCOMPLETE INTELIGENTE
const input = document.getElementById('cidadeInput');
const sugestoes = document.getElementById('sugestoesCidade');

input.addEventListener('input', () => {
    const busca = input.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    sugestoes.innerHTML = '';
    
    if (busca.length > 0) {
        const filtradas = cidadesLista.filter(c => 
            c.normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(busca)
        );

        filtradas.forEach(cidade => {
            const div = document.createElement('div');
            div.className = 'sugestao-item';
            div.innerText = cidade.charAt(0).toUpperCase() + cidade.slice(1);
            div.onclick = () => {
                input.value = div.innerText;
                sugestoes.innerHTML = '';
                analisarCidade();
            };
            sugestoes.appendChild(div);
        });
    }
});

// ANALISAR CIDADE
function analisarCidade() {
    const nome = input.value.toLowerCase().trim();
    const resultado = document.getElementById('resultadoCultivos');
    const dados = cidadesDados[nome];

    if (dados) {
        resultado.innerHTML = `
            <div class="resultado-hero">
                <h2 style="color:#00ff88">📍 Análise de ${nome.toUpperCase()}</h2>
                <p><strong>🌾 Cultivos Recomendados:</strong> ${dados.culturas}</p>
                <p><strong>🌦️ Clima predominante:</strong> ${dados.clima}</p>
                <p><strong>🛒 Escoamento:</strong> ${dados.venda}</p>
            </div>`;
    } else {
        resultado.innerHTML = `<p style="color:red; margin-top:20px;">Cidade não encontrada no banco de dados.</p>`;
    }
}

// PARTICLES
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#00ff88' },
        line_linked: { enable: true, color: '#00ff88' },
        move: { speed: 1.5 }
    }
});
