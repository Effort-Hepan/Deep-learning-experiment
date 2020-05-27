package cn.hp.Liquor_culture.bean;

public class Send_analysis_coefficient {
	public String name;
	public float XSL_SYL;
	public float LS_SYL;
	public float QK_SYL;
	public float GDP_SYL;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getXSL_SYL() {
		return XSL_SYL;
	}
	public void setXSL_SYL(float xSL_SYL) {
		XSL_SYL = xSL_SYL;
	}
	public float getLS_SYL() {
		return LS_SYL;
	}
	public void setLS_SYL(float lS_SYL) {
		LS_SYL = lS_SYL;
	}
	public float getQK_SYL() {
		return QK_SYL;
	}
	public void setQK_SYL(float qK_SYL) {
		QK_SYL = qK_SYL;
	}
	public float getGDP_SYL() {
		return GDP_SYL;
	}
	public void setGDP_SYL(float gDP_SYL) {
		GDP_SYL = gDP_SYL;
	}
	public Send_analysis_coefficient(String name, float XSL_SYL, float LS_SYL, float QK_SYL, float GDP_SYL) {
		this.name = name;
		this.XSL_SYL = XSL_SYL;
		this.LS_SYL = LS_SYL;
		this.QK_SYL = QK_SYL;
		this.GDP_SYL = GDP_SYL;
	}
}
