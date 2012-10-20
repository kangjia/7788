var mysql = require("../helper/mysql");
var extend = require("node.extend");

var Detail = function(opts){
    this.opts = extend({
        mzid : 4075659662
    },opts);
};

Detail.prototype.query = function(fn){
    var mzid = this.opts.mzid;
    var sql = "select id , imgsrc from mz_detail where parent = " + mzid;
    var client = mysql.client;
    client.query(sql,function(err,results,filed){
        fn.call(this,err,results);    
    })
}

exports.Detail = Detail;
