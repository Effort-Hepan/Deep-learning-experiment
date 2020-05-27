# import tensorflow as tf
# a = [[1,2,3],[4,5,6]]
# b = [[1,0,3],[1,5,1]]
# str = tf.equal(a,b)
# with tf.Session() as sess:
#    print(sess.run(str))
#    print(sess.run(tf.cast(str, tf.float32)))

import numpy as np
import tensorflow as tf

ay = np.array([[609, 491, 602, 0, 0, 0],[5, 44, 460,  0,  0,  0], [ 609, 491, 602, 0, 0, 0]])
session = tf.Session()
session.run(tf.global_variables_initializer())
input_x = tf.placeholder(tf.int32, shape=[None, 6], name='input_x')
xi = session.run(input_x, feed_dict={input_x: ay})
print(xi)