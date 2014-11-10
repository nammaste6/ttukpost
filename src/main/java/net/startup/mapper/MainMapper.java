package net.startup.mapper;

import java.util.List;

import net.startup.vo.ClientVO;
import net.startup.vo.ThermalVO;

public interface MainMapper {
	// client 정보
	public List<ClientVO> getAllClient();
	public ClientVO getClientById(int idx);
	public ClientVO getClientByInfo(ClientVO vo);
	
	// graph 정보..
	public List<ThermalVO> getAllGraphByClientId(int client_index);
	public ThermalVO getGraphForTime();
	public void insertGraph(ThermalVO vo);
}
