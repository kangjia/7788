/**
method:
    render() 
    change()

input:
    opts:
    {
        url:"",
        params:{},
        -debug : boolean,
        -debugData : {},
        render : [function(data)]/function(data),
        *bind : [function()]/function
    }

**/
(function($){
    var Widget = function(){
        this.cache = {};
    };
    Widget.prototype._ajax = function(){
        var that = this;
        var url = this.opts.url;
        var params = this.opts.params;
        var p = $.param(params);
        var debugData = this.opts.debugData;
        if( !that.opts.debug){
            $.getJSON(url,params,function(result){
                $(this).trigger("query.widget",[result]);
                that.cache[url+p] = result;
            });
        }else{
            $(this).trigger("query.widget",[debugData]);
            that.cache[url+p] = debugData;           
        }
    };
    
    Widget.prototype._render = function(){
        var fun = this.opts.render;
        var that = this;
        if(!$.isArray(fun)){
            $(that).unbind("query.widget").bind("query.widget",function(evts,results){
                fun.call(that,results);
            });
        }else{
            $.each(fun,function(idx,val){
                $(that).bind("query.widget",function(evts,results){
                    val.call(that,results);
                });
            })
        }

    };
    Widget.prototype._init = function(opts){
        $.extend({
            debug : false
        },opts);
        this.opts = opts;
    }
    Widget.prototype._change = function(){
        var url = this.opts.url;
        var params = this.opts.params;
        var p = $.param(params);
        if(!this.cache[url+p]){
            this._ajax();
        }else{
            $(this).trigger("query.widget",[this.cache[url+p]]);
        }
    }

    Widget.prototype.change = function(opts){
        this._init(opts);
        this._render();
        this._change();   
    };

    Widget.prototype.render = function(opts){
        this._init(opts);
        this._render();
        this._ajax();
    };

    Widget.prototype.bind = function() {

    };

jQuery.widget = Widget;

})(jQuery);