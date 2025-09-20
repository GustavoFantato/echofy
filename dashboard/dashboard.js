document.addEventListener('DOMContentLoaded', () => {
    // Pega o contexto do canvas onde o gráfico será desenhado
    const ctx = document.getElementById('origemFalsidadeChart').getContext('2d');

    // Dados para o gráfico (com porcentagens aleatórias como solicitado)
    const dadosDoGrafico = {
        labels: [
            'Perfis de Instagram',
            'Páginas de Contratação Falsas',
            'Páginas Principais (Sites)'
        ],
        datasets: [{
            label: 'Origem das Verificações (%)',
            data: [55, 25, 20], // Porcentagens que somam 100
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)', // Rosa/Vermelho
                'rgba(54, 162, 235, 0.8)', // Azul
                'rgba(255, 206, 86, 0.8)',  // Amarelo
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
            hoverOffset: 4
        }]
    };

    // Configurações do gráfico
    const config = {
        type: 'pie', // Tipo do gráfico
        data: dadosDoGrafico,
        options: {
            responsive: true,
            // --- LINHA ADICIONADA ---
            // Permite que o gráfico preencha o container sem manter a proporção original
            maintainAspectRatio: false, 
            plugins: {
                legend: {
                    position: 'top', // Posição da legenda
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed + '%';
                            }
                            return label;
                        }
                    }
                }
            }
        },
    };

    // Cria a instância do gráfico
    const meuGraficoDePizza = new Chart(ctx, config);
});