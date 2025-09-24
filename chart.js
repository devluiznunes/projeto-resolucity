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

// Função para detectar tamanho de tela
function isMobileScreen() {
    return window.innerWidth <= 768;
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
                position: isMobileScreen() ? 'bottom' : 'right',
                labels: {
                    boxWidth: 12,
                    font: {
                        size: isMobileScreen() ? 9 : 10
                    },
                    padding: 15,
                    generateLabels: function(chart) {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map((label, i) => {
                                // Truncar labels longos apenas em mobile
                                let displayLabel = label;
                                if (isMobileScreen() && label.length > 15) {
                                    displayLabel = label.substring(0, 15) + '...';
                                }
                                
                                return {
                                    text: displayLabel,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    strokeStyle: data.datasets[0].borderColor,
                                    lineWidth: data.datasets[0].borderWidth,
                                    hidden: isNaN(data.datasets[0].data[i]) || chart.getDatasetMeta(0).data[i].hidden,
                                    index: i
                                };
                            });
                        }
                        return [];
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

// Preparar labels para display no gráfico de barras
const barLabels = categories.map(label => {
    // Aplicar a mesma lógica de truncamento do gráfico de pizza
    if (isMobileScreen() && label.length > 15) {
        return label.substring(0, 15) + '...';
    }
    return label;
});

new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: barLabels, // Usar labels formatadas
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
                },
                ticks: {
                    font: {
                        size: isMobileScreen() ? 10 : 12
                    }
                }
            },
            x: {
                ticks: {
                    maxRotation: isMobileScreen() ? 45 : 90,
                    minRotation: isMobileScreen() ? 0 : 45,
                    font: {
                        size: isMobileScreen() ? 9 : 10
                    }
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        // Mostrar o nome completo da categoria no tooltip
                        return categories[context[0].dataIndex];
                    },
                    label: function(context) {
                        return `Resolvidos: ${context.parsed.y}`;
                    }
                }
            }
        },
        layout: {
            padding: {
                left: isMobileScreen() ? 5 : 10,
                right: isMobileScreen() ? 5 : 10,
                top: isMobileScreen() ? 5 : 10,
                bottom: isMobileScreen() ? 20 : 10
            }
        }
    }
});

// Redesenhar gráficos quando a janela for redimensionada
window.addEventListener('resize', function() {
    // Os gráficos do Chart.js são automaticamente responsivos
    // Mas precisamos recriar os gráficos para atualizar as labels
    location.reload(); // Recarregar a página para simplificar
});

// Menu mobile toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }
});