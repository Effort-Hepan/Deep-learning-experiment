from __future__ import print_function
import collections
import math
import numpy as np
import os
import random
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()
import zipfile
from matplotlib import pylab
from six.moves import range
from six.moves.urllib.request import urlretrieve
from generate_data import *
import sys


def maybe_download(dir_name, filename, expected_bytes):
    """如果文件不存在,请下载文件,并确保其大小合适."""
    #                         os.path模块主要用于文件的属性获取,
    # 返回布尔值：     os.path.exists()     就是判断括号里的文件是否存在的意思，括号内的可以是文件路径
    #                         os.mkdir()      创建一级目录
    #                         os.path.join()    连接两个或更多的路径,如果各组件名首字母不包含’/’，则函数会自动加上
    #  返回两个值 ：   urlretrieve()      方法直接将远程数据下载到本地   第一个值是文件的保存地址，第二个未知
    #                         urlretrieve(url, filename=None, reporthook=None, data=None)
    #                                       参数url：下载链接地址；
    #                                       参数filename：指定了保存本地路径（如果参数未指定，urllib会生成一个临时文件保存数据。）
    #                                       参数reporthook：是一个回调函数，当数据块传输完毕时会触发该回调，我们可以利用这个回调函数来显示当前的下载进度
    #                                       参数data：指定post数据，其返回一个包含两个元素的(filename, headers) 元组，
    #                                                                     ----------filename 表示保存到本地的路径，headers表示服务器的响应头
    #                          os.stat()     方法用于在给定的路径上执行一个系统 stat 的调用，可以理解为访问一个文件
    #                                           -----------其中st_size: 普通文件以字节为单位的大小；包含等待某些特殊文件的数据。
    if not os.path.exists(dir_name):
        os.mkdir(dir_name)
    if not os.path.exists(os.path.join(dir_name, filename)):
        filename2, _ = urlretrieve(url + filename, os.path.join(dir_name, filename))
    print("---------------->文件保存路径："+os.path.join(dir_name, filename))
    statinfo = os.stat(os.path.join(dir_name, filename))
    if statinfo.st_size == expected_bytes:
        print('找到并验证 %s' % os.path.join(dir_name, filename))
    else:
        print(statinfo.st_size)
        raise Exception(
            '无法验证 ' + os.path.join(dir_name, filename) + '. 你能使用浏览器来获取吗?')
    return os.path.join(dir_name, filename)


def read_data(filename):
    """
    从具有给定文件名称的文件中读取数据
    返回字符串列表，其中每个字符串都是小写的
    """
    global max_sent_length                          # global---将变量定义为全局变量
    questions = []
    labels = []
    with open(filename, 'r', encoding='latin-1') as f:
        for row in f:
            row_str = row.split(":")
            lb, q = row_str[0], row_str[1]            #  lb为标志(答案)，q为问题
            q = q.lower()                                  #  lower() 方法转换字符串中所有大写字符为小写。
            labels.append(lb)                           #   将答案加入答案集
            questions.append(q.split())             #   split()括号内不加东西默认以空格为分隔符
            if len(questions[-1]) > max_sent_length:  #0表示列表中的第一个元素，[-1]表示倒数第一个元素
                max_sent_length = len(questions[-1])
    return questions, labels


def build_dataset(questions):
    words = []
    data_list = []
    count = []

    # 首先创建一个涵盖所有问题中所有单词的大型列表
    for d in questions:
        words.extend(d)
                                                                    # 注意extend()和append()的区别     eg：a=['why', 'are', 'you', 'so', 'handsome'],b=[ 'it', 'me', 'not', 'you']
                                                                    # a.append(b)  =======>在列表末尾添加新的对象,['why', 'are', 'you', 'so', 'handsome' ,['it', 'me', 'not', 'you']]
                                                                    # a.extend()  ========>用于在列表末尾一次性追加另一个序列中的多个值,['why', 'are', 'you', 'so', 'handsome', 'it', 'me', 'not', 'you']
    print('已发现 %d 个单词.' % len(words))
    print('在词汇表中找到 %d 个单词. ' % len(collections.Counter(words).most_common()))

    # 按频率对单词进行排序：Counter()使元素按出现次数由高到低的排序,most_common()目的是将Counter()的结果化为list,便于迭代
    # Counter()的类型为元组eg:   ("why",2312)   第一个是单词，第二个是其出现的次数
    count.extend(collections.Counter(words).most_common())

    # 通过给出字典的当前长度为每个单词创建一个ID
    # 并将该项添加到字典中：dict() 函数用于创建一个字典，默认为空，字典类型：{'three': 3, 'two': 2, 'one': 1}
    dictionary = dict()
    for word, _ in count:
        '''细节：count = [('why', 1212), ('are', 2314), ('you', 63442)],
        在for遍历时用一个参数如word时，输出word=('why', 1212)，
        如果用两个参数如word, _ 时，输出word=why,_=1212'''
        dictionary[word] = len(dictionary)
    # 遍历所有文本并将字符串单词替换为在该索引处找到的单词的ID
    for d in questions:
        data = list()
        for word in d:
            index = dictionary[word]
            data.append(index)
        data_list.append(data)
    # dictionary = {'PAD': 0, '?': 1, 'the': 2}，reverse_dictionary = {0: 'PAD', 1: '?', 2: 'the'}
    reverse_dictionary = dict(zip(dictionary.values(), dictionary.keys()))# 将dictionary的原来的键值对交换，用zip打包为元组的列表，用dict()将元祖转换成字典
    return data_list, count, dictionary, reverse_dictionary


