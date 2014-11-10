HParser = function(type) {
	this.parser = this.getParser(type);
};

HParser.prototype.getParser = function (type) {
	if (type == Enum.ChartType.pie) {
		return new HParser.Pie();
	} else {
		return new HParser.Normal();
	}
};

HParser.prototype.parse = function(data, metadata) {
	return this.parser.parse(data, metadata);
};

HParser.Normal = function() {
};

HParser.Normal.prototype.parse = function(data, metadata) {
	var metaSeriesStyleList = metadata.seriesStyle;	
	var metaXAxis = metadata.xAxis;
	
	var seriesDataInfo = {};
	
	for (var j in  metaSeriesStyleList) {
		var seriesData = [];
		var metaSeriesStyle = metaSeriesStyleList[j];
		var seriesName = metaSeriesStyle.name;
				
		for (var i in data) {
			var row = data[i];
			
			var xValue = row[metaXAxis];
			var yValue = row[seriesName];
			
			seriesData.push([xValue, yValue]);
			seriesDataInfo[seriesName] = seriesData;
		}
	}	
	
	// x-axis
	var xaxisData = this.parseXAxis(metaXAxis, data);
	seriesDataInfo["x-axis"] = xaxisData;
	
	return seriesDataInfo;
};

HParser.Normal.prototype.parseXAxis = function(metaXAxis, data) {
	var xaxisDataList = [];
	for (var i in data) {
		var row = data[i];
		
		var xValue = row[metaXAxis];
		xaxisDataList.push(xValue);
	}
	return xaxisDataList;
};

HParser.Pie = function() {
};

HParser.Pie.prototype.parse = function(data, metadata) {
	var metaSeriesStyleList = metadata.seriesStyle;
	var seriesData = [];
	
	for (var j in  metaSeriesStyleList) {
		var metaSeriesStyle = metaSeriesStyleList[j];
		var seriesName = metaSeriesStyle.name;
		
		var row = data[0];		
		var value = row[seriesName];
		
		seriesData.push([seriesName, value]);
	}	
	return seriesData;
};