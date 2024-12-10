// Path to your CSV file
const csvPath = './CSV_Files_for_Data/final_data.csv';

// Load CSV data
d3.csv(csvPath).then(data => {
    // Populate Dropdown for Artists
    const artists = [...new Set(data.map(d => d.Artist))].sort(); // Unique sorted artists
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
        const albums = data
            .filter(d => d.Artist === selectedArtist)
            .map(d => d.Album);

        // Display Albums for Selected Artist
        const outputDiv = d3.select('#artist-output');
        outputDiv.html('<h3>Albums:</h3>');
        outputDiv.selectAll('p')
            .data(albums)
            .enter()
            .append('p')
            .text(d => d);
    });

    // Create Bar Chart for Released Years
    const yearCounts = d3.rollup(
        data,
        v => v.length,
        d => d.Released_Year
    );

    const yearData = Array.from(yearCounts, ([year, count]) => ({
        year: +year,
        count: count
    })).sort((a, b) => a.year - b.year);

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#bar-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(yearData.map(d => d.year))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(yearData, d => d.count)])
        .nice()
        .range([height, 0]);

    svg.append('g')
        .selectAll('rect')
        .data(yearData)
        .enter()
        .append('rect')
        .attr('x', d => x(d.year))
        .attr('y', d => y(d.count))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.count))
        .attr('fill', 'steelblue');

    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format('d')))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

    svg.append('g').call(d3.axisLeft(y));

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom)
        .attr('text-anchor', 'middle')
        .text('Year');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -margin.left + 10)
        .attr('text-anchor', 'middle')
        .text('Number of Albums Released');
});
