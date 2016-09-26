
var m_width = $("#map").width(),
    width = 500,
    height = 500,
    country,
    state;

var projection = d3.geo.mercator()
    .scale(90)
    .translate([width / 2, height / 1.5]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map").append("svg")
    .attr("preserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("width", m_width)
    .attr("height", m_width * height / width);

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", country_clicked);

var g = svg.append("g");

d3.json("static/topojson/countries.topo.json", function(error, us) {
  g.append("g")
    .attr("id", "countries")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.countries).features)
    .enter()
    .append("path")
    .attr("id", function(d) { return d.id; })
    .attr("d", path)
    .on("click", country_clicked);
    // .transition()
    // .call(country_clicked);
    
});

function zoom(xyz) {
  g.transition()
    .duration(750)
    .attr("transform", "translate(" + projection.translate() + ")scale(" + xyz[2] + ")translate(-" + xyz[0] + ",-" + xyz[1] + ")")
    .selectAll(["#countries", "#states", "#cities"])
    .style("stroke-width", 1.0 / xyz[2] + "px")
    .selectAll(".city")
    .attr("d", path.pointRadius(20.0 / xyz[2]));
}

function get_xyz(d) {
  var bounds = path.bounds(d);
  var w_scale = (bounds[1][0] - bounds[0][0]) / width;
  var h_scale = (bounds[1][1] - bounds[0][1]) / height;
  var z = .96 / Math.max(w_scale, h_scale);
  var x = (bounds[1][0] + bounds[0][0]) / 2;
  var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6);
  return [x, y, z];
}

function country_clicked(d) {
  console.log('country');

  g.selectAll(["#states", "#cities"]).remove();
  state = null;

  if (country) {
    console.log('if statement');
    g.selectAll("#" + country.id).style('display', null);
  }

  if (d && country !== d) {
    

    // var xyz = get_xyz(d);
    var xyz = [58.42223017037941, 266.8199761363986, 2.782758952526096];

    console.log(d.id);
    console.log(xyz);

    country = d;

    if (d.id  == 'USA') {
      d3.json("static/topojson/states_usa.topo.json", function(error, us) {
        g.append("g")
          .attr("id", "states")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
          .enter()
          .append("path")
          .attr("id", function(d) { return d.id; })
          .attr("class", "active")
          .attr("d", path)
          .on("click", state_clicked);
          // .transition()
          // .call(state_clicked);

        zoom(xyz);
        g.selectAll("#" + d.id).style('display', 'none');
      });      
    } else {
      zoom(xyz);
    }
  } 
  // } else {
  //   var xyz = [width / 2, height / 1.5, 1];
  //   country = null;
  //   zoom(xyz);
  // }
}

function state_clicked(d) {
  g.selectAll("#cities").remove();

  if (d && state !== d) {
    console.log(d.id);
    
    // var xyz = get_xyz(d);
    var xyz = [62.65470197051742, 273.1317384242693, 25.625118777883717];
    
    console.log('state');
    console.log(xyz);
    state = d;

    country_code = state.id.substring(0, 3).toLowerCase();
    state_name = state.properties.name;
    
    // zoom(xyz);

    d3.json("static/topojson/cities_usa.topo.json", function(error, us) {
      g.append("g")
        .attr("id", "cities")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.cities).features.filter(function(d) { return state_name == d.properties.state; }))
        .enter()
        .append("path")
        .attr("id", function(d) { return d.properties.name; })
        .attr("class", "city")
        .attr("d", path.pointRadius(20 / xyz[2]));

      zoom(xyz);
    });      

  } else {
    state = null;
    country_clicked(country);
  }
}

$(window).resize(function() {
  var w = $("#map").width();
  svg.attr("width", w);
  svg.attr("height", w * height / width);
});