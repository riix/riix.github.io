/**
 * Sample JavaScript code for sheets.spreadsheets.values.get
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */


// https://riix.github.io/blockquote/index.html
// https://console.developers.google.com/apis/dashboard?project=quickstart-1579075226656&hl=ko&pli=1
// https://developers.google.com/sheets/api/reference/rest?apix=true
// https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get?apix_params=%7B%22spreadsheetId%22%3A%221Ba9IBZR7Pb0APDiFl9PMjnzJg4hyPtZOhdrCskddCxM%22%2C%22range%22%3A%22A1%3AD5%22%2C%22dateTimeRenderOption%22%3A%22FORMATTED_STRING%22%2C%22majorDimension%22%3A%22DIMENSION_UNSPECIFIED%22%2C%22valueRenderOption%22%3A%22UNFORMATTED_VALUE%22%7D

var API_KEY = 'AIzaSyAOf9a0vkHOh2leKjSQW1k2gzshSlfVyb0';
var SPREADSHEET_ID = '1Ba9IBZR7Pb0APDiFl9PMjnzJg4hyPtZOhdrCskddCxM';
var CLIENT_ID = '672400523283-tohegrj6rgi41o1kr132v8ic5q90r001.apps.googleusercontent.com';
var GAPI_CLIENT = 'https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest';
var GAPI_SCOPE = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/spreadsheets.readonly';

var idx = 0;
var base = {
    sheetRange: 'A1:D1', // 시트 범위
    data: {}
};

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var gapiUtil = {
    getSheets: function(_id, _callback) { // 기본 시트 정보 구하기
        gapi.client.sheets.spreadsheets.get({
            spreadsheetId: _id
        }).then(function(_response) {
            _callback.call(null, _response);
        }, function(_response) {
            console.log('에러: ' + response.result.error.message);
            _callback.call(null, _response);
        });
    },
    getSheetsValue: function(_id, _callback){ // 시트 값 구하기
        var GAPI_OPTIONS = {
            'spreadsheetId': _id,
            'range': 'A1:D1',
            'dateTimeRenderOption': 'FORMATTED_STRING',
            'majorDimension': 'DIMENSION_UNSPECIFIED',
            'valueRenderOption': 'UNFORMATTED_VALUE'
        };
        GAPI_OPTIONS['range'] = (base.sheetRange !== undefined) ? base.sheetRange : GAPI_OPTIONS['range'];
        var _result = gapi.client.sheets.spreadsheets.values.get(GAPI_OPTIONS)
            .then(function(response) { // Handle the results here (response.result has the parsed body).
                _callback.call(null, response);
            },
            function(err) {
                console.error('실행 에러', err);
            });
        return _result;
    }
};

$(function() {

    var $app = $('#app');

    var getText = function(_arr){
        var _html = [
            '<q>' + _arr[3] + '</q>',
            '<cite>',
            '<span class="name">' + _arr[1] + '</span>,',
            '<span class="author">' + _arr[2] + '</span>',
            '</cite>'
        ];
        _html = _html.join('');
        return _html;
    }

    var run = function(_data) {
        var _idx = getRandomArbitrary(1, _data.length);
        if (idx == _idx) {
            idx = _idx - 1;
            if (idx < 0) {
                idx = _data.length - 1;
            }
        }
        var _active = _data[_idx];
        if (_active == undefined) return false;
        var _isLong = (_active[3].length >= 150); // 150자 이상일 경우
        $app.toggleClass('is-long', _isLong).html(getText(_active));
        $app.splitWords();
    };

    function execute() {
        if (gapi.client.sheets == undefined) {
            alert('please login');
        } else {
            $('#auth').hide();
            $('#run').show().on('click', function(e) {
                run(base.data);
            });
            gapiUtil.getSheetsValue(SPREADSHEET_ID, function(_response){
                base.data = _response.result.values;
                run(base.data);
            });
        }
    }

    function authenticate() {
        return gapi.auth2.getAuthInstance()
        .signIn({
            scope: GAPI_SCOPE
        })
        .then(function() {
            console.log("Sign-in successful");
        },
        function(_err) {
            console.error('로그인 에러', _err);
        });
    }

    function loadClient() {
        gapi.client.setApiKey(API_KEY);
        return gapi.client.load(GAPI_CLIENT)
        .then(function() {
            gapiUtil.getSheets(SPREADSHEET_ID, function(_response){
                _result = _response.result.sheets[0].basicFilter.range.endRowIndex;
                base.sheetRange = 'A1:D' + _result;
                execute();
            });
        },
        function(_err) {
            console.error('API 호출 에러', _err);
        });
    }

    // Make sure the client is loaded and sign-in is complete before calling this method.
    gapi.load('client:auth2', function() {
        gapi.auth2.init({
            client_id: CLIENT_ID
        });
        loadClient();
        //authenticate().then(loadClient);
    });
});
