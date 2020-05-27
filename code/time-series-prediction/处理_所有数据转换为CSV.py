import json
import pandas as pd

'''每次运行该程序，-----数据都会被重新整理'''

with open("C:\\Users\\eternal\\Desktop\\origin_data\\各省白酒商用量.json", "r", encoding="utf8") as f:
	origin = json.load(f)
	y_data_SYL = origin['country']['year']
	for m in range(0, 4):
		del y_data_SYL[0]

with open("C:\\Users\\eternal\\Desktop\\origin_data\\白酒销售量_产销率.json", "r", encoding="utf8") as f2:
	origin_SALE = json.load(f2)
	y_data_SALE = origin_SALE['years']

with open("C:\\Users\\eternal\\Desktop\\origin_data\\期刊发布量.json", "r", encoding="utf8") as f3:
	origin_QK = json.load(f3)
	y_data_QK = origin_QK['years']
	for m in range(0, 4):
		del y_data_QK[0]

with open("C:\\Users\\eternal\\Desktop\\origin_data\\粮食产量.json", "r", encoding="utf8") as f4:
	origin_LS = json.load(f4)
	y_data_LS = origin_LS['years']
	for m in range(0, 4):
		del y_data_LS[0]

convert_list = list()
x_years = list()
for i in range(1998, 2020):
	x_years.append(i)
for i in range(0, 22):
	convert_dict = dict()
	convert_dict["年份"] = x_years[i]
	convert_dict["白酒销售量"] = y_data_SALE[i]
	convert_dict["粮食产量"] = y_data_LS[i]
	convert_dict["期刊发布量"] = y_data_QK[i]
	convert_dict["白酒商用量"] = y_data_SYL[i]
	convert_list.append(convert_dict)
df = pd.DataFrame(convert_list, columns=["年份", "白酒销售量", "粮食产量", "期刊发布量", "白酒商用量"])
df.to_csv("C:\\Users\\eternal\\Desktop\\origin_data\\数据集.csv", index=False)
print(df)
#  此程序运行之后，还需紧接着运行 程序《 非量化因素_政策  》以添加列：政策影响系数