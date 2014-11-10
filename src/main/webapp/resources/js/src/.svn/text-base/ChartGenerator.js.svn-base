function ChartGenerator(id, metadata){
	this.id = id;	
	this.containerId;
	this.metadata = metadata;
	
	this.Tool = Enum.ChartTemplate[metadata.template](id, this.metadata);
};

ChartGenerator.prototype.createContainer = function(position) {
	var style = {width: this.metadata.width, height: this.metadata.height};
	if (position) {
		var setPosition = false;
		if (position.top >= 0) {
			style.top = position.top;
			setPosition = true;
		}
		if (position.left >= 0) {
			style.left = position.left;
			setPosition = true;
		}
		if (setPosition) {
			style["z-index"] = 1;
			style["position"] = 'absolute';
		}
	}
	
    this.containerId = "graph_"+this.id;
	return jQuery('<div/>', {
        id: this.containerId
   }).css(style).appendTo('#container');
};

ChartGenerator.prototype.generate = function(dataset) {
    // create div element               
//	var containerId = "graph_"+this.id;
//    var container = this.createContainer(containerId);
//    container.addClass("graphContainerStyle");    

	return this.Tool.draw(this.containerId, dataset);
};

ChartGenerator.prototype.getChartTool = function() {
	return this.Tool;
};

ChartGenerator.prototype.callbackFunc = function() {
	var chartTool = this.tool;
	var graphData = this.data;
	
	chartTool.addData(graphData);
};

ChartGenerator.prototype.getMetadata = function() {
	return this.metadata;
};

ChartGenerator.prototype.getDynamicallyData = function(preview) {
	if (preview) {
		PreviewChartData.getDynamicallyData(this);
	} else {
		ChartDataRest.getDynamicallyData(this);
	}
};