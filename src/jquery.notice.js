/*
 * jquery.notice
 * https://github.com/zhiyan/jquery.notice
 *
 * Copyright (c) 2013 zhiyan
 * Licensed under the MIT license.
 */

(function($) {

  var $doc = $(document),
      $win = $(window),
      defaultOptions,
      maskTemplate;

  //default options
  defaultOptions = {
    "class" : "jnotice",
    "type" : "dialog",
    "maskClass" : "jnotice-mask",
    "closeClass" : "jnotice-close",
    "headerClass" : "jnotice-header",
    "footerClass" : "jnotice-footer",
    "contentClass" : "jnotice-content",
    "buttonClassA" : "jnotice-button-a",
    "buttonClassB" : "jnotice-button-b",
    "width": "auto",
    "height":"auto",
    "position":"absolute",
    "esc":true,
    "cancel" : "取消" ,
    "confirm" : "确定"
  };

  // default template
  defaultOptions.template = '<div class="{{class}} {{class}}-{{type}}" style="width:{{width}};height:{{height}};position:{{position}};"><h3 class="{{headerClass}}"><span>{{title}}</span><i class="{{closeClass}}">X</i></h3><div class="{{contentClass}}">{{content}}</div><div class="{{footerClass}}"></div></div>';
  // default foot template
  defaultOptions.buttonTemplate = '<button class="{{class}}-button {{buttonClass}}">{{text}}</button>';
  // mask template
  maskTemplate = '<div class="{{maskClass}}"></div>';


  //notice class
  function Notice(options) {
    var that = this,
        nid = +new Date,
        notice;

    // build notice dom
    notice = $( this.tmpl( options.template, options ) );


    // attribute
    this.options = options;
    this.source = notice;
    this._id = nid;

    // build foot
    this.buttons();

    // close event
    notice.find("."+options.closeClass).on("click",$.proxy(that.close,that));

    // make mask
    this.makeMask();

    $("body").append( notice );

    // position
    this.position();

    // resize window
    $win.on("resize",$.proxy(that.position,that));

    // esc
    if( options.esc ){
      this.esc();
    }

  }

  // prototype
  Notice.prototype = {
    tmpl:function( str, data ){
      $.each( data, function(i,v){
        str = str.replace( new RegExp("{{"+i+"}}","g"), v || "" );
      });
      str = str.replace( /{{[^}]*}}/g, "" );
      return str;
    },
    close: function() {
      this.source.remove();
      this.removeMask();
      if( this.options.esc )
        $doc.off("keydown");
    },
    position:function(){
      var notice = this.source,
          width = notice.width(),
          height = notice.height();

      notice.css({"margin-left":-width/2,"margin-top":-height/2});

      // fix scroll for absolute
      if( notice.css("position") === "absolute" ){
        notice.css({
          "top": $doc.scrollTop() + $win.height() / 2
        });
      }

    },
    makeMask:function(){
      var options = this.options,
          $mask =$("."+options.maskClass), 
          className = options.mask;
      if( !$mask.length ){
        $mask = $( this.tmpl(maskTemplate,{"maskClass":options.maskClass}) );
        $("body").append($mask);
      }else{
        $mask.show();
      }
      this.mask = $mask;
    },
    removeMask:function(){
      this.mask.hide();
    },
    esc:function(){
      var that = this;
      $doc.on("keydown", function(e){
         if (+e.keyCode === 27) { 
            that.close();
         }
      });
    },
    buttons:function(){
      var that = this,
          options = this.options,
          notice = this.source,
          html = "";
      if( !!options.callback ){
        html += this.tmpl( options.buttonTemplate, {"buttonClass":options.buttonClassA,"text":options.confirm || "确定"});
        notice.on("click","."+options.buttonClassA,function(){
          options.callback();
          that.close();
        });
      }
      if( !!options.cancel ){
        html += this.tmpl( options.buttonTemplate, {"buttonClass":options.closeClass,"class":options.class,"text":options.cancel});
      }
      notice.find("."+options.footerClass).append(html);
    }
  };

  // export
  $.notice = function(options) {
    options = $.extend({},defaultOptions,options);
    return new Notice(options);
  };

}(jQuery));