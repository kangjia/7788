//http://developer.baidu.com/bae/invitation 
//li class="newbtn"
/*function run(){
    var spider = require("./spider");
    var s = spider();
    s.route("developer.baidu.com","/bae/invitation",function ( window , $ ){
        var $tag = $("li.newbtn");
        $tag.each(function(){
            var isUse = $(this).find("i").attr("title");
            if(isUse !== "已被使用"){
                var num = $(this).find("input").val();
                //console.log(num);
                sendMail(num);
            }else{         
            }
        });
    }).get("http://developer.baidu.com/bae/invitation");
}*/
var $ = require("jquery");
var http = require("http");
function run(){
    $.get("http://developer.baidu.com/bae/invitation",function(data){
        var $tag = $(data).find("li.newbtn");
        $tag.each(function(){
            var isUse = $(this).find("i").attr("title");
            if(isUse !== "已被使用"){
                var num = $(this).find("input").val();
                sendMail(num);
            }else{

            }
        });
    });
};
function sendMail(msg){
    msg = msg ? msg : "test";
    var email = require("mailer");
    email.send({
      host : "smtp.qiye.163.com",              // smtp server hostname
      port : "25",                     // smtp server port
      ssl: false,						// for SSL support - REQUIRES NODE v0.3.x OR HIGHER
      domain : "localhost",            // domain used by client to identify itself to server
      to : "fe@weiyouxi.com",
      from : "jia.kang@weiyouxi.com",
      subject : "BAE",
      body: "http://developer.baidu.com/",
      authentication : "login",        // auth login is supported; anything else is no auth
      username : "jia.kang@weiyouxi.com",        // username
      password : ""         // password
    },
    function(err, result){
      if(err){ console.log(err); }
    });
};

setInterval(run,5000);