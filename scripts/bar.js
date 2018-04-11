	var myData = [];
	var barWidth = 400;
  var barScale = d3.scaleLinear().domain([0, 100]).range([0, barWidth]);



	function randomInteger(n) {
		return Math.floor(10 * Math.random());
	}

	function initialiseData() {
    console.log("initialise");
		myData = datalist;
	}

	function updateBars(data) {
    console.log(data);
		var u = d3.select('#bar')
			.selectAll('.person')
			.data(data, function(d) {
				return d.label;
			});

		var entering = u.enter()
			.append('div')
			.classed('person', true);
      console.log("div added")
		entering.append('div')
			.classed('label', true)
			.text(function(d) {
				return d.label;
			});

		entering.append('div')
			.classed('bar', true);

		entering.merge(u).select('.bar').transition()
			.style('width', function(d) {
				return barScale(d.score) + 'px';
			});

		u.exit().remove();
	}

	function addPerson() {
		if(myData.length === 10)
			return;

		myData.push({
			label: labels[myData.length],
			score: 30 + randomInteger(70)
		});

		update(myData);
	}

	function removePerson() {
		if(myData.length === 0)
			return;

		myData.pop();

		update(myData);
	}

	function updateScores() {
		for(var i = 0; i < myData.length; i++) {
			myData[i].score = 30 + randomInteger(70);
		}

		update(myData);
	}

	function updateDataView() {
		d3.select('.data-view').text('Array: ' + JSON.stringify(myData));
	}

	function update() {
		updateBars(myData);
		updateDataView(myData);
	}
