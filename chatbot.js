// Usamos a importação simples via CDN.
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA PARA O ALERTA PROATIVO (NOTIFICAÇÃO DE CANTO) ---
    const fakeUrlDatabase = [
        "http://127.0.0.1:5500/monksfake/monksfake.html",
        "https://www.facebok.com/monksinbrazil.store/",
        "http://monks-vagas.xyz/oportunidade-imperdivel",
        "http://127.0.0.1:5500/netflix/netflix-promo.html",
        "http://127.0.0.1:5501/influencerfake/influencerfake.html"
    ];

    const alertOverlay = document.getElementById('phishing-alert-overlay');
    const alertMessage = document.getElementById('phishing-alert-message');
    const alertCloseBtn = document.getElementById('phishing-alert-close-btn');
    let alertTimeout;

    const checkCurrentPage = () => {
        const currentPageUrl = window.location.href;
        const pathname = window.location.pathname;
        
        // Debug - pode ser removido depois
        console.log('Checking page:', currentPageUrl);
        console.log('Pathname:', pathname);
        
        // Verificação genérica que funciona tanto local quanto online
        const isInfluencerFakePage = currentPageUrl.includes('influencerfake/influencerfake.html') || 
                                   currentPageUrl.includes('influencerfake.html') ||
                                   pathname.includes('influencerfake/influencerfake.html') ||
                                   pathname.endsWith('influencerfake.html');
        const isNetflixPromoPage = currentPageUrl.includes('netflix/netflix-promo.html') ||
                                   currentPageUrl.includes('netflix-promo.html') ||
                                   pathname.includes('netflix/netflix-promo.html') ||
                                   pathname.endsWith('netflix-promo.html');
        const isMonksFakePage = currentPageUrl.includes('monksfake/monksfake.html') ||
                               currentPageUrl.includes('monksfake.html') ||
                               pathname.includes('monksfake/monksfake.html') ||
                               pathname.endsWith('monksfake.html');
        
        const shouldShowAlert = fakeUrlDatabase.includes(currentPageUrl) || 
                               isInfluencerFakePage || 
                               isNetflixPromoPage || 
                               isMonksFakePage;
        
        console.log('Should show alert:', shouldShowAlert, 'isInfluencerFakePage:', isInfluencerFakePage);
        
        if (shouldShowAlert && alertOverlay) {
            console.log('Showing alert for influencer fake page');
            // Personalizar mensagem baseada na página
            if (isNetflixPromoPage) {
                alertMessage.textContent = 'ALERTA: Página suspeita da Netflix detectada. Promoções não oficiais podem ser golpes.';
            } else if (isInfluencerFakePage) {
                alertMessage.textContent = 'ALERTA: Perfil suspeito detectado. Este perfil pode estar imitando uma marca oficial.';
            } else {
                alertMessage.textContent = 'Esse link foi constatado como suspeito na nossa base de dados.';
            }
            alertOverlay.classList.remove('phishing-alert-hidden');
            clearTimeout(alertTimeout); 
            alertTimeout = setTimeout(() => {
                alertOverlay.classList.add('phishing-alert-hidden');
            }, 7000);
        } else if (!alertOverlay) {
            console.log('Alert overlay element not found!');
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

    const GEMINI_API_KEY = 'AIzaSyAZm-0yuTedNhGBIa4RfnytvtIjwcRiKt0';

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

            // PRIORIDADE 1: DETECTAR INDEX.HTML PRIMEIRO (antes das outras condições)
            if (pageUrl.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '/index.html' || pageUrl.endsWith('/') || (!pageUrl.includes('monksfake') && !pageUrl.includes('netflix') && !pageUrl.includes('influencerfake') && pageUrl.includes('raiaHackathon'))) {
                // CASO ESPECÍFICO PARA INDEX.HTML - Análise do post da Leroy Merlin
                prompt = `Sua tarefa é atuar como um especialista em detecção de desinformação, analisando um POST ESPECÍFICO sobre "Leroy Merlin fecha 11 lojas".
                **CONTEXTO DO POST ANALISADO:**
                - Perfil: "leroimerlim" (suspeito)
                - Conteúdo: "Leroy Merlin fecha 11 lojas"
                - Plataforma: Rede social simulando Instagram
                
                **Informação-Chave (A Verdade):** A Leroy Merlin oficial usa o nome correto "leroymerlin" em suas redes sociais e possui identidade visual padronizada. Notícias corporativas importantes são sempre divulgadas por canais oficiais de comunicação.
                
                **Sua Análise Deve Focar EXCLUSIVAMENTE neste post, NÃO na página web:**
                1.  **IDENTIDADE VISUAL:** Compare elementos visuais com a identidade oficial da Leroy Merlin.
                2.  **VERIFICAÇÃO DO PERFIL:** O nome "leroimerlim" é uma alteração fraudulenta do oficial "leroymerlin".
                3.  **FONTES CONFIÁVEIS:** Esta informação NÃO foi corroborada por canais oficiais.
                4.  **ANÁLISE DE CONTEÚDO:** Conteúdo suspeito de desinformação corporativa.
                
                Formato de Resposta (OBRIGATÓRIO E SUCINTO):
                **Análise:** Post Fraudulento - Desinformação Leroy Merlin.
                **Evidências:** 
                * Nome do perfil alterado de "leroymerlin" para "leroimerlim" (técnica de typosquatting)
                * Identidade visual inconsistente com padrões oficiais da marca Leroy Merlin
                * Ausência de confirmação por canais confiáveis de comunicação ou mídia oficial
                * Conteúdo não encontrado em comunicados oficiais da empresa`;
            } else if (pageUrl.includes('monks') || pageHtmlSnippet.toLowerCase().includes('monks')) {
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
            } else if (pageUrl.includes('netflix') || pageHtmlSnippet.toLowerCase().includes('netflix')) {
                prompt = `Sua tarefa é atuar como um especialista em verificação de marcas, analisando a LEGITIMIDADE EMPRESARIAL desta página Netflix.
                **Informação-Chave (A Verdade):** A Netflix oficial é "Netflix Brasil" com domínio "netflix.com". A empresa nunca oferece brindes físicos em promoções online.
                **Regras da Análise EMPRESARIAL:**
                1.  **FOCO NO CONTEÚDO, NÃO NA ORIGEM:** Ignore a URL da página se ela for local ('127.0.0.1', 'localhost'). Sua análise deve se basear no conteúdo da página (HTML), não no endereço de teste.
                2.  **VERIFICAÇÃO DE MARCA:** Compare as práticas comerciais mostradas com as oficiais da Netflix.
                3.  **OFERTAS SUSPEITAS:** A Netflix oficial nunca oferece brindes físicos, descontos extremos ou promoções que exigem dados pessoais imediatos.
                4.  **EVIDÊNCIA OBRIGATÓRIA:** SEMPRE inclua como evidência que "O link não é o domínio oficial netflix.com da Netflix"
                Dados da Página: URL: "${pageUrl}", HTML: "${pageHtmlSnippet}"
                Formato de Resposta (OBRIGATÓRIO E SUCINTO):
                **Análise:** Empresa/Marca Falsa Netflix.
                **Evidências:** 
                * O link não é o domínio oficial netflix.com da Netflix
                * [Evidência 2 - ex: Oferece brindes físicos que a Netflix real nunca dá] 
                * [Evidência 3 - ex: Práticas comerciais não oficiais da Netflix]`;
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

                // PRIORIDADE 1: DETECTAR INDEX.HTML PRIMEIRO (antes das outras condições)
                if (pageUrl.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '/index.html' || pageUrl.endsWith('/') || (!pageUrl.includes('monksfake') && !pageUrl.includes('netflix') && !pageUrl.includes('influencerfake') && pageUrl.includes('raiaHackathon'))) {
                    // CASO ESPECÍFICO PARA INDEX.HTML - Análise técnica visual do post
                    prompt = `Sua tarefa é atuar como um analista forense digital, fazendo uma ANÁLISE TÉCNICA VISUAL do post sobre "Leroy Merlin fecha 11 lojas".
                    **CONTEXTO DO POST ANALISADO:**
                    - Perfil: "leroimerlim" (técnica de typosquatting)
                    - Conteúdo: "Leroy Merlin fecha 11 lojas"
                    - Plataforma: Rede social simulando Instagram
                    
                    **Informação-Chave (A Verdade):** A Leroy Merlin oficial tem padrões visuais específicos, usa domínios oficiais e o nome correto "leroymerlin" em todas as plataformas.
                    
                    **Sua Análise Deve Focar EXCLUSIVAMENTE neste post específico, NÃO na página web:**
                    1.  **ANÁLISE DE METADADOS:** Examine informações técnicas do perfil fraudulento.
                    2.  **PADRÕES VISUAIS:** Compare elementos gráficos com padrões oficiais da Leroy Merlin.
                    3.  **VERIFICAÇÃO TÉCNICA:** Analise a alteração no nome do usuário.
                    4.  **DETECÇÃO DE MANIPULAÇÃO:** Identifique a técnica de typosquatting utilizada.
                    
                    Formato de Resposta (OBRIGATÓRIO E SUCINTO):
                    **Análise:** Perfil Técnicamente Fraudulento - Leroy Merlin Falso.
                    **Evidências:** 
                    * Alteração detectada no username: "leroimerlim" ao invés de "leroymerlin" oficial
                    * Elementos visuais inconsistentes com identidade corporativa oficial
                    * Estrutura técnica do perfil não corresponde aos padrões oficiais da marca`;
                } else if (pageUrl.includes('monks') || pageHtmlSnippet.toLowerCase().includes('monks')) {
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
                } else if (pageUrl.includes('netflix') || pageHtmlSnippet.toLowerCase().includes('netflix')) {
                    // MODO NETFLIX - análise técnica da página
                    prompt = `Sua tarefa é atuar como um analista de segurança web, fazendo uma ANÁLISE TÉCNICA VISUAL desta página que imita a Netflix.
                    **Informação-Chave (A Verdade):** A Netflix oficial é "netflix.com" com design, UX e elementos técnicos específicos e padronizados.
                    **Regras da Análise TÉCNICA:**
                    1.  **FOCO NO CONTEÚDO, NÃO NA ORIGEM:** Ignore a URL da página se ela for local ('127.0.0.1', 'localhost'). Sua análise deve se basear no conteúdo da página (HTML), não no endereço de teste.
                    2.  **ANÁLISE DE DESIGN:** Compare elementos visuais, layout, tipografia e estrutura com a Netflix oficial.
                    3.  **ELEMENTOS TÉCNICOS:** Verifique formulários, campos de entrada, botões e fluxos de pagamento suspeitos.
                    4.  **INDICADORES VISUAIS:** Procure por erros de design, qualidade de imagens, inconsistências visuais.
                    5.  **EVIDÊNCIA OBRIGATÓRIA:** SEMPRE inclua como evidência que "O link não é o domínio oficial netflix.com da Netflix"
                    Dados da Página: URL: "${pageUrl}", HTML: "${pageHtmlSnippet}"
                    Formato de Resposta (OBRIGATÓRIO E SUCINTO):
                    **Análise:** Página Técnicamente Falsa - Imitação Netflix.
                    **Evidências:** 
                    * O link não é o domínio oficial netflix.com da Netflix
                    * [Evidência 2 - ex: Design inconsistente com padrões Netflix, maximo 20 palavras] 
                    * [Evidência 3 - ex: Formulários de pagamento suspeitos não oficiais, maximo 20 palavras]`;
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