'use strict';

(function(global) {
	var Base = global.Base || (global.Base = {});
}(this));

$(function() {

	var optionChart = {
		type: 'doughnut',
		data: {
			datasets: [{
				data: [
					0,
					0
				],
				backgroundColor: [
					'#1e87f0',
					'#f8f8f8'
				]
			}],
			labels: [
				'0',
				'0'
			]
		},
		options: {
			responsive: true,
			legend: {
				position: 'bottom',
			},
			title: {
				display: true,
				text: 'Monthly Process Score'
			},
			animation: {
				animateScale: true,
				animateRotate: true
			}
		}
	};

    var appHowMuch = function() {

		var $document = $(document),
			$app = $('#app'),
			$settings = null,
			$settingsForm = null;

		var objPay = {
			date: '12',
			startTime: '09:00',
			endTime: '18:00',
			totalMoney: '1,000,000'
		};

		var result = {};

		var ctx = document.getElementById('chart-area').getContext('2d'); // 차트 객체

		var setStorage = function(){
			localStorage.setItem('howMuch', JSON.stringify(objPay));
			// console.info(objPay);
		};

		var getStorage = function(){
			// var obj = JSON.parse(localStorage.getItem('howMuch'));
			// if (obj !== null) {
			// 	objPay = obj;
			// }
		};

		var setProp = function(_id, _val){
			for (var prop in objPay) {
				if (objPay.hasOwnProperty(prop)) {
					if (prop == _id) {
						objPay[prop] = _val;
					}
				}
			}
		};

		var fillSettingsForm = function(){
			for (var prop in objPay) {
				if (objPay.hasOwnProperty(prop)) {
					$settings.find('.' + prop).val(objPay[prop]);
				}
			}
		};

		function returnNumberFormat(_val){ // 숫자 쉼표 처리
			if (_val !== '') {
				console.log(_val);
				_val = parseInt(_val.replace(/\D/g,''),10);
				_val = _val.toLocaleString('en');
			}
			return _val;
		};

		function removeComma(str){ // 쉼표 제거
			console.log(str);
			var n = parseInt(str.replace(/,/g,""));
			return n * 1;
		};

		function toDigit(_num){ // 두자리 숫자 반환
			_num = (_num >= 10) ? _num : '0' + _num;
			return _num;
		}

		var onChange = function(e){
			var $this = $(e.target);
			$this = ($this.is('input')) ? $this : $this.closest('input');
			var _type = $this.data('type');
			var _format = $this.data('format');
			var _val = $this.val() || '';
			_val = (_type == 'number') ? _val * 1 : _val;

			if (_format == 'money' && _val !== '') {
				$this.val(returnNumberFormat(_val));
			}

			setProp($this.attr('id'), _val);
			setStorage();
		};

		var getResult = function(){

			console.table('config', objPay);

			var getDiffTime = function(_startDate, _endDate, _boolDay){
				var _result = (new Date(_startDate)) - (new Date(_endDate));
				_result = (_boolDay === true) ? (_result / (1000 * 60 * 60 * 24)) : _result; // _boolday 가 참일 경우 날짜 반환
				return _result;
			};

			var today = new Date();

			var a = {
				full: today.toString(),
				year: today.getFullYear(),
				month: today.getMonth() + 1,
				date: today.getDate(),
				day: today.getDay(),
				time: today.toString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
			};

			console.table(a);

			var theday = new Date(a.year + '-' + a.month + '-' + objPay.date);
			var isNextMonth = (objPay.date - a.date < 0) ? true : false; // 이번달 date가 지나 다음달이 대상이어여할 경우
			if (isNextMonth === true) {
				theday.setMonth(theday.getMonth() + 1); // 한달 뒤로 교정
			}
			var b = {
				full: theday.toString(),
				year: theday.getFullYear(),
				month: theday.getMonth() + 1,
				date: theday.getDate(),
				day: theday.getDay(),
				time: theday.toString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
			};
			console.table(b);

			var _leftWorkday = getDiffTime(a.year + '-' + a.month + '-' + a.date, b.year + '-' + b.month + '-' + b.date, true); // 남은 날짜
			var _leftWorkdayTime = getDiffTime(a.year + '-' + a.month + '-' + a.date, b.year + '-' + b.month + '-' + b.date, false); // 남은 날짜를 str

			var getMonthEnd = function(_time){ // 달마지막 날 구하기
				var lastday = new Date(_time.getTime());
				lastday.setMonth(lastday.getMonth()-1);
				var _end = getDiffTime(b.year + '-' + b.month + '-' + b.date, lastday.getFullYear() + '-' + (lastday.getMonth() + 1) + '-' + lastday.getDate(), true);
				return _end;
			};

			var _end = getMonthEnd(theday);

			var _earnedToday = parseInt(objPay.totalMoney.replace(/,/g,""));
			_earnedToday = Math.floor(_earnedToday / _end);

			result = {
				earnedToday: _earnedToday, // 지난 달, 오늘, 일할 금액 계산 필요
				earnedTodayAfterTax: Math.floor(_earnedToday * 0.967),
				lastWorkday: _end + _leftWorkday, // 지난 날짜, 보강필요
				leftWorkday: 0 - _leftWorkday, // 남은 날짜, 보강필요
				completePercent: ((1 + (_leftWorkday / _end)) * 100).toFixed(2) * 1, // 보강필요
				nextPayDay: b.month + '/' + b.date,
				countDown: 'date: '+ b.year +'-'+ toDigit(b.month) +'-'+ toDigit(b.date) +'T00:00:00+09:00',
				monthEnd: _end // 막날
			};
			console.table('result', result);

		};

		var setChart = function(){
			var _lastday = result.completePercent;
			var _leftday = 100 - result.completePercent;
			optionChart.data.datasets[0].data = [ _lastday, _leftday ];
			optionChart.data.labels = [ 'last ' + Math.round(_lastday) + '%', 'left ' + Math.round(_leftday) + '%']
			window.myChart = new Chart(ctx, optionChart);
		};

		var setHandler = function(){
			$app.on('keyup change', 'input', onChange);
		};

		var run = function(){
			$('.countdown').attr('uk-countdown', result.countDown);
			$('.earnedToday').text('KRW ' + result.earnedToday.toLocaleString('en'));
			$('.earnedTodayAfterTax').text('KRW ' + result.earnedTodayAfterTax.toLocaleString('en'));
			$('.lastWorkday').text(result.lastWorkday + ' day');
			$('.leftWorkday').text(result.leftWorkday + ' day');
			$('.nextPayDay').text(result.nextPayDay);
		};

		var init = function(){
			$settings = $('#settings');
			$settingsForm = $settings.find('input');
			getStorage();
			fillSettingsForm();
			getResult();
			run();
			setChart();
			setHandler();
		};

		init();

    };

    appHowMuch();

});
