package cn.hp.Liquor_culture.bean;

import java.util.ArrayList;

public class Send_predict_total {
	public ArrayList<Send_predict_all> predict;
	public ArrayList<Send_predict_accuracy> accuracy;
	public ArrayList<Send_predict_all> getPredict() {
		return predict;
	}
	public void setPredict(ArrayList<Send_predict_all> predict) {
		this.predict = predict;
	}
	public ArrayList<Send_predict_accuracy> getAccuracy() {
		return accuracy;
	}
	public void setAccuracy(ArrayList<Send_predict_accuracy> accuracy) {
		this.accuracy = accuracy;
	}
	
	public Send_predict_total(ArrayList<Send_predict_all> predict, ArrayList<Send_predict_accuracy> accuracy) {
		this.accuracy = accuracy;
		this.predict = predict;
	}
}
