define(function(require, exports,module){
    var m=require('pbl_m.js');
    var v=require('pbl_v.js');

    module.exports={
        startPbl:function(n,box_id){
            m.getPage(n,function(json){
                v.createPbl(json,box_id);
            })
        }
    }
});
