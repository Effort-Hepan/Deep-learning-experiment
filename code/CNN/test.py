# import numpy as np
# tuple = ("why",1212)
# tuple2 = ('are',2314)
# tuple3 = ('you',63442)
# t = ['why','are','you']
# t2 = ['are','you','sure','???']
# tuple_all = []
# tuple_all.append(tuple)
# tuple_all.append(tuple2)
# tuple_all.append(tuple3)
# dictionary = dict()
# for word, _ in tuple_all:
#     print(dictionary)
#     dictionary[word] = len(dictionary)
# z = zip(t,t2)
# q = []
# q.append(t)
# q.append(t2)
# o = np.asarray([dictionary[w] for w in t], dtype=np.int32)
# print(o)
#
#
# encoding:utf-8
# import os
# import json
#
# for root, dirs, files in os.walk("C:\\Users\\eternal\\Desktop\\诗词", topdown=True):
#     for name in files:
#         # 读取json文件内容,返回字典格式
#         with open(os.path.join(root, name), 'r+', encoding='utf8')as fp:
#            # if os.path.getsize(os.path.join(root, name)):
#             json_data = json.load(fp)
#             with open('C:\\Users\\eternal\\Desktop\\TangShi.txt', mode="a+", encoding="utf-8") as fd:
#                 for i in json_data:
#                     #fd.write( i['label'] + '\t')
#                     fd.write( i['article'] + '\n')

if (1==2) and (2==2):
    print(1)
if (1==3) or (2==2):
    print(2)