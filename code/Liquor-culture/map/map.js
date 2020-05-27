var uploadedDataURL = "https://biyesheji-1258092413.cos.ap-chengdu.myqcloud.com/Liquor-culture/map/geo-map.json";
    /*var geoGpsMap = {
        '1': [109.1162, 34.2004],
        '2': [116.4551, 40.2539],
        '3': [113.12244, 23.009505],
        '4': [87.9236, 43.5883],
        '5': [127.9688, 45.368],
        '6': [91.11, 29.97],
    };*/
var geoCoordMap = {					//Geography：地理；coordinate：坐标；
    '黑龙江': [128.9688, 46.868],
    '内蒙古': [110.3467, 41.4899],
    "吉林": [125.8154, 44.2584],
    '北京': [116.4551, 40.2539],
    "辽宁": [123.1238, 42.1216],
    "河北": [114.4995, 38.1006],
    "天津": [117.4219, 39.4189],
    "山西": [112.3352, 37.9413],
    "陕西": [109.1162, 34.2004],
    "甘肃": [103.5901, 36.3043],
    "宁夏": [106.3586, 38.1775],
    "青海": [95.4038, 35.8207],
    "新疆": [87.9236, 43.5883],
    "西藏": [91.11, 29.97],
    "四川": [103.9526, 30.7617],
    "重庆": [108.384366, 30.439702],
    "山东": [117.1582, 36.8701],
    "河南": [113.4668, 34.6234],
    "江苏": [119.8062, 32.9208],
    "安徽": [117.29, 32.0581],
    "湖北": [114.3896, 30.6628],
    "浙江": [119.5313, 29.8773],
    "福建": [119.4543, 25.9222],
    "江西": [116.0046, 28.6633],
    "湖南": [113.0823, 28.2568],
    "贵州": [106.6992, 26.7682],
    "云南": [102.4199, 24.4663],
    "广东": [113.12244, 23.009505],
    "广西": [108.479, 23.1152],
    "海南": [110.3893, 19.8516],
    '上海': [121.4648, 31.2891],
};

