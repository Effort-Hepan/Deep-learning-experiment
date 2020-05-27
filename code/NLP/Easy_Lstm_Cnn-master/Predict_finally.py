import numpy as np
from Lstm_Cnn import Lstm_CNN
import tensorflow as tf
from data_processing import read_category, get_wordid, get_word2vec, process_predict, batch_iter_predict, seq_length
from Parameters import Parameters as pm
import os
import time

def val():

    pre_label = []
    session = tf.Session()
    session.run(tf.global_variables_initializer())
    save_path = tf.train.latest_checkpoint('./checkpoints/Lstm_CNN')        # 会自动找到最近保存的变量文件
    saver = tf.train.Saver()            # 训练网络之后保存训练好的模型，以及在程序中读取已保存好的模型
    saver.restore(sess=session, save_path=save_path)            # 使用saver.restore()方法，重载模型的参数，继续训练或者用于测试数据

    val_x, val_y = process_predict(pm.val_filename, wordid, cat_to_id, max_length=pm.seq_length)
    batch_val = batch_iter_predict(val_x, val_y, batch_size=64)
    for x_batch, y_batch in batch_val:
        real_seq_len = seq_length(x_batch)
        feed_dict = model.feed_data(x_batch, y_batch, real_seq_len, 1.0)
        pre_lab = session.run(model.predict, feed_dict=feed_dict)
        pre_label.extend(pre_lab)
    return pre_label


if __name__ == '__main__':

    start = time.time()
    pm = pm
    categories, cat_to_id = read_category()
    wordid = get_wordid(pm.vocab_filename)
    pm.vocab_size = len(wordid)
    pm.pre_training = get_word2vec(pm.vector_word_npz)

    model = Lstm_CNN()
    pre_label = val()
    contents_list = list(zip(pre_label, [num for item in pm.contents_finally for num in item]))

    # 在当前目录下创建文件
    i, j = 1, 1
    finally_data_dir = './data/Finally_Data'
    if os.path.exists(os.path.join(finally_data_dir, 'No_Value.txt')):
        os.remove(os.path.join(finally_data_dir, 'No_Value.txt'))
    if os.path.exists(os.path.join(finally_data_dir, 'Value.txt')):
        os.remove(os.path.join(finally_data_dir, 'Value.txt'))
    if not os.path.exists(finally_data_dir):
        os.makedirs(finally_data_dir)
    with open(os.path.join(finally_data_dir, 'No_Value.txt'), "a", encoding='utf-8') as f1:
        for num, sentences in contents_list:
            if num == 0:
                f1.write(str(i) + ".\t" + sentences + '\n')
                i += 1
    with open(os.path.join(finally_data_dir, 'Value.txt'), "a+", encoding='utf-8') as f2:
        for num, sentences in contents_list:
            if num == 1:
                f2.write(str(j) + ".\t" + sentences +'\n')
                j += 1
    f1.close()
    f2.close()
    print("预测前10项：", ' '.join(str(pre_label[:10])))
    stop = time.time()
    print("程序运行时间： ", (stop - start))
