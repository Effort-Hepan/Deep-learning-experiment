	
	/*****************************************************************/
	
	(function($)
	{	
		/**************************************************************/

		var CascadeLanding=function(cascade, hander_json, lock)
		{
			/************************************************************/
			//处理prediction数据
			var isSuccess = true;
			var locked = lock;
		    var linear_method_accuracy = hander_json[0]["prediction"][0]["accuracy"][0]["linear_method_accuracy"];
		    var multi_LSTM_method_accuracy = hander_json[0]["prediction"][0]["accuracy"][0]["multi_LSTM_method_accuracy"];
		    var single_LSTM_method_accuracy = hander_json[0]["prediction"][0]["accuracy"][0]["single_LSTM_method_accuracy"];
		    var linear_method = []
		    var multi_LSTM_method = []
		    var really_value = []
		    var single_LSTM_method = []
		    var predict_years = []
		    $.each(hander_json[0]["prediction"][0]["predict"], function(i, val){
		        linear_method.push(val["linear_method"].toFixed(2));
		        multi_LSTM_method.push(val["multi_LSTM_method"].toFixed(2));
		        really_value.push(val["really_value"].toFixed(2));
		        single_LSTM_method.push(val["single_LSTM_method"].toFixed(2));
		        predict_years.push(val["year"].toFixed(2));
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




			/***********************************************************/
			//alert("成功");
			var $this=this;
		
			var cascade=$(cascade);
			var cascadeWindow=cascade.find('.cascade-window');
			var cascadeElement=cascade.find('.cascade-menu li');
			var cascadeNavigation=cascade.find('.cascade-navigation');
			var close_bar = cascadeWindow.find('.cascade-window-close-bar a')
			
			var selectedElement='';
			var isFast = false;
			var openEnable=true;

			/***********************************************************/
			
			this.load=function()
			{
				/********************************************************/
				//必须先解绑事件，否则鼠标事件会累加绑定，是一次点击被多次执行
				cascadeElement.unbind();
	  			cascadeElement.bind('click',function(event){
	  				if (isSuccess){
		  				//alert("open:"+openEnable);
		  				if (isFast)	{alert("操作频繁!"); return;}
		  				isFast = true;
		  				cascadeElement.css("pointer-events","none");
		  				close_bar.css("pointer-events","none");
		  				setTimeout(function() {
							//btn.disabled = '';
							cascadeElement.css("pointer-events","");
							close_bar.css("pointer-events","");
							isFast = false;
						}, 1500);
						
		  				if (openEnable) {
							event.preventDefault();//取消事件的默认动作。
							$this.openElement(this);
						}else{
							event.preventDefault();
							$this.closeElement();
						}
					}else{
						if (isFast)	{alert("操作频繁,等待1.5秒!"); return;}
		  				isFast = true;
		  				cascadeElement.css("pointer-events","none");
		  				close_bar.css("pointer-events","none");
		  				setTimeout(function() {
							//btn.disabled = '';
							cascadeElement.css("pointer-events","");
							close_bar.css("pointer-events","");
							isFast = false;
						}, 1500);
					}
				});		
				
				/********************************************************/
				cascadeWindow.find('.cascade-window-close-bar a').unbind();
				cascadeWindow.find('.cascade-window-close-bar a').bind('click',function(event) 
				{
					if (isSuccess) {
	  					event.preventDefault();
						$this.closeElement();
					}else{
						if (isFast)	{alert("操作频繁,等待1.5秒!"); return;}
		  				isFast = true;
		  				cascadeElement.css("pointer-events","none");
		  				close_bar.css("pointer-events","none");
		  				setTimeout(function() {
							//btn.disabled = '';
							cascadeElement.css("pointer-events","");
							close_bar.css("pointer-events","");
							isFast = false;
						}, 1500);
					}
					
				});
				
				/********************************************************/
			};
			
			/***********************************************************/
			
			this.openElement=function(element)
			{
				isSuccess = false;
				if(!openEnable) return;
				openEnable=false;
			
				if($('.cascade-window-content').html()!='')
				{
					$this.closeElement();
					return;
				}
			
				selectedElement=$(element);
				var i=0;
				var selectedId=selectedElement.attr('id');
				var selectedClass=selectedElement.attr('class');
				var con_str = "#"+selectedId + " h3"
				var con_str2 = "#"+selectedId + " span"
				$('#findme').remove();
				$('#accuracy_').remove();
				$(con_str).css("display",'none');
				$(con_str2).css("display",'none');
				linear_method_accuracy = new Number(linear_method_accuracy).toFixed(2);
				single_LSTM_method_accuracy = new Number(single_LSTM_method_accuracy).toFixed(2);
				multi_LSTM_method_accuracy = new Number(multi_LSTM_method_accuracy).toFixed(2);
				if (window.innerWidth > 1600 && window.innerWidth <2200) {
					if (selectedId == 'S_chart1'){
						$('#'+selectedId).append("<div id='findme' class='restrain'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该模型中所需的自变量预测值实际由单特征LSTM模型产生，回代入多元回归方程求得因变量。</div>");
						$('#'+selectedId).append("<div id='accuracy_' class='acc_align'><span class='acc_font'>准确率: </span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='acc_num counter_accuracy'>"+linear_method_accuracy+"</span><span class='acc_num'>%</span></div>");
					}else if (selectedId == 'S_chart2'){
						$('#'+selectedId).append("<div id='findme' class='restrain'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该模型仅使用白酒商用量作为特征进行训练和预测，在实际运用中，该模型的使用范围不及另外两种。</div>");
						$('#'+selectedId).append("<div id='accuracy_' class='acc_align'><span class='acc_font'>准确率: </span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='acc_num counter_accuracy'>"+single_LSTM_method_accuracy+"</span><span class='acc_num'>%</span></div>");
					}else if (selectedId == 'S_chart3'){
						$('#'+selectedId).append("<div id='findme' class='restrain'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该模型预测方案采用由LSTM得出的本年预测值作为下一年的模拟值，再将下一年的预测值作为其后一年的模拟值，以此类推。</div>");
						$('#'+selectedId).append("<div id='accuracy_' class='acc_align'><span class='acc_font'>准确率: </span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='acc_num counter_accuracy'>"+multi_LSTM_method_accuracy+"</span><span class='acc_num'>%</span></div>");
					}else if (selectedId == 'S_chart4'){
						$('#'+selectedId).append("<div id='findme' class='restrain' style='margin-top:50%;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;综合对比前三种预测模型。图表中的准确率仅能作为参考值，是该算法模型可信度的一种度量方式。其值的大小取决于模型评估算法。</div>");
					}
				}else if(window.innerWidth >= 2200){
					if (selectedId == 'S_chart1'){
						$('#'+selectedId).append("<div id='accuracy_' class='acc_align' style='margin-top:50%;'><span class='acc_font'>准确率: </span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='acc_num counter_accuracy'>"+linear_method_accuracy+"</span><span class='acc_num'>%</span></div>");
					}else if (selectedId == 'S_chart2'){
						$('#'+selectedId).append("<div id='accuracy_' class='acc_align' style='margin-top:50%;'><span class='acc_font'>准确率: </span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='acc_num counter_accuracy'>"+single_LSTM_method_accuracy+"</span><span class='acc_num'>%</span></div>");
					}else if (selectedId == 'S_chart3'){
						$('#'+selectedId).append("<div id='accuracy_' class='acc_align' style='margin-top:50%;'><span class='acc_font'>准确率: </span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='acc_num counter_accuracy'>"+multi_LSTM_method_accuracy+"</span><span class='acc_num'>%</span></div>");
					}else if (selectedId == 'S_chart4'){
						$('#'+selectedId).append("<div id='findme' class='restrain' style='margin-top:50%;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;综合对比前三种预测模型。图表中的准确率仅能作为参考值，是该算法模型可信度的一种度量方式。</div>");
					}

				}else {
					if (selectedId == 'S_chart1'){
						$('#'+selectedId).append("<div id='findme' class='restrain'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;多元线性回归算法由多个自变量的最优组合共同来预测或估计因变量，比只用一个自变量进行预测或估计更有效，更符合实际。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该模型中所需的自变量预测值实际由单特征LSTM模型产生，回代入多元回归方程求得因变量。</div>");
						$('#'+selectedId).append("<div id='accuracy_' class='acc_align'><span class='acc_font'>准确率: </span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='acc_num counter_accuracy'>"+linear_method_accuracy+"</span><span class='acc_num'>%</span></div>");
					}else if (selectedId == 'S_chart2'){
						$('#'+selectedId).append("<div id='findme' class='restrain'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;长短期记忆（Long short-term memory, LSTM）是一种特殊的RNN，主要是为了解决长序列训练过程中的梯度消失和梯度爆炸问题。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该模型仅使用白酒商用量作为特征进行训练和预测，在实际运用中，该模型的使用范围不及另外两种。</div>");
						$('#'+selectedId).append("<div id='accuracy_' class='acc_align'><span class='acc_font'>准确率: </span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='acc_num counter_accuracy'>"+single_LSTM_method_accuracy+"</span><span class='acc_num'>%</span></div>");
					}else if (selectedId == 'S_chart3'){
						$('#'+selectedId).append("<div id='findme' class='restrain'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;多维度特征LSTM时间序列预测模型，解决了单维度LSTM时间序列预测模型太过理想化的缺点。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该模型预测方案采用由LSTM得出的本年预测值作为下一年的模拟值，再将下一年的预测值作为其后一年的模拟值，以此类推。</div>");
						$('#'+selectedId).append("<div id='accuracy_' class='acc_align'><span class='acc_font'>准确率: </span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='acc_num counter_accuracy'>"+multi_LSTM_method_accuracy+"</span><span class='acc_num'>%</span></div>");
					}else if (selectedId == 'S_chart4'){
						$('#'+selectedId).append("<div id='findme' class='restrain' style='margin-top:50%;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;综合对比前三种预测模型。图表中的准确率仅能作为参考值，是该算法模型可信度的一种度量方式。其值的大小取决于模型评估算法，该模型采用平均绝对离差以消除特征预测值中负值对准确率大小的影响。</div>");
					}
				}
				// $('#'+selectedId).niceScroll({
			 //        cursorcolor: "#CC0071",//#CC0071 光标颜色
			 //        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
			 //        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
			 //        cursorwidth: "5px", //像素光标的宽度
			 //        cursorborder: "0", // 游标边框css定义
			 //        cursorborderradius: "5px",//以像素为光标边界半径
			 //        hwacceleration: true,   // 激活硬件加速
			 //        horizrailenabled: true,   // niceScroll 可以管理水平滚动
			 //        oneaxismousemode: false,    //当只用水平滚动时禁止用鼠标来滚动
			 //    });
				if (locked){
					$('.counter_accuracy').counterUp({
				        delay: 100,
				        time: 1000
				    });
				}
				//alert(selectedId);
				selectedElement.css('z-index',2);
				
				cascadeElement.animate({left:0},500,'easeOutExpo',function(data) 
				{
					i++;
					if(i==cascadeElement.length)
					{
						cascadeWindow.css('opacity','1');
						cascadeWindow.css('display','block');
							
						cascadeWindow.attr('class','cascade-window '+selectedClass);
						cascadeWindow.animate({width:'640px'},500,'easeOutBounce',function()
						{
							//此处写入图表内容
							if (selectedId == "S_chart1"){
								$this.pred_S1();
							}else if(selectedId == "S_chart2"){
								$this.pred_S2();
							}else if(selectedId == "S_chart3"){
								$this.pred_S3();
							}else if(selectedId == "S_chart4"){
								$this.pred_S4();
							}
							//在图表加载完毕后openEnable设置为true

						});
					}
					isSuccess = true;
				});	
			}
			
			/***********************************************************/
			
			this.closeElement=function(data)
			{
				isSuccess = false;
				var selectedId = selectedElement.attr('id');
				var selectedClass = selectedElement.attr('class');
				var con_str = "#"+selectedId + " h3"
				var con_str2 = "#"+selectedId + " span"
				
				$(con_str).css("display",'');
				$(con_str2).css("display",'');
				$('#findme').remove();
				$('#accuracy_').remove();
				//$(':input,a').qtip('destroy');
				$('.cascade-window-content').html('');
				
 				cascadeWindow.animate({width:'0px',opacity:0},100,'easeOutBounce',function() 	
				{
					cascadeWindow.css('display','none');
					$this.expandElements(data);
				});
				
			}
			
			/***********************************************************/
			
			this.expandElements=function(data)
			{
				var counter=0,done=0,left=-200;
					
				cascadeElement.each(function() 
				{
					$(this).css('z-index',1);
					left+=200+((counter++)>0 ? 20 : 0);
					//animate延迟动画为异步执行，注意！！！
					$(this).animate({left:left},500,'easeOutExpo',function()
					{
						done++;

						if(done==cascadeElement.length)
						{
							openEnable=true;
							isSuccess = true;
							if(typeof(data)!='undefined')
							{
								if(typeof(data.onComplete)!='undefined') data.onComplete.apply();
							}
						}
					});
				});
			}
			
			/***********************************************************/
			//cascade-window-content
			this.pred_S1 = function(){
		    	document.getElementById("cascade-window-content").removeAttribute("_echarts_instance_");
				var option_prediction_S1 = {
			        backgroundColor: 'rgb(0,0,0,0)',
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
			            top: 'top',
			            textStyle: {
			                color: '#fff',
			                fontSize:14
			            },
			            selectedMode:false
			        },
			        grid: {
			            left: '13%',
			            right: '8%',
			           
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
			    var myChart_prediction_S1 = echarts.init(document.getElementById('cascade-window-content'));
			    myChart_prediction_S1.setOption(option_prediction_S1);
			}
			this.pred_S2 = function(){
		    	document.getElementById("cascade-window-content").removeAttribute("_echarts_instance_");
				var option_prediction_S2 = {
			        backgroundColor: 'rgb(0,0,0,0)',
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
			            top: 'top',
			            textStyle: {
			                color: '#fff',
			                fontSize:14
			            },
			            selectedMode:false
			        },
			        grid: {
			            left: '13%',
			            right: '8%',
			           
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
			    var myChart_prediction_S2 = echarts.init(document.getElementById('cascade-window-content'));
			    myChart_prediction_S2.setOption(option_prediction_S2);
			}
			this.pred_S3 = function(){
		    	document.getElementById("cascade-window-content").removeAttribute("_echarts_instance_");
			    var option_prediction_S3 = {
			        backgroundColor: 'rgb(0,0,0,0)',
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
			            top: 'top',
			            textStyle: {
			                color: '#fff',
			                fontSize:14
			            },
			            selectedMode:false
			        },
			        grid: {
			            left: '13%',
			            right: '8%',
			           
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
			    var myChart_prediction_S3 = echarts.init(document.getElementById('cascade-window-content'));
			    myChart_prediction_S3.setOption(option_prediction_S3);
			}
			this.pred_S4 = function(){
		    	document.getElementById("cascade-window-content").removeAttribute("_echarts_instance_");
			    var option_prediction_S4 = {
			        backgroundColor: 'rgb(0,0,0,0)',
			        tooltip: {
			            trigger: 'axis',
			            formatter: function (params) {
			                return params[0].name+"年<br>"+params[0].marker+params[0].seriesName+": "+params[0].value+"<br>"+params[1].marker+params[1].seriesName+": "+params[1].value+"<br>"+params[2].marker+params[2].seriesName+": "+params[2].value;
			            },
			        },
			        legend: {
			            data: ['linear','single-LSTM','multi-LSTM'],
			            top: 'top',
			            textStyle: {
			                color: '#fff',
			                fontSize:14
			            },
			            selectedMode:false
			        },
			        grid: {
			            left: '13%',
			            right: '8%',
			           
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
			    var myChart_prediction_S4 = echarts.init(document.getElementById('cascade-window-content'));
			    myChart_prediction_S4.setOption(option_prediction_S4);
			}




			/***********************************************************/
		};

		/**************************************************************/
		 
		$.fn.casadeLanding = function(origin_data, lock){
			/***********************************************************/
			//alert(origin_data);
			var casadeLanding=new CascadeLanding(this, origin_data, lock);
			casadeLanding.load();

			/***********************************************************/
		};
		
		/**************************************************************/
		
	})(jQuery);