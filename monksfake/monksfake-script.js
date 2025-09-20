// Função para carregar o perfil com base na configuração
function loadProfile() {
    // Carregar informações básicas
    document.getElementById('username').textContent = profileConfig.username;
    document.getElementById('displayName').textContent = profileConfig.displayName;
    document.getElementById('category').textContent = profileConfig.category;
    document.getElementById('description').textContent = profileConfig.description;
    document.getElementById('location').textContent = profileConfig.location;
    document.getElementById('mutualFollowers').textContent = profileConfig.mutualFollowers;
    
    // Carregar imagem do perfil
    document.getElementById('profilePic').src = profileConfig.profilePicture;
    
    // Carregar estatísticas
    document.getElementById('postsCount').textContent = profileConfig.stats.posts;
    document.getElementById('followersCount').textContent = profileConfig.stats.followers;
    document.getElementById('followingCount').textContent = profileConfig.stats.following;
    
    // Website
    const websiteLink = document.getElementById('websiteLink');
    websiteLink.textContent = profileConfig.website.url;
    websiteLink.href = `https://${profileConfig.website.url}`;
    document.getElementById('moreLinks').textContent = profileConfig.website.moreLinksCount;
    
    // Badge de verificação
    const verifiedBadge = document.getElementById('verifiedBadge');
    if (!profileConfig.isVerified) {
        verifiedBadge.style.display = 'none';
    }
    
    // Botão de seguir
    const followBtn = document.getElementById('followBtn');
    followBtn.textContent = profileConfig.followStatus;
    
    // Carregar destaques
    loadHighlights();
    
    // Carregar posts
    loadPosts();
}

// Função para carregar destaques
function loadHighlights() {
    const highlightsContainer = document.getElementById('highlightsContainer');
    highlightsContainer.innerHTML = '';
    
    profileConfig.highlights.forEach(highlight => {
        const highlightElement = document.createElement('div');
        highlightElement.className = 'highlight';
        highlightElement.innerHTML = `
            <div class="highlight-pic">
                <img src="${highlight.image}" alt="${highlight.name}">
            </div>
            <span>${highlight.name}</span>
        `;
        highlightsContainer.appendChild(highlightElement);
    });
}

// Função para carregar posts
function loadPosts() {
    const postsGrid = document.getElementById('postsGrid');
    postsGrid.innerHTML = '';
    
    profileConfig.posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-item';
        
        let typeIndicator = '';
        if (post.type === 'carousel') {
            typeIndicator = '<i class="fas fa-clone post-type-indicator"></i>';
        } else if (post.type === 'video') {
            typeIndicator = '<i class="fas fa-play post-type-indicator"></i>';
        }
        
        postElement.innerHTML = `
            <img src="${post.image}" alt="${post.alt}">
            ${typeIndicator}
            <div class="post-overlay">
                <div class="post-stats">
                    <span><i class="fas fa-heart"></i> ${formatNumber(post.likes)}</span>
                    <span><i class="fas fa-comment"></i> ${formatNumber(post.comments)}</span>
                </div>
            </div>
        `;
        
        postsGrid.appendChild(postElement);
    });
}

// Função para formatar números
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return num.toString();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
    
    // Botão de seguir
    const followBtn = document.getElementById('followBtn');
    followBtn.addEventListener('click', function() {
        if (this.textContent === 'Seguir') {
            this.textContent = 'Seguindo';
            this.style.background = '#363636';
        } else if (this.textContent === 'Seguindo') {
            this.textContent = 'Seguir';
            this.style.background = '#0095f6';
        }
    });
    
    // Navegação de posts
    const postsNavBtns = document.querySelectorAll('.posts-nav-btn');
    postsNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            postsNavBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Chat toggle
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.addEventListener('click', function() {
        this.style.display = this.style.display === 'none' ? 'block' : 'none';
    });
});

// Função para editar perfil (para desenvolvimento)
function updateProfile(newConfig) {
    Object.assign(profileConfig, newConfig);
    loadProfile();
}

// Funcionalidade do popup de phishing
document.addEventListener('DOMContentLoaded', function() {
    const phishingCloseBtn = document.getElementById('phishing-alert-close-btn');
    const phishingOverlay = document.getElementById('phishing-alert-overlay');
    
    if (phishingCloseBtn && phishingOverlay) {
        phishingCloseBtn.addEventListener('click', function() {
            phishingOverlay.classList.add('phishing-alert-hidden');
        });
        
        // Also hide when clicking the overlay (optional)
        phishingOverlay.addEventListener('click', function(e) {
            if (e.target === phishingOverlay) {
                phishingOverlay.classList.add('phishing-alert-hidden');
            }
        });
        
        // Hide with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !phishingOverlay.classList.contains('phishing-alert-hidden')) {
                phishingOverlay.classList.add('phishing-alert-hidden');
            }
        });
    }
});

// Exportar para uso global
window.profileConfig = profileConfig;
window.updateProfile = updateProfile;
