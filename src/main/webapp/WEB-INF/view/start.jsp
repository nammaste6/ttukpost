<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
<style>
body {
	margin: 0 auto;
	padding: 0px;
	font-color: white;
	width: 720px;
	/* 	height: 1240px; */
	position: relative;
	font-family: "Nanum Gothic", sans-serif;
	font-size: 2em;
	background:
		url('${pageContext.request.contextPath}/resources/img/main_bg.png')
		no-repeat center center;
}

span {
	
}

a {
	text-decoration:none;
	color:white;
}

p{
	margin:0px;
}

#top {
	vertical-align: top;
	text-align:center;
	height:100px;
	background: -moz-linear-gradient(top,  rgba(1,18,35,0) 0%, rgba(1,18,35,0.05) 44%, rgba(1,18,35,1) 100%); /* FF3.6+ */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(1,18,35,0)), color-stop(44%,rgba(1,18,35,0.05)), color-stop(100%,rgba(1,18,35,1))); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(top,  rgba(1,18,35,0) 0%,rgba(1,18,35,0.05) 44%,rgba(1,18,35,1) 100%); /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(top,  rgba(1,18,35,0) 0%,rgba(1,18,35,0.05) 44%,rgba(1,18,35,1) 100%); /* Opera 11.10+ */
	background: -ms-linear-gradient(top,  rgba(1,18,35,0) 0%,rgba(1,18,35,0.05) 44%,rgba(1,18,35,1) 100%); /* IE10+ */
	background: linear-gradient(to bottom,  rgba(1,18,35,0) 0%,rgba(1,18,35,0.05) 44%,rgba(1,18,35,1) 100%); /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00011223', endColorstr='#011223',GradientType=0 ); /* IE6-9 */
}

.window {
	width: auto;
	height:600px;
}

.logo {
	height: 85px;
	width: auto;
	margin: 5px 0 0 20px;
	float:left;
}

.menu {
	float:right;
	margin:30px 20px 0 0;
}

.list {
	position: relative;
}

.list img{
}

#footer {
	vertical-align: bottom;
}

#temp {
	
}

#wakeup {
	
}
.board{
	padding:450px 0 0 180px;
}
.board div{
	display:inline;
}
.icon{
	line-height:45px;
	float:left;
}
</style>
<script type="text/javascript">
$( document ).click(function() {
	$( "#container" ).toggle( "unfold" );
	});
</script>
</head>
<body
	background="${pageContext.request.contextPath}/resources/img/main_bg.png">
	<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/highcharts-more.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>
	<div id="top">
		<img
			src="${pageContext.request.contextPath }/resources/img/logo_white.png"
			class="logo"> <img
			src="${pageContext.request.contextPath }/resources/img/menu_icon.png"
			class="menu">
	</div>
	<div class="window">
		
		<div class="board">
			<a style="color:white;font-size:3em;top: 470px;right: 375px;position:absolute">21</a>
			<div style="height:100px;float:left"><img src='${pageContext.request.contextPath }/resources/img/board1.png' style="">
			<p style="font-size:0.7em; color:white;text-align:center">취침시작온도</p>
			</div>
			<a style="color:white;font-size:3em;position:absolute;top: 470px;">10:23</a>
			<div style=""><img src='${pageContext.request.contextPath }/resources/img/board2.png' style="">
			<p style="font-size:0.7em; color:white;display:inline-block;padding:0 0 0 100px">기상시간</p>
			</div>
		</div>
	</div>
	<div class="list"
		style="background-color: rgba(43, 118, 119, 0.6); height: 120px;">
		<div style="padding:32px"><img src="${pageContext.request.contextPath }/resources/img/write_icon.png" class="icon">
		<p style="font-size:0.7em; color:white; line-height:45px"> <a href="./insertClient.do">켜짐/ 꺼짐 예약</a></p></div>
	</div>
	<div class="list"
		style="background-color: rgba(3, 24, 46, 0.8); height: 120px">
		<div style="padding:32px"><img src="${pageContext.request.contextPath }/resources/img/chart_icon.png"class="icon">
		<p style="font-size:0.7em; color:white; line-height:45px"> <a href="">시간별 체온 변화 그래프</a></p></div>
		<div id="container" style=""></div>
	</div>
	<div class="list"
		style="background-color: rgba(1, 18, 36, 0.9); height: 120px; z-index:-1"></div>
	<div id="footer">
		<img
			src="${pageContext.request.contextPath}/resources/img/main_select_bar5.png">
	</div>
	<script type="text/javascript">
// 	var job = JSON.parse('${job}'); // 그래프 데이터 
//     var xData = job.xAxis;
//     var yData = job.yAxis;
var chart ;
    $(document).ready(function() {
    	var data = '${dataset}';
    	var dataJson = JSON.parse(data);
    	var chartCong = {
    			chart: {
    				renderTo: 'container' 
    			},
    	        title: {
    	            text: 'title',
    	            x: -20 //center
    	        },
    	        xAxis: {
    	        	type: 'datetime',
    	        },
    	        yAxis: {
    	            title: {
    	                text: 'Temperature (°C)'
    	            },
    	            plotLines: [{
    	                value: 100000,
    	                width: 1,
    	                color: '#808080'
    	            }]
    	        },
    	        tooltip: {
    	            valueSuffix: '°C'
    	        },
    	        legend: {
    	            layout: 'vertical',
    	            align: 'right',
    	            verticalAlign: 'middle',
    	            borderWidth: 0
    	        },
    	        series: [{
    	        	name:'Test',
    	        	data:dataJson
    	        }]
    	    };
    	chart = new Highcharts.Chart(chartCong);
//     chart = $('#container').highcharts();
    setInterval('dynamicFunc()', 2000);
    });
    
    function dynamicFunc() {
		// ajax 
		var callback = callbackFunc;
		$.ajax({
				type:'GET',
				url: 'getOneData.do',
// 				url: 'login.do?id=admin&pw=admin',
				dataType: 'json',
				cache: false,
				async: true,
				success: function(data, textStatus) {
					if (!data) {
						console.error("Can't get chart data.");
					} else {
						callback.apply({'data':data});
					}
				}
			}).done(function(data, textStatus) {
				console.log("ajax done");
			}).fail(function(jqXHR, textStatus, error){
				errorHandler(jqXHR.responseText);
				console.error('failure: ', textStatus, 'error: ', error, jqXHR);
			});
		}
		// callbalcccccjj
    
    function callbackFunc(){
    	var seriesList = chart.series;
    	var floor = (!floor && floor !== 0)? 20 : floor;
    	var data = this.data;
    	for (var i in seriesList) {
    		var series = seriesList[i];
    		
    		var xValue = data[0];
    		var yValue = data[1];				
    		series.addPoint([xValue, yValue], true, true);
    	}
    }
    
	</script>
</body>
</html>