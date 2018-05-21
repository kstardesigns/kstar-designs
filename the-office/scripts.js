//start of bar graph

// var props1 = {
//   "chart":{"label":{"x":"season","y":"count"}},
//   "svg":{
//     "width": 800,"height":560,
//            "styles":{"background":"white"}},
//   "bar":{"fill":"cornflowerblue", "hover_fill":"limegreen"},
//   "tooltip":{
//     "content":"<div><strong>${count} </strong> title drops</div>",
//     "styles":{  "background":"white",
//                 "border":"1px solid black",
//                 "border-radius":"2px",
//                 "box-shadow":"2px 2px 5px 0px grey",
//                 "padding":"5px"}
//   }
// };
//
// var data1 = [
//     {"season":"1", "count":8},
//     {"season":"2", "count":27},
//     {"season":"3", "count":40},
//     {"season":"4", "count":31},
//     {"season":"5", "count":15},
//     {"season":"6", "count":19},
//     {"season":"7", "count":41},
//     {"season":"8", "count":23},
//     {"season":"9", "count":18}
// ];
//
// let labelX1 = props1.chart.label.x,
//     labelY1 = props1.chart.label.y;
//
// var div1 = d3.select("#tooltip").html(props1.tooltip.content);
//
// //apply tooltip box styles
// for(let key in props1.tooltip.styles){
//   div1.style(key, props1.tooltip.styles[key]);
// }
//
// var margin1 = {top: 20, right: 20, bottom: 80, left: 40},
//     width1 = props1.svg.width - margin1.left - margin1.right,
//     height1 = props1.svg.height - margin1.top - margin1.bottom;
//
// var svg1 = d3.select("svg").attr("width",props1.svg.width)
//                           .attr("height", props1.svg.height);
//
// //set svg styles
// for(let key in props1.svg.styles){
//   svg1.style(key, props1.svg.styles[key]);
// }
//
// var x1 = d3.scaleBand().rangeRound([0,width1]).padding(0.1),
//     y1 = d3.scaleLinear().rangeRound([height1,0]);
//
// var g1 = svg1.append("g")
//         .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");
//
// x1.domain(data1.map(d=>d[labelX1]));
// y1.domain([0, d3.max(data1, d=>d[labelY1])]);
//
// g1.append("g")
//  .call(d3.axisLeft(y1));
//
// g1.append("g")
//   .attr("transform", "translate(0," + height1 + ")")
//   .call(d3.axisBottom(x1))
//   .selectAll("text")
//   .style("text-anchor", "end")
//   .attr("dx", "-.8em")
//   .attr("dy", "-.25em")
//   .attr("transform", "rotate(-90)" );
//
//
// g1.selectAll("rect")
//   .data(data1)
//   .enter().append("rect")
//           .attr("x", d=>18+x1(d[labelX1]))
//           .attr("y", d=>y1(d[labelY1]))
//           .attr("width", .5*(x1.bandwidth()))
//           .attr("height", d=>height1-y1(d[labelY1]))
//           .style("fill",props1.bar.fill)
//           .on("mouseover",handleMouseOver)
//           .on("mousemove", showTooltip)
//           .on("mouseout",handleMouseOut);
//
//
// svg1.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height1 + ")")
//     //.call(xAxis)
// 		.append("text")
// 		.attr("class", "axis-label")
// 		.attr("y", 50)
// 		.attr("x", (.5*width1)-30)
// 		.text('Season');
//
// function handleMouseOver(d,i){
//   d3.select(this).style("fill",props1.bar.hover_fill);
// }
//
// function showTooltip(d,i){
//   //get the mouse location
//   //let point = d3.mouse(this)
//     //    , p = {x: point[0], y: point[1] };
//   //let svgObj = document.getElementById("barsvg");
//   // let p = {x: d3.event.pageX-svgObj.getBoundingClientRect().x,
//   //          y: d3.event.pageY-svgObj.getBoundingClientRect().y};
//
//   let content = props1.tooltip.content
//                   .replace("${" + labelX1 + "}",d[labelX1])
//                   .replace("${" + labelY1 + "}",d[labelY1]);
//
//   div1.html(content);
//   div1.style("display","block").style("position", "absolute")
//       .style("left", (d3.event.pageX - 40) + "px")
//       .style("top", (d3.event.pageY + 20) + "px");
// }
//
// function handleMouseOut(d,i){
//   d3.select(this).style("fill", props1.bar.fill);
//   div1.style("display","none");
// }

