function HChartTool(id, metadata, chartType) {
	this.id = id;
	this.metadata = metadata;
	this.chartType = chartType;
	this.frame = {
			chart: {animation: Highcharts.svg, backgroundColor: 'rgba(255, 255, 255, 0.1)'},
			credits: {enabled: false},
			title: {text: ""},
			subtitle: {text: ""},
			plotOptions: {},
			legend: {layout: 'bottom', align: 'center', verticalAlign: 'bottom', borderWidth: 1}
	};
	
	this.Chart;
	
	this.last = 0; 
	this.preview;
};

HChartTool.prototype.getChartObject = function() {
	var type = this.chartType;
	var chartObject = new HChartTool.other(new HParser(type), this);
	
	if (type == "pie") {
		chartObject = new HChartTool.pie(new HParser(type), this);
	} else if (type == "combi") {
		chartObject = new HChartTool.combi(new HParser(type), this);
	}
	return chartObject;
};

HChartTool.prototype.draw = function(containerId, data, preview) {
	this.preview = preview;
	var ChartObject = this.getChartObject();
	
	var frame = ChartObject.assembleChart(data, this.metadata);	
	frame.chart.renderTo = containerId;
	
	console.log(JSON.stringify(frame));
	
	Highcharts.setOptions({// This is for all plots, change Date axis to local timezone
        global : {
            useUTC : false
        },
        lang: {
        	noData: 'No Data'
        }
    });
	this.Chart = new Highcharts.Chart(frame);
};

HChartTool.prototype.addData = function(data) {
	var seriesList = this.Chart.series;
	for (var i in seriesList) {
		var series = seriesList[i];
		
		var xValue = data[this.metadata.xAxis];
		var yValue = data[series.name];
		if (yValue == undefined) yValue = 0;
		
		if (yValue != undefined) series.addPoint([xValue, yValue], true, true);
	}
	this.last = data.last;
};

HChartTool.prototype.getLast = function() {
	return this.last;
};

HChartTool.prototype.settingTitle = function(frame, metadata) {
	if (metadata.title) {
		frame.title = {},
		frame.title.text = metadata.title;
	}
	if (metadata.subTitle) {
		frame.subTitle = {},
		frame.subtitle.text = metadata.subTitle;
	}
};

HChartTool.prototype.settingLegend = function(frame, metadata) {
	var legend = frame.legend;
	
	legend.enabled = metadata.legendEnabled;
	if (metadata.legendEnabled) {	
		if (metadata.legendLayout) {
			legend.layout = metadata.legendLayout;
		}
		if (metadata.legendAlign) {
			legend.align = metadata.legendAlign;
		}
		if (metadata.legendVerticalAlign) {
			legend.verticalAlign = metadata.legendVerticalAlign;
		}	
	}
};

HChartTool.prototype.settingXAxis = function(frame, metadata, seriesDataInfo) {
	frame.xAxis = {};
	frame.xAxis.labels = {enabled : metadata.xAxisEnabled, title: {text: ""}};
	
	if (metadata.xAxisType == "datetime") {
		frame.xAxis.type = metadata.xAxisType;
	} else {
		frame.xAxis.categories = seriesDataInfo["x-axis"];
	}
};

HChartTool.prototype.settingYAxis = function(frame, metadata) {
	var yAxisEnabled = metadata.yAxisEnabled;
	
	frame.yAxis = {title: {text: ""}}; //
	frame.yAxis.labels = {enabled : metadata.yAxisEnabled};
	if (yAxisEnabled) {
		
		// multi yaxis
		if (metadata.yAxisTitle) {
			
			if (metadata.yAxisTitle.length > 1) {
				frame.yAxis = [];
				
				frame.yAxis.push({
					title: {text: metadata.yAxisTitle[0]},
				});
				frame.yAxis.push({
					title: {text: metadata.yAxisTitle[1]},
					opposite: true
				});
			} else {
				frame.yAxis.title.text = metadata.yAxisTitle[0];
			}
		}
	}
	
};

HChartTool.prototype.settingPieInfo = function(frame, metadata) {
	frame.plotOptions.pie = {};
	
	if (metadata.pieSize != 0)
		frame.plotOptions.pie.size = metadata.pieSize;
	
	if (metadata.pieXpos != 0 || metadata.pieYpos != 0)
		frame.plotOptions.pie.center = [metadata.pieXpos, metadata.pieYpos];
	
	if (metadata.pieDataLabels != undefined) {
		frame.plotOptions.pie.dataLabels = {enabled: metadata.pieDataLabels};
	}
		
};

