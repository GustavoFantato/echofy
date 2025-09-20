// Usamos a importação simples via CDN.
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA PARA O ALERTA PROATIVO (NOTIFICAÇÃO DE CANTO) ---
    const fakeUrlDatabase = [
        "http://127.0.0.1:5500/monksfake/monksfake.html",
        "https://www.facebok.com/monksinbrazil.store/",
        "http://monks-vagas.xyz/oportunidade-imperdivel"
    ];

    const alertOverlay = document.getElementById('phishing-alert-overlay');
    const alertMessage = document.getElementById('phishing-alert-message');
    const alertCloseBtn = document.getElementById('phishing-alert-close-btn');
    let alertTimeout;

    const checkCurrentPage = () => {
        const currentPageUrl = window.location.href;
        if (fakeUrlDatabase.includes(currentPageUrl) && alertOverlay) {
            alertMessage.textContent = 'Esse link foi constado como suspeito na nossa base de dados.';
            alertOverlay.classList.remove('phishing-alert-hidden');
            clearTimeout(alertTimeout); 
            alertTimeout = setTimeout(() => {
                alertOverlay.classList.add('phishing-alert-hidden');
            }, 7000);
        }
    };
    
    if(alertCloseBtn) {
        alertCloseBtn.addEventListener('click', () => {
            clearTimeout(alertTimeout);
            alertOverlay.classList.add('phishing-alert-hidden');
        });
    }
    checkCurrentPage();

    // --- LÓGICA PARA O CHATBOT DE ANÁLISE (POPUP PRINCIPAL) ---

    const chatbotFab = document.querySelector('.chatbot-fab');
    const chatbotPopup = document.querySelector('.chatbot-popup');
    const closeBtn = document.querySelector('.chatbot-close-btn');
    const chatBody = document.querySelector('.chatbot-body');
    const verifyCompanyBtn = document.getElementById('verify-company');
    const verifyPageBtn = document.getElementById('verify-page');
    const scanOverlay = document.querySelector('.scan-overlay');

    const GEMINI_API_KEY = 'AIzaSyDeiAgAXBbaaRreDVVDhPs8A2U3wjK7HkU';

    const formatResponseToHtml = (text) => {
        let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        const listItems = html.match(/^\* (.*$)/gm);
        if (listItems) {
            const listHtml = '<ul>' + listItems.map(item => `<li>${item.substring(2)}</li>`).join('') + '</ul>';
            html = html.replace(/^\* (.*$)/gm, '');
            html = html.replace(/(\r\n|\n|\r){2,}/g, '$1').trim() + listHtml;
        }
        return html.replace(/\n/g, '<br>');
    };

    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender === 'bot' ? 'bot-message' : 'user-message');
        const p = document.createElement('p');
        if (sender === 'bot') { p.innerHTML = formatResponseToHtml(text); } 
        else { p.textContent = text; }
        messageDiv.appendChild(p);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    let genAI;
    let model;
    try {
        genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    } catch (error) {
        console.error("Erro ao inicializar o SDK:", error);
        addMessage("ERRO: Falha ao carregar as bibliotecas da IA.", 'bot');
    }

    if (chatbotFab) {
        chatbotFab.addEventListener('click', () => { 
            if (chatbotPopup) chatbotPopup.style.display = 'flex'; 
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', () => { 
            if (chatbotPopup) chatbotPopup.style.display = 'none'; 
        });
    }

    const callGeminiApi = async (prompt) => {
        if (!model) {
             addMessage("O modelo de IA não está inicializado.", 'bot');
             return;
        }
        addMessage("Analisando...", 'bot');
        try {
            const result = await model.generateContent(prompt);
            const text = result.response.text();
            addMessage(text, 'bot');
        } catch (error) {
            console.error("Erro ao chamar a API:", error);
            addMessage("Desculpe, ocorreu um erro na análise.", 'bot');
        }
    };
    
    if (verifyCompanyBtn) {
        verifyCompanyBtn.addEventListener('click', () => {
            addMessage("Iniciando análise de inconsistências...", 'bot');
            const pageUrl = window.location.href;
            const pageHtmlSnippet = document.body.innerHTML.substring(0, 5000);
            let prompt;

            if (pageUrl.includes('monks') || pageHtmlSnippet.toLowerCase().includes('monks')) {
                prompt = `Sua tarefa é atuar como um detetive digital, analisando um perfil que parece ser da marca "monksinbrazil".
                **Informação-Chave (A Verdade):** A marca oficial e confiável é "monksinbrazil". Use este nome como a única referência correta.
                **Regras da Análise:**
                1.  **FOCO NO CONTEÚDO, NÃO NA ORIGEM:** Ignore a URL da página se ela for local ('127.0.0.1', 'localhost'). Sua análise deve se basear no conteúdo do perfil (HTML), não no endereço de teste.
                2.  **COMPARAÇÃO ESTRITA:** Compare os dados do perfil (Nome de Usuário, Links) com a marca oficial "monksinbrazil".
                Dados da Página: URL: "${pageUrl}", HTML: "${pageHtmlSnippet}"
                Formato de Resposta (OBRIGATÓRIO E SUCINTO):
                **Análise:** Página Falsa. 
                **Evidências:** 
                * [Evidência 1] 
                * [Evidência 2]`;
            } else {
                prompt = `Sua tarefa é atuar como um detetive digital, realizando uma análise de segurança geral em uma página web.
                **Regras da Análise Geral:**
                1.  **FOCO NO CONTEÚDO, NÃO NA ORIGEM:** Ignore a URL da página se ela for local ('127.0.0.1', 'localhost'). Sua análise deve se basear no conteúdo (HTML), não no endereço de teste.
                2.  **INCONSISTÊNCIAS INTERNAS:** Procure por inconsistências entre o nome da marca/perfil exibido, o nome de usuário e os domínios dos links.
                Dados da Página: URL: "${pageUrl}", HTML: "${pageHtmlSnippet}"
                Formato de Resposta (OBRIGATÓRIO E SUCINTO):
                **Análise:** Página Falsa. 
                **Evidências:** 
                * [Evidência 1] 
                * [Evidência 2]`
            }
            
            callGeminiApi(prompt);
        });
    }
    
    // Botão "Análise da Página" com a regra de ignorar host local reforçada
    if (verifyPageBtn) {
        verifyPageBtn.addEventListener('click', () => {
            addMessage("Analisando a página atual...", 'user');
            scanOverlay.style.display = 'block';
            
            setTimeout(() => {
                scanOverlay.style.display = 'none';
                addMessage("Análise visual concluída. Verificando...", 'bot');
                const pageUrl = window.location.href;
                const pageHtmlSnippet = document.body.innerHTML.substring(0, 5000);
                let prompt;

                if (pageUrl.includes('monks') || pageHtmlSnippet.toLowerCase().includes('monks')) {
                    // MODO ESPECIALISTA com regra reforçada
                    prompt = `Sua tarefa é atuar como um detetive digital, analisando um perfil que parece ser da marca "monksinbrazil".
                    **Informação-Chave (A Verdade):** A marca oficial e confiável é "monksinbrazil".
                    **Regras da Análise:**
                    1.  **FOCO NO CONTEÚDO, NÃO NA ORIGEM:** Ignore a URL da página se ela for local ('127.0.0.1', 'localhost'). Sua análise deve se basear no conteúdo do perfil (HTML), não no endereço de teste.
                    2.  **COMPARAÇÃO ESTRITA:** Compare os dados do perfil (Nomes, Links) com a marca oficial.
                    Dados da Página: URL: "${pageUrl}", HTML: "${pageHtmlSnippet}"
                    Formato de Resposta (OBRIGATÓRIO E SUCINTO):
                    **Análise:** Página Falsa. 
                    **Evidências:** 
                    * [Evidência 1] 
                    * [Evidência 2]`;
                } else {
                    // MODO GERAL com regra reforçada
                    prompt = `Sua tarefa é atuar como um detetive digital, realizando uma análise de segurança geral.
                    **Regras da Análise Geral:**
                    1.  **FOCO NO CONTEÚDO, NÃO NA ORIGEM:** Ignore a URL da página se ela for local ('127.0.0.1', 'localhost'). Sua análise deve se basear no conteúdo (HTML), não no endereço de teste.
                    2.  **INCONSISTÊNCIAS INTERNAS:** Procure por inconsistências entre o nome da marca, nome de usuário e domínios de links.
                    Dados da Página: URL: "${pageUrl}", HTML: "${pageHtmlSnippet}"
                    Formato de Resposta (OBRIGATÓRIO E SUCINTO):
                    **Análise:** Página Suspeita.  
                    **Evidências:** 
                    * [Evidência 1] 
                    * [Evidência 2]`
                }
                
                callGeminiApi(prompt);
            }, 2000);
        });
    }
});