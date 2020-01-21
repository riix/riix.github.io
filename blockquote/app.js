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
var GAPI_SCOPE = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/spreadsheets.readonly';

var idx = 0;
var base = {};


var doSplit = function() {
    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
    function fadeWords() {
        var $items = $('#app').find('span');
        for (var i = 0; i < $items.length; i++) {
            var $item = $items.eq(i);
            var _delay = 200 + (80 * i);
            $item.css({
                opacity: getRandom(0.5, 1),
                filter: 'blur(0px)',
                transitionDelay: _delay + 'ms'
            });
        }
    }
    function splitWords() {
        let quote = document.querySelector("blockquote q");
        quote.innerText.replace(/(<([^>]+)>)/ig, "");
        quotewords = quote.innerText.split(" "),
            wordCount = quotewords.length;
        quote.innerHTML = "";
        for (let i = 0; i < wordCount; i++) {
            quote.innerHTML += "<span>" + quotewords[i] + "</span>";
            if (i < quotewords.length - 1) {
                quote.innerHTML += " ";
            }
        }
        setTimeout(function(){
            fadeWords();
        }, 10);
    }
    splitWords();
};

$(function() {

    var SPEADSHEET_RANGE = 'A1:D40';

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    
    var run = function() {
        var _idx = getRandomArbitrary(1, base.length);
        if (idx == _idx) {
            idx = _idx - 1;
            if (idx < 0) {
                idx = base.length - 1;
            }
        }
        var _active = base[_idx];
        if (_active == undefined) return false;
        var _html = [
            '<q>' + _active[3] + '</q>',
            '<cite>',
            '<span class="name">' + _active[1] + '</span>,',
            '<span class="author">' + _active[2] + '</span>',
            '</cite>'
        ];
        var _isLong = (_active[3].length >= 150); // 150자 이상일 경우
        $('#app').toggleClass('is-long', _isLong).html(_html.join(''));
        doSplit();
    };

    function execute() {
        if (gapi.client.sheets == undefined) {
            alert('please login');
            return false;
        } else {
            $('#auth').hide();
            $('#run').show().on('click', function(e) {
                run();
            });
        }
        var _result = gapi.client.sheets.spreadsheets.values.get({
                "spreadsheetId": SPREADSHEET_ID,
                "range": SPEADSHEET_RANGE,
                "dateTimeRenderOption": "FORMATTED_STRING",
                "majorDimension": "DIMENSION_UNSPECIFIED",
                "valueRenderOption": "UNFORMATTED_VALUE"
            })
            .then(function(response) { // Handle the results here (response.result has the parsed body).
                // console.log("Response", response);
                // console.log(response.result);
                base = response.result.values;
                run();
            },
            function(err) {
                console.error("Execute error", err);
            });
        return _result;
    }

    function getRow(_callback) { // 마지막행 구하기
        var _endRow = 0;
        gapi.client.sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID
        }).then(function(response) {
            _endRow = response.result.sheets[0].basicFilter.range.endRowIndex;
            console.log('마지막행:' + _endRow);
            SPEADSHEET_RANGE = 'A1:D' + _endRow;
            _callback.call();
        }, function(response) {
            console.log('Error: ' + response.result.error.message);
            _callback.call();
        });
    }

    function authenticate() {
        return gapi.auth2.getAuthInstance()
        .signIn({
            scope: GAPI_SCOPE
        })
        .then(function() {
                console.log("Sign-in successful");
        },
        function(err) {
            console.error("Error signing in", err);
        });
    }

    function loadClient() {
        gapi.client.setApiKey(API_KEY);
        return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest")
            .then(function() {
                    // console.log("GAPI client loaded for API");
                    // execute();
                    getRow(execute);
                },
                function(err) {
                    console.error("Error loading GAPI client for API", err);
                });
    }

    // Make sure the client is loaded and sign-in is complete before calling this method.
    gapi.load("client:auth2", function() {
        gapi.auth2.init({
            client_id: CLIENT_ID
        });
        loadClient();
        // authenticate().then(loadClient);
    });
});
