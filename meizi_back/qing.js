/**
 * qingSpider
 * opts:{
 *     url:
 *     tag:
 *     c:
 * }
 * @author kangjia
 */
var $ = require("jquery");
var evts = require("events");
var evt = new evts.EventEmitter();
var util = require("util");

var List = function(opts) {
    this.opts = $.extend({
        url: "http://qing.weibo.com/blog/api/tagresult.php",
        tag: '猫',
        c:"miao"
    },opts);
};
util.inherits(List, evts.EventEmitter);
var fn = List.prototype;
fn.start = function() {
    var tag = this.opts.tag;
    this.idx = 1;
    this.wget(tag);
};
fn.wget = function(t, p) {
    var url = this.opts.url;
    if(!p) p = 1;
//    if(p>2){
//        this.emit("data.finish");
//        return false;
//    }
    url = url + "?tag=" + t + "&page=" + p;
    var self = this;

    $.getJSON(url, function(res) {
        require("util").log('get data json by  '+ url);
        var list = res.data.list;
        if(!list.length) {
            require("util").log('finish data json by '+ url);
            self.emit("data.finish");
            return false;
        }
        list.forEach(function(item) {
            //var tTitle = $(item).find(".itemInfo a.text").attr("title");
            var tDetail = $(item).find(".itemInfo a.text").attr("href");
            var pDetail = $(item).find(".itemInfo a.pic").attr("href");
            var detail = tDetail; !! tDetail ? detail = tDetail : !! pDetail ? detail = pDetail : "";
            if( !! tDetail) return false;

            var pTitle = $(item).find(".itemInfo a.pic").attr("title");
            var author = $(item).find(".itemInfo .author .avatar").attr("title");
            var tags = [];
            $(item).find(".itemDesc .tags a").each(function(idx, tag) {
                tags.push($(tag).text());
            });

            //spider detail
            var o = {
                title: !!pTitle?pTitle:"",
                author: !!author?author:"",
                tags: tags,
                type:self.opts.tag,
                c : self.opts.c
            };
            $.get(detail, function(res) {
                var $imgs = $(res).find("div.imgArea img.qImg");
                var images = [];
                $.each($imgs, function(i, img) {
                    var src = $(img).attr("src");
                    if( !! $(img).attr("real_src")) src = $(img).attr("real_src");
                    images.push(src);
                });

                o["images"] = images;
                if(images.length !== 0 ) {
                    o["seq"] = self.idx;
                    self.idx++ ;
                    self.save(o);
                }
            });
        });
        p++;
        self.wget(t, p);
    });
};
fn.save = function(o){
    this.emit(this.opts.c+".done",o);
}


/**
title
auther
tags []
images []
date 
**/
exports.Qing = List;
// main
//list().start();
