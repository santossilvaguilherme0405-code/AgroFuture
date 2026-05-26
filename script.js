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

const alerta = document.getElementById('alertaClima');

if(alerta){

alerta.innerHTML =

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

console.log(error);

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

const climaBox =
document.querySelector('.weather-box');

if(!climaBox) return;

climaBox.innerHTML = `

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

// ==========================================
// DIAGNÓSTICO AGRÍCOLA IA
// ==========================================

function analisarCidade(){

const cidade = document
.getElementById('cidadeInput')
.value
.toLowerCase()
.trim();

const resultado = document
.getElementById('resultadoCultivos');

const cidades = {

"guarapuava": {
culturas: "Erva-mate, soja, milho, trigo, batata e morango.",
clima: "Clima frio com geadas frequentes.",
venda: "Feiras rurais, cooperativas e mercados locais."
},

"curitiba": {
culturas: "Hortaliças, flores, morango e alface.",
clima: "Clima úmido e frio.",
venda: "Feiras urbanas e mercados municipais."
},

"londrina": {
culturas: "Café, soja, milho e frutas.",
clima: "Clima subtropical quente.",
venda: "Mercados regionais e cooperativas."
},

"maringa": {
culturas: "Soja, milho e hortaliças.",
clima: "Quente e úmido.",
venda: "Cooperativas e exportação."
},

"cascavel": {
culturas: "Soja, milho e trigo.",
clima: "Subtropical.",
venda: "Cooperativas agrícolas."
},

"foz do iguaçu": {
culturas: "Milho, mandioca e frutas.",
clima: "Quente e úmido.",
venda: "Mercados regionais."
},

"ponta grossa": {
culturas: "Soja, trigo e cevada.",
clima: "Frio moderado.",
venda: "Cooperativas e indústria."
},

"toledo": {
culturas: "Milho, soja e suinocultura.",
clima: "Subtropical quente.",
venda: "Agroindústrias."
},

"irati": {
culturas: "Batata, feijão e erva-mate.",
clima: "Frio e úmido.",
venda: "Feiras locais."
},

"castro": {
culturas: "Leite, soja e milho.",
clima: "Clima ameno.",
venda: "Cooperativas leiteiras."
},

"prudentopolis": {
culturas: "Feijão, milho e erva-mate.",
clima: "Frio.",
venda: "Mercados regionais."
},

"campo mourao": {
culturas: "Soja e milho.",
clima: "Quente moderado.",
venda: "Exportação agrícola."
},

"paranavai": {
culturas: "Mandioca e laranja.",
clima: "Quente.",
venda: "Indústrias alimentícias."
},

"umuarama": {
culturas: "Mandioca, milho e pecuária.",
clima: "Subtropical quente.",
venda: "Mercados locais."
},

"apucarana": {
culturas: "Café e milho.",
clima: "Ameno.",
venda: "Cooperativas."
},

"arapongas": {
culturas: "Milho e soja.",
clima: "Quente moderado.",
venda: "Mercados regionais."
},

"francisco beltrao": {
culturas: "Feijão e milho.",
clima: "Úmido.",
venda: "Cooperativas agrícolas."
},

"dois vizinhos": {
culturas: "Soja e aves.",
clima: "Subtropical.",
venda: "Agroindústria."
},

"guaira": {
culturas: "Soja e milho.",
clima: "Quente.",
venda: "Exportação."
},

"jacarezinho": {
culturas: "Café e cana-de-açúcar.",
clima: "Quente.",
venda: "Usinas e cooperativas."
},

"paranagua": {
culturas: "Banana e mandioca.",
clima: "Litorâneo úmido.",
venda: "Porto exportador."
},

"matinhos": {
culturas: "Banana e hortaliças.",
clima: "Litorâneo.",
venda: "Mercados locais."
},

"guaratuba": {
culturas: "Banana e palmito.",
clima: "Úmido tropical.",
venda: "Feiras e turismo."
},

"palmas": {
culturas: "Batata e soja.",
clima: "Frio intenso.",
venda: "Cooperativas."
},

"telemaco borba": {
culturas: "Silvicultura e soja.",
clima: "Ameno.",
venda: "Indústria florestal."
},

"cornelio procopio": {
culturas: "Café e milho.",
clima: "Subtropical.",
venda: "Mercados agrícolas."
},

"ivaipora": {
culturas: "Feijão e milho.",
clima: "Quente.",
venda: "Feiras rurais."
},

"assis chateaubriand": {
culturas: "Soja e trigo.",
clima: "Subtropical.",
venda: "Cooperativas."
},

"medianeira": {
culturas: "Milho e soja.",
clima: "Úmido.",
venda: "Agroindústrias."
},

"pitanga": {
culturas: "Erva-mate e milho.",
clima: "Frio moderado.",
venda: "Mercados locais."
},

"lapa": {
culturas: "Batata e feijão.",
clima: "Frio.",
venda: "Cooperativas."
}

};

// ==========================================
// CIDADE NÃO ENCONTRADA
// ==========================================

if(!cidades[cidade]){

resultado.innerHTML = `

<div class="cultivo-card">

<h3>
❌ Cidade não encontrada
</h3>

<p>
Digite uma cidade cadastrada.
</p>

</div>

`;


// ROLAR AUTOMÁTICO

setTimeout(()=>{

resultado.scrollIntoView({

behavior:'smooth',
block:'start'

});

},200);

return;

}

// ==========================================
// RESULTADO
// ==========================================

resultado.innerHTML = `

<div class="resultado-hero">

<div class="hero-icone">
🌱
</div>

<h2>
Cultivos indicados para
<span>
${cidade.charAt(0).toUpperCase() + cidade.slice(1)}
</span>
</h2>

<p>
Análise agrícola inteligente baseada no clima
e potencial sustentável da região.
</p>

</div>

<div class="resultado-grid">

<div class="resultado-card">

<div class="icone-card">
🌾
</div>

<h3>
Cultivos Recomendados
</h3>

<p>
${cidades[cidade].culturas}
</p>

</div>

<div class="resultado-card">

<div class="icone-card">
🌦️
</div>

<h3>
Condições Climáticas
</h3>

<p>
${cidades[cidade].clima}
</p>

</div>

<div class="resultado-card">

<div class="icone-card">
🛒
</div>

<h3>
Mercado e Vendas
</h3>

<p>
${cidades[cidade].venda}
</p>

</div>

</div>

`;


// ==========================================
// ROLAR AUTOMATICAMENTE
// ==========================================

setTimeout(()=>{

resultado.scrollIntoView({

behavior:'smooth',
block:'start'

});

},200);

}

// ==========================================
// LOAD FINAL
// ==========================================

window.addEventListener('load',()=>{

document.body.style.opacity='1';

});

// ==========================================
// AUTOCOMPLETE DE CIDADES
// ==========================================

const cidadesPR = Object.keys(cidades);

const inputCidade =
document.getElementById('cidadeInput');

const sugestoes =
document.getElementById('sugestoesCidade');

inputCidade.addEventListener('input', ()=>{

const valor =
inputCidade.value.toLowerCase();

sugestoes.innerHTML = '';

if(valor.length < 1){
return;
}

const filtradas = cidadesPR.filter(cidade =>

cidade.toLowerCase().includes(valor)

);

filtradas.forEach(cidade => {

const item =
document.createElement('div');

item.classList.add('sugestao-item');

item.innerText = cidade;

item.onclick = ()=>{

inputCidade.value = cidade;

sugestoes.innerHTML = '';

};

sugestoes.appendChild(item);

});

});

// ==========================================
// ZOOM FUNCIONAL
// ==========================================

let zoomLevel = 1;

const site = document.getElementById('site-content');

document.getElementById('zoomIn')
.addEventListener('click', () => {

zoomLevel += 0.1;

if(zoomLevel > 1.5){
zoomLevel = 1.5;
}

site.style.transform = `scale(${zoomLevel})`;

site.style.transformOrigin = 'top center';

});

document.getElementById('zoomOut')
.addEventListener('click', () => {

zoomLevel -= 0.1;

if(zoomLevel < 0.8){
zoomLevel = 0.8;
}

site.style.transform = `scale(${zoomLevel})`;

site.style.transformOrigin = 'top center';

});
