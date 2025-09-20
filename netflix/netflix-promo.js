// Netflix Promo Page - Popup Functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - netflix-promo.js');
    
    // Chatbot functionality
    const chatbotFab = document.querySelector('.chatbot-fab');
    const chatbotPopup = document.querySelector('.chatbot-popup');
    const chatbotCloseBtn = document.querySelector('.chatbot-close-btn');
    const scanOverlay = document.querySelector('.scan-overlay');
    
    if (chatbotFab && chatbotPopup) {
        chatbotFab.addEventListener('click', function() {
            console.log('Chatbot FAB clicked');
            chatbotPopup.style.display = chatbotPopup.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    if (chatbotCloseBtn && chatbotPopup) {
        chatbotCloseBtn.addEventListener('click', function() {
            console.log('Chatbot close button clicked');
            chatbotPopup.style.display = 'none';
        });
    }
    
    // Verify company button functionality
    const verifyCompanyBtn = document.getElementById('verify-company');
    if (verifyCompanyBtn) {
        verifyCompanyBtn.addEventListener('click', function() {
            console.log('Verify company clicked');
            // Para "Verificar Empresa", não executamos scan nem fechamos o popup
            // A análise será feita pelo chatbot.js
        });
    }
    
    // Verify page button functionality
    const verifyPageBtn = document.getElementById('verify-page');
    if (verifyPageBtn && scanOverlay) {
        verifyPageBtn.addEventListener('click', function() {
            console.log('Verify page clicked');
            // Show scan overlay apenas para "Verificar Página"
            scanOverlay.style.display = 'block';
            // Não fechamos mais o popup automaticamente
            
            // Hide scan overlay after 2 seconds (tempo reduzido para ser consistente)
            setTimeout(() => {
                scanOverlay.style.display = 'none';
            }, 2000);
        });
    }
    
    // Phishing alert functionality
    const phishingCloseBtn = document.getElementById('phishing-alert-close-btn');
    const phishingOverlay = document.getElementById('phishing-alert-overlay');
    
    if (phishingCloseBtn && phishingOverlay) {
        phishingCloseBtn.addEventListener('click', function(e) {
            console.log('Phishing alert close button clicked');
            e.preventDefault();
            e.stopPropagation();
            phishingOverlay.classList.add('phishing-alert-hidden');
        });
        
        // Hide with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !phishingOverlay.classList.contains('phishing-alert-hidden')) {
                console.log('Escape key pressed - hiding phishing alert');
                phishingOverlay.classList.add('phishing-alert-hidden');
            }
        });
    }
    
    function showPhishingAlert() {
        console.log('Showing phishing alert');
        if (phishingOverlay) {
            phishingOverlay.classList.remove('phishing-alert-hidden');
        }
    }
});