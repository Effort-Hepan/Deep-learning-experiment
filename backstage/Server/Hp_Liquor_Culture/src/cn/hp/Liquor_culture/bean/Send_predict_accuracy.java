package cn.hp.Liquor_culture.bean;

public class Send_predict_accuracy {
	public float linear_method_accuracy;
	public float single_LSTM_method_accuracy;
	public float multi_LSTM_method_accuracy;
	public float getLinear_method_accuracy() {
		return linear_method_accuracy;
	}
	public void setLinear_method_accuracy(float linear_method_accuracy) {
		this.linear_method_accuracy = linear_method_accuracy;
	}
	public float getSingle_LSTM_method_accuracy() {
		return single_LSTM_method_accuracy;
	}
	public void setSingle_LSTM_method_accuracy(float single_LSTM_method_accuracy) {
		this.single_LSTM_method_accuracy = single_LSTM_method_accuracy;
	}
	public float getMulti_LSTM_method_accuracy() {
		return multi_LSTM_method_accuracy;
	}
	public void setMulti_LSTM_method_accuracy(float multi_LSTM_method_accuracy) {
		this.multi_LSTM_method_accuracy = multi_LSTM_method_accuracy;
	}
	
	public Send_predict_accuracy(float linear_method_accuracy,float single_LSTM_method_accuracy,float multi_LSTM_method_accuracy) {
		this.linear_method_accuracy = linear_method_accuracy;
		this.single_LSTM_method_accuracy = single_LSTM_method_accuracy;
		this.multi_LSTM_method_accuracy = multi_LSTM_method_accuracy;
	}
}
