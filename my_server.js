var http=require('http');
var fs=require('fs');
var qs=require('querystring');
var mysql=require('mysql');

var server=http.createServer(function (request, response){
	var str='';
	
	request.addListener('data', function (data){
		str+=data;
	});
	request.addListener('end', function (){
		var post=qs.parse(str);
		
		if(request.url.indexOf('?')!=-1)
		{
			var arr=request.url.split('?');
			
			var url=arr[0];
			var get=qs.parse(arr[1]);
		}
		else
		{
			var url=request.url;
			var get={};
		}
		
		if(url=='/pubuliu')
		{
			
			var n=parseInt(get.page);
			
			if(n<1 || isNaN(n))
			{
				n=1;
			}
			
			var pageSize=10;
			var s=(n-1)*pageSize;
			
			var sql="SELECT * FROM pubuliu LIMIT "+s+","+pageSize;
			
			var db=mysql.createConnection({host: 'sqld.duapp.com',port: 4050, user: 'xxx', password: 'xxx', database: 'xxx'});
			db.on('error',function(err) 
				{
      				if (err.errno != 'ECONNRESET') {
        			throw err;
      			} 
      			else 
      			{
        			//do nothing
        			response.write('----数据库错误');
        			response.end();
      			}
  			});
  			
			db.query(sql, function (err, data){
				if(err)
				{
					response.write('{"err": 1, "msg": "数据库出错"}');
					response.end();
				}
				else
				{
					response.write('{"err": 0, "data": '+JSON.stringify(data)+'}');
					response.end();
				}
			});
		}
		else
		{
			fs.readFile('www'+url, function (err, data){
				if(err)
				{
					response.write('404');
				}
				else
				{
					response.write(data);
				}
				response.end();
			});
		}
	});
});

server.listen(18080);