'''-------------------------第一部分: 下载并检查数据集----------------------------'''
print("--------------------------------第一部分: 下载并检查数据集-------------------------------------")
# 由此[数据集](Dataset: http://cogcomp.cs.illinois.edu/Data/QA/QC/) 作为输入的问题
# 及其对应类型的输出组成.例如,（例如，谁是亚伯拉罕林肯？），输出或标签将是人名.'''


url = 'http://cogcomp.org/Data/QA/QC/'
dir_name = 'question-classif-data'
filename = maybe_download(dir_name, 'train_1000.label', 60774)
test_filename = maybe_download(dir_name, 'TREC_10.label', 23354)
# 检查文件是否存在
# 返回布尔值：                                          os.path.isdir()：用于判断某一对象(需提供绝对路径)是否为目录
#                                                              assert（断言）：用于判断一个表达式，在表达式条件为 false 的时候触发异常。
filenames = ['train_1000.label', 'TREC_10.label']
num_files = len(filenames)
for i in range(len(filenames)):
    file_exists = os.path.isfile(os.path.join(dir_name, filenames[i]))
    assert file_exists


'''----------------------------第二部分：加载和预处理数据-----------------------'''
print("\n\n---------------------------------第二部分：加载和预处理数据---------------------------------------")
#       下面我们将文本加载到程序中，并对数据进行一些简单的预处理
#        记录句子的最大长度，因为我们需要相应地填充较短的句子


max_sent_length = 0
# 对训练数据和测试数据进行处理
for i in range(num_files):                          # 默认是从 0 开始。例如range（5）等价于range（0， 5）输出，0、1、2、3、4，不包括5;
    print('\n处理文件 %s' % os.path.join(dir_name, filenames[i]))               #%s,表示格化式一个对象为字符,在%(%也可视为开始)的左侧放置格式化字符串，而右侧则放置希望格式化的值。
    if i == 0:
        # 对训练数据进行处理
        train_questions, train_labels = read_data(os.path.join(dir_name, filenames[i]))
        # 确保我们获取到所有的问题和其对应的标签
        assert len(train_questions) == len(train_labels)
    elif i == 1:
        # 对测试数据进行处理
        test_questions, test_labels = read_data(os.path.join(dir_name, filenames[i]))
        # 确保我们获取到所有的问题和其对应的标签
        assert len(test_questions) == len(test_labels)

    # 打印一些数据以查看一切是否正常
    for j in range(5):
        print('\t处理数据格式部分结果---------->第%d个问题 : %s' % (j, train_questions[j]))
        print('\t处理数据格式部分结果---------->第%d个标签 : %s\n' % (j, train_labels[j]))

print('最大句子长度: %d' % max_sent_length)
print('\n正在将所有句子归一化为相同的长度..........................................')

'''填充较短的句子'''
# 我们对短句子进行填充,以便所有句子具有相同的长度
# 填充训练数据
for qi, que in enumerate(train_questions):              # enumerate()用于将一个可遍历的数据对象(如列表、元组等)组合为一个序列（编号），返回第一位为序号，第二位为数据
    for _ in range(max_sent_length - len(que)):
        que.append('PAD')
    assert len(que) == max_sent_length
    train_questions[qi] = que
print('训练问题数据已填充...................................................')
print('\n\n正在统计词频信息...................................................')
# 创建一个包含训练和测试问题的数据集
all_questions = list(train_questions)                   #list() 方法用于将元组转换为列表,此处用于确保train_questions为列表格式
all_questions.extend(test_questions)
# 使用上面创建的数据集来构建词汇表
all_question_ind, count, dictionary, reverse_dictionary = build_dataset(all_questions)

# 打印有关已处理数据的一些统计信息
print('\n词频统计且排序后(部分): ', count[:5])
print('词典中的第0项: %s' % reverse_dictionary[0])
print('样本数据', all_question_ind[0])
print('样本数据', all_question_ind[1])
print('词汇量: ', len(dictionary))
print('\n训练问题数据数量: ', len(train_questions))
print('测试问题数据数量: ', len(test_questions))
# 填充测试数据
for qi, que in enumerate(test_questions):
    for _ in range(max_sent_length - len(que)):
        que.append('PAD')
    assert len(que) == max_sent_length
    test_questions[qi] = que
