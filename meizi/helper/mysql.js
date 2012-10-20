/**
 * File: meizi mysql.js
 * User: kangjia
 * Date: 12-10-20
 */
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
exports.client = client;