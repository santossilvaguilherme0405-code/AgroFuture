// =========================
// script.js
// =========================

// VLibras
new window.VLibras.Widget(
'https://vlibras.gov.br/app'
);

// PARTICLES
particlesJS('particles-js', {

particles: {

number:{
value:80
},

color:{
value:'#00ff88'
},

shape:{
type:'circle'
},

opacity:{
value:0.5
},

size:{
value:3
},

line_linked:{
enable:true,
distance:150,
color:'#00ff88',
opacity:0.4,
width:1
},

move:{
enable:true,
speed:2
}

}

});

// ENTRAR NO SITE
function entrarSite(){

const intro =
document.getElementById('intro-screen');

const site =
document.getElementById('site-content');

intro.style.opacity='0';

setTimeout(()=>{

intro.style.display='none';

site.style.opacity='1';

document.body.style.overflow='auto';

},1000);

}

// CLIMA
navigator.geolocation.getCurrentPosition(

async(position)=>{

const lat = position.coords.latitude;

const lon = position.coords.longitude;

const apiKey =
'3924a0c6fd1f4f713a1f3b29f8f32da8';

try{

const response = await fetch(

`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`

);

const data = await response.json();

const temp =
Math.round(data.main.temp);

document.querySelector('.weather-box')
.innerHTML = `

<h3>
🌦️ ${data.name}
</h3>

<p>
🌡️ Temperatura: ${temp}°C
</p>

<p>
💧 Umidade: ${data.main.humidity}%
</p>

<p>
🌬️ Vento: ${data.wind.speed} km/h
</p>

`;

}catch(error){

mostrarClimaPadrao();

}

},

(error)=>{

mostrarClimaPadrao();

}

);

// CLIMA PADRÃO
function mostrarClimaPadrao(){

document.querySelector('.weather-box')
.innerHTML = `

<h3>
🌦️ Guarapuava
</h3>

<p>
🌡️ Temperatura: 18°C
</p>

<p>
💧 Umidade: 82%
</p>

<p>
🌬️ Vento: 9 km/h
</p>

`;

}

// DIAGNÓSTICO IA
function analisarCidade(){

const cidade =
document.getElementById('cidadeInput')
.value
.toLowerCase()
.trim();

const resultado =
document.getElementById('resultadoCultivos');

const cidades = {

"guarapuava":{
culturas:"Erva-mate, soja, milho, trigo, batata e morango.",
clima:"Clima frio com geadas frequentes.",
venda:"Feiras rurais, cooperativas e mercados locais."
},

"curitiba":{
culturas:"Hortaliças, flores, morango e alface.",
clima:"Clima úmido e frio.",
venda:"Feiras urbanas e mercados municipais."
},

"londrina":{
culturas:"Café, soja, milho e frutas.",
clima:"Clima subtropical quente.",
venda:"Mercados regionais e cooperativas."
}

};

if(cidades[cidade]){

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
Análise agrícola inteligente baseada no clima.
</p>

</div>

<div class="resultado-grid">

<div class="resultado-card">

<div class="icone-card">
🌾
</div>

<h3>
Cultivos
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
Clima
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
Mercado
</h3>

<p>
${cidades[cidade].venda}
</p>

</div>

</div>

`;

setTimeout(()=>{

resultado.scrollIntoView({

behavior:'smooth',
block:'start'

});

},200);

}

else{

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

}

}
