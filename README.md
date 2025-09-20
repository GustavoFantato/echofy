
# Echofy

Projeto web que simula ambientes de redes sociais e páginas promocionais, com foco em educação sobre golpes digitais e análise de páginas falsas. Inclui clones do Instagram, páginas de influenciadores, promoções falsas e um chatbot de alerta.

## 🚀 Funcionalidades

- Clone do Instagram com interface fiel e interativa
- Páginas falsas de influenciadores e promoções (Monks, Netflix, etc.)
- Chatbot de alerta para golpes digitais
- Sistema de curtidas, comentários e stories
- Design responsivo e moderno
- Assets visuais para posts, perfis e promoções

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
├── influencerfake/           # Página falsa de influenciador
│   ├── influencerfake.html
│   ├── influencerfake-style.css
│   ├── influencerfake-script.js
│   └── influencerfake-config.js
├── monksfake/                # Página falsa Monks
│   ├── monksfake.html
│   ├── monksfake-style.css
│   ├── monksfake-script.js
│   └── monksfake-config.js
├── netflix/                  # Página falsa Netflix
│   ├── netflix-promo.html
│   ├── netflix-promo.css
│   └── netflix-promo.js
└── README.md                 # Este arquivo
```

## 🧩 Módulos e Páginas

- **Instagram Clone** (`index.html`): Interface principal, simula feed, stories, curtidas e comentários.
- **Influencer Fake** (`influencerfake/`): Página de influenciador com posts e stories falsos.
- **Monks Fake** (`monksfake/`): Página de agência fake, com posts e destaques.
- **Netflix Promo Fake** (`netflix/`): Página promocional falsa da Netflix, simulando golpes comuns.
- **Chatbot de Alerta** (`chatbot.js`): Detecta URLs suspeitas e exibe alertas educativos.

## 🎨 Personalização

- As imagens dos perfis e posts podem ser trocadas facilmente nas pastas `assets/imgs`, `postshome`, `postsmonks` e `postsnetflix`.
- Os textos, nomes de usuários e estatísticas dos perfis são configuráveis nos arquivos `*-config.js` de cada página fake.

## 💡 Como Executar

1. Clone o repositório
2. Abra o arquivo `index.html` ou qualquer página fake diretamente no navegador
3. Navegue entre as páginas para explorar as simulações

## ⚠️ Objetivo Educacional

Este projeto foi criado para fins de conscientização sobre golpes digitais, simulação de ambientes suspeitos e treinamento de análise de páginas falsas. Nenhuma página representa empresas reais.

## 📚 Créditos

- Desenvolvido por Gustavo Fantato e colaboradores
- Icons: FontAwesome
- Imagens: Assets próprios e placeholders

### 🖼️ Personalizar Imagens dos Posts

Para alterar as imagens dos posts, edite as URLs no arquivo `index.html`:

```html
<!-- Localizar esta seção em cada post -->
<div class="post-image">
    <img src="https://picsum.photos/600/600?random=100" alt="Post content">
</div>

<!-- Substituir por -->
<div class="post-image">
    <img src="sua-imagem-personalizada.jpg" alt="Post content">
</div>
```

### ✏️ Editar Conteúdo dos Posts

#### Alterar nome de usuário:
```html
<span class="username">fotografo_oficial</span>
<!-- Altere para -->
<span class="username">seu_novo_usuario</span>
```

#### Modificar legendas:
```html
<span class="caption-text">Uma bela paisagem capturada durante o pôr do sol 🌅 #fotografia #natureza #paisagem</span>
<!-- Altere para -->
<span class="caption-text">Sua nova legenda aqui! 😊 #hashtags #personalizadas</span>
```

#### Ajustar contadores de curtidas:
```html
<span>Curtido por <strong>usuario_123</strong> e <strong>outras 1.234 pessoas</strong></span>
<!-- Altere os números e nomes -->
<span>Curtido por <strong>seu_amigo</strong> e <strong>outras 999 pessoas</strong></span>
```

### 👥 Personalizar Sugestões de Usuários

No sidebar direito, você pode editar:

```html
<div class="suggestion-item">
    <img src="https://picsum.photos/44/44?random=20" alt="Sugestão 1" class="suggestion-avatar">
    <div class="suggestion-info">
        <span class="suggestion-username">usuario_sugerido1</span>
        <span class="suggestion-reason">Seguido por amigo_comum</span>
    </div>
    <button class="follow-btn">Seguir</button>
</div>
```

### 📱 Stories Personalizados

Para personalizar os stories:

```html
<div class="story-item">
    <div class="story-avatar">
        <img src="https://picsum.photos/64/64?random=1" alt="Story 1">
    </div>
    <span class="story-username">pessoa_01</span>
</div>
```

## 🛠️ Como Usar

1. **Abra o arquivo `index.html`** em qualquer navegador web moderno
2. **Para editar**: Abra os arquivos em um editor de código
3. **Para personalizar imagens**: Substitua as URLs ou adicione suas próprias imagens na pasta do projeto

## 🎯 Funcionalidades Interativas

- **Curtir posts**: Clique no ícone de coração
- **Comentar**: Digite no campo de comentário e pressione Enter
- **Salvar posts**: Clique no ícone de bookmark
- **Seguir usuários**: Clique em "Seguir" nas sugestões
- **Navegar**: Use os links da sidebar
- **Stories**: Clique nos avatars dos stories

## 📐 Layout Responsivo

A interface se adapta automaticamente a diferentes tamanhos de tela:
- **Desktop**: Layout completo com 3 colunas
- **Tablet**: Sidebar compacta
- **Mobile**: Layout simplificado para dispositivos móveis

## 🎨 Personalização Avançada

### Cores do Tema
Para alterar as cores principais, edite as variáveis CSS em `styles.css`:

```css
/* Cores principais do Instagram */
:root {
    --primary-color: #0095f6;
    --secondary-color: #ed4956;
    --text-color: #262626;
    --border-color: #dbdbdb;
    --background-color: #fafafa;
}
```

### Adicionar Novos Posts
Para adicionar mais posts, copie a estrutura de um post existente e cole antes do fechamento de `.posts-container`:

```html
<!-- Copie toda esta estrutura -->
<article class="post" data-post-id="4">
    <!-- Conteúdo do post aqui -->
</article>
```

### Modificar Fontes
As fontes podem ser alteradas no topo do arquivo CSS:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

## 🖼️ Serviços de Imagens Recomendados

- **Lorem Picsum**: `https://picsum.photos/largura/altura?random=numero`
- **Placeholder.com**: `https://via.placeholder.com/larguraxaltura`
- **Unsplash Source**: `https://source.unsplash.com/larguraxaltura/?tema`

## 💡 Dicas de Personalização

1. **Mantenha a consistência**: Use dimensões similares para imagens do mesmo tipo
2. **Otimize as imagens**: Para melhor performance, use imagens otimizadas
3. **Teste a responsividade**: Verifique como suas alterações ficam em diferentes dispositivos
4. **Preserve a estrutura**: Mantenha as classes CSS para garantir que as funcionalidades continuem funcionando

## 🔧 Solução de Problemas

- **Imagens não carregam**: Verifique se as URLs estão corretas e acessíveis
- **Layout quebrado**: Certifique-se de não ter removido classes CSS importantes
- **Funcionalidades não funcionam**: Verifique se o arquivo `script.js` está sendo carregado

## 📄 Licença

Este projeto é uma recriação educacional da interface do Instagram para fins de aprendizado e demonstração.

---

**Desenvolvido com ❤️ para demonstrar habilidades de desenvolvimento front-end**