print('\n测试问题数据已填充')
# 打印测试问题以查看所有内容是否正确
print('\n抽样测试问题数据: %s' % test_questions[0])


"""---------------------------第三部分：生成批量数据---------------------------"""
print("\n\n------------------------------------第三部分：生成批量数据------------------------------------")
# 从给定的一组问题和标签中生成一批数据的代码

batch_size = 16                             # 一次处理16个问题
vocabulary_size = len(dictionary)
# 测试批量生成器,实例化对象
sample_gen = BatchGenerator(batch_size, train_questions, train_labels, vocabulary_size, max_sent_length, dictionary)
# 生成单个批次
sample_batch_inputs, sample_batch_labels = sample_gen.generate_batch()
# 生成另一个批次
sample_batch_inputs_2, sample_batch_labels_2 = sample_gen.generate_batch()

# 确保我们将问题0作为batch中的第0个元素
# np.any()是或操作，任意一个元素为True，输出为True。np.all()是与操作，所有元素为True，输出为True。
# np.argmax()返回的是最大数的索引.参数axis,默认是0,表示每一列的最大值的索引 axis=1表示每一行的最大值的索引,详细参见百度
# sample_batch_inputs[0, :, :]意为输出第0大行所有小行和小列
assert np.all(np.asarray([dictionary[w] for w in train_questions[0]], dtype=np.int32)
              == np.argmax(sample_batch_inputs[0, :, :], axis=1))

# 打印我们获得的一些数据标签
print('抽取批处理标签')
print(np.argmax(sample_batch_labels, axis=1))
print(np.argmax(sample_batch_labels_2, axis=1))


"""-----------------------------第四部分：利用CNN对句子进行分类--------------------------"""
print("\n\n-------------------------------------第四部分：利用CNN对句子进行分类--------------------------------------")
# 将利用一个简单的CNN来对句子进行分类.尽管如此,这种简单结构的CNN也能获得
#  不错的准确率.接下来是一个随时间变化而进行池化的层,最后是一个产生logits的完全连接层.

'''定义超参数和输入'''
tf.reset_default_graph()         #  tf.reset_default_graph函数用于清除默认图形堆栈并重置全局默认图形。'
batch_size = 32
# 我们在单个卷积层中使用不同的滤波器大小
filter_sizes = [3,5,7]
# 输入和标签
sent_inputs = tf.placeholder(shape=[batch_size, max_sent_length, vocabulary_size], dtype=tf.float32, name='sentence_inputs')
sent_labels = tf.placeholder(shape=[batch_size, num_classes], dtype=tf.float32, name='sentence_labels')


'''定义模型参数：
            这里，我们使用的模型有以下参数
                        >>>>3组卷积层权重和偏差（每个平行层一个）
                        >>>>1个完全连接的输出层'''


# 3个不同上下文窗口大小的过滤器（3,5,7）
# 每个滤波器覆盖每个单词完整的one-hot编码长度和上下文窗口宽度

# 第一个卷积层的权重  权重：截断的正态分布函数； 偏置：从均匀分布中返回随机值
w1 = tf.Variable(tf.truncated_normal([filter_sizes[0], vocabulary_size, 1], stddev=0.02, dtype=tf.float32), name='weights_1')
b1 = tf.Variable(tf.random_uniform([1], 0, 0.01, dtype=tf.float32), name='bias_1')
# 第二个卷积层的权重
w2 = tf.Variable(tf.truncated_normal([filter_sizes[1], vocabulary_size, 1], stddev=0.02, dtype=tf.float32), name='weights_2')
b2 = tf.Variable(tf.random_uniform([1], 0, 0.01, dtype=tf.float32), name='bias_2')
# 第三个卷积层的权重
w3 = tf.Variable(tf.truncated_normal([filter_sizes[2], vocabulary_size, 1], stddev=0.02, dtype=tf.float32), name='weights_3')
b3 = tf.Variable(tf.random_uniform([1], 0, 0.01, dtype=tf.float32), name='bias_3')
# 全连接层
w_fc1 = tf.Variable(tf.truncated_normal([len(filter_sizes), num_classes], stddev=0.5, dtype=tf.float32), name='weights_fulcon_1')
b_fc1 = tf.Variable(tf.random_uniform([num_classes], 0, 0.01, dtype=tf.float32), name='bias_fulcon_1')


"""对CNN推理方面的定义
            定义CNN推理逻辑.首先计算卷积层中每个平行层的卷积输出.然后在所有
            卷积输出上随时间变化而执行池化操作.最后将池层的输出馈送到完全连接的层,以获得输出逻辑."""
