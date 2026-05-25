// ==========================================
// INICIALIZAÇÃO DO VLibras
// ==========================================

new window.VLibras.Widget('https://vlibras.gov.br/app');


// ==========================================
// PARTICLES BACKGROUND
// ==========================================

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


// ==========================================
// TEMA CLARO / ESCURO
// ==========================================

const themeBtn = document.getElementById('themeBtn');

themeBtn.addEventListener('click', () => {

document.body.classList.toggle('light-mode');

});


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
// MODAL DAS TECNOLOGIAS
// ==========================================

function openModal(type){

const modal = document.getElementById('modal');

const title = document.getElementById('modalTitle');

const text = document.getElementById('modalText');

modal.style.display = 'block';

if(type == 1){

title.innerHTML = '🌾 Irrigação Inteligente';

text.innerHTML =
'Sensores analisam a umidade do solo e evitam desperdício de água.';

}

if(type == 2){

title.innerHTML = '🚁 Drones Agrícolas';

text.innerHTML =
'Drones ajudam produtores a monitorar plantações e melhorar a produtividade.';

}

if(type == 3){

title.innerHTML = '☀️ Energia Solar';

text.innerHTML =
'Painéis solares fornecem energia limpa e reduzem impactos ambientais.';

}

}


// ==========================================
// FECHAR MODAL
// ==========================================

function closeModal(){

document.getElementById('modal').style.display = 'none';

}


// ==========================================
// FECHAR MODAL CLICANDO FORA
// ==========================================

window.onclick = function(event){

const modal = document.getElementById('modal');

const helpModal = document.getElementById('helpModal');

if(event.target == modal){

modal.style.display = 'none';

}

if(event.target == helpModal){

helpModal.style.display = 'none';

}

};


// ==========================================
// CLIMA EM TEMPO REAL
// ==========================================

navigator.geolocation.getCurrentPosition(

async(position)=>{

const lat = position.coords.latitude;

const lon = position.coords.longitude;

const apiKey = '3924a0c6fd1f4f713a1f3b29f8f32da8';

try{

const response = await fetch(

`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`

);

const data = await response.json();

const temp = Math.round(data.main.temp);


// ==========================================
// CLIMA PRINCIPAL
// ==========================================

document.querySelector('.weather-box').innerHTML = `

<h3>🌦️ ${data.name}</h3>

<p>🌡️ Temperatura: ${temp}°C</p>

<p>💧 Umidade: ${data.main.humidity}%</p>

<p>🌬️ Vento: ${data.wind.speed} km/h</p>

<p>📍 Localização detectada automaticamente</p>

`;


// ==========================================
// CARDS DO MAPA
// ==========================================

document.getElementById('tempMapa').innerHTML =
temp + '°C';

document.getElementById('umidadeMapa').innerHTML =
data.main.humidity + '%';

document.getElementById('ventoMapa').innerHTML =
data.wind.speed + ' km/h';

document.getElementById('climaMapa').innerHTML =
data.weather[0].description;


// ==========================================
// ALERTAS CLIMÁTICOS
// ==========================================

const alerta =
document.getElementById('alertaClima');

if(temp <= 5){

alerta.innerHTML = `
❄️ ALERTA DE GEADA:
Proteja plantações contra frio intenso.
`;

}

else if(temp >= 35){

alerta.innerHTML = `
🔥 ALERTA DE CALOR EXTREMO:
Aumente irrigação e monitore o solo.
`;

}

else if(data.weather[0].description.includes('chuva')){

alerta.innerHTML = `
🌧️ ALERTA DE CHUVA:
Monitore áreas de plantação e drenagem.
`;

}

else{

alerta.innerHTML = `
✅ Clima favorável para atividades agrícolas.
`;

}

}catch(error){

mostrarClimaPadrao();

}

},

(error)=>{

mostrarClimaPadrao();

}

);


// ==========================================
// CLIMA PADRÃO OFFLINE
// ==========================================

function mostrarClimaPadrao(){

document.querySelector('.weather-box').innerHTML = `

<h3>🌦️ Guarapuava</h3>

<p>🌡️ Temperatura: 18°C</p>

<p>💧 Umidade: 82%</p>

<p>🌬️ Vento: 9 km/h</p>

<p>⚠️ Modo offline ativado</p>

`;

}


