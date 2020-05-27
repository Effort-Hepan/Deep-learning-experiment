import tensorflow as tf
from data_processing import batch_iter, seq_length
from Parameters import Parameters as pm


class Lstm_CNN(object):

    def __init__(self):
        self.input_x = tf.placeholder(tf.int32, shape=[None, pm.seq_length], name='input_x')
        self.input_y = tf.placeholder(tf.float32, shape=[None, pm.num_classes], name='input_y')
        self.length = tf.placeholder(tf.int32, shape=[None], name='rnn_length')
        self.keep_pro = tf.placeholder(tf.float32, name='dropout')
        self.global_step = tf.Variable(0, trainable=False, name='global_step')
        self.lstm_cnn()

    def lstm_cnn(self):
        # embedding将大型稀疏向量转换为保留语义关系的低维空间
        with tf.name_scope('embedding'):     # #定义命名空间，便于在tensorboard中展示清晰的逻辑关系图
            self.embedding = tf.get_variable("embeddings", shape=[pm.vocab_size, pm.embedding_dim],
                                             initializer=tf.constant_initializer(pm.pre_training))
            embedding_input = tf.nn.embedding_lookup(self.embedding, self.input_x)      # tf.nn.embedding_lookup()选取一个张量里面索引对应的元素
            sess = tf.Session()
            sess.run(tf.global_variables_initializer())
            print("---------->Lstm_Cnn中模块embedding:\n")
            print("---------->参数embedding_input: %s" % embedding_input)

        with tf.name_scope('LSTM'):
            # 定义LSTM单元(神经元)的数量，返回类型
            cell = tf.nn.rnn_cell.LSTMCell(pm.hidden_dim, state_is_tuple=True)
            # 定义了RNN每个部分的丢失概率所谓dropout,就是指网络中每个单元在每次有数据流入时以一定的概率(keep prob)正常工作即在不同的训练过程中随机扔掉一部分神经元。这是是一种有效的正则化方法，可以有效防止过拟合。
            Cell = tf.contrib.rnn.DropoutWrapper(cell, self.keep_pro)
            # 创建由 RNNCellcell指定的递归神经网络，函数用法参见https://www.cnblogs.com/wzdLY/p/10071962.html和https://www.w3cschool.cn/tensorflow_python/tf_nn_dynamic_rnn.html
            output, _ = tf.nn.dynamic_rnn(cell=Cell, inputs=embedding_input, sequence_length=self.length, dtype=tf.float32)
            print("\n---------->Lstm_Cnn中模块LSTM:\n")
            print("---------->参数output: %s" % output)

        with tf.name_scope('CNN'):
            # tf.expand_dims(input, axis, dim = None, name = None)    给定一个input，在axis轴处给input增加一个为1的维度
            outputs = tf.expand_dims(output, -1) # [batch_size, seq_length, hidden_dim, 1]
            pooled_outputs = []
            print("\n---------->Lstm_Cnn中模块CNN:\n")
            for i, filter_size in enumerate(pm.filters_size):
                filter_shape = [filter_size, pm.hidden_dim, 1, pm.num_filters]
                w = tf.Variable(tf.truncated_normal(filter_shape, stddev=0.1), name='weight')
                b = tf.Variable(tf.constant(0.1, shape=[pm.num_filters]), name='bias')
                # 定义二维卷积
                conv = tf.nn.conv2d(outputs, w, strides=[1, 1, 1, 1], padding='VALID', name='conv')
                print("第%d次卷积输出值的shape： %s" % (i, conv))
                # 定义激活函数     tf.nn.bias_add函数是将偏差项bias加到矩阵conv上； tf.nn.relu函数将矩阵作为参数放入Relu激活函数中
                h = tf.nn.relu(tf.nn.bias_add(conv, b), name='relu')

                # 最大池化
                pooled = tf.nn.max_pool(h, ksize=[1, pm.seq_length-filter_size+1, 1, 1],
                                        strides=[1, 1, 1, 1], padding='VALID', name='pool')
                pooled_outputs.append(pooled)
            output_all = tf.concat(pooled_outputs, 3)
            self.output = tf.reshape(output_all, shape=[-1, 3*pm.num_filters])

        # 全连接层
        with tf.name_scope('output'):
            # tf.nn.dropout()是为了防止或减轻过拟合而使用的函数，它一般用在全连接层
            out_final = tf.nn.dropout(self.output, keep_prob=self.keep_pro)
            o_w = tf.Variable(tf.truncated_normal([3*pm.num_filters, pm.num_classes], stddev=0.1), name='o_w')
            o_b = tf.Variable(tf.constant(0.1, shape=[pm.num_classes]), name='o_b')
            self.logits = tf.matmul(out_final, o_w) + o_b
            self.predict = tf.argmax(tf.nn.softmax(self.logits), 1, name='score')

        # 损失函数
        with tf.name_scope('loss'):
            cross_entropy = tf.nn.sigmoid_cross_entropy_with_logits(logits=self.logits, labels=self.input_y)
            self.loss = tf.reduce_mean(cross_entropy)

        # Adam优化算法
        with tf.name_scope('optimizer'):
            """Adam 算法根据损失函数对每个参数的梯度的一阶矩估计和二阶矩估计动态调整针对于每个参数的学习速率。
            Adam 也是基于梯度下降的方法，但是每次迭代参数的学习步长都有一个确定的范围，不会因为很大的梯度导致
            很大的学习步长，参数的值比较稳定。"""
            # tf.train.AdamOptimizer()函数是Adam优化算法：是一个寻找全局最优点的优化算法，引入了二次方梯度校正。
            optimizer = tf.train.AdamOptimizer(pm.learning_rate)
            # zip(*)与 zip 相反，可理解为解压，返回二维矩阵式；optimizer.compute_gradients()计算变量梯度，得到梯度值,变量（#此函数用来将计算得到的梯度和方差进行拆分）
            gradients, variables = zip(*optimizer.compute_gradients(self.loss))
            # Gradient Clipping的直观作用就是让权重的更新限制在一个合适的范围。tf.clip_by_global_norm()通过权重梯度的总和的比率来截取多个张量的值。
            gradients, _ = tf.clip_by_global_norm(gradients, pm.clip)
            # 对g进行l2正则化计算，比较其与clip的值，如果l2后的值更大，让梯度*(clip/l2_g),得到新梯度
            self.optimizer = optimizer.apply_gradients(zip(gradients, variables), global_step=self.global_step)
            # global_step 自动+1

        with tf.name_scope('accuracy'):
            correct = tf.equal(self.predict, tf.argmax(self.input_y, 1))
            self.accuracy = tf.reduce_mean(tf.cast(correct, tf.float32), name='accuracy')  # tf.cast()函数的作用是执行tensorflow中张量数据类型转换

    def feed_data(self,x_batch, y_batch, real_seq_len, keep_pro):
        feed_dict ={self.input_x: x_batch,
                    self.input_y: y_batch,
                    self.length: real_seq_len,
                    self.keep_pro: keep_pro}
        return feed_dict

    def test(self,sess, x, y):
        batch_test = batch_iter(x, y, batch_size=pm.batch_size)
        for x_batch, y_batch in batch_test:
            real_seq_len = seq_length(x_batch)
            feed_dict = self.feed_data(x_batch, y_batch, real_seq_len, 1.0)
            test_loss, test_accuracy = sess.run([self.loss, self.accuracy], feed_dict=feed_dict)

        return test_loss, test_accuracy