HChartTool.prototype.settingSeriesStyle = function(seriesInfo, metaSeriesStyle) {
	if (!metaSeriesStyle) return;
		
	if (metaSeriesStyle.yAxisIndex != undefined) {
		seriesInfo.yAxis = metaSeriesStyle.yAxisIndex;
	}
	if (metaSeriesStyle.dataLabelsEnabled != undefined) {
		seriesInfo.dataLabels = {enabled: metaSeriesStyle.dataLabelsEnabled};
		seriesInfo.dataLabels.formatter = function() {
			if (this.y % 1 === 0) {
				return this.y;
			} else {
				return  Highcharts.numberFormat(this.y, 2, '.');
			}
		};
	}
	seriesInfo.marker = {};
	if (metaSeriesStyle.markerEnabled != undefined) {
		seriesInfo.marker.enabled = metaSeriesStyle.markerEnabled;
	}
	if (metaSeriesStyle.markerRadius) {
		seriesInfo.marker.radius = metaSeriesStyle.markerRadius;
	}
	if (metaSeriesStyle.markerSymbol) {
		seriesInfo.marker.symbol = metaSeriesStyle.markerSymbol;
	}
	if (metaSeriesStyle.seriesDashStyle) {
		seriesInfo.dashStyle = metaSeriesStyle.seriesDashStyle;
	}
	if (metaSeriesStyle.seriesStep) {
		seriesInfo.step = metaSeriesStyle.seriesStep;
	}
	if (metaSeriesStyle.valueSuffix) {
		seriesInfo.tooltip = {valueSuffix: metaSeriesStyle.valueSuffix};
	}
	/*if (metaSeriesStyle.pointPadding) {
		seriesInfo.pointPadding = metaSeriesStyle.pointPadding;
	}
	if (metaSeriesStyle.groupPadding) {
		seriesInfo.groupPadding = metaSeriesStyle.groupPadding;
	}*/
	if (metaSeriesStyle.lineWidth) {
		seriesInfo.lineWidth = metaSeriesStyle.lineWidth;
	}	
	if (metaSeriesStyle.yAxisIndex) {
		seriesInfo.yAxis = metaSeriesStyle.yAxisIndex;
	}	
};

HChartTool.other = function(parser, tool) {
	this.ChartTool = tool;
	this.Parser = parser;
};

HChartTool.other.prototype.assembleChart = function(data, metadata) {
	var frame = this.ChartTool.frame;
	var seriesDataInfo = this.Parser.parse(data, metadata);
	
	frame.series = [];
	var metaSeriseStyleList = metadata.seriesStyle;
	for (var i in  metaSeriseStyleList) {
		var metaSeriesStyle = metaSeriseStyleList[i];
		var name = metaSeriesStyle.name;
		var type = this.ChartTool.chartType;
		
		var series = {type: type, name: name, data: seriesDataInfo[name]};
		
//		if (metadata.yAxisEnabled) {
//			this.ChartTool.settingYAxisTitle(frame, series, metaSeriesStyle, metadata);
//		}
		this.ChartTool.settingSeriesStyle(series, metaSeriesStyle);
		
		frame.series.push(series);
	}
	
	this.ChartTool.settingTitle(frame, metadata);
	this.ChartTool.settingLegend(frame, metadata);
	this.ChartTool.settingXAxis(frame, metadata, seriesDataInfo);
	this.ChartTool.settingYAxis(frame, metadata);
	
	return frame;
};


HChartTool.pie = function(parser, tool) {
	this.ChartTool = tool;
	this.Parser = parser;
};

HChartTool.pie.prototype.assembleChart = function(data, metadata) {
	var frame = this.ChartTool.frame;
	
	var seriesDataInfo = this.Parser.parse(data, metadata);
	frame.series = [{type: 'pie', data: seriesDataInfo}];
	
	this.ChartTool.settingTitle(frame, metadata);
	this.ChartTool.settingLegend(frame, metadata);
	this.ChartTool.settingPieInfo(frame, metadata);
	
	return frame;
};

HChartTool.combi = function(parser, tool) {
	this.ChartTool = tool;
	this.Parser = parser;
};

HChartTool.combi.prototype.assembleChart = function(data, metadata) {
	var frame = this.ChartTool.frame;
	var seriesDataInfo = this.Parser.parse(data, metadata);
	
	frame.series = [];
	var metaSeriseStyleList = metadata.seriesStyle;
	for (var i in  metaSeriseStyleList) {
		var metaSeriesStyle = metaSeriseStyleList[i];
		var name = metaSeriesStyle.name;
		var type = metaSeriesStyle.type;
		
		var series = {type: type, name: name, data: seriesDataInfo[name]};
		
//		if (metadata.yAxisEnabled) {
//			this.ChartTool.settingYAxisTitle(frame, series, metaSeriesStyle);
//		}
		this.ChartTool.settingSeriesStyle(series, metaSeriesStyle);
		
		frame.series.push(series);
	}
	
	this.ChartTool.settingTitle(frame, metadata);
	this.ChartTool.settingLegend(frame, metadata);
	this.ChartTool.settingXAxis(frame, metadata, seriesDataInfo);
	this.ChartTool.settingYAxis(frame, metadata);
	
	return frame;
};
