package cn.hp.Liquor_culture.bean;

import java.util.ArrayList;

public class Send_ALL_DATA {
	public ArrayList<Send_analysis_total> Analysis;
	public ArrayList<Send_predict_total> Prediction;
	
	public ArrayList<Send_analysis_total> getAnalysis() {
		return Analysis;
	}
	public void setAnalysis(ArrayList<Send_analysis_total> analysis) {
		Analysis = analysis;
	}
	public ArrayList<Send_predict_total> getPrediction() {
		return Prediction;
	}
	public void setPrediction(ArrayList<Send_predict_total> prediction) {
		Prediction = prediction;
	}
	
	public Send_ALL_DATA(ArrayList<Send_analysis_total> Analysis, ArrayList<Send_predict_total> Prediction) {
		this.Analysis = Analysis;
		this.Prediction = Prediction;
	}
}