//start of top eps accordion
$('.top-section .episode').click(function(){
	var chosenEp = $(this).attr('id');

	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
		$('.top-section .' + chosenEp).removeClass('active');
		$('.middle-section').removeClass('active');
		$('.middle-section .' + chosenEp).removeClass('active');
	} else {
		$('.top-section .episode').removeClass('active');
		$(this).addClass('active');
		$('.top-section .' + chosenEp).addClass('active');
		$('.middle-section').addClass('active');
		$('.middle-section .quotes').removeClass('active');
		$('.middle-section .' + chosenEp).addClass('active');
	}
});

//start of line graph
var data = 	[
	[ //Michael
	 {'x':1,'y':3},
	 {'x':2,'y':17},
	 {'x':3,'y':17},
	 {'x':4,'y':10},
	 {'x':5,'y':7},
	 {'x':6,'y':6},
	 {'x':7,'y':12}
	],
	[ //Dwight
		{'x':1,'y':1},
		{'x':2,'y':3},
		{'x':3,'y':9},
		{'x':4,'y':3},
		{'x':5,'y':2},
		{'x':6,'y':1},
		{'x':7,'y':5},
		{'x':8,'y':5},
		{'x':9,'y':7}
	],
	[ //Pam
		{'x':1,'y':1},
		{'x':2,'y':5},
		{'x':3,'y':3},
		{'x':4,'y':7},
		{'x':5,'y':1},
		{'x':6,'y':2},
		{'x':7,'y':10},
		{'x':8,'y':1},
		{'x':9,'y':1}
	], //Jim
	[{'x':1,'y':2},
	 {'x':2,'y':0},
	 {'x':3,'y':4},
	 {'x':4,'y':2},
	 {'x':5,'y':1},
	 {'x':6,'y':5},
	 {'x':7,'y':5},
	 {'x':8,'y':1},
	 {'x':9,'y':2}
	],
	[ //Andy
		{'x':3,'y':0},
		{'x':4,'y':1},
		{'x':5,'y':1},
		{'x':6,'y':1},
		{'x':7,'y':0},
		{'x':8,'y':4},
		{'x':9,'y':1}
	],
	[ //Toby
	 {'x':1,'y':0},
	 {'x':2,'y':0},
	 {'x':3,'y':0},
	 {'x':4,'y':1},
	 {'x':5,'y':1},
	 {'x':6,'y':1},
	 {'x':7,'y':1},
	 {'x':8,'y':2},
	 {'x':9,'y':0}
	],
	[ //Robert California
	 {'x':7,'y':0},
	 {'x':8,'y':4}
	],
	[ //Kevin
	 {'x':1,'y':0},
	 {'x':2,'y':0},
	 {'x':3,'y':0},
	 {'x':4,'y':1},
	 {'x':5,'y':0},
	 {'x':6,'y':1},
	 {'x':7,'y':0},
	 {'x':8,'y':1},
	 {'x':9,'y':1}
	],
	[ //Angela
	 {'x':1,'y':0},
	 {'x':2,'y':0},
	 {'x':3,'y':1},
	 {'x':4,'y':2},
	 {'x':5,'y':0},
	 {'x':6,'y':0},
	 {'x':7,'y':0},
	 {'x':8,'y':1},
	 {'x':9,'y':0}
	],
	[ //Daryl
	 {'x':1,'y':0},
	 {'x':2,'y':0},
	 {'x':3,'y':1},
	 {'x':4,'y':2},
	 {'x':5,'y':0},
	 {'x':6,'y':0},
	 {'x':7,'y':0},
	 {'x':8,'y':1},
	 {'x':9,'y':0}
	]
];

var colors = [
	'darkgreen', //Michael
	'goldenrod', //Dwight
	'lightcoral', //Pam
	'darkblue', //Jim
	'cornflowerblue', //Andy
	'mediumpurple', //Toby
	'limegreen', // Robert California
	'saddlebrown', //Kevin
	'darkred', //Angela
	'olive' //darryl
]

