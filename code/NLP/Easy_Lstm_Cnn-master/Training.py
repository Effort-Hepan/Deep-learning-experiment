import os
import tensorflow as tf
from Parameters import Parameters as pm
from data_processing import read_category, get_wordid, get_word2vec, process, batch_iter, seq_length
from Lstm_Cnn import Lstm_CNN
import time


def train():

    """使用tensorboard创建视图"""
    tensorboard_dir = './tensorboard/Lstm_CNN'
    save_dir = './checkpoints/Lstm_CNN'
    if not os.path.exists(os.path.join(tensorboard_dir, 'train')):
        os.makedirs(os.path.join(tensorboard_dir, 'train'))
    if not os.path.exists(os.path.join(tensorboard_dir, 'test')):
        os.makedirs(os.path.join(tensorboard_dir, 'test'))
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)
    save_path = os.path.join(save_dir, 'best_validation')

    #  在想要的节点下标注总结指令；例如记录标量：
    tf.summary.scalar('loss', model.loss)
    tf.summary.scalar('accuracy', model.accuracy)
    #  将所有的想要的节点信息通过tf.summary.merge_all()打包为一个节点，这里命名为summary__merge_op，随后创建一个写入器，为后续的写入磁盘创建接口；
    merged_summary = tf.summary.merge_all()
    writer_train = tf.summary.FileWriter(os.path.join(tensorboard_dir, 'train'))         # 把图保存到一个路径
    writer_test = tf.summary.FileWriter(os.path.join(tensorboard_dir, 'test'))
    saver = tf.train.Saver()
    session = tf.Session()
    session.run(tf.global_variables_initializer())
    writer_train.add_graph(session.graph)

    """处理训练集、测试集数据"""
    x_train, y_train = process(pm.train_filename, wordid, cat_to_id, max_length=300)
    x_test, y_test = process(pm.test_filename, wordid, cat_to_id, max_length=300)
    for epoch in range(pm.num_epochs):
        print('Epoch:', epoch+1)
        num_batchs = int((len(x_train) - 1) / pm.batch_size) + 1
        batch_train = batch_iter(x_train, y_train, batch_size=pm.batch_size)
        for x_batch, y_batch in batch_train:
            real_seq_len = seq_length(x_batch)          # 获取句子真实长度
            feed_dict = model.feed_data(x_batch, y_batch, real_seq_len, pm.keep_prob)
            _, global_step, _summary, train_loss, train_accuracy = session.run([model.optimizer, model.global_step, merged_summary,
                                                                                model.loss, model.accuracy], feed_dict=feed_dict)
            summary = tf.Summary(value=[tf.Summary.Value(tag="loss", simple_value=train_loss)])
            writer_train.add_summary(summary, global_step)
            summary = tf.Summary(value=[tf.Summary.Value(tag="accuracy", simple_value=train_accuracy)])
            writer_train.add_summary(summary, global_step)
            if global_step % 5 == 0:
                test_loss, test_accuracy = model.test(session, x_test, y_test)
                print('global_step:', global_step, 'train_loss:', train_loss, 'train_accuracy:', train_accuracy,
                      'test_loss:', test_loss, 'test_accuracy:', test_accuracy)
                summary = tf.Summary(value=[tf.Summary.Value(tag="accuracy", simple_value=test_accuracy)])
                writer_test.add_summary(summary, global_step)
                summary = tf.Summary(value=[tf.Summary.Value(tag="loss", simple_value=test_loss)])
                writer_test.add_summary(summary, global_step)

            if global_step % num_batchs == 0:
                print('Saving Model...')
                saver.save(session, save_path, global_step=global_step)

        pm.learning_rate *= pm.lr_decay


if __name__ == '__main__':

    # pm = pm
    start = time.time()
    filenames = [pm.train_filename, pm.test_filename, pm.val_filename]
    categories, cat_to_id = read_category()             # 给10个类别编号
    wordid = get_wordid(pm.vocab_filename)          # 给10000个常用词词典单词编号
    pm.vocab_size = len(wordid)
    pm.pre_training = get_word2vec(pm.vector_word_npz)

    model = Lstm_CNN()

    train()
    stop = time.time()
    print("程序运行时间： ", (stop - start))
