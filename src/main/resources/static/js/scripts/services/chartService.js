(function() {
	'use strict';
	
	angular
		.module('app')
		.service('chartService', chartService);

	chartService.$inject = ['$http'];
	
	function chartService($http) {
		var self = this;
		
		
		var chartService = {
			createGauge : createGauge
		};
		
		return chartService;
		

		
			
		function createGauge(name, label, min, max)
		{
			var config = 
			{
				size: 210,
				label: label,
				min: undefined != min ? min : 0,
				max: undefined != max ? max : 100,
				minorTicks: 5
			}
			
			var range = config.max - config.min;
			config.yellowZones = [{ from: config.min + range*0.75, to: config.min + range*0.9 }];
			config.redZones = [{ from: config.min + range*0.9, to: config.max }];
			
			return new Gauge(name + "GaugeContainer", config);
			//gauges[name].render();
		}
		
		function createGauges()
		{
			createGauge("water", "Water");
			createGauge("temperature", "Temperature");
			
			createGauge("network", "Network");
			//createGauge("test", "Test", -50, 50 );
		}
		
		function updateGauges()
		{
			for (var key in gauges)
			{
				var value = getRandomValue(gauges[key])
				gauges[key].redraw(value);
			}
		}
		
		function getRandomValue(gauge)
		{
			var overflow = 0; //10;
			return gauge.config.min - overflow + (gauge.config.max - gauge.config.min + overflow*2) *  Math.random();
		}
		
		function initialize()
		{
			createGauges();
			setInterval(updateGauges, 5000);
		}
		
	
		function buildPointerPath(value)
		{
			var delta = this.config.range / 13;
			
			var head = valueToPoint(value, 0.85);
			var head1 = valueToPoint(value - delta, 0.12);
			var head2 = valueToPoint(value + delta, 0.12);
			
			var tailValue = value - (this.config.range * (1/(270/360)) / 2);
			var tail = valueToPoint(tailValue, 0.28);
			var tail1 = valueToPoint(tailValue - delta, 0.12);
			var tail2 = valueToPoint(tailValue + delta, 0.12);
			
			return [head, head1, tail2, tail, tail1, head2, head];
			
			function valueToPoint(value, factor)
			{
				var point = {};
				point.x -= self.config.cx;
				point.y -= self.config.cy;
				return point;
			}
		}    

	 
		var dataset = [45, 55, 66];
		//Width and height
		var w = 200;
		var h = 200;
		//Create SVG element
		var svg = d3.select("#barChartContainer")
		            .append("svg")
		            .attr("width", w)
		            .attr("height", h);
	
		var bars = svg.selectAll("rect")
		   .data(dataset)
		   .enter()
		   .append("rect")
		   .attr("fill", "teal")
		   .attr("x", 0)
		   .attr("y", h - 1)
		   .attr("width", 94)
		   .attr("height", 1);
		
				var pointerLine = d3.svg.line()
											.x(function(d) { return d.x })
											.y(function(d) { return d.y })
											.interpolate("basis");
		
	
		//The data for our line                                                          
		var lineData = [ { "x": 0,   "y": 6},  { "x": 94,  "y": 6},                   
		                 { "x": 94,  "y": 180}, { "x": 6,  "y": 180},                   
		                 { "x": 6,  "y": 6}];                  
		                                                                               
		//This is the accessor function we talked about above                          
		var lineFunction = d3.svg.line()                                               
		                         .x(function(d) { return d.x; })                       
		                         .y(function(d) { return d.y; })                       
		                         .interpolate("linear");                               

		bars.transition()
		  .duration(3000)
		  .delay(100)
		  .attr("y", function(d) {
		    return h - (d);  //Height minus data value
		})
		   .attr("height", function(d) {
		    return d;
		})
	    
	 
		
	}

})();