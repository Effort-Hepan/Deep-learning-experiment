


$(document).ready(function(){

    var window_width     = $(window).width(),
    window_height        = window.innerHeight,
    header_height        = $(".default-header").height(),
    header_height_static = $(".site-header.static").outerHeight(),
    fitscreen            = window_height - header_height;

    //判断是否是手机，视频播放在手机上会出现问题，是手机则不播放
	var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) ? true : false;
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
        }
    };
    var noBrowser = false;//false表示当前是浏览器
    if (isMobile.any()) {
        //如果是手机访问的话的操作！
        $("#video-src").hide();
        $("#btn_header").hide();
        $("body").css("background-color","rgb(0,0,0,0.4)");
        noBrowser = true;
    }
    $(".fullscreen").css("height", window_height)
    $(".fitscreen").css("height", fitscreen);

    //-------- Active Sticky Js ----------//
    $(".default-header").sticky({topSpacing:0});


    var isPlay = true;
    $("#btn_header").click(function(){
        if (isPlay){
            isPlay = false;
            $('video').trigger('pause');
            $('#btn_header').text("play");
        }else{
            isPlay = true;
            $('video').trigger('play');
            $('#btn_header').text("pause");
        }
        
        
    });

    if (window.innerWidth < 600) $("#my_font_style3").hide();
    //  人群画像--数字滚动计数 
    $('.counter').counterUp({
        delay: 1,
        time: 100
    });

    $('.play-btn').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    $('.active-works-carousel').owlCarousel({
        items:1,
        loop:true,
        margin: 100,
        dots: true,
        autoplay:true,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1,
            },
            768: {
                items: 1,
            }
        }
    });

    $('.active-gallery').owlCarousel({
        items:1,
        loop:true,
        dots: true,
        autoplay:true,
        nav:true,
        navText: ["<span class='lnr lnr-arrow-up'></span>",
        "<span class='lnr lnr-arrow-down'></span>"],        
            responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1,
            },
            768: {
                items: 2,
            },
            900: {
                items: 6,
            }

        }
    });

    //  购买渠道echart
    var myColor = ['#0097B9','#000'];//数据加载顺序从下往上，所以注意逆序
    var emphasis_color = '#00F5FF';
    var dataLine = [27,38,44,49,52,55,65];         
    var QDname = ["销售人员推荐","网络上的品牌推广","传统媒体(电视、报纸、杂志、户外等)","酒类展会、活动","品牌官方网站/公众号等","口碑传销","品牌官方在销售渠道的陈列及展示"];
    let positionLeft = 1,
        max = 100 + 2*positionLeft
    var option = {
        backgroundColor: 'rgb(249,249,255)',
        grid: [//直角坐标系内绘图网格
            {
            left: '0%',//grid 组件离容器左侧的距离。
            top: '5%',
            right: '5%',
            bottom: '-8%',
            containLabel: true //grid 区域是否包含坐标轴的刻度标签。
        }],
        xAxis: [{
            max:max,
            show: false
        }],
        yAxis: [{
            axisTick: 'none',
            axisLine: 'none',
            offset: '27',
            axisLabel: {
                textStyle: {
                    color: '#81E7ED',
                    fontSize: '16'
                }
            },
            data: ["","","","","","",""]
        }, {       //第二个Y轴（最右方百分比）
            axisTick: 'none',
            axisLine: 'none',
            show: false,
            axisLabel: {
                textStyle: {
                    color: '#000',
                    fontSize: '16'
                }
            },
            data: [1, 1, 1, 1,1,1,1]
         }, {

            axisLine: {
                lineStyle: {
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: []
        }],
        series: [
            { //间距,定义了实心bar左边距离外框的距离
                type: 'bar',
                barWidth: 9,
                stack: 'b',//数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置。
                legendHoverLink: false,
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0)'
                    }
                },
                data: [positionLeft,positionLeft,positionLeft,positionLeft,positionLeft,positionLeft,positionLeft],
                //barGap:'80%',
                //barCategoryGap:'80%'
            },{
            name: '条',     //定义了实心bar及bar上方中文
            type: 'bar',
            stack: 'b',
            yAxisIndex: 0,
            data: dataLine,        //其中的数值，代表bar的长度
            label: {
                normal: {
                    show: true,
                    position: [0, -24],
                    formatter: function(param) {
                        return QDname[param.dataIndex]
                    },
                    textStyle: {
                        color: '#000',
                        fontSize: '16'
                    }
                }
            },
            barWidth: 6,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var num = myColor.length
                        return myColor[params.dataIndex % num]
                    },
                    barBorderRadius: 2
                },
                emphasis: {
                    color: emphasis_color,
                    barBorderRadius: 2
                }
            },
            z: 2
        }, {
            name: '白框',    //定义了bar里面间隙
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [99.91, 99.91, 99.91, 99.91, 99.91, 99.91, 99.91],//设置为99让间隙不将外框全部填充完
            barWidth: 17,
            itemStyle: {
                normal: {
                    show:false,
                    color: '#fff',
                    barBorderRadius: 2
                }
            },
            z: 1
        },
        {
            name: '外框',        //定义了外边框和最右边百分比
            type: 'bar',
            yAxisIndex: 2,
            barGap: '-100%',
            data: [100, 100, 100, 100, 100, 100, 100],
            barWidth: 19,
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    distance: 10,
                    formatter: function(data) {
                        return dataLine[data.dataIndex] +"%";
                    },
                    textStyle: {
                        color: '#000',
                        fontSize: '16'
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: function(params) {
                        var num = myColor.length
                        return myColor[params.dataIndex % num]
                    },
                    barBorderRadius: 0
                },
                emphasis: {
                    color: emphasis_color
                }
            },
            z: 0
        },
        {   //用于绘制外边框最左边竖线
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
            barWidth: 17,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var num = myColor.length
                        return myColor[params.dataIndex % num]
                    },
                    barBorderRadius: 0
                },
                emphasis: {
                    color: emphasis_color
                }
             },
        },
         ]
    };
    var myChart = echarts.init(document.getElementById('QD'));
    myChart.setOption(option);

     //消费展示---词云
     try {
            $.ajax({        //不使用$.getJson是因为其异步执行，会使TagCanvas先绘图
                type: "GET",
                url: "https://biyesheji-1258092413.cos.ap-chengdu.myqcloud.com/Liquor-culture/origin_data/%E5%85%A8%E7%90%83%E9%85%92%E7%B1%BB%E5%89%8D%E7%99%BE%E5%BC%BA.json",
                data: "",
                async: false,           //这句话就是阻止ajax异步的
                dataType:"json",
                success: function(result){
                    $.each(result["2019year"], function (i, field) {
                        var str = "排名："+field[0]+"<p class=&quot;y&quot;>国家："+field[1]+"</p>"+"<p class=&quot;y&quot;>类别："+field[2]+"</p>"+"<p class=&quot;y&quot;>品牌："+field[4]+"</p>"+"<p class=&quot;y&quot;>价值："+field[5]+"亿元</p>";     //str为tooltip展示的内容\格式
                        var weight_num = 0;
                        if (field[0] <= 10) weight_num = 40;
                        else if (field[0]>10 && field[0] <= 30) weight_num = 30;
                        else if (field[0]>30 && field[0] <=50) weight_num = 25;
                        else weight_num = 20;
                         
                        $("#myCanvas").append("<a href='javascript:void(0)' data-weight='"+weight_num+"' title='"+str+"''>"+field[3]+"</a>");
                    });
                }
            });
            TagCanvas.clickToFront = 600;
            if (noBrowser){
            	TagCanvas.Start('myCanvas', '', {
	                textColour: '#00BFFF',
	                outlineMethod: "size",  //要使用的突出显示类型:outline\classic\block\colour\size\none
	                weight: true,   //设置为true打开标签的加权。
	                weightFrom: 'data-weight',
	                weightSize:1.0, //使用权重模式为size或时用于调整标签尺寸的乘数both。
	                outlineIncrease: 6, //“大小”轮廓法增加标签大小的像素数。支持负值以减小大小。
	                bgOutlineThickness: 0,  //标签背景轮廓的厚度（以像素为单位），0表示没有轮廓。
	                //reverse: true,
	                depth: 0.8,         //控制透视（0.0-1.0）
	                fadeIn:2000,        //在开始时淡入标签的时间（以毫秒为单位）。
	                dragControl: true,
	                dragThreshold: 2,   //光标必须移动才能算作拖动（而不是单击）的像素数。
	                decel:0.95,         //鼠标离开画布时的减速率。
	                maxSpeed: 0.02,     //最大旋转速度。
	                //minSpeed:  0.01,      //鼠标离开画布时的最小旋转速度。
	                minBrightness: 0.4,  //云背面标签的亮度（不透明度）（0.0-1.0）。
	                //initial: [0.5, 0.2],      //初始旋转，水平和垂直为数组，例如[0.8，-0.3。值乘以maxSpeed。
	                zoomMax: 5,     //最大缩放值。
	                textHeight: 20,  //标记文本字体的高度（以像素为单位）
	                shadow: "rgba(147, 235, 248, 1)",   //每个标签后面的阴影颜色。
	                shadowBlur: 3, //   标签阴影模糊量，以像素为单位。
	                shadowOffset: [2,2],    //标签阴影的X和Y偏移量（以像素为单位）。
	                shape: "Sphere",   //Sphere,hcylinder 或vcylinder hring水平圆和vring垂直圆形状显示
	                pinchZoom: true,  //设置为true通过捏合触摸屏设备来启用放大和缩小云。
	                shuffleTags:true,   //  设置为true随机化标签的顺序。
	                //tooltip: "null",//设置工具提示显示方法：null无工具提示；native用于操作系统工具提示；div基于div。
            	});
            }
            else{
	            TagCanvas.Start('myCanvas', '', {
	                textColour: '#00BFFF',
	                outlineMethod: "size",  //要使用的突出显示类型:outline\classic\block\colour\size\none
	                weight: true,   //设置为true打开标签的加权。
	                weightFrom: 'data-weight',
	                weightSize:1.0, //使用权重模式为size或时用于调整标签尺寸的乘数both。
	                outlineIncrease: 6, //“大小”轮廓法增加标签大小的像素数。支持负值以减小大小。
	                bgOutlineThickness: 0,  //标签背景轮廓的厚度（以像素为单位），0表示没有轮廓。
	                //reverse: true,
	                depth: 0.8,         //控制透视（0.0-1.0）
	                fadeIn:2000,        //在开始时淡入标签的时间（以毫秒为单位）。
	                dragControl: true,
	                dragThreshold: 2,   //光标必须移动才能算作拖动（而不是单击）的像素数。
	                decel:0.95,         //鼠标离开画布时的减速率。
	                maxSpeed: 0.02,     //最大旋转速度。
	                //minSpeed:  0.01,      //鼠标离开画布时的最小旋转速度。
	                minBrightness: 0.4,  //云背面标签的亮度（不透明度）（0.0-1.0）。
	                //initial: [0.5, 0.2],      //初始旋转，水平和垂直为数组，例如[0.8，-0.3。值乘以maxSpeed。
	                zoomMax: 5,     //最大缩放值。
	                textHeight: 20,  //标记文本字体的高度（以像素为单位）
	                shadow: "rgba(147, 235, 248, 1)",   //每个标签后面的阴影颜色。
	                shadowBlur: 3, //   标签阴影模糊量，以像素为单位。
	                shadowOffset: [2,2],    //标签阴影的X和Y偏移量（以像素为单位）。
	                shape: "Sphere",   //Sphere,hcylinder 或vcylinder hring水平圆和vring垂直圆形状显示
	                pinchZoom: true,  //设置为true通过捏合触摸屏设备来启用放大和缩小云。
	                shuffleTags:true,   //  设置为true随机化标签的顺序。
	                tooltip: "div",//设置工具提示显示方法：null无工具提示；native用于操作系统工具提示；div基于div。
	                tooltipClass: "x",
	            });
        	}
        } catch (e) {
            // something went wrong, hide the canvas container
            //document.getElementById('myCanvasContainer').style.display = 'none';
        }

    //消费展示---玫瑰图
    var colorArr=["#218de0", "#00C5CD", "#85e647", "#5d5cda", "#01cbb3"];
    var colorAlpha=['rgba(60,170,211,0.05)','rgba(1,203,179,0.05)','rgba(133,230,71,0.05)','rgba(93,92,218,0.05)','rgba(5,197,176,0.05)','rgba(194,153,39,0.05)']
    option_polar = {
        backgroundColor:"#f9f9ff",
        grid: {
            left: "50%",
            top: "10%",
            bottom: "10%",
            right:" 10%",
            containLabel: true
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {d}%"
        },
        legend: {
          show:false
        },
        
        polar: {},
        angleAxis: {
            interval: 1,
            type: 'category',
            data: [],
            z: 10,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#0B4A6B",
                    width: 1,
                    type: "solid"
                },
            },
            axisLabel: {
                interval: 0,
                show: true,
                color: "#0B4A6B",
                margin: 8,
                fontSize: 16
            },
        },
        radiusAxis: {
            min: 20,
            max: 120,
            interval: 20,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#0B3E5E",
                    width: 1,
                    type: "solid"
                },
            },
            axisLabel: {
                formatter: '{value} %',
                show: false,
                padding: [0, 0, 20, 0],
                color: "#0B3E5E",
                fontSize: 16
            },
            splitLine: {
                lineStyle: {
                    color: "#07385e",
                    width: 2,
                    type: "dashed"
                }
            }
        },
        calculable: true,
        series: [ {
            stack: 'a',
            type: 'pie',
            radius: '80%',
            roseType: 'radius',
            zlevel:10,
           startAngle: 100,
            label: {
                normal: {
                    formatter: [ '{b|{b}}','{d|{d}%}'].join('\n'),
                    rich: {
                        b: {
                            color: '#3bd2fe',
                            fontSize: 14,
                            lineHeight: 20
                        },
                        d: {
                            color: '#3bd2fe',
                            fontSize: 14,
                            height: 20
                        },
                    },
                }
            },
            labelLine: {
                normal: {
                    show: true,
                    length: 10,
                    length2: 45,
                    lineStyle: {
                    color: '#0096b1'
                        
                    }
                },
                emphasis: {
                    show: false
                }
            },
            data: [{
                    value: 8,
                    name: '总经理/CEO/总裁',
                     itemStyle: {
                      borderColor: colorArr[0],
                      borderWidth:2,
                      shadowBlur: 20,
                      shadowColor: "#41a8f8",
                      shadowOffsetx: 25,
                      shadowOffsety: 20,
                      color:colorAlpha[0]
                        }
                },
                {
                    value: 21,
                    name: '高层管理人员',
                    itemStyle: {
                      borderColor: colorArr[1],
                      borderWidth:2,
                      shadowBlur: 20,
                      shadowColor: colorArr[1],
                      shadowOffsetx: 25,
                      shadowOffsety: 20,
                      color:colorAlpha[1]
                        }
                },
                {
                    value: 49,
                    name: '中层管理人员',
                    itemStyle: {
                      borderColor: colorArr[2],
                      borderWidth:2,
                      shadowBlur: 20,
                      shadowColor: colorArr[2],
                      shadowOffsetx: 25,
                      shadowOffsety: 20,
                      color:colorAlpha[2]
                        }
                },
                {
                    value: 22,
                    name: '一般职员',
                    itemStyle: {
                      borderColor: colorArr[3],
                      borderWidth:2,
                      shadowBlur: 20,
                      shadowColor: colorArr[3],
                      shadowOffsetx: 25,
                      shadowOffsety: 20,
                      color:colorAlpha[3]
                        }
                }
            ]
        }, ]
    }
    var myChart_polar = echarts.init(document.getElementById('polar_chart'));
    myChart_polar.setOption(option_polar);



    //请求预测算法结果数据
    var fake_data=[{"analysis":[{"coefficient":[{"GDP_SYL":0,"LS_SYL":0,"QK_SYL":0,"XSL_SYL":0,"name":"pearson相关系数"},{"GDP_SYL":0,"LS_SYL":0,"QK_SYL":0,"XSL_SYL":0,"name":"spearman相关系数"},{"GDP_SYL":0,"LS_SYL":0,"QK_SYL":0,"XSL_SYL":0,"name":"kendall相关系数"}],"sub_analysis":[{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":1994},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":1995},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":1996},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":1997},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":1998},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":1999},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2000},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2001},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2002},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2003},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2004},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2005},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2006},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2007},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2008},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2009},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2010},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2011},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2012},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2013},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2014},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2015},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":-99999,"ZC_describe":"","ZC_describe_detailed":"","year":2016},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2017},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2018},{"GDP":0,"LS":0,"QK":0,"SYL":0,"XSL":0,"ZC_coefficient":0,"ZC_describe":"","ZC_describe_detailed":"","year":2019}]}],"prediction":[{"accuracy":[{"linear_method_accuracy":0,"multi_LSTM_method_accuracy":0,"single_LSTM_method_accuracy":0}],"predict":[{"linear_method":0,"multi_LSTM_method":0,"really_value":0,"single_LSTM_method":0,"year":2015},{"linear_method":0,"multi_LSTM_method":0,"really_value":0,"single_LSTM_method":0,"year":2016},{"linear_method":0,"multi_LSTM_method":0,"really_value":0,"single_LSTM_method":0,"year":2017},{"linear_method":0,"multi_LSTM_method":0,"really_value":0,"single_LSTM_method":0,"year":2018},{"linear_method":0,"multi_LSTM_method":0,"really_value":0,"single_LSTM_method":0,"year":2019},{"linear_method":0,"multi_LSTM_method":0,"really_value":0,"single_LSTM_method":0,"year":2020},{"linear_method":0,"multi_LSTM_method":0,"really_value":0,"single_LSTM_method":0,"year":2021},{"linear_method":0,"multi_LSTM_method":0,"really_value":0,"single_LSTM_method":0,"year":2022}]}]}];
    var fake_json = JSON.stringify(fake_data);
    var hander_json = JSON.parse(fake_json);
    var GDP = [];
    var LS = [];
    var QK = [];
    var XSL = [];
    var SYL = []
    var ZC_coefficient = [];
    var ZC_describe = [];
    var ZC_describe_detailed = [];
    var years_data = [];
    $.each(hander_json[0]["analysis"][0]["sub_analysis"], function(i, val){
        GDP.push(val["GDP"]);
        LS.push(val["LS"]);
        QK.push(val["QK"]);
        XSL.push(val["XSL"]);
        SYL.push(val["SYL"]);
        ZC_coefficient.push(val["ZC_coefficient"]);
        ZC_describe.push(val["ZC_describe"]);
        ZC_describe_detailed.push(val["ZC_describe_detailed"]);
        years_data.push(val["year"]);
    });


    //处理相关系数
    var pearson_coefficient = [];
    var spearman_coefficient = [];
    var kendall_coefficient = [];
    var coefficient_class = ["人均可支配收入","期刊发布量", "粮食产量", "白酒销售量"];

    pearson_coefficient.push(Math.abs(hander_json[0]["analysis"][0]["coefficient"][0]["GDP_SYL"]));
    pearson_coefficient.push(Math.abs(hander_json[0]["analysis"][0]["coefficient"][0]["QK_SYL"]));
    pearson_coefficient.push(Math.abs(hander_json[0]["analysis"][0]["coefficient"][0]["LS_SYL"]));
    pearson_coefficient.push(Math.abs(hander_json[0]["analysis"][0]["coefficient"][0]["XSL_SYL"]));
    spearman_coefficient.push(Math.abs(hander_json[0]["analysis"][0]["coefficient"][1]["GDP_SYL"]));
    spearman_coefficient.push(Math.abs(hander_json[0]["analysis"][0]["coefficient"][1]["QK_SYL"]));
    spearman_coefficient.push(Math.abs(hander_json[0]["analysis"][0]["coefficient"][1]["LS_SYL"]));
    spearman_coefficient.push(Math.abs(hander_json[0]["analysis"][0]["coefficient"][1]["XSL_SYL"]));
    kendall_coefficient.push(Math.abs(hander_json[0]["analysis"][0]["coefficient"][2]["GDP_SYL"]));
    kendall_coefficient.push(Math.abs(hander_json[0]["analysis"][0]["coefficient"][2]["QK_SYL"]));
    kendall_coefficient.push(Math.abs(hander_json[0]["analysis"][0]["coefficient"][2]["LS_SYL"]));
    kendall_coefficient.push(Math.abs(hander_json[0]["analysis"][0]["coefficient"][2]["XSL_SYL"]));

    //分析阶段折线图展示K1
    var option_analysis_K1 = {
        backgroundColor: 'rgb(0,0,0,0)',
        // title: {
        //     text: "投资受益效益",
        //     left: "center",
        //     textStyle: {
        //         color: "#fff",
        //         fontSize: 20
        //     }
        // },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return params[0].axisValue + "年<br>" +params[0].marker+params[0].seriesName+"："+params[0].value+"<br>"+params[1].marker+params[1].seriesName+"："+params[1].value
            },
        },
        legend: {
            data: ['白酒商用量', '人均可支配收入'],
            top: 'top',
            textStyle: {
                color: '#fff',
                fontSize:14
            },
            selectedMode:false
        },
        grid: {
            left: '10%',
            right: '10%',
           
            containLabel: false
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            //boundaryGap: false,
            data: years_data,
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }

        },
        yAxis: [{
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#aaa',
                    type :'dashed'
                }
            },

        },{
            position: 'right',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#ddd',
                    type :'dashed'
                }
            },

        }],
        series: [{
            name: '白酒商用量',
            type: 'line',
            yAxisIndex: 0,
            data: SYL,
            lineStyle: {
                        color: "rgb(28,28,28)",
                        shadowBlur: 12,
                        shadowColor: "rgb(28,28,28,0.9)",
                        shadowOffsetX: 3,
                        shadowOffsetY: 3
            },
            itemStyle: {
                color: "rgb(28,28,28)",
            },
            symbol: 'none'  //去除折线拐点
        }, {
            name: '人均可支配收入',
            type: 'line',
            yAxisIndex: 1,
            data: GDP,
            lineStyle: {
                            color: 'rgb(33,148,246)',
                            shadowBlur: 12,
                            shadowColor: 'rgb(33,148,246,0.9)',
                            shadowOffsetX: 3,
                            shadowOffsetY: 3
                        },
            itemStyle: {
                color: 'rgb(33,148,246)',
            },
            symbol: 'none'
        }]
    };
    var myChart_analysis_K1 = echarts.init(document.getElementById('K1'));
    myChart_analysis_K1.setOption(option_analysis_K1);
    //分析阶段折线图展示K2
    var option_analysis_K2 = {
        backgroundColor: 'rgb(0,0,0,0)',
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return params[0].axisValue + "年<br>" +params[0].marker+params[0].seriesName+"："+params[0].value+"<br>"+params[1].marker+params[1].seriesName+"："+params[1].value
            },
        },
        legend: {
            data: ['白酒商用量', '白酒销售量'],
            top: 'top',
            textStyle: {
                color: '#fff',
                fontSize:14
            },
            selectedMode:false
        },
        grid: {
            left: '10%',
            right: '10%',
           
            containLabel: false
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: years_data,
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }

        },
        yAxis: [{
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#aaa',
                    type :'dashed'
                }
            },

        },{
            position: 'right',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#ddd',
                    type :'dashed'
                }
            },

        }],
        series: [{
            name: '白酒商用量',
            type: 'line',
            yAxisIndex: 0,
            data: SYL,
            lineStyle: {
                        color: "rgb(28,28,28)",
                        shadowBlur: 12,
                        shadowColor: "rgb(28,28,28,0.9)",
                        shadowOffsetX: 3,
                        shadowOffsetY: 3
            },
            itemStyle: {
                color: "rgb(28,28,28)",
            },
            symbol: 'none'
        }, {
            name: '白酒销售量',
            type: 'line',
            yAxisIndex: 1,
            data: XSL,
            lineStyle: {
                            color: 'rgb(255,127,0)',
                            shadowBlur: 12,
                            shadowColor: 'rgb(255,127,0,0.9)',
                            shadowOffsetX: 3,
                            shadowOffsetY: 3
                        },
            itemStyle: {
                color: 'rgb(255,127,0)',
            },
            symbol: 'none'
        }]
    };
    var myChart_analysis_K2 = echarts.init(document.getElementById('K2'));
    myChart_analysis_K2.setOption(option_analysis_K2);
    //分析阶段折线图展示K3
    var option_analysis_K3 = {
        backgroundColor: 'rgb(0,0,0,0)',
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return params[0].axisValue + "年<br>" +params[0].marker+params[0].seriesName+"："+params[0].value+"<br>"+params[1].marker+params[1].seriesName+"："+params[1].value
            },
        },
        legend: {
            data: ['白酒商用量', '期刊发布量'],
            top: 'top',
            textStyle: {
                color: '#fff',
                fontSize:14
            },
            selectedMode:false
        },
        grid: {
            left: '10%',
            right: '10%',
           
            containLabel: false
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: years_data,
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }

        },
        yAxis: [{
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#aaa',
                    type :'dashed'
                }
            },

        },{
            position: 'right',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#ddd',
                    type :'dashed'
                }
            },

        }],
        series: [{
            name: '白酒商用量',
            type: 'line',
            yAxisIndex: 0,
            data: SYL,
            lineStyle: {
                        color: "rgb(28,28,28)",
                        shadowBlur: 12,
                        shadowColor: "rgb(28,28,28,0.9)",
                        shadowOffsetX: 3,
                        shadowOffsetY: 3
            },
            itemStyle: {
                color: "rgb(28,28,28)",
            },
            symbol: 'none'
        }, {
            name: '期刊发布量',
            type: 'line',
            yAxisIndex: 1,
            data: QK,
            lineStyle: {
                            color: 'rgb(238,44,44)',
                            shadowBlur: 12,
                            shadowColor: 'rgb(238,44,44,0.9)',
                            shadowOffsetX: 3,
                            shadowOffsetY: 3
                        },
            itemStyle: {
                color: 'rgb(238,44,44)',
            },
            symbol: 'none'
        }]
    };
    var myChart_analysis_K3 = echarts.init(document.getElementById('K3'));
    myChart_analysis_K3.setOption(option_analysis_K3);
    //分析阶段折线图展示K4
    var option_analysis_K4 = {
        backgroundColor: 'rgb(0,0,0,0)',
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return params[0].axisValue + "年<br>" +params[0].marker+params[0].seriesName+"："+params[0].value+"<br>"+params[1].marker+params[1].seriesName+"："+params[1].value
            },
        },
        legend: {
            data: ['白酒商用量', '粮食产量'],
            top: 'top',
            textStyle: {
                color: '#fff',
                fontSize:14
            },
            selectedMode:false
        },
        grid: {
            left: '10%',
            right: '10%',
           
            containLabel: false
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: years_data,
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }

        },
        yAxis: [{
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#aaa',
                    type :'dashed'
                }
            },

        },{
            position: 'right',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#ddd',
                    type :'dashed'
                }
            },

        }],
        series: [{
            name: '白酒商用量',
            type: 'line',
            yAxisIndex: 0,
            data: SYL,
            lineStyle: {
                        color: "rgb(28,28,28)",
                        shadowBlur: 12,
                        shadowColor: "rgb(28,28,28,0.9)",
                        shadowOffsetX: 3,
                        shadowOffsetY: 3
            },
            itemStyle: {
                color: "rgb(28,28,28)",
            },
            symbol: 'none'
        }, {
            name: '粮食产量',
            type: 'line',
            yAxisIndex: 1,
            data: LS,
            lineStyle: {
                            color: 'rgb(0,245,255)',
                            shadowBlur: 12,
                            shadowColor: 'rgb(0,245,255,0.9)',
                            shadowOffsetX: 3,
                            shadowOffsetY: 3
                        },
            itemStyle: {
                color: 'rgb(0,245,255)',
            },
            symbol: 'none'
        }]
    };
    var myChart_analysis_K4 = echarts.init(document.getElementById('K4'));
    myChart_analysis_K4.setOption(option_analysis_K4);

       //定义柱状图相关系数
    var coefficient_bar = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['pearson', 'spearman','kendall'],
            top: 'top',
            left: '28%',
            textStyle: {
                color: '#fff',
                fontSize: 15
            },
            //selectedMode:false
        },
        grid: {
            top: '15%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#aaa',
                    type :'dashed'
                }
            },
        },
        xAxis: {
            type: 'category',
            data: coefficient_class,
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            z:10,
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#aaa',
                    type :'dashed'
                }
            },
        },
        series: [
            {
                name: 'pearson',
                type: 'bar',
                data: pearson_coefficient,
                itemStyle: {
                    color: '#000',
                    barBorderRadius: [4, 4, 2, 2],
                    opacity:0.8,
                    shadowColor:new echarts.graphic.LinearGradient(0, 0, 0, 1,       //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                        [
                            {offset: 0, color: '#000'},
                            {offset: 0.5, color: '#888'},
                            {offset: 1, color: '#ddd'}
                        ]                //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                    ),
                    shadowOffsetX:2,
                    shadowOffsetY:2,
                    shadowBlur: 10
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        distance: 10,
                        textStyle: {
                            color: 'rgb(0,0,0,0.8)',
                            fontSize: '16'
                        }
                    }
                },
            },
            {
                name: 'spearman',
                type: 'bar',
                data: spearman_coefficient,
                itemStyle: {
                    color: '#EE7621',
                    barBorderRadius: [4, 4, 2, 2], //（顺时针左上，右上，右下，左下）,
                    borderType: 'solid',
                    opacity:0.8,
                    shadowColor:new echarts.graphic.LinearGradient(0, 0, 0, 1,       //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                        [
                            {offset: 0, color: '#EE7621'},
                            {offset: 0.5, color: '#FF7F00'},
                            {offset: 1, color: '#FFA54F'}
                        ]                //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                    ),
                    shadowOffsetX:2,
                    shadowOffsetY:2,
                    shadowBlur: 10
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        distance: 10,
                        textStyle: {
                            color: '#CD3333',
                            fontSize: '16'
                        }
                    }
                },
            },
            {
                name: 'kendall',
                type: 'bar',
                data: kendall_coefficient,
                itemStyle: {
                    color: '#00BFFF',
                    barBorderRadius: [4, 4, 2, 2], //（顺时针左上，右上，右下，左下）,
                    borderType: 'solid',
                    opacity:0.8,
                    shadowColor:new echarts.graphic.LinearGradient(0, 0, 0, 1,       //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                        [
                            {offset: 0, color: '#00BFFF'},
                            {offset: 0.5, color: '#00F5FF'},
                            {offset: 1, color: '#98F5FF'}
                        ]                //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                    ),
                    shadowOffsetX:2,
                    shadowOffsetY:2,
                    shadowBlur: 10
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        distance: 10,
                        textStyle: {
                            color: '#00BFFF',
                            fontSize: '16'
                        }
                    }
                },
            }
        ]
    };
    var myChart_analysis_K5 = echarts.init(document.getElementById('K5'));
    myChart_analysis_K5.setOption(coefficient_bar);



    
    //将所有分析数据重新处理为二维数组-----定义散点图
    var COVER_P_XSL = [[0,0]]
    var COVER_P_LS = [[0,0]]
    var COVER_P_QK = [[0,0]]
    var COVER_P_GDP = [[0,0]]
    
    
    //定义散点图P1
    var option_analysis_P1 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                label:{
                    color:'#fff',
                    backgroundColor :'rgb(0,0,0,0.7)'
                },
            },
            formatter: function (params) {
                 //data数组第一位为X轴，第二位为Y轴
                 return params[0].marker+"期刊发布量："+params[0].data[1]+"<br>"+params[0].marker+"白酒商用量："+params[0].data[0]+"<br>"+params[1].marker+"回归值(X,Y)："+params[1].data[0]+", "+Math.round(params[1].data[1]*100)/100;
            }
        },
        xAxis: {
            name:"白酒商用量",
            nameLocation:'center',
            nameTextStyle:{
                fontSize:15,
                padding:[20,0,0,0]
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            type: 'value',
            splitLine: {
                lineStyle: {
                    color:'#aaa',
                    type: 'dashed'
                }
            },
        },
        yAxis: {
            name:"期刊发布量",
            nameLocation:'center',
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            nameTextStyle:{
                fontSize:15,
                padding:[0,0,25,0]
            },
            type: 'value',
            splitLine: {
                lineStyle: {
                    color:'#aaa',
                    type: 'dashed'
                }
            },
        },
        series: [{
            name: 'scatter',
            type: 'scatter',
            itemStyle: {
                color: 'rgb(238,44,44)',
                shadowBlur: 12,
                shadowColor: 'rgb(238,44,44,0.9)',
                shadowOffsetX: 3,
                shadowOffsetY: 3
            },
            data: COVER_P_QK
        }, {
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: [[0,0]],
            lineStyle: {
                color: 'rgb(238,44,44)',
                shadowBlur: 12,
                shadowColor: 'rgb(238,44,44,0.9)',
                shadowOffsetX: 3,
                shadowOffsetY: 3
            },
            itemStyle: {
                color: 'rgb(238,44,44)',
            },
            symbol: 'none',
        }]
    };
    var myChart_analysis_P1 = echarts.init(document.getElementById('P1'));
    myChart_analysis_P1.setOption(option_analysis_P1);

    //定义P2
    var option_analysis_P2 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                label:{
                    color:'#fff',
                    backgroundColor :'rgb(0,0,0,0.7)'
                },
            },
            formatter: function (params) {
                     //data数组第一位为X轴，第二位为Y轴
                     return params[0].marker+"白酒销售量："+params[0].data[1]+"<br>"+params[0].marker+"白酒商用量："+params[0].data[0]+"<br>"+params[1].marker+"回归值(X,Y)："+params[1].data[0]+", "+Math.round(params[1].data[1]*100)/100;
            }
        },
        xAxis: {
            name:"白酒商用量",
            nameLocation:'center',
            nameTextStyle:{
                fontSize:15,
                padding:[20,0,0,0]
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            type: 'value',
            splitLine: {
                lineStyle: {
                    color:'#aaa',
                    type: 'dashed'
                }
            },
        },
        yAxis: {
            name:"白酒销售量",
            nameLocation:'center',
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            nameTextStyle:{
                fontSize:15,
                padding:[0,0,25,0]
            },
            type: 'value',
            splitLine: {
                lineStyle: {
                    color:'#aaa',
                    type: 'dashed'
                }
            },
        },
        series: [{
            name: 'scatter',
            type: 'scatter',
            itemStyle: {
                color: 'rgb(255,127,0)',
                shadowBlur: 12,
                shadowColor: 'rgb(255,127,0,0.9)',
                shadowOffsetX: 3,
                shadowOffsetY: 3
            },
            data: COVER_P_XSL
        }, {
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: [[0,0]],
            lineStyle: {
                color: 'rgb(255,127,0)',
                shadowBlur: 12,
                shadowColor: 'rgb(255,127,0,0.9)',
                shadowOffsetX: 3,
                shadowOffsetY: 3
            },
            itemStyle: {
                color: 'rgb(255,127,0)',
            },
            symbol: 'none',
        }]
    };
    var myChart_analysis_P2 = echarts.init(document.getElementById('P2'));
    myChart_analysis_P2.setOption(option_analysis_P2);

    //定义P3
    var option_analysis_P3 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                label:{
                    color:'#fff',
                    backgroundColor :'rgb(0,0,0,0.7)'
                },
            },
            formatter: function (params) {
                     //data数组第一位为X轴，第二位为Y轴
                     return params[0].marker+"人均可支配收入："+params[0].data[1]+"<br>"+params[0].marker+"白酒商用量："+params[0].data[0]+"<br>"+params[1].marker+"回归值(X,Y)："+params[1].data[0]+", "+Math.round(params[1].data[1]*100)/100;
            }
        },
        xAxis: {
            name:"白酒商用量",
            nameLocation:'center',
            scale: true,
            nameTextStyle:{
                fontSize:15,
                padding:[20,0,0,0]
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            type: 'value',
            splitLine: {
                lineStyle: {
                    color:'#aaa',
                    type: 'dashed'
                }
            },
        },
        yAxis: {
            name:"人均可支配收入",
            nameLocation:'center',
            scale: true,
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            nameTextStyle:{
                fontSize:15,
                padding:[0,0,25,0]
            },
            type: 'value',
            splitLine: {
                lineStyle: {
                    color:'#aaa',
                    type: 'dashed'
                }
            },
        },
        series: [{
            name: 'scatter',
            type: 'scatter',
            itemStyle: {
                color: 'rgb(33,148,246)',
                shadowBlur: 12,
                shadowColor: 'rgb(33,148,246,0.9)',
                shadowOffsetX: 3,
                shadowOffsetY: 3
            },
            data: COVER_P_GDP
        }, {
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: [[0,0]],
            lineStyle: {
                color: 'rgb(33,148,246)',
                shadowBlur: 12,
                shadowColor: 'rgb(33,148,246,0.9)',
                shadowOffsetX: 3,
                shadowOffsetY: 3
            },
            itemStyle: {
                color: 'rgb(33,148,246)',
            },
            symbol: 'none',
        }]
    };
    var myChart_analysis_P3 = echarts.init(document.getElementById('P3'));
    myChart_analysis_P3.setOption(option_analysis_P3);

    //定义P4
    var option_analysis_P4 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                label:{
                    color:'#fff',
                    backgroundColor :'rgb(0,0,0,0.7)'
                },
            },
            formatter: function (params) {
                     //data数组第一位为X轴，第二位为Y轴
                     return params[0].marker+"粮食产量："+params[0].data[1]+"<br>"+params[0].marker+"白酒商用量："+params[0].data[0]+"<br>"+params[1].marker+"回归值(X,Y)："+params[1].data[0]+", "+Math.round(params[1].data[1]*100)/100;
            }
        },
        xAxis: {
            name:"白酒商用量",
            nameLocation:'center',
            nameTextStyle:{
                fontSize:15,
                padding:[20,0,0,0]
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            scale:true,
            type: 'value',
            splitLine: {
                lineStyle: {
                    color:'#aaa',
                    type: 'dashed'
                }
            },
        },
        yAxis: {
            name:"粮食产量",
            nameLocation:'center',
            scale:true,
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            nameTextStyle:{
                fontSize:15,
                padding:[0,0,25,0]
            },
            type: 'value',
            splitLine: {
                lineStyle: {
                    color:'#aaa',
                    type: 'dashed'
                }
            },
        },
        series: [{
            name: 'scatter',
            type: 'scatter',
            itemStyle: {
                color: 'rgb(0,245,255)',
                shadowBlur: 12,
                shadowColor: 'rgb(0,245,255,0.9)',
                shadowOffsetX: 3,
                shadowOffsetY: 3
            },
            data: COVER_P_LS
        }, {
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: [[0,0]],
            lineStyle: {
                color: 'rgb(0,245,255)',
                shadowBlur: 12,
                shadowColor: 'rgb(0,245,255,0.9)',
                shadowOffsetX: 3,
                shadowOffsetY: 3
            },
            itemStyle: {
                color: 'rgb(0,245,255)',
            },
            symbol: 'none',
        }]
    };
    var myChart_analysis_P4 = echarts.init(document.getElementById('P4'));
    myChart_analysis_P4.setOption(option_analysis_P4);


    //处理prediction数据
    var linear_method_accuracy = hander_json[0]["prediction"][0]["accuracy"][0]["linear_method_accuracy"];
    var multi_LSTM_method_accuracy = hander_json[0]["prediction"][0]["accuracy"][0]["multi_LSTM_method_accuracy"];
    var single_LSTM_method_accuracy = hander_json[0]["prediction"][0]["accuracy"][0]["single_LSTM_method_accuracy"];
    var linear_method = []
    var multi_LSTM_method = []
    var really_value = []
    var single_LSTM_method = []
    var predict_years = []
    $.each(hander_json[0]["prediction"][0]["predict"], function(i, val){
        linear_method.push(val["linear_method"]);
        multi_LSTM_method.push(val["multi_LSTM_method"]);
        really_value.push(val["really_value"]);
        single_LSTM_method.push(val["single_LSTM_method"]);
        predict_years.push(val["year"]);
    });
    //切割数组，用于分段显示
    really_value.splice(5,3);
    var linear = []
    var multi = []
    var single = []
    for (i=0; i<5;i++){
        linear.push(linear_method[i]);
        single.push(single_LSTM_method[i]);
        multi.push(multi_LSTM_method[i]);
    }
    var linear_sub = ['-','-','-','-']
    var multi_sub = ['-','-','-','-']
    var single_sub = ['-','-','-','-']
    for (i = 4; i < 8; i++){
        linear_sub.push(linear_method[i]);
        single_sub.push(single_LSTM_method[i]);
        multi_sub.push(multi_LSTM_method[i]);
    }
    var linear_sub2 = []
    var multi_sub2 = []
    var single_sub2 = []
    for (i = 5; i < 8; i++){
        linear_sub2.push(linear_method[i]);
        single_sub2.push(single_LSTM_method[i]);
        multi_sub2.push(multi_LSTM_method[i]);
    }

    //初始化最终预测阶段表S1
    $('.cascade').casadeLanding(hander_json, false);//false布尔值用于给动态数字加锁，防止执行太快出现异常
    //像素低于1000显示以下
    //预测算法表  线性回归  S_S_1
    var option_prediction_S1 = {
        backgroundColor: 'rgb(0,0,0,0)',
        title: {
            text: "Multi-Linear",
            top:'top',
            left:'center',
            textStyle: {
                color: "#fff",
                fontSize: 22
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                if (params.length == 1) {
                    return params[0].name+"年<br>"+params[0].marker+params[0].seriesName+": "+params[0].value;
                }else if (params.length = 3){
                    return params[0].name+"年<br>"+params[0].marker+params[0].seriesName+": "+params[0].value+"<br>"+params[1].marker+params[1].seriesName+": "+params[1].value;
                }
            },
        },
        legend: {
            data: ['预测值', '真实值','未来3年'],
            top: '9%',
            textStyle: {
                color: '#fff',
                fontSize:14
            },
            //selectedMode:false
        },
        grid: {
            left: '10%',
            right: '10%',
            top:'19%',
            containLabel: false
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: predict_years,
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }

        },
        yAxis: [{
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#aaa',
                    type :'dashed'
                }
            },

        }],
        series: [{
            name: '预测值',
            type: 'line',
            yAxisIndex: 0,
            data: linear,
            lineStyle: {
                        color: "rgb(33,148,246)",
                        shadowBlur: 12,
                        shadowColor: "rgb(33,148,246,0.9)",
                        shadowOffsetX: 3,
                        shadowOffsetY: 3
            },
            itemStyle: {
                color: "rgb(33,148,246)",
            },
            symbol: 'none'
        }, {
            name: '真实值',
            type: 'line',
            data: really_value,
            lineStyle: {
                            color: 'rgb(0,0,0)',
                            shadowBlur: 12,
                            shadowColor: 'rgb(0,0,0,0.9)',
                            shadowOffsetX: 3,
                            shadowOffsetY: 3
                        },
            itemStyle: {
                color: 'rgb(0,0,0)',
            },
            symbol: 'none'
          }, {
                name: '未来3年',
                type: 'line',
                data: linear_sub,
                lineStyle: {
                                color: 'rgb(238,44,44)',
                                shadowBlur: 12,
                                shadowColor: 'rgb(238,44,44,0.9)',
                                shadowOffsetX: 3,
                                shadowOffsetY: 3
                            },
                itemStyle: {
                    color: 'rgb(238,44,44)',
                },
                symbol: 'none'
            }
        ]
    };
    var myChart_prediction_S1 = echarts.init(document.getElementById('S_S_1'));
    myChart_prediction_S1.setOption(option_prediction_S1);
    //预测算法表  单特征LSTM  S_S_2
    var option_prediction_S2 = {
        backgroundColor: 'rgb(0,0,0,0)',
        title: {
            text: "Single-LSTM",
            top:'top',
            left:'center',
            textStyle: {
                color: "#fff",
                fontSize: 22
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                if (params.length == 1) {
                    return params[0].name+"年<br>"+params[0].marker+params[0].seriesName+": "+params[0].value;
                }else if (params.length = 3){
                    return params[0].name+"年<br>"+params[0].marker+params[0].seriesName+": "+params[0].value+"<br>"+params[1].marker+params[1].seriesName+": "+params[1].value;
                }
            },
        },
        legend: {
            data: ['预测值', '真实值','未来3年'],
            top: '9%',
            textStyle: {
                color: '#fff',
                fontSize:14
            },
            //selectedMode:false
        },
        grid: {
            left: '10%',
            right: '10%',
            top:'19%',
            containLabel: false
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: [2015,2016,2017,2018,2019,2020,2021,2022],
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }

        },
        yAxis: [{
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#aaa',
                    type :'dashed'
                }
            },

        }],
        series: [{
            name: '预测值',
            type: 'line',
            yAxisIndex: 0,
            data: single,
            lineStyle: {
                        color: "rgb(33,148,246)",
                        shadowBlur: 12,
                        shadowColor: "rgb(33,148,246,0.9)",
                        shadowOffsetX: 3,
                        shadowOffsetY: 3
            },
            itemStyle: {
                color: "rgb(33,148,246)",
            },
            symbol: 'none'
        }, {
            name: '真实值',
            type: 'line',
            data: really_value,
            lineStyle: {
                            color: 'rgb(28,28,28)',
                            shadowBlur: 12,
                            shadowColor: 'rgb(28,28,28,0.9)',
                            shadowOffsetX: 3,
                            shadowOffsetY: 3
                        },
            itemStyle: {
                color: 'rgb(28,28,28)',
            },
            symbol: 'none'
          }, {
                name: '未来3年',
                type: 'line',
                data: single_sub,
                lineStyle: {
                                color: 'rgb(238,44,44)',
                                shadowBlur: 12,
                                shadowColor: 'rgb(238,44,44,0.9)',
                                shadowOffsetX: 3,
                                shadowOffsetY: 3
                            },
                itemStyle: {
                    color: 'rgb(238,44,44)',
                },
                symbol: 'none'
            }
        ]
    };
    var myChart_prediction_S2 = echarts.init(document.getElementById('S_S_2'));
    myChart_prediction_S2.setOption(option_prediction_S2);
    //预测算法表   多特征LSTM  S_S_3
    var option_prediction_S3 = {
        backgroundColor: 'rgb(0,0,0,0)',
        title: {
            text: "Multi-LSTM",
            top:'top',
            left:'center',
            textStyle: {
                color: "#fff",
                fontSize: 22
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                if (params.length == 1) {
                    return params[0].name+"年<br>"+params[0].marker+params[0].seriesName+": "+params[0].value;
                }else if (params.length = 3){
                    return params[0].name+"年<br>"+params[0].marker+params[0].seriesName+": "+params[0].value+"<br>"+params[1].marker+params[1].seriesName+": "+params[1].value;
                }
            },
        },
        legend: {
            data: ['预测值', '真实值','未来3年'],
            top: '9%',
            textStyle: {
                color: '#fff',
                fontSize:14
            },
            //selectedMode:false
        },
        grid: {
            left: '10%',
            right: '10%',
            top:'19%',
            containLabel: false
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: [2015,2016,2017,2018,2019,2020,2021,2022],
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }

        },
        yAxis: [{
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#aaa',
                    type :'dashed'
                }
            },

        }],
        series: [{
            name: '预测值',
            type: 'line',
            yAxisIndex: 0,
            data: multi,
            lineStyle: {
                        color: "rgb(33,148,246)",
                        shadowBlur: 12,
                        shadowColor: "rgb(33,148,246,0.9)",
                        shadowOffsetX: 3,
                        shadowOffsetY: 3
            },
            itemStyle: {
                color: "rgb(33,148,246)",
            },
            symbol: 'none'
        }, {
            name: '真实值',
            type: 'line',
            data: really_value,
            lineStyle: {
                            color: 'rgb(28,28,28)',
                            shadowBlur: 12,
                            shadowColor: 'rgb(28,28,28,0.9)',
                            shadowOffsetX: 3,
                            shadowOffsetY: 3
                        },
            itemStyle: {
                color: 'rgb(28,28,28)',
            },
            symbol: 'none'
          }, {
                name: '未来3年',
                type: 'line',
                data: multi_sub,
                lineStyle: {
                                color: 'rgb(238,44,44)',
                                shadowBlur: 12,
                                shadowColor: 'rgb(238,44,44,0.9)',
                                shadowOffsetX: 3,
                                shadowOffsetY: 3
                            },
                itemStyle: {
                    color: 'rgb(238,44,44)',
                },
                symbol: 'none'
            }
        ]
    };
    var myChart_prediction_S3 = echarts.init(document.getElementById('S_S_3'));
    myChart_prediction_S3.setOption(option_prediction_S3);
    //预测算法表   综合对比   S_S_4
    var option_prediction_S4 = {
        backgroundColor: 'rgb(0,0,0,0)',
        title: {
            text: "Compare",
            top:'top',
            left:'center',
            textStyle: {
                color: "#fff",
                fontSize: 22
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return params[0].name+"年<br>"+params[0].marker+params[0].seriesName+": "+params[0].value+"<br>"+params[1].marker+params[1].seriesName+": "+params[1].value+"<br>"+params[2].marker+params[2].seriesName+": "+params[2].value;
            },
        },
        legend: {
            data: ['linear','single-LSTM','multi-LSTM'],
            top: '9%',
            textStyle: {
                color: '#fff',
                fontSize:14
            },
            //selectedMode:false
        },
        grid: {
            left: '10%',
            right: '10%',
            top:'19%',
            containLabel: false
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: [2020,2021,2022],
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }

        },
        yAxis: [{
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#aaa',
                    type :'dashed'
                }
            },

        }],
        series: [{
            name: 'linear',
            type: 'line',
            data: linear_sub2,
            lineStyle: {
                        color: "rgb(33,148,246)",
                        shadowBlur: 12,
                        shadowColor: "rgb(33,148,246,0.9)",
                        shadowOffsetX: 3,
                        shadowOffsetY: 3
            },
            itemStyle: {
                color: "rgb(33,148,246)",
            },
            symbol: 'none'
        }, {
            name: 'single-LSTM',
            type: 'line',
            data: single_sub2,
            lineStyle: {
                            color: 'rgb(28,28,28)',
                            shadowBlur: 12,
                            shadowColor: 'rgb(28,28,28,0.9)',
                            shadowOffsetX: 3,
                            shadowOffsetY: 3
                        },
            itemStyle: {
                color: 'rgb(28,28,28)',
            },
            symbol: 'none'
          }, {
                name: 'multi-LSTM',
                type: 'line',
                data: multi_sub2,
                lineStyle: {
                                color: 'rgb(238,44,44)',
                                shadowBlur: 12,
                                shadowColor: 'rgb(238,44,44,0.9)',
                                shadowOffsetX: 3,
                                shadowOffsetY: 3
                            },
                itemStyle: {
                    color: 'rgb(238,44,44)',
                },
                symbol: 'none'
            }
        ]
    };
    var myChart_prediction_S4 = echarts.init(document.getElementById('S_S_4'));
    myChart_prediction_S4.setOption(option_prediction_S4);



    //加载全部数据
    function data_deal(result){

        //alert("查询成功");
        GDP = [];
        LS = [];
        QK = [];
        XSL = [];
        SYL = [];
        ZC_coefficient = [];
        ZC_describe = [];
        ZC_describe_detailed = [];
        years_data = [];
        //原数据中残缺项：XSL和GDP，需单独处理
        $.each(result[0]["analysis"][0]["sub_analysis"], function(i, val){
            GDP.push(val["GDP"]);
            LS.push(val["LS"].toFixed(2));
            QK.push(val["QK"]);
            XSL.push(val["XSL"].toFixed(2));
            SYL.push(val["SYL"].toFixed(2));
            ZC_coefficient.push(val["ZC_coefficient"].toFixed(2));
            ZC_describe.push(val["ZC_describe"]);
            ZC_describe_detailed.push(val["ZC_describe_detailed"]);
            years_data.push(val["year"]);
        });
        //console.log(result[0]["analysis"][0]["sub_analysis"]);

        //处理K1
        var SYL_FOR_GDP = [].concat(SYL);
        var YEARS_FOR_GDP = [].concat(years_data);
        var GDP_FOR_GDP = [].concat(GDP);
        SYL_FOR_GDP.splice(0,19);
        YEARS_FOR_GDP.splice(0,19);
        GDP_FOR_GDP.splice(0, 19);
        myChart_analysis_K1.setOption({
            xAxis: {
                data: YEARS_FOR_GDP,
            },
            series: [{
                    data: SYL_FOR_GDP,
                },{
                    data: GDP_FOR_GDP,
                }]
        });

        //处理K2
        var SYL_FOR_XSL = [].concat(SYL);
        var YEARS_FOR_XSL = [].concat(years_data);
        var XSL_FOR_XSL = [].concat(XSL);
        SYL_FOR_XSL.splice(0, 4);
        YEARS_FOR_XSL.splice(0, 4);
        XSL_FOR_XSL.splice(0, 4);
        myChart_analysis_K2.setOption({
            xAxis: {
                data: YEARS_FOR_XSL,
            },
            series: [{
                    data: SYL_FOR_XSL,
                },{
                    data: XSL_FOR_XSL,
                }]
        });

        //处理K3
        myChart_analysis_K3.setOption({
            xAxis: {
                data: years_data,
            },
            series: [{
                    data: SYL,
                },{
                    data: QK,
                }]
        });

        //处理K4
        myChart_analysis_K4.setOption({
            xAxis: {
                data: years_data,
            },
            series: [{
                    data: SYL,
                },{
                    data: LS,
                }]
        });

        //处理K5
        pearson_coefficient = [];
        spearman_coefficient = [];
        kendall_coefficient = [];

        //注意：xsl的相关系数太接近1，放弃四舍五入
        pearson_coefficient.push(Math.abs(result[0]["analysis"][0]["coefficient"][0]["GDP_SYL"]).toFixed(2));
        pearson_coefficient.push(Math.abs(result[0]["analysis"][0]["coefficient"][0]["QK_SYL"]).toFixed(2));
        pearson_coefficient.push(Math.abs(result[0]["analysis"][0]["coefficient"][0]["LS_SYL"]).toFixed(2));
        pearson_coefficient.push(Math.floor(Math.abs(result[0]["analysis"][0]["coefficient"][0]["XSL_SYL"]) * 100)/100);
        spearman_coefficient.push(Math.abs(result[0]["analysis"][0]["coefficient"][1]["GDP_SYL"]).toFixed(2));
        spearman_coefficient.push(Math.abs(result[0]["analysis"][0]["coefficient"][1]["QK_SYL"]).toFixed(2));
        spearman_coefficient.push(Math.abs(result[0]["analysis"][0]["coefficient"][1]["LS_SYL"]).toFixed(2));
        spearman_coefficient.push(Math.floor(Math.abs(result[0]["analysis"][0]["coefficient"][1]["XSL_SYL"])*100)/100);
        kendall_coefficient.push(Math.abs(result[0]["analysis"][0]["coefficient"][2]["GDP_SYL"]).toFixed(2));
        kendall_coefficient.push(Math.abs(result[0]["analysis"][0]["coefficient"][2]["QK_SYL"]).toFixed(2));
        kendall_coefficient.push(Math.abs(result[0]["analysis"][0]["coefficient"][2]["LS_SYL"]).toFixed(2));
        kendall_coefficient.push(Math.abs(result[0]["analysis"][0]["coefficient"][2]["XSL_SYL"]).toFixed(2));
        myChart_analysis_K5.setOption({
            yAxis: {
                data: coefficient_class,
            },
            series: [{
                    data: pearson_coefficient,
                },{
                    data: spearman_coefficient,
                },{
                    data: kendall_coefficient,
                }]
        });


        //处理K6
        $.each(ZC_coefficient, function(i, val){
            if (ZC_describe[i] != "" && ZC_describe[i] != null && ZC_describe[i].length != 0){
                let temp = ZC_coefficient[i];
                if (val == -99999) temp = 0;
                let string = "H" + i.toString();
                let element_la = '#' + string;
                let string_assemble = years_data[i]+"年&nbsp;&nbsp;&nbsp;&nbsp;"+ZC_describe[i]+"&nbsp;&nbsp;&nbsp;&nbsp;影响系数："+temp;
                $("#K6").append("<div data-toggle='popover' class='H ' id='"+string+"'>"+string_assemble+"</div>");
                //alert(string_assemble);
                // val;
                // ZC_describe_detailed[i];
                // ZC_coefficient[i];
                $(element_la).popover({
                    placement:'top',
                    trigger: 'hover',
                    title:ZC_describe[i],
                    content: ZC_describe_detailed[i]
                });
            }
        });
        

        //处理P1
        COVER_P_XSL = []
        COVER_P_LS = []
        COVER_P_QK = []
        COVER_P_GDP = []
        $.each(result[0]["analysis"][0]["sub_analysis"], function(i, val){
            let P_XSL = [];
            let P_LS = []
            let P_QK = []
            let P_GDP = []
            //线性回归要求数据为整形，使用toFixed返回的是字符串，需要转整形
            P_XSL.push(parseFloat(val["XSL"].toFixed(2)));
            P_XSL.push(parseFloat(val["SYL"].toFixed(2)));
            COVER_P_XSL.push(P_XSL);

            P_GDP.push(val["GDP"]);
            P_GDP.push(parseFloat(val["SYL"].toFixed(2)));
            COVER_P_GDP.push(P_GDP);

            P_LS.push(parseFloat(val["LS"].toFixed(2)));
            P_LS.push(parseFloat(val["SYL"].toFixed(2)));
            COVER_P_LS.push(P_LS);

            P_QK.push(parseFloat(val["SYL"].toFixed(2)));
            P_QK.push(val["QK"]);
            COVER_P_QK.push(P_QK);
        });
        
        // See https://github.com/ecomfe/echarts-stat
        COVER_P_XSL.splice(0,4);
        COVER_P_GDP.splice(0,19);
        var myRegression_QK = ecStat.regression('linear', COVER_P_QK);
        myRegression_QK.points.sort(function(a, b) {
            return a[0] - b[0];
        });
        myChart_analysis_P1.setOption({
            series: [{
                    data: COVER_P_QK,
                },{
                data: myRegression_QK.points,
            }]
        });
        // See https://github.com/ecomfe/echarts-stat
        var myRegression_XSL = ecStat.regression('linear', COVER_P_XSL);
        myRegression_XSL.points.sort(function(a, b) {
            return a[0] - b[0];
        });
        myChart_analysis_P2.setOption({
            series: [{
                    data: COVER_P_XSL,
                },{
                data: myRegression_XSL.points,
            }]
        });
        // See https://github.com/ecomfe/echarts-stat
        var myRegression_GDP = ecStat.regression('linear', COVER_P_GDP);
        myRegression_GDP.points.sort(function(a, b) {
            return a[0] - b[0];
        });
        myChart_analysis_P3.setOption({
            series: [{
                    data: COVER_P_GDP,
                },{
                data: myRegression_GDP.points,
            }]
        });
        // See https://github.com/ecomfe/echarts-stat
        var myRegression_LS = ecStat.regression('linear', COVER_P_LS);
        myRegression_LS.points.sort(function(a, b) {
            return a[0] - b[0];
        });
        myChart_analysis_P4.setOption({
            series: [{
                    data: COVER_P_LS,
                },{
                data: myRegression_LS.points,
            }]
        });

        //处理prediction数据
        linear_method_accuracy = result[0]["prediction"][0]["accuracy"][0]["linear_method_accuracy"];
        multi_LSTM_method_accuracy = result[0]["prediction"][0]["accuracy"][0]["multi_LSTM_method_accuracy"];
        single_LSTM_method_accuracy = result[0]["prediction"][0]["accuracy"][0]["single_LSTM_method_accuracy"];
        linear_method = []
        multi_LSTM_method = []
        really_value = []
        single_LSTM_method = []
        predict_years = []
        $.each(result[0]["prediction"][0]["predict"], function(i, val){
            linear_method.push(val["linear_method"].toFixed(2));
            multi_LSTM_method.push(val["multi_LSTM_method"].toFixed(2));
            really_value.push(val["really_value"].toFixed(2));
            single_LSTM_method.push(val["single_LSTM_method"].toFixed(2));
            predict_years.push(val["year"]);
        });
        //切割数组，用于分段显示
        really_value.splice(5,3);
        linear = []
        multi = []
        single = []
        for (i=0; i<5;i++){
            linear.push(linear_method[i]);
            single.push(single_LSTM_method[i]);
            multi.push(multi_LSTM_method[i]);
        }
        linear_sub = ['-','-','-','-']
        multi_sub = ['-','-','-','-']
        single_sub = ['-','-','-','-']
        for (i = 4; i < 8; i++){
            linear_sub.push(linear_method[i]);
            single_sub.push(single_LSTM_method[i]);
            multi_sub.push(multi_LSTM_method[i]);
        }
        linear_sub2 = []
        multi_sub2 = []
        single_sub2 = []
        for (i = 5; i < 8; i++){
            linear_sub2.push(linear_method[i]);
            single_sub2.push(single_LSTM_method[i]);
            multi_sub2.push(multi_LSTM_method[i]);
        }

        //更新最终预测阶段表S1
        //$('.cascade-window-content').html('');
        $('.cascade').casadeLanding(result, true);
        myChart_prediction_S1.setOption({
            series: [{
                    data: linear,
                },{
                    data: really_value,
                },{
                    data: linear_sub,
            }]
        });
        myChart_prediction_S2.setOption({
            series: [{
                    data: single,
                },{
                    data: really_value,
                },{
                    data: single_sub,
            }]
        });
        myChart_prediction_S3.setOption({
            series: [{
                    data: multi,
                },{
                    data: really_value,
                },{
                    data: multi_sub,
            }]
        });
        myChart_prediction_S4.setOption({
            series: [{
                    data: linear_sub2,
                },{
                    data: single_sub2,
                },{
                    data: multi_sub2,
            }]
        });
    };


    var verify = {"query":"biyesheji"};
    var str = JSON.stringify(verify);
    $.ajax({        //不使用$.getJson是因为其异步执行，会使TagCanvas先绘图
        type: "POST",
        url: "http://nzbaike.cn/Hp_Liquor_Culture/Query_Analysis",
        data:str,
        async: true,           //这句话就是开启ajax异步的
        dataType:"json",
        success: function(result){
            if (!result) alert("数据请求失败，请勿修改参数！");
            else data_deal(result);
        },
        error:function(response){
            alert("数据请求失败！"); 
        }
    });

    //bootstrap初始化插件
    
    //定义刷新按钮旋转动画
    var flag = true;
    $("#rota").rotate({
        bind:
        {
            mouseover : function() {
                if (flag){
                    $("#rota").rotate({animateTo:180})
                }
                
            },
            mouseout : function() {
                if (flag){
                    $("#rota").rotate({animateTo:0});
                }
            },
        }

    });
    $("#rota").click(function(){
        if(flag){
            flag = false;
            var angle = 0;
            var number = setInterval(function(){        //setInterval函数每隔一定时间调用函数
                angle+=30;
                $("#rota").rotate(angle);
            },40);
            $.ajax({        //不使用$.getJson是因为其异步执行，会使TagCanvas先绘图
                type: "POST",
                url: "http://nzbaike.cn/Hp_Liquor_Culture/Query_Analysis",
                data:str,
                async: true,           //这句话就是阻止ajax异步的
                dataType:"json",
                success: function(result){
                    if (!result){
                        window.clearInterval(number);       //清除setInterval的定时，参数必须是setInterval返回的id
                        $("#rota").rotate({animateTo:0});
                        flag = true;
                        alert("数据刷新失败，请勿修改参数！");
                    }else{
                        data_deal(result);
                        window.clearInterval(number);       //清除setInterval的定时，参数必须是setInterval返回的id
                        $("#rota").rotate({animateTo:0});
                        flag = true;
                        alert("刷新成功！");
                        // $.each(result["2019year"], function (i, field) {
                        // });
                    } 
                    
                },
                error:function(response){
                    window.clearInterval(number);
                    $("#rota").rotate({animateTo:0});
                    flag = true;
                    alert("更新数据失败！");
                    //$(this).stopRotate();
                    
                    
                 }
            });
        }
    });







    $('#active-blog-slider').niceScroll({
        cursorcolor: "#CC0071",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        hwacceleration: true,   // 激活硬件加速
        horizrailenabled: true,   // niceScroll 可以管理水平滚动
        oneaxismousemode: false,    //当只用水平滚动时禁止用鼠标来滚动
    });
    $('#active-blog-slider-P').niceScroll({
        cursorcolor: "#CC0071",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        hwacceleration: true,   // 激活硬件加速
        horizrailenabled: true,   // niceScroll 可以管理水平滚动
        oneaxismousemode: false,    //当只用水平滚动时禁止用鼠标来滚动
    });

    

    /*事件时间轴拖拽功能实现*/
    var drag=function(obj){  
        obj.bind("mousedown",start);
        //obj.on('touchstart', start_touch);
        var touch_area = document.getElementById('active-blog-slider');
	    touch_area.addEventListener('touchstart', start_touch, false);
	    //console.log(event.changedTouches[0].clientX);

        //手指触摸开始，记录div的初始位置
        var gapX, startx, gapY, starty;
        var flag_open = true;
        var i = 0;
        function start(event){
            if(event.button==0){//判断是否点击鼠标左键
                gapX = event.clientX;
                startx = $('#active-blog-slider').scrollLeft();  // scroll的初始位置
                //movemove事件必须绑定到$(document)上，鼠标移动是在整个屏幕上的  
                $(document).bind("mousemove",move);  
                //此处的$(document)可以改为obj  
                $(document).bind("mouseup",stop); 
            }  
            return false;//阻止默认事件或冒泡  
        }
        
        function move(){
            var left = event.clientX-gapX; // 鼠标移动的相对距离
            $('#active-blog-slider').scrollLeft(startx - left );
            return false;//阻止默认事件或冒泡  
        }  
        function stop(){  
            //解绑定，这一步很必要，前面有解释  
            $(document).unbind("mousemove",move);  
            $(document).unbind("mouseup",stop);  
        }
        

        function start_touch(event){ 
        	i = 0;
            gapX = event.changedTouches[0].clientX;
            gapY = event.changedTouches[0].clientY;
            x = event.touches[0].pageX;
            y = event.touches[0].pageY;
            //console.log("gapX: "+event.touches);
            startx = $('#active-blog-slider').scrollLeft();  // scroll的初始位置
            starty = $(document).scrollTop();
            //触摸中的，位置记录
            touch_area.addEventListener('touchmove', move_touch, false);
			//触摸结束时的处理
			touch_area.addEventListener('touchend', stop_touch, false);
        } 
        function move_touch(){
        	i = i + 1;
        	endx = event.changedTouches[0].pageX;
			endy = event.changedTouches[0].pageY;
            var left = event.changedTouches[0].clientX-gapX; // 鼠标移动的相对距离
            var top = event.changedTouches[0].clientY-gapY;
            var angle = getAngle(endx - x, endy - y);
            angle = 0 - angle;
	        //console.log(angle);
	        if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135) || (angle >= -45 && angle <= 45)) {//水平
	        	if (i == 1) {			//只取第一次
	        		flag_open = false;//禁止垂直
	        		//console.log("水平拖动"+flag_open);
	        	}
	            
	        }
	        
            // if (flag_open) console.log("禁止水平"+flag_open);
            // else console.log("禁止垂直"+flag_open);
            if(!flag_open)$('#active-blog-slider').scrollLeft(startx - left );
            else $(document).scrollTop(starty - top );
            
            
            return false;//阻止默认事件或冒泡  
        }
        function stop_touch(){
            //解绑定，这一步很必要，前面有解释
            flag_open = true;
            touch_area.removeEventListener("mousemove", move_touch);  
            touch_area.removeEventListener("mouseup", stop_touch);
        }
        //获得角度
		function getAngle(angx, angy) {
        	return Math.atan2(angy, angx) * 180 / Math.PI;
 	    };
		
 
    }  
    drag($("#active-blog-slider"));//传入的必须是jQuery对象，否则不能调用jQuery的自定义函数

  	/*事件时间轴拖拽功能实现*/
    var drag_P=function(obj){  
        obj.bind("mousedown",start);
        //obj.on('touchstart', start_touch);
        var touch_area2 = document.getElementById('active-blog-slider-P');
	    touch_area2.addEventListener('touchstart', start_touch, false);
	    //console.log(event.changedTouches[0].clientX);

        //手指触摸开始，记录div的初始位置
        var gapX, startx, gapY, starty;
        var flag_open = true;
        var i = 0;
        function start(event){  
            if(event.button==0){//判断是否点击鼠标左键
                gapX = event.clientX;
                startx = $('#active-blog-slider-P').scrollLeft();  // scroll的初始位置
                //movemove事件必须绑定到$(document)上，鼠标移动是在整个屏幕上的  
                $(document).bind("mousemove",move);  
                //此处的$(document)可以改为obj  
                $(document).bind("mouseup",stop); 
            }  
            return false;//阻止默认事件或冒泡  
        }
        
        function move(){
            var left = event.clientX-gapX; // 鼠标移动的相对距离
            $('#active-blog-slider-P').scrollLeft(startx - left );
            return false;//阻止默认事件或冒泡  
        }  
        function stop(){  
            //解绑定，这一步很必要，前面有解释  
            $(document).unbind("mousemove",move);  
            $(document).unbind("mouseup",stop);  
        }
        

        function start_touch(event){ 
        	i = 0;
            gapX = event.changedTouches[0].clientX;
            gapY = event.changedTouches[0].clientY;
            x = event.touches[0].pageX;
            y = event.touches[0].pageY;
            //console.log("gapX: "+event.touches);
            startx = $('#active-blog-slider-P').scrollLeft();  // scroll的初始位置
            starty = $(document).scrollTop();
            //触摸中的，位置记录
            touch_area2.addEventListener('touchmove', move_touch, false);
			//触摸结束时的处理
			touch_area2.addEventListener('touchend', stop_touch, false);
        } 
        function move_touch(){
        	i = i + 1;
        	endx = event.changedTouches[0].pageX;
			endy = event.changedTouches[0].pageY;
            var left = event.changedTouches[0].clientX-gapX; // 鼠标移动的相对距离
            var top = event.changedTouches[0].clientY-gapY;
            var angle = getAngle(endx - x, endy - y);
            angle = 0 - angle;
	        //console.log(angle);
	        if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135) || (angle >= -45 && angle <= 45)) {//水平
	        	if (i == 1) {			//只取第一次
	        		flag_open = false;//禁止垂直
	        		//console.log("水平拖动"+flag_open);
	        	}
	            
	        }
	        
            // if (flag_open) console.log("禁止水平"+flag_open);
            // else console.log("禁止垂直"+flag_open);
            if(!flag_open)$('#active-blog-slider-P').scrollLeft(startx - left );
            else $(document).scrollTop(starty - top );
            
            
            return false;//阻止默认事件或冒泡  
        }
        function stop_touch(){
            //解绑定，这一步很必要，前面有解释
            flag_open = true;
            touch_area2.removeEventListener("mousemove", move_touch);  
            touch_area2.removeEventListener("mouseup", stop_touch);
        }
        //获得角度
		function getAngle(angx, angy) {
        	return Math.atan2(angy, angx) * 180 / Math.PI;
 	    };
    }  
	drag_P($("#active-blog-slider-P"));//传入的必须是jQuery对象，否则不能调用jQuery的自定义函数


  	$('#pro').find('.pic').on('click',function(event){alert(true)});
  	//document.getElementById('pic')

    // Select all links with hashes
    $('.navbar-nav a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .on('click',function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top-50
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
    });

 });
