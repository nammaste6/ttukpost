package net.startup.service;

import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import net.startup.mapper.MainMapper;
import net.startup.vo.ClientVO;
import net.startup.vo.ThermalVO;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service("mainServiceImpl")
public class MainServiceImpl {
	
	@Inject
	MainMapper dao;
	
	public ClientVO getClientByInfo(ClientVO vo){
		return dao.getClientByInfo(vo);
	}
	
	public JSONObject getAllGraphByClientIdToJSONArray(int client_index){
		List<ThermalVO> list = dao.getAllGraphByClientId(client_index);
		return transferToJSON(list);
	}
	
	private JSONObject transferToJSON(List<ThermalVO> list){
		JSONObject result = new JSONObject();
		JSONArray yAxis = new JSONArray();
		JSONArray arr1 = new JSONArray();

		for(int i = 0 ; i < 10 ; i++ ){
			try {
				ThermalVO vo = list.get(i);
				yAxis.put(vo.getTemp());
				arr1.put(vo.getDate());
				Date d = new Date(vo.getDate());
				result.put("xAxis", d.getMinutes());
				result.put("yAxis", yAxis);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return result;
	}
	
	public ThermalVO selectOneThermalData(){
		return dao.getGraphForTime();
	}
	
	public void insertThermalData(ThermalVO vo){
		dao.insertGraph(vo);
	}
}
