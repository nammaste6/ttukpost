
var PreviewChartData = {
		options: {
		},
		
		getStaticallyData: function(chartId, dataset, ChartGenerator, callback) {
			
		},
		
		getDynamicallyData: function(ChartGenerator) {
			var tool = ChartGenerator.getChartTool();			
			var seriesList = tool.Chart.series;
			var xAxis = ChartGenerator.getMetadata().xAxis;

			var data = {};
			data[xAxis] = Date.now();
			var floor = (!floor && floor !== 0)? 20 : floor;
			for (var i in seriesList) {
				var series = seriesList[i];
				data[series.name] = Math.floor(Math.max((Math.random() * 1000), floor));				
			}
			ChartGenerator.callbackFunc.apply({tool: tool, data:data});
		}
};