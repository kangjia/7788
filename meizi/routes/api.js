/**
 * File: meizi meizhi.js
 * User: kangjia
 * Date: 12-10-9
 */
exports.list = function( req , res , next){
    var q = req.query;
    var list = require("../module/list");
    new list.List(q).query(function(err,rows){
        if ( err ){
            next();
        }else{
            res.send(rows);
        }
    });
}
    
exports.detail=function( req , res ,next ){
    var q = req.query;
    var detail = require("../module/detail");
    new detail.Detail(q).query(function(err,rows){
        if ( err ){
            next();
        }else{
            res.send(rows);
        }
    });
}
