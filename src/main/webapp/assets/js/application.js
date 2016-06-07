//if(!navigator.cookieEnabled)alert(LANG.disabledCookies);

// 상수클래스
// 사용법
// 상수set : constant.set("MAX","9999");
// 상수get : constant.get("MAX");
// 상수값체크 : constant.isDefined("MAX"); // 상수값이 없으면 false, 상수값이 true;

// Array생성자 함수의 프로토타입에 remove() 메서드를 추가합니다.
Array.prototype.remove = function (index) { this.splice(index, 1); }

var constant = (function () {

    var constants = {},
        ownProp = Object.prototype.hasOwnProperty,
        allowed = {
            string: 1,
            number: 1,
            boolean: 1
        },
        prefix = (Math.random() + "_").slice(2);

    return {

        set: function (name, value) {
            if (this.isDefined(name)) {
                return false;
            }
            if (!ownProp.call(allowed, typeof value)) {
                return false;
            }
            constants[prefix + name] = value;
            return true;
        },
        isDefined: function (name) {
            return ownProp.call(constants, prefix + name);
        },
        get: function (name) {
            if (this.isDefined(name)) {
                return constants[prefix + name];
            }
            return null;
        }

    };
})();

$.ajaxSetup({
    timeout: 60000
});

$(document).ajaxStart(function () {

    $.blockUI({
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff',
            'z-index': 10000
        }
    });

});

$(document).ajaxStop(function () {
    $.unblockUI();
});

var debug = {};

debug.log = function () {
    var arr = _.toArray(arguments);
    //console.log("debug:::", arr);
}

debug.info = function () {
    var arr = _.toArray(arguments);
    //console.log("%c info:::", 'background: blue; color: white', arr);
}

debug.error = function () {
    var arr = _.toArray(arguments);
    //console.log("%c error:::", 'background: red; color: white', arr);
}

// 뭔가 존재하는지 여부를 알려주는 함수 null 또는 undefined 여부를 검사한다.
// null, undefined 일때, false를 준다.
function existy(x) {
    return x != null
};
// 어떤 것이 참인지 여부를 결정하는 함수
// null, undefined 일때, false를 준다.
function truthy(x) {
    return (x !== false) && existy(x)
};

function nullStringParse(temp) {
    if (existy(temp) == false) {
        return "0";
    } else {
        return temp;
    }
}

function always(VALUE) {
    return function () {
        return VALUE;
    };
};

Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy":
                return d.getFullYear();
            case "yy":
                return (d.getFullYear() % 1000).zf(2);
            case "MM":
                return (d.getMonth() + 1).zf(2);
            case "dd":
                return d.getDate().zf(2);
            case "E":
                return weekName[d.getDay()];
            case "HH":
                return d.getHours().zf(2);
            case "hh":
                return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm":
                return d.getMinutes().zf(2);
            case "ss":
                return d.getSeconds().zf(2);
            case "a/p":
                return d.getHours() < 12 ? "오전" : "오후";
            default:
                return $1;
        }
    });
};

String.prototype.string = function (len) {
    var s = '', i = 0;
    while (i++ < len) {
        s += this;
    }
    return s;
};
String.prototype.zf = function (len) {
    return "0".string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
    return this.toString().zf(len);
};


function openWin(url, w, h, name, bScrollbar, t, l, bResizable) {

    if (bScrollbar == null)
        bScrollbar = 0;

    if (bResizable == null)
        bResizable = 0;

    if (name == null)
        name = "popWin";

    if (w >= screen.width) { //스크린 상테에 따라 스크롤바 자동표시
        w = screen.width - 40;
        bScrollbar = 1;
    }

    if (h >= screen.height) { //스크린 상테에 따라 스크롤바 자동표시
        h = screen.height - 40;
        w = w + 20;
        bScrollbar = 1;
    }

    if (t == null)
        t = (screen.height - h) / 2;

    if (l == null)
        l = (screen.width - w) / 2;

    var popWin = window.open(url, name, "toolbar=0, channelmode=0, location=0, directories=0, resizable=" + bResizable + ", menubar=0, scrollbars=" + bScrollbar + ", width=" + w + ", height=" + h + ", top=" + t + ", left=" + l);

    if (popWin == null) {
        alert('팝업이 차단되어 있습니다.\n\n팝업을 허용해 주시기 바랍니다.');
        return;
    }

    popWin.focus();

    return popWin;
}


