(function() {
    var margin = { top: 30, left: 100, right: 30, bottom: 20},
    height = 480 - margin.top - margin.bottom,
    width = 700 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-1")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var countries = ["Malta","Luxembourg","Cyprus","Italy","Slovenia","Estonia","Ireland","Finland","Spain","France","Portugal","Lithuania","Austria","Latvia","Croatia","Norway","Belgium","Sweden","Iceland","United Kingdom","European Union","Slovakia","Poland","Hungary","Macedonia","Romania","Czech Republic","Bulgaria","Switzerland","Germany","Denmark","Netherlands","Serbia","Greece","Turkey"]

  var distancefromtop = 0

  var xPositionScale = d3.scaleLinear().domain([0,40]).range([0,width])

  var yPositionScale = d3.scalePoint().domain(countries).range([height,0])

  // var colorScale = d3.scaleOrdinal().domain(["median_income", "upper_class_threshold", "poverty_threshold", "middle_class_threshold"]).range(['#82B905','#009BFF','#DC0F6E','#EB6E14'])

  d3.queue()
    .defer(d3.csv, "rentburden.csv", function(d){
      console.log(d)
      d.country = d.GEO
      d.value = +d.rentasshareofincome
      return d
    })
    .await(ready)

  function ready(error, datapoints) {

    svg.selectAll("circle")
      .data(datapoints)
      .enter().append("circle")
      .attr("r", 3.5)
      .attr("cx", function(d){
        return xPositionScale(d.value)
      })
      .attr("cy", function(d){
        return yPositionScale(d.country)
      })


    // Add your axes
    var xAxis = d3.axisTop(xPositionScale)
    svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0,"+distancefromtop+")")
      .call(xAxis);

    var yAxis = d3.axisLeft(yPositionScale);
    svg.append("g")
      .attr("class", "axis y-axis")
      .attr("transform", "translate(0,"+distancefromtop+")")
      .call(yAxis);

  
  }

})();
