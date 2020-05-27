package cn.hp.Liquor_culture.bean;

public class Send_predict_all {
	public int year;
	public float linear_method;
	public float single_LSTM_method;
	public float multi_LSTM_method;
	public float really_value;
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public float getLinear_method() {
		return linear_method;
	}
	public void setLinear_method(float linear_method) {
		this.linear_method = linear_method;
	}
	public float getSingle_LSTM_method() {
		return single_LSTM_method;
	}
	public void setSingle_LSTM_method(float single_LSTM_method) {
		this.single_LSTM_method = single_LSTM_method;
	}
	public float getMulti_LSTM_method() {
		return multi_LSTM_method;
	}
	public void setMulti_LSTM_method(float multi_LSTM_method) {
		this.multi_LSTM_method = multi_LSTM_method;
	}
	public float getReally_value() {
		return really_value;
	}
	public void setReally_value(float really_value) {
		this.really_value = really_value;
	}
	
	public Send_predict_all(int year, float linear_method,float single_LSTM_method, float multi_LSTM_method, float really_value) {
		this.year = year;
		this.linear_method = linear_method;
		this.single_LSTM_method = single_LSTM_method;
		this.multi_LSTM_method = multi_LSTM_method;
		this.really_value = really_value;
	}
}
