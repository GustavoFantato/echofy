// Funcionalidades interativas do Instagram Clone
document.addEventListener('DOMContentLoaded', function() {
    
    // Funcionalidade de curtir posts
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const post = this.closest('.post');
            const likesText = post.querySelector('.post-likes span');
            
            if (this.classList.contains('liked')) {
                // Descurtir
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '#262626';
                this.classList.remove('liked');
                
                // Atualizar contagem de likes (simulado)
                const currentText = likesText.textContent;
                const currentNumber = parseInt(currentText.match(/(\d+(?:\.\d{3})*)/)[0].replace('.', ''));
                const newNumber = currentNumber - 1;
                const formattedNumber = newNumber.toLocaleString('pt-BR');
                likesText.innerHTML = currentText.replace(/\d+(?:\.\d{3})*/, formattedNumber);
                
            } else {
                // Curtir
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ed4956';
                this.classList.add('liked');
                
                // Atualizar contagem de likes (simulado)
                const currentText = likesText.textContent;
                const currentNumber = parseInt(currentText.match(/(\d+(?:\.\d{3})*)/)[0].replace('.', ''));
                const newNumber = currentNumber + 1;
                const formattedNumber = newNumber.toLocaleString('pt-BR');
                likesText.innerHTML = currentText.replace(/\d+(?:\.\d{3})*/, formattedNumber);
            }
        });
    });

    // Funcionalidade de salvar posts
    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (this.classList.contains('saved')) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.classList.remove('saved');
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.classList.add('saved');
            }
        });
    });

    // Funcionalidade de comentários
    const commentInputs = document.querySelectorAll('.comment-input');
    const commentPostButtons = document.querySelectorAll('.comment-post');
    
    commentInputs.forEach((input, index) => {
        const postButton = commentPostButtons[index];
        
        // Mostrar/esconder botão de postar baseado no conteúdo
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                postButton.style.opacity = '1';
                postButton.style.pointerEvents = 'auto';
            } else {
                postButton.style.opacity = '0.3';
                postButton.style.pointerEvents = 'none';
            }
        });

        // Postar comentário
        postButton.addEventListener('click', function() {
            const commentText = input.value.trim();
            if (commentText !== '') {
                const post = this.closest('.post');
                const commentsSection = post.querySelector('.post-comments');
                
                // Criar novo comentário
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <span class="username">seu_usuario</span>
                    <span>${commentText}</span>
                `;
                
                // Adicionar comentário antes do input
                const addCommentSection = post.querySelector('.add-comment');
                commentsSection.insertBefore(newComment, addCommentSection);
                
                // Limpar input
                input.value = '';
                postButton.style.opacity = '0.3';
                postButton.style.pointerEvents = 'none';
                
                // Atualizar contador de comentários (simulado)
                const viewCommentsBtn = post.querySelector('.view-comments');
                if (viewCommentsBtn) {
                    const currentText = viewCommentsBtn.textContent;
                    const currentNumber = parseInt(currentText.match(/\d+/)[0]);
                    const newNumber = currentNumber + 1;
                    viewCommentsBtn.textContent = currentText.replace(/\d+/, newNumber);
                }
            }
        });

        // Postar comentário com Enter
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                postButton.click();
            }
        });
    });

    // Funcionalidade dos stories
    const storyItems = document.querySelectorAll('.story-item');
    storyItems.forEach(item => {
        item.addEventListener('click', function() {
            const username = this.querySelector('.story-username').textContent;
            alert(`Abrindo story de ${username}...`);
            // Aqui você pode implementar um modal para mostrar o story
        });
    });

    // Funcionalidade de seguir usuários
    const followButtons = document.querySelectorAll('.follow-btn');
    followButtons.forEach(button => {
        button.addEventListener('click', function() {
            const username = this.closest('.suggestion-item').querySelector('.suggestion-username').textContent;
            
            if (this.textContent === 'Seguir') {
                this.textContent = 'Seguindo';
                this.style.color = '#8e8e8e';
                showNotification(`Você está seguindo ${username}!`);
            } else {
                this.textContent = 'Seguir';
                this.style.color = '#0095f6';
                showNotification(`Você parou de seguir ${username}.`);
            }
        });
    });

    // Funcionalidade de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe active de todos os itens
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Adicionar classe active ao item clicado
            this.closest('.nav-item').classList.add('active');
            
            // Simular navegação
            const linkText = this.querySelector('span')?.textContent || 'Página';
            showNotification(`Navegando para: ${linkText}`);
        });
    });

    // Funcionalidade de opções do post
    const postOptionsButtons = document.querySelectorAll('.post-options');
    postOptionsButtons.forEach(button => {
        button.addEventListener('click', function() {
            showPostOptionsModal();
        });
    });

    // Inicializar botões de comentário como desabilitados
    commentPostButtons.forEach(button => {
        button.style.opacity = '0.3';
        button.style.pointerEvents = 'none';
    });

    // Scroll suave para stories
    const storiesContainer = document.querySelector('.stories-scroll');
    if (storiesContainer) {
        let isScrolling = false;
        
        storiesContainer.addEventListener('wheel', function(e) {
            if (!isScrolling) {
                isScrolling = true;
                this.scrollLeft += e.deltaY;
                setTimeout(() => {
                    isScrolling = false;
                }, 50);
            }
        });
    }
});

// Função para mostrar notificações
function showNotification(message) {
    // Remover notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #262626;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 14px;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(350px);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(350px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Função para mostrar modal de opções do post
function showPostOptionsModal() {
    const modal = document.createElement('div');
    modal.className = 'post-options-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.6);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 12px;
        width: 400px;
        max-width: 90vw;
        overflow: hidden;
    `;

    const options = [
        { text: 'Denunciar', color: '#ed4956', action: () => showNotification('Post denunciado!') },
        { text: 'Não tenho interesse', color: '#ed4956', action: () => showNotification('Obrigado pelo feedback!') },
        { text: 'Incorporar', color: '#262626', action: () => showNotification('Link copiado!') },
        { text: 'Copiar link', color: '#262626', action: () => showNotification('Link copiado para área de transferência!') },
        { text: 'Compartilhar no...', color: '#262626', action: () => showNotification('Abrindo opções de compartilhamento...') },
        { text: 'Cancelar', color: '#262626', action: () => modal.remove() }
    ];

    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.style.cssText = `
            width: 100%;
            padding: 16px;
            border: none;
            background: white;
            color: ${option.color};
            font-size: 14px;
            cursor: pointer;
            border-bottom: ${index < options.length - 1 ? '1px solid #dbdbdb' : 'none'};
            font-weight: ${index < 2 ? '600' : '400'};
        `;

        button.addEventListener('click', () => {
            option.action();
            modal.remove();
        });

        button.addEventListener('mouseenter', () => {
            button.style.background = '#f9f9f9';
        });

        button.addEventListener('mouseleave', () => {
            button.style.background = 'white';
        });

        modalContent.appendChild(button);
    });

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Fechar modal clicando fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Fechar modal com ESC
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

// Função para simular carregamento de mais posts
function loadMorePosts() {
    // Esta função pode ser chamada quando o usuário rolar até o final
    console.log('Carregando mais posts...');
}

// Detectar scroll para carregar mais posts
let loading = false;
window.addEventListener('scroll', () => {
    if (loading) return;
    
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        loading = true;
        setTimeout(() => {
            // Simular carregamento
            showNotification('Carregando mais posts...');
            loading = false;
        }, 1000);
    }
});

// Função para atualizar dados em tempo real (simulado)
setInterval(() => {
    // Simular atualização de stories ou novos posts
    // Esta função pode ser expandida para buscar novos dados de uma API
}, 30000); // A cada 30 segundos