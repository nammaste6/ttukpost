/*function HChartTool(id, chartType, metadata) {
	this.id = id;
	this.options = metadata;
	this.chartType = chartType;
	this.frame = this.getFrame(chartType);
	
	this.Chart;
};

HChartTool.prototype.draw = function(containerId, data) {
	this.setLast(data.last);
	var chart = this.frame;
	
	this.settingEssentialOptions(containerId, data);	
	if (this.options) this.settingSpecificOptions();
	
//	alert(JSON.stringify(chart));
	console.log(JSON.stringify(chart));
	
	var x = new Date();
	var currentTimeZoneOffsetInHours = x.getTimezoneOffset()
	
	Highcharts.setOptions({// This is for all plots, change Date axis to local timezone
        global : {
            useUTC : false,
            timezoneOffset: currentTimeZoneOffsetInHours
        },
        lang: {
        	noData: 'No Data'
        }
    });
	this.Chart = new Highcharts.Chart(chart);
};

HChartTool.prototype.getId = function() {
	return this.id;
};

HChartTool.prototype.setLast = function(last) {
	this.last = last;
};

HChartTool.prototype.getLast = function() {
	return this.last;
};

HChartTool.prototype.getMetadata = function() {
	return this.options;
};

HChartTool.prototype.addPoint = function(chartData) {
	this.last = chartData.last;
	var data = chartData.data;
	var series = this.Chart.series;
	for (var i in series) {
		var x = this.last;
		Date xTime = new Date();
		xTime.setTime(x);
		
		console.log("▷▷▷▷▷▷▷▷▷▷▷▷▷▷▷▷▷▷▷");
		console.log(xTime);
		var y = data[i];
		if (y != undefined) series[i].addPoint([x, y], true, true);
	}
};

HChartTool.prototype.settingEssentialOptions = function(containerId, data) {
	var chart = this.frame;
	
	chart.chart.renderTo = containerId;
	chart.series = data.series;
	if (data.xAxis != null) chart.xAxis = data.xAxis;
};

HChartTool.prototype.getFrame = function(chartType) {
	var frame = undefined;
	if (chartType == "area") {
		frame = this.area();
	} else if (chartType == "bar") {
		frame = this.bar();
    } else if (chartType == "column") {
    	frame = this.column();
	} else if (chartType == "combi") {
		frame = this.combi();
	} else if (chartType == "line") {
		frame = this.line();
	}else if (chartType == "pie") {
		frame = this.pie();
	} else if (chartType == "spline") {
		frame = this.spline();
	}	
	return frame;
};

HChartTool.prototype.area = function() {
	var area = {
		    chart: {
		        type: "area",
		        animation: Highcharts.svg
		    },
		    credits: {
		    	enabled: false
		    },
		    title: {
		        text: "",
		        x: -20
		    },
		    subtitle: {
		        text: "",
		        x: -20
		    },
		    xAxis: {
		    	labels : {},
		        categories: []
		    },
		    yAxis: {
		        title: {
		            text: ""
		        },
		        plotLines: [
		            {
		                value: 0,
		                width: 1,
		                color: "#808080"
		            }
		        ],        
		        labels : {}
		    },
		    plotOptions: {
		        area: {
//		            dataLabels : {
//		                enabled: true,
//		                 format: "{y}"
//		            },
//		            marker: {
//		                radius: 2,
//		                enabled: true,
//		                symbol: "",
//		                states: {
//		                     hover: {
//		                         enabled: true
//		                       }
//		                }
//		            },
//		            lineWidth: 2
		        },
		        series: {
		            
		        }
		    },
		    tooltip: {
		        valueSuffix: ""
		    },
		    legend: {
		        layout: "bottom",
		        align: "center",
		        verticalAlign: "bottom",
		        borderWidth: 1
		    }
		};
	
	return area;
};

HChartTool.prototype.bar = function() {
	var bar = {
		    chart: {
		        type: "bar",
		        animation: Highcharts.svg
		    },
		    credits: {
		    	enabled: false
		    },
		    title: {
		        text: "",
		        x: -20
		    },
		    subtitle: {
		        text: "",
		        x: -20
		    },
		    xAxis: {
		    	labels : {},
		        categories: []
		    },
		    yAxis: {
		        title: {
		            text: ""
		        },
		        plotLines: [
		            {
		                value: 0,
		                width: 1,
		                color: "#808080"
		            }
		        ],        
		        labels : {}
		    },
		    plotOptions: {
		        bar: {
		            dataLabels : {
		                enabled: true,
		                 format: "{y}"
		            },
		            marker: {}		            
		        },
		        series: {}
		    },
		    tooltip: {
		        valueSuffix: ""
		    },
		    legend: {
		        layout: "bottom",
		        align: "center",
		        verticalAlign: "bottom",
		        borderWidth: 1
		    }
		};
	
	return bar;
};

HChartTool.prototype.column = function() {
	var column = {
		    chart: {
		        type: "column",
		        animation: Highcharts.svg
		    },
		    credits: {
		    	enabled: false
		    },
		    title: {
		        text: "",
		        x: -20
		    },
		    subtitle: {
		        text: "",
		        x: -20
		    },
		    xAxis: {
		    	labels : {},
		        categories: []
		    },
		    yAxis: {
		        title: {
		            text: ""
		        },
		        plotLines: [
		            {
		                value: 0,
		                width: 1,
		                color: "#808080"
		            }
		        ],        
		        labels : {}
		    },
		    plotOptions: {
		    	column: {
		            dataLabels : {
		                enabled: true,
		                 format: "{y}"
		            },
		            marker: {},
		            pointPadding: 0.1,
		            borderWidth: 0,
		            borderColor: "white",
		            groupPadding: 0.2,
		            shadow: false,
		        },
		        series: {}
		    },
		    tooltip: {
		        valueSuffix: ""
		    },
		    legend: {
		        layout: "bottom",
		        align: "center",
		        verticalAlign: "bottom",
		        borderWidth: 1
		    }
		};
	
	return column;
};

HChartTool.prototype.combi = function() {
	var combi = {
			chart: {
				animation: Highcharts.svg
			},
			credits: {
		    	enabled: false
		    },
		    title: {
		        text: "",
		        x: -20
		    },
		    subtitle: {
		        text: "",
		        x: -20
		    },
		    xAxis: {
		    	labels : {},
		        categories: []
		    },
		    yAxis: {
		        title: {
		            text: ""
		        },
		        plotLines: [
		            {
		                value: 0,
		                width: 1,
		                color: "#808080"
		            }
		        ],        
		        labels : {}
		    },		    
		    tooltip: {
		        valueSuffix: ""
		    },
		    legend: {
		        layout: "bottom",
		        align: "center",
		        verticalAlign: "bottom",
		        borderWidth: 1
		    }
		};	
	return combi;
};

HChartTool.prototype.line = function() {
	var line = {
		    chart: {
		        type: "line",
		        animation: Highcharts.svg
		    },
		    credits: {
		    	enabled: false
		    },
		    title: {
		        text: "",
		        x: -20
		    },
		    subtitle: {
		        text: "",
		        x: -20
		    },
		    xAxis: {
		    	labels : {},
		        categories: []
		    },
		    yAxis: {
		        title: {
		            text: ""
		        },
		        plotLines: [
		            {
		                value: 0,
		                width: 1,
		                color: "#808080"
		            }
		        ],        
		        labels : {}
		    },
		    plotOptions: {
		    	line: {
		            dataLabels : {
		                enabled: true,
		                 format: "{y}"
		            },
		            marker: {
		            	radius: 4,
		            	enabled: true,
		            	symbol: "" 
		            },
		            lineWidth: 2
		        },
		        series: {}
		    },
		    tooltip: {
		        valueSuffix: ""
		    },
		    legend: {
		        layout: "bottom",
		        align: "center",
		        verticalAlign: "bottom",
		        borderWidth: 1
		    }
		};
	
	return line;
};

HChartTool.prototype.pie = function() {
	var pie = {
		    chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: null,
		        plotShadow: false
		    },
		    credits: {
		    	enabled: false
		    },
		    title: {
		        text: "",
		        x: -20
		    },
		    subtitle: {
		        text: "",
		        x: -20
		    },
		    plotOptions: {
		        pie: {
		            allowPointSelect: true,
		            cursor: "pointer",
		            dataLabels : {
		                enabled: true,
		                format: "<b>{point.name}</b>: {point.percentage:.1f} ",
		                style: {
		                    color: "(Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'"
		                }
		            },
		            marker: {},
		        },
		        series: {
		            
		        }
		    },
		    tooltip: {
		        valueSuffix: ""
		    },
		    legend: {
		        layout: "bottom",
		        align: "center",
		        verticalAlign: "bottom",
		        borderWidth: 1
		    }
		};	
	return pie;
};

HChartTool.prototype.spline = function() {
	var spline = {
		    chart: {
		        type: "spline",
		        animation: Highcharts.svg
		    },
		    credits: {
		    	enabled: false
		    },
		    title: {
		        text: "",
		        x: -20
		    },
		    subtitle: {
		        text: "",
		        x: -20
		    },
		    xAxis: {
		    	labels : {},
		        categories: []
		    },
		    yAxis: {
		        title: {
		            text: ""
		        },
		        plotLines: [
		            {
		                value: 0,
		                width: 1,
		                color: "#808080"
		            }
		        ],        
		        labels : {}
		    },
		    plotOptions: {
		    	spline: {
//		            dataLabels : {
//		                enabled: true,
//		                 format: "{y}"
//		            },
//		            marker: {
//		            	radius: 4,
//		            	enabled: true,
//		            	symbol: "" 
//		            },
//		            lineWidth: 2
		        },
		        series: {}
		    },
		    tooltip: {
		        valueSuffix: ""
		    },
		    legend: {
		        layout: "bottom",
		        align: "center",
		        verticalAlign: "bottom",
		        borderWidth: 1
		    }
		};
	
	return spline;
};

HChartTool.prototype.settingSpecificOptions = function() {
	var chart = this.frame;
	var option = this.options;
	
	this.settingTitleOptions(option, chart);
//	this.settingPlotOptions(option, chart.plotOptions);
//	this.settingTooltip(option, chart.tooltip);
	this.settingLegend(option, chart.legend);
	this.settingXAxis(option, chart);
	this.settingYAxis(option, chart);
	this.settingSeries(option, chart);	
	
};

HChartTool.prototype.settingTitleOptions = function(option, plotOptions) {
	if (option.title) {
		plotOptions.title.text = option.title;
	}
	if (option.subTitle) {
		plotOptions.subtitle.text = option.subTitle;
	}
};

HChartTool.prototype.settingPlotOptions = function(option, plotOptions) {
	var type = this.chartType;
	if (option.seriesStep) {
		plotOptions.series.step = option.seriesStep;
	}
	if (option.seriesDashStyle) {
		plotOptions.series.dashStyle = option.seriesDashStyle;
	}
	if (option.dataLabelsEnabled != undefined) {
		plotOptions[type].dataLabels.enabled = option.dataLabelsEnabled;
	}
	if (option.markerRadius) {
		plotOptions[type].marker.radius= option.markerRadius;
	}
	if (option.markerEnabled != undefined) {
		plotOptions[type].marker.enabled= option.markerEnabled;
	}
	if (option.markerSymbol) {
		plotOptions[type].marker.symbol= option.markerSymbol;
	}
	if (option.lineWidth) {
		plotOptions[type].lineWidth= option.lineWidth;
	}
	if (option.pointPadding) {
		plotOptions[type].pointPadding= option.pointPadding;
	}
	if (option.groupPadding) {
		plotOptions[type].groupPadding= option.groupPadding;
	}
	if (option.shadow) {
		plotOptions[type].shadow= option.shadow;
	}
	if (option.cursor) {
		plotOptions[type].cursor= option.cursor;
	}
	if (option.valueSuffix) {
		var format = plotOptions[type].dataLabels.format;
		plotOptions[type].dataLabels.format = format + option.valueSuffix;
	}
};

HChartTool.prototype.settingTooltip = function(option, tooltip) {
	if (option.valueSuffix) {
		tooltip.valueSuffix = option.valueSuffix;
	}
};

HChartTool.prototype.settingLegend = function(option, legend) {
	
	legend.enabled = option.legendEnabled;
	if (option.legendEnabled) {	
		if (option.legendLayout) {
			legend.layout = option.legendLayout;
		}
		if (option.legendAlign) {
			legend.align = option.legendAlign;
		}
		if (option.legendVerticalAlign) {
			legend.verticalAlign = option.legendVerticalAlign;
		}	
	}
};

HChartTool.prototype.settingXAxis = function(option, chart) {
	chart.xAxis.labels = {};
	chart.xAxis.labels.enabled = option.xAxisEnabled;
};

HChartTool.prototype.settingYAxis = function(option, chart) {
	if (chart.yAxis != undefined) {
		if (!option.yAxisEnabled) {
			chart.yAxis.labels.enabled = option.yAxisEnabled;			
		} 
	}
	
//	var multiYaxis = false;
//	if (option.yAxisTitle) {
//		var yAxisTitle = option.yAxisTitle;
//		if (yAxisTitle.length > 1) {
//			multiYaxis = true;
//			var arrYaxis = [];
//			
//			arrYaxis.push({title: {text: yAxisTitle[0]}, labels: {}});
//			arrYaxis.push({opposite: true, title : {text:yAxisTitle[1]}, labels: {}});
//			chart.yAxis = arrYaxis;
//			multiYaxis = true;
//		} else {
//			chart.yAxis.title.text = yAxisTitle[0];
//		}
//		
//	}
//	
//	if (option.yAxisLabels) {
//		var labels = option.yAxisLabels
//		if (multiYaxis)  {
//			for (var i in labels) {
//				chart.yAxis[i].labels.format = "{value} "+labels[i];
//			}
//		} else {
//			chart.yAxis.labels.format = "{value} "+labels[0];
//		}		
//	}
};

HChartTool.prototype.findSeries = function(name, series) {
	if (this.chartType == "pie") return series[0];
	
	for (var i in series) {
		var sobject = series[i];
		if (sobject.name == name) {
			return sobject;
		}
	}
	return null;
};

HChartTool.prototype.settingSeries = function(option, chart) {
	var seriesStyle = option.seriesStyle;
	for (var i in seriesStyle) {
		var sStyle = seriesStyle[i];
		var chartSeriesObj = this.findSeries(sStyle.name, chart.series);
		
		// setting yAxis
		if (option.yAxisEnabled) {
			if (option.yAxisTitle) {
				if (option.yAxisTitle.length > 1) { // multi yaxis
					chartSeriesObj.yAxis = sStyle.yAxisIndex;
					chart.yAxis = [];
					chart.yAxis.push({
						title: {text: option.yAxisTitle[0]},
					});
					chart.yAxis.push({
						title: {text: option.yAxisTitle[1]},
						opposite: true
					});
				}
			}
		}
		
		this.settingSeriesStyle(sStyle, chartSeriesObj);
	}
};



//HChartTool.prototype.settingSeries = function(option, series) {
//	for (var i in series) {
//		var sobject = series[i];
//		
//		if (option.yAxisTitle) {
//			console.log(option);
//			if (option.yAxisTitle.length > 1) { // multi yaxis
//				sobject.yAxis = option.seriesYAxisIndex[i];			
//			}
//		}
//		var seriesStyle = option.seriesStyle;
//		if (seriesStyle) {
//			this.settingSeriesStyle(seriesStyle[i], sobject);
//		}
//	}
//};

HChartTool.prototype.settingSeriesStyle = function(style, sobject) {
	if (!style) return;
	
	if (style.dataLabelsEnabled != undefined) {
		sobject.dataLabels = {enabled: style.dataLabelsEnabled};
	}
	sobject.marker = {};
	if (style.markerEnabled != undefined) {
		sobject.marker.enabled = style.markerEnabled;
	}
	if (style.markerRadius) {
		sobject.marker.radius = style.markerRadius;
	}
	if (style.markerSymbol) {
		sobject.marker.symbol = style.markerSymbol;
	}
	if (style.seriesDashStyle) {
		sobject.dashStyle = style.seriesDashStyle;
	}
	if (style.seriesStep) {
		//if (style.seriesStep != 'none')
		sobject.step = style.seriesStep;
	}
	if (style.valueSuffix) {
		sobject.tooltip = {valueSuffix: style.valueSuffix};
	}
	if (style.pointPadding) {
		sobject.pointPadding = style.pointPadding;
	}
	if (style.groupPadding) {
		sobject.groupPadding = style.groupPadding;
	}
	if (style.lineWidth) {
		sobject.lineWidth = style.lineWidth;
	}
};

*/