define(function(require, exports, module){

    module.exports={
        parseJson:function(str){
            if (window.JSON && JSON.parse){
                return JSON.parse(str);
            }
            else{
                return (new Function('return '+str))();
            }
        }
    };

});