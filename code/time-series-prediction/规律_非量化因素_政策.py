# 根据同比增长率判断该政策是否会影响白酒产量
# 并将相违背的政策剔除(不作为相关系数计量)
"""度量方式
		1.按季度划分，前3季度只计算本年，第4季度计算(本年+下1年) / 2；保证向后多计算的一年是存在的
		2.检查数据是否合法：人为判断好坏与数据计算出的正负对比，同则符合
		3.判断依据：同比增量的差值；
						政策影响白酒商用量几率
						坏政策发布后第二年，白酒产量(调整期)回升几率"""
import json
import pandas as pd
with open("C:\\Users\\eternal\\Desktop\\毕设\\源码\\Liquor-culture\\origin_data\\各省白酒商用量.json","r",encoding="utf8", ) as f:
	origin = json.load(f)
	SYL_lists = origin['country']['year']

with open("C:\\Users\\eternal\\Desktop\\毕设\\源码\\Liquor-culture\\origin_data\\人均可支配收入(年)_政策.json","r",encoding="utf8", ) as f1:
	origin_ZC = json.load(f1)
	ZC_lists = origin_ZC['Events']

flag = len(ZC_lists)
accuracy_position = list()


def deal_data():
	global flag, accuracy_position
	pos = int(ZC_lists[i][0].split('-')[0]) - 1994
	current = (SYL_lists[pos] - SYL_lists[pos - 1]) / SYL_lists[pos - 1]
	last = (SYL_lists[pos - 1] - SYL_lists[pos - 2]) / SYL_lists[pos - 2]
	if current - last < 0:  # 为负数表示该政策是降低白酒产量的bad政策
		if ZC_lists[i][1]:  # 验证人为判断的政策的好坏，是否与数据一致，一致则输出
			flag -= 1
			accuracy_position.append(pos)
			# 政策影响系数存放至列表
			convert_sub = list()
			convert_sub.append(int(ZC_lists[i][0].split('-')[0]))
			convert_sub.append(-99999)
			convert_list.append(convert_sub)
			print("%s年数据不符合" % ZC_lists[i][0].split('-')[0])
		else:
			# 政策影响系数存放至列表
			convert_sub = list()
			convert_sub.append(int(ZC_lists[i][0].split('-')[0]))
			convert_sub.append(round(current - last, 2) * 3)
			convert_list.append(convert_sub)
			print("%s年是坏政策，去年：%s%%,  今年：%s%%,  政策重要程度：%s" % (
			ZC_lists[i][0].split('-')[0], last * 100, current * 100, round(current - last, 2)))
	else:
		if ZC_lists[i][1]:  # 验证人为判断的政策的好坏，是否与数据一致，一致则输出
			convert_sub = list()
			convert_sub.append(int(ZC_lists[i][0].split('-')[0]))
			convert_sub.append(round(current - last, 2) * 3)
			convert_list.append(convert_sub)
			print("%s年是好政策，去年：%s%%,  今年：%s%%,  政策重要程度：%s" % (
			ZC_lists[i][0].split('-')[0], last * 100, current * 100, round(current - last, 2)))
		else:
			flag -= 1
			accuracy_position.append(pos)
			# 政策影响系数存放至列表
			convert_sub = list()
			convert_sub.append(int(ZC_lists[i][0].split('-')[0]))
			convert_sub.append(-99999)
			convert_list.append(convert_sub)
			print("%s年数据不符合" % ZC_lists[i][0].split('-')[0])


def deal_data2():
	global flag, accuracy_position
	pos = int(ZC_lists[i][0].split('-')[0]) - 1994
	current = (SYL_lists[pos] - SYL_lists[pos - 1]) / SYL_lists[pos - 1]
	next_t = (SYL_lists[pos + 1] - SYL_lists[pos]) / SYL_lists[pos]
	current = (current + next_t) / 2
	last = (SYL_lists[pos - 1] - SYL_lists[pos - 2]) / SYL_lists[pos - 2]
	if current - last < 0:  # 为负数表示该政策是降低白酒产量的bad政策
		if ZC_lists[i][1]:  # 验证人为判断的政策的好坏，是否与数据一致，一致则输出
			flag -= 1
			accuracy_position.append(pos)
			# 政策影响系数存放至列表
			convert_sub = list()
			convert_sub.append(int(ZC_lists[i][0].split('-')[0]))
			convert_sub.append(-99999)
			convert_list.append(convert_sub)
			print("%s年数据不符合" % ZC_lists[i][0].split('-')[0])
		else:
			# 政策影响系数存放至列表
			convert_sub = list()
			convert_sub.append(int(ZC_lists[i][0].split('-')[0]))
			convert_sub.append(round(current - last, 2) * 3)
			convert_list.append(convert_sub)
			print("%s年是坏政策，去年：%s%%,  今年：%s%%,  政策重要程度：%s" % (
			ZC_lists[i][0].split('-')[0], last * 100, current * 100, round(current - last, 2)))
	else:
		if ZC_lists[i][1]:  # 验证人为判断的政策的好坏，是否与数据一致，一致则输出
			# 政策影响系数存放至列表
			convert_sub = list()
			convert_sub.append(int(ZC_lists[i][0].split('-')[0]))
			convert_sub.append(round(current - last, 2) * 3)
			convert_list.append(convert_sub)
			print("%s年是好政策，去年：%s%%,  今年：%s%%,  政策重要程度：%s" % (
			ZC_lists[i][0].split('-')[0], last * 100, current * 100, round(current - last, 2)))
		else:
			flag -= 1
			accuracy_position.append(pos)
			# 政策影响系数存放至列表
			convert_sub = list()
			convert_sub.append(int(ZC_lists[i][0].split('-')[0]))
			convert_sub.append(-99999)
			convert_list.append(convert_sub)
			print("%s年数据不符合" % ZC_lists[i][0].split('-')[0])


