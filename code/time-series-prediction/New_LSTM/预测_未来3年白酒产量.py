# encoding: utf-8
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
import os
import pandas as pd
from New_LSTM.SingleFeatures_Predict import SingleFeatures_Predict
import time

# 本程序使用两种方式预测，第一种LSTM时间序列； 第二种：多元线性回归
save_dir = './New_LSTM/checkpoints'
if not os.path.exists(save_dir):
    os.makedirs(save_dir)
save_path = os.path.join(save_dir, 'prediction.model')
df = pd.read_csv('C:\\Users\\eternal\\Desktop\\origin_data\\数据集.csv')  # os.getcwd()用于获取当前目录
data = df.iloc[:, 1:6].values         # 取第2-6列所有行，并转换为数组
rnn_unit = 100    # 隐藏层的神经元个数
input_size = 4   # 输入矩阵维度
output_size = 1  # 输出矩阵维度
lr = 0.0006      # 学习率
train_num = 1000 # 训练次数
time_step = 5   # 设置时间步长
time_step_predict = 4 # 用于灵活调整滑动窗口大小，保持每个batch中行相等
features = 4
label = 1
batch_size = 8
start = time.time()


# 制作带时间步长的训练集
def get_train_data(train_begin=0, train_end=17):
    batch_index = []
    data_train = data[train_begin:train_end]
    normalized_train_data = (data_train-np.mean(data_train, axis=0)) / np.std(data_train, axis=0)  # 标准化
    train_x, train_y = [], []   # 训练集
    m = 0
    for i in range(len(normalized_train_data) - time_step + 1):
        m += 1
        if i % batch_size == 0:
            batch_index.append(i)
        x = normalized_train_data[i: i + time_step, :features]
        y = normalized_train_data[i: i + time_step, features:]
        train_x.append(x.tolist())
        train_y.append(y.tolist())
    if m == len(train_x):
        batch_index.append(m)
    return batch_index, train_x, train_y


