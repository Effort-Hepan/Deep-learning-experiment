package cn.hp.Liquor_culture.bean;

/*
 * 用于返回前台关于算法分析阶段的数据
 * 
 */

public class Send_analysis_all {
	public int year;
	public int GDP;
	public float XSL;
	public int QK;
	public float LS;
	public float SYL;
	public String ZC_describe;
	public String ZC_describe_detailed;
	public float ZC_coefficient;
	
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public int getGDP() {
		return GDP;
	}
	public void setGDP(int gDP) {
		GDP = gDP;
	}
	public float getXSL() {
		return XSL;
	}
	public void setXSL(float xSL) {
		XSL = xSL;
	}
	public int getQK() {
		return QK;
	}
	public void setQK(int qK) {
		QK = qK;
	}
	public float getLS() {
		return LS;
	}
	public void setLS(float lS) {
		LS = lS;
	}
	public float getSYL() {
		return SYL;
	}
	public void setSYL(float sYL) {
		SYL = sYL;
	}
	public String getZC_describe() {
		return ZC_describe;
	}
	public void setZC_describe(String zC_describe) {
		ZC_describe = zC_describe;
	}
	public String getZC_describe_detailed() {
		return ZC_describe_detailed;
	}
	public void setZC_describe_detailed(String zC_describe_detailed) {
		ZC_describe_detailed = zC_describe_detailed;
	}
	public float getZC_coefficient() {
		return ZC_coefficient;
	}
	public void setZC_coefficient(float zC_coefficient) {
		ZC_coefficient = zC_coefficient;
	}
	
	public Send_analysis_all(int year,int GDP,float XSL,int QK,float LS,float SYL,String ZC_describe,String ZC_describe_detailed,float ZC_coefficient) {
		this.year = year;
		this.GDP = GDP;
		this.XSL = XSL;
		this.QK = QK;
		this.LS = LS;
		this.SYL = SYL;
		this.ZC_describe = ZC_describe;
		this.ZC_describe_detailed = ZC_describe_detailed;
		this.ZC_coefficient = ZC_coefficient;
	}
}
