var w = 700,
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
}];
scaledHBar('scaledHBar', data, 500, 400);
scaledVBar('scaledVBar', data, 600, 400);
scaledVBar_xLine('scaledVBar2', data, 600, 400);
scaledHBar_yLine('scaledHBar2', data, 500, 400);


var body = d3.select('#d3Exmp');

var header = body.append('div').classed('header text-center', true).append('h4').text('Scaled Vertical Bar With x-line').style(
    'color', 'aliceblue'
).style('padding-top', '2%');

header.append('br');
d3
var sideBar = body.append('div').classed('sideBar', true);
var button = sideBar.append('botton')
    .classed('btn btn-primary btn-xs btn-loadBar', true)
    .text('click to load graph').style('margin', '2%');

var button = sideBar.append('botton')
    .classed('btn btn-primary btn-xs btn-bounceOut', true)
    .text('Bounce Out').style('margin', '2%');
sideBar.append('br')
var button = sideBar.append('botton')
    .classed('btn btn-primary btn-xs btn-loaddelay', true)
    .text('Load Delay').style('margin', '2%');

d3.select('.btn-loadBar')
    .on('click', function() {
        if (body.select('svg').empty())
            easeBounceOut_FullBar(body, data, w, h);
    });
d3.select('.btn-bounceOut')
    .on('click', function() {
        if (body.select('svg').empty())
            alert('Please load the graph first');
        else {
            easeBounceOut_Event();
        }
    });
d3.select('.btn-loaddelay')
    .on('click', function() {
        if (body.select('svg').empty())
            alert('Please load the graph first');
        else {
            delayDynamic(data)
        }
    });