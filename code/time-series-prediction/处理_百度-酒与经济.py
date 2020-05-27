#coding=utf-8
import requests
import re
from bs4 import BeautifulSoup
def get_html(url):
    headers = {
        'User-Agent':'Mozilla/5.0(Macintosh; Intel Mac OS X 10_11_4)\
        AppleWebKit/537.36(KHTML, like Gecko) Chrome/52 .0.2743. 116 Safari/537.36'
 
    }     #模拟浏览器访问
    response = requests.get(url,headers = headers)       #请求访问网站
    html = response.text       #获取网页源码
    return html                #返回网页源码
 
soup = BeautifulSoup(get_html('https://www.baidu.com/s?wd=酒与经济&ie=UTF-8'), 'lxml')   #初始化BeautifulSoup库,并设置解析器
lists = soup.find_all(['p','a','div'])
re_cdata=re.compile('//<!\[CDATA\[[^>]*//\]\]>',re.I) #匹配CDATA
re_script=re.compile('<\s*script[^>]*>[^<]*<\s*/\s*script\s*>',re.I)#Script
re_style=re.compile('<\s*style[^>]*>[^<]*<\s*/\s*style\s*>',re.I)#style
re_br=re.compile('<br\s*?/?>')#处理换行
re_h=re.compile('</?\w+[^>]*>')#HTML标签
re_comment=re.compile('<!--[^>]*-->')#HTML注释


for li in lists:         #遍历父节点
    for a in li:     #遍历子节点
        a = str(a)
        #去掉多余的空行
        # blank_line=re.compile('\n+')
        # s=blank_line.sub('\n',a)
        s=re_cdata.sub('',a)#去掉CDATA
        s=re_script.sub('',s) #去掉SCRIPT
        s=re_style.sub('',s)#去掉style
        s=re_br.sub('\n',s)#将br转换为换行
        s=re_h.sub('',s) #去掉HTML 标签
        s=re_comment.sub('',s)#去掉HTML注释
        if re.match('.*酒',a):
            print("---------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+s)#输出结果
        else:
            pass      #跳过/可不写
