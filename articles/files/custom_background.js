function bg_change_background(sel,o){
	jQuery(document).ready(function($) {
		var pos = o.background_position;
		if(pos=='x% y%' || pos=='xpos ypos'){
			pos = o.background_x + ' ' + o.background_y;
		}
		var color = o.background_color;
		if(color=='custom'){
			color = o.background_custom_color;
		}
		var size = o.background_size;
		if(size=='percentage'||size=='length'){
			size = o.background_size_width+' '+o.background_size_height;
		}	
		var img = o.background_image?o.background_image:'';
		img = img==''?'none':'url("'+img+'")';					
		$(sel)
		 .css('background-image', img )
		 .css('background-repeat', o.background_repeat )
		 .css('background-position',pos)
		 .css('background-attachment', o.background_attachment )
		 .css('background-color',color)
		 .css('background-size',size)
		 ;
			
		$(sel).unbind('click').click(function(e){
			if(o.background_url && o.background_url!='' && $(e.target).is(sel)){		
				if( undefined===o.background_target || ''==o.background_target || '_self'==o.background_target){
					window.location.href = o.background_url;
				}else{
					window.open(o.background_url);
				}
			}
		});		 
	});
}

function handle_background_change(sel,index,bg_set){
	jQuery(document).ready(function($) {
		var arr = [];
		$(bg_backgrounds[bg_set]).each(function(i,b){
			if(b.background_selector==sel)
				arr[arr.length]=b;
		});
		index = arr[index]?index:0;
		bg_change_background(sel,arr[index]);
		var interval = arr[index].background_interval?arr[index].background_interval*1000:10000;
		interval = parseInt(interval)==0?10000:parseInt(interval);
		index++;
		if(arr.length>1)
			setTimeout( 'handle_background_change("'+sel+'",'+index+','+bg_set+')' ,interval );
	});
}

function set_first_background(sel,bg_set){
	jQuery(document).ready(function($) {
		var arr = [];
		$(bg_backgrounds[bg_set]).each(function(i,b){
			if(b.background_selector==sel)
				arr[arr.length]=b;
		});
		if(arr.length>0){
			bg_change_background(sel,arr[0]);
			if(arr[0].background_url&&arr[0].background_url!=''){
				$(sel).click(function(e){
					if($(e.target).is(sel))
						window.location.href = arr[0].background_url;
				});
			}
		}
	});
}

function get_images(sel,bg_set){
	var arr = [];
	jQuery(bg_backgrounds[bg_set]).each(function(i,b){
		if(b.background_selector==sel&&b.background_image&&b.background_image!='')
			arr[arr.length]=b.background_image;
	});
	return arr;
}

function bg_scheduled_init(bg_set){
	if(is_cb_admin())return;
	jQuery(document).ready(function($) {
		img_to_div(bg_set);
		if(undefined!=bg_backgrounds[bg_set]){
			$(bg_selectors[bg_set]).each(function(i,sel){
				set_first_background(sel,bg_set);					
			});		
		}
	});
}

function bg_change_init(bg_set){
	if(is_cb_admin())return;
	if(typeof(bg_selectors[bg_set])=='undefined')return;
	jQuery(document).ready(function($) {
		img_to_div(bg_set);
		if('undefined'!=typeof(bg_backgrounds[bg_set])){
			var arr = [];
			$(bg_backgrounds[bg_set]).each(function(i,b){
				if(b.background_image&&b.background_image!='')
					arr[arr.length]=b.background_image;
			});
			if(arr.length>0){
				$.preloadImages(arr);
			}
		}
		$(bg_selectors[bg_set]).each(function(i,sel){handle_background_change(sel,0,bg_set);});
	});
}