#  制作带时间步长的测试集
def get_test_data(test_begin=17):
    time_step = time_step_predict
    data_test = data[test_begin:]
    data_test = np.round(np.concatenate([data_test, np.array(Receive_SFP2)], axis=0), 2)
    mean = np.mean(data_test, axis=0)
    std = np.std(data_test, axis=0)
    normalized_test_data = (data_test - mean) / std    # 标准化
    test_x, test_y, batch_index2 = [], [], []
    m = 0
    for i in range(len(normalized_test_data) // time_step if len(normalized_test_data) % time_step == 0 else len(normalized_test_data) // time_step + 1):
        m += 1
        if i % batch_size == 0:
            batch_index2.append(i)
        x = normalized_test_data[i * time_step:(i + 1) * time_step, :features]
        # y = normalized_test_data[i * time_step:(i + 1) * time_step, features:]
        y = data_test[i * time_step:(i + 1) * time_step, features:]
        test_x.append(x.tolist())
        test_y.append(y.tolist())
        # test_x.append((normalized_test_data[(i + 1) * time_step:, :features]).tolist())
        # test_y.extend((normalized_test_data[(i + 1)*time_step:, features:]).tolist())
    if m == len(test_x):
        batch_index2.append(m)
    return mean, std, test_x, test_y, batch_index2


# ——————————————————定义LSTM网络——————————————————
def lstm(X):
    batch_size = tf.shape(X)[0]
    time_step = tf.shape(X)[1]
    w_in = weights['in']
    b_in = biases['in']
    input = tf.reshape(X, [-1, input_size])  # 需要将tensor转成2维进行计算，计算后的结果作为隐藏层的输入
    input_rnn = tf.matmul(input, w_in) + b_in
    input_rnn = tf.reshape(input_rnn, [-1, time_step, rnn_unit])  # 将tensor转成3维，作为lstm cell的输入
    cell1 = tf.nn.rnn_cell.BasicLSTMCell(rnn_unit)
    cell2 = tf.nn.rnn_cell.BasicLSTMCell(rnn_unit)
    cell = tf.nn.rnn_cell.MultiRNNCell(cells=[cell1, cell2])
    init_state = cell.zero_state(batch_size, dtype=tf.float32)
    with tf.variable_scope('scope', reuse=tf.AUTO_REUSE):
        output_rnn, final_states=tf.nn.dynamic_rnn(cell, input_rnn, initial_state=init_state, dtype=tf.float32)  # output_rnn是记录lstm每个输出节点的结果，final_states是最后一个cell的结果
    output = tf.reshape(output_rnn, [-1,rnn_unit])  # 作为输出层的输入
    w_out = weights['out']
    b_out = biases['out']
    pred = tf.matmul(output,w_out)+b_out
    return pred, final_states


# ——————————————————LSTM模型训练——————————————————
def train_lstm(train_begin=0, train_end=17):
    X = tf.placeholder(tf.float32, shape=[None, time_step, input_size])
    Y = tf.placeholder(tf.float32, shape=[None, time_step, output_size])
    batch_index, train_x, train_y = get_train_data(train_begin, train_end)
    pred, _ = lstm(X)
    #  损失函数
    # cross_entropy = tf.nn.sigmoid_cross_entropy_with_logits(logits=tf.reshape(pred, [-1, label]), labels=tf.reshape(Y, [-1, label]))
    # loss = tf.reduce_mean(cross_entropy)
    loss = tf.reduce_mean(tf.square(tf.reshape(pred, [-1, label]) - tf.reshape(Y, [-1, label])))
    train_op = tf.train.AdamOptimizer(lr).minimize(loss)
    saver = tf.train.Saver(tf.global_variables())
    # module_file = tf.train.latest_checkpoint(os.getcwd()+'\\data\\module')
    with tf.Session() as sess:
        sess.run(tf.global_variables_initializer())
        # saver.restore(sess, module_file)
        # 重复训练10000次
        for i in range(train_num):
            for step in range(len(batch_index) - 1):
                _, loss_2 = sess.run([train_op, loss], feed_dict={X: train_x[batch_index[step]: batch_index[step+1]], Y: train_y[batch_index[step]: batch_index[step + 1]]})
            if i % 100 == 0:
                print("第%s次训练：损失率%s%%" % (i, loss_2 * 100))
                print("保存模型：",saver.save(sess, save_path, global_step=i))


# ————————————————LSTM模型预测————————————————————
def prediction():
    time_step = time_step_predict
    X = tf.placeholder(tf.float32, shape=[None, time_step, input_size])#创建输入流图
    Y = tf.placeholder(tf.float32, shape=[None, time_step, output_size])#创建输出流图
    mean, std, test_x, test_y, batch_index2 = get_test_data()
    pred, _ = lstm(X)
    saver = tf.train.Saver(tf.global_variables())
    with tf.Session() as sess:
        # ##参数恢复，调用已经训练好的模型###
        module_file = tf.train.latest_checkpoint("./New_LSTM/checkpoints")
        saver.restore(sess, module_file)
        test_predict = []
        for step in range(len(batch_index2) - 1):
            prob = sess.run(pred, feed_dict={X: test_x[batch_index2[step]: batch_index2[step+1]]})
            predict = prob.reshape(-1, label)
            test_predict.extend(predict)

        # ##循环输出其中预测变量###
        predict_test = []
        for i in range(len(test_predict)):
                predict_test.append(test_predict[i])
        # ##循环输出测试原始数据###
        test_y = np.array(test_y).reshape(-1, label)
        test_y_no_predict = test_y[:5]
        test_y_predict = test_y[5:]         # 该值为单特征预测而来，非真实值，不可用于计算正确率

        # ##数据反归一化  test_y是测试阶段的真实值，test_predict是预测出的值###
        test_predict = np.array(predict_test)*std[features]+mean[features]
        global test_predict_pre, test_predict_no_pre, acc
        test_predict_no_pre = test_predict[: 5]    #  test_predict_no_pre表示前5年的预测值  test_predict_pre表示未来3年预测值
        test_predict_pre = test_predict[5:]
        acc = 1 - np.average(np.abs(test_predict_no_pre-test_y[:len(test_predict_no_pre)])/test_y[:len(test_predict_no_pre)])  # 准确率
        print("多特征商用量准确率%s%%" % (acc * 100))

        # 以折线图表示结果
        plt.figure()
        plt.plot(list(range(len(test_predict_no_pre))), test_predict_no_pre, label="前5年预测值", color='b')
        plt.plot(list(range(len(test_y_no_predict))), test_y_no_predict,  label="前5年真实值",color='g')
        plt.plot(list(range(len(test_predict_no_pre), len(test_predict_no_pre) + len(test_predict_pre))), test_predict_pre, label="未来3年预测值", color='r')
        plt.legend()
        plt.show()
        stop = time.time()
        print("程序运行时间：%s秒" % (round(stop - start, 4)))


# 在进行多变量预测之前先进行单变量预测
class_label = ["白酒销售量", "粮食产量", "期刊发布量", '政策影响系数', "白酒商用量"]
class_label_english = ["XSL", "LS", "QK", "ZC", "SYL"]
SingleFeatures_Predict_save_dir = './New_LSTM/SingleFeatures_Predict'
SingleFeatures_Predict_save_path, SFP_open_path = list(), list()
for k in class_label_english:
    if not os.path.exists(os.path.join(SingleFeatures_Predict_save_dir, k,'checkpoints')):
        os.makedirs(os.path.join(SingleFeatures_Predict_save_dir, k,'checkpoints'))
    SingleFeatures_Predict_save_path.append(os.path.join(os.path.join(SingleFeatures_Predict_save_dir, k,'checkpoints'), 'prediction.model'))
    SFP_open_path.append(os.path.join(SingleFeatures_Predict_save_dir, k,'checkpoints'))


SingleFeatures_Predict_df = df
#  Receive_SFP用于接收未来3年预测值 ，accuracy_list用于接收准确率， pre_single_SYL用于接收近5年白酒商用量预测值
Receive_SFP, accuracy_list, pre_single_ALL = [], [], []
for n in range(len(class_label)):
    SingleFeatures_Predict_data = np.array(SingleFeatures_Predict_df[class_label[n]])
    get_single_features_predict, accuracy, pre_single_all = SingleFeatures_Predict(SingleFeatures_Predict_data, SingleFeatures_Predict_save_path[n], SFP_open_path[n], class_label[n]).train_lstm()
    # accuracy 只有两种情况：0 或非0，只有白酒商用量的准确率才会输出非0
    if accuracy != 0:
        accuracy_list.append(accuracy)
        pre_single_ALL.append(pre_single_all)
    else:
        pre_single_ALL.append(pre_single_all)
    Receive_SFP.append(np.array(get_single_features_predict).reshape(-1, 1))

Receive_SFP2 = np.concatenate([np.array(Receive_SFP[0]), np.array(Receive_SFP[1])], axis=1)
Receive_SFP2 = np.concatenate([Receive_SFP2, np.array(Receive_SFP[2])], axis=1)
Receive_SFP2 = np.concatenate([Receive_SFP2, np.array(Receive_SFP[3])], axis=1)
Receive_SFP2 = np.concatenate([Receive_SFP2, np.array(Receive_SFP[4])], axis=1)

weights = {
         'in': tf.Variable(tf.random_normal([input_size, rnn_unit])),        # 输出张量的形状为
         'out': tf.Variable(tf.random_normal([rnn_unit, label]))
        }
biases = {
        'in': tf.Variable(tf.constant(0.1, shape=[rnn_unit, ])),
        'out': tf.Variable(tf.constant(0.1, shape=[label, ]))
       }
train_lstm()
prediction()


#   以下使用多元线性回归预测结果，注：因为变量>2 所以无法绘制图像
from sklearn.linear_model import LinearRegression
start = time.time()
LinearRegression_data_X = df.iloc[:, 1:5].values
LinearRegression_data_Y = df.iloc[:, 5:].values

reg = LinearRegression()
reg.fit(LinearRegression_data_X, LinearRegression_data_Y)
print("\n多元线性回归预测方程：")
print("商用量-线性模型: (白酒商用量) = {:.5f} {:+.5f}x(白酒销售量){:+.5f}x(粮食产量){:+.5f}x(期刊发布量){:+.5f}x(政策影响系数)".format(reg.intercept_[0], reg.coef_[0][0], reg.coef_[0][1], reg.coef_[0][2], reg.coef_[0][3]))
really_data_SYL = np.squeeze(df.iloc[17:, 5:].values).tolist()
# really_data_all = df.iloc[17:, 1: 6].values.tolist()
temp2 = np.concatenate([pre_single_ALL[0], pre_single_ALL[1]], axis=1)
for xs in range(2, len(pre_single_ALL)):
    temp2 = np.concatenate([temp2, pre_single_ALL[xs]], axis=1)
really_data_all = temp2
temp = np.array(Receive_SFP2).tolist()
equation_list = []
equation_list.extend(really_data_all.tolist())
equation_list.extend(temp)  # equation_list长度为8
equation_SYL, single_features_SYL = list(), list()  #  equation_SYL用于存放线性回归计算出的预测值
#  以下此处警告可忽略，程序依然正常执行
for il in range(len(equation_list)):
    e_SYL = reg.intercept_[0] + reg.coef_[0][0] * equation_list[il][0] + reg.coef_[0][1] * equation_list[il][1] + reg.coef_[0][2] * equation_list[il][2] + reg.coef_[0][3] * equation_list[il][3]
    equation_SYL.append(round(e_SYL, 2))
    single_features_SYL.append(round(equation_list[il][4], 2))
#  计算3种算法的准确率
acc_linear = 1 - np.average(np.abs(np.abs(np.array(equation_SYL[:5])) - np.abs(np.array(really_data_SYL))) / np.abs(np.array(really_data_SYL)))
zxc = np.squeeze(pre_single_ALL[4])
abc = test_predict_no_pre
print("\n单特征LSTM时间序列预测值对比：", np.round(np.array(np.squeeze(pre_single_ALL[4])), 2))
print(" 多元 线 性 回 归 预  测  值 对 比：", np.squeeze(np.round(equation_SYL[:5], 2)).tolist())
print("多特征LSTM时间序列预测值对比：", np.squeeze(np.round(test_predict_no_pre, 2)))
print("近5年  白酒商用量  真 实值  对比：", np.round(np.array(really_data_SYL), 2))
print("\n单特征LSTM时间序列预测结果：%s,\t准确率：%s%%" % (single_features_SYL[-3:], round(accuracy_list[0] * 100, 2)))
print("多元 线 性 回 归  预  测  结  果：%s,\t准确率：%s%%" % (equation_SYL[-3:], round(acc_linear * 100, 2)))
print("多特征LSTM时间序列预测结果：%s,\t准确率：%s%%" % (np.round(np.squeeze(test_predict_pre), 2), round(acc * 100, 2)))
Single_F_number = np.round(np.array(np.squeeze(pre_single_ALL[4])), 2).tolist()
Linear_number = np.squeeze(np.round(equation_SYL[:5], 2)).tolist()
Multi_number = np.squeeze(np.round(test_predict_no_pre, 2)).tolist()
Really_number = np.round(np.array(really_data_SYL), 2).tolist()
Single_F_number.extend(single_features_SYL[-3:])
Multi_number.extend(np.round(np.squeeze(test_predict_pre), 2).tolist())
Linear_number.extend(equation_SYL[-3:])
accuracy_Liner = round(acc_linear * 100, 2)
accuracy_Single_F = round(accuracy_list[0] * 100, 2)
accuracy_Multi_F = round(acc * 100, 2)
import pymysql

start = time.time()
# 连接database
conn = pymysql.connect(
    host='148.70.53.199',
    user='root',
    password='1981544603',
    database='Liquor_culture',
    charset='utf8')
print('\n云端数据库连接成功')
#  得到一个可以执行SQL语句的光标对象
cursor = conn.cursor()  # 执行完毕返回的结果集默认以元组显示
#  每次执行前都要清空原表，防止数据重复插入
clear_table = "truncate table prediction_phase_all;"
cursor.execute(clear_table)
conn.commit()
#  近5年的第1年单独传，因为数据库字段year自增从2015开始，需要手动定义
sql = "INSERT INTO prediction_phase_all (year, linear_method, single_LSTM_method, multi_LSTM_method, really_value) VALUES(2015, '"+str(Linear_number[0])+"', '"+str(Single_F_number[0])+"', '"+str(Multi_number[0])+"', '"+str(Really_number[0])+"');"
cursor.execute(sql)
conn.commit()
del Single_F_number[0]
del Linear_number[0]
del Multi_number[0]
del Really_number[0]

for i in range(len(Really_number)):
    sql = "INSERT INTO prediction_phase_all ( linear_method, single_LSTM_method, multi_LSTM_method, really_value) VALUES('" + str(
        Linear_number[0]) + "', '" + str(Single_F_number[0]) + "', '" + str(Multi_number[0]) + "', '" + str(
        Really_number[0]) + "');"
    cursor.execute(sql)
    conn.commit()
    del Single_F_number[0]
    del Linear_number[0]
    del Multi_number[0]
    del Really_number[0]

for j in range(len(Single_F_number)):
    sql = "INSERT INTO prediction_phase_all ( linear_method, single_LSTM_method, multi_LSTM_method) VALUES('" + str(
        Linear_number[j]) + "', '" + str(Single_F_number[j]) + "', '" + str(Multi_number[j]) + "');"
    cursor.execute(sql)
    conn.commit()

clear_table = "truncate table prediction_phase_accuracy;"
cursor.execute(clear_table)
conn.commit()

sql = "INSERT INTO prediction_phase_accuracy ( linear_method_accuracy, single_LSTM_method_accuracy, multi_LSTM_method_accuracy) VALUES('" + str(
        accuracy_Liner) + "', '" + str(accuracy_Single_F) + "', '" + str(accuracy_Multi_F) + "');"
cursor.execute(sql)
conn.commit()
# 关闭光标对象
cursor.close()
# 关闭数据库连接
conn.close()
stop = time.time()
print("预测模型上传云端数据库耗时：", (stop - start))

