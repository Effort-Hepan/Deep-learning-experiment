import numpy as np
import matplotlib.pyplot as plt
import json
import pandas as pd
from sklearn.linear_model import LinearRegression

with open("C:\\Users\\eternal\\Desktop\\毕设\\源码\\Liquor-culture\\origin_data\\各省白酒商用量.json","r",encoding="utf8", ) as f:
	origin = json.load(f)
	y_data = origin['country']['year']

with open("C:\\Users\\eternal\\Desktop\\毕设\\源码\\Liquor-culture\\origin_data\\人均可支配收入(年)_政策.json","r",encoding="utf8", ) as f1:
	origin_GDP = json.load(f1)
	y_data_GDP = origin_GDP['years']
	for m in range(8, 27):
		y_data_GDP.insert(0, None)

with open("C:\\Users\\eternal\\Desktop\\毕设\\源码\\Liquor-culture\\origin_data\\白酒销售量_产销率.json","r",encoding="utf8", ) as f2:
	origin_SALE = json.load(f2)
	y_data_SALE = origin_SALE['years']
	for m in range(0, 4):
		y_data_SALE.insert(0, None)

with open("C:\\Users\\eternal\\Desktop\\毕设\\源码\\Liquor-culture\\origin_data\\期刊发布量.json","r",encoding="utf8", ) as f3:
	origin_QK = json.load(f3)
	y_data_QK = origin_QK['years']

with open("C:\\Users\\eternal\\Desktop\\毕设\\源码\\Liquor-culture\\origin_data\\粮食产量.json","r",encoding="utf8", ) as f4:
	origin_LS = json.load(f4)
	y_data_LS = origin_LS['years']

x_data = list()
for i in range(1994, 2020):
	str_con = str(i) + '年'
	x_data.append(str_con)

plt.figure(num=1, figsize=[20, 20])
ax1 = plt.subplot(4, 3, 1)
plt.sca(ax1)
plt.plot(x_data, y_data, label="白酒商用量", color='r')
plt.legend()  #显示图形的图例
plt.rcParams['font.sans-serif'] = ['SimHei'] #显示中文标签商
plt.rcParams['axes.unicode_minus'] = False
plt.grid(axis="x", linestyle='--')
plt.xticks(rotation=50)
plt.twinx()  # 添加一条Y轴，
plt.plot(x_data, y_data_GDP, label="人均可支配收入", color='#00FF00')
plt.legend(loc="upper right")  #显示图形的图例


ax2 = plt.subplot(4, 3, 2)
plt.sca(ax2)
plt.plot(x_data, y_data, label="白酒商用量", color='r')
plt.legend()  #显示图形的图例
plt.rcParams['font.sans-serif'] = ['SimHei'] #显示中文标签商
plt.rcParams['axes.unicode_minus'] = False
plt.grid(axis="x", linestyle='--')
plt.xticks(rotation=50)
plt.plot(x_data, y_data_SALE, label="白酒销售量", color='#0000FF')
plt.legend(loc="upper right")  #显示图形的图例

ax3 = plt.subplot(4, 3, 3)
plt.sca(ax3)
plt.plot(x_data, y_data, label="白酒商用量", color='r')
plt.legend()  #显示图形的图例
plt.rcParams['font.sans-serif'] = ['SimHei'] #显示中文标签商
plt.rcParams['axes.unicode_minus'] = False
plt.grid(axis="x", linestyle='--')
plt.xticks(rotation=50)
plt.twinx()  # 添加一条Y轴，
plt.plot(x_data, y_data_QK, label="期刊发布量", color='#000000')
plt.legend(loc="upper right")  #显示图形的图例

ax5 = plt.subplot(4,2,3)
plt.sca(ax5)
plt.plot(x_data, y_data, label="白酒商用量", color='r')
plt.legend()  #显示图形的图例
plt.rcParams['font.sans-serif'] = ['SimHei'] #显示中文标签商
plt.rcParams['axes.unicode_minus'] = False
plt.grid(axis="x", linestyle='--')
plt.xticks(rotation=50)
plt.twinx()  # 添加一条Y轴，
plt.plot(x_data, y_data_LS, label="粮食产量", color='deepskyblue')
plt.legend(loc="upper right")  #显示图形的图例


a_pearson = abs(round(pd.Series(y_data).corr(pd.Series(y_data_GDP)), 4))
b_pearson = round(pd.Series(y_data).corr(pd.Series(y_data_SALE)), 4)
c_pearson = round(pd.Series(y_data).corr(pd.Series(y_data_QK)), 4)
d_pearson = round(pd.Series(y_data).corr(pd.Series(y_data_LS)),4)

