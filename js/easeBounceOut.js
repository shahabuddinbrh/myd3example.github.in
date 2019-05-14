/*var w = 600,
    h = 400;
var data = [{
    "salesperson": "Bob",
    "sales": 33
}, {
    "salesperson": "Robin",
    "sales": 12
}, {
    "salesperson": "Anne",
    "sales": 41
}, {
    "salesperson": "Mark",
    "sales": 16
}, {
    "salesperson": "Joe",
    "sales": 59
}, {
    "salesperson": "Eve",
    "sales": 38
}, {
    "salesperson": "Karen",
    "sales": 21
}, {
    "salesperson": "Kirsty",
    "sales": 25
}, {
    "salesperson": "Chris",
    "sales": 30
}, {
    "salesperson": "Lisa",
    "sales": 47
}, {
    "salesperson": "Tom",
    "sales": 5
}, {
    "salesperson": "Stacy",
    "sales": 20
}, {
    "salesperson": "Charles",
    "sales": 13
}, {
    "salesperson": "Mary",
    "sales": 29
}];*/
var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
}
var x, y, width, height, valueMargin = 10;
//var body = d3.select('#d3Exmp');

function easeBounceOut_FullBar(body, data, w, h) {
    // set the dimensions and margins of the graph
    width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom,

        // set the ranges
        x = d3.scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.salesperson))
        .padding(0.2)

    y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, function(d) {
            return d.sales;
        })]);

    var svg = body.append('svg').attr('id', 'd3svgExmp')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // gridlines in y axis function
    function make_y_gridlines() { return d3.axisLeft(y) }
    // gridlines in x axis function
    //function make_x_gridlines() {return d3.axisBottom(x)}

    // add the X gridlines
    //svg.append("g").attr("class", "grid") .call(make_x_gridlines().tickSize(height).tickFormat(""))

    // add the Y gridlines
    svg.append("g").attr("class", "grid").call(make_y_gridlines().tickSize(-width).tickFormat(""));

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
    // append the rectangles for the bar chart
    var chart = svg.selectAll('rect')
        .data(data)
        .enter().append("rect")
        .transition()
        .duration(2000)
        .ease(d3.easeBounceOut)
        .attr('x', (d) => x(d.salesperson))
        .attr('y', (d) => y(d.sales))
        .attr('height', (d) => height - y(d.sales))
        .attr('width', x.bandwidth())
        .attr('fill', function(d) {
            return "rgb(0, 0, " + Math.round(d.sales * 10) + ")"; //  'rgb(80, 121, 197)'
        });


    var barText = svg.append('g').attr('id', 'textLables').selectAll('text')
        .data(data)
        .enter()
        .append('text').transition()
        .duration(2000)
        .ease(d3.easeBounceOut)
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

function easeBounceOut_Event() {
    //New values for dataset
    var data = [{
        "salesperson": "Bob",
        "sales": 29
    }, {
        "salesperson": "Robin",
        "sales": 13
    }, {
        "salesperson": "Anne",
        "sales": 20
    }, {
        "salesperson": "Mark",
        "sales": 15
    }, {
        "salesperson": "Joe",
        "sales": 47
    }, {
        "salesperson": "Eve",
        "sales": 30
    }, {
        "salesperson": "Karen",
        "sales": 25
    }, {
        "salesperson": "Kirsty",
        "sales": 21
    }, {
        "salesperson": "Chris",
        "sales": 38
    }, {
        "salesperson": "Lisa",
        "sales": 59
    }, {
        "salesperson": "Tom",
        "sales": 16
    }, {
        "salesperson": "Stacy",
        "sales": 41
    }, {
        "salesperson": "Charles",
        "sales": 12
    }, {
        "salesperson": "Mary",
        "sales": 33
    }];

    var svg = d3.select('#d3svgExmp');
    //Update all rects
    svg.selectAll("rect")
        .data(data)
        .transition()
        .duration(2000)
        .ease(d3.easeBounceOut)
        .attr('x', (d) => x(d.salesperson))
        .attr('y', (d) => y(d.sales))
        .attr('height', (d) => height - y(d.sales))
        .attr('width', x.bandwidth())
        .attr('fill', function(d) {
            return "rgb(0, 0, " + Math.round(d.sales * 10) + ")"; //  'rgb(80, 121, 197)'
        });


    //Update all labels
    var text = svg.select('#textLables');
    text.selectAll("text")
        .data(data)
        .transition()
        .duration(2000)
        .ease(d3.easeBounceOut)
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

function delayDynamic(data) {
    var svg = d3.select('#d3svgExmp');

    //Update all rects
    svg.selectAll("rect")
        .data(data)
        .transition()
        .delay(function(d, i) {
            return i * 100; // One-tenth of an additional second delay for each subsequent element 
        })
        .duration(500)
        .attr('x', (d) => x(d.salesperson))
        .attr('y', (d) => y(d.sales))
        .attr('height', (d) => height - y(d.sales))
        .attr('width', x.bandwidth())
        .attr('fill', function(d) {
            return "rgb(0, 0, " + Math.round(d.sales * 10) + ")"; //  'rgb(80, 121, 197)'
        });

    var text = svg.select('#textLables');
    text.selectAll("text")
        .data(data)
        .transition()
        .delay(function(d, i) {
            return i * 100;
        })
        .duration(500)
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