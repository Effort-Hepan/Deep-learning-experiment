# coding=utf-8
import json

jsontext = {'Notes': [], 'description': [], 'years': []}
jsontext['description'].extend(['当前数据为1994-2019年粮食产量，单位：万吨'])
jsontext['years'].extend([44510.1, 46661.8, 50453.5, 49417.1, 51229.53, 50838.58, 46217.52, 45263.67, 45705.75, 43069.53, 46946.95, 48402.19, 49804.23, 50413.85, 53434.29, 53940.86, 55911.31, 58849.33, 61222.62, 63048.2, 63964.83, 66060.27, 66043.51, 66160.72, 65789.22, 66384])
print(len(jsontext['years']))
jsondata = json.dumps(jsontext, indent=4, separators=(',', ': '), ensure_ascii=False)
f = open('C:\\Users\\eternal\\Desktop\\origin_data\\粮食产量.json', 'w', encoding='utf-8')
f.write(jsondata)
f.close()