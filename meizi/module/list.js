/**
 * File: meizi list.js
 * User: kangjia
 * Date: 12-10-20
 */
var mysql = require("../helper/mysql");
var extend = require("node.extend");

var List = function(opts){
    this.opts = extend({
        page : 1,
        tag : 1,
        size : 100
    },opts);
};

List.prototype.query =  function(fn){
    var client = mysql.client;
    var tag = this.opts.tag;
    var page = this.opts.page;
    var size = this.opts.size;
    var start = (page - 1) * size;
    var tagMap = require("../global.config").tagMap;
    var sql = "select * from mz_list order by rand() limit " + size;
    if( typeof tagMap[tag+""] !== "undefined" ){
        sql = "select * from mz_list where tag = '"+tagMap[tag+""]+"' limit " + start + ", " + size;
    }
    client.query(sql,function(err,results,filed){ 
        fn.call(this,err,results);
    });
}  


exports.List = List;