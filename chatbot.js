// Importamos a classe diretamente de um CDN compatível com módulos
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

document.addEventListener('DOMContentLoaded', () => {
    
    const chatbotFab = document.querySelector('.chatbot-fab');
    const chatbotPopup = document.querySelector('.chatbot-popup');
    const closeBtn = document.querySelector('.chatbot-close-btn');
    const chatBody = document.querySelector('.chatbot-body');
    const verifyCompanyBtn = document.getElementById('verify-company');
    const verifyPageBtn = document.getElementById('verify-page');
    const scanOverlay = document.querySelector('.scan-overlay');

    // =================================================================
    // IMPORTANTE: Coloque sua chave de API aqui
    const GEMINI_API_KEY = 'AIzaSyDeiAgAXBbaaRreDVVDhPs8A2U3wjK7HkU';
    // =================================================================

    // --- NOVA FUNÇÃO PARA FORMATAR A RESPOSTA DA IA ---
    const formatResponseToHtml = (text) => {
        // Converte **negrito** para <strong>negrito</strong>
        let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Converte linhas que começam com * para itens de lista <li>
        const listItems = html.match(/^\* (.*$)/gm);
        if (listItems) {
            const listHtml = '<ul>' + listItems.map(item => `<li>${item.substring(2)}</li>`).join('') + '</ul>';
            // Substitui o texto original da lista pelo HTML da lista
            html = html.replace(/^\* (.*$)/gm, '');
            html = html.replace(/(\r\n|\n|\r){2,}/g, '$1').trim() + listHtml;
        }
        
        // Substitui quebras de linha por <br> para manter a estrutura
        return html.replace(/\n/g, '<br>');
    };

    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender === 'bot' ? 'bot-message' : 'user-message');
        const p = document.createElement('p');
        
        if (sender === 'bot') {
            // Usa a nova função para formatar a resposta do bot
            p.innerHTML = formatResponseToHtml(text);
        } else {
            p.textContent = text;
        }
        
        messageDiv.appendChild(p);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    // Inicializa o SDK do Gemini
    let genAI;
    let model;
    try {
        genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    } catch (error) {
        console.error("Erro ao inicializar o SDK do Gemini:", error);
        addMessage("Não foi possível carregar o assistente de IA. Verifique a chave de API e a conexão.", 'bot');
    }

    // Abre e fecha o chatbot
    chatbotFab.addEventListener('click', () => {
        chatbotPopup.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        chatbotPopup.style.display = 'none';
    });

    const callGeminiApi = async (prompt) => {
        if (!model) {
             addMessage("O modelo de IA não está inicializado. Verifique a chave da API no console.", 'bot');
             return;
        }

        addMessage("Analisando...", 'bot');

        try {
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
            addMessage(text, 'bot');
        } catch (error) {
            console.error("Erro ao chamar a API do Gemini via SDK:", error);
            addMessage("Desculpe, ocorreu um erro ao processar sua solicitação. A API pode estar indisponível ou a requisição foi bloqueada.", 'bot');
        }
    };

    // Botão "Verificar Empresa"
    verifyCompanyBtn.addEventListener('click', () => {
        addMessage("Iniciando detecção automática do perfil na página...", 'bot');
        const pageUrl = window.location.href;
        const pageHtmlSnippet = document.body.innerHTML.substring(0, 4000);

        // --- PROMPT AINDA MAIS REFINADO PARA RESPOSTAS CURTAS ---
        const prompt = `Como um agente de marca, identifique o perfil principal nos dados abaixo e analise sua autenticidade.
        Dados:
        - URL: "${pageUrl}"
        - HTML: "${pageHtmlSnippet}"

        Siga este formato de resposta OBRIGATORIAMENTE:
        **Nome principal:** [Nome que você identificou]
        **Análise de autenticidade:** A página parece [falsificada/legítima].
        * [Motivo 1 em poucas palavras]
        * [Motivo 2 em poucas palavras]
        * [Motivo 3 em poucas palavras]`;
        
        callGeminiApi(prompt);
    });

    // Botão "Verificar Página"
    verifyPageBtn.addEventListener('click', () => {
        addMessage("Ok, vou iniciar a análise completa desta página.", 'user');
        scanOverlay.style.display = 'block';
        
        setTimeout(() => {
            scanOverlay.style.display = 'none';
            addMessage("Análise visual concluída. Enviando para o assistente...", 'bot');
            const pageUrl = window.location.href;
            const pageContentSample = document.body.innerText.substring(0, 4000);

            // --- PROMPT AINDA MAIS REFINADO PARA RESPOSTAS CURTAS ---
            const prompt = `Como um agente de marca, analise a autenticidade da página abaixo.
            Dados:
            - URL: "${pageUrl}"
            - Conteúdo: "${pageContentSample}"

            Siga este formato de resposta OBRIGATORIAMENTE:
            **Análise de autenticidade:** A página parece [falsificada/legítima].
            * [Motivo 1 em poucas palavras]
            * [Motivo 2 em poucas palavras]
            * [Motivo 3 em poucas palavras]`;
            callGeminiApi(prompt);
        }, 2000);
    });
});