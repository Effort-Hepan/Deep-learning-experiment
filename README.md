# 毕业设计
## 技术概要
这是一次学习深度学习，使用的技术有：  
* 深度学习算法：自然语言处理(CNN+LSTM)、LSTM时间序列预测(单特征、多特征)、多元线性回归  
* 算法库：Tensorflow1.14、sklearn
* 数据库：Mysql5.7、COS  
* 服务器：腾讯CVM(CentOS7.2)
* Web框架：Servlet、Ajax  
* 前端技术：echarts、SVG、ecStat、jQuery、bootstrap  
* 前端样式：标签云(支持拖拽)、表格(SVG画图)、地图(支持悬浮事件)、折线图和散点图(支持左右拖拽)、卡片窗口(系列特效)等

## 使用说明  
1. 自然语言处理算法与以下时序预测等算法相独立，不会对其它算法产生影响。运行顺序code/NLP/Easy_Lstm_Cnn-master目录下Training.py、Predict_finally.py。
2. 先运行code/time-series-prediction/目录下所有命名以处理_开头的文件，顺序无关，这个文件是用来处理数据(包括：爬取全球酒类前100强、制作各省白酒商用量Json文件等)；
3. 运行code/time-series-prediction/目录下“/规律_相关系数.py”程序之后，再运行“/规律_非量化因素_政策.py”。这两个程序会将分析后的结果上传至云端Mysql(必须两个都运行，因为其中一个程序在向数据库写入数据前有清表操作)；
4. 运行/New_LSTM/预测_未来3年白酒产量.py，这个文件包括了上述的3种算法模型，运行时会全部执行并将结果上传云端。
5. 后台代码按顺序执行完后，方可运行/code/Liquor-culture/目录下index.html
