# coding=utf-8
import requests
import re
import os
import csv
import threading
import time
import queue
from bs4 import BeautifulSoup
from requests_html import HTMLSession

Links = []


def get_html(url):
    headers = {
        'User-Agent':'Mozilla/5.0(Macintosh; Intel Mac OS X 10_11_4)\
        AppleWebKit/537.36(KHTML, like Gecko) Chrome/52 .0.2743. 116 Safari/537.36'
 
    }     # 模拟浏览器访问
    response = requests.get(url, headers=headers)       # 请求访问网站
    html = response.text       # 获取网页源码
    dictionary = {'html': html, 'state': response.status_code}
    return dictionary                # 返回网页源码


def get_links(root_link_url):
    session = HTMLSession()
    r = session.get(root_link_url)
    return list(r.html.absolute_links)


def crawler(threadName, q):
    # 从队列里获取url
    sub_url = q.get(timeout=2)
    try:
        save_content(sub_url, threadName)
        # 打印：队列长度，线程名，响应吗，正在访问的url
    except Exception as e:
        print(q.qsize(), threadName, "Error: ", e)


def save_content(root_url, threadname):
    sub_dictionary = get_html(root_url)
    html = sub_dictionary['html']
    state_code = sub_dictionary['state']
    soup = BeautifulSoup(html, 'lxml')  # 初始化BeautifulSoup库,并设置解析器
    lists = soup.find_all(['p', 'a', 'div','span'])
    re_cdata = re.compile('//<!\[CDATA\[[^>]*//\]\]>', re.I)  # 匹配CDATA
    re_script = re.compile('<\s*script[^>]*>[^<]*<\s*/\s*script\s*>', re.I)  # Script
    re_style = re.compile('<\s*style[^>]*>[^<]*<\s*/\s*style\s*>', re.I)  # style
    re_br = re.compile('<br\s*?/?>')  # 处理换行
    re_h = re.compile('</?\w+[^>]*>')  # HTML标签
    re_comment = re.compile('<!--[^>]*-->')  # HTML注释

    for li in lists:  # 遍历父节点
        for a in li:  # 遍历子节点
            a = str(a)
           # 去掉多余的空行
            blank_line = re.compile('\n+')
            s = blank_line.sub('\n',a)
            s = re_cdata.sub('', s)  # 去掉CDATA
            s = re_script.sub('', s)  # 去掉SCRIPT
            s = re_style.sub('', s)  # 去掉style
            s = re_br.sub('\n', s)  # 将br转换为换行
            s = re_h.sub('', s)  # 去掉HTML 标签
            s = re_comment.sub('', s)  # 去掉HTML注释
            if re.match('.*酒', s):
                '''
                此处将含有关键酒的词条存入文件
                '''
                temp_list = [root_url, str(state_code), s]
                write_csv(threadname, temp_list)
                print('此处将含有关键酒的词条存入文件')
            else:
                pass  # 跳过/可不写

    
start = time.time()

'''文件夹及文件处理'''
def mkdir(path):
    folder = os.path.exists(path)
    if not folder:  # 判断是否存在文件夹如果不存在则创建为文件夹
        os.makedirs(path)  # makedirs 创建文件时如果路径不存在会创建这个路径
        print("new folder created successfully...")
    else:
        print("There is already has this folder!")


def create_csv(file_csv, thread_Name):
    path = file_csv + "\\酒与经济-" + thread_Name + ".csv"
    folder = os.path.exists(path)
    if folder:  # 判断是否存在文件夹如果不存在则创建为文件夹
        print("There is already has this DOC!")
    else:
        with open(path, 'w') as f:
            csv_write = csv.writer(f)
            list = ['url', 'request state', 'content']
            csv_write.writerow(list)
        print("new folder created successfully...")


def write_csv(thread_Name, fin_list):
    path = file + "\\酒与经济-" + thread_Name + ".csv"
    with open(path, 'a+', encoding='utf-8-sig') as f:
        csv_write = csv.writer(f)
        csv_write.writerow(fin_list)


class myThread(threading.Thread):
    def __init__(self,name,q):
        threading.Thread.__init__(self)
        self.name = name
        self.q = q

    def run(self):
        print("Starting " + self.name)
        while True:
            try:
                crawler(self.name,self.q)
            except:
                break
        print("Exiting " + self.name)


# 先将根网页关于关键词的词条存储到相应文件中
stem_url = 'https://www.baidu.com/s?wd=酒与经济&ie=UTF-8'
file = "C:\\Users\\eternal\\Desktop\\" + "酒与经济"  # 定义存储文件夹
mkdir(file)  # 创建文件夹
save_content(stem_url, 'main') # 保存内容词条
'''再获取根网页中的所有url,并依次访问'''
link_list = get_links(stem_url)
# 创建20个线程名
threadList = []
for i in range(1, 21):
    threadList.append('Thread-' + str(i))
    print(threadList[i-1])
 
# 设置队列长度
# 指明了队列中能存放的数据个数的上限。一旦达到上限，插入会导致阻塞，直到队列中的数据被消费掉。如果maxsize小于或者等于0，队列大小没有限制。
workQueue = queue.Queue(0)
# 将url填充到队列
for url in link_list:
    workQueue.put(url)
 
# 线程池
threads = []
 
# 创建新线程
for tName in threadList:
    create_csv(file, tName)  # 先创建文件夹，再运行子程序
    thread = myThread(tName, workQueue)
    thread.start()
    threads.append(thread)
 

# 等待所有线程完成
for t in threads:
    t.join()
 
end = time.time()
print('Queue多线程爬虫总时间为：', end-start)
