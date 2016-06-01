// JavaScript Document


	  
$(document).ready(function(){

	//smooth scroll
		$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		  if (target.length) {
			$('html,body').animate({
			  scrollTop: target.offset().top
			}, 1000);
			return false;
		  }
		}
	  });
	});
	
	$("#showhide").click(function(){
		$("#showhide").toggleClass('showsocial hidesocial');
		$("#triangle").toggleClass('triangledown triangleup');
		$("#social").toggleClass('socialmedia socialmedia2');
	});	
	
	
	$("#techcover").click(function(){
		$("#techinfo").css("display", "block");
		$("#centerinfo").css("display", "none");
		$("#picachoinfo").css("display", "none");
		$("#unioninfo").css("display", "none");
	});
	
	$("#menu").click(function(){
		$('#navigation ul').toggle();
		$("#menu").css("margin", "0 auto");
		$("#menu").css("margin-right", "25px");
	});
	
	
	$('#printdesign').hover(
        function() {
            $('#starsimage').attr('src', 'assets/3stars-left.png');
            $('#printdesign').css('color', '#0764a1');
        },
        function() {
            $('#starsimage').attr('src', 'assets/3stars.png');
            $('#printdesign').css('color', 'white');
        }
    );
	
	$('#webdesign').hover(
        function() {
			$('#starsimage').attr('src', 'assets/3stars-center.png');
			$('#webdesign').css('color', '#e18a1a');
           
        },
        function() {
			$('#starsimage').attr('src', 'assets/3stars.png');
			$('#webdesign').css('color', 'white');
           
        }
    );
	
	$('#everything').hover(
        function() {
            $('#starsimage').attr('src', 'assets/3stars-right.png');
            $('#everything').css('color', '#0089bc');
        },
        function() {
            $('#starsimage').attr('src', 'assets/3stars.png');
            $('#everything').css('color', 'white');
        }
    );	
	
	//This animates font size to make current section larger, need to change it so it gets smaller when section is left
	/*
	$('#link1').click(function() {
		$('#link1').animate({ fontSize: "20px" }, 300);
	});
	*/
	
	
	
});

function draw(){
        var canvas = document.getElementById("testingcanvas");
        if (canvas.getContext){
          var ctx = canvas.getContext("2d");
		  
		  loadpic();

			function loadpic()
			{
			  var loadimage = new Image();
			  loadimage.src = 'assets/canvasbg.jpg';
			  loadimage.onload = function(){
				ctx.drawImage(loadimage, 0, 0);
			 
				ctx.fillStyle = "rgb(255,204,51)";
				ctx.strokeStyle = "#7f7f7f";
				ctx.lineWidth = 2;
				ctx.lineJoin = "round";
				
				//techbuilding
				ctx.beginPath();
				ctx.lineTo(130,285);
				ctx.lineTo(130,375);
				ctx.lineTo(235,375);
				ctx.lineTo(235,305);
				ctx.lineTo(165,305);
				ctx.lineTo(165,285);
				ctx.lineTo(130,285);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
				
				var tech = "TECHNOLOGY";
				ctx.fillStyle = "#ffffff";
				ctx.strokeStyle = "#000000";
				ctx.font = "11pt Verdana";
				ctx.fillText(tech, 134,350);
				
				//techbuilding outline
			/*  ctx.strokeStyle = "rgb(0,0,0)";
				ctx.beginPath();
				ctx.lineTo(122,122);
				ctx.lineTo(122,228);
				ctx.lineTo(248,228);
				ctx.lineTo(248,142);
				ctx.lineTo(168,142);
				ctx.lineTo(168,122);
				ctx.lineTo(122,122);
				ctx.closePath();
				ctx.stroke(); */
				
				//union
				ctx.fillStyle = "rgb(255,204,51)";
				ctx.strokeStyle = "#7f7f7f";
				ctx.lineWidth = 2;
				ctx.lineJoin = "round";
				ctx.beginPath();
				ctx.strokeStyle = "#7f7f7f";
				ctx.lineTo(460,40);
				ctx.lineTo(520,40);
				ctx.lineTo(520,35);
				ctx.lineTo(563,35);
				ctx.lineTo(563,80);
				ctx.lineTo(519,80);
				ctx.lineTo(519,100);
				ctx.lineTo(499,100);
				ctx.lineTo(499,96);
				ctx.lineTo(460,96);
				ctx.lineTo(460,40);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
				var union = "UNION";
				ctx.fillStyle = "#ffffff";
				ctx.strokeStyle = "#000000";
				ctx.font = "12pt Verdana";
				ctx.fillText(union, 468,70);
				
				//picacho-peralta
				ctx.fillStyle = "rgb(255,204,51)";
				ctx.strokeStyle = "#7f7f7f";
				ctx.lineWidth = 2;
				ctx.lineJoin = "round";
				ctx.beginPath();
				ctx.strokeStyle = "#7f7f7f";
				ctx.lineTo(210,150);
				ctx.lineTo(265,150);
				ctx.lineTo(265,166);
				ctx.lineTo(275,166);
				ctx.lineTo(275,148);
				ctx.lineTo(287,146);
				ctx.lineTo(292,150);
				ctx.lineTo(335,150);
				ctx.lineTo(335,265);
				ctx.lineTo(320,262);
				ctx.lineTo(317,242);
				ctx.lineTo(272,242);
				ctx.lineTo(272,267);
				ctx.lineTo(205,267);
				ctx.lineTo(205,245);
				ctx.lineTo(195,245);
				ctx.lineTo(193,230);
				ctx.lineTo(275,230);
				ctx.lineTo(275,178);
				ctx.lineTo(265,178);
				ctx.lineTo(265,194);
				ctx.lineTo(210,194);
				ctx.lineTo(210,150);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
				
				var picacho = "PICACHO";
				ctx.fillStyle = "#ffffff";
				ctx.strokeStyle = "#000000";
				ctx.font = "12pt Verdana";
				ctx.fillText(picacho, 208,180);
				
				//center
				ctx.fillStyle = "rgb(255,204,51)";
				ctx.strokeStyle = "#7f7f7f";
				ctx.lineWidth = 2;
				ctx.lineJoin = "round";
				ctx.beginPath();
				ctx.strokeStyle = "#7f7f7f";
				ctx.lineTo(360,40);
				ctx.lineTo(430,40);
				ctx.lineTo(430,50);
				ctx.lineTo(436,50);
				ctx.lineTo(436,70);
				ctx.lineTo(430,70);
				ctx.lineTo(430,88);
				ctx.lineTo(416,88);
				ctx.lineTo(416,108);
				ctx.lineTo(430,108);
				ctx.lineTo(430,120);
				ctx.lineTo(439,120);
				ctx.lineTo(439,135);
				ctx.lineTo(430,135);
				ctx.lineTo(430,160);
				ctx.lineTo(360,160);
				ctx.lineTo(360,150);
				ctx.lineTo(351,150);
				ctx.lineTo(351,135);
				ctx.lineTo(360,135);
				ctx.lineTo(360,108);
				ctx.lineTo(369,108);
				ctx.lineTo(369,88);
				ctx.lineTo(360,88);
				ctx.lineTo(360,70);
				ctx.lineTo(353,70);
				ctx.lineTo(353,56);
				ctx.lineTo(360,56);
				ctx.lineTo(360,40);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
				
				var center = "CENTER";
				ctx.fillStyle = "#ffffff";
				ctx.strokeStyle = "#000000";
				ctx.font = "12pt Verdana";
				ctx.fillText(center, 363,70);
			  //ctx.strokeText(center, 528,150);
				
				 }
			}

				
				
				
        }
      }