var lineNames = [
	'michael',
	'dwight',
	'pam',
	'jim',
	'andy',
	'toby',
	'robert',
	'kevin',
	'angela',
	'darryl'
]


//************************************************************
// Create Margins and Axis and hook our zoom function
//************************************************************
var margin = {top: 20, right: 30, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([1, 9])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, 18])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
		.tickSize(-height)
		.tickPadding(10)
		.tickSubdivide(true)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
		.tickPadding(10)
		.tickSize(-width)
		.tickSubdivide(true)
    .orient("left");



//************************************************************
// Generate our SVG object
//************************************************************
var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
		.attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
	 .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
		.append("text")
		.attr("class", "axis-label")
		.attr("y", (-margin.left) + 10)
		.attr("x", -height + 10)
		.text('Season #');

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.append("g")
	.attr("class", "y axis")
	.append("text")
	.attr("class", "axis-label")
	.attr("transform", "rotate(-90)")
	.attr("y", (-margin.left) + 10)
	.attr("x", -height + 10)
	//.text('Title drops each season');

svg.append("clipPath")
	.attr("id", "clip")
	.append("rect")
	.attr("width", width)
	.attr("height", height);





//************************************************************
// Create D3 line object and draw data on our SVG object
//************************************************************
var line = d3.svg.line()
    .interpolate("linear")
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

svg.selectAll('.line')
	.data(data)
	.enter()
	.append("path")
  .attr("class", "line")
	.attr("clip-path", "url(#clip)")
	.attr('stroke', function(d,i){
		return colors[i%colors.length];
	})
	.attr('id', function(d,i){
		return lineNames[i%lineNames.length];
	})
  .attr("d", line);




//************************************************************
// Draw points on SVG object based on the data given
//************************************************************
var points = svg.selectAll('.dots')
	.data(data)
	.enter()
	.append("g")
	.attr('class', function(d,i){
		return ('dots ' + lineNames[i%lineNames.length]);
	})
	.attr("clip-path", "url(#clip)")
	;



var point = points.selectAll('.dot')
	.data(function(d, index){
		var a = [];
		d.forEach(function(point,i){
			a.push({'index': index, 'point': point});
		});
		return a;
	})
	.enter()
	.append('g')
	.attr('class', function(d) {
		return 'dot-group dot' + d.point.x; }
	);



point.append('circle')
	.attr('class','dot')
	.attr('r', 2.5)
	.attr('data-count', function(d) {
		return 'Season ' + d.point.x + ': ' + d.point.y; }
	)
	.attr('fill', function(d,i){
		return colors[d.index%colors.length];
	})
	.attr("transform", function(d) {
		return 'translate(' + x(d.point.x) + ',' + y(d.point.y) + ')'
	})

	;

point
	.append('text')
	.attr('class','count')
	.attr('transform', function(d) {
			return 'translate(' + (x(d.point.x)-3) + ',' + (y(d.point.y)-12) + ')'
	})
	.text(function(d) {
		//return 'Season ' + d.point.x + ': ' + d.point.y;
		return d.point.y;})
;




$('.key li').click(function() {
	//$(this).toggleClass('active');
	var characterChosen = $(this).attr('class').split(" ")[0];
	var characterLine = $('#' + characterChosen);
	var characterDots = $('.dots.' + characterChosen);
	$('li.' + characterChosen).toggleClass('active');
	characterLine.toggleClass('shown');
	characterDots.toggleClass('shown');

	if ($('li.' + characterChosen).hasClass('active')) {
		var path = document.querySelector('#' + characterChosen);
		var length = path.getTotalLength();
		path.style.transition = path.style.WebkitTransition = 'none';
		path.style.strokeDasharray = length + ' ' + length;
		path.style.strokeDashoffset = length;
		path.getBoundingClientRect();
		path.style.transition = path.style.WebkitTransition =
			'stroke-dashoffset 3s ease-in-out';
		path.style.strokeDashoffset = '0';
	}

});

$(function() {
		$('li.michael, li.dwight, li.pam, li.jim').trigger('click');
});