a_spearman = abs(round(pd.Series(y_data).corr(pd.Series(y_data_GDP), method='spearman'), 4))
b_spearman = round(pd.Series(y_data).corr(pd.Series(y_data_SALE), method="spearman"), 4)
c_spearman = round(pd.Series(y_data).corr(pd.Series(y_data_QK), method="spearman"), 4)
d_spearman = round(pd.Series(y_data).corr(pd.Series(y_data_LS), method="spearman"), 4)

a_kendall = abs(round(pd.Series(y_data).corr(pd.Series(y_data_GDP), method='kendall'), 4))
b_kendall = round(pd.Series(y_data).corr(pd.Series(y_data_SALE), method="kendall"), 4)
c_kendall = round(pd.Series(y_data).corr(pd.Series(y_data_QK), method="kendall"), 4)
d_kendall = round(pd.Series(y_data).corr(pd.Series(y_data_LS), method="kendall"), 4)

ax4 = plt.subplot(4, 2, 4)
plt.sca(ax4)
x_bar = np.arange(4)  # 柱状图在横坐标上的位置
x_bar_label = list()
x_bar_label.extend(['人均可支配收入', '白酒销售量', '粮食产量', '期刊发布量'])
a_bar, b_bar, c_bar, d_bar = list(), list(), list(), list()

a_bar.append(a_pearson)
a_bar.append(b_pearson)
a_bar.append(d_pearson)
a_bar.append(c_pearson)

b_bar.append(a_spearman)
b_bar.append(b_spearman)
b_bar.append(d_spearman)
b_bar.append(c_spearman)

c_bar.append(a_kendall)
c_bar.append(b_kendall)
c_bar.append(d_kendall)
c_bar.append(c_kendall)

plt.bar(x_bar, a_bar, 0.3, color='salmon', label='pearson相关系数')
plt.bar(x_bar + 0.3, b_bar, 0.3, color='orchid',label='spearman相关系数')
plt.bar(x_bar + 0.6, c_bar, 0.3, color='b',label='kendall相关系数')
plt.legend()  #显示图形的图例
plt.rcParams['font.sans-serif'] = ['SimHei'] #显示中文标签商
plt.rcParams['axes.unicode_minus'] = False
plt.grid(axis="x", linestyle='--')
plt.xticks(x_bar + 0.6/2, x_bar_label)


sub_y_data, sub_y_data2, sub_y_data_GDP, sub_y_data_SALE = y_data[:],  y_data[:], y_data_GDP[:], y_data_SALE[:]
for num in range(19):
	del sub_y_data[0]
	del sub_y_data_GDP[0]
for num in range(4):				# 数据长度不一，进行处理
	del sub_y_data2[0]
	del sub_y_data_SALE[0]

# X对Y的影响
reg = LinearRegression()
ax1_1 = plt.subplot(4, 3, 7)
plt.sca(ax1_1)
#  reshape(行数，列数)常用来更改数据的行列数目，这里-1是指未设定行数，程序随机分配，所以这里-1表示任一正整数
# 所以reshape(-1,1)表示（任意行，1列）
reg.fit(np.array(sub_y_data_GDP).reshape(-1, 1),  np.array(sub_y_data).reshape(-1, 1))
predictions = reg.predict(np.array(sub_y_data_GDP).reshape(-1, 1))
plt.plot(sub_y_data_GDP,  predictions, color='r')
print("商用量-人均GDP-线性模型: (白酒商用量) = {:.5f} {:+.5f}(人均GDP)".format(reg.intercept_[0], reg.coef_[0][0]))
plt.scatter(y_data_GDP,  y_data, color='r')
plt.rcParams['font.sans-serif'] = ['SimHei'] #显示中文标签商
plt.rcParams['axes.unicode_minus'] = False
plt.grid(axis="x", linestyle='--')
plt.xlabel('白酒商用量')
plt.ylabel('人均GDP')

ax2_2 = plt.subplot(4, 3, 8)
plt.sca(ax2_2)
reg.fit(np.array(sub_y_data_SALE).reshape(-1, 1),  np.array(sub_y_data2).reshape(-1, 1))
predictions = reg.predict(np.array(sub_y_data_SALE).reshape(-1, 1))
plt.plot(sub_y_data_SALE,  predictions, color='#0000FF')
print("商用量-销售量-线性模型: (白酒商用量) = {:.5f} {:+.5f}(白酒销售量)".format(reg.intercept_[0], reg.coef_[0][0]))
plt.scatter(y_data_SALE, y_data, color='#0000FF')
plt.rcParams['font.sans-serif'] = ['SimHei'] #显示中文标签商
plt.rcParams['axes.unicode_minus'] = False
plt.grid(axis="x", linestyle='--')
plt.xlabel('白酒商用量')
plt.ylabel(' 白酒销售量')