function bg_parallax_init(bg_set){
	if(is_cb_admin())return;
	jQuery(document).ready(function($) {
		img_to_div(bg_set);
		$(bg_selectors[bg_set]).each(function(i,sel){
			var id = 'cbg-parallax-'+bg_set+'-'+i;
			var p = $('<div></div>').attr('id',id).addClass('cbg-parallax');
			var url = '';
			$(bg_backgrounds[bg_set]).each(function(i,b){
				if(b.background_selector==sel&&b.background_image&&b.background_image!=''){
				
					$('<div></div>')
						.attr('style','position:absolute;height:'+b.parallax_height+'px;width:'+b.parallax_width+'px;')
						.append('<img>')
						.find('img')
						.attr('src',b.background_image)
						.css('border','none')
						.css('margin-top',b.parallax_top+'px')
						.css('margin-left',b.parallax_left+'px')
						.end()
						.appendTo(p);
					url = b.background_url;
				}
			});

			if(0==$(sel).height() && 'undefined'!=$(sel).attr('rel') && ''!=$(sel).attr('rel') ){
				//attempt to preload on failure to determine height.
				var img = new Image();
				$(img).load( function() {
					$(p).width( $(sel).width() ).height( img.height );
					if(url!=''){
						$('<a></a>').append(p).appendTo(sel).attr('href',url);
					}else{
						$(sel).append(p);
					}
					if('undefined'==typeof($.fn.jparallax)){init_parallax_plugin();}
					$('#'+id).jparallax();  
				});
								
				$(img).attr('src', $(sel).attr('rel') );
				return;
			}
			
			$(p).width( $(sel).width() ).height( $(sel).height() );
			if(url!=''){
				$('<a></a>').append(p).appendTo(sel).attr('href',url);
			}else{
				$(sel).append(p);
			}
			if('undefined'==typeof($.fn.jparallax)){init_parallax_plugin();}
			$('#'+id).jparallax();
		});
	});
}

function bg_stretcher_init(bg_set,settings){
	if(is_cb_admin())return;
	jQuery(document).ready(function($) {
		if(undefined!=bg_backgrounds[bg_set]){
			img_to_div(bg_set);
			var arr = [];
			var nextSlideDelay = null;
			$(bg_backgrounds[bg_set]).each(function(i,b){
				if(null==nextSlideDelay){
					nextSlideDelay = parseInt(b.background_interval)>0? parseInt(b.background_interval)*1000 : null;
				}
				if(b.background_image&&b.background_image!='')
					arr[arr.length]=b.background_image;
			});
			if(arr.length>0){
				$.preloadImages(arr);
			}
			
			$(bg_selectors[bg_set]).each(function(i,sel){
				if(sel=='HTML'){return;}
				settings.selector = sel;
				settings.images = arr;
				$(sel).bgStretcher(settings);	
				
				var url = false;
				if(undefined!=settings.overlay){
					url = settings.overlay;
					if(url=='custom' && ''!=settings.overlay_url){
						url = settings.overlay_url;
					}else if(url!=''){
						url = custback_url + 'css/images/overlays/' + url;
					}else{
						url = false;
					}
				}
			
				if(url && $(sel).find('.bgstretcher').length ){
					$(sel).find('.bgstretcher li')
						.prepend(
							$('<div></div>')
							.addClass('bg-overlay')
						);	
					if(settings.preloadImg){
						$('.bg-overlay').hide().css('background-image','url('+url+')');
					}else{
						$('.bg-overlay').css('background-image','url('+url+')');
					}
				}
				
			});		
		}
	});
}

function img_to_div(bg_set){
	if(typeof(bg_selectors[bg_set])!="undefined"&&bg_selectors[bg_set].length>0){
		jQuery(bg_selectors[bg_set]).each(function(i,sel){
			if(sel=='HTML'){return;}
			jQuery(sel).each(function(j,o){
				if(typeof(o.nodeName)!="undefined"&&o.nodeName.toUpperCase()=='IMG'){
					var id = 'div_img_'+bg_set+'_'+i+'_'+j;
					var d = jQuery('<div></div>')
						.attr('id',id)
						.addClass('div_img')
						.attr('rel',o.src)
						.width( jQuery(o).width() )
						.height( jQuery(o).height() );
					jQuery(o).replaceWith(d);
					bg_selectors[bg_set][i]='#'+id;
					jQuery(bg_backgrounds[bg_set]).each(function(k,b){
						if(b.background_selector==sel){
							bg_backgrounds[bg_set][k].background_selector = '#'+id;
						}
					});
				}
			});
		});
	}
}

function is_cb_admin(){
	try{
	//this not always works due to browser permission.
	if(top.location.href!= window.location.href){
		 if(null!=window.parent.document.getElementById("bg_frame")){
		 	jQuery(document).ready(function($) {
				$('style[rel=custom-backgrounds]').remove();
			});
			return true;
		 }
	}
	}catch(e){}
	return false;
}