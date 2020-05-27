import pandas as pd  # 数据分析包
import numpy as np  # 提供多维数组对象的库
import matplotlib.pyplot as plt  # 画图的库
import tensorflow as tf  # 深度学习框架
import os
from New_LSTM.New_Parameters import Parameters_NEW as pm
from New_LSTM.LSTM import lstm

# 导入数据
df = pd.read_csv("./stock_dataset.csv")  # 读入股票数据
data = np.array(df['最高价'])  # 获取最高价序列

# [-1]：取最后一个元素； [:-1]：除了最后一个取全部；   [::-1]：取从后向前（相反）的元素； [2::-1]：取从下标为2的元素翻转读取
data = data[::-1]  # 反转，使数据按照日期先后顺序排列
# 以折线图展示data
plt.figure()
plt.plot(data)
plt.show()
normalize_data = (data - np.mean(data)) / np.std(data)  # 标准化
# [:, np.newaxis]：默认选取全部的数据进行增加维度    np.newaxis的作用就是在这一位置增加一个一维，这一位置指的是np.newaxis所在的位置
normalize_data = normalize_data[:, np.newaxis]  # 增加维度 变成二维数组；X行1列

save_dir = './checkpoints/New_Prediction'
if not os.path.exists(save_dir):
	os.makedirs(save_dir)
save_path = os.path.join(save_dir, 'stock.model')





# 预测模型
def prediction():
	pred, _ = lstm(1)  # 预测时只输入[1,time_step,input_size]的测试数据
	saver = tf.train.Saver(tf.global_variables())
	with tf.Session() as sess:
		# 参数恢复
		module_file = tf.train.latest_checkpoint("./checkpoints/")
		saver.restore(sess, module_file)

		# 取训练集最后一行为测试样本。shape=[1,time_step,input_size]
		prev_seq = train_x[-1]
		predict = []
		# 得到之后100个预测结果
		for i in range(100):
			next_seq = sess.run(pred, feed_dict={X: [prev_seq]})
			predict.append(next_seq[-1])
			# 每次得到最后一个时间步的预测结果，与之前的数据加在一起，形成新的测试样本
			prev_seq = np.vstack((prev_seq[1:], next_seq[-1]))
		# 以折线图表示结果
		plt.figure()
		plt.plot(list(range(len(normalize_data))), normalize_data, color='b')
		plt.plot(list(range(len(normalize_data), len(normalize_data) + len(predict))), predict, color='r')
		plt.show()


with tf.variable_scope('train'):
	train_lstm()
with tf.variable_scope('train',reuse=True):
	prediction()
