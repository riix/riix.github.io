$(function(){
    var $app = $('#app');
    var $form = $app.find('form');
    var $field = $app.find('input[type="text"]')
    var $sandbox = $('#result');
    var _src = 'http://stg.lghellovision.net/benefits/event/eventDetail.do?Ls_Type=0&Ls_Order=0&Ls_Row=1&Ls_Idx=3302&BN_CATE2=03&BN_CATE3=01&BN_CATE4=00';
    $form.on('submit', function(e){
        e.preventDefault();
        var _src = $field.val();

        _src = 'http://stg.lghellovision.net/benefits/event/eventDetail.do?Ls_Type=0&Ls_Order=0&Ls_Row=1&Ls_Idx=3302&BN_CATE2=03&BN_CATE3=01&BN_CATE4=00';


        // $('<div />').load(_src, function(_response){
        //     console.info(_response);
        // });
    });
    $sandbox.css('border','solid 10px #000');
    $sandbox.load(_src, function(_response){
        console.info(_response);
    });
});
