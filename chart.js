// Dados fictícios para os gráficos
const categories = [
    'Acessibilidade',
    'Ciclismo',
    'Comércio e Fiscalização',
    'Corrupção e Má Gestão',
    'Drenagem',
    'Educação',
    'Habitação',
    'Infraestrutura',
    'Limpeza Urbana e Lixo',
    'Meio Ambiente',
    'Obras',
    'Redes Elétricas/Luz',
    'Saúde Pública',
    'Segurança',
    'Transporte',
    'Outros'
];

// Dados para o gráfico de pizza (porcentagens)
const complaintData = [
    12, 5, 7, 8, 15, 10, 9, 6, 4, 5, 8, 6, 14, 7, 5, 2
];

// Dados para o gráfico de barras (quantidades resolvidas)
const resolvedData = [
    45, 18, 25, 30, 55, 35, 32, 22, 15, 18, 28, 22, 50, 25, 20, 5
];

// Cores para as categorias (geradas automaticamente)
const backgroundColors = [];
for (let i = 0; i < categories.length; i++) {
    const hue = (i * 360 / categories.length) % 360;
    backgroundColors.push(`hsl(${hue}, 70%, 65%)`);
}

// Configuração do gráfico de pizza
const pieCtx = document.getElementById('pieChart').getContext('2d');
new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: categories,
        datasets: [{
            data: complaintData,
            backgroundColor: backgroundColors,
            borderColor: 'white',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 15,
                    font: {
                        size: 10
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const value = context.raw;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${context.label}: ${percentage}%`;
                    }
                }
            }
        }
    }
});

// Configuração do gráfico de barras
const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: categories,
        datasets: [{
            label: 'Problemas Resolvidos',
            data: resolvedData,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('65%)', '50%)')),
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Quantidade Resolvida'
                }
            },
            x: {
                ticks: {
                    maxRotation: 90,
                    minRotation: 45,
                    font: {
                        size: 10
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});