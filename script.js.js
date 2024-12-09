// Set file path (adjust to your environment if necessary)
const csvPath = "CSV Files For Data/final_data.csv";

// Function to load data and initialize visualization
d3.csv(csvPath).then(data => {
    // Populate dropdown menu
    const artists = Array.from(new Set(data.map(d => d.Artist)));
    const dropdown = d3.select("#artist-dropdown");
    dropdown
        .selectAll("option")
        .data(artists)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d);

    // Render the initial bar chart
    renderBarChart(data);

    // Update bar chart on dropdown change
    dropdown.on("change", function () {
        const selectedArtist = this.value;
        const filteredData = data.filter(d => d.Artist === selectedArtist);
        renderBarChart(filteredData);
    });
});

// Function to render the bar chart
function renderBarChart(data) {
    const svgWidth = 800;
    const svgHeight = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Clear previous chart
    d3.select("#bar-chart").selectAll("*").remove();

    // Create SVG container
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    const chart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Prepare data
    const years = d3.rollup(
        data,
        v => v.length,
        d => d.Released_Year
    );

    const yearData = Array.from(years, ([key, value]) => ({ year: key, count: value }));

    // Set scales
    const x = d3.scaleBand()
        .domain(yearData.map(d => d.year))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(yearData, d => d.count)])
        .nice()
        .range([height, 0]);

    // Add axes
    chart.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => d))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    chart.append("g")
        .call(d3.axisLeft(y));

    // Add bars
    chart.selectAll(".bar")
        .data(yearData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.year))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.count));
}