convert_list = list()   # 该列表用于存放政策影响系数
for i in range(len(ZC_lists)):
	if int(ZC_lists[i][0].split('-')[1]) > 9:				#  如果该政策颁布是在一年的第四季度，则往后计算1年
		pos = int(ZC_lists[i][0].split('-')[0]) - 1994
		if pos >= len(SYL_lists) - 1:   					# 保证向后多计算的一年是存在的
			deal_data()
		else:
			deal_data2()
	else:						# 计算本年度的同比增长率，并与去年的同比增长率比较，验证是否和政策的好坏是一致的
		deal_data()

accuracy = flag / len(ZC_lists)
print("\n政策影响白酒商用量几率：%s%%" % (accuracy * 100))
sub_ZC = ZC_lists[:]
for num in accuracy_position:
	where = num + 1994
	for number, li in enumerate(sub_ZC):
		if int(li[0].split('-')[0]) == where:
			del sub_ZC[number]
check_bad_ZC = len(sub_ZC)
for i in sub_ZC:
	pos = int(i[0].split('-')[0]) - 1994
	if not i[1] and (pos >= len(SYL_lists) - 1):				# 是坏政策就执行 且坏政策颁布后1年仍有数据
		next_year = (SYL_lists[pos + 1] - SYL_lists[pos]) / SYL_lists[pos]
		current = (SYL_lists[pos] - SYL_lists[pos - 1]) / SYL_lists[pos - 1]
		if (next_year < 0) and (current < 0):
			if abs(next_year) > abs(current):
				check_bad_ZC -= 1

print("坏政策发布后第二年，白酒产量(调整期)回升几率：%s%%" % (check_bad_ZC / len(sub_ZC) * 100))


"""将全部政策对应的同比增长率差作为影响系数，存入CSV，注：若第二年没有政策发布则用上一次政策的影响系数填充"""
df=pd.read_csv("C:\\Users\\eternal\\Desktop\\毕设\\源码\\Liquor-culture\\origin_data\\数据集.csv")
# 若存在政策列，则释放
df.drop(['政策影响系数'], axis=1, inplace=True)
up_ZC = convert_list[:]   #   政策上传至云端
# 按年份顺序添加政策影响系数至列表
del convert_list[0]  # 去掉1997年数据
record_list = convert_list[:]
for i in range(len(convert_list)):   # 去掉无效政策
	if convert_list[i][1] == 0:
		del record_list[i]
convert_list = record_list[:]
convert_list_finally = list()
for j in range(len(convert_list)):
	if j == 0:			# 第一年直接存入
		convert_list_finally.append(convert_list[0][1])
	elif (convert_list[j][0] - convert_list[j - 1][0]) == 1:		# 两个年份之间没有空隙，即年份相邻
		convert_list_finally.append(convert_list[j][1])
	elif (j == len(convert_list) - 1) and (convert_list[j] != 2019):			# 最后一年单独处理
		for li in range(convert_list[j][0] - convert_list[j - 1][0] - 1):
			convert_list_finally.append(convert_list[j - 1][1])
		convert_list_finally.append(convert_list[j][1])
		for li in range(2019 - convert_list[j][0]):
			convert_list_finally.append(convert_list[j][1])
	else:
		for li in range(convert_list[j][0] - convert_list[j - 1][0] - 1):
			convert_list_finally.append(convert_list[j - 1][1])
		convert_list_finally.append(convert_list[j][1])

df.insert(4, '政策影响系数', convert_list_finally)
df.to_csv("C:\\Users\\eternal\\Desktop\\毕设\\源码\\Liquor-culture\\origin_data\\数据集.csv", index=False)

import pymysql
import time
#  处理要上传的政策，上传内容：只上传最终有效的政策简称、详细、系数
#  up_ZC 的长度和ZC_lists长度一样

# 连接database
start = time.time()
conn = pymysql.connect(
	host='148.70.53.199',
	user='root',
	password='1981544603',
	database='Liquor_culture',
	charset='utf8')
print('\n云端数据库连接成功')
# 得到一个可以执行SQL语句的光标对象
cursor = conn.cursor()  # 执行完毕返回的结果集默认以元组显示
clear_ZC = "UPDATE analysis_phase_all SET ZC_coefficient=Null, ZC_describe=Null, ZC_describe_detailed = Null;"
cursor.execute(clear_ZC)
conn.commit()
for i in range(len(ZC_lists)):
	if up_ZC[i][0] == int(ZC_lists[i][0].split('-')[0]):
		up_ZC_coefficient = str(up_ZC[i][1])
		up_ZC_describe = ZC_lists[i][2]
		up_ZC_describe_detailed = ZC_lists[i][3]
		sql = "UPDATE analysis_phase_all SET ZC_coefficient='"+up_ZC_coefficient+"',  ZC_describe='"+up_ZC_describe+"', ZC_describe_detailed='"+up_ZC_describe_detailed+"' WHERE year='"+str(up_ZC[i][0])+"'; "
		#, ZC_describe,ZC_describe_detailed ) SELECT '"+up_ZC_coefficient+"','"+up_ZC_describe+"','"+up_ZC_describe_detailed+"'  WHERE year='"+str(up_ZC[i][0])+"';"
		# 执行SQL语句
		cursor.execute(sql)
		conn.commit()
	else:
		print("列表长度不一致，请立即检查修改！")

# 关闭光标对象
cursor.close()

# 关闭数据库连接
conn.close()
stop = time.time()
print("政策数据上传云端耗时：", (stop - start))

