
var ChartDataRest = {
		options: {
		},
		
		getStaticallyData: function(chartId, dataset, ChartGenerator, callback) {
			var url = YUI().Lang.sub(this.options.StaticallyDataUrl, {processDefinitionKey: processDefinitionKey});
			var params = ChartGenerator.params;
			
			$.ajax({
				type:'POST',
				url: url,
				dataType: 'json',
				data:{'visualId' : chartId, 'dataset' : JSON.stringify(dataset), 'metadata' : JSON.stringify(params.metadata)},
				cache: false,
				async: true,
				success: function(data, textStatus) {
					if (!data) {
						console.error("Can't get chart data.");
					} else {
						 callback.apply({chartId: chartId, ChartGenerator: ChartGenerator, data:data});
					}
				}
			}).done(function(data, textStatus) {
				console.log("ajax done");
			}).fail(function(jqXHR, textStatus, error){
				errorHandler(jqXHR.responseText);
				console.error('failure: ', textStatus, 'error: ', error, jqXHR);
			});
		},
		
		getDynamicallyData: function(ChartGenerator) {
			var vid = ChartGenerator.id;
			
			var tool = ChartGenerator.getChartTool();			
			var time = tool.getLast();
						
			var url = YUI().Lang.sub(this.options.DynamicallyDataUrl, {visualId: vid, last: time});
			
			$.ajax({
				type:'GET',
				url: url,
				dataType: 'json',
				data:{},
				cache: false,
				async: true,
				success: function(data, textStatus) {
					if (!data) {
						console.error("Can't get chart data.");
					} else {
						ChartGenerator.callbackFunc.apply({tool: tool, data:data});
					}
				}
			}).done(function(data, textStatus) {
				console.log("ajax done");
			}).fail(function(jqXHR, textStatus, error){
				//errorHandler(jqXHR.responseText);
				console.error('failure: ', textStatus, 'error: ', error, jqXHR);
			});
		}
};