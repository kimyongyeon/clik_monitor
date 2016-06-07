var syruppay = {
		barLineChart : function (myChart, opt){
            // parsing data
             var chartList = [];
             $.each(opt.data, function(idx, _data){
                 $.each(opt.category, function(_idx, _category){
                     chartList.push({legend:_data.legend, category:_category, itemStyle:topPerLabel, name:_data.name, tablevalue:eval("(opt."+_data.value[0]+")[_idx]"), value: Math.round((eval("(opt."+_data.value[0]+")[_idx]")/eval("(opt."+_data.value[1]+")[_idx]"))*10000)/100});
                 });
             });
             
             // draw chart
             function itemFormatter(param){ return param.name+"</br>"+param.seriesName+" : "+param.value+"%";  };
             var option = insights.getMultiBarOpt(chartList, opt.title);
             option.yAxis[0].axisLabel = perLabel;  
             option.series[0].markLine = dashMarkLine;
             option.series[1].markLine = dashMarkLine;
             option.series[2].markLine = dashMarkLine;
             option.tooltip.formatter = itemFormatter;
             
             
             myChart.setOption(option);
             
             return chartList;
        },
        
        
        timeLineChart : function (myChart, opt){  // idx
            // parsing data
             var chartList = [];
             $.each(opt.data, function(idx, _data){
                 $.each(opt.category, function(_idx, _category){
                     chartList.push({legend:_data.legend, category:_category, itemStyle:insidePerLabel, name:_data.name, tablevalue:eval("(opt."+_data.value+")[_idx]"), value: Math.round(Math.round(eval("(opt."+_data.value+")[_idx]")/eval("(opt."+_data.value+").sum()")*10000)/10000*100*100)/100});
                 });
             });
             
            // draw chart
            var option = { timeline : {show:true, autoPlay : true, playInterval : 4000, type : 'number' , data : [] }, options : [] };
            option.timeline.data = opt.timeline;
            option.timeline.height = 30;
            var markFormatters = opt.markFormatters;
            $.each(opt.timeline, function(idx, _timeline){
                var _option = insights.getMultiBarOpt($.grep(chartList, function(_data){    return _data.name == _timeline;    }), opt.title, null, null, opt.category);
                _option.yAxis[0].axisLabel = perLabel;
                _option.tooltip.formatter = function(param){ return param.data.name+" ("+param.name+")</br>"+param.seriesName+" : "+param.value+"%";  };  
                /*_option.title.subtextStyle = {fontSize: 14, color:'#4374D9', fontWeight:'bold', align:'center'};
                _option.title.itemGap = 10;*/
                
                // Mark Point
                var markPoint = [], mIdx=-1;
                $.each(markFormatters[idx], function(key, value){
                    var yAxis = _option.series[1].data[++mIdx].value;
                    if(value == '') markPoint.push({name:'markPoint'+mIdx, symbolSize : 0, itemStyle : {normal:{label:{show:false }}}});
                    else    markPoint.push({name:'markPoint'+mIdx, symbolSize : 20, itemStyle : {normal:{color:'#CC3D3D', label:{show:true, position:'inside', textStyle:{color:'#fff', fontSize:11}, formatter:function(param){ return value; } }}}, xAxis:key, yAxis:yAxis}); 
               });
                _option.series[1].markPoint.data = markPoint;
                
                option.options.push(_option);
            });
            console.log(JSON.stringify(option));
            myChart.setOption(option);
            return chartList;
         },
         
         
         importChart : function (myChart, opt){
             $.ajax({
                 type: "GET",
                 url: '/resources/data/insights/'+opt.importFile,
                 dataType: "text",
                 success: function(data) {	dataProcess(data);	},
                 error: function(err){alert("err "+err); console.log(err)}
             });
             

            var tooltipMosu = [];
            function dataProcess(data){
            	var option = getDefaultOpt();
            	data_ = data.split("\n");
                var category = [];
                data_.forEach(function(entry) {
                    var entry_ = entry.split(",");
                    category.push(eval(opt.category));
                    tooltipMosu.push(eval(opt.tooltipMosu));
                    $.each(opt.data, function(_idx, _data){
                    	option.series[_idx].data.push(eval(_data.value));
                    });
                });
                option.xAxis[0].data = category;
                myChart.setOption(option);   
            }
           
            function getDefaultOpt(){
            	var option = insights.getDefBarOpt(opt.title);
            	option.tooltip.trigger = 'axis';
                option.tooltip.formatter = function(param, axis){	var idx = axis.split(":")[1]*1;
											                        return param[0][1] + "<br/>"
												                        + param[0][0] + " : " + formatCurrency(Math.round(param[0][2] /100 * tooltipMosu[idx])) + "명 (" + param[2][2] + " %)<br/>"
												                        + param[1][0] + " : " + formatCurrency(Math.round(param[1][2] /100 * tooltipMosu[idx])) + "명 (" + param[3][2] + " %<br/>";	};
                option.legend.data = opt.legend;
                option.legend.show = true;
     			option.yAxis[0].axisLabel = perLabel;  
     			option.yAxis[0].max = 15;
     			
     			option.grid.y2 = 105;
     			option.dataZoom = {
                     show : true,
                     dataBackgroundColor : 'rgba(144,197,237,1)',
                     height:60,
                     zoomLock : true,
                     realtime : true,
                     start : 70,	//0
                     end : 90	// 20
                 };
     			
                 var series = [];
                 $.each(opt.data, function(idx, _data){
                     if(_data.type == 'line'){
                     	series.push({name:_data.name, data:[], type:_data.type, symbolSize : 0, itemStyle : {normal: {color : 'rgba(0,0,0,0)'}}});
                     }else if(_data.type == 'bar'){
                     	series.push({name:_data.name, data:[], type:_data.type, barGap:'2%'});
                     }
                 });
                 option.series = series;
                 return option;
            }
                    
            return null;
         }
};