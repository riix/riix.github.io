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
				text: 'Today'
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

		var payDay = {
			"startTime": 0,
			"endTime": 0,
			"payDay": 0,
			"totalMoney": 0
		};

		var result = {};

		var ctx = document.getElementById('chart-area').getContext('2d'); // 차트 객체

		var setStorage = function(){
			localStorage.setItem('payday', JSON.stringify(payDay));
			// console.info(payDay);
		};

		var getStorage = function(){
			var obj = JSON.parse(localStorage.getItem('payday'));
			if (obj !== null) {
				payDay = obj;
				// console.log('loaded', payDay);
			}
		};

		var setProp = function(_id, _val){
			for (var prop in payDay) {
				if (payDay.hasOwnProperty(prop)) {
					if (prop == _id) {
						payDay[prop] = _val;
					}
				}
			}
		};

		var fillSettingsForm = function(){
			for (var prop in payDay) {
				if (payDay.hasOwnProperty(prop)) {
					$settings.find('.' + prop).val(payDay[prop]);
				}
			}
		};

		function returnNumberFormat(_val){
			if (_val !== '') {
				_val = parseInt(_val.replace(/\D/g,''),10);
				_val = _val.toLocaleString('en');
			}
			return _val;
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
			// console.info(result);
			result.leftWorkdayPercent = 20;

			// console.log(payDay);

			var now = new moment();

			var arrNow = {
				isNextMonth: false,
				nowFormat: now.format(),
				nowYear: now.year(),
				nowMonth: now.month(),
				nowDay: now.day()
			};

			var _leftDay = payDay.payDay - arrNow.nowDay;
			arrNow.isNextMonth = (_leftDay < 0) ? true : false; // 수령일이 지났을 경우

			console.table(arrNow);

			var next = new moment();
			next.add(1, 'month');

			var arrNext = {
				nextFormat: next.format(),
				nextYear: next.year(),
				nextMonth: next.month(),
				nextDay: next.day()
			};

			console.table(arrNext);

			result = {
				earnedToday: 0, // 지난 달, 오늘, 일할 금액 계산 필요
				leftWorkday: 0, //
				leftWorkdayPercent: 0,
				nextPayDay: 0,
				countDown: 0
			};

			console.table(result);

		};

		var setChart = function(){

			optionChart.data.datasets[0].data = [ result.leftWorkdayPercent, 100 - result.leftWorkdayPercent ];

			window.myChart = new Chart(ctx, optionChart);
		};

		var setHandler = function(){
			$app.on('keyup change', 'input', function(e){
				onChange(e);
			});
		};

		var init = function(){

			$settings = $('#settings');
			$settingsForm = $settings.find('input');

			getStorage();
			fillSettingsForm();
			getResult();
			setChart();
			setHandler();

		};

		init();

    };

    appHowMuch();

});
