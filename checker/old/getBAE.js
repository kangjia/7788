//http://developer.baidu.com/bae/invitation
var http = require("http");
var jsdom = require('jsdom').jsdom
, myWindow = jsdom().createWindow()
, $ = require('jQuery')
, jq = require('jQuery').create()
, jQuery = require('jQuery').create(myWindow);

function run(){

    function getHTML(){
        http.get("http://developer.baidu.com/bae/invitation",function(res){
            var pageData = "";
            res.setEncoding('UTF-8');
            res.on('data', function (chunk) {
                pageData += chunk;
            });
          
            res.on('end', function(){
                monitor(pageData);
            });
        });
    }
    function monitor(html){
        var $item = $(html).find("li icon-used");
        console.log($item);
        $item.each(function(idx,val){
            //console.log(this.attr('title'));
            if(this.attr('title') !== ''){
                
            }
        });
    }
    getHTML();

}
run();