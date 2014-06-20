var streaks = $("#streaks"),
    demo = $("#demo"),
    width = demo.width(),
    height = demo.height(),
    mainTimeline = new TimelineLite(),
    replay = $("#replay");

CSSPlugin.defaultTransformPerspective = 600;

function getNobleTimeline() {
	var tl = new TimelineLite();
	tl.from(demo, 0.5, {autoAlpha:0})
  	.from(".bars",  1.2, {autoAlpha:0, width:0})
  	.from("#nobleLogo", 0.5, {left:-150, ease:Back.easeOut})
  	.from("#desktop", 0.8, {width:0, ease:Back.easeOut})
  	.from("#presents", 0.5, {marginRight:40, autoAlpha:0})
  	.from("#top .bars", tl.duration()+3, {backgroundPosition:"-150px"}, 0)
  	.from("#bottom .bars", tl.duration(), {backgroundPosition:"150px"}, 0)
  	.add("end", "-=2")
  	.to("#top", 0.4, {top:-250}, "end")
  	.to("#bottom", 0.4, {top:height+50}, "end");
	return tl;
}

function getStreaksTimeline() {
	var tl = new TimelineLite();
	for(var i = 0; i<50; i++){
		var element = $("<div class='streak'></div>").appendTo(streaks);
		TweenLite.set(element, {top:Math.random()*height, left:width});
		tl.to(element, Math.random()*0.5, {left:-50, ease:Linear.easeNone}, Math.random()*3);
	}
	return tl;
}

function getTitlesTimeline(){	
	var tl = new TimelineLite();
	var bottom = 80;
	$(".title").each(function(index,element) {
		tl.set(element, { left:-$(element).width(), top:bottom},0);
		tl.to(element, 2.5, {left:width, ease:SlowMo.ease.config(0.1, 1.2)}, index*0.3);
		tl.to(element, 2.7, {scale:1, opacity:1, ease:SlowMo.ease.config(0.1, 1.2, true)}, index*0.3);
		var position = $(element).position();
  		bottom = position.top + $(element).height();
	})
	TweenLite.set(".title", {scale:0, z:0.1, opacity:0})	
	return tl;
}

function getPoweredByTimeline() {
	var poweredBy = $("#poweredBy");
	var tl = new TimelineLite();
	tl.from(poweredBy, 0.5, {autoAlpha:0, scale:2, ease:Elastic.easeOut})
  	.to(poweredBy.find("div"), 0.4, {width:"100%"})
  	.to(poweredBy,0.8, {rotationX:540, scale:4, top:400, transformOrigin:"top", ease:Back.easeIn}, "fadeOut")
	.to(poweredBy, 0.2, {autoAlpha:0}, "-=0.3");
	return tl;
}

function getEndTimeline() {
	var tl = new TimelineLite(); 
  	tl.from("#gsapLogo", 0.5, {scale:0.5, autoAlpha:0, ease:Back.easeOut})
  	.from("#nobleIcon img", 0.3, {rotationY:90, transformOrigin:"left top -100", autoAlpha:0, ease:Back.esaeOut}, "+=0.8")
	.from("#nobleLockup p", 0.3, {autoAlpha:0, rotationX:90}, "+=0.3")
	.from("#replay", 0.4, {autoAlpha:0, rotation:"360_ccw"}, "+=0.3");
	return tl;
}

//build main timeline
mainTimeline.add(getNobleTimeline(), 0.5);
mainTimeline.add([getStreaksTimeline(), getTitlesTimeline()], "-=1.8");
mainTimeline.add(getPoweredByTimeline());
mainTimeline.add(getEndTimeline(), "-=0.2");

// config replay button
replay.mouseenter(function(){
  TweenLite.to(replay, 0.5, {rotation:"+=360", alpha:1});
});
  
replay.mouseleave(function(){
  TweenLite.to(replay, 0.5, {alpha:0.6});
})

replay.click(function(){
  mainTimeline.play(0.5);
});

