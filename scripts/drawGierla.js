function drawChart(dataSet, w, h, property) {

    dataSet.sort(function (a, b) {
        return a.tempo < b.tempo;
    });

    let padding = 20;

    let xScale = d3.scaleLinear()
        .domain([d3.min(dataSet, function (d) {
            return d.tempo;
        }), d3.max(dataSet, function (d) {
            return d.tempo;
        })])
        .range([padding, w - (padding * 2)]);

    let yScale = d3.scaleLinear()
        .domain([d3.min(dataSet, function (d) {
            return d.score;
        }), d3.max(dataSet, function (d) {
            return d.score;
        })])
        .range([padding, h - (padding * 2)]);

    let xAxis = d3.axisTop(xScale).ticks([xScale.min, xScale.max]);

    let yAxis = d3.axisRight(yScale).ticks([yScale.min, yScale.max]);

    let svg = d3.select("#datawrapper")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, " + (h - padding) + ")")
        .call(xAxis);

    svg.append("text")
        .attr("transform", "translate(" + (w / 2) + ", " + (h + padding) + ")")
        .attr("class", "hint")
        .style("text-anchor", "middle")
        .text("Tempo");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, 0)")
        .call(yAxis);

    svg.append("text")
        .attr("class", "hint")
        .attr("transform", "rotate(-90)")
        .attr("y", padding * -1)
        .attr("x", (h / 2) * -1)
        .style("text-anchor", "middle")
        .text(property);

    svg.selectAll("line")
        .data(dataSet)
        .enter()
        .append("line")
        .style("stroke", "white")
        .style("stroke-width", "3px")
        .attr("x1", function (d) {
            return xScale(d.tempo);
        })
        .attr("y1", function (d) {
            return yScale(d.score);
        })
        .attr("x2", function (d, i) {
            if ((i + 1) <= (dataSet.length - 1)) {
                return xScale(dataSet[i + 1].tempo);
            } else {
                return xScale(d.tempo);
            }
        })
        .attr("y2", function (d, i) {
            if ((i + 1) <= (dataSet.length - 1)) {
                return yScale(dataSet[i + 1].score);
            } else {
                return yScale(d.score);
            }
        });

    let tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            return "<strong>Song: </strong> <span style='color:red'>" + d.label + "</span>";
        });
    svg.call(tip);

    svg.selectAll("circle")
        .data(dataSet)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(d.tempo);
        })
        .attr("cy", function (d) {
            return yScale(d.score);
        })
        .attr("r", function (d) {
            return 11
        })
        .attr("fill", "#efefef")
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

}
