#  -*- coding: utf-8 -*-
class Parameters(object):

    embedding_dim = 100      # dimension of word embedding
    vocab_size = 10000       # number of vocabulary
    pre_training = None      # use vector_char trained by word2vec(训练好的词向量)

    seq_length = 300          # max length of sentence
    num_classes = 3          # number of labels
    hidden_dim = 128        # the number of hidden units(The number of units in the LSTM cell 网络的“宽度”)
    filters_size = [2, 3, 4]        # CNN 中的过滤器的大小
    num_filters = 128

    keep_prob = 0.5         # droppout
    learning_rate = 1e-3    # learning rate
    lr_decay = 0.9          # learning rate decay
    clip = 5.0              # gradient clipping threshold

    num_epochs = 50          # epochs
    batch_size = 32         # batch_size

    train_filename = './data/cnews.train.txt'  # train data
    test_filename = './data/cnews.test.txt'    # test data
    val_filename = './data/cnews.val.txt'      # validation data
    vocab_filename = './data/vocab_word.txt'        # vocabulary
    vector_word_filename = './data/vector_word.txt'  # vector_word trained by word2vec
    vector_word_npz = './data/vector_word.npz'   # save vector_word to numpy file(将数组以二进制格式保存到磁盘)

    contents_finally = []
