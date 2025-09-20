// AÇÃO CORRETIVA: Importamos a classe diretamente de um CDN compatível com módulos
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

    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-messaze', sender === 'bot' ? 'bot-message' : 'user-message');
        const p = document.createElement('p');
        p.textContent = text;
        messageDiv.appendChild(p);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    // Inicializa o SDK do Gemini
    let genAI;
    let model;
    try {
        // AÇÃO CORRETIVA: Usamos a classe 'GoogleGenerativeAI' que importamos diretamente
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

    // O restante do código permanece exatamente o mesmo
    // Botão "Verificar Empresa"
    verifyCompanyBtn.addEventListener('click', () => {
        const firstPostUsername = document.querySelector('.post .username');
        let companyName = '';

        if (firstPostUsername) {
            companyName = firstPostUsername.textContent.trim();
            addMessage(`Detectei o perfil "${companyName}". Gostaria de analisá-lo?`, 'bot');
            const prompt = `Como uma agente de marca, analise o perfil de Instagram "${companyName}". Verifique a existência de múltiplos perfis com nomes similares, procure por reclamações online sobre perfis falsos associados a este nome e analise a reputação geral para determinar o risco de ser uma página fraudulenta. Forneça uma conclusão clara.`;
            callGeminiApi(prompt);
        } else {
            companyName = prompt("Não detectei um perfil automaticamente. Qual o nome da empresa ou marca que você deseja verificar?");
            if (companyName && companyName.trim() !== '') {
                addMessage(`Ok, vou verificar a empresa: ${companyName}`, 'user');
                const prompt = `Como uma agente de marca, analise a empresa "${companyName}". Verifique a existência de múltiplos perfis, reclamações sobre perfis falsos e a reputação geral para determinar se é uma marca fraudulenta ou se existem páginas falsas se passando por ela.`;
                callGeminiApi(prompt);
            }
        }
    });

    // Botão "Verificar Página"
    verifyPageBtn.addEventListener('click', () => {
        addMessage("Ok, vou iniciar a análise desta página.", 'user');
        
        scanOverlay.style.display = 'block';
        
        setTimeout(() => {
            scanOverlay.style.display = 'none';
            addMessage("Análise visual concluída. Enviando para o assistente...", 'bot');
            const pageUrl = window.location.href;
            const pageContentSample = document.body.innerText.substring(0, 1000);
            const prompt = `Como uma agente de marca, analise a autenticidade de uma página com base nos seguintes dados.
            - URL: "${pageUrl}"
            - Amostra do conteúdo de texto: "${pageContentSample}"
            Com base nesses dados, avalie os seguintes pontos:
            1. A URL parece legítima ou suspeita?
            2. O conteúdo (nomes de usuário, legendas) parece autêntico ou gerado de forma estranha?
            3. Existem sinais de alerta comuns em páginas falsas?
            Forneça uma conclusão sobre a probabilidade de esta página ser falsa.`;
            callGeminiApi(prompt);
        }, 2000);
    });
});