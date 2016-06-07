var samediff = {
         importChart : function (myChart, opt){
             $.ajax({
                 type: "GET",
                 url: '/resources/data/insights/'+opt.importFile,
                 dataType: "text",
                 success: function(data) {	dataProcess(data);	},
                 error: function(err){alert("err "+err); console.log(err)}
             });
             

            function dataProcess(data){
            	var option = getDefaultOpt();
            	data_ = data.split("\n");
                var category = [];
                data_.forEach(function(entry) {
                    var entry_ = entry.split(",");
                    category.push(eval(opt.category));
                    $.each(opt.data, function(_idx, _data){
                    	if(_data.value != null && _data.value != '')option.series[_idx].data.push(eval(_data.value));
                    });
                });
                option.xAxis[0].data = category;
                if(opt.yCategory == 'true'){
                    var xAxis = option.xAxis;
                    var yAxis = option.yAxis;
                    option.xAxis = yAxis;
                    option.yAxis = xAxis;
                    option.yAxis[0].axisLabel.rotate = 0;
                    option.grid.x = 150;
                }else{
                	option.grid.y2 = 150;
                }
                myChart.setOption(option);   
            }
           
            function getDefaultOpt(){
            	var option = insights.getDefOpt(opt.title, opt.subtitle);
            	option.tooltip.trigger = 'axis';
                option.tooltip.formatter = axisFormmater;
                option.legend.data = opt.legend;
                option.xAxis[0].axisLabel = { rotate : 90, textStyle:{ fontWeight:'bold'} };
                option.yAxis[0].axisLabel = perLabel;  
     			var series = [];
                 $.each(opt.data, function(idx, _data){
                     if(_data.type == 'line'){
                     	series.push({name:_data.name, data:[], type:_data.type, symbolSize : 0, itemStyle : {normal: { areaStyle: {type: 'default'}, lineStyle: {width : 0}}}});
                     }else if(_data.type == 'bar'){
                     	series.push({name:_data.name, data:[], type:_data.type, barGap:'2%'});
                     }
                     if(_data.stack != null && _data.stack != 'undefined'){
                    	 series[series.length-1].stack = _data.stack;
                     }
                 });
                 option.series = series;
                 return option;
            }
         },
         
         
         importChart2 : function (myChart, opt){
             $.ajax({
                 type: "GET",
                 url: '/resources/data/insights/'+opt.importFile,
                 dataType: "text",
                 success: function(data) {	dataProcess(data);	},
                 error: function(err){alert("err "+err); console.log(err)}
             });
             

             var data_arr = [];
             function dataProcess(data){
            	 var idx = 0;
                 var category = [], female = [], male= [];
                 
                 data_ = data.split("\n");
                 data_.forEach(function(entry) {
                	 entry = entry == "@" ? entry : entry.slice(0,entry.length-1);
                     if(entry.length == 1 && entry != "$"){	// @
                         data_arr[idx++] = [female, male];
                         female = []; male = []; 
                     } else if (entry != "$"){
                         var entry_ = entry.split("@");
                         if(entry_.length < 2){
                        	 var catData = entry_[0].split("&&");
                        	 var temp_cate = {"value":"","textStyle":{"fontWeight":"bold"}};
                             var colorObj =  $.grep(opt.categoryColor, function(value, idx){ return value.category == catData[0];    });
                             if(colorObj.length > 0) temp_cate.textStyle.color = colorObj[0].color;
                             temp_cate.value = catData[1];
                             category.push(temp_cate);
                         } else {
                        	 var dataidx = -1;
                        	 $.each(category, function(idx, _category){ if(_category.value == entry_[1])  dataidx = idx;  });
                             if(dataidx > -1){
                                 female[dataidx] = entry_[3]*1;
                                 male[dataidx] = entry_[2]*1;
                             }
                         }
                     }
                 });

                 var option = getDefaultOpt();
                 option.options[0].xAxis[0].data = category;
                 myChart.setOption(option);
             }
             
             

             function getDefaultOpt(){
            	 var option = { timeline : { show:true, autoPlay : true, playInterval : 4000, type : 'number' , data : [] }, options : [] };
                 option.timeline.data = opt.timeline;
                 option.timeline.height = 30;
                 $.each(opt.timeline, function(timeIdx, _timeline){
                	 var _option = insights.getDefOpt(opt.title, opt.subtitle);
                	 _option.tooltip.trigger = 'axis';
                	 _option.tooltip.formatter = axisFormmater;
                     _option.legend.data = opt.legend;
                	 _option.yAxis[0].axisLabel = perLabel;  
                	 _option.yAxis[0].max = 20;
                	 _option.xAxis[0].axisLabel = { rotate : 90 };
                	 _option.grid.y2 = 190;
       			
                     var series = [];
                     $.each(opt.data, function(optIdx, _data){
                    	 $.each(opt.markPoint[timeIdx][optIdx], function(_idx, markP){ markP.itemStyle = eval(markP.itemStyle); });
                         if(_data.type == 'line'){
                         	series.push({name:_data.name, data:eval('data_arr['+timeIdx+']['+optIdx+']'), type:_data.type, itemStyle : _data.itemStyle, markPoint : { data :opt.markPoint[timeIdx][optIdx]} });
                         }else if(_data.type == 'bar'){
                         	series.push({name:_data.name, data:eval('data_arr['+timeIdx+']['+optIdx+']'), type:_data.type, barGap:'2%'});
                         }
                     });
                     _option.series = series;
                     option.options.push(_option);
                 });
                 return option;
             }
             
             

             
             var markstyle = {
            		 getStyle : function (position, color){
                		 return {
                             normal : {
                                 color : color,
                                 label : {
                                     show : true,
                                     position : position,
                                     formatter: function(d){
                                         return(d.data.xAxis);
                                     },
                                     textStyle : {
                                         fontWeight : "bold",
                                         fontSize : 14
                                     }
                                 }
                             }
                         };
                 },
                 
            	 rf : function(){ return this.getStyle('right', '#A50000'); },
            	 lf : function(){ return this.getStyle('left', '#A50000'); },
            	 rm : function(){ return this.getStyle('right', '#005766'); },
            	 lm : function(){ return this.getStyle('left', '#005766'); },
             };
             
             
         }
};