var colors = [
    ["#1DE9B6", "#F46E36", "#04B9FF", "#5DBD32", "#FFC809", "#FB95D5", "#BDA29A", "#6E7074", "#546570", "#C4CCD3"],
    ["#37A2DA", "#67E0E3", "#32C5E9", "#9FE6B8", "#FFDB5C", "#FF9F7F", "#FB7293", "#E062AE", "#E690D1", "#E7BCF3", "#9D96F5", "#8378EA", "#8378EA"],
    ["#DD6B66", "#759AA0", "#E69D87", "#8DC1A9", "#EA7E53", "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
];
var colorIndex = 0;
$(function() {
    var year = ["2015", "2016", "2017", "2018", "2019"];
    var mapData = [
        [],
        [],
        [],
        [],
        []
    ];

    /*数据来源
    格式：mapData      [[{"year":'2015',"name":'青海',"value":25},{}],[],[],[],[]]*/
    var categoryData = [];	//category:类别； categoryData列表用于存放省份名称
    // for (var key in geoCoordMap) {
    //     categoryData.push(key);		//push()方法可向数组的末尾添加一个或多个元素，并返回新的长度
    //     mapData[0].push({
    //         "year": '2015',
    //         "name": key,
    //         "value": randomNum(0, 100)
    //     });
    //     mapData[1].push({
    //         "year": '2016',
    //         "name": key,
    //         "value": randomNum(0, 100)
    //     });
    //     mapData[2].push({
    //         "year": '2017',
    //         "name": key,
    //         "value": randomNum(0, 100)
    //     });
    //     mapData[3].push({
    //         "year": '2018',
    //         "name": key,
    //         "value": randomNum(0, 100)
    //     });
    //     mapData[4].push({
    //         "year": '2019',
    //         "name": key,
    //         "value": randomNum(0, 100)
    //     });
    // }
    $.ajax({        //注意：此处使用ajax，所以下面路径要以index主页所在的位置为主使用./
                    //不使用$.getJson是因为其异步执行，会使TagCanvas先绘图
                type: "GET",
                url: "https://biyesheji-1258092413.cos.ap-chengdu.myqcloud.com/Liquor-culture/origin_data/%E5%90%84%E7%9C%81%E7%99%BD%E9%85%92%E5%95%86%E7%94%A8%E9%87%8F.json",
                data: "",
                async: false,           //这句话就是阻止ajax异步的
                dataType:"json",
                success: function(result){
                    $.each(result["province"], function (i, field) {
                        for (var name_pro in field) {
                            categoryData.push(name_pro);     //push()方法可向数组的末尾添加一个或多个元素，并返回新的长度
                            mapData[0].push({
                                "year": '2015',
                                "name": name_pro,
                                "value": field[name_pro][0]
                            });
                            mapData[1].push({
                                "year": '2016',
                                "name": name_pro,
                                "value": field[name_pro][1]
                            });
                            mapData[2].push({
                                "year": '2017',
                                "name": name_pro,
                                "value": field[name_pro][2]
                            });
                            mapData[3].push({
                                "year": '2018',
                                "name": name_pro,
                                "value": field[name_pro][3]
                            });
                            mapData[4].push({
                                "year": '2019',
                                "name": name_pro,
                                "value": field[name_pro][4]
                            });
                        }
                    });
                }
            });
    $.getJSON(uploadedDataURL, function(geoJson) {

        echarts.registerMap('china', geoJson);		//echarts.registerMap()注册可用的地图
        var convertData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];//各省白酒商用量无上海数据,请删除数组对应值,防止错位
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };

        var convertToLineData = function(data, gps) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem.name];
                debugger;
                var toCoord = gps; //郑州
                //  var toCoord = geoGps[Math.random()*3];
                if (fromCoord && toCoord) {
                    res.push([{
                        coord: fromCoord,
                        value: dataItem.value
                    }, {
                        coord: toCoord,
                    }]);
                }
            }
            return res;
        };

        optionXyMap01 = {
            timeline: {
                data: year,
                axisType: 'category',
                autoPlay: true,
                playInterval: 5000,         //表示播放的速度（跳动的间隔），单位毫秒（ms）
                left: '10%',
                right: '10%',
                bottom: '1%',
                width: '75%',
                //  height: null,
                symbolSize: 12,     //timeline标记的大小
                lineStyle: {        //轴线相关配置
                    color: '#555'
                },
                checkpointStyle: {      //.checkpointStyle 标记的图形
                    symbol: 'diamond',
                    borderColor: '#777',
                    borderWidth: 2,
                    symbolSize: 18,
                    color: '#04B9FF'
                },
                controlStyle: {         //『控制按钮』的样式。
                    showPlayBtn: true,
                    showNextBtn: true,
                    showPrevBtn: true,
                    itemSize: 18,       //控制按钮大小
                    normal: {
                        color: '#666',
                        borderColor: '#666'
                    },
                    emphasis: {
                        color: '#aaa',
                        borderColor: '#aaa'
                    }
                },
                //时间轴下时间显示配置
                label: {
                    normal: {
                        textStyle: {
                            color: '#BEBEBE'
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#778899'
                        }
                    }
                },
                emphasis: {
                    itemStyle: {
                        color: '#04B9FF'
                    },
                },
            },
            /*baseOption配置基础信息，option用于配置变量信息*/
            baseOption: {
                animation: true,			//是否开启动画。
                animationDuration: 1000,	//初始动画的时长，支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的初始动画效果
                animationEasing: 'cubicInOut',//初始动画的缓动效果。
                animationDurationUpdate: 1000,//数据更新动画的时长。
                animationEasingUpdate: 'cubicInOut',//数据更新动画的缓动效果。
                /*grid直角坐标系内绘图网格*/
                /*grid: {
                    right: '1%',
                    top: '15%',
                    bottom: '10%',
                    width: '20%'
                },*/
                /*tooltip提示框组件 记：作为全局变量的tooltip一旦show，全部插件的
                tooltip都会显示，先要关闭(隐藏)某些组件的tooltip可以结合
                params.seriesName等params中的数值作为判定条件，将formatter传入''(空)*/
                tooltip: {
                    show: true,
                    trigger: 'item', // hover触发器
                    confine: true,
                    transitionDuration: 0,
                    formatter: function (params) {
                        var pN = params.seriesName;
                        var showHtm = '';
                        if ( params.componentType === 'timeline' ) showHtm = '';
                        else {
                            if ( pN == 'Top20' ) pN = '&nbsp;&nbsp;&nbsp;&nbsp;' + pN + '<br>';
                            else pN = '';
                            showHtm = pN + params.marker + params.name 
                                            + "： " + params.value[2];
                        }
                        return showHtm;
                    }
                },
                /*geo地理坐标系组件。*/
                geo: {
                    show: true,
                    map: 'china',
                    roam: false,           //关闭地图缩放/平移
                    zoom: 1.14,          //当前视角的缩放比例
                    center: [103.83531246, 34.0267395887],
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(147, 235, 248, 1)',
                            borderWidth: 1,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgba(128, 217, 248, 1)',
                            // shadowColor: 'rgba(255, 255, 255, 1)',
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 10
                        },
                        emphasis: {
                            areaColor: '#389BB7',
                            borderWidth: 0
                        }
                    }
                },
            },
            options: []

        };
        for (var n = 0; n < year.length; n++) {
            optionXyMap01.options.push({
                /*series系列列表。每个系列通过 type 决定自己的图表类型*/
                series: [
                	/*定义气泡*/
                    {
                        type: 'scatter',			//散点（气泡）图。
                        coordinateSystem: 'geo',	//该插件系列使用的坐标系
                        data: convertData(mapData[n]),
                        symbolSize: function(val,params) {		//标记的大小;val表示当前迭代的项(或当前项的值)
                            if (val[2] >=200) {// 200<=val
                                return val[2] / 10;
                            }else if(val[2]>=5 && val[2]<=20 ) {//5<=val<=20
                                return val[2] / 2;
                            }else if(val[2]>20 && val[2]<200 ) {//20< val <200
                                return val[2] /5;
                            }else if(val[2]<0.1){   //0.1<=val
                                return val[2] * 50;
                            }else if(1<=val[2]<5){   //1<=val<5
                                return val[2];
                            }else{//0.1 < val < 5
                                return val[2] * 3;
                            }
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: colors[colorIndex][n]
                            }
                        }
                    },
                    //地图点的动画效果
                    {
                        name: 'Top20',//系列名称，用于tooltip的显示,在 setOption 更新数据和配置项时用于指定对应的系列。
                        type: 'effectScatter',		//带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出
                        coordinateSystem: 'geo',
                        data: convertData(mapData[n].sort(function(a, b) {
                            return b.value - a.value;
                        }).slice(0, 20)),			//slice(start,end)返回一个新的字符串，
                        symbolSize: function(val) {
                            if (val[2] >=200) {// 200<=val
                                return val[2] / 10;
                            }else if(val[2]>=5 && val[2]<=20 ) {//5<=val<=20
                                return val[2] / 2;
                            }else if(val[2]>20 && val[2]<200 ) {//20< val <200
                                return val[2] /5;
                            }else if(val[2]<0.1){   //0.1<=val
                                return val[2] * 50;
                            }else{//0.1 < val < 5
                                return val[2] * 3;
                            }
                        },
                        showEffectOn: 'render',//配置何时显示特效:'render' 绘制完成后显示特效。
                        rippleEffect: {
                            brushType: 'stroke'	//rippleEffect涟漪特效相关配置。
                        },
                        hoverAnimation: true,	//是否开启鼠标 hover 的提示动画效果
                        itemStyle: {
                            normal: {
                                color: colors[colorIndex][n],
                                shadowBlur: 10,
                                shadowColor: colors[colorIndex][n]
                            }
                        },
                        zlevel: 1	//zlevel用于 Canvas 分层
                    },
                    /*地图线的动画效果*/
                    /*{
                        type: 'lines',  //lines:路径图：用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 4, //箭头指向速度，值越小速度越快
                            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                            symbol: 'arrow', //箭头图标
                            symbolSize: 3, //图标大小
                        },
                        lineStyle: {
                            normal: {
                                color: colors[colorIndex][n],
                                width: 0.1, //尾迹线条宽度
                                opacity: 0.5, //尾迹线条透明度
                                curveness: .3 //尾迹线条曲直度
                            }
                        },
                        data: convertToLineData(mapData[n], geoGpsMap[Math.ceil(Math.random() * 6)])
                    },*/
                ]
            })
        }


        option = {          //使用echarts内置的渐变色生成器echarts.graphic.LinearGradient
            backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#19f5cd'
                },
                {
                    offset: 1,
                    color: '#5319f5'
                }
            ], false),
            title: [],
            grid: {
                top: '20%',
                left: '10%',
                right: '10%',
                bottom: '15%',
                containLabel: true,     //grid 区域是否包含坐标轴的刻度标签。
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,         //坐标轴两边留白策略
                data: ['2015年', '2016年', '2017年', '2018年', '2019年'],
                axisLabel: {        //坐标轴刻度标签的相关设置。
                    margin: 30,
                    color: '#DCDCDC'
                },
                axisLine: {         //坐标轴轴线相关设置。
                    show: false
                },
                axisTick: {         //坐标轴刻度相关设置。
                    show: true,
                    length: 25,
                    lineStyle: {
                        color: "#ffffff1f"
                    }
                },
                splitLine: {            //坐标轴在 grid 区域中的分隔线。
                    show: true,
                    lineStyle: {
                        color: '#ffffff1f'
                    }
                }
            },
            yAxis: [{
                type: 'value',
                position: 'right',
                axisLabel: {
                    margin: 20,
                    color: '#DCDCDC'
                },

                axisTick: {
                    show: true,
                    length: 15,
                    lineStyle: {
                        color: "#ffffff1f",
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#ffffff1f'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                        width: 2
                    }
                }
            }],
            series: [{
                type: 'line',
                smooth: true, //是否平滑曲线显示
                showAllSymbol: true,
                symbol: 'triangle',
                symbolSize: 7,
                lineStyle: {
                    normal: {
                        color: "#fff", // 线条颜色
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#fff',
                    }
                },
                itemStyle: {            //折线拐点标志的样式。
                    color: "red",
                    borderColor: "#fff",
                    borderWidth: 3
                },
                tooltip: {
                    show: false
                },
                areaStyle: {            //区域填充样式。
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#eb64fb'
                            },
                            {
                                offset: 1,
                                color: '#3fbbff0d'
                            }
                        ], false),
                    }
                },
                data: []
            }]
        };



        var myChart = echarts.init(document.getElementById('map'));
        var myChart_tooltip = echarts.init(document.getElementById('tooltip'));
        myChart.setOption(optionXyMap01);
        myChart.on('mouseover', function (params) {
            if ( params.componentType === 'geo' ) {
                var sX = params.event.event.screenX;
                var sY = params.event.event.screenY;
                if ( window.innerHeight > 595 && window.innerWidth > 1550){
                    if ( sY + 200 > screen.height ){
                        $("#tooltip").css({ "left":sX + window.innerWidth / 5,
                                        "top":sY - window.innerHeight / 5,
                                        "opacity":0.7});
                    }else{
                        $("#tooltip").css({ "left":sX + window.innerWidth / 4.5,
                                        "top":sY - window.innerHeight / 5,
                                        "opacity":0.7});
                    }
                }else if (sX + 500 > screen.width && sY + 300 > screen.height ) {
                    $("#tooltip").css({ "left":sX - 20,
                                    "top":sY - 300,
                                    "opacity":0.7});
                }else if( sY + 300 > screen.height){
                    $("#tooltip").css({ "left":sX + 100,
                                    "top":sY - 350,
                                    "opacity":0.7});
                }else if (sX + 500 > screen.width ) {
                    $("#tooltip").css({ "left":sX -30,
                                    "bottom":sY - 200,
                                    "opacity":0.7});
                }else if ( window.innerWidth > 1366) {
                    $("#tooltip").css({ "left":sX + 150,
                                    "top":sY -100,
                                    "opacity":0.7});
                }
                else {
                    $("#tooltip").css({ "left":sX + 50,
                                    "top":sY - 150,
                                    "opacity":0.7});
                }
                option.title.pop();
                option.series[0].data.pop();
                option.title.push({
                    text: params.name + "近5年(-)数量变化",
                    left: "center",
                    top: "5%",
                    textStyle: {
                        color: "#fff",
                        fontSize: 16
                    }
                });
                option.series[0].data = [];
                find_data(params, mapData).forEach(function(item3){
                    option.series[0].data.push(item3);
                });
                myChart_tooltip.setOption(option);
            }
        });
        myChart.on('mouseout', function (params) {
                $("#tooltip").css("opacity",0);
        });
    });
});



function find_data(params, mapData){
    data_sub = [];
    mapData.forEach(function(item,index){
        item.forEach(function(item2,index2){
            if (item2["name"] == params.name) {
                data_sub.push(item2["value"]);
            }
        });
    });
    return data_sub;
 }

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }


}