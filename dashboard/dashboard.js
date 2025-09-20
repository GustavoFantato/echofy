document.addEventListener('DOMContentLoaded', () => {
    
    // ===== CÓDIGO DO GRÁFICO =====
    try {
        const ctx = document.getElementById('origemFalsidadeChart').getContext('2d');
        const dadosDoGrafico = {
            labels: ['Perfis de Instagram', 'Páginas de Contratação Falsas', 'Páginas Principais (Sites)'],
            datasets: [{
                label: 'Origem das Verificações (%)',
                data: [55, 25, 20],
                backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
                hoverOffset: 4
            }]
        };
        const config = {
            type: 'pie',
            data: dadosDoGrafico,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { callbacks: { label: (c) => `${c.label}: ${c.parsed}%` } }
                }
            },
        };
        new Chart(ctx, config);
    } catch(e) {
        console.error("Erro ao renderizar o gráfico:", e);
        const chartContainer = document.querySelector('.chart-container');
        if(chartContainer) chartContainer.innerHTML = "<p>Erro ao carregar o gráfico.</p>";
    }

    // ===== CÓDIGO DO CHATBOT DO DASHBOARD COM IA =====
    
    // --- 1. INICIALIZAÇÃO DA IA ---
    const GEMINI_API_KEY = 'SUA_CHAVE_API_GEMINI_AQUI';
    let genAI;
    let model;
    try {
        genAI = new google.generativeai.GoogleGenerativeAI(GEMINI_API_KEY);
        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    } catch (error) {
        console.error("Erro ao inicializar o SDK do Gemini:", error);
    }
    
    // --- 2. SELETORES E FUNÇÕES DO CHATBOT ---
    const chatbotFab = document.querySelector('.dashboard-chatbot-fab');
    const chatbotPopup = document.querySelector('.dashboard-chatbot-popup');
    const closeBtn = document.querySelector('.chatbot-close-btn');
    const summarizeBtn = document.getElementById('summarize-data-btn');
    const chatBody = document.getElementById('dashboard-chat-body');

    const showChatbot = () => chatbotPopup.classList.remove('hidden');
    const hideChatbot = () => chatbotPopup.classList.add('hidden');

    chatbotFab.addEventListener('click', showChatbot);
    closeBtn.addEventListener('click', hideChatbot);
    
    const formatResponseToHtml = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    };

    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender === 'user' ? 'user-message' : 'bot-message');
        const p = document.createElement('p');
        p.innerHTML = (sender === 'bot') ? formatResponseToHtml(text) : text;
        messageDiv.appendChild(p);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    // --- 3. LÓGICA DE CHAMADA DA API ---
    const callGeminiApi = async (prompt) => {
        if (!model) {
             addMessage("ERRO: O modelo de IA não foi inicializado. Verifique a chave de API.", 'bot');
             return;
        }
        addMessage("Analisando os dados...", 'bot');
        try {
            const result = await model.generateContent(prompt);
            const text = result.response.text();
            addMessage(text, 'bot');
        } catch (error) {
            console.error("Erro ao chamar a API:", error);
            addMessage("Desculpe, ocorreu um erro ao tentar gerar o resumo.", 'bot');
        }
    };

    // --- 4. FUNÇÃO PRINCIPAL QUE USA A IA ---
    const generateAISummary = () => {
        const downloads = document.getElementById('downloads-metric').textContent;
        const usage = document.getElementById('usage-metric').textContent;
        const fakes = document.getElementById('fakes-metric').textContent;
        const chartInfo = dadosDoGrafico.labels.map((label, index) => 
            `- ${label}: ${dadosDoGrafico.datasets[0].data[index]}%`
        ).join('\n');
        const fakeLinksCount = document.querySelectorAll('.fake-links-list li').length;

        const prompt = `
            Você é um analista de dados especialista em cibersegurança. Abaixo estão os dados brutos de um dashboard que monitora uma extensão de detecção de phishing.

            **Dados Brutos:**
            - Downloads Totais da Extensão: ${downloads}
            - Taxa de Uso Ativo dos Usuários: ${usage}
            - Percentual de Páginas Falsas Encontradas: ${fakes}
            - Detalhamento da Origem das Ameaças:
            ${chartInfo}
            - Total de Links Falsos Monitorados: ${fakeLinksCount}

            **Sua Tarefa:**
            Analise estes dados e escreva um resumo conciso e perspicaz em português, como se estivesse apresentando os destaques para um gerente. Não apenas liste os números. **Interprete-os**, aponte o insight mais importante (como a principal fonte de ameaças) e termine com uma breve conclusão ou recomendação. Use negrito para destacar os pontos-chave.
        `;

        callGeminiApi(prompt);
    };

    summarizeBtn.addEventListener('click', () => {
        addMessage("Resumir Dados do Dashboard", 'user');
        generateAISummary();
    });
});