ax3_3 = plt.subplot(4, 3, 9)
plt.sca(ax3_3)
reg.fit(np.array(y_data_QK).reshape(-1, 1),  np.array(y_data).reshape(-1, 1))
predictions = reg.predict(np.array(y_data_QK).reshape(-1, 1))
plt.plot(y_data_QK,  predictions, color='g')
print("商用量-期刊发布量-线性模型: (白酒商用量) = {:.5f} {:+.5f}(期刊发布量)".format(reg.intercept_[0], reg.coef_[0][0]))
plt.scatter(y_data_QK, y_data, color='g')
plt.rcParams['font.sans-serif'] = ['SimHei'] #显示中文标签商
plt.rcParams['axes.unicode_minus'] = False
plt.grid(axis="x", linestyle='--')
plt.xlabel('白酒商用量')
plt.ylabel(' 期刊发布量')

ax5_5 = plt.subplot(4, 3, 10)
plt.sca(ax5_5)
reg.fit(np.array(y_data_LS).reshape(-1, 1), np.array(y_data).reshape(-1, 1))
predictions = reg.predict(np.array(y_data_LS).reshape(-1, 1))
plt.plot(y_data_LS,  predictions, color='deepskyblue')
print("商用量-粮食产量-线性模型: (白酒商用量) = {:.5f} {:+.5f}(粮食产量)".format(reg.intercept_[0], reg.coef_[0][0]))
plt.scatter(y_data_LS, y_data, color='deepskyblue')
plt.rcParams['font.sans-serif'] = ['SimHei'] #显示中文标签商
plt.rcParams['axes.unicode_minus'] = False
plt.grid(axis="x", linestyle='--')
plt.xlabel('白酒商用量')
plt.ylabel('粮食产量')

plt.show()

# 衡量随机变量相关性的方法主要有三种：pearson相关系数，spearman相关系数，kendall相关系数：
print("\npearson相关系数:")
print('人均可支配收入----商用量相关系数：' + str(round(pd.Series(y_data).corr(pd.Series(y_data_GDP)), 4)))
print('白 酒  销  售 量----商用量相关系数：' + str(round(pd.Series(y_data).corr(pd.Series(y_data_SALE)), 4)))
print('期 刊 发  布  量----商用量相关系数：' + str(round(pd.Series(y_data).corr(pd.Series(y_data_QK)), 4)))
print('粮   食   产   量----商用量相关系数：' + str(round(pd.Series(y_data).corr(pd.Series(y_data_LS)), 4)))

print("\nspearman相关系数:")
print('人均可支配收入----商用量相关系数：' + str(round(pd.Series(y_data).corr(pd.Series(y_data_GDP), method="spearman"), 4)))
print('白 酒  销  售 量----商用量相关系数：' + str(round(pd.Series(y_data).corr(pd.Series(y_data_SALE), method="spearman"), 4)))
print('期 刊 发  布  量----商用量相关系数：' + str(round(pd.Series(y_data).corr(pd.Series(y_data_QK), method="spearman"), 4)))
print('粮   食   产   量----商用量相关系数：' + str(round(pd.Series(y_data).corr(pd.Series(y_data_LS), method="spearman"), 4)))

print("\nkendall相关系数:")
print('人均可支配收入----商用量相关系数：' + str(round(pd.Series(y_data).corr(pd.Series(y_data_GDP), method="kendall"), 4)))
print('白 酒  销  售 量----商用量相关系数：' + str(round(pd.Series(y_data).corr(pd.Series(y_data_SALE), method="kendall"), 4)))
print('期 刊 发  布  量----商用量相关系数：' + str(round(pd.Series(y_data).corr(pd.Series(y_data_QK), method="kendall"), 4)))
print('粮   食   产   量----商用量相关系数：' + str(round(pd.Series(y_data).corr(pd.Series(y_data_LS), method="kendall"), 4)))


#  注意：  此处设置变量number意在记录变量，为下面上传云端数据库做准备
#  注意：  number的记录位置必须在import pymysql上面，不然会导致python某些内置函数调用出错，原因未知
assemble_pearson = list()
assemble_pearson.append(str(round(pd.Series(y_data).corr(pd.Series(y_data_SALE)), 4)))
assemble_pearson.append(str(round(pd.Series(y_data).corr(pd.Series(y_data_LS)), 4)))
assemble_pearson.append(str(round(pd.Series(y_data).corr(pd.Series(y_data_QK)), 4)))
assemble_pearson.append(str(round(pd.Series(y_data).corr(pd.Series(y_data_GDP)), 4)))
assemble_spearman = list()
assemble_spearman.append(str(round(pd.Series(y_data).corr(pd.Series(y_data_SALE), method="spearman"), 4)))
assemble_spearman.append(str(round(pd.Series(y_data).corr(pd.Series(y_data_LS), method="spearman"), 4)))
assemble_spearman.append(str(round(pd.Series(y_data).corr(pd.Series(y_data_QK), method="spearman"), 4)))
assemble_spearman.append(str(round(pd.Series(y_data).corr(pd.Series(y_data_GDP), method="spearman"), 4)))
assemble_kendall = list()
assemble_kendall.append(str(round(pd.Series(y_data).corr(pd.Series(y_data_SALE), method="kendall"), 4)))
assemble_kendall.append(str(round(pd.Series(y_data).corr(pd.Series(y_data_LS), method="kendall"), 4)))
assemble_kendall.append(str(round(pd.Series(y_data).corr(pd.Series(y_data_QK), method="kendall"), 4)))
assemble_kendall.append(str(round(pd.Series(y_data).corr(pd.Series(y_data_GDP), method="kendall"), 4)))

