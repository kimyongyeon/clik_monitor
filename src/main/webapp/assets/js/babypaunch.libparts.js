/*
* javascript libs for share
* dev: 정대규
* first: 2015.10.24
* update: 2016.01.22
* version: 1.0
* lisence: MIT(free), 맘껏 쓰세요, 출처밝혀주시면 더 좋구요. 의견도 보내주시면 더더욱 좋겠습니다. (__)
*/
"use strict";

/*
* onerror(): 예상하지 못한 에러 확인시 유용함.
*/
window.onerror = function(e){
	alert(e);
}

/*
* delay(): 여러번 실행을 하더라도 정해진 시간 후에 마지막 callback이 한번만 실행됨
*/
var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	}
})(); //end: var delay = (function(){

/*
* pad(): 자릿수만큼 문자열을 채운다.
*/
String.prototype.pad = function(length){
	for(var i = 0, str = ""; i < length; i++){
		str += this;
	}
	return str;
} //end: String.prototype.pad = function(length){

var L = {
	ERROR: "[babypaunch.libparts.js: ERROR]" //라이브러리 사용시 잘못사용된 경우 alert에 출력하기 위한 용도

	, isNull: function(o){ //객체가 null인지 체크
		return o === null || o === "null";
	} //end: , isNull: function(o){

	, isUndefined: function(o){ //객체가 undefined인지 체크
		return o === undefined || o === "undefined";
	} //end: , isUndefined: function(o){

	, isEmpty: function(o){ //객체가 공백인지 체크
		return o === "";
	} //end: , isEmpty: function(o){

	, passible: function(o, arr){ //객체의 상태체크를 배열로 받아서 확인
		for(var i = 0; i < arr.length; i++){
			if(eval("this.is" + this.cap(arr[i]) + "(o)")){
				return false;
			}
		}
		return true;
	} //end: , passible: function(o, arr){

	, filterOption: function(o){
		if(this.isNull(o) || this.isUndefined(o) || this.isEmpty(o)){
			o = undefined;
		}
		return o;
	}

	/*
	* L.datefy(): unix의 timestamp 형식의 날짜를 yyyy-mm-dd와 같은 형식으로 변경해서 출력
	*/
	, datefy: function(date, format, language){
		/*
		* lPad0(): 길이만큼 문자열 0을 채운다.
		*/
		Number.prototype.lPad0 = function(length){
			return "0".pad(length - this.toString().length) + this; 
		} //end: Number.prototype.lPad0 = function(length){

		var language = language === undefined ? "ko" : language; //문자 기본은 한글로 설정함.

		var local = {
			en: {
				weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
				, months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
				, noons: ["AM", "PM"]
			}
			, ko: {
				weeks: ["일", "월", "화", "수", "목", "금", "토"]
				, months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
				, noons: ["오전", "오후"]
			}
		}; //end: var local = {

		var date = new Date(typeof(date) === "number" ? date : Number(date)); //unix timestamp

		return format.replace(/(yyyy|YY|mm|MM|dd|WW|hh|NN|HH|mi|ss|ms)/gi, function(pattern){
			switch(pattern){
				case "yyyy":
					return date.getFullYear();
				case "YY":
					return (date.getFullYear() % 1000).lPad0(2);
				case "mm":
					return (date.getMonth() + 1).lPad0(2);
				case "MM":
					return local[language].months[date.getMonth()];
				case "WW":
					return local[language].weeks[date.getDay()];
				case "dd":
					return date.getDate().lPad0(2);
				case "hh":
					return date.getHours().lPad0(2);
				case "NN":
					return local[language].noons[date.getHours() < 12 ? 0 : 1];
				case "HH":
					var hour = 0;
					return ((hour = date.getHours() % 12) ? hour : 12).lPad0(2);
				case "mi":
					return date.getMinutes().lPad0(2);
				case "ss":
					return date.getSeconds().lPad0(2);
				case "ms":
					return date.getMilliseconds().lPad0(4);
			} //end: switch(pattern){
		}); //end: return format.replace(/(yyyy|YY|mm|MM|dd|WW|hh|NN|HH|mi|ss|ms)/gi, function(pattern){
	} //end: datefy: function(date, format, language){

	/*
	* L.validate(): form 요소의 validate를 확인한다.
	*/
	, validate: function($obj, opts, lang){
		var cfg = {
			init: function(){
				return {
					lang: "ko" //언어설정
					, regexp: { //정규식
						email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
						, en: /[^a-z]/g
						, EN: /[^A-Z]/g
						, En: /[^a-zA-Z]/g
						, En_num: /[^a-zA-Z0-9]/g 
						, En_ko: /[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\x20]/g 
						, En_ko_num: /[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\x200-9]/g 
						, ipv4: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
						, ipv6: /^([0-9a-fA-F]{4}:){7}([0-9a-fA-F]{4})$/
						, ko: /[^ㄱ-ㅎㅏ-ㅣ가-힣\x20]/g
						, mac: /^([0-9a-fA-F]{2}[:-]){5}([0-9a-fA-F]{2})$/
						, num: /[^0-9]/g
					} //end: , regexp: {
					, msg: { //알림 메세지
						ko: { 
							array: "정규식에 알맞은 값을 입력해주세요."
							, email: "이메일 형식에 맞게 입력해주세요."
							, en: "영어소문자를 입력해주세요."
							, EN: "영어대문자를 입력해주세요."
							, En: "영어대소문자를 입력해주세요."
							, En_num: "영어대소문자, 숫자를 입력해주세요."
							, En_ko: "영어대소문자, 한글을 입력해주세요."
							, En_ko_num: "영어대소문자, 한글, 숫자를 입력해주세요."
							, exception: "예외가 발생하였습니다."
							, ipv4: "IPv4 형식에 맞게 입력하세요."
							, ipv6: "IPv6 형식에 맞게 입력하세요."
							, ko: "한글을 입력해주세요."
							, mac: "MAC주소가 올바르지 않습니다."
							, minLength: function(length){
								return "최소 " + length + "자를 입력하세요.";
							}
							, minValue: function(value){
								return "최소값 " + value + "을 입력하세요.";
							}
							, maxLength: function(length){
								return "최대 " + length + "자를 입력할 수 있습니다.";
							}
							, maxValue: function(value){
								return "최대값 " + value + "을 입력할 수 있습니다.";
							}
							, num: "숫자를 입력해주세요."
							, regexp: "정규식에 알맞은 값을 입력해주세요."
							, required: "필수 값을 입력해주세요."
							, selector: " 객체가 존재하지 않습니다."
							, unexpect: " 요구되는 값이 입력되지 않았습니다."
						} //end: ko: {
					} //end: , msg: {
					, required: false //필수 여부
					, alert: true //알림 여부
					, clear: false //clear 여부
					, replace: false //대체 여부
					, minLength: null //최소 길이
					, maxLength: null //최대 길이
					, minValue: null //최소값
					, maxValue: null //최대값
				} //end: return {
			} //end: init(){
		}; //end: var cfg = {

		var method = { //method group
			/*
			* method.setResult(): validate의 결과를 셋팅한다.
			* printType이 true면 msg를 변수 형태로 대입, false면 msg를 함수로 호출해서 대입
			*/
			setResult: function($cfg, results, $obj, $var, printType){ //results, 현재객체, 메세지처리순서, 메세지출력타입
				var _msg = $cfg.msg[$cfg.lang]; //message group
				var $msg = $cfg.custom === undefined ? (printType ? _msg[$var] : _msg[$var]($cfg[$var])) : $cfg.custom;

				if($cfg.clear){ //clear가 true면
					$obj.val("");
				}

				if($cfg.alert){ //alert가 true면
					alert($msg);
				}

				$obj.focus(); //focus를 위치시킴.

				results.push({$obj: $obj, msg: $msg, code: $var});
			}

			/*
			* method.check(): option값에 따라 validate 체크를한다.
			*/
			, check: function($cfg, results, $obj, $var){ //results, 현재 객체, 처리 순서
				var $cfg$var = $cfg[$var]; //확장된 $cfg에 $var로 정의된 값을 참조
				var checkable = $cfg$var === false ? false : !L.isNull($cfg$var);
				//console.log(checkable, $cfg$var, $var);

				if(checkable){ //null이 아니면
					switch($var){
						case "required":
							this.setResult($cfg, results, $obj, $var, true);
						break;
						case "minLength":
							if($obj.val().length < $cfg$var){
								this.setResult($cfg, results, $obj, $var, false);
							}
						break;
						case "maxLength":
							if($obj.val().length > $cfg$var){
								this.setResult($cfg, results, $obj, $var, false);
							}
						break;
						case "minValue":
							var _val = $obj.val() * 1;
							if(isNaN(_val)){
								this.setResult($cfg, results, $obj, $var, false);						
							}else{
								if(_val < $cfg$var){
									if($cfg.replace){
										$obj.val($cfg$var);
									}
									this.setResult($cfg, results, $obj, $var, false);						
								}
							}
						break;
						case "maxValue":
							var _val = $obj.val() * 1;
							if(isNaN(_val)){
								this.setResult($cfg, results, $obj, $var, false);						
							}else{
								if(_val > $cfg$var){
									if($cfg.replace){
										$obj.val($cfg$var);
									}
									this.setResult($cfg, results, $obj, $var, false);						
								}
							}
						break;
						default:
							this.setResult($cfg, results, $obj, $var, true);
						break;
					} //end: switch($var){
				} //end: if(checkable){
			} //end: , check: function($obj, $var){

			, init: function($cfg, $obj, opts, lang){
				$.extend($cfg, opts);
				//console.log($cfg);

				var _msg = $cfg.msg[$cfg.lang];
				var $var = "";

				try{
					if($obj.length === 0){ //참조객체가 없으면
						$var = "selector";
						alert(_msg[$var]); //무조건 알림
						return {msg: _msg[$var], code: $var};
					}else{ //참조객체가 1개 이상이면
						var results = [];

						$obj.each(function(idx){ //동일 객체마다 실행
							var $this = $(this); //현재 객체
							var $val = $this.val().trim(); //앞뒤 공백 제거된 현재 값, trim은 무조건 적용
							var $rule = $cfg.rule; //확장된 $cfg의 rule을 참조

							if($val.length === 0){ //길이가 0이면
								method.check($cfg, results, $this, "required"); //필수입력 체크
							}else{
								method.check($cfg, results, $this, "minLength"); //최소길이 체크
								method.check($cfg, results, $this, "maxLength"); //최대길이 체크
								method.check($cfg, results, $this, "minValue"); //최소값 체크
								method.check($cfg, results, $this, "maxValue"); //최대값 체크
							}

							if($rule !== undefined){ //rule이 있으면 설정된 정규식으로 비교한다.
								switch($.type($rule)){ //입력받은 rule의 type비교
									case "string": //문자열이면
										if($cfg.regexp[$rule].test($val)){ //문자열과 동일한 정규식으로 test
											method.check($cfg, results, $this, $rule);
										}
									break;
									case "regexp": //정규식이면
										if($rule.test($val)){ //해당 정규식을 직접 입력해서 test
											method.check($cfg, results, $this, "regexp");
										}
									break;
									default: //기타면, 기대하지 못한 값을 설정
										method.check($cfg, results, $this, "unexpect");
									break;
								} //end: switch($.type($rule)){
							} //end: if($rule !== undefined){
						}); //end: $obj.each(function(idx){

						return results;
					} //end: }else{
				}catch(e){
					alert(e);
					return {msg: _msg.exception, code: "exception"};
				}
			} //end: , init: function($cfg, $obj, opts, lang){
		}; //end: var method = {

		/*
		* 실행부
		*/
		if(opts.event === undefined){
			return method.init(cfg.init(), $obj, opts, lang);
		}else{
			$obj.on(opts.event, function(e){
				if(opts.callback === undefined){
					alert("L.validate()에 event를 사용할 경우, 반드시 callback을 선언해야합니다.");
					return false;
				}else{
					opts.callback(method.init(cfg.init(), $obj, opts, lang));
				}
			});
		}
	} //end: , validate: function($obj, opts, lang){

	/*
	* L.excepts(): 입력받은 json객체로부터 arr에 해당하는 요소를 제외하고 json형태로 return한다.
	*/
	, excepts: function(json, arr){
		var _json = {};
		for(var key in json){
			if($.inArray(key, arr) === -1){
				_json[key] = json[key];
			}
		}
		return _json;
	} //end: , excepts: function(json, arr){

	/*
	* L.serailize(): 입력받은 json객체를 직렬화한다. json만 넘길경우엔 jquery의 직렬화와 같은 결과이다.
	*/
	, serialize: function(json, concat, separator, excepts){
		var str = "";
		if(excepts !== undefined && excepts.length > 0){
			json = this.excepts(json, excepts);
		}

		for(var keys = Object.keys(json), i = 0; i < keys.length; i++){
			var key = keys[i];
			var c = concat === undefined || concat === null;
			var s = separator === undefined || separator === null;
			str += key + (c ? "=" : concat) + json[key] + (i + 1 === keys.length ? "" : (s ? "&" : separator));
		}
		return str;
	} //end: , serialize: function(json, concat, separator, excepts){
	
	/*
	* L.jsonize(): 입력받은 문자열을 구분하여 json 객체로 변형 후 return한다.
	*/
	, jsonize: function(str, separator){
		var json = {};
		var arr = str.replace(/{/gi, "").replace(/}/gi, "").split(separator === undefined ? "," : separator);

		for(var i = 0; i < arr.length; i++){
			var pair = arr[i].split("=");
			json[$.trim(pair[0])] = $.trim(pair[1]);
		}

		return json;
	} //end: , jsonize: function(str, separator){

	/*
	* L.sort(): json객체를 정렬한다.
	*/
	, sort: function(obj, order){
		var orders = [order === "dsc" ? ">" : "<" , order === "dsc" ? "<" : ">"];
		obj.sort(function(a, b){
			return eval("a.value " + orders[0] + " b.value ? -1 : a.value " + orders[1] + " b.value ? 1 : 0");
		});
	} //end: sort: function(obj, order){

	/*
	* L.cap(): 입력받은 첫번째 문자열을 대문자화한다.
	*/
	, cap: function(str){
		return str.charAt(0).toUpperCase() + str.slice(1);
	} //end: , cap: function(str){

	/*
	* L.comma(): 입력받은 문자열에 3자리마다 comma를 추가한다, strip이 true이면 comma을 제거한다.
	*/
	, comma: function(n, strip){
		return strip ? n.replace(/[^\d]+/g, '') : n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
	} //end: , comma: function(n, strip){

	/*
	* L.locate(): jquery의 ajax()를 delegate해서 간략화한 함수이다.
	* options 파라미터를 활용하면, file을 비동기 전송할 수 있다.
	* 기본값이 설정되어있지 않은 options의 4가지 유용한 값(true를 지정할 경우에만 동작)
	* setJson: 전송할 데이터의 contentType을 json타입으로 지정함. 
	* getJson: 서버로부터 받을 데이터를 json타입으로 지정함.
	* setStringify: 전송할 데이터를 JSON.stringify()해서 전송할지 결정함.
	* getStringify: 전송받은 결과를 callback 파라미터로 넘길때 JSON.stringify()해서 전송할지 결정함.
	*/
	, locate: function(url, params, options, done, fail){
		var defaults = {
			"type": "post"
			, "processData": true
			, "file": false
			, "block": {
				"use": true
				, "successClose": true
				, "position": "fixed"
				, "top": 0
				, "left": 0
				, "width": "100%"
				, "height": "100%"
				, "background": "rgba(0,0,0,0.5)"
				, "text-align": "center"
				, "z-index": L.ui.maxIndex() + 1
				, "img": "<img src='data:image/gif;base64,R0lGODlhEAALAPQAAAAAAP///yQkJC4uLhQUFPj4+P///9DQ0Hx8fJ6enkRERNzc3LS0tHR0dJqamkBAQNjY2Pr6+rCwsBgYGCYmJgoKCsbGxiIiIgwMDEhISF5eXjQ0NBAQEAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA' style='position: relative; top: calc(50% - 5.5px); width: 16px; height: 11px;'/>"
			}
			, "bypass": {}

			, "init": function(options){
				options = L.filterOption(options);
				$.extend(true, this, options);

				/*
				* 값 초기화 대상: defaults.contentType, defaults.processData
				* 개발사유1: 비동기 파일 전송을 할 경우, contentType과 processData의 값을 false로 고정해야하므로
				* 개발사유2: 기본값이 설정되어 있지 않은 setJson의 값을 통해 서버로 보낼 contentType을 쉽게 설정하고 사용하기 위해.
				* 1. options가 정의되지 않고 defaults에 contentType도 정의되지 않았다면 "urlencoded" 타입으로 초기화.
				* 2. options가 정의되어 있고 defaults에 contentType도 정의되어 있다면
				* 2.1. options에 setJson이 true로 정의되어 있으면 "json" 타입으로 초기화.
				* 2.2.1. options의 contentType이 정의되지 않았다면 "urlencoded"로 초기화.
				* 2.2.2. options의 contentType이 정의되어 있다면 정의된 값으로 초기화.
				*/
				if(this.file){ //비동기 파일 전송일 경우
					this.contentType = false;
					this.processData = false;
				}else{
					var appType = {
						"urlencoded": "application/x-www-form-urlencoded; charset=utf-8"
						, "json": "application/json; charset=utf-8"
					};
					this.contentType = (options === undefined && this.contentType === undefined) ? appType.urlencoded : (options.setJson ? appType.json : (options.contentType === undefined ? appType.urlencoded: options.contentType));
				}

				/*
				* 값 초기화 대상: defaults.dataType
				* 개발사유: 기본값이 설정되어 있지 않은 getJson의 값을 통해 서버에서 받을 dataType을 쉽게 설정하고 사용하기 위해.
				* 1. options가 정의되지 않고 defaults에 dataType도 정의되지 않았다면 "text"로 초기화.
				* 2. options가 정의되어 있고 defaults에 dataType도 정의되어 있다면
				* 2.1. options에 getJson이 true로 정의되어 있으면 "json"으로 초기화.
				* 2.2.1. options의 dataType이 정의되지 않았다면 "text"로 초기화.
				* 2.2.2. options의 dataType이 정의되어 있다면 정의된 값으로 초기화.
				*/
				this.dataType = (options === undefined && this.dataType === undefined) ? "text" : (options.getJson ? "json" : (this.dataType = options.dataType === undefined ? "text" : options.dataType));

				if(this.block.use){ //dim layer를 사용할 경우
					var blockStyle = L.excepts(this.block, ["use", "successClose", "img"]);
					var $layer = $("div[data-layered='0']");
					$layer.length > 0 ? $layer.show() : $("body").append(L.ui.layer(blockStyle, defaults.block.img)).css({"overflow": "hidden"});
				}

				return options;
			} //end: , "init": function(options){
		}; //end: var defaults = {

		options = defaults.init(options); //초기화

		$.ajax({
			"type": defaults.type
			, "url": url
			, "data": options === undefined ? params : (options.setStringify ? JSON.stringify(params) : params)
			, "dataType": defaults.dataType
			, "contentType": defaults.contentType
			, "processData": defaults.processData
			, success: function(data, status, xhr){
				if(defaults.block.successClose){ //성공시 dim layer를 자동닫도록 설정하면
					L.ui.closeLayer(defaults.block.use);
				}
				if(done !== undefined){
					done(options === undefined ? [data, defaults.bypass] : (options.getStringify ? JSON.stringify([data, defaults.bypass]) : [data, defaults.bypass]));
				}
			}, error: function(xhr, status, error){
				if(fail !== undefined){
					fail(options === undefined ? [xhr, defaults.bypass] : (options.getStringify ? JSON.stringify([xhr, defaults.bypass]) : [xhr, defaults.bypass]));
				}
			}
		}); //end: $.ajax({
	} //end: , locate: function(url, params, options, done, fail){

	/*
	* L.formData(): file의 비동기 전송을 위한 객체를 생성한다. 이 객체를 ajax의 data부에 대입하면 됨.
	*/
	, formData: function($obj, isMulti){
		var formData = new FormData();
		$obj.each(function(idx){
            console.log(">>>", $(this)[0].files[0]);
			if($(this)[0].files[0] !== undefined){
				formData.append($obj.attr("name") + (isMulti ? idx : ""), $(this)[0].files[0]);
			}
		});
		return formData;
	} //end: , formData: function($obj, isMulti){

	/*
	* L.ui: UI를 구성하는 preset 모음.
	*/
	, ui: {
		/*
		* L.ui.select(): select box의 속성과 option 객체를 입력하면 자동으로 select box를 그린다.
		*/
		select: function(json, option){
			var str = "";
			for(var i in json){
				str += " " + i + "='" + json[i] + "'";
			}
			return "<select" + str + ">\n" + (option === undefined ? "" : option) + "</select>\n";
		} //end: select: function(json, option){

		/*
		* L.ui.option(): select box에 들어갈 option 객체를 그린다. sort가 있을 경우 정렬처리함.
		*/
		, option: function(arr, sort){
			var str = "";

			if(sort){
				L.sort(arr, sort);
			}

			for(var i = 0; i < arr.length; i++){
				var _arr = arr[i];
				str += "<option value='" + _arr.value + "'>" + _arr.text + "</option>\n";
			}
			return str;
		} //end: , option: function(arr){

		/*
		* L.ui.maxIndex(): 화면상에 z-index가 가장 높은 객체를 찾아서 + 1한 값을 return한다.
		*/
		, maxIndex: function(){
			var result = 0;
			$("*").each(function(){
				var $position = $(this).css("position");
				if($position === "absolute" || $position === "fixed"){
					var zIndex = $(this).css("z-index") === "auto" ? 1 : parseInt($(this).css('z-index'));
					if(zIndex > result){
						result = zIndex;
					}
				}
			});
			return result;
		} //end: , maxIndex: function(){

		/*
		* L.ui.floatMenu(): 지정된 객체에 fixed된 style을 입력한다.
		*/
		, floatMenu: function($object, json){
			var styles = {
				"position": "fixed"
				, "z-index": this.maxIndex() + 1
			};
			for(var i in json){
				styles[i] = json[i];
			}

			$object.css(styles);
		} //end: , floatMenu: function($object, json){

		/*
		* L.ui.radio(): radio set을 그려준다.
		*/
		, radio: function(arr, json, isIcon){
			return this.realize("radio", arr, json, isIcon);
		} //end: , radio: function(arr, json){
		
		/*
		* L.ui.checkbox(): checkbox set을 그려준다.
		*/
		, checkbox: function(arr, json, isIcon){
			return this.realize("checkbox", arr, json, isIcon);
		} //end: , checkbox: function(arr, json){

		/*
		* L.ui.realize(): radio/checkbox set의 구현 부분
		*/
		, realize: function(type, arr, json, isIcon){
			var str = "";

			if(type === "radio" || type === "checkbox"){
				var labelAttrs = "";
				if(json !== undefined){
					for(var i in json){
						labelAttrs += " " + i + "='" + json[i] + "'";
					}
				}

				for(var i = 0; i < arr.length; i++){
					var inputAttrs = "";
					var text = "";
					for(var j in arr[i]){
						if(j === "text"){
							text = arr[i][j];
						}else{
							inputAttrs += " " + j + "='" + arr[i][j] + "'";
						}
					}

					if(isIcon){
						str += "<label" + labelAttrs + ">"
							+ "<input type='" + type + "'" + inputAttrs + " style='display: none;' onclick='L.ui.click" + L.cap(type) + "(this)'/>"
							+ "<i class='fa fa-" + (type === "radio" ? "circle" : "square") + "-o' style='color: gray'></i>"
							+ "<i class='fa fa-" + (type === "radio" ? "dot-circle" : "check-square") + "-o' style='display: none; color: blue;'></i>"
							+ text
						+ "</label>\n";
					}else{
						str += "<label" + labelAttrs + "><input type='" + type + "'" + inputAttrs + "/>" + text + "</label>\n";
					}
				}
			} //end: if(type === "radio" || type === "checkbox"){

			return str;
		} //end: , realize: function(type, arr, json){

		/*
		* L.ui.clickRadio(): radio를 클릭하면 동작
		*/
		, clickRadio: function(obj){
			var $parent = $(obj).parent();
			$parent.parent().find("i:odd").hide().end().find("i:even").show();
			$parent.find("i:even").hide().end().find("i:odd").show();
		} //end: , clickRadio: function(obj){

		/*
		* L.ui.clickCheckbox(): checkbox를 클릭하면 동작
		*/
		, clickCheckbox: function(obj){
			var $parent = $(obj).parent();
			var toggles = $(obj).prop("checked") ? ["hide", "show"] : ["show", "hide"];
			$parent.find("i:even")[toggles[0]]().end().find("i:odd")[toggles[1]]();
		} //end: , clickCheckbox: function(obj){

		/*
		* L.ui.tags
		*/
		, tags: {
			file: {
				wrap: "div"
				, close: "i"
				, open: "i"
			} //end: file: {
		} //end: , tags: {

		/*
		* L.ui.file(): 정해진 UI대로 file을 자동으로 그려준다.
		* TODO: div, input, i 객체를 대신하거나 이를 동적으로 대입할 수 있도록 수정이 필요함.(UI의 종속성을 최소화하기 위함)
		*/
		, file: function(json, addCallback, removeCallback){
			var parts = {
				wrap: function(groupId, file, input, open, close){
					var tag = L.ui.tags.file.wrap;
					var style = "style='position: relative; margin-bottom: 5px;'";
					return "<" + tag + " data-file-groupId=" + groupId + " " + style + ">\n" + file + input + open + close + "</" + tag + ">\n";
				}
				, paramString: function(json, addCallback, removeCallback){
					return "this, " + JSON.stringify(json) + ", \"" + addCallback + "\", \"" + removeCallback + "\"";
				}
				, file: function(json, addCallback, removeCallback){
					var attrs = "name='" + json.name + "'";
					for(var i in json){
						if(i === "true"){
							attrs += " " + i + "='" + json[i] + "'";
						}
					}
					var style = "style='display: none;'";
					return "<input type='file' " + attrs + " " + style + " onchange='L.ui.changeFile(" + this.paramString(json, addCallback, removeCallback) + ")'/>\n";
				}
				, text: function(str){
					var style = "style='width: 100%;'";
					return "<input type='text' readonly='readonly' " + style + " onclick='L.ui.clickFile(this.parentNode.children)' placeholder='" + str + "'/>\n";
				}
				, close: function(json, addCallback, removeCallback){
					var tag = L.ui.tags.file.close;
					var style = "style='position: absolute; top: 6px; right: 5px; display: none;'";
					return "<" + tag + " class='fa fa-times' " + style + " onclick='L.ui.removeFile(" + this.paramString(json, addCallback, removeCallback) + ")'></" + tag + ">\n";
				}
				, open: function(){
					var tag = L.ui.tags.file.open;
					var style = "style='position: absolute; top: 6px; right: 5px;'";
					return "<" + tag + " class='fa fa-file' " + style + " onclick='L.ui.clickFile(this.parentNode.children)'></" + tag + ">\n";
				}
			}; //end: var parts = {

			return parts.wrap(json.groupId
				, parts.file(json, addCallback, removeCallback)
				, parts.text("Choice a File.")
				, parts.close(json, addCallback, removeCallback)
				, parts.open()
			);
		} //end: , file: function(json, addCallback, removeCallback){

		/*
		* L.ui.clickFile(): input이나 file icon을 클릭하면 숨겨진 file을 trigger로 클릭해준다.
		*/
		, clickFile: function(children){
			if($(children[2]).is(":hidden")){ //.fi-times
				$(children[0]).trigger("click"); //input[type='file']
			}
		} //end: , clickFile: function(children){

		/*
		* L.ui.able: file의 uplaod를 확인하기 위한 preset 모음.
		*/
		, able: {
			/*
			* L.ui.able.ext(): 파일의 확장자를 확인한다. 문자열/배열을 받을 수 있다.
			*/
			ext: function($obj, $file, json){
				var result = true;
				if(json.ext === undefined){
					result = true;
				}else{
					var fileName = $file.name;
					var extFileName = $file.name.substring($file.name.lastIndexOf(".") + 1, $file.name.length).toLowerCase();

					switch($.type(json.ext)){
						case "string":
							var extCompare = json.ext.toLowerCase();
							result = extCompare === extFileName ? true : false;
							if(!result){
								alert("업로드 파일의 확장자는 대소문자 구분없이 " + json.ext + "만 허용됩니다.");
								$obj.parent().remove(); //객체 제거
							}
						break;
						case "array":
							result = false;
							for(var i = 0; i < json.ext.length; i++){
								if(json.ext[i].toLowerCase() === extFileName){
									return true;
								}
							}
							if(!result){
								alert("업로드 파일의 확장자는 대소문자 구분없이 " + json.ext.join() + "만 허용됩니다.");
								$obj.parent().remove(); //객체 제거
							}
						break;
						default:
							alert(L.ERROR + "L.able.ext(): 파일의 확장자는 문자열이나 배열만 입력할 수 있습니다.");
							$obj.parent().remove(); //객체 제거
							result = false;
						break;
					}
				}

				return result;
			} //end: ext: function($obj, $file, json){

			/*
			* L.ui.able.byte(): 파일의 용량을 확인한다.
			*/
			, byte: function($obj, $file, json){
				var result = true;
				if(json.byte === undefined){
					result = true;
				}else{
					var flag = json.byte.toLowerCase();
					var bytes = Number(json.byte.replace(/[^0-9]/g, ""));

					for(var i = 0, arr = ["k", "m", "g", "t", "p"]; i < arr.length; i++){
						if(flag.lastIndexOf(arr[i]) !== -1){
							result = $file.size < bytes * Math.pow(1024, i + 1) ? true : false;
						}
					}
					if(!result){
						alert("업로드 파일의 용량은 " + json.byte + "이하로 제한합니다.");
						$obj.parent().remove(); //객체 제거
					}
				}
				return result;
			} //end: , byte: function($obj, $file, json){

			/*
			* L.ui.able.size(): 이미지 파일의 가로/세로 크기를 확인한다.
			*/
			, size: function($obj, json, callback){
				this.realize("size", $obj, json, callback);
			} //end: , size: function($obj, json, callback){

			/*
			* L.ui.able.ratio(): 이미지 파일의 가로/세로 비율을 확인한다.
			*/
			, ratio: function($obj, json, callback){
				this.realize("ratio", $obj, json, callback);
			} //end: , ratio: function($obj, json, callback){

			/*
			* L.ui.able.realize(): size/ratio의 구현부분, 비동기로 동작되므로 callback패턴을 이용함.
			*/
			, realize: function(flag, $obj, json, callback){
				var fr = new FileReader;
				fr.onload = function(){ //fileReader가 load되고
					var img = new Image;
					img.onload = function(){ //img객체가 load되고
						var result = true;
						if(flag === "size"){
							if(json[flag][2]){ //보다 작은 값도 된다면
								result = this.width <= Number(json[flag][0]) && this.height <= Number(json[flag][1]) ? true : false;
								if(!result){
									alert("이미지 파일의 크기는 가로(" + Number(json[flag][0]) + "px), 세로(" + Number(json[flag][1]) + "px)보다 작거나 같아야 합니다.");
								}
							}else{ //같아야만 한다면
								result = this.width === Number(json[flag][0]) && this.height === Number(json[flag][1]) ? true : false;
								if(!result){
									alert("이미지 파일의 크기는 가로(" + Number(json[flag][0]) + "px), 세로(" + Number(json[flag][1]) + "px)와 같아야 합니다.");
								}
							}
						}else{ //ratio 비율 비교
							var compares = [Math.round(this.width / 100), Math.round(this.height / 100)];
							result = compares[0] === Number(json[flag][0]) && compares[1] === Number(json[flag][1]) ? true : false;
							if(!result){
								alert("이미지 파일의 비율은 가로(" + Number(json[flag][0]) + "), 세로(" + Number(json[flag][1]) + ")이여야 합니다.");
							}
						}
						this.remove(); //이미지 객체 제거
						callback(result);
					};
        			img.src = fr.result;
					//$obj.parent().html(img);
				}
				fr.readAsDataURL($obj[0].files[0]);
			} //end: , realize: function(flag, $obj, json, callback){
		} //end: , able: {

		/*
		* L.ui.uploadable(): file의 upload 가능을 확인
		*/
		, uploadable: function($obj, json, callback){
			var $file = $obj[0].files[0];
			var isExt = this.able.ext($obj, $file, json);
			var isByte = this.able.byte($obj, $file, json);

			if(json.size === undefined && json.ratio === undefined){
				callback(isExt && isByte);
			}else{ //파일의 size/ratio 확인 비동기로 동작되므로 분기처리
				var flag = json.size !== undefined ? "size" : "ratio";
				this.able[flag]($obj, json, function(result){
					callback(isExt && isByte && result);
				});
			}
		} //end: , uploadable: function(json){

		/*
		* L.ui.changeFile(): 파일의 값이 바뀌면 동작
		*/
		, changeFile: function(obj, jsonString, addCallback, removeCallback){
			var $obj = $(obj);
			var $val = $obj.val();
			var $parent = $obj.parent();
			var fileName = $val.substring($val.lastIndexOf("\\") + 1, $val.length); //fakePath를 제거하기 위해 파일명만 추출한다.
			var fileTag = this.tags.file;
			
			$parent.find("input[type='text']").val(fileName).end().find(fileTag.open + ".fa-file").hide().end().find(fileTag.close + ".fa-times").show();

			if(jsonString.isMulti){ //file을 다중생성가능
				if(jsonString.limit !== undefined){ //제한이 없을 경우
					if(jsonString.limit > $("div[data-file-groupId='" + jsonString.groupId + "']").length){
						$parent.parent().append(this.file(jsonString, addCallback, removeCallback));
					}
				}else{ //제한이 있을 경우
					$parent.parent().append(this.file(jsonString, addCallback, removeCallback));
				}
			}

			this.uploadable($obj, jsonString, function(result){ //file의 upload 가능여부 확인
				if(result){ //upload 가능하면
					if(L.passible(addCallback, ["null", "undefined", "empty"])){
						window[addCallback](L.formData($obj, jsonString.isMulti));
					}
				}else{ //upload 불가능하면
					L.ui.removeFile(obj, jsonString, addCallback, removeCallback);
					return false;
				}
			});
		} //end: , changeFile: function(obj, jsonString, addCallback, removeCallback){

		/*
		* L.ui.removeFile(): 파일을 제거한다.
		*/
		, removeFile: function(obj, jsonString, addCallback, removeCallback){
			var $parent = $(obj).parent();
			if(L.passible(removeCallback, ["null", "undefined", "empty"])){ //삭제에 대한 callback이 정의됐을 경우
				var $file = $parent.find("input[type='file']");
				window[removeCallback](L.formData($file, jsonString.isMulti));
			}

			if(jsonString.isMulti){ //file의 다중생성이 가능할 경우
				if(jsonString.limit !== undefined){ //제한이 있을 경우
					var $root = $parent.parent();
					var limiter = 0;
					$("div[data-file-groupId='" + jsonString.groupId + "'] input[type='text']").each(function(){
						if($(this).val() !== ""){
							limiter++;
						}
					});

					if(limiter === jsonString.limit){
						$parent.remove();
						$root.append(this.file(jsonString, addCallback, removeCallback))
					}else{
						$parent.remove().parent().append(this.file(jsonString, addCallback, removeCallback));
					}
				}else{ //제한이 없을 경우
					$parent.remove();
				}
			}else{ //file을 하나만 생성할 경우
				$parent.parent().html(this.file(jsonString, addCallback, removeCallback));
			}
		} //end: , removeFile: function(obj, jsonString, addCallback, removeCallback){

		/*
		* L.ui.layer(): dim layer를 그린다.
		*/
		, layer: function(json, str, layerIndex){
			var attr = layerIndex === undefined ? "data-layered='0'" : "data-layered='" + layerIndex + "'";
			return "<div " + attr + " style='" + L.serialize(json, ":", ";") + "'>" + (str === undefined ? "" : str)+ "</div>";
		} //end: , layer: function(json, str, layerIndex){

		/*
		* L.ui.getLayerStyle(): dim layer의 default style을 지정한다.
		*/
		, getLayerStyle: function(option){
			var defaults = {
				"position": "fixed"
				, "top": 0
				, "left": 0
				, "width": "100%"
				, "height": "100%"
				, "background": "rgba(0,0,0,0.5)"
				, "text-align": "center"
				, "z-index": this.maxIndex() + 1
			};
			if(option !== undefined){
				$.extend(defaults, option);
			}
			return defaults;
		} //end: , getLayerStyle: function(option){

		/*
		* L.ui.closeLayer(): dim layer를 숨김처리한다.
		*/
		, closeLayer: function(useBlock, layerIndex){
			if(useBlock){
				$("body").css({"overflow": "auto"});
				var attr = layerIndex === undefined ? "data-layered='0'" : "data-layered='" + layerIndex + "'";
				$("div[" + attr + "]").hide();
			}
		} //end: , closeLayer: function(useBlock, layerIndex){

		/*
		* L.ui.table(): 자동으로 table의 head와 body를 그린다.
		*/
		, table: function(head, body){
			var ths = "";
			for(var i = 0; i < head.length; i++){
				var thStyle = {
					"border": "0px solid silver"
					, "background": "silver"
					, "color": "white"
				};
				$.extend(true, head[i], thStyle);

				ths += "<th data-th-name='" + head[i].name + "' style='" + L.serialize(head[i], ":", ";", ["text", "name"]) + "'>" + head[i].text + "</th>\n";
			}

			var trs = "";
			for(var i = 0; i < body.length; i++){
				var tds = "";
				for(var j in body[i]){
					tds += "<td>" + body[i][j] + "</td>\n";
				}
				trs += "<tr style='" + (i % 2 === 0 ? "" : "background: #eee") + "'>" + tds + "</tr>\n";
			}

			return "<table style='table-layout: fixed;'>\n"
				+ "<thead>\n<tr>\n" + ths + "</tr>\n</thead>\n"
				+ "<tbody>" + trs + "</tbody>\n"
			+ "</table>\n";
		} //end: table: function(head, body){

		/* TODO:
		, calendar: function(json){
			//header: 1 * 5
			//header: 1 * 7
			//footer: 6 * 7
			var defaults = {
			};

			var header = "";
			var footer = "";
		} //end: , calendar: function(json){

		, swipe: function(json){
		} //end: , swipe: function(json){
		*/
	} //end: , ui: {
}; //end: var L = {
