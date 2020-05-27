# coding=utf-8
import json

jsontext = {'Notes': [], 'description': [], 'years': []}
jsontext['description'].extend(['当前数据为1994-2019年白酒期刊发布量，来源：知网'])
jsontext['years'].extend([454, 460, 487, 483, 529, 512, 585, 726, 636, 767, 708, 868, 938, 1016, 1163, 1184, 1203, 1483, 2115, 2319, 2194, 1928, 1652, 1486, 1588, 1612])

print(len(jsontext['years']))
jsondata = json.dumps(jsontext, indent=4, separators=(',', ': '), ensure_ascii=False)
f = open('C:\\Users\\eternal\\Desktop\\origin_data\\期刊发布量.json', 'w', encoding='utf-8')
f.write(jsondata)
f.close()