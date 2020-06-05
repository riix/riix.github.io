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

	function formatNumber(num) {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}

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

		var result = {
			"currentTime": 0,
			"earnedToday": 0,
			"leftWorkday": 0,
			"leftWorkdayPercent": 0,
			"nextPayDay": 0,
			"countDown": 0
		};

		var ctx = document.getElementById('chart-area').getContext('2d'); // 차트 객체

		var setStorage = function(){
			localStorage.setItem('payday', JSON.stringify(payDay));
			console.info(payDay);
		};

		var getStorage = function(){
			var obj = JSON.parse(localStorage.getItem('payday'));
			if (obj !== null) {
				payDay = obj;
				console.log('loaded', payDay);
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

		var onLoad = function(){
			getStorage();
			for (var prop in payDay) {
				if (payDay.hasOwnProperty(prop)) {
					$settings.find('.' + prop).val(payDay[prop]);
				}
			}
		};

		function returnNumberFormat(_val){
			if (_val !== '') {
				var _result = parseInt(_val.replace(/\D/g,''),10);
				return _result;
			}
			return
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

		var setChart = function(){
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

			setChart();
			setHandler();
			onLoad();
		};

		init();

    };

    appHowMuch();

});
