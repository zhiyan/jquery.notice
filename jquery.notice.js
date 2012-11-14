//notice class
function Notice( options ){
	var html = "",
		obj,
		that = this,
		container,
		btnHref="",
		classWrap = "notice";
	//provide overlap
	if($(".notice:visible").length){
		$(".notice").remove();
	}
	if(typeof options === "object")
		$.extend(this,options);
	else if(typeof options === "string"){
		this.content = options;
	}
	container = $(this.container);
	classWrap += " "+this["class"] || "";
	//template
	html = '<div class="'+classWrap+'"><div class="inner-top"><h3>'+this.title+'</h3><div class="close"></div></div><div class="inner-middle">'+this.content+'</div><div class="inner-bottom"><div class="notice-btn">';
	//callback
	if( !!this.buttonName && this.buttonDo ){
		if(typeof this.buttonDo === "string")
			btnHref = this.buttonDo;
		html += '<a href="'+btnHref+'" class="inner-btn button-do" style="margin-right:10px;">'+this.buttonName+'</a>';
	}
	if(!this.cancelhide)
	html += '<a href="" class="inner-btn cancel">'+this.cancelName+'</a>';
	html+='</div></div></div>';
	//create obj
	obj = $(html);
	//button callback
	if(typeof this.buttonDo === "function"){
		obj.find(".button-do").click(function(){
			that.buttonDo();
			that.close( obj );
			return false;
		})
	}
	obj.find(".close,.cancel").click(function(){
		that.close( obj );
		if(typeof that.callback === "function"){
			that.callback();
		}		
		return false;
	});
	//free memory
	html=null;
	//add to page
	container.append(obj);
	//obj position
	if( container[0] === document.body){
		that.makeCenter(obj);
	}
	//esc to quit
	if( obj.find(".close,.cancel").length ){
		$doc.bind("keydown",{"obj":obj},that.escQuit);
	}
}
Notice.prototype = {
	"title" : "Notice",
	"content":"",
	"container":document.body,
	"cancelName":"Cancel",
	close:function( obj ){
		obj.remove();
		$doc.unbind("keydown",this.escQuit);
	},
	makeCenter:function( obj ){
		obj.css({
			"position":"absolute",
			"left":"50%",
			"top":$doc.scrollTop()+$win.height()/2,
			"margin-left":parseInt(-obj.width()/2),
			"margin-top":parseInt(-obj.height()/2)
		});
	},
	escQuit:function(e){
		if( +e.keyCode === 27 ){
			e.data.obj.find(".close").trigger("click");
		}
	}
}