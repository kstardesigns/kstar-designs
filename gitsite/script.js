// JavaScript Document

$(document).ready(function(){

	
	
	$("#gamingButton").click(function(){
        $(".gaming").css("display", "block");
		 $(".gamingpic").css("display", "block");
	$("#allClasses li:not(.gaming)").css("display", "none");
	$("#pictureArea img:not(.gamingpic)").css("display", "none");
	});
	
	$("#imagingButton").click(function(){
        $(".imaging").css("display", "block");
		$(".imagingpic").css("display", "block");
	$("#allClasses li:not(.imaging)").css("display", "none");
	$("#pictureArea img:not(.imagingpic)").css("display", "none");
	});
	
	$("#digpubButton").click(function(){
        $(".digpub").css("display", "block");
		 $(".digpubpic").css("display", "block");
	$("#allClasses li:not(.digpub)").css("display", "none");
	$("#pictureArea img:not(.digpubpic)").css("display", "none");
	});

	$("#webButton").click(function(){
			$(".web").css("display", "block");
			$(".webpic").css("display", "block");
	$("#allClasses li:not(.web)").css("display", "none");
	$("#pictureArea img:not(.webpic)").css("display", "none");
	});
	
	$("#reproductionButton").click(function(){
        $(".reproduction").css("display", "block");
		$(".reproductionpic").css("display", "block");
	$("#allClasses li:not(.reproduction)").css("display", "none");
	$("#pictureArea img:not(.reproductionpic)").css("display", "none");
	});
	
	$("#lowerButton").click(function(){
        $(".lower").css("display", "block");
	$("#allClasses li:not(.lower)").css("display", "none");
	$("#pictureArea img").css("display", "none");
	});
	
	$("#upperButton").click(function(){
        $(".upper").css("display", "block");
	$("#allClasses li:not(.upper)").css("display", "none");
	$("#pictureArea img").css("display", "none");
	});
	
	$("#reset").click(function(){
        $("#allClasses li").css("display", "block");
	$("#pictureArea img").css("display", "none");
	});
	
	$("#techcover").click(function(){
		$("#techinfo").css("display", "block");
		$("#centerinfo").css("display", "none");
		$("#picachoinfo").css("display", "none");
		$("#unioninfo").css("display", "none");
	});
	
	$("#techacc").click(function(){
		$("#techinfo").css("display", "block");
		$("#centerinfo").css("display", "none");
		$("#picachoinfo").css("display", "none");
		$("#unioninfo").css("display", "none");
	});
	
	$("#centercover").click(function(){
		$("#centerinfo").css("display", "block");
		$("#techinfo").css("display", "none");
		$("#picachoinfo").css("display", "none");
		$("#unioninfo").css("display", "none");
	});
	
	$("#centeracc").click(function(){
		$("#centerinfo").css("display", "block");
		$("#techinfo").css("display", "none");
		$("#picachoinfo").css("display", "none");
		$("#unioninfo").css("display", "none");
	});
	
	$("#picachocover").click(function(){
		$("#picachoinfo").css("display", "block");
		$("#techinfo").css("display", "none");
		$("#centerinfo").css("display", "none");
		$("#unioninfo").css("display", "none");
	});
	
	$("#picachoacc").click(function(){
		$("#picachoinfo").css("display", "block");
		$("#techinfo").css("display", "none");
		$("#centerinfo").css("display", "none");
		$("#unioninfo").css("display", "none");
	});
	
	$("#unioncover").click(function(){
		$("#unioninfo").css("display", "block");
		$("#techinfo").css("display", "none");
		$("#centerinfo").css("display", "none");
		$("#picachoinfo").css("display", "none");
	});
	
	$("#unionacc").click(function(){
		$("#unioninfo").css("display", "block");
		$("#techinfo").css("display", "none");
		$("#centerinfo").css("display", "none");
		$("#picachoinfo").css("display", "none");
	});
	
	
	var video = document.getElementById("balloonVideo");
	var video2 = document.getElementById("latheVideo");
	video.addEventListener("timeupdate", updateProgress, false);
	video2.addEventListener("timeupdate", updateProgress2, false);
	
	
	$("#vid2button").click(function(){
			 $("#balloonVideo").css("display", "none");
			 $("#latheVideo").css("display", "block");
			 $("#videoCaptionText").html('CNC Lathe - M.E.T. Lab at ASU');
			 $("img").css("padding-right", "7px");
			 $("#buttons1").css("display", "none");
			 $("#buttons2").css("display", "block");
			 video.pause();
			 
	});
	
	$("#vid1button").click(function(){
			 $("#latheVideo").css("display", "none");
			 $("#balloonVideo").css("display", "block");
			 $("#videoCaptionText").html('Balloon Bash - Hi-speed at ASU');
			 $("#buttons2").css("display", "none");
			 $("#buttons1").css("display", "block");
			 video2.pause();
			 
	});
	
	$(function(){ /*code inspired from Lynda.com and changed to fit my site's needs*/
	if (!document.createElement('video').canPlayType) {
		$("#videoControls").hide();
		return;
		}
	});
	
	
	$("#play-pause1").bind("click", function(){
		if (video.paused) {
			video.play();
			$(this).html("Pause");
	} else {
		video.pause();
		$(this).html("Play");
		}
	});
	
	$("#play-pause2").bind("click", function(){
		if (video2.paused) {
			video2.play();
			$(this).html("Pause");
	} else {
		video2.pause();
		$(this).html("Play");
		}
	});
	
	
	
	
	function updateProgress() {
	   var currentProgress1 = document.getElementById("currentProgress1");
	   var value = 0;
	   if (video.currentTime > 0) {
		  value = Math.floor((100 / video.duration) * video.currentTime);
	   }
	   currentProgress1.style.width = value + "%";
	}

	function updateProgress2() {
		   var currentProgress2 = document.getElementById("currentProgress2");
		   var value = 0;
		   if (video2.currentTime > 0) {
			  value = Math.floor((100 / video2.duration) * video2.currentTime);
		   }
		   currentProgress2.style.width = value + "%";
		}

		function formatTime(seconds) { /*code inspired from Lynda.com and changed to fit my site's needs*/
			var seconds = Math.round(seconds);
			var minutes = Math.floor(seconds / 60);
			seconds = Math.floor(seconds % 60);
			minutes = (minutes >= 10) ? minutes : "0" + minutes;
			seconds = (seconds >= 10) ? seconds : "0" + seconds;
			return minutes + ":" + seconds;
		}

		$(video).bind("timeupdate", function(){
		$("#currentTime1").html(formatTime(this.currentTime))
			});
		$(video).bind("durationchange", function(){
		$("#duration1").html(formatTime(this.duration))
			});
			
			
			
			$(video2).bind("timeupdate", function(){
		$("#currentTime2").html(formatTime(this.currentTime))
			});
		$(video2).bind("durationchange", function(){
		$("#duration2").html(formatTime(this.duration))
			});

		
	


});
		
		
		
		
		$("form").submit(function(e) {
			e.preventDefault();
			if ($("input[type='checkbox']").is(":checked")) {
				$("#resourcesLinks").text(""); //this will clear out the div from previous request to view resources
				var chosenResources = $("input:checkbox:checked").serializeArray(); 
				$("#resourcesLinks").append("You have indicated an interest in the following resources. Click on the links to learn more. <br/>");
				jQuery.each(chosenResources, function( i, field ) {
					$("#resourcesLinks").append("<br/>" + field.value);
				 });
			} else { 
				$("#resourcesLinks").text(""); //this will clear out the div from previous request to view resources
				alert("You have not chosen any resources. Please select at least one resource.");
			}
			
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
				
				ctx.fillStyle = "rgb(175,175,175)";
				ctx.fillRect(466,305,65,42);
				
				ctx.fillStyle = "rgb(251,228,158)";
				ctx.strokeStyle = "#ffffff";
				ctx.fillRect(690,111,45,20);
				
				
				 }
			}

				
				
				
        }
      }
		
		