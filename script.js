// VLibras
new window.VLibras.Widget('https://vlibras.gov.br/app');

// PARTICLES
particlesJS('particles-js', {

particles: {

number:{ value:80 },

color:{ value:'#00ff88' },

shape:{ type:'circle' },

opacity:{ value:0.5 },

size:{ value:3 },

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

// TEMA

const themeBtn =
document.getElementById('themeBtn');

themeBtn.addEventListener('click',()=>{

document.body.classList.toggle('light-mode');

});

// ZOOM

let zoomLevel = 100;

document.getElementById('zoomIn')
.addEventListener('click',()=>{

zoomLevel += 10;
document.body.style.zoom = zoomLevel + '%';

});

document.getElementById('zoomOut')
.addEventListener('click',()=>{

zoomLevel -= 10;
document.body.style.zoom = zoomLevel + '%';

});

// ENTRAR SITE

function entrarSite(){

const intro =
document.getElementById('intro-screen');

const site =
document.getElementById('site-content');

intro.style.opacity = '0';

setTimeout(()=>{

intro.style.display = 'none';

site.style.opacity = '1';

document.body.style.overflow = 'auto';

},1000);

}

// ANIMAÇÕES

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

// AUTOCOMPLETE

const cidadesPR = [

'Guarapuava',
'Curitiba',
'Cascavel',
'Londrina',
'Maringá',
'Ponta Grossa',
'Foz do Iguaçu',
'Toledo',
'Pato Branco',
'Francisco Beltrão',
'Campo Mourão',
'Paranavaí',
'Umuarama',
'Apucarana',
'Arapongas',
'Irati',
'União da Vitória',
'Telêmaco Borba',
'Palmas',
'Guaratuba',
'Paranaguá',
'Matinhos',
'Castro',
'Lapa',
'Cianorte',
'Cornélio Procópio',
'Jacarezinho',
'Santo Antônio da Platina',
'Dois Vizinhos',
'Medianeira',
'Assis Chateaubriand',
'Goioerê',
'Ivaiporã',
'Pitanga',
'Prudentópolis',
'Quedas do Iguaçu',
'Rio Negro',
'São Mateus do Sul',
'Wenceslau Braz',
'Palotina'

];

const cidadeInput =
document.getElementById('cidadeInput');

const sugestoes =
document.getElementById('sugestoes');

cidadeInput.addEventListener('input',()=>{

const valor =
cidadeInput.value.toLowerCase();

sugestoes.innerHTML = '';

if(valor.length < 1){

sugestoes.style.display = 'none';
return;

}

const filtradas =
cidadesPR.filter(cidade=>

cidade.toLowerCase()
.includes(valor)

);

if(filtradas.length === 0){

sugestoes.style.display = 'none';
return;

}

sugestoes.style.display = 'block';

filtradas.forEach(cidade=>{

const item =
document.createElement('div');

item.classList.add('sugestao-item');

item.innerText = cidade;

item.onclick = ()=>{

cidadeInput.value = cidade;
sugestoes.style.display = 'none';

};

sugestoes.appendChild(item);

});

});

// FECHAR AUTOCOMPLETE

document.addEventListener('click',(e)=>{

if(!e.target.closest('.autocomplete-box')){

sugestoes.style.display = 'none';

}

});

// DIAGNÓSTICO

function buscarCultivos(){

const cidade =
cidadeInput.value.toLowerCase();

const porte =
document.getElementById('porteSelect').value;

const area =
document.getElementById('areaInput').value;

const resultado =
document.getElementById('resultadoCultivos');

if(cidade === '' || porte === '' || area === ''){

resultado.innerHTML = `

<div class="cultivo-card">

<h3>⚠️ Preencha todos os campos</h3>

<p>
Digite cidade, porte e área.
</p>

</div>

`;

return;

}

// GUARAPUAVA

if(cidade.includes('guarapuava')){

resultado.innerHTML = `

<div class="cultivo-card">

<h3>🍓 Morango</h3>

<p>
Excelente para clima frio.
Alta lucratividade.
</p>

</div>

<div class="cultivo-card">

<h3>🌱 Erva-mate</h3>

<p>
Produção valorizada.
Ideal para clima úmido.
</p>

</div>

<div class="cultivo-card">

<h3>🥬 Hortaliças</h3>

<p>
Ótimo para pequenas áreas.
Venda rápida.
</p>

</div>

`;

}

// CASCAVEL

else if(cidade.includes('cascavel')){

resultado.innerHTML = `

<div class="cultivo-card">

<h3>🌽 Milho</h3>

<p>
Alta produtividade agrícola.
</p>

</div>

<div class="cultivo-card">

<h3>🌾 Soja</h3>

<p>
Grande demanda no mercado.
</p>

</div>

`;

}

// CURITIBA

else if(cidade.includes('curitiba')){

resultado.innerHTML = `

<div class="cultivo-card">

<h3>🥦 Brócolis</h3>

<p>
Clima ideal para hortaliças.
</p>

</div>

<div class="cultivo-card">

<h3>🍇 Uva</h3>

<p>
Boa adaptação regional.
</p>

</div>

`;

}

// NÃO ENCONTRADA

else{

resultado.innerHTML = `

<div class="cultivo-card">

<h3>🌎 Região ainda não cadastrada</h3>

<p>
Estamos adicionando novas cidades.
</p>

</div>

`;

}

// ROLAR AUTOMÁTICO

setTimeout(()=>{

resultado.scrollIntoView({

behavior:'smooth',
block:'start'

});

},300);

}
