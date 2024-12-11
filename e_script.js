// Path to your CSV file
const csvPath = './CSV_Files_for_Data/final_data.csv';

// Load CSV data
d3.csv(csvPath).then(data => {
    // Populate Dropdown for Artists
    const artists = [...new Set(data.map(d => d.Artist))].sort();
    const dropdown = d3.select('#artist-dropdown');

    dropdown.selectAll('option')
        .data(artists)
        .enter()
        .append('option')
        .text(d => d)
        .attr('value', d => d);

    // Event listener for dropdown selection
    dropdown.on('change', function() {
        const selectedArtist = this.value;
        const artistData = data.filter(d => d.Artist === selectedArtist);

        // Update Album List
        const albums = artistData.map(d => d.Album);
        const outputDiv = d3.select('#artist-output');
        outputDiv.html('<h3>Albums:</h3>');
        outputDiv.selectAll('p')
            .data(albums)
            .enter()
            .append('p')
            .text(d => d);

        // Update Bar Chart
        updateChart(artistData);
    });

    // Initial Bar Chart Setup
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#bar-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxisGroup = svg.append('g')
        .attr('transform', `translate(0,${height})`);
    const yAxisGroup = svg.append('g');

    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background', '#f4f4f4')
        .style('padding', '5px')
        .style('border', '1px solid #ccc')
        .style('border-radius', '5px')
        .style('visibility', 'hidden');

    function updateChart(artistData) {
        // Aggregate data by release year
        const yearCounts = d3.rollup(
            artistData,
            v => v.length,
            d => d.Released_Year
        );

        const yearData = Array.from(yearCounts, ([year, count]) => ({
            year: +year,
            count: count
        })).sort((a, b) => a.year - b.year);

        x.domain(yearData.map(d => d.year));
        y.domain([0, d3.max(yearData, d => d.count)]).nice();

        // Update axes
        xAxisGroup.call(d3.axisBottom(x).tickFormat(d3.format('d')))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');
        yAxisGroup.call(d3.axisLeft(y));

        // Bind data to bars
        const bars = svg.selectAll('.bar')
            .data(yearData, d => d.year);

        // Enter
        bars.enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.year))
            .attr('width', x.bandwidth())
            .attr('y', height)
            .attr('height', 0)
            .attr('fill', 'steelblue')
            .on('mouseover', (event, d) => {
                tooltip.style('visibility', 'visible')
                    .text(`Year: ${d.year}, Albums: ${d.count}`);
            })
            .on('mousemove', event => {
                tooltip.style('top', `${event.pageY - 20}px`)
                    .style('left', `${event.pageX + 10}px`);
            })
            .on('mouseout', () => {
                tooltip.style('visibility', 'hidden');
            })
            .transition()
            .duration(1000)
            .attr('y', d => y(d.count))
            .attr('height', d => height - y(d.count));

        // Update
        bars.transition()
            .duration(1000)
            .attr('x', d => x(d.year))
            .attr('width', x.bandwidth())
            .attr('y', d => y(d.count))
            .attr('height', d => height - y(d.count))
            .attr('fill', 'steelblue');

        // Exit
        bars.exit().remove();
    }
});
