var Chart = (() => {

    const xEncoding = "Horsepower",
        yEncoding = "Miles_per_Gallon",
        colorEncoding = "Origin";

    let svg = {
            width: 1000,
            height: 750,
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            },
            barHeight: 25
        },
        data,
        xScale, yScale, colorScale,
        xAxis, yAxis;

    function init(data) {
        // ...
    }

    function loadData() {
       return d3.json("data/cars.json");
    }

    function formatData(data) {
        // ...
        return data;
    }

    function scaleData(data, svg) {

        xScale = d3.scaleLinear()
            .domain([0, d3.max(data.map(d => d[xEncoding]))])
            .range([svg.margin.left, svg.width - svg.margin.right]);

        yScale = d3.scaleLinear()
            .domain([0, d3.max(data.map(d => d[yEncoding]))])
            .range([svg.height - svg.margin.bottom, svg.margin.top]);

        colorScale = d3.scaleOrdinal(d3.schemeCategory10)
            .domain(["USA", "Japan", "Europe"]);
    }

    function axisData(data, svg) {

        xAxis = d3.axisBottom(xScale);

        yAxis = d3.axisLeft(yScale);

    }

    function plotData(data, svg) {

        const chart = d3.select("#chart")
            .append("svg")
            .attr("width", svg.width)
            .attr("height", svg.height);

            chart.append("g")
                .attr("class", "viz")

                .append("g")
                .attr("class", "marks")

                .selectAll("circle.point")
                .data(data)
                .join("circle")
                .attr("class", "point")
                .attr("fill", d => colorScale(d[colorEncoding]))
                .attr("fill-opacity", 0.73)
                .attr("r", 5)
                .attr("cx", d => xScale(d[xEncoding]))
                .attr("cy", d => yScale(d[yEncoding]));

            chart.select("g.viz")
                .append("g")
                .attr("class", "axis x");

            chart.select("g.viz")
                .append("g")
                .attr("class", "axis y");

            d3.select("g.axis.x")
                .call(xAxis)
                .attr("transform", `translate(0, ${svg.height - svg.margin.top})`);

                d3.select("g.axis.y")
                .call(yAxis)
                .attr("transform", `translate(${svg.margin.left}, 0)`);

    }

    return {
        data,
        svg,
        init,
        loadData,
        formatData,
        scaleData,
        axisData,
        plotData
    }

})();


(async () => {

    Chart.data = await Chart.loadData(); // load raw dataset
    Chart.data = Chart.formatData(Chart.data); // format dataset
    Chart.init(Chart.data); // initiate chart options based on data
    Chart.scaleData(Chart.data, Chart.svg); // setting domain and range
    Chart.axisData(Chart.data, Chart.svg); // setting axis X and Y
    Chart.plotData(Chart.data, Chart.svg); // draw the chart

})();



