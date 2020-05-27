package cn.hp.Liquor_culture.bean;

import java.util.ArrayList;

public class Send_analysis_total {
	public ArrayList<Send_analysis_all> sub_analysis;
	public ArrayList<Send_analysis_coefficient> coefficient;
	public ArrayList<Send_analysis_all> getSub_analysis() {
		return sub_analysis;
	}
	public void setSub_analysis(ArrayList<Send_analysis_all> sub_analysis) {
		this.sub_analysis = sub_analysis;
	}
	public ArrayList<Send_analysis_coefficient> getCoefficient() {
		return coefficient;
	}
	public void setCoefficient(ArrayList<Send_analysis_coefficient> coefficient) {
		this.coefficient = coefficient;
	}
	public Send_analysis_total(ArrayList<Send_analysis_all> sub_analysis, ArrayList<Send_analysis_coefficient> coefficient) {
		this.sub_analysis = sub_analysis;
		this.coefficient = coefficient;
	}
}
