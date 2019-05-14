function renderSimpleVerticalBar(section, data, w, h) {
    var barPadding = 1;
    var svg = section.append('div').classed('col-md-6', true).append('svg')
        .attr('width', w)
        .attr('height', h);

    var bar = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr('x', function(d, i) {
            return i * (w / data.length); //i * 21;
        })
        .attr('y', function(d) {
            return h - (d * 4);
        })
        .attr("width", w / data.length - barPadding)
        .attr('height', function(d) {
            return d * 4;
        })
        .attr('fill', function(d) {
            return "rgb(0, 0, " + Math.round(d * 10) + ")"; //  'rgb(80, 121, 197)'
        });
    var berText = svg.selectAll('text')
        .data(data).enter().append('text').text(function(d) {
            return d;
        })
        .attr('x', function(d, i) {
            return i * (w / data.length) + (w / data.length - barPadding) / 2;
        })
        .attr('y', function(d) {
            return h - (d * 4) + 14;
        }).attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");

}

function renderScaledVerticalBar(section, data, w, h) {
    var header = section.append('div').classed('header text-center', true).append('h4').text('Scaled Vertical Bar');
    var xScale = d3.scaleBand()
        .domain(d3.range(data.length))
        .rangeRound([0, w])
        .paddingInner(0.05);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, h]);

    var svg = section.append('div').classed('col-md-6', true).append('svg')
        .attr('width', w)
        .attr('height', h);

    var bar = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr('x', function(d, i) {
            return xScale(i);
        })
        .attr('y', function(d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr('height', function(d) {
            return yScale(d);
        })
        .attr('fill', function(d) {
            return "rgb(0, 0, " + Math.round(d * 10) + ")"; //  'rgb(80, 121, 197)'
        });

    var berText = svg.selectAll('text')
        .data(data).enter().append('text').text(function(d) {
            return d;
        })
        .attr('x', function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr('y', function(d) {
            return h - yScale(d) + 14;
        }).attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");
}

function renderScaledHorizontalBar(section, data, w, h) {
    var header = section.append('div').classed('header text-center', true).append('h4').text('Scaled Vertical Bar');

    var svg = section.append('div').classed('col-md-6', true).append('svg')
        .attr('width', w)
        .attr('height', h)


    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, w])


    var yScale = d3.scaleBand()
        .domain(d3.range(data.length))
        .rangeRound([0, h])
        .paddingInner(0.1);

    var bar = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr('x', function(d) {
            return 0;
        })
        .attr('y', function(d, i) {
            return yScale(i);
        })
        .attr("width", function(d, i) {
            return xScale(d);
        })
        .attr('height', function(d, i) {
            return yScale.bandwidth();
        })
        .attr('fill', function(d) {
            return "rgb(0, 0, " + Math.round(d * 10) + ")"; //  'rgb(80, 121, 197)'
        });

    var berText = svg.selectAll('text')
        .data(data).enter().append('text').text(function(d) {
            return d;
        })
        .attr('x', function(d, i) {
            return xScale(d) - 14; // return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr('y', function(d, i) {
            return (yScale(i) + yScale.bandwidth() / 2) + 2.5; //h - yScale(d) + 14;
        }).attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");

}

function renderScaledHorizontalBarWithAxes(section, data, w, h) {
    var header = section.append('div').classed('header text-center', true).append('h4').text('Scaled Vertical Bar');

    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom,
        valueMargin = 4,
        axisMargin = 20,
        barHeight = (height - axisMargin * 2) * 0.4 / data.length;

    // set the ranges
    var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

    var x = d3.scaleLinear()
        .range([0, width]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = section.append('div').classed('col-md-6', true).append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // format the data
    data.forEach(function(d) {
        d.sales = +d.sales;
    });

    // Scale the range of the data in the domains
    x.domain([0, d3.max(data, function(d) { return d.sales; })])
    y.domain(data.map(function(d) { return d.salesperson; }));
    //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

    // append the rectangles for the bar chart
    var berText = svg.selectAll('rect')
        .data(data)
        .enter().append("rect")
        //.attr("class", "bar")
        //.attr("x", function(d) { return x(d.sales); })
        .attr("width", function(d) { return x(d.sales); })
        .attr("y", function(d) { return y(d.salesperson); })
        .attr("height", y.bandwidth())
        .attr('fill', function(d) {
            return "rgb(0, 0, " + Math.round(d.sales * 10) + ")"; //  'rgb(80, 121, 197)'
        });

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
        .attr('y', barHeight / 2)
        //.attr("dx", -valueMargin + labelWidth) //margin right
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


    /*bar.append("text")
        .attr("class", "value")
        .attr("y", barHeight / 2)
        .attr("dx", -valueMargin + labelWidth) //margin right
        .attr("dy", ".35em") //vertical align middle
        .attr("text-anchor", "end")
        .text(function(d){
            return (d.value+"%");
        })
        .attr("x", function(d){
            var width = this.getBBox().width;
            return Math.max(width + valueMargin, scale(d.value));
        }); */

}