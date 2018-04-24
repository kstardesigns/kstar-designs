//start of bar graph

var props1 = {
  "chart":{"label":{"x":"season","y":"count"}},
  "svg":{
    "width": 800,"height":560,
           "styles":{"background":"white"}},
  "bar":{"fill":"cornflowerblue", "hover_fill":"limegreen"},
  "tooltip":{
    "content":"<div><strong>${count} </strong> title drops</div>",
    "styles":{  "background":"white",
                "border":"1px solid black",
                "border-radius":"2px",
                "box-shadow":"2px 2px 5px 0px grey",
                "padding":"5px"}
  }
};

var data1 = [
    {"season":"1", "count":8},
    {"season":"2", "count":27},
    {"season":"3", "count":40},
    {"season":"4", "count":31},
    {"season":"5", "count":15},
    {"season":"6", "count":19},
    {"season":"7", "count":41},
    {"season":"8", "count":23},
    {"season":"9", "count":18}
];

let labelX1 = props1.chart.label.x,
    labelY1 = props1.chart.label.y;

var div1 = d3.select("#tooltip").html(props1.tooltip.content);

//apply tooltip box styles
for(let key in props1.tooltip.styles){
  div1.style(key, props1.tooltip.styles[key]);
}

var margin1 = {top: 20, right: 20, bottom: 80, left: 40},
    width1 = props1.svg.width - margin1.left - margin1.right,
    height1 = props1.svg.height - margin1.top - margin1.bottom;

var svg1 = d3.select("svg").attr("width",props1.svg.width)
                          .attr("height", props1.svg.height);

//set svg styles
for(let key in props1.svg.styles){
  svg1.style(key, props1.svg.styles[key]);
}

var x1 = d3.scaleBand().rangeRound([0,width1]).padding(0.1),
    y1 = d3.scaleLinear().rangeRound([height1,0]);

var g1 = svg1.append("g")
        .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

x1.domain(data1.map(d=>d[labelX1]));
y1.domain([0, d3.max(data1, d=>d[labelY1])]);

g1.append("g")
 .call(d3.axisLeft(y1));

g1.append("g")
  .attr("transform", "translate(0," + height1 + ")")
  .call(d3.axisBottom(x1))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", "-.25em")
  .attr("transform", "rotate(-90)" );


g1.selectAll("rect")
  .data(data1)
  .enter().append("rect")
          .attr("x", d=>18+x1(d[labelX1]))
          .attr("y", d=>y1(d[labelY1]))
          .attr("width", .5*(x1.bandwidth()))
          .attr("height", d=>height1-y1(d[labelY1]))
          .style("fill",props1.bar.fill)
          .on("mouseover",handleMouseOver)
          .on("mousemove", showTooltip)
          .on("mouseout",handleMouseOut);


svg1.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height1 + ")")
    //.call(xAxis)
		.append("text")
		.attr("class", "axis-label")
		.attr("y", 50)
		.attr("x", (.5*width1)-30)
		.text('Season');

function handleMouseOver(d,i){
  d3.select(this).style("fill",props1.bar.hover_fill);
}

function showTooltip(d,i){
  //get the mouse location
  //let point = d3.mouse(this)
    //    , p = {x: point[0], y: point[1] };
  //let svgObj = document.getElementById("barsvg");
  // let p = {x: d3.event.pageX-svgObj.getBoundingClientRect().x,
  //          y: d3.event.pageY-svgObj.getBoundingClientRect().y};

  let content = props1.tooltip.content
                  .replace("${" + labelX1 + "}",d[labelX1])
                  .replace("${" + labelY1 + "}",d[labelY1]);

  div1.html(content);
  div1.style("display","block").style("position", "absolute")
      .style("left", (d3.event.pageX - 40) + "px")
      .style("top", (d3.event.pageY + 20) + "px");
}

function handleMouseOut(d,i){
  d3.select(this).style("fill", props1.bar.fill);
  div.style("display","none");
}

//start of line graph
