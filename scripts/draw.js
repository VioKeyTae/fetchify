function draw() {
    var width = 300,
        height = 300,
        radius = Math.min(width, height) / 2,
        innerRadius = 0.6 * radius;

    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
            return d.width;
        });

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([0, 0])
        .html(function (d) {
            return d.data.label + ":<span>" + d.data.score + "</span>";
        });

    var outlineArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius);

    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(function (d) {
            return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius;
        });



    var svg = d3.select("#datawrapper").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", 'svg')
        .attr("viewBox", "0 0 300 300")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.call(tip);

    datalist.forEach(function (d) {
        d.id = d.id;
        d.order = +d.order;
        d.color = d.color;
        d.weight = +d.weight;
        d.score = +d.score;
        d.width = +d.weight;
        d.label = d.label;
    });
    // for (var i = 0; i < datalist.score; i++) { console.log(datalist[i].id) }
    var outerPath = svg.selectAll(".outlineArc")
        .data(pie(datalist))
        .enter().append("path")
        .attr("fill", "red")
        .attr("fill-opacity", "0")
        .attr("stroke", "#333")
        .attr("class", "outlineArc")
        .attr("d", outlineArc)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    var path = svg.selectAll(".solidArc")
        .data(pie(datalist))
        .enter().append("path")
        .attr("fill", function (d) {
            return d.data.color;
        })
        .attr("class", "solidArc")
        .attr("stroke", "#333")
        .attr("d", arc)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);




    // calculate the weighted mean score
    var score =
        datalist.reduce(function (a, b) {
            //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
            return a + (b.score * b.weight);
        }, 0) /
        datalist.reduce(function (a, b) {
            return a + b.weight;
        }, 0);

    /*svg.append("svg:text")
        .attr("class", "aster-score")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle") // text-align: right
        .text(Math.round(score));*/
}
