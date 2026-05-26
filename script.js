window.addEventListener('DOMContentLoaded', () => {
    
    // 1. INICIALIZAÇÃO VLIBRAS
    if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    }

    // 2. SISTEMA DE ZOOM (O QUE VOCÊ PRECISA)
    let zoomLevel = 100; 
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');

    function aplicarZoom() {
        // Altera a escala da fonte no HTML inteiro
        document.documentElement.style.fontSize = zoomLevel + "%";
    }

    if(zoomIn) zoomIn.onclick = () => { if(zoomLevel < 150) { zoomLevel += 10; aplicarZoom(); }};
    if(zoomOut) zoomOut.onclick = () => { if(zoomLevel > 80) { zoomLevel -= 10; aplicarZoom(); }};

    // 3. TEMA LIGHT/DARK
    const themeBtn = document.getElementById('themeBtn');
    if(themeBtn) themeBtn.onclick = () => document.body.classList.toggle('light-mode');

    // 4. PARTICLES.JS
    if (document.getElementById('particles-js')) {
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
    }

    // 5. OBSERVER DE ANIMAÇÃO
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    });
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));
});

// 6. FUNÇÕES GLOBAIS (MODAIS E SITE)
function entrarSite() {
    const intro = document.getElementById('intro-screen');
    const site = document.getElementById('site-content');
    if(intro && site) {
        intro.style.opacity = '0';
        setTimeout(() => {
            intro.style.display = 'none';
            site.style.opacity = '1';
            document.body.style.overflow = 'auto';
        }, 600);
    }
}

function openModal(type) {
    const modal = document.getElementById('modal');
    if(!modal) return;
    modal.style.display = 'block';
    // Lógica de títulos e textos do modal aqui...
}

function closeModal() { document.getElementById('modal').style.display = 'none'; }

function analisarCidade() {
    const cidade = document.getElementById('cidadeInput').value;
    const resultado = document.getElementById('resultadoCultivos');
    if(resultado) {
        resultado.innerHTML = `<div class="cultivo-card"><h3>🌱 ${cidade}</h3><p>Região analisada com sucesso para agricultura sustentável.</p></div>`;
    }
}
