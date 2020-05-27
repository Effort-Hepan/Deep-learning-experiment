# coding=utf-8
import requests
import re
from bs4 import BeautifulSoup
import json


def get_html(url):
	headers = {
		'User-Agent': 'Mozilla/5.0(Macintosh; Intel Mac OS X 10_11_4)\
		AppleWebKit/537.36(KHTML, like Gecko) Chrome/52 .0.2743. 116 Safari/537.36'

	}  # 模拟浏览器访问
	response = requests.get(url, headers=headers)  # 请求访问网站
	html = response.text  # 获取网页源码
	return html  # 返回网页源码


soup = BeautifulSoup(get_html('https://www.maigoo.com/news/526495.html'), 'lxml')  # 初始化BeautifulSoup库,并设置解析器
content_text1 = soup.find(attrs={'class': 'content_introduction_text'})
content_text2 = soup.find(attrs={'class': 'md_desc fcolor26 line1halfem mgt_10 font14'})

re_cdata = re.compile('//<!\[CDATA\[[^>]*//\]\]>', re.I)  # 匹配CDATA
re_script = re.compile('<\s*script[^>]*>[^<]*<\s*/\s*script\s*>', re.I)  # Script
re_style = re.compile('<\s*style[^>]*>[^<]*<\s*/\s*style\s*>', re.I)  # style
re_br = re.compile('<br\s*?/?>')  # 处理换行
re_h = re.compile('</?\w+[^>]*>')  # HTML标签
re_comment = re.compile('<!--[^>]*-->')  # HTML注释
re_Space = re.compile('\\s+')	 # 匹配空格

lists = []
lists.append(content_text1)
lists.append(content_text2)
description = list()
for li in lists:  # 遍历父节点
	a = str(li)
	# 去掉多余的空行
	# blank_line=re.compile('\n+')
	# s=blank_line.sub('\n',a)
	s = re_cdata.sub('', a)  # 去掉CDATA
	s = re_script.sub('', s)  # 去掉SCRIPT
	s = re_style.sub('', s)  # 去掉style
	s = re_br.sub('\n', s)  # 将br转换为换行
	s = re_h.sub('', s)  # 去掉HTML 标签
	s = re_comment.sub('', s)  # 去掉HTML注释
	s = re_Space.sub('',s)
	description.append(s)

origent = soup.find_all('td', attrs={'class': 'md_td'})
label = list()
label_sub = list()
for num in range(6):
	del origent[0]
for number in range(len(origent)):
	s = re_cdata.sub('', str(origent[number]))  # 去掉CDATA
	s = re_script.sub('', s)  # 去掉SCRIPT
	s = re_style.sub('', s)  # 去掉style
	s = re_br.sub('\n', s)  # 将br转换为换行
	s = re_h.sub('', s)  # 去掉HTML 标签
	s = re_comment.sub('', s)  # 去掉HTML注释
	s = re_Space.sub('', s)
	label_sub.append(s)
	if (number + 1) % 6 == 0:
		label.append(label_sub)
		label_sub = []


'''爬取2018年数据'''
soup_2018 = BeautifulSoup(get_html('http://jiu.163.com/19/0828/19/ENMJ0V8S0082981M.html'), 'html5lib')  # 初始化BeautifulSoup库,并设置解析器
origin = soup_2018.find_all('td')
label_2018 = list()
label_sub_2018 = list()
for num in range(6):
	del origin[0]
for number in range(len(origin)):
	s = re_cdata.sub('', str(origin[number]))  # 去掉CDATA
	s = re_script.sub('', s)  # 去掉SCRIPT
	s = re_style.sub('', s)  # 去掉style
	s = re_br.sub('\n', s)  # 将br转换为换行
	s = re_h.sub('', s)  # 去掉HTML 标签
	s = re_comment.sub('', s)  # 去掉HTML注释
	s = re_Space.sub('', s)
	label_sub_2018.append(s)
	if (number + 1) % 6 == 0:
		label_2018.append(label_sub_2018)
		label_sub_2018 = []
label_2018.pop()
label_2018.pop()

jsontext = {'Notes': [], 'description': [], '2018year': [], '2019year': []}
jsontext['Notes'].extend(['数据格式为：排名，国家，类别，产品品牌，所属企业，品牌价值(亿元)'])
jsontext['description'].extend(description)
jsontext['2018year'].extend(label_2018)
jsontext['2019year'].extend(label)
jsondata = json.dumps(jsontext, indent=4, separators=(',', ': '), ensure_ascii=False)
f = open('C:\\Users\\eternal\\Desktop\\origin_data\\全球酒类前百强.json', 'w', encoding='utf-8')
f.write(jsondata)
f.close()