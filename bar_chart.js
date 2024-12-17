document.addEventListener('DOMContentLoaded', function () {
    const csvPath = './CSV_Files_for_Data/final_data.csv';

    // Load CSV data
    d3.csv(csvPath).then(data => {
        console.log(data); // Check the loaded data

        // Group data by 'Released_Year'
        const yearCounts = d3.rollup(
            data,
            v => v.length,
            d => d.Released_Year // Replace with your actual column name for the year
        );

        const years = Array.from(yearCounts.keys());
        const counts = Array.from(yearCounts.values());

        console.log('Years:', years);
        console.log('Counts:', counts);

        // Initialize Chart.js for the second bar chart (id="bar-chart-2")
        const ctx = document.getElementById('bar-chart-2').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'Albums Released by Year',
                    data: counts,
                    backgroundColor: '#4A90E2',  
                    borderColor: '#1D60A4',      // A complementary orange color for borders
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const value = counts[tooltipItem.dataIndex];
                                return `${years[tooltipItem.dataIndex]}: ${value}`;
                            }
                        }
                    }
                }
            }
        });
    }).catch(error => {
        console.error("Error loading the CSV file:", error);
    });
});
