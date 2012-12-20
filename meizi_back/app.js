var Qing = require("./qing.js").Qing;
var evts = require("events");
var evt = new evts.EventEmitter();
var mongodb = require("mongodb");

//input param
var inputs = [{
    tag : "狗狗",
    c : "wang"
},{
    tag : "猫",
    c : "miao"
},{
    tag : "美女",
    c : "meizhi"
}];
var count = 0;

function saveToMongo(){
    var mongourl = require("./mongoConfig.js").mongourl;

    mongodb.Db.connect(mongourl,function(err,db){
        require("util").log("connect db by" + mongourl);
        for(var j=0; j< inputs.length; j++){
            db.createCollection(inputs[j].c,function(err,coll){
                require("util").log("crate collection "+ coll.collectionName);
            });
        }
        for(var i=0; i< inputs.length; i++){
            var input = inputs[i];
            var qing = new Qing(input);
            qing.on("data.finish",function(){
                count++;
                if(count === inputs.length){
                    require("util").log("close db ...");
                    db.close();
                    process.exit(0);
                }
            });

            qing.on(input.c+".done",function(data){
                require("util").log(data.type+' is ready save. '+ data.seq);
                db.collection(data.c).save(data);
            });
            qing.start();
        }
    });
}

function run(){
    saveToMongo();
}

run();