import scipy.stats as stats
sub_y_data, sub_y_data2, sub_y_data_GDP, sub_y_data_SALE = y_data[:],  y_data[:], y_data_GDP[:], y_data_SALE[:]
for num in range(19):
	del sub_y_data[0]
	del sub_y_data_GDP[0]
#  如果p值小于0.05，说明错误拒绝H0的概率很低，则我们有理由相信H0本身就是错误的，而非检验错误导致。
#  p值是检验值，是检验两变量在样本来自的总体中是否存在和样本一样的相关性。
#  一般p值小于0.05就是显著了；如果小于0.01就更显著；
print(stats.pearsonr(sub_y_data, sub_y_data_GDP))
for num in range(4):				# 数据长度不一，进行处理
	del sub_y_data2[0]
	del sub_y_data_SALE[0]
print(stats.pearsonr(sub_y_data2, sub_y_data_SALE))
print(stats.pearsonr(y_data, y_data_QK))
print(stats.pearsonr(y_data, y_data_LS))


import pymysql
import time

#  处理GDP数据，替换None为数据库格式的Null
for m in range(8, 27):
	del y_data_GDP[0]
for m in range(8, 27):
	y_data_GDP.insert(0, 'Null')
#  处理销售量数据,，替换None为数据库格式的Null
for m in range(0, 4):
	del y_data_SALE[0]
for m in range(0, 4):
	y_data_SALE.insert(0, 'Null')

start = time.time()
# 连接database
conn = pymysql.connect(
	host='148.70.53.199',
	user='root',
	password='1981544603',
	database='Liquor_culture',
	charset='utf8')
print('\n云端数据库连接成功')
#  得到一个可以执行SQL语句的光标对象
cursor = conn.cursor()  # 执行完毕返回的结果集默认以元组显示
#  每次执行前都要清空原表，防止数据重复插入
clear_table = "truncate table analysis_phase_all;"
cursor.execute(clear_table)
conn.commit()  #提交数据
for i in range(len(y_data)):
	up_year = str(1994 + i)
	up_SYL = str(y_data[i])
	up_GDP = str(y_data_GDP[i])
	up_XSL = str(y_data_SALE[i])
	up_QK = str(y_data_QK[i])
	up_LS = str(y_data_LS[i])
	sql = "INSERT INTO analysis_phase_all (year, GDP, XSL, QK, LS, SYL) VALUES( "+up_year+","+up_GDP+","+up_XSL+","+up_QK+","+up_LS+","+up_SYL+" );"
	# 执行SQL语句
	cursor.execute(sql)
	#  提交数据
	conn.commit()


clear_table = "UPDATE analysis_phase_pearson SET XSL_SYL = Null, LS_SYL = Null, QK_SYL = Null, GDP_SYL = Null;"
cursor.execute(clear_table)
conn.commit()  #提交数据
#  顺序为：XSL  、LS 、QK、 GDP对应list中0,1,2,3
sql2 = "UPDATE analysis_phase_pearson SET XSL_SYL='"+assemble_pearson[0]+"', LS_SYL='"+assemble_pearson[1]+"', QK_SYL='"+assemble_pearson[2]+"', GDP_SYL='"+assemble_pearson[3]+"' WHERE coefficient='pearson相关系数';"
cursor.execute(sql2)
conn.commit()
sql = "UPDATE analysis_phase_pearson SET XSL_SYL='"+assemble_spearman[0]+"', LS_SYL='"+assemble_spearman[1]+"', QK_SYL='"+assemble_spearman[2]+"', GDP_SYL='"+assemble_spearman[3]+"' WHERE coefficient='spearman相关系数';"
cursor.execute(sql)
conn.commit()
sql = "UPDATE analysis_phase_pearson SET XSL_SYL='"+assemble_kendall[0]+"', LS_SYL='"+assemble_kendall[1]+"', QK_SYL='"+assemble_kendall[2]+"', GDP_SYL='"+assemble_kendall[3]+"' WHERE coefficient='kendall相关系数';"
cursor.execute(sql)
conn.commit()
# 关闭光标对象
cursor.close()

# 关闭数据库连接
conn.close()
stop = time.time()
print("上传数据耗时：", (stop - start))