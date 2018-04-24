var props = {
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

var data = [
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

let labelX = props.chart.label.x,
    labelY = props.chart.label.y;


var div = d3.select("#tooltip").html(props.tooltip.content);

//apply tooltip box styles
for(let key in props.tooltip.styles){
  div.style(key, props.tooltip.styles[key]);
}

var margin = {top: 20, right: 20, bottom: 80, left: 40},
    width = props.svg.width - margin.left - margin.right,
    height = props.svg.height - margin.top - margin.bottom;

var svg = d3.select("svg").attr("width",props.svg.width)
                          .attr("height", props.svg.height);

//set svg styles
for(let key in props.svg.styles){
  svg.style(key, props.svg.styles[key]);
}

var x = d3.scaleBand().rangeRound([0,width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height,0]);

var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(data.map(d=>d[labelX]));
y.domain([0, d3.max(data, d=>d[labelY])]);

g.append("g")
 .call(d3.axisLeft(y));

g.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", "-.25em")
  .attr("transform", "rotate(-90)" );


g.selectAll("rect")
  .data(data)
  .enter().append("rect")
          .attr("x", d=>18+x(d[labelX]))
          .attr("y", d=>y(d[labelY]))
          .attr("width", .5*(x.bandwidth()))
          .attr("height", d=>height-y(d[labelY]))
          .style("fill",props.bar.fill)
          .on("mouseover",handleMouseOver)
          .on("mousemove", showTooltip)
          .on("mouseout",handleMouseOut);


svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    //.call(xAxis)
		.append("text")
		.attr("class", "axis-label")
		.attr("y", 50)
		.attr("x", (.5*width)-30)
		.text('Season');

function handleMouseOver(d,i){
  d3.select(this).style("fill",props.bar.hover_fill);
}

function showTooltip(d,i){
  //get the mouse location
  //let point = d3.mouse(this)
    //    , p = {x: point[0], y: point[1] };
  //let svgObj = document.getElementById("barsvg");
  // let p = {x: d3.event.pageX-svgObj.getBoundingClientRect().x,
  //          y: d3.event.pageY-svgObj.getBoundingClientRect().y};

  let content = props.tooltip.content
                  .replace("${" + labelX + "}",d[labelX])
                  .replace("${" + labelY + "}",d[labelY]);

  div.html(content);
  div.style("display","block").style("position", "absolute")
      .style("left", (d3.event.pageX - 40) + "px")
      .style("top", (d3.event.pageY + 20) + "px");

}

function handleMouseOut(d,i){
  d3.select(this).style("fill", props.bar.fill);
  div.style("display","none");
}
