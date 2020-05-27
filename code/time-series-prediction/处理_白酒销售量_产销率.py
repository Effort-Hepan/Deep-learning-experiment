# coding=utf-8
import json

jsontext = {'Notes': [], 'description': [], 'years': [], 'rate': []}
jsontext['description'].extend(['当前数据为1998-2019年白酒(折65度，商品量)销售量，单位：千万升，rate为产销率x100%'])
jsontext['years'].extend([549.1, 480.6, 468.8, 419.5, 373.5, 330.1, 314.2, 358.1, 383.9, 485.2, 562.1	, 628.5,	873.3, 1021.8	, 1126.7, 1166.2	, 1202.6	, 1278.8	, 1305.7, 1161.7, 854.7, 755.5])
jsontext['rate'].extend([0.98, 0.972, 0.99, 1.007, 1.002, 1.002, 1.022, 1.031, 0.976, 0.988, 0.993, 1.021, 0.984, 1, 0.981, 0.956, 0.961, 0.98, 0.969, 0.978, 0.993, 0.973])

print(len(jsontext['years']))
print(len(jsontext['rate']))
jsondata = json.dumps(jsontext, indent=4, separators=(',', ': '), ensure_ascii=False)
f = open('C:\\Users\\eternal\\Desktop\\origin_data\\白酒销售量_产销率.json', 'w', encoding='utf-8')
f.write(jsondata)
f.close()