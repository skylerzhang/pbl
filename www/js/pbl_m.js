define(function(require, exports, module){
    var ajax=require('ajax.js').ajax;
    var parseJson=require('common.js').parseJson;

    module.exports={
        getPage:function(n,fnSucc){
            var url='pubuliu?page='+n+'&t='+Math.random();

            ajax(url, function (str){
                var json=parseJson(str);
                if(json.err){
                    alert(json.msg)
                }else{
                    fnSucc && fnSucc(json)
                }
            }, function (){
                alert('有错');
            });
        }
    }



});