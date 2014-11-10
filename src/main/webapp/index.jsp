<!DOCTYPE html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<html>
	<head>
		<meta charset="utf-8">
		<title>Welcome</title>
		<style type="text/css">
			body {background-color:#011223;margin:0 auto; padding:0px; width:720px; height:1240px;font-family: "Nanum Gothic", sans-serif;}
	
			img {width:auto; height:auto; display:inline-block;}

			.log{width:100% ; text-align:center; margin-top:50px}
			
			.login div{width:100%;text-align:center;color:white;}
			.login_input{border-radius:5px }
			
			.submit_button{
				border-radius:5px;
				width: 100px;
				height: 30px;
				margin-top: 20px;
			}
		</style>
	</head> 
	<body>
		<form action="login.do">
			<div class=log>
			<img src="${pageContext.request.contextPath}/resources/img/logo_white.png" />
			</div>
			<div class=login>
			<div>ID </div>
			<div><input type="text" id="id" name="id" class="login_input"></div>
			<div>PW</div>
			<div><input type="password" id="pw" name="pw" class="login_input"></div>
			</div>
			<div style="width:100;text-align:center">
			<input type="submit" value="login" class="submit_button">
			</div>
		</form>
	</body>
</html>
