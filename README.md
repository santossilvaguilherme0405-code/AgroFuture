# 🌱 AgroFuture — Agro Forte, Futuro Sustentável

> Plataforma web educacional e de diagnóstico agrícola inteligente para produtores rurais do Paraná.  
> Desenvolvido por **Guilherme dos Santos Silva** — Colégio Estadual do Campo de São Manoel (EFM) · Agrinho 2026

---

## 📋 Sobre o Projeto

O **AgroFuture** é um site que combina tecnologia, sustentabilidade e informação agrícola para apoiar produtores rurais paranaenses. A plataforma oferece diagnóstico personalizado por cidade e porte de produção, dados climáticos em tempo real e uma central educacional com temas de agricultura sustentável.

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🌾 **Diagnóstico Agrícola** | Recomendações de culturas, estratégias e crédito por cidade e porte |
| 🌦️ **Clima em Tempo Real** | Dados via OpenWeatherMap com geolocalização automática |
| 🌱 **Central Educacional** | 12 temas sobre agricultura sustentável, tecnologia e meio ambiente |
| 📞 **Central de Ajuda** | Links para Simepar, Embrapa, ANA e Secretaria da Agricultura-PR |
| 💬 **Comentários** | Área para interação dos visitantes (sessão atual) |
| ♿ **Acessibilidade** | Zoom de fonte, modo claro/escuro e leitura por voz (Web Speech API) |
| 🤟 **VLibras** | Integração com o plugin oficial de Língua Brasileira de Sinais |
| 📱 **Responsivo** | Layout adaptado para desktop, tablet e mobile com menu hambúrguer |

---

## 🗺️ Cidades Suportadas no Diagnóstico

28 cidades do Paraná com dados específicos de clima, culturas, estratégias e crédito:

Apucarana · Arapongas · Campo Mourão · Candói · Cascavel · Castro · Curitiba · Foz do Iguaçu · Francisco Beltrão · Guarapuava · Guaratuba · Guaíra · Irati · Lapa · Londrina · Maringá · Paranavaí · Pato Branco · Pinhão · Pitanga · Ponta Grossa · Prudentópolis · Reserva · Telêmaco Borba · Toledo · Turvo · Umuarama · União da Vitória

---

## 🚀 Como Usar

### Pré-requisitos

Nenhuma instalação necessária. O projeto roda diretamente no navegador.

### Executando localmente

```bash
# Clone ou baixe o projeto
git clone https://github.com/seu-usuario/agrofuture.git

# Acesse a pasta
cd agrofuture

# Abra o arquivo principal no navegador
# (duplo clique em index.html, ou use uma extensão como Live Server no VS Code)
```

> **Dica:** Para que a geolocalização e a API de clima funcionem corretamente, use um servidor local (ex: extensão **Live Server** do VS Code) em vez de abrir o arquivo diretamente.

---

## 📁 Estrutura de Arquivos

```

agrofuture/
Imagens/
ImgAbertura.jpg   # Imagem de fundo da seção hero
index.html        # Estrutura principal da página
style.css         # Estilos, responsividade e temas
script.js         # Lógica, diagnóstico, clima e acessibilidade

```

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** — estrutura semântica
- **CSS3** — variáveis, grid, flexbox, animações e media queries
- **JavaScript (ES6+)** — lógica, DOM, Intersection Observer, Web Speech API
- **[Particles.js](https://vincentgarreau.com/particles.js/)** — animação de partículas no fundo
- **[OpenWeatherMap API](https://openweathermap.org/api)** — dados climáticos em tempo real
- **[VLibras](https://vlibras.gov.br/)** — acessibilidade em Libras
- **[Google Fonts — Poppins](https://fonts.google.com/specimen/Poppins)** — tipografia

---

## 🌦️ Configuração da API de Clima

O projeto usa a API gratuita do OpenWeatherMap. A chave atual está definida em `script.js`:

```javascript
const apiKey = 3924a0c6fd1f4f713a1f3b29f8f32da8;
```

Para usar sua própria chave:
1. Crie uma conta em [openweathermap.org](https://openweathermap.org)
2. Gere uma API Key gratuita no painel
3. Substitua o valor da variável `apiKey` no `script.js`

---

## ♿ Recursos de Acessibilidade

- **Zoom de fonte** — botões A+ e A− com persistência em `localStorage`
- **Modo claro/escuro** — alternância com preferência salva
- **Leitura por voz** — Web Speech API lê o conteúdo principal em português
- **VLibras** — tradução automática para Libras
- **ARIA labels** — atributos `aria-label` nos elementos interativos
- **Navegação por teclado** — Enter no campo de cidade aciona a busca

---

## 📸 Seções da Página

1. **Hero** — apresentação com chamada para ação
2. **Diagnóstico Inteligente** — busca por cidade + porte + área
3. **Central Educacional** — 12 cards de temas sustentáveis
4. **Clima em Tempo Real** — condições atuais com recomendação agrícola do dia
5. **Central de Ajuda** — links e orientações para órgãos oficiais
6. **Comentários** — área de interação dos visitantes
7. **Contadores** — números animados ao rolar a página
8. **Rodapé** — créditos, referências e informações do projeto

---

## 📚 Referências

- [bemagro.com — Benefícios da IA no Campo](https://www.bemagro.com/beneficios-inteligencia-artificial-no-campo/)
- [agrolink.com.br — O Campo Conectado: como a IA transforma o agro](https://www.agrolink.com.br/noticias/o-campo-conectado--como-a-ia-vem-transformando-o-agro_514351.html)
- [Simepar — Sistema Meteorológico do Paraná](https://www.simepar.br)
- [Embrapa — Empresa Brasileira de Pesquisa Agropecuária](https://www.embrapa.br)
- [ANA — Agência Nacional de Águas](https://www.gov.br/ana)
- [Secretaria da Agricultura do Paraná](https://www.agricultura.pr.gov.br)

---

## 👨‍💻 Autor

**Guilherme dos Santos Silva**  
Colégio Estadual do Campo de São Manoel — EFM  
Projeto desenvolvido para o **Agrinho 2026**

---

*AgroFuture 2026 · Conectando a inteligência tecnológica à terra de forma sustentável*
