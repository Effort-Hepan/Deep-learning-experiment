/*
Navicat MySQL Data Transfer

Source Server         : 服务器
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : Liquor_culture

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2020-05-27 14:31:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for analysis_phase_all
-- ----------------------------
DROP TABLE IF EXISTS `analysis_phase_all`;
CREATE TABLE `analysis_phase_all` (
  `year` int(4) NOT NULL COMMENT '年份',
  `GDP` int(11) DEFAULT NULL COMMENT '人均可支配收入(单位：元)',
  `XSL` float(255,2) DEFAULT NULL COMMENT '白酒每年销售量(单位：万千升)',
  `QK` int(11) DEFAULT NULL COMMENT '白酒期刊发布量(单位：篇)',
  `LS` float(255,2) DEFAULT NULL COMMENT '每年粮食产量(单位：万吨)',
  `SYL` float(11,2) DEFAULT NULL COMMENT '当年白酒商用量(单位：万千升)',
  `ZC_describe` varchar(255) DEFAULT NULL COMMENT '描述当年政策内容(简要)',
  `ZC_describe_detailed` varchar(255) DEFAULT NULL,
  `ZC_coefficient` float(255,2) DEFAULT NULL COMMENT '政策系数或影响系数,为-99999时，表示该数据无效',
  PRIMARY KEY (`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of analysis_phase_all
-- ----------------------------
INSERT INTO `analysis_phase_all` VALUES ('1994', null, null, '454', '44510.10', '583.10', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('1995', null, null, '460', '46661.80', '657.40', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('1996', null, null, '487', '50453.50', '691.00', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('1997', null, null, '483', '49417.10', '708.70', '亚洲金融危机', '亚洲大部分主要股市的大幅下跌；冲击亚洲各国外贸企业，造成亚洲许多大型企业的倒闭，工人失业，社会经济萧条。打破了亚洲经济急速发展的景象。中国大陆地区和中国台湾地区则几乎不受影响。', '-0.09');
INSERT INTO `analysis_phase_all` VALUES ('1998', null, '549.10', '529', '51229.53', '492.80', '限制公务招待费用', '1998年行政事业单位为执行公务或开展业务活动需要合理开支的接待费用(招待费)要求不得超过公务费的2%', '-0.99');
INSERT INTO `analysis_phase_all` VALUES ('1999', null, '480.60', '512', '50838.58', '502.30', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('2000', null, '468.80', '585', '46217.52', '476.10', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('2001', null, '419.50', '726', '45263.67', '420.20', '从价从量符合征税', '对白酒在征收从价消费税的同时再按实际销售量每斤(500克)征收0.5元的定额消费税，同时停止执行外购或委托加工已税酒和酒精生产的酒抵扣上一生产环节已纳消费税的政策。此政策的出台对白酒业压力巨大，导致对策频出。', '-0.21');
INSERT INTO `analysis_phase_all` VALUES ('2002', null, '373.50', '636', '45705.75', '378.50', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('2003', null, '330.10', '767', '43069.53', '331.40', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('2004', null, '314.20', '708', '46946.95', '311.70', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('2005', null, '358.10', '868', '48402.19', '349.30', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('2006', null, '383.90', '938', '49804.23', '397.10', '从价税调整', '粮食白酒、薯类白酒的比例税率统一调整为20%。', '0.06');
INSERT INTO `analysis_phase_all` VALUES ('2007', null, '485.20', '1016', '50413.85', '493.90', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('2008', null, '562.10', '1163', '53434.29', '569.30', '经济危机', '从2008年第三季度以来，中国出口大幅下滑，经济增速放缓，就业压力加大。', '-0.27');
INSERT INTO `analysis_phase_all` VALUES ('2009', null, '628.50', '1184', '53940.86', '706.90', '4万亿计划', '世界经济金融危机日趋严峻，为抵御国际经济环境对我国的不利影响，必须采取灵活审慎的宏观经济政策，以应对复杂多变的形势。当前要实行积极的财政政策和适度宽松的货币政策，出台更加有力的扩大国内需求措施，加快民生工程、基础设施、生态环境建设和灾后重建，提高城乡居民特别是低收入群体的收入水平，促进经济平稳较快增长。', '0.27');
INSERT INTO `analysis_phase_all` VALUES ('2010', null, '873.30', '1203', '55911.31', '890.60', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('2011', null, '1021.80', '1483', '58849.33', '1025.80', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('2012', null, '1126.70', '2115', '61222.62', '1153.10', '三公消费受限', '2012年3月26日，国务院召开第五次廉内政工作会议，要求严格控制“三公”经费，禁止用公款购买香烟、高容档酒和礼品。', '-0.09');
INSERT INTO `analysis_phase_all` VALUES ('2013', '18311', '1166.20', '2319', '63048.20', '1226.70', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('2014', '20167', '1202.60', '2194', '63964.83', '1256.90', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('2015', '21966', '1278.80', '1928', '66060.27', '1312.80', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('2016', '23821', '1305.70', '1652', '66043.51', '1358.36', '第十三个五年规划', '十三五工业结构升级与布局优化研究, 经济结构调整的主攻方向和战略举措研究', '-99999.00');
INSERT INTO `analysis_phase_all` VALUES ('2017', '25974', '1161.70', '1486', '66160.72', '1198.06', null, null, null);
INSERT INTO `analysis_phase_all` VALUES ('2018', '28228', '854.70', '1588', '65789.22', '871.20', '中美贸易战', '受中美贸易战、金融去杠杆等内外部因素影响，今年下半年经济增速、消费品行业增速有所回落，影响白酒动销。', '-0.45');
INSERT INTO `analysis_phase_all` VALUES ('2019', '30733', '755.50', '1612', '66384.00', '785.90', null, null, null);

-- ----------------------------
-- Table structure for analysis_phase_pearson
-- ----------------------------
DROP TABLE IF EXISTS `analysis_phase_pearson`;
CREATE TABLE `analysis_phase_pearson` (
  `coefficient` varchar(255) NOT NULL COMMENT '相关系数(pearson、spearman、kendall)',
  `XSL_SYL` float(11,4) DEFAULT NULL,
  `LS_SYL` float(11,4) DEFAULT NULL,
  `QK_SYL` float(11,4) DEFAULT NULL,
  `GDP_SYL` float(11,4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of analysis_phase_pearson
-- ----------------------------
INSERT INTO `analysis_phase_pearson` VALUES ('pearson相关系数', '0.9981', '0.8780', '0.8265', '-0.7973');
INSERT INTO `analysis_phase_pearson` VALUES ('spearman相关系数', '0.9955', '0.8243', '0.6650', '-0.6429');
INSERT INTO `analysis_phase_pearson` VALUES ('kendall相关系数', '0.9740', '0.6431', '0.4462', '-0.4286');

-- ----------------------------
-- Table structure for prediction_phase_accuracy
-- ----------------------------
DROP TABLE IF EXISTS `prediction_phase_accuracy`;
CREATE TABLE `prediction_phase_accuracy` (
  `linear_method_accuracy` float DEFAULT NULL COMMENT '对应算法准确率',
  `single_LSTM_method_accuracy` float DEFAULT NULL,
  `multi_LSTM_method_accuracy` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of prediction_phase_accuracy
-- ----------------------------
INSERT INTO `prediction_phase_accuracy` VALUES ('92.62', '76.83', '82.42');

-- ----------------------------
-- Table structure for prediction_phase_all
-- ----------------------------
DROP TABLE IF EXISTS `prediction_phase_all`;
CREATE TABLE `prediction_phase_all` (
  `year` int(5) NOT NULL AUTO_INCREMENT,
  `linear_method` float(11,2) DEFAULT NULL COMMENT '线性回归预测算法(一共5行数据，从上到下一次是近5年的）',
  `single_LSTM_method` float(11,2) DEFAULT NULL COMMENT '单特征LSTM预测算法',
  `multi_LSTM_method` float(11,2) DEFAULT NULL COMMENT '多特征LSTM预测算法',
  `really_value` float(11,2) DEFAULT NULL COMMENT '真实值，用于对比',
  PRIMARY KEY (`year`)
) ENGINE=InnoDB AUTO_INCREMENT=2023 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of prediction_phase_all
-- ----------------------------
INSERT INTO `prediction_phase_all` VALUES ('2015', '1132.32', '1168.16', '1165.84', '1312.80');
INSERT INTO `prediction_phase_all` VALUES ('2016', '1150.81', '1223.93', '1294.74', '1358.36');
INSERT INTO `prediction_phase_all` VALUES ('2017', '1164.69', '1265.56', '1346.80', '1198.06');
INSERT INTO `prediction_phase_all` VALUES ('2018', '887.81', '928.48', '1221.15', '871.20');
INSERT INTO `prediction_phase_all` VALUES ('2019', '760.71', '800.03', '938.60', '785.90');
INSERT INTO `prediction_phase_all` VALUES ('2020', '760.71', '800.03', '815.04', null);
INSERT INTO `prediction_phase_all` VALUES ('2021', '753.31', '841.09', '789.04', null);
INSERT INTO `prediction_phase_all` VALUES ('2022', '745.43', '859.09', '789.04', null);
