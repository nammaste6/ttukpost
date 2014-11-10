package net.startup.vo;

public class ThermalVO {
	private String device;
	private int client_index;
	private double temp;
	private long date;
	
	public String getDevice(){
		return device;
	}
	public void setDevice(String device){
		this.device = device;
	}
	public int getClient_index() {
		return client_index;
	}
	public void setClient_index(int client_index) {
		this.client_index = client_index;
	}
	public double getTemp() {
		return temp;
	}
	public void setTemp(double temp) {
		this.temp = temp;
	}
	public long getDate() {
		return date;
	}
	public void setDate(long date) {
		this.date = date;
	}
	@Override
	public String toString() {
		return "ThermalVO [client_index=" + client_index
				+ ", temp=" + temp + ", date=" + date + "]";
	}
}
