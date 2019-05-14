function scaledHBar(d3body, data, w, h, isAnimated, aminationType) {
    //if(isAnimated)
    var body = d3.select('#' + d3body + '');
    var header = body.append('div').classed('header text-center', true).append('h4').text('Simple Scaled Horizontal Bar');
    // set the dimensions and margins of the graph
    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom,
        valueMargin = 10;

    // set the domain / ranges
    var y = d3.scaleBand()
        .domain(data.map(function(d) {
            return d.salesperson;
        }))
        .range([height, 0])
        .padding(0.1)

    var x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
            return d.sales;
        })])
        .range([0, width]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = body.append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // append the rectangles for the bar chart
    var chart = svg.selectAll('rect')
        .data(data)
        .enter().append("rect")
        //.attr("x", function(d) { return x(d.sales); })
        .attr("width", function(d) {
            return x(d.sales);
        })
        .attr("y", function(d) {
            return y(d.salesperson);
        })
        .attr("height", y.bandwidth())
        .attr('fill', function(d) {
            return "rgb(0, 0, " + Math.round(d.sales * 10) + ")"; //  'rgb(80, 121, 197)'
        })


    var berText = svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(function(d) {
            return (d.sales);
        })
        .attr('x', function(d) {
            var width = this.getBBox().width;
            return Math.max(width + valueMargin, x(d.sales));
        })
        .attr('y', function(d, i) {
            return (y(d.salesperson) + y.bandwidth() / 2);
        })
        .attr("dx", -valueMargin) //margin right
        .attr("dy", ".35em") //vertical align middle
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

}

function scaledHBar_yLine(d3body, data, w, h) {
    var body = d3.select('#' + d3body + '');
    var header = body.append('div').classed('header text-center', true).append('h4').text('Scaled Horizontal Bar with y-line');
    // set the dimensions and margins of the graph
    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom,
        valueMargin = 10;

    // set the domain / ranges
    var y = d3.scaleBand()
        .domain(data.map(function(d) {
            return d.salesperson;
        }))
        .range([height, 0])
        .padding(0.1)

    var x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
            return d.sales;
        })])
        .range([0, width]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = body.append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // gridlines in y axis function
    //function make_y_gridlines() { return d3.axisLeft(y)}


    // add the Y gridlines
    //svg.append("g").attr("class", "grid").call(make_y_gridlines().tickSize(-width).tickFormat(""));


    // gridlines in x axis function
    function make_x_gridlines() { return d3.axisBottom(x) }

    // add the X gridlines
    svg.append("g").attr("class", "grid").call(make_x_gridlines().tickSize(height).tickFormat(""))

    // append the rectangles for the bar chart
    var chart = svg.selectAll('rect')
        .data(data)
        .enter().append("rect")
        //.attr("x", function(d) { return x(d.sales); })
        .attr("width", function(d) {
            return x(d.sales);
        })
        .attr("y", function(d) {
            return y(d.salesperson);
        })
        .attr("height", y.bandwidth())
        .attr('fill', function(d) {
            return "rgb(0, 0, " + Math.round(d.sales * 10) + ")"; //  'rgb(80, 121, 197)'
        })


    var berText = svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(function(d) {
            return (d.sales);
        })
        .attr('x', function(d) {
            var width = this.getBBox().width;
            return Math.max(width + valueMargin, x(d.sales));
        })
        .attr('y', function(d, i) {
            return (y(d.salesperson) + y.bandwidth() / 2);
        })
        .attr("dx", -valueMargin) //margin right
        .attr("dy", ".35em") //vertical align middle
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

}

function scaledVBar(d3body, data, w, h) {
    var body = d3.select('#' + d3body + '');

    var header = body.append('div').classed('header text-center', true).append('h4').text(' Simple Scaled Vertical Bar');

    // set the dimensions and margins of the graph
    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom,
        valueMargin = 10;

    // set the ranges
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.salesperson))
        .padding(0.2)

    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, function(d) {
            return d.sales;
        })]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = body.append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // append the rectangles for the bar chart
    var chart = svg.selectAll('rect')
        .data(data)
        .enter().append("rect")
        .attr('x', (d) => x(d.salesperson))
        .attr('y', (d) => y(d.sales))
        .attr('height', (d) => height - y(d.sales))
        .attr('width', x.bandwidth())
        .attr('fill', function(d) {
            return "rgb(0, 0, " + Math.round(d.sales * 10) + ")"; //  'rgb(80, 121, 197)'
        });

    var barText = svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(function(d) {
            return (d.sales);
        })
        .attr('x', (d) => x(d.salesperson) + x.bandwidth() / 2)
        .attr('y', (d) => y(d.sales) + 15)
        .attr("dy", ".35em") //vertical align middle
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

}

function scaledVBar_xLine(d3body, data, w, h) {
    var body = d3.select('#' + d3body + '');

    var header = body.append('div').classed('header text-center', true).append('h4').text('Scaled Vertical Bar With x-line');

    // set the dimensions and margins of the graph
    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom,
        valueMargin = 10;

    // set the ranges
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.salesperson))
        .padding(0.2)

    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, function(d) {
            return d.sales;
        })]);

    var svg = body.append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // gridlines in y axis function
    function make_y_gridlines() { return d3.axisLeft(y) }

    // gridlines in x axis function
    //function make_x_gridlines() {return d3.axisBottom(x)}

    // add the Y gridlines
    svg.append("g").attr("class", "grid").call(make_y_gridlines().tickSize(-width).tickFormat(""));

    // add the X gridlines
    //svg.append("g").attr("class", "grid") .call(make_x_gridlines().tickSize(height).tickFormat(""))

    // append the rectangles for the bar chart
    var chart = svg.selectAll('rect')
        .data(data)
        .enter().append("rect")
        .attr('x', (d) => x(d.salesperson))
        .attr('y', (d) => y(d.sales))
        .attr('height', (d) => height - y(d.sales))
        .attr('width', x.bandwidth())
        .attr('fill', function(d) {
            return "rgb(0, 0, " + Math.round(d.sales * 10) + ")"; //  'rgb(80, 121, 197)'
        });

    var barText = svg.append('g').selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(function(d) {
            return (d.sales);
        })
        .attr('x', (d) => x(d.salesperson) + x.bandwidth() / 2)
        .attr('y', (d) => y(d.sales) + 15)
        .attr("dy", ".35em") //vertical align middle
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");

}