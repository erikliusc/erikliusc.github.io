// JavaScript Document
/*首页的自动播放动画*/
var indexAnimate = {
	onoffAnimate : supportCss3('animation'),
	init:function(){
		this.screenAnimate();

	},
	screenAnimate:function(){//随屏滚动动画
		var oScreenRect = $('div[name="animate-rect"]');
		var aAutoObj = [];
		var aT2 = [];
		var animate = [
			function(){//行一屏动画
				var aLi = oScreenRect.eq(0).find('.animation_tag');
				aLi.each(function(){
					$(this).addClass('animated '+$(this).attr('data-animateName'));
				})
			},
			function(){//二屏动画
				var aLi = oScreenRect.eq(1).find('.animation_tag');
				aLi.each(function(){
					$(this).addClass('animated '+$(this).attr('data-animateName'));
				})
				
				
			},
			function(){//四屏动画
				var aLi = oScreenRect.eq(2).find('.animation_tag');
				aLi.each(function(){
					$(this).addClass('animated '+$(this).attr('data-animateName'));
				})
				
			},
			function(){//三屏动画
				var aLi = oScreenRect.eq(3).find('.animation_tag');
				aLi.each(function(){
					$(this).addClass('animated '+$(this).attr('data-animateName'));
				})
				
		
			},
			function(){//四屏动画
				var aLi = oScreenRect.eq(4).find('.animation_tag');
				aLi.each(function(){
					$(this).addClass('animated '+$(this).attr('data-animateName'));
				})
				
		
			},
			function(){//四屏动画
				var aLi = oScreenRect.eq(5).find('.animation_tag');
				aLi.each(function(){
					$(this).addClass('animated '+$(this).attr('data-animateName'));
				})
				
		
			}
		]
		setTimeout(function(){
		
			oScreenRect.each(function(i){//初始化
			if($(this).offset().top-$(window).scrollTop()<$(window).height()){
				var inum = oScreenRect.index($(this));
				aAutoObj.push($(this));
				animate[inum]&&animate[inum]();
				
			}
			aT2.push($(this).offset().top);
			})
			for(var i=0; i<aAutoObj.length; i++){
				aAutoObj[i].addClass('animateOn');
			}

	
		},300)
		$(window).scroll(function(){
			var inum = MoveNav($(window).scrollTop(),aT2);
			if($(window).scrollTop()/($(document).outerHeight()-$(window).height()-$(window).height()/2)>=0.8){
				oScreenRect.each(function(i){
				if(i>oScreenRect.length-1)return false;
				if(oScreenRect.eq(i).hasClass('animateOn'))return true;
					oScreenRect.eq(i).addClass('animateOn');
					animate[i]&&animate[i]();
				});
			}else{
				if(oScreenRect.eq(inum).hasClass('animateOn'))return false;
				oScreenRect.eq(inum).addClass('animateOn');
				animate[inum]&&animate[inum]();
			}
			
		});
	}
}
indexAnimate.init();

function MoveNav(Scroll,aDlh) {
	var n = aDlh.length;
	var max = 0;
	var min = 0;
	if (Scroll<=0) {
		Scroll = 1;
	}
	if (Scroll>aDlh[n-1]) {
		Scroll = aDlh[n-1];
	}
	for (var i = 0; i<n; i++) {
		max = aDlh[i];
		min = aDlh[i-1];
		if(!min){min=0}
		
		if (Scroll<=max && Scroll>min) {
			return i;
		}
	}
}

function supportCss3(style) { 
	var prefix = ['webkit', 'Moz', 'ms', 'o'], 
	i, 
	humpString = [], 
	htmlStyle = document.documentElement.style, 
	_toHumb = function (string) { 
	return string.replace(/-(\w)/g, function ($0, $1) { 
	return $1.toUpperCase(); 
	}); 
	}; 
	 
	for (i in prefix) 
	humpString.push(_toHumb(prefix[i] + '-' + style)); 
	 
	humpString.push(_toHumb(style)); 
	 
	for (i in humpString) 
	if (humpString[i] in htmlStyle) return true; 
	 
	return false; 
}



//中间banner
(function(e) {
	e.fn.bannerShow = function(c) {
		c = jQuery.extend({
			autotime: 10E3,
			isAuto: true,
			cur: 0,
			timer: null
		},
		c || {});
		return this.each(function() {
			function d(a) {
				var b = e(".sideShow li").eq(a).find("a"); ! b.attr("src") && b.attr("data-src") && b.attr("src", b.attr("data-src"));
				e(".sideShow li").css({
					"z-index": 0
				}).fadeOut(1E3);
				e(".sideShow li").eq(a).css({
					"z-index": 1
				}).fadeIn(1E3)
			}
			
			var circlenum = "<div class='circle'><ul>";
			for(var i=0; i < e(".sideShow li").length; i++) {
				circlenum += "<li></li>";				
			}
			circlenum += "</ul></div>";	
			e("#midBannerShow").append(circlenum);
			if(e(".sideShow li").length == 1) {
				$('.xy_banner .circle').hide();
			}
			d(c.cur);			
			var g = e(".circle", this),
			f = e("li", g);		
			f.first().addClass("on");								
			e(this).click(function() {
				c.isAuto = false
			},
			function() {
				c.isAuto = true
			});
			f.each(function(a, b) {
				e(b).click(function() {
					c.cur = a;						
					f.removeClass().eq(c.cur).addClass("on");					
					d(c.cur)
				})
			});
			c.timer = setInterval(function() {
				if(e(".sideShow li").length == 1) {
					c.isAuto = false;
				}
				if (!c.isAuto) return false;
				c.cur == f.size() - 1 ? c.cur = 0 : c.cur += 1;
				d(c.cur);
				f.removeClass().eq(c.cur).addClass("on")
			},
			c.autotime);
		})
	}
})(jQuery);

$(function() {
	$("#midBannerShow").bannerShow();
	var c = function() {};
});
$("#midBannerShow a").mousemove(function(){
	$(this).stop().animate();
})