/**
 * Sample JavaScript code for sheets.spreadsheets.values.get
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */


// https://riix.github.io/googleApi/test.html?456
// https://console.developers.google.com/apis/dashboard?project=quickstart-1579075226656&hl=ko&pli=1
// https://developers.google.com/sheets/api/reference/rest?apix=true
// https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get?apix_params=%7B%22spreadsheetId%22%3A%221Ba9IBZR7Pb0APDiFl9PMjnzJg4hyPtZOhdrCskddCxM%22%2C%22range%22%3A%22A1%3AD5%22%2C%22dateTimeRenderOption%22%3A%22FORMATTED_STRING%22%2C%22majorDimension%22%3A%22DIMENSION_UNSPECIFIED%22%2C%22valueRenderOption%22%3A%22UNFORMATTED_VALUE%22%7D

var APIKEY = 'AIzaSyAOf9a0vkHOh2leKjSQW1k2gzshSlfVyb0';
var SPREADSHEETID = '1Ba9IBZR7Pb0APDiFl9PMjnzJg4hyPtZOhdrCskddCxM';
var CLIENTID = '672400523283-tohegrj6rgi41o1kr132v8ic5q90r001.apps.googleusercontent.com';
var GAPI_SCOPE = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/spreadsheets.readonly';

var idx = 0;
var base = {};

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var doSplit = function() {
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
        quotewords = document.querySelectorAll("blockquote q span");
        fadeWords(quotewords);
    }
    function fadeWords(quotewords) {
        Array.prototype.forEach.call(quotewords, function(word) {
            let animate = word.animate([{
                opacity: 0,
                filter: "blur(" + getRandom(2, 5) + "px)"
            }, {
                opacity: getRandom(0.5, 1),
                filter: "blur(0px)"
            }], {
                duration: 500,
                delay: getRandom(200, 1000),
                fill: 'forwards'
            })
        })
    }
    splitWords();
};

$(function() {
    // $('#auth').on('click', function(e) {
    //     authenticate().then(loadClient);
    // });
    var run = function() {
        // console.info(base);
        var _idx = getRandomArbitrary(1, base.length);
        if (idx == _idx) {
            idx = _idx - 1;
            if (idx < 0) {
                idx = base.length - 1;
            }
        }
        var _active = base[_idx];
        var _html = [
            '<q>' + _active[3] + '</q>',
            '<cite>',
            '<span class="name">' + _active[1] + '</span>,',
            '<span class="author">' + _active[2] + '</span>',
            '</cite>'
        ];
        $('#app').html(_html.join(''));
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
        return gapi.client.sheets.spreadsheets.values.get({
                "spreadsheetId": SPREADSHEETID,
                "range": "A1:D19",
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
        gapi.client.setApiKey(APIKEY);
        return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest")
            .then(function() {
                    // console.log("GAPI client loaded for API");
                    execute();
                },
                function(err) {
                    console.error("Error loading GAPI client for API", err);
                });
    }

    // Make sure the client is loaded and sign-in is complete before calling this method.
    gapi.load("client:auth2", function() {
        gapi.auth2.init({
            client_id: CLIENTID
        });
        loadClient();
        // authenticate().then(loadClient);
    });
});
