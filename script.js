// ==========================================
// INICIALIZAÇÃO DO VLibras
// ==========================================

window.addEventListener('DOMContentLoaded', () => {

    // VLibras
    if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    }

    // ==========================================
    // PARTICLES
    // ==========================================

    if (document.getElementById('particles-js')) {

        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80
                },

                color: {
                    value: '#00ff88'
                },

                shape: {
                    type: 'circle'
                },

                opacity: {
                    value: 0.5
                },

                size: {
                    value: 3
                },

                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00ff88',
                    opacity: 0.4,
                    width: 1
                },

                move: {
                    enable: true,
                    speed: 2
                }
            }
        });
    }

    // ==========================================
    // TEMA
    // ==========================================

    const themeBtn = document.getElementById('themeBtn');

    if (themeBtn) {

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
        });

    }

// ==========================================
// ZOOM
// ==========================================

let zoomLevel = 1; // 1 = 100%

const zoomIn = document.getElementById('zoomIn');
const zoomOut = document.getElementById('zoomOut');

function aplicarZoom() {
    // Usamos transform-origin para o zoom começar do topo e centro
    document.body.style.transform = `scale(${zoomLevel})`;
    document.body.style.transformOrigin = "top center";
    
    // Ajuste opcional: impede que o body fique menor que a tela
    if (zoomLevel > 1) {
        document.body.style.width = (100 / zoomLevel) + "%";
        document.body.style.left = "50%";
        document.body.style.translateX = "-50%";
    } else {
        document.body.style.width = "100%";
    }
}

// Alternativa mais estável para sites complexos: Ajustar o tamanho da fonte
function aplicarZoomAlternativo() {
    // Transforma o nível em porcentagem (ex: 1.1 = 110%)
    document.documentElement.style.fontSize = (zoomLevel * 100) + "%";
}

if (zoomIn) {
    zoomIn.addEventListener('click', () => {
        if (zoomLevel < 1.5) { // Limite máximo de 150%
            zoomLevel += 0.1;
            aplicarZoomAlternativo();
        }
    });
}

if (zoomOut) {
    zoomOut.addEventListener('click', () => {
        if (zoomLevel > 0.8) { // Limite mínimo de 80%
            zoomLevel -= 0.1;
            aplicarZoomAlternativo();
        }
    });
}

    // ==========================================
    // ANIMAÇÕES
    // ==========================================

    const observer =
        new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('show');

                }

            });

        });

    document.querySelectorAll('.hidden')
        .forEach((el) => observer.observe(el));

    // ==========================================
    // AUTOCOMPLETE
    // ==========================================

    const cidades = {
        "guarapuava": true,
        "curitiba": true,
        "londrina": true,
        "maringa": true,
        "cascavel": true,
        "foz do iguaçu": true,
        "ponta grossa": true
    };

    const inputCidade =
        document.getElementById('cidadeInput');

    const sugestoes =
        document.getElementById('sugestoesCidade');

    if (inputCidade && sugestoes) {

        inputCidade.addEventListener('input', () => {

            const valor =
                inputCidade.value.toLowerCase();

            sugestoes.innerHTML = '';

            if (valor.length < 1) return;

            Object.keys(cidades)
                .filter(cidade =>
                    cidade.includes(valor)
                )
                .forEach(cidade => {

                    const item =
                        document.createElement('div');

                    item.classList.add('sugestao-item');

                    item.innerText = cidade;

                    item.onclick = () => {

                        inputCidade.value = cidade;

                        sugestoes.innerHTML = '';

                    };

                    sugestoes.appendChild(item);

                });

        });

    }

});

// ==========================================
// MODAL
// ==========================================

function openModal(type) {

    const modal =
        document.getElementById('modal');

    const title =
        document.getElementById('modalTitle');

    const text =
        document.getElementById('modalText');

    if (!modal) return;

    modal.style.display = 'block';

    if (type == 1) {

        title.innerHTML =
            '🌾 Irrigação Inteligente';

        text.innerHTML =
            'Sensores analisam a umidade do solo.';

    }

    if (type == 2) {

        title.innerHTML =
            '🚁 Drones Agrícolas';

        text.innerHTML =
            'Drones monitoram plantações.';

    }

    if (type == 3) {

        title.innerHTML =
            '☀️ Energia Solar';

        text.innerHTML =
            'Energia limpa para o campo.';

    }

}

// ==========================================
// FECHAR MODAL
// ==========================================

function closeModal() {

    const modal =
        document.getElementById('modal');

    if (modal) {
        modal.style.display = 'none';
    }

}

// ==========================================
// AJUDA
// ==========================================

function abrirAjuda() {

    const help =
        document.getElementById('helpModal');

    if (help) {
        help.style.display = 'block';
    }

}

function fecharAjuda() {

    const help =
        document.getElementById('helpModal');

    if (help) {
        help.style.display = 'none';
    }

}

// ==========================================
// ENTRAR SITE
// ==========================================

function entrarSite() {

    const intro =
        document.getElementById('intro-screen');

    const site =
        document.getElementById('site-content');

    if (!intro || !site) return;

    intro.style.opacity = '0';

    setTimeout(() => {

        intro.style.display = 'none';

        site.style.opacity = '1';

        document.body.style.overflow = 'auto';

    }, 600);

}

// ==========================================
// CENTRAL EDUCACIONAL
// ==========================================

function mostrarInfo(tipo) {

    const resposta =
        document.getElementById('respostaIA');

    if (!resposta) return;

    const textos = {

        agua:
            'A irrigação inteligente evita desperdício.',

        energia:
            'Energia solar reduz custos no campo.',

        drones:
            'Drones ajudam no monitoramento agrícola.',

        solo:
            'Preservar o solo aumenta produtividade.',

        clima:
            'Mudanças climáticas afetam lavouras.',

        sustentabilidade:
            'Sustentabilidade protege o meio ambiente.',

        geada:
            'Geadas podem prejudicar plantações.',

        chuva:
            'Chuvas fortes causam erosão.',

        pragas:
            'Tecnologia ajuda no controle de pragas.',

        economia:
            'Sustentabilidade reduz custos.',

        sensores:
            'Sensores monitoram clima e solo.',

        carbono:
            'Redução de carbono ajuda o planeta.'
    };

    resposta.innerHTML = `
        <h3>${tipo.toUpperCase()}</h3>
        <p>${textos[tipo]}</p>
    `;

}

// ==========================================
// DIAGNÓSTICO
// ==========================================

function analisarCidade() {

    const cidade =
        document.getElementById('cidadeInput')
        .value
        .toLowerCase()
        .trim();

    const resultado =
        document.getElementById('resultadoCultivos');

    if (!resultado) return;

    resultado.innerHTML = `
        <div class="cultivo-card">
            <h3>🌱 ${cidade}</h3>
            <p>
                Região adequada para agricultura sustentável.
            </p>
        </div>
    `;

}