// ==========================================
// SIMULADOR DE SUSTENTABILIDADE
// ==========================================

function calcularSustentabilidade(){

const agua =
Number(document.getElementById('agua').value);

const solar =
Number(document.getElementById('solar').value);

const verde =
Number(document.getElementById('verde').value);

const media =
Math.round((agua + solar + verde) / 3);

let nivel = '';

if(media < 40){

nivel = '❌ Sustentabilidade baixa';

}

else if(media < 70){

nivel = '⚠️ Sustentabilidade média';

}

else{

nivel = '✅ Sustentabilidade excelente';

}

document.getElementById('resultadoSimulador').innerHTML = `

🌱 Resultado: ${media}%<br><br>

${nivel}

`;

}


// ==========================================
// CENTRAL EDUCACIONAL
// ==========================================

function mostrarInfo(tipo){

const resposta =
document.getElementById('respostaIA');


// ==========================================
// ECONOMIA DE ÁGUA
// ==========================================

if(tipo == 'agua'){

resposta.innerHTML = `

<h3>💧 Economia de Água</h3>

<p>
A irrigação inteligente utiliza sensores modernos para analisar a umidade do solo e evitar desperdícios.
</p>

`;

}


// ==========================================
// ENERGIA SOLAR
// ==========================================

else if(tipo == 'energia'){

resposta.innerHTML = `

<h3>☀️ Energia Solar</h3>

<p>
A energia solar é uma alternativa limpa e renovável muito importante para o agro sustentável.
</p>

`;

}


// ==========================================
// DRONES
// ==========================================

else if(tipo == 'drones'){

resposta.innerHTML = `

<h3>🚁 Drones Agrícolas</h3>

<p>
Os drones agrícolas ajudam no monitoramento das plantações e identificação de pragas.
</p>

`;

}


// ==========================================
// SOLO
// ==========================================

else if(tipo == 'solo'){

resposta.innerHTML = `

<h3>🌱 Preservação do Solo</h3>

<p>
Técnicas sustentáveis evitam erosão e mantêm nutrientes importantes.
</p>

`;

}


// ==========================================
// CLIMA
// ==========================================

else if(tipo == 'clima'){

resposta.innerHTML = `

<h3>🌦️ Mudanças Climáticas</h3>

<p>
Secas, geadas e chuvas intensas afetam diretamente a agricultura.
</p>

`;

}


// ==========================================
// SUSTENTABILIDADE
// ==========================================

else if(tipo == 'sustentabilidade'){

resposta.innerHTML = `

<h3>🌎 Sustentabilidade</h3>

<p>
A agricultura sustentável busca equilibrar produção e preservação ambiental.
</p>

`;

}


// ==========================================
// GEADA
// ==========================================

else if(tipo == 'geada'){

resposta.innerHTML = `

<h3>❄️ Alertas de Geada</h3>

<p>
O monitoramento climático ajuda produtores a proteger plantações.
</p>

`;

}


// ==========================================
// CHUVAS
// ==========================================

else if(tipo == 'chuva'){

resposta.innerHTML = `

<h3>🌧️ Chuvas Intensas</h3>

<p>
Chuvas fortes podem causar erosão e prejuízos agrícolas.
</p>

`;

}


// ==========================================
// PRAGAS
// ==========================================

else if(tipo == 'pragas'){

resposta.innerHTML = `

<h3>🐛 Controle de Pragas</h3>

<p>
Tecnologias modernas ajudam produtores a identificar pragas rapidamente.
</p>

`;

}


// ==========================================
// ECONOMIA
// ==========================================

else if(tipo == 'economia'){

resposta.innerHTML = `

<h3>💰 Economia Rural</h3>

<p>
A sustentabilidade ajuda produtores a reduzir custos.
</p>

`;

}


// ==========================================
// SENSORES
// ==========================================

else if(tipo == 'sensores'){

resposta.innerHTML = `

<h3>📡 Sensores Inteligentes</h3>

<p>
Sensores monitoram solo, umidade e clima em tempo real.
</p>

`;

}


// ==========================================
// CARBONO
// ==========================================

else if(tipo == 'carbono'){

resposta.innerHTML = `

<h3>🌳 Redução de Carbono</h3>

<p>
Práticas sustentáveis ajudam a reduzir emissão de carbono.
</p>

`;

}


// ==========================================
// SCROLL AUTOMÁTICO
// ==========================================

setTimeout(() => {

const y =
resposta.getBoundingClientRect().top +
window.pageYOffset - 120;

window.scrollTo({

top:y,
behavior:'smooth'

});

},200);

}


