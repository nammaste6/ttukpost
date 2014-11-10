<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<style type="text/css">
			body {background-color:#011223;margin:0 auto; padding:0px; width:720px; height:1240px;font-family: "Nanum Gothic", sans-serif;}
	
			img {width:auto; height:auto; display:inline-block;}

</style>
</head>
<body>
<% response.setHeader("Refresh", "2;URL=./redirect.do"); %> 
<img src="${pageContext.request.contextPath}/resources/img/pop_up2.png">
</body>
</html>