	(function(){

		$('.page-loading').html('');
		
		if(videoBackground == 'on') {
				if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				$(".player").hide();
				$.backstretch(slideshowBackgroundURLS, {
		   	    	fade: slideshowFade,
		   	   		duration: slideshowDuration
		   		});
		   		$('.backstretch img').load(function(){
					if(preloader == 'on') {
  							$('.page-loading').delay(1500).fadeOut(1000, function() { animateInStart(); });
					}
					else {
						animateInStart();
					}
				});
			}
			else {
				$(".player").mb_YTPlayer({
					videoURL: videoBackgroundURL,
					containment: 'body',
					autoPlay: true,
					mute: videoMuted,
					startAt:0,
					opacity:1
				});
				$('#bgndVideo').on("YTPStart",function(){
					if(preloader == 'on') {
  							$('.page-loading').delay(1500).fadeOut(1000, function() { animateInStart(); });
					}
					else {
						animateInStart();
					}
				});
				
				if(videoMuted == false) {
					$('.videoMuteButton').show();
				}
			}
		}
		else {
			$.backstretch(slideshowBackgroundURLS, {
		   	    fade: slideshowFade,
		   	    duration: slideshowDuration
		   	});
		   	$('.backstretch img').load(function(){
				if(preloader == 'on') {
  							$('.page-loading').delay(1500).fadeOut(1000, function() { animateInStart(); });
					}
					else {
						//animateInStart();
					}
			});
		}
	})();