// ==========================================
// MODAL DE AJUDA
// ==========================================

function abrirAjuda(){

document.getElementById('helpModal')
.style.display = 'block';

}

function fecharAjuda(){

document.getElementById('helpModal')
.style.display = 'none';

}


// ==========================================
// TELA DE ENTRADA
// ==========================================

function entrarSite(){

const intro =
document.getElementById('intro-screen');

const site =
document.getElementById('site-content');

intro.style.opacity = '0';

intro.style.transform = 'scale(1.1)';

setTimeout(()=>{

intro.style.display = 'none';

site.style.opacity = '1';

document.body.style.overflow = 'auto';

},1000);

}


// ==========================================
// ANIMAÇÕES AO ROLAR
// ==========================================

const observer =
new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

entry.target.classList.add('show');

}

});

});

document.querySelectorAll('.hidden')
.forEach((el)=>observer.observe(el));

// ================================
// DIAGNÓSTICO AGRÍCOLA IA
// ================================

function analisarCidade(){

const cidade = document
.getElementById('cidadeInput')
.value
.toLowerCase();

const resultado = document
.getElementById('resultadoCidade');


// =====================================
// GUARAPUAVA
// =====================================

if(
cidade.includes('guarapuava')
){

resultado.innerHTML = `

<h3>
📍 Guarapuava - PR
</h3>

<p>

✅ Região de clima frio <br>
✅ Excelente para cultivos de inverno <br>
✅ Alta umidade e solo fértil

</p>

<div class="cultivos-grid">

<div class="cultivo-card">

<h4>🍓 Morango</h4>

<p>

💰 Lucro: Alto <br>
🌡️ Clima ideal: Frio <br>
⏳ Colheita: 60 a 90 dias <br>
🏪 Venda:
Feiras, mercados e docerias

</p>

</div>

<div class="cultivo-card">

<h4>🌿 Erva-mate</h4>

<p>

💰 Lucro: Alto <br>
🌡️ Clima ideal: Frio e úmido <br>
⏳ Produção duradoura <br>
🏪 Venda:
Indústrias e cooperativas

</p>

</div>

<div class="cultivo-card">

<h4>🥬 Alface</h4>

<p>

💰 Lucro: Médio <br>
🌡️ Clima ideal: Temperado <br>
⏳ Colheita rápida <br>
🏪 Venda:
Mercados e restaurantes

</p>

</div>

</div>

`;

}


// =====================================
// CURITIBA
// =====================================

else if(
cidade.includes('curitiba')
){

resultado.innerHTML = `

<h3>
📍 Curitiba - PR
</h3>

<p>

✅ Região com clima subtropical <br>
✅ Boa para hortaliças e frutas frias

</p>

<div class="cultivos-grid">

<div class="cultivo-card">

<h4>🍇 Uva</h4>

<p>

💰 Lucro: Alto <br>
🌡️ Clima ideal: Frio moderado <br>
🏪 Venda:
Mercados e vinícolas

</p>

</div>

<div class="cultivo-card">

<h4>🥦 Brócolis</h4>

<p>

💰 Lucro: Médio <br>
🌡️ Clima ideal: Fresco <br>
🏪 Venda:
Mercados locais

</p>

</div>

</div>

`;

}


// =====================================
// CASCAVEL
// =====================================

else if(
cidade.includes('cascavel')
){

resultado.innerHTML = `

<h3>
📍 Cascavel - PR
</h3>

<p>

✅ Região forte no agronegócio <br>
✅ Excelente para grãos e produção intensiva

</p>

<div class="cultivos-grid">

<div class="cultivo-card">

<h4>🌽 Milho</h4>

<p>

💰 Lucro: Alto <br>
🌡️ Clima ideal: Quente <br>
🏪 Venda:
Cooperativas e indústrias

</p>

</div>

<div class="cultivo-card">

<h4>🌱 Soja</h4>

<p>

💰 Lucro: Alto <br>
🌡️ Produção em larga escala <br>
🏪 Exportação e cooperativas

</p>

</div>

</div>

`;

}


// =====================================
// CIDADE NÃO ENCONTRADA
// =====================================

else{

resultado.innerHTML = `

<h3>
❌ Cidade não encontrada
</h3>

<p>

Tente pesquisar cidades como:

<br><br>

📍 Guarapuava <br>
📍 Curitiba <br>
📍 Cascavel

</p>

`;

}

}

