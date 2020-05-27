# encoding:utf-8
class lstm(object):
	# 定义神经网络变量
	def lstm(batch):  # 参数：输入网络批次数目
		w_in = weights['in']
		b_in = biases['in']
		input = tf.reshape(X, [-1, pm.input_size])  # 需要将tensor转成2维进行计算，计算后的结果作为隐藏层的输入
		input_rnn = tf.matmul(input, w_in) + b_in  # 表示矩阵乘法
		input_rnn = tf.reshape(input_rnn, [-1, pm.time_step, pm.rnn_unit])  # 将tensor转成3维，作为lstm cell的输入
		cell = tf.nn.rnn_cell.BasicLSTMCell(pm.rnn_unit)  # 定义单个基本的LSTM单元
		init_state = cell.zero_state(batch, dtype=tf.float32)  # 这个函数用于返回全0的state tensor
		# dynamic_rnn 用于创建由RNNCell细胞指定的循环神经网络，对inputs进行动态展开
		# output_rnn是记录lstm每个输出节点的结果，final_states是最后一个cell的结果
		output_rnn, final_states = tf.nn.dynamic_rnn(cell, input_rnn, initial_state=init_state, dtype=tf.float32)
		# 函数的作用是将tensor变换为参数shape的形式。
		output = tf.reshape(output_rnn, [-1, pm.rnn_unit])
		w_out = weights['out']
		b_out = biases['out']
		pred = tf.matmul(output, w_out) + b_out  # 表示矩阵乘法
		return pred, final_states