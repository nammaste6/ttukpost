package net.startup.controller;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import net.startup.service.MainServiceImpl;
import net.startup.vo.ClientVO;
import net.startup.vo.ThermalVO;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {
	
	@Resource(name="mainServiceImpl")
	MainServiceImpl service;
	static List<Double> listData = new ArrayList<Double>();
	static int cursor = 0;
	
	@RequestMapping("/graph")
	public ModelAndView test(@RequestParam int idx){
		JSONObject job = service.getAllGraphByClientIdToJSONArray(idx);
		ModelAndView mv = new ModelAndView("graph");
		mv.addObject("title", "수면 그래프");
		mv.addObject("job", job);
		return mv;
	}
	
	@RequestMapping("/login_redirect.do")
	public ModelAndView loginRedirect(@RequestParam String id, @RequestParam String pw){
		ModelAndView mv = new ModelAndView();
		return mv;
	}
	
	@RequestMapping("/login.do")
	public ModelAndView login(@RequestParam String id, @RequestParam String pw){
		listData.add(37.22);
		listData.add(37.78);
		listData.add(37.00);
		listData.add(36.54);
		listData.add(36.11);
		listData.add(35.80);
		listData.add(35.70);
		listData.add(35.65);
		listData.add(35.55);
		listData.add(35.37);

		ClientVO result = new ClientVO();
		result.setId(id);
		result.setPassword(pw);
		result.setName("admin");
//		ClientVO result = service.getClientByInfo(vo);
		
		long currentTime = System.currentTimeMillis();
		JSONArray arr = new JSONArray();
		for(int i = 0 ; i < 10 ; i++){
			JSONArray arr1 = new JSONArray();
			long currentTimeminus10s = currentTime -(10000-(1000*i));
			arr1.put(currentTimeminus10s);
			arr1.put(0);
			arr.put(arr1);
		}
		
		ModelAndView mv = new ModelAndView("start");
		if(id.equals("admin") && pw.equals("admin")){
			mv.setViewName("start");
			mv.addObject("vo", result);
			mv.addObject("dataset",arr);
		}else if(id.equals("abcd")&&id.equals("abcd")){
			mv.setViewName("redirect_login");
		}
		return mv;
	}
	
	@RequestMapping("redirect.do")
	public ModelAndView redirect(){
		
		long currentTime = System.currentTimeMillis();
		JSONArray arr = new JSONArray();
		for(int i = 0 ; i < 10 ; i++){
			JSONArray arr1 = new JSONArray();
			long currentTimeminus10s = currentTime -(10000-(1000*i));
			arr1.put(currentTimeminus10s);
			arr1.put(0);
			arr.put(arr1);
		}
		
		ModelAndView mv = new ModelAndView("start");
		mv.addObject("dataset", arr);
		return mv;
	}
	
	@RequestMapping(value="insert", method=RequestMethod.GET)
	public void insert(@RequestParam String device, @RequestParam double temp){

		for(int i = 0 ; i < 10 ; i ++){
			ThermalVO vo = new ThermalVO();
			vo.setClient_index(1);
			vo.setDevice(device);
			vo.setTemp(listData.get(i));
			vo.setDate(System.currentTimeMillis());
			service.insertThermalData(vo);
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	@RequestMapping("insertClient.do")
	public void insertClient(ClientVO vo){
		
	}
	
	@RequestMapping(value="/getOneData.do", method=RequestMethod.GET)
	public void getOneThermalData(HttpServletResponse response) throws JSONException, IOException{
//		ThermalVO vo = service.selectOneThermalData();
		JSONArray arr = new JSONArray();
		arr.put(System.currentTimeMillis());
		arr.put(listData.get(cursor));
		cursor++;
		if(cursor == listData.size()-1)
			cursor = 0;
		
		
		response.setContentType("application/json;charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Cache-Control", "no-cache");

		Writer writer = response.getWriter();
		writer.write(arr.toString());
		writer.flush();
	}
	
	
}
