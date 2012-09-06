/**
find . -name "*"|egrep '(png$)|(gif$)|(jpg$)'|perl -pi -e 's|^.|http://img.app.wcdn.cn/ops/game/|g'
curl /dev/null -s -m 10 --connect-timeout 15 -w %{http_code}
**/

var evts = require("events");
var url = require("url");
var http = require("http");

var evt = new evts.EventEmitter();


function sysCmd(args){
    //----config start
    var svnpath = "svn://192.168.0.211/"+args.project+"/code/";
    var trunk = svnpath+args.trunk;
    var branch = svnpath+"branches/"+args.branch;
    var mergeCmd = "svn mergeinfo "+trunk+ " " +branch+" --show-revs eligible|wc -l";
    //----config end    

    var sys = require("child_process").exec,
        util = require("util"),
        svn;

    var msg = {ret:"0",msg:"",content:{}};

    var infoCmd = "svn info "+branch +"|wc -l";

    sys(infoCmd , function(error ,stdout , stderr){
        if(!null){
            if(stdout.trim()!=0){
                svn = sys(mergeCmd,function(error, stdout, stderr){
                    if(error!== null){
                        msg = {ret:"0",msg:"error",content:{}};
                    }else{
                        msg = {ret:"1",msg:"",content:stdout};
                    }
                    evt.emit("query.end",msg);
                });               
            }else{
                msg = {ret:"1",msg:"",content:"-1"};
                console.log(msg);
                evt.emit("query.end",msg);
            }
        }
    });

};
function runServer(port){
    port = port || "8999";
    function onRequest(request,response){
        var args = {};
        //args : pro trunk branch
        var temp = request.url;
        temp = url.parse(temp,true);
        temp = temp.query;
        console.log(temp);
        args = temp;

        sysCmd(args);
        evt.on("query.end",function(data){
            response.writeHead("200",{'Content-Type': 'text/plain'});
            response.write(JSON.stringify(data),encoding='utf-8');
            response.end();
        });
    };
    http.createServer(onRequest).listen(port);
}

(function(){
    runServer();
})();