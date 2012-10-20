/**
 * qingSpider
 * @author kangjia
 */
var $ = require("jquery");
require('date-utils');
var mysql = require("mysql");

var client;
if(!process.env.VCAP_SERVICES){
    client = mysql.createClient({
        user : 'upySePOv0xba9',
        password : 'pHIz9oVvyFugP',
        database : 'd0b87575b416a49ac817eaa3ae92c4ef7',
        port : 10000,
        host : "127.0.0.1"
    });
}else{
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mysqlEnv = env['mysql-5.1'][0];
    client = mysql.createClient({
        user : mysqlEnv.credentials.user,
        password : mysqlEnv.credentials.password,
        database : mysqlEnv.credentials.name,
        host : mysqlEnv.credentials.host,
        port : mysqlEnv.credentials.port
    });
}
var LNUM = 40756590;
var DNUM = 23667;
function list(opts){
    var List =function(opts){
        this.opts = $.extend(opts,{
            url:"http://qing.weibo.com/blog/api/tagresult.php",
            //tags:['校花']
            //tags:['美女','校花','模特','写真','人体艺术','自拍','新娘','短发']
            tags:['美女','校花','模特','写真','自拍','新娘']
        });
    };
    var LP = List.prototype;
    LP.start = function(){
        var tags = this.opts.tags;
        var that = this;      
        tags.forEach(function(tag){
            that._get(tag);
        });
    };
    LP._get = function(t,p){
        var url = this.opts.url;
        if(!p) p =1;
        url = url + "?tag="+t+"&page="+p;
        //console.log(url);
        var that = this;
        $.getJSON(url,function(res){
            var list = res.data.list;
            if(!list.length){
                return false;
            }
            list.forEach(function(item){
                var i = {};
                RNUM ++ ;
                i['id'] = RNUM;
                i['imgsrc'] = $(item).find(".itemInfo a.pic").find("img").attr("src");
                i['title'] = $(item).find(".itemInfo a.pic").attr("title");
                i['author'] = $(item).find(".itemInfo .author .avatar").attr("title");
                i['detail'] = $(item).find(".itemInfo a.pic").attr("href");
                i['tag'] = t;
                i['source'] = 'qing';
                if(!i.imgsrc){
                    i['title'] = $(item).find(".itemInfo a.text").attr("title");
                    i['detail'] = $(item).find(".itemInfo a.text").attr("href");
                }
                //spider detail
                (function(pId,detailUrl,tag){
                    if(!!detailUrl){
                        $.get(detailUrl,function(res){
                            var $imgs = $(res).find(" div.imgArea img.qImg");
                            $.each($imgs,function(i,img){
                                var src = $(img).attr("src");
                                if(!!$(img).attr("real_src")) src = $(img).attr("real_src");
                                DNUM++;
                                //console.log('INSERT INTO mz_detail SET id = '+DNUM+' ,imgsrc = "'+src+'", tag="'+tag+'", parent = '+pId);
                                //console.log(DNUM+"|"+src+"|"+parent);
                                //client.query('INSERT INTO mz_detail SET id = ? , imgsrc = ? , tag =? , parent=?',[DNUM,src,tag,pId]);
                            });
                        });
                    }
                })(i.id,i.detail,t);
                that._write(i);
            });
            p++;
            that._get(t,p);
        });
    };
/*
--list
id imgsrc title author tag source track_date 
--detail
id imgsrc parent 
 */
    LP._write = function(o){
        var dt = new Date().toFormat('YYYY-MM-DD HH24:MI:SS');
        //client.query('INSERT INTO mz_list SET id= ? , imgsrc = ?, title = ?,author = ?, detail = ?, tag = ?, source = ?, track_date = ?', [o.id,o.imgsrc,o.title,o.author,o.detail,o.tag,o.source,dt]);
        //console.log(COUNT+ "|" + o.imgsrc + "|" +o.tag + "|" + o.title + "|" +o.detail);
        //console.log('INSERT INTO mz_list SET id= '+o.id+',imgsrc = "'+o.imgsrc+'", title = "'+o.title+'",author = "'+o.author+'", tag = "'+o.tag+'", source = "'+o.source+'", track_date = "'+dt+'"');
    };
    return new List();
}

// main
list().start();
//client.query('INSERT INTO mz_list SET imgsrc = ?, title = ?,author = ?, detail = ?, tag = ?, source = ?, date = ?',["123","123","123","123","123","123","2012-09-30 00:00:00"]);
