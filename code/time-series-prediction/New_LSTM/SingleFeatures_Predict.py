# encoding: utf-8
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf


class SingleFeatures_Predict(object):
    def __init__(self, data, save_path, open_path, name):
        self.data = data
        self.save_path = save_path
        self.open_path = open_path
        self.name = name
        self.get_single_features_no_predict = []  #  该变量用于记录近5年的值，并返回给主函数
        self.get_single_features_predict = []   #  该变量用于记录预测未来3年的值，并返回给主函数
        self.accuracy = 0                #  该变量用于记录近5年的白酒商用量预测准确率，并返回给主函数
        self.data_train = data[:17]
        self.normalize_data = (self.data_train - np.mean(self.data_train)) / np.std(self.data_train)
        self.normalize_data = self.normalize_data[:, np.newaxis]

        self.time_step = 5
        self.rnn_unit = 100
        self.batch_size = 8
        self.input_size = 1
        self.output_size = 1
        self.lr = 0.0006
        self.train_num = 300   #   训练次数
        self.train_x, self.train_y = [], []

        for i in range(len(self.normalize_data) - self.time_step + 1):
            self.x = self.normalize_data[i: i + self.time_step]
            self.y = self.normalize_data[i: i + self.time_step]
            self.train_x.append(self.x.tolist())
            self.train_y.append(self.y.tolist())

        self.X = tf.placeholder(tf.float32, [None, self.time_step, self.input_size])
        self.Y = tf.placeholder(tf.float32, [None, self.time_step, self.output_size])
        #
        self.weights = {
            'in': tf.Variable(tf.random_normal([self.input_size, self.rnn_unit])),
            'out': tf.Variable(tf.random_normal([self.rnn_unit, 1]))
        }
        self.biases = {
            'in': tf.Variable(tf.constant(0.1, shape=[self.rnn_unit, ])),
            'out': tf.Variable(tf.constant(0.1, shape=[1, ]))
        }

    def lstm(self, batch):  #
        w_in = self.weights['in']
        b_in = self.biases['in']
        input = tf.reshape(self.X, [-1, self.input_size])  #
        input_rnn = tf.matmul(input, w_in) + b_in
        input_rnn = tf.reshape(input_rnn, [-1, self.time_step, self.rnn_unit])  #
        cell1 = tf.nn.rnn_cell.BasicLSTMCell(self.rnn_unit)
        cell2 = tf.nn.rnn_cell.BasicLSTMCell(self.rnn_unit)
        cell = tf.nn.rnn_cell.MultiRNNCell(cells=[cell1, cell2])
        init_state = cell.zero_state(batch, dtype=tf.float32)
        with tf.variable_scope('SFP_scope', reuse=tf.AUTO_REUSE):
            output_rnn, final_states = tf.nn.dynamic_rnn(cell, input_rnn, initial_state=init_state, dtype=tf.float32)
        output = tf.reshape(output_rnn, [-1, self.rnn_unit])  #
        w_out = self.weights['out']
        b_out = self.biases['out']
        pred = tf.matmul(output, w_out) + b_out
        return pred, final_states

    def train_lstm(self):
        pred, _ = self.lstm(self.batch_size)
        loss = tf.reduce_mean(tf.square(tf.reshape(pred, [-1]) - tf.reshape(self.Y, [-1])))
        with tf.variable_scope('AdamOptimizer', reuse=tf.AUTO_REUSE):
            SFP_train_op = tf.train.AdamOptimizer(self.lr).minimize(loss)
        saver = tf.train.Saver(tf.global_variables())
        with tf.Session() as sess:
            sess.run(tf.global_variables_initializer())
            for i in range(self.train_num):  #  训练次数
                step = 0
                start = 0
                end = start + self.batch_size
                while (end < len(self.train_x)):
                    _, loss_ = sess.run([SFP_train_op, loss], feed_dict={self.X: self.train_x[start:end], self.Y: self.train_y[start:end]})
                    start += self.batch_size
                    end = start + self.batch_size
                    if step % 4 == 0:
                        saver.save(sess, self.save_path, global_step=i)
                    step += 1
        self.prediction()
        return self.get_single_features_predict, self.accuracy, self.get_single_features_no_predict

    def prediction(self):
        data_test = self.data[17:]
        test_normalize_data = (data_test - np.mean(data_test)) / np.std(data_test)
        test_normalize_data = test_normalize_data[:, np.newaxis]

        pred, _ = self.lstm(1)  #
        saver = tf.train.Saver(tf.global_variables())
        with tf.Session() as sess:
            module_file = tf.train.latest_checkpoint(self.open_path)#
            saver.restore(sess, module_file)
            predict_5 = sess.run(pred, feed_dict={self.X: [test_normalize_data]})
            prev_seq = test_normalize_data
            predict = []
            for i in range(3):  # 往后预测3个数据
                next_seq = sess.run(pred, feed_dict={self.X: [prev_seq]})
                predict.append(next_seq[-1])
                self.get_single_features_predict.extend(np.array(next_seq[-1]) * np.std(data_test) + np.mean(data_test))
                prev_seq = np.vstack((prev_seq[1:], next_seq[-1]))
            test_predict = np.array(predict_5) * np.std(data_test) + np.mean(data_test)
            anti_standard = np.array(predict) * np.std(data_test) + np.mean(data_test)
            acc = 1 - np.average(np.abs(np.abs(test_predict) - np.abs(data_test[:len(test_predict)])) / np.abs(data_test[:len(test_predict)]))  # 准确率
            if self.name == '白酒商用量':
                self.accuracy = acc
                self.get_single_features_no_predict = test_predict
            else:
                self.get_single_features_no_predict = test_predict
            print(data_test.reshape([-1]))
            print(test_predict.reshape([-1]))
            print("近5年预测%s准确率%s%%\n" % (self.name, acc * 100))
            plt.figure()
            # data_test = data_test / np.max(data_test)
            # test_predict = test_predict / np.max(test_predict)
            plt.plot(list(range(len(data_test))), data_test, label=str(self.name) + "近5年真实值", color='b')
            plt.plot(list(range(len(test_predict))), test_predict, label="近5年测试值", color='g')
            plt.plot(list(range(len(data_test), len(data_test) + len(anti_standard))), anti_standard, label="未来3年测试值", color='r')
            plt.rcParams['font.sans-serif'] = ['SimHei']  # 显示中文标签商
            plt.rcParams['axes.unicode_minus'] = False
            plt.legend()
            plt.show()


