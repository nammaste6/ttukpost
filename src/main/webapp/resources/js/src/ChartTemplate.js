function Enum() {}

Enum.ChartType = {
		line: 'line',
		spline: 'spline',
		bar: 'bar',
		column: 'column',
		area: 'area',
		pie: 'pie',
		combi: 'combi'
};

Enum.ChartTemplate = {
		lineTemplate: function(id, metadata) {
			var tool = new HChartTool(id, metadata, Enum.ChartType.line);

			return tool;
		},		
		splineTemplate: function(id, metadata) {
			var tool = new HChartTool(id, metadata, Enum.ChartType.spline);
			
			return tool;
		},		
		barTemplate: function(id, metadata) {
			var tool = new HChartTool(id, metadata, Enum.ChartType.bar);
			
			return tool;
		},		
		columnTemplate: function(id, metadata) {
			var tool = new HChartTool(id, metadata, Enum.ChartType.column);
			
			return tool;
		},		
		areaTemplate: function(id, metadata) {
			var tool = new HChartTool(id, metadata, Enum.ChartType.area);
			
			return tool;
		},		
		pieTemplate: function(id, metadata) {
			var tool = new HChartTool(id, metadata, Enum.ChartType.pie);
			
			return tool;
		},		
		combiTemplate: function(id, metadata) {
			var tool = new HChartTool(id, metadata, Enum.ChartType.combi);
			
			return tool;
		}
};