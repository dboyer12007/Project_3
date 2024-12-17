// Path to your CSV file
const csvPath1 = './CSV_Files_for_Data/final_data.csv';

// Load CSV data
d3.csv(csvPath1).then(data => {
    // Example: Group data by 'Genre' column and calculate frequencies
    const genreCounts = d3.rollup(
        data,
        v => v.length,
        d => d.Genre // Change this key to match your CSV column name
    );

    // Prepare data for Chart.js
    const labels = Array.from(genreCounts.keys());
    const values = Array.from(genreCounts.values());
    const colors = labels.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`); // Generate random colors

    // Chart.js configuration
    const ctx = document.getElementById('pie-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Albums Distribution',
                data: values,
                backgroundColor: colors,
                borderColor: '#FFFFFF',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const value = values[tooltipItem.dataIndex];
                            return `${labels[tooltipItem.dataIndex]}: ${value}`;
                        }
                    }
                }
            }
        }
    });
}).catch(error => {
    console.error("Error loading the CSV file:", error);
});