// ======================================
// DIAGNÓSTICO AGRÍCOLA
// ======================================

function buscarCultivos(){

const cidade =
document.getElementById(
'cidadeInput'
).value.toLowerCase();

const porte =
document.getElementById(
'porteSelect'
).value;

const area =
document.getElementById(
'areaInput'
).value;

const resultado =
document.getElementById(
'resultadoCultivos'
);


// SEM DADOS

if(
cidade == '' ||
porte == '' ||
area == ''
){

resultado.innerHTML = `

<div class="cultivo-card">

<h3>⚠️ Preencha todos os campos</h3>

<p>

Digite a cidade, escolha o porte
e informe o tamanho da área.

</p>

</div>

`;

return;

}


// GUARAPUAVA

if(cidade.includes('guarapuava')){

// PEQUENO

if(porte == 'pequeno'){

resultado.innerHTML = `

<div class="cultivo-card">

<h3>🍓 Morango</h3>

<p>

✅ Ideal para pequenas áreas.<br><br>

💰 Boa lucratividade.<br><br>

🛒 Venda:
feiras, mercados e doces.

</p>

</div>

<div class="cultivo-card">

<h3>🥬 Alface</h3>

<p>

✅ Crescimento rápido.<br><br>

💰 Fácil de vender.<br><br>

🛒 Hortifrútis e feiras.

</p>

</div>

`;

}


// MÉDIO

else if(porte == 'medio'){

resultado.innerHTML = `

<div class="cultivo-card">

<h3>🌽 Milho</h3>

<p>

✅ Boa produtividade.<br><br>

💰 Forte mercado agrícola.<br><br>

🛒 Cooperativas e cerealistas.

</p>

</div>

<div class="cultivo-card">

<h3>🌱 Erva-mate</h3>

<p>

✅ Excelente para o clima local.<br><br>

💰 Alta procura regional.<br><br>

🛒 Indústrias e mercados.

</p>

</div>

`;

}


// GRANDE

else{

resultado.innerHTML = `

<div class="cultivo-card">

<h3>🌾 Soja</h3>

<p>

✅ Excelente para grandes áreas.<br><br>

💰 Alta demanda mundial.<br><br>

🛒 Exportação e cooperativas.

</p>

</div>

<div class="cultivo-card">

<h3>🌽 Milho em larga escala</h3>

<p>

✅ Forte produção agrícola.<br><br>

💰 Mercado constante.<br><br>

🛒 Agroindústrias.

</p>

</div>

`;

}

}


// CURITIBA

else if(cidade.includes('curitiba')){

resultado.innerHTML = `

<div class="cultivo-card">

<h3>🥬 Hortaliças</h3>

<p>

✅ Excelente para região urbana.<br><br>

🛒 Mercados locais.

</p>

</div>

`;

}


// SALVADOR / BAHIA

else if(
cidade.includes('salvador') ||
cidade.includes('bahia')
){

resultado.innerHTML = `

<div class="cultivo-card">

<h3>🥥 Coco</h3>

<p>

✅ Clima tropical ideal.<br><br>

🛒 Praias e mercados.

</p>

</div>

<div class="cultivo-card">

<h3>🍫 Cacau</h3>

<p>

✅ Forte produção regional.<br><br>

🛒 Chocolates artesanais.

</p>

</div>

`;

}


// NÃO ENCONTRADA

else{

resultado.innerHTML = `

<div class="cultivo-card">

<h3>⚠️ Região ainda não cadastrada</h3>

<p>

Em breve teremos mais cidades
e recomendações agrícolas.

</p>

</div>

`;

}

}

function buscarCultivos(){

const resultado =
document.getElementById(
'resultadoCultivos'
);

resultado.innerHTML = `

<div class="cultivo-card">

<h3>🌱 TESTE FUNCIONANDO</h3>

<p>

O JavaScript está funcionando corretamente.

</p>

</div>

`;

}
