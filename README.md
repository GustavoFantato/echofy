# Instagram Clone

Uma recriação fiel da interface do Instagram com imagens genéricas e conteúdo personalizável.

## 🚀 Funcionalidades

- ✅ Interface idêntica ao Instagram
- ✅ Design responsivo
- ✅ Stories interativos
- ✅ Sistema de curtidas
- ✅ Comentários funcionais
- ✅ Sugestões de usuários
- ✅ Sidebar de navegação
- ✅ Fotos de perfil genéricas
- ✅ Posts com conteúdo editável

## 📁 Estrutura do Projeto

```
raiaHackathon/
├── index.html      # Estrutura principal da página
├── styles.css      # Estilos da interface
├── script.js       # Funcionalidades interativas
└── README.md       # Este arquivo
```

## 🎨 Como Personalizar o Conteúdo

### 📸 Alterar Fotos de Perfil

As fotos de perfil usam o serviço Lorem Picsum. Para personalizar, substitua as URLs:

```html
<!-- Exemplo atual -->
<img src="https://picsum.photos/40/40?random=10" alt="User" class="post-avatar">

<!-- Para usar uma imagem específica -->
<img src="caminho/para/sua/imagem.jpg" alt="User" class="post-avatar">
```

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