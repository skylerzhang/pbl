define(function(require, exports, module){


    module.exports={
        createPbl:function(json,box_id){
            var aUl=document.getElementById(box_id).children;
            for(var i=0;i<json.data.length;i++){
                var oImg=new Image();

                (function (index){
                    oImg.onload=function (){
                        var oLi=document.createElement('li');

                        oLi.innerHTML='<img src="img/'+json.data[index].src+'" />';

                        oLi.children[0].style.height=300*this.height/this.width+'px';

                        var arr=[];
                        for(var j=0;j<aUl.length;j++){
                            arr[j]=aUl[j];
                        }
                        arr.sort(function (ul1, ul2){
                            return ul1.offsetHeight-ul2.offsetHeight;
                        });
                        arr[0].appendChild(oLi);
                    };
                })(i);

                oImg.src='img/'+json.data[i].src;
            }
        }
    }

});