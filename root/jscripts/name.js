//scripts to move rectangles in zachary and produce the text boxes
var IsAnimating=false;
var IsExpanded=false;
var IsFullyExpanded=false;
var currentId='p';
var timer;
var timer2;

//values 0 topMarginhome 1 marginlefthome 2 height 3 width 4 marginLefttop 5 marginLeftbottom 6 marginleftstart

values = new Array();
values['z'] = new Array(0, -447, 13, 125, -150, 150, -447);
values['h'] = new Array(35, -45, 13, 55, -447, 150, -45);
values['y'] = new Array(103, 357, 13, 72, -447, -150, 357);

$(function(){
	$("#zhome").mouseenter(function(){expandHome('z');});
	$(".ztrigger").mouseenter(function(){clearTimeout(timer2); expandAll('z');});
	$(".ztrigger").mouseleave(function(){collapseShort('z');});
	
	$("#hhome").mouseenter(function(){expandHome('h');});
	$(".htrigger").mouseenter(function(){clearTimeout(timer2); expandAll('h');});
	$(".htrigger").mouseleave(function(){collapseShort('h');});
	
	$("#yhome").mouseenter(function(){expandHome('y');});
	$(".ytrigger").mouseenter(function(){clearTimeout(timer2); expandAll('y');});
	$(".ytrigger").mouseleave(function(){collapseShort('y');});
	
	$("body").mouseenter(function(){clearTimeout(timer);});
	$("body").mouseleave(function(){collapseAll();});
});

function expandHome(id) {
	if(!IsAnimating && !IsExpanded && !IsFullyExpanded) {
	    IsAnimating = true;
	    hideHomes(id);
	    var home = $("#" + id + "home");
		home.animate({width:30}, "fast").
			animate({marginTop:0, height:164}, "fast", function(){
				home.animate({marginLeft:"-475px"}, "medium");
				$("#"+id+"start").show(0).
					animate({marginLeft:"-447px", width:894}, "medium", function(){						
						$("."+id+"thirds").fadeIn("fast", function(){
							currentId=id;
							IsExpanded=true;
							IsAnimating=false;
						});
			});
		});
	}
}

function expandAll(id){
	if(!IsAnimating){
		IsAnimating=true;
		$("#"+id+"up").animate({height:0}, "fast").
			hide(0);
		$("#"+id+"down").animate({height:0, marginTop:164}, "fast").
			hide(0);
		$("#"+id+"top").animate({height:200, marginTop:-200}, "fast");
		$("#"+id+"bottom").animate({height:200}, "fast");
		$("#"+id+"top").animate({width:894, marginLeft:-447}, "fast");
		$("#"+id+"bottom").animate({width:894, marginLeft:-447}, "fast", function(){
			$("."+id+"information").fadeIn("fast", function(){
				IsFullyExpanded=true;
				IsAnimating=false;
			});
		});
	}
}

function collapseHome(id){
	if(!IsAnimating && IsExpanded && !IsFullyExpanded){
		IsAnimating=true;
		$("."+id+"thirds").fadeOut("fast", function(){
			$("#"+id+"start").animate({width:0}, "fast").
				hide(0, function(){					
					showHomes();
					$("#"+id+"home").animate({marginTop:values[id][0], height:values[id][2]}, "fast").
						animate({marginLeft:values[id][1], width:values[id][3]}, "fast", function(){
							$("#"+id+"start").animate({marginLeft:values[id][6]}, 0);
							IsExpanded=false;
							IsAnimating=false;
						});
			});
		});
	}
}

function collapseShort(id){
	if(IsAnimating)
		timer2 = setTimeout(function(){collapseShort(id);}, 500);
	else{
		IsAnimating=true;
		$("."+id+"information").fadeOut("fast");
			//collapse top
			$("#"+id+"top").animate({width:298, marginLeft:values[id][4]}, function(){
				$("#"+id+"top").animate({height:0, marginTop:0}, "fast");
				$("#"+id+"up").show(0).
					animate({height:164}, "fast");
			});
			//collapse bottom
			$("#"+id+"bottom").animate({width:298, marginLeft:values[id][5]}, function(){
				$("#"+id+"bottom").animate({height:0}, "fast");
				$("#"+id+"down").show(0).
					animate({height:164, marginTop:0}, "fast", function(){
						IsFullyExpanded=false;
						IsAnimating=false;
					});
			});
	}
}

function collapseAll(){
	if(IsAnimating){
		timer = setTimeout("collapseAll()", 250);
	}
	else{
		collapseHome(currentId);
	}
}

function hideHomes(id){
	switch(id){
		case 'z': $("#hhome, #yhome").fadeOut("fast"); break;
		case 'h': $("#zhome, #yhome").fadeOut("fast"); break;
		case 'y': $("#hhome, #zhome").fadeOut("fast"); break;
	}
}

function showHomes(){
	$("#zhome, #hhome, #yhome").fadeIn("fast");
}
		