function calCapacity(cap) {

    cap = parseFloat(cap);

    if (cap > 1073741824)
        return Math.round(cap / 1073741824) + " GB";
    else if (cap > 1048576)
        return Math.round(cap / 1048576) + " MB";
    else if (cap > 1024)
        return Math.round(cap / 1024) + " KB";
    else
        return Math.round(cap) + " B";

}

function formatCurrency(number) {

    var str = String(number);
    if (!isNaN(str)) {
        str = str.trim();

        if (str != 'Infinity') {
            var point = "";
            if (str.indexOf(".") > -1) {
                point = str.substr(str.indexOf('.'));
                str = str.substr(0, str.indexOf('.'));
            }
            var temp = [];
            if (number < 0)str = str.substr(1);

            while (str.length > 3) {
                temp.push(str.slice(str.length - 3, str.length));
                str = str.slice(0, str.length - 3);
            }
            temp.push(str);

            str = temp.reverse().join(",");
            if (number < 0)str = ("-" + str);
            return str + point;
        } else {
            return '∞';
        }

    } else {

        return '';

    }

}


/*-------------------------------------------------------------------------
 쿠키 가져오기
 -------------------------------------------------------------------------*/
function getCookie(name) {
    var nameOfCookie = name + "=";
    var x = 0;
    while (x <= document.cookie.length) {
        var y = (x + nameOfCookie.length);
        if (document.cookie.substring(x, y) == nameOfCookie) {
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }

        x = document.cookie.indexOf(" ", x) + 1;

        if (x == 0) break;
    }
    return "";
}


/*-------------------------------------------------------------------------
 쿠키 생성
 -------------------------------------------------------------------------*/
function setCookie(name, value, expiredays) {

    if (expiredays != null) {
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
    } else {
        document.cookie = name + "=" + escape(value) + "; path=/;";
    }
}

/*-------------------------------------------------------------------------
 쿠키 삭제
 -------------------------------------------------------------------------*/
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

String.prototype.bytes = function (str) {

    var len = 0;

    if (this.length > 0) {

        for (var i = 0, end = this.length; i < end; i++) {

            var chr = this.charAt(i);
            len += (chr.charCodeAt() > 128) ? 3 : 1; //한글(utf8)은 3bytes

        }

    }

    return len;

}

String.prototype.deleteWhitespace = function () {

    if (this.length > 0)
        return this.replace(/\s/g, '');
    else
        return this;

}

if (String.prototype.trim == undefined) {

    String.prototype.trim = function () {

        if (this.length > 0)
            return this.replace(/^\s+/, '').replace(/\s+$/, '');
        else
            return this;

    }

}

String.prototype.stripTags = function () {

    var temp = new String(this);
    return temp.replace(/<[^>]+>/g, '');

}

String.prototype.removeBar = function () {

    var temp = new String(this);
    return temp.replace(/-/gi, '');

}


String.prototype.addComma = function () {
    var str = new String(this);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}


String.prototype.removeComma = function () {
    var str = new String(this);
    if (str == "-") return 0;
    return str.replace(/[^\d]+/g, '');
}

Array.prototype.max = function () {
    return Math.max.apply(null, this);
};

Array.prototype.min = function () {
    return Math.min.apply(null, this);
};

Array.prototype.sum = function () {
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        if (typeof(this[i]) != 'number') return null;
        sum += this[i];
    }
    return sum;
};

Array.prototype.ave = function () {

    if (this.length > 0)
        return this.sum() / this.length;
    else
        return 0;
}

Array.prototype.getDataByKey = function (key, value) {
    for (var i = 0; i < this.length; i++) {
        if (eval('this[' + i + '].' + key) == value) {
            return this[i];
        }
    }
    return null;
}

Array.prototype.contains = function(element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
}

function ajaxErrorHandler() {

    $(document).ajaxError(function (event, xhr, settings, exception) {

        try {
            //console.log('AJAX ERROR : ' + exception);
            //console.log(arguments);
        } catch (e) {/*do nothing*/
        }

        if (xhr.status == 401)
            self.location.reload();
        else if (xhr.status == 408) {

            alert('세션이 끊겼습니다. \n재로그인 하십시요.');
            self.location.reload();

        } else {

            if (xhr.status == 403)
                alert('접근권한이 없습니다.');
            else
            	alert('서버로 부터 정상적인 응답을 받지 못하였습니다.' +'\n\nHTTP '+ xhr.status +' '+ exception);

            //$.unblockUI();

        }

    });

}