# 计算使用步幅为1的所有过滤器的输出
# 使用ReLu函数作为激活函数  参数为卷积核的卷积后加上偏置
h1_1 = tf.nn.relu(tf.nn.conv1d(sent_inputs, w1, stride=1, padding='SAME') + b1)
h1_2 = tf.nn.relu(tf.nn.conv1d(sent_inputs, w2, stride=1, padding='SAME') + b2)
h1_3 = tf.nn.relu(tf.nn.conv1d(sent_inputs, w3, stride=1, padding='SAME') + b3)

# 随时间变化的池化运算
# 这是在进行最大池化操作，有两种方法可以进行最大池化操作
# 1. 对通过连接h1_1、h1_2、h1_3并将该张量转换为4D而产生的张量使用tf.nn.max_pool操作(因为max_pool采用rank >= 4）
# 2. 为每个过滤器输出单独执行最大池化并使用tf.concat组合它们（代码中使用的那个）
h2_1 = tf.reduce_max(h1_1, axis=1)
h2_2 = tf.reduce_max(h1_2, axis=1)
h2_3 = tf.reduce_max(h1_3, axis=1)
h2 = tf.concat([h2_1, h2_2, h2_3], axis=1)

# 计算完全连接的层输出（无激活函数）
# 注意：由于h2是2d [batch_size，并行滤波器的数量]不需要重塑输出，因为它通常在CNN中进行
logits = tf.matmul(h2, w_fc1) + b_fc1


"""模型损失和优化器
            计算交叉熵损失并使用动量优化器（它比标准梯度下降更好）来优化我们的模型"""
# 损失（交叉熵）
loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits_v2(labels=sent_labels, logits=logits))
# 动量优化器
optimizer = tf.train.MomentumOptimizer(learning_rate=0.01, momentum=0.9).minimize(loss)


"""模型预测
            注意,我们没有得到原始预测,而是预测向量中最大激活元素的索引"""
predictions = tf.argmax(tf.nn.softmax(logits), axis=1)


"""运行模型来对句子进行分类
                对算法执行50个epoch.通过提供的超参数,您应该在测试集上实现大约90%的准确率"""
# 利用宽度为[3,5,7]和batch_size为32的滤波器,该算法在测试数据集（50个epoch）上得到约为90％的准确率
# 从批量大小[16,32,64]中，发现取值32可以获得最佳性能
session = tf.InteractiveSession()
num_steps = 50                                      # 算法运行的epoch数
tf.global_variables_initializer().run()          # 初始化所有变量
print('初始化.........................................................................\n')
train_gen = BatchGenerator(batch_size, train_questions, train_labels,vocabulary_size, max_sent_length, dictionary)     # 为训练和测试数据定义数据批量生成器
test_gen = BatchGenerator(batch_size, test_questions, test_labels, vocabulary_size, max_sent_length, dictionary)
test_interval = 1                                       # 多久计算一次测试数据的精确度


# 计算给定一组预测和标的准确率
def accuracy(labels, preds):
    return np.sum(np.argmax(labels, axis=1) == preds) / labels.shape[0]


# 运行算法
for step in range(num_steps):
    avg_loss = []
    # 单次遍历整个训练集
    for tr_i in range((len(train_questions) // batch_size) - 1):            # \除法，精确除法;\\也是除法，只是不会有小数部分
        tr_inputs, tr_labels = train_gen.generate_batch()               # 获取一批数据
        l, _ = session.run([loss, optimizer], feed_dict={sent_inputs: tr_inputs, sent_labels: tr_labels})   #  优化神经网络并计算损失
        avg_loss.append(l)
    # 打印平均损失
    print('在 %d 个Epoch上训练数据的平均损失 : %.2f' % (step, np.mean(avg_loss)))
    test_accuracy = []
    # 计算测试数据的准确率
    if (step + 1) % test_interval == 0:
        for ts_i in range((len(test_questions) - 1) // batch_size):
            ts_inputs, ts_labels = test_gen.generate_batch()                # 获取一批测试数据
            preds = session.run(predictions, feed_dict={sent_inputs: ts_inputs, sent_labels: ts_labels})        # 获取该批次的预测
            print("------------->输出preds:   ", preds)
            test_accuracy.append(accuracy(ts_labels, preds))        # 计算测试数据准确率

        # 显示测试数据的平均准确率
        print('在 %d 个Epoch上测试数据的平均准确率: %.3f' % (step, np.mean(test_accuracy) * 100.0))


class Logger(object):
    def __init__(self, fileN="Default.log"):
        self.terminal = sys.stdout
        self.log = open(fileN, "a")

    def write(self, message):
        self.terminal.write(message)
        self.log.write(message)

    def flush(self):
        pass


sys.stdout = Logger("C:\\Users\\eternal\\Desktop\\CNN_Result.txt")
sys.stdout.write()
