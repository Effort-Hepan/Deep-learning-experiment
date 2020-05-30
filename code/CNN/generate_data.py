import numpy as np


num_classes = 6  # 分类的数量
# 数据集中的所有类型的问题
all_labels = ['NUM', 'LOC', 'HUM', 'DESC', 'ENTY', 'ABBR']


class BatchGenerator(object):
    '''
    生成一批数据
    '''

    def __init__(self,batch_size, questions, labels, vocabulary_size, sent_length, dictionary):
        self.batch_size = batch_size
        self.questions = questions
        self.labels = labels
        self.text_size = len(questions)
        self.batch_size = batch_size
        self.data_index = 0
        self.vocabulary_size = vocabulary_size
        self.sent_length = sent_length
        self.dictionary = dictionary
        assert len(self.questions) == len(self.labels)

    def generate_batch(self):
        '''
        数据生成功能.这输出两个矩阵
        inputs: 一批问题，其中每个问题都是一个大小为[sent_length, vocabulary_size]的张量
        　　　　　每个单词都有一个one-hot编码.
        labels_ohe: 与输入中的问题相对应的one-hot编码标签
        '''

        # Numpy数组包含输入和标签数据：
        # 三维numpy.zeros(大行数，每一个大行中小行数，每一个大行中小列数)，注：默认大列为一列
        # 二维numpy.zeros(行数，列数)
        inputs = np.zeros((self.batch_size, self.sent_length, self.vocabulary_size), dtype=np.float32)
        labels_ohe = np.zeros((self.batch_size, num_classes), dtype=np.float32)

        # 当我们到达数据集的末尾时便从头再开始
        if self.data_index + self.batch_size >= self.text_size:
            self.data_index = 0

        # 对于数据集中的每个问题
        for qi, que in enumerate(self.questions[self.data_index:self.data_index + self.batch_size]):
            # 对于问题中的每个单词
            for wi, word in enumerate(que):
                # 将单词ID索引处的元素设置为1,这便给出了该单词的one-hot编码向量
                inputs[qi, wi, self.dictionary[word]] = 1.0   # input[第几大行，大行中的第几小行，大行中的第几小列]
            # 将与该特定类对应的索引设置为1：将问题所对应的答案所在的矩阵相应位置置为1
            labels_ohe[qi, all_labels.index(self.labels[self.data_index + qi])] = 1.0  # List中index() 函数用于从列表中找出某个值第一个匹配项的索引位置。

        # 更新数据索引以获取下一批数据
        self.data_index = (self.data_index + self.batch_size) % self.text_size

        return inputs, labels_ohe

    def return_index(self):
        # 获取当前的数据索引
        return self.data_index