//jQuery 확장
(function ($) {

    //체크 박스 전체 선택
    $.fn.checkAll = function (target) {

        this.click(function () {
        	
        	var _this = $(this);

        	$('input:checkbox[name='+ target +']', _this.parents('form')).prop('checked', _this.is(':checked'));

        });

        return this;

    };


    //특정 영역내 인쇄
    $.fn.printContent = function (stylesheets) {

        if (this.length) {

            contentPrinter.document.open();
            contentPrinter.document.writeln("<html><head>");

            if (stylesheets) {
                $(stylesheets).each(function () {
                    contentPrinter.document.writeln("<link href='" + this + "' rel='stylesheet' media='print' type='text/css' />");
                });
            }

            contentPrinter.document.writeln("</head><body>");

            contentPrinter.document.writeln(this.html()); // 본문 출력
            contentPrinter.document.writeln("</body></html>");
            contentPrinter.document.close();

            contentPrinter.document.execCommand('Print');

        }

        return this;

    };


    $.fn.selectEmail = function () {

        this.each(function () {

            var select = $(this);

            var input = $(select.attr('input'), select.parents('form'));

            if (select.val().length > 0)
                input.attr('readonly', 'readonly');
            else
                input.removeAttr('readonly');

            select.change(function () {

                var _this = $(this);

                var input = $(_this.attr('input'), _this.parents('form'));
                input.val(_this.val());

                if (_this.val().length > 0) {
                    input.attr('readonly', 'readonly');
                } else {
                    input.removeAttr('readonly');
                    input.focus();
                }

            });

            var emailHost = input.val();
            if (emailHost.length > 0) {

                var temp = $('option[value=\"' + emailHost + '\"]', select);
                if (temp.length > 0) {
                    temp.attr('selected', 'selected');
                } else {
                    $('option:last', select).attr('selected', 'selected');
                    input.removeAttr('readonly');
                }

            } else {

                select.focus(function () {

                    var _this = $(this);

                    var input = $(_this.attr('input'), _this.parents('form'));
                    input.val(_this.val());
                    _this.unbind('focus');

                });

            }

        });

        return this;

    };

    $.fn.inputCurrency = function () {

        this.blur(function () {

            var _this = $(this);
            var temp = _this.val();

            while (temp.indexOf(',') > -1) {
                temp = temp.replace(',', '');
            }

            temp = parseInt(temp);

            if (!isNaN(temp)) {
                _this.val(formatCurrency(temp));
            } else {
                _this.val(_this.data('value_was'));
            }

            _this.removeData('value_was');

        }).focus(function () {

            var _this = $(this);
            var temp = _this.val();

            while (temp.indexOf(',') > -1) {
                temp = temp.replace(',', '');
            }

            _this.data('value_was', _this.val());
            _this.val(temp);

        }).trigger('blur');

    };

    $.fn.enableInputs = function () {

        $('input, select', $(this)).removeAttr('disabled');

        return this;

    }

    $.fn.disableInputs = function () {

        $('input, select', $(this)).attr('disabled', 'disabled');

        return this;

    }

    $.fn.focusFirstInput = function () {

        $('input:text, input:password, select', this).not('[readonly]').filter(":enabled:visible").first().focus();

        return this;

    }

    $.fn.normalizeValue = function () {

        var methods = arguments;

        if (methods.length > 0) {

            $(this).each(function () {

                for (var i in methods) {

                    this.value = String.prototype[methods[i]].apply(this.value);

                }

            });

        }

        return this;

    }

    $.fn.serializeObject = function () {

        var arrayData, objectData;
        arrayData = this.serializeArray();
        objectData = {};

        $.each(arrayData, function () {
            var value;

            if (this.value != null) {
                value = this.value;
            } else {
                value = '';
            }

            if (objectData[this.name] != null) {
                if (!objectData[this.name].push) {
                    objectData[this.name] = [objectData[this.name]];
                }

                objectData[this.name].push(value);
            } else {
                objectData[this.name] = value;
            }
        });

        return objectData;

    }

})(jQuery);


jQuery(function ($) {

    /*
     $('.errorMessage').each(function(){

     var _this = $(this);

     _this.hide();

     $.blockUI({message:_this});


     }).click(function(){
     $.unblockUI();
     }).css('cursor', 'pointer');
     */

    //$('.form_table th.required').prepend($('<img src="/images/star.jpg" class="required"/>'));

});


