package cn.hp.Liquor_culture.controller;

import java.sql.ResultSet;
import java.util.ArrayList;

import cn.hp.Liquor_culture.bean.Send_ALL_DATA;
import cn.hp.Liquor_culture.bean.Send_analysis_all;
import cn.hp.Liquor_culture.bean.Send_analysis_coefficient;
import cn.hp.Liquor_culture.bean.Send_analysis_total;
import cn.hp.Liquor_culture.bean.Send_predict_accuracy;
import cn.hp.Liquor_culture.bean.Send_predict_all;
import cn.hp.Liquor_culture.bean.Send_predict_total;
import cn.hp.Liquor_culture.dao.Sqlhander;
import net.sf.json.JSONArray;

public class test {

	public static void main(String[] args) {
		// TODO 自动生成的方法存根
		//查询分析阶段大部分数据
		String mysql = "SELECT * FROM analysis_phase_all;";
		Sqlhander sqlhelp = new Sqlhander();
		ArrayList<Send_analysis_all> all_data = new ArrayList<Send_analysis_all>();
		try {
			ResultSet rs = sqlhelp.check_part(mysql);				//接收查询结果
			while (rs.next()) {
				int year = rs.getInt("year");
				int GDP = rs.getInt("GDP");
				float XSL = rs.getFloat("XSL");
				int QK = rs.getInt("QK");
				float LS = rs.getFloat("LS");
				float SYL = rs.getFloat("SYL");
				String ZC_describe = rs.getString("ZC_describe");
				String ZC_describe_detailed = rs.getString("ZC_describe_detailed");
				float ZC_coefficient = rs.getFloat("ZC_coefficient");
				all_data.add(new Send_analysis_all(year, GDP, XSL, QK, LS, SYL, ZC_describe, ZC_describe_detailed, ZC_coefficient));
			}
			rs.close();
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		//单独查询分析阶段pearson相关系数等数据
		ArrayList<Send_analysis_coefficient> all_coefficient = new ArrayList<Send_analysis_coefficient>();
		String mysql2 = "SELECT * FROM analysis_phase_pearson;";
		try {
			ResultSet rs = sqlhelp.check_coefficient(mysql2);				//接收查询结果
			while (rs.next()) {
				String coefficient = rs.getString("coefficient");
				float XSL_SYL = rs.getFloat("XSL_SYL");
				float LS_SYL = rs.getFloat("LS_SYL");
				float QK_SYL = rs.getFloat("QK_SYL");
				float GDP_SYL = rs.getFloat("GDP_SYL");
				all_coefficient.add(new Send_analysis_coefficient(coefficient, XSL_SYL, LS_SYL, QK_SYL, GDP_SYL));
			}
			rs.close();
		} catch (Exception e1) {
			// TODO 自动生成的 catch 块
			e1.printStackTrace();
		}
		ArrayList<Send_analysis_total> total = new ArrayList<Send_analysis_total>();
		total.add(new Send_analysis_total(all_data, all_coefficient));
		
		//查询预测阶段prediction_phase_all表，内容无准确率
		ArrayList<Send_predict_all> predict_all = new ArrayList<Send_predict_all>();
		String mysql3 = "SELECT * FROM prediction_phase_all;";
		try {
			ResultSet rs = sqlhelp.check_predict(mysql3);				//接收查询结果
			while (rs.next()) {
				int predict_year = rs.getInt("year");
				float linear_method = rs.getFloat("linear_method");
				float single_LSTM_method = rs.getFloat("single_LSTM_method");
				float multi_LSTM_method = rs.getFloat("multi_LSTM_method");
				float really_value = rs.getFloat("really_value");
				predict_all.add(new Send_predict_all(predict_year, linear_method, single_LSTM_method, multi_LSTM_method, really_value));
			}
			rs.close();
		} catch (Exception e2) {
			// TODO 自动生成的 catch 块
			e2.printStackTrace();
		}
		
		//查询预测阶段prediction_phase_accuracy表，准确率
		ArrayList<Send_predict_accuracy> predict_accuracy = new ArrayList<Send_predict_accuracy>();
		String mysql4 = "SELECT * FROM prediction_phase_accuracy;";
		try {
			ResultSet rs = sqlhelp.check_predict(mysql4);				//接收查询结果
			while (rs.next()) {
				float linear_method_accuracy = rs.getFloat("linear_method_accuracy");
				float single_LSTM_method_accuracy = rs.getFloat("single_LSTM_method_accuracy");
				float multi_LSTM_method_accuracy = rs.getFloat("multi_LSTM_method_accuracy");
				predict_accuracy.add(new Send_predict_accuracy(linear_method_accuracy, single_LSTM_method_accuracy, multi_LSTM_method_accuracy));
			}
			rs.close();
		} catch (Exception e3) {
			// TODO 自动生成的 catch 块
			e3.printStackTrace();
		}
		ArrayList<Send_predict_total> total2 = new ArrayList<Send_predict_total>();
		total2.add(new Send_predict_total(predict_all, predict_accuracy));
		ArrayList<Send_ALL_DATA> REALLY_TOTAL = new ArrayList<Send_ALL_DATA>();
		REALLY_TOTAL.add(new Send_ALL_DATA(total, total2));
		JSONArray result = JSONArray.fromObject(REALLY_TOTAL);
		String fotmatStr = format(result.toString());
		System.out.println(fotmatStr);
	}

	/**
	 * 得到格式化json数据  退格用\t 换行用\r
	 */
	public static String format(String jsonStr) {
		int level = 0;
		StringBuffer jsonForMatStr = new StringBuffer();
		for(int i=0;i<jsonStr.length();i++){
			char c = jsonStr.charAt(i);
			if(level>0&&'\n'==jsonForMatStr.charAt(jsonForMatStr.length()-1)){
				jsonForMatStr.append(getLevelStr(level));
			}
			switch (c) {
			case '{':
			case '[':
				jsonForMatStr.append(c+"\n");
				level++;
				break;
			case ',':
				jsonForMatStr.append(c+"\n");
				break;
			case '}':
			case ']':
				jsonForMatStr.append("\n");
				level--;
				jsonForMatStr.append(getLevelStr(level));
				jsonForMatStr.append(c);
				break;
			default:
				jsonForMatStr.append(c);
				break;
			}
		}
 
		return jsonForMatStr.toString();
 
	}
 
	private static String getLevelStr(int level){
		StringBuffer levelStr = new StringBuffer();
		for(int levelI = 0;levelI<level ; levelI++){
			levelStr.append("\t");
		}
		return levelStr.toString();
	}
	
	
}
