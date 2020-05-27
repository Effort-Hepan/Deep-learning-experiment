import tensorflow as tf  # 深度学习框架
from LSTM import lstm
from New_Parameters import Parameters_NEW as pm
# 训练模型
def train_lstm():
	pred, _ = lstm(pm.batch_size)  # 调用的构建的lstm变量
	# 损失函数 平均平方误差(MSE)
	loss = tf.reduce_mean(tf.square(tf.reshape(pred, [-1]) - tf.reshape(Y, [-1])))
	# 实现梯度下降算法的优化器，优化损失函数
	train_op = tf.train.AdamOptimizer(pm.lr).minimize(loss)
	# 保存和恢复模型的方法；方法返回checkpoint文件的路径。可以直接传给restore() 进行调用
	saver = tf.train.Saver(tf.global_variables())
	with tf.Session() as sess:
		sess.run(tf.global_variables_initializer())
		# 重复训练10000次
		for i in range(5):
			step = 0
			start = 0
			end = start + pm.batch_size
			while (end < len(train_x)):
				_, loss_ = sess.run([train_op, loss], feed_dict={X: train_x[start:end], Y: train_y[start:end]})
				start += pm.batch_size
				end = start + pm.batch_size
				# 每10步保存一次参数
				if step % 10 == 0:
					print(i, step, loss_)
					print("保存模型：", saver.save(sess, save_path))
				step += 1

if __name__ == '__main__':
	# 生成训练集
	train_x, train_y = [], []  # 训练集
	for i in range(len(normalize_data) - pm.time_step - 1):
		x = normalize_data[i:i + pm.time_step]
		y = normalize_data[i + 1:i + pm.time_step + 1]
		train_x.append(x.tolist())  # 将数组转化成列表
		train_y.append(y.tolist())

	# 定义神经网络变量
	X = tf.placeholder(tf.float32, [None, pm.time_step, pm.input_size])  # 每批次输入网络的tensor/定义placeholder
	Y = tf.placeholder(tf.float32, [None, pm.time_step, pm.output_size])  # 每批次tensor对应的标签
	# 输入层、输出层权重、偏置
	weights = {
		'in': tf.Variable(tf.random_normal([pm.input_size, pm.rnn_unit])),
		'out': tf.Variable(tf.random_normal([pm.rnn_unit, 1]))
	}
	biases = {
		'in': tf.Variable(tf.constant(0.1, shape=[pm.rnn_unit, ])),
		'out': tf.Variable(tf.constant(0.1, shape=[1, ]))
	}