//포커스 자동 이동
$('input.auto-focus[maxlength]').bind('keyup', function () {

    var _this = $(this);

    if (_this.val().length == parseInt(_this.attr('maxlength'))) {
        var selector = _this.attr('next');
        if (selector == null) {
            _this.next('input, select', this.form).focus();
        } else {
            $(selector, this.form).focus();
        }
    }

});

//포커스 자동 이동
$('select.auto-focus').bind('change', function () {

    var _this = $(this);

    var selector = _this.attr('next');
    if (selector == null) {
        _this.next('input, select', this.form).focus();
    } else {
        $(selector, this.form).focus();
    }

});

//창 크기 변경 시, 차트 크기 재조정 (EChart 만 가능)
var resizeChartOnWinResizeHandler = {

    timer : null,
    timeoutMillis : 500,
    canceledTimers : [],
    charts : null,

    resize : function () {

        var _handler = resizeChartOnWinResizeHandler;

        if (_handler.timer == null)
            for (var i = 0, end = _handler.charts.length; i < end; i++)
                $(_handler.charts[i].dom).css('visibility', 'hidden');

        try {
            clearTimeout(_handler.timer);
            _handler.canceledTimers.push(_handler.timer);
        } catch (e) {
        }

        _handler.timer = setTimeout(function(){

            for (var i = 0, end = _handler.charts.length; i < end; i++) {

                var _chart = _handler.charts[i];

                _chart.resize();
                $(_chart.dom).css('visibility', 'visible');

            }
            
            //크기 보정 : 조정되어야 할 크기에서 5% 이상 벗어날 경우, 조정을 1회 더 시도
            setTimeout(function(){
            	
            	for (var i = 0, end = _handler.charts.length; i < end; i++) {
            		
            		var _chart = _handler.charts[i];
                
	                var chartDomWidth = $(_chart.dom).width();
	                var allowErrorWidth = chartDomWidth * 0.05;
	                var chartRealWidth = _chart.getZrender().getWidth();
	                
	                if(Math.abs(chartDomWidth - chartRealWidth) > allowErrorWidth)
	                	_chart.resize();
                
            	}
            
            }, _handler.timeoutMillis);

            _handler.timer = null;

            //메모리 누수 방지를 위해 명시적 객체 해제 수행
            while (_handler.canceledTimers.length > 0) {
                var _timer = _handler.canceledTimers.shift();
                _timer = null;
            }

        }, _handler.timeoutMillis);

    },

    on : function () {

        this.charts = arguments;

        if (this.charts.length > 0) {
            if (arguments[0] instanceof Array)
                this.charts = arguments[0];

            $(window).on('resize', this.resize);
        }
    },

    off : function () {

        $(window).off('resize', this.resize);

    }

}

if($.datepicker){
	
	$.datepicker.setDefaults({
		//showOn : 'both',
		//buttonImage : (contextPath || '/') +'resources/images/calendar.gif',
		buttonImageOnly : true,
		showOtherMonths : true,
	    selectOtherMonths : true,
	    changeYear : true,    
	    changeMonth : true,
	    showMonthAfterYear: true,
	    autoSize: true,
	    dateFormat : 'yy-mm-dd',
		closeText : "확인", // Display text for close link
		prevText : "이전달", // Display text for previous month link
		nextText : "다음달", // Display text for next month link
		currentText : "오늘", // Display text for current month link
		monthNames : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"], // Names of months for drop-down and formatting
		monthNamesShort : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"], // For formatting
		dayNames : ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"], // For formatting
		//dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
		dayNamesMin : ["일","월","화","수","목","금","토"], // Column headings for days starting at Sunday    
	});
	
}

//jQuery Validity 설정
/*
 if($.validity){

 $.validity.outputs.alert = {

 messageBuffer:null,
 elementBuffer:null,

 start:function(){
 messageBuffer = [];
 elementBuffer = [];
 },

 end:function(results) {
 if(messageBuffer.length){
 alert(messageBuffer.join('\n'));
 elementBuffer[0].focus();
 }
 },

 raise:function($obj, msg){
 elementBuffer.push($obj);
 messageBuffer.push(msg);
 },

 raiseAggregate:function($obj, msg){
 $.merge(elementBuffer, $obj);
 messageBuffer.push(msg);
 }
 }

 $.validity.setup({ outputMode:"alert" });

 }
 */