
# Echofy

Echofy é um chatbot inteligente para análise de golpes digitais e verificação de páginas suspeitas. Ele atua como assistente de segurança, detectando fraudes, inconsistências e imitações de marcas em ambientes simulados de redes sociais e promoções online.

## 🚀 Funcionalidades do Echofy

- **Análise automática de páginas:** Detecta golpes, imitações de marcas e inconsistências em perfis e promoções.
- **Alertas proativos:** Exibe notificações quando o usuário acessa URLs suspeitas ou páginas conhecidas por golpes.
- **Verificação de empresas e promoções:** Analisa se uma página representa de fato uma marca oficial (ex: Netflix, Monks) ou se há sinais de fraude.
- **Análise técnica visual:** Avalia design, estrutura, formulários e práticas comerciais para identificar páginas falsas.
- **Explicação educativa:** Apresenta evidências claras e objetivas sobre os riscos encontrados, ajudando o usuário a entender o golpe.
- **Interface interativa:** O usuário pode solicitar análises específicas ou receber alertas automáticos durante a navegação.

## 🔎 Tipos de Análise

- **Análise Empresarial:** Verifica se a página representa uma empresa oficial, comparando nomes, domínios e práticas comerciais.
- **Análise Técnica Visual:** Avalia elementos visuais, design, qualidade de imagens e presença de formulários suspeitos.
- **Análise Geral de Segurança:** Procura inconsistências internas, divergências entre nome de perfil, usuário e links.

## 📁 Estrutura do Projeto

```
echofy/
├── index.html                # Ambiente de simulação (Instagram Clone)
├── chatbot.js                # Echofy: Chatbot de análise e alerta
├── assets/                   # Imagens e posts para simulação
├── influencerfake/           # Perfil fake da Netflix (instagram)
├── monksfake/                # Perfil fake Monks (instagram)
├── netflix/                  # Página fake Netflix
└── ...
```

## 💡 Como Usar

1. Acesse a réplica do instagram pelo link: https://gustavofantato.github.io/echofy
2. O Echofy pode ser ativado pelo ícone/flutuante ou por alertas automáticos.
3. Solicite uma análise da página ou empresa usando os botões do chatbot.
4. O Echofy apresentará uma análise detalhada e evidências dos riscos encontrados.

## ⚠️ Objetivo 

O Echofy foi criado para conscientizar sobre golpes digitais, ensinar a identificar páginas falsas e promover a segurança online.


## 📁 Estrutura do Projeto

```
echofy/
├── index.html                # Página principal (Instagram Clone)
├── styles.css                # Estilos gerais
├── script.js                 # Funcionalidades interativas do Instagram
├── chatbot.js                # Chatbot de alerta de golpes
├── assets/
│   ├── imgs/                 # Imagens de perfis, posts e ícones
│   ├── postshome/            # Posts da home
│   ├── postsmonks/           # Posts do perfil Monks
│   └── postsnetflix/         # Posts do perfil Netflix
├── influencerfake/           # Perfil fake da Netflix (instagram)
│   ├── influencerfake.html
│   ├── influencerfake-style.css
│   ├── influencerfake-script.js
│   └── influencerfake-config.js
├── monksfake/                # Página falsa Monks
│   ├── monksfake.html
│   ├── monksfake-style.css
│   ├── monksfake-script.js
│   └── monksfake-config.js
├── netflix/                  # Página web fake Netflix
│   ├── netflix-promo.html
│   ├── netflix-promo.css
│   └── netflix-promo.js
└── README.md                 # Este arquivo
```

## 🧩 Módulos e Páginas

- **Instagram Clone** (`index.html`): Interface principal, simula feed, stories, curtidas e comentários.
- **Influencer Fake** (`influencerfake/`): Perfil fake da Netflix no Instagram.
- **Monks Fake** (`monksfake/`): Página de agência fake, com posts e destaques.
- **Netflix Promo Fake** (`netflix/`): Página promocional falsa da Netflix, simulando golpes comuns.
- **Echofy** (`chatbot.js`): Detecta URLs suspeitas e exibe alertas educativos.


## 📚 Créditos

Desenvolvido por:
 - Gustavo Fantato Fernandes
 - Renan da Silva Blasques 
 - Felipe Galvão Prazeres
 - Rodrigo de Jesus
 - 
**Desenvolvido como proposta de solução do desafio proposto no Hackathon RAIA 2025**


