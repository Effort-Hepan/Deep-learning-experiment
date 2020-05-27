package cn.hp.Liquor_culture.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Sqlhander {
	private String DBDriver = "com.mysql.jdbc.Driver";
	private String url = "jdbc:mysql://148.70.53.199:3306/Liquor_culture";
	private String id = "root";
	private String password = "1981544603";
	public Connection conn = null;
	public ResultSet rs = null;
	PreparedStatement perstat = null;
	public void setDBDriver(String DBDriver) {
		this.DBDriver = DBDriver;
	}
	public String getDBDriver() {
		return DBDriver;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getUrl() {
		return url;
	}
	public void setId(String id) {
		this.id= id;
	}
	public String getId() {
		return id;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPassword() {
		return password;
	}
	
	
	//查询分析阶段除相关系数外所有数据
	public ResultSet check_part(String mysql) throws Exception{
		try {
			Class.forName(DBDriver);
			conn = DriverManager.getConnection(url,id,password);
			perstat = conn.prepareStatement(mysql);
			//perstat.setString(1, user);
			//perstat.setString(2, psd);
			rs = perstat.executeQuery();
			return rs;
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println("查询表analysis_phase_all出错:" + e.getMessage());
		}
		return null;
	}
	
	//查询分析阶段相关系数
	public ResultSet check_coefficient(String mysql2) throws Exception{
		try {
			Class.forName(DBDriver);
			conn = DriverManager.getConnection(url,id,password);
			perstat = conn.prepareStatement(mysql2);
			rs = perstat.executeQuery();
			return rs;
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println("查询表analysis_phase_pearson出错：" + e.getMessage());
		}
		return null;
		
	}
	//查询预测阶段除准确率外全部数据
	public ResultSet check_predict(String mysql3) throws Exception{
		try {
			Class.forName(DBDriver);
			conn = DriverManager.getConnection(url,id,password);
			perstat = conn.prepareStatement(mysql3);
			rs = perstat.executeQuery();
			return rs;
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println("查询表prediction_phase_all出错：" + e.getMessage());
		}
		return null;
		
	}
	//查询预测阶段算法准确率
	public ResultSet check_predict_accuracy(String mysql4) throws Exception{
		try {
			Class.forName(DBDriver);
			conn = DriverManager.getConnection(url,id,password);
			perstat = conn.prepareStatement(mysql4);
			rs = perstat.executeQuery();
			return rs;
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println("查询表analysis_phase_pearson出错：" + e.getMessage());
		}
		return null;
		
	}
}
