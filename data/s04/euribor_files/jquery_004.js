(function($) {
	jQuery.fn.reverse = Array.prototype.reverse;
	
	var config	= {},
		aux		= {
			setup: function( $thumbs ) {
				aux.saveInitialPosition( $thumbs );
				// set the thumbs to absolute and assign top & left
				$thumbs.each(function(i) {
						var $item 	= $(this),
						set	= Math.ceil( (i + 1) / 5 );	
						$item.css({
							position	: 'absolute',
							left		: $item.data('left') + 'px',
							top			: ( i < 5 ) ? $item.data('top') + 'px' : $item.data('height') + 5 + 'px'
						}).addClass('cr-set-' + set).data( 'set', set );
				});				
			},
			// saves the initial left / top and height of each thumb
			saveInitialPosition: function( $thumbs ) {
				var position = new Array(5);				
				$thumbs.each(function(i) {
					var $item 	= $(this);
					set	= Math.ceil( (i + 1) / 5 ) - 1;	
					if(i < 5)
						position[i] = $item.position().left;
					$item.data({
						left		: ( i < 5 ) ? $item.position().left : position[i-5*set],
						top			: $item.position().top,
						height		: $item.height()
					}).css({
						display : ( i < 5 ) ? 'block' : 'none'	
					});									
				});
			},
			// used when the thumbs are shown, and we click next / previous
			navigateThumbs: function( $el, $navPrev, $navNext, dir ) {
				// maximum possible set
				var maxSet	= Math.ceil( ( config.totalThumbs ) / 5);
				// hide current set of thumbs
				$el.find('div.cr-set-' + config.currentSet).each( function(i){
					$(this).stop().animate({
						top	: $(this).height() + 5 + 'px'
					}, 100, function(){
						if( i === 0 ) {
							// show next set of thumbs
							( dir === 1 ) ? config.currentSet++ : config.currentSet--;
							
							// circular movement
							if( config.currentSet < 1 )
								config.currentSet = maxSet;
							else if( config.currentSet > maxSet )
								config.currentSet = 1;	
							
							if(config.currentSet === 1)
								$navPrev.hide();
							else
								$navPrev.show();
							if(config.currentSet === maxSet)
								$navNext.hide();
							else
								$navNext.show();
							
							// next thumbs to show
							var $nextItems	= $el.find('div.cr-set-' + config.currentSet);
							
							// the animation effect will be different if we click the "previous" button
							if( dir === -1 ) 
								$nextItems = $nextItems.reverse();
							
							$nextItems.each( function(i){
								var $item	= $(this);
								
								setTimeout(function() {
								
									$item.stop().animate({
										top	: '0px'
									}, 150 ).css({
										display: 'block'
									});
								
								}, 50 * i);
							});
						}
					}).css({
						display : 'none'	
					});
				});
			},
			// used when the thumbs are hidden, and we click next / previous
			navigateContent: function( $el, $thumbs, $contentItems, $navPrev, $navNext, dir ) {
				( dir === 1 ) ? config.current++ : config.current--;
				// circular movement
				if( config.current === config.totalThumbs){
					if( config.slideshow )
						config.current = 0;
					else
						config.current = config.totalThumbs;		
				}
				else if( config.current < 0 ){
					if( config.slideshow )
						config.current = config.totalThumbs - 1;
					else
						config.current = 0;	
				}
					
				var $item	= $thumbs.eq( config.current ),
					set	= $item.data('set');
					
				if(config.currentSet !== set){
					aux.navigateThumbs( $el, $navPrev, $navNext, dir );
				}	
				
				aux.selectItem( $item, $thumbs, $contentItems );
			},
			// triggered when clicking a thumb
			selectItem: function( $thumb, $thumbs, $contentItems ) {
					$thumb.siblings().removeClass('cr-selected').end().addClass('cr-selected');
					$contentItems.hide();
					var $item			= $('#' + $thumb.data( 'content' ) );
					
					$item.show();
					
					config.current		= $thumb.index();
					//aux.toggleText( $thumbs );
			},
			// shows / hides the main text of each content item
			toggleText: function( $thumbs ) {
				
				var $thumb			= $thumbs.eq( config.current ),
					$contentItem	= $('#' + $thumb.data( 'content' ) ),
					$itemHeadline	= $contentItem.find('div.cr-content-headline'),
					$itemText		= $contentItem.find('div.cr-content-text');
				
				$itemText.hide();
				
				if( !config.thumbsNav ) {
					var somemargin = 30;
					$itemText.fadeIn(500).css( 'height', config.elH - $itemHeadline.outerHeight( true ) - somemargin ).jScrollPane('destroy').jScrollPane({
						verticalDragMinHeight: 40,
						verticalDragMaxHeight: 40
					}).bind('scroll.crotator', function(e) {
						if(config.slideshow)
							config.slideshow	= false;
					});
				}
				else {
					$itemText.hide();
					$thumbs.parent().show();
				}
			},
			// slideshow function (recursive)
			slideshow: function( $el, $thumbs, $contentItems, $navPrev, $navNext, opts ) {
				if( config.slideshow ) {
					
					if( !config.thumbsNav )
						aux.navigateContent( $el, $thumbs, $navPrev, $navNext, $contentItems, 1 );
					else {
						var idx = config.current + 1;
						if( config.current === config.totalThumbs - 1 )
							idx = 0;
							
						var $item	= $thumbs.eq( idx ),
							set	= $item.data( 'set' );
						
						if( config.slideshowCursor !== set ) {
							config.slideshowCursor = set;
							aux.navigateThumbs( $el, $navPrev, $navNext, 1 );
						}	
						
						aux.selectItem( $item, $thumbs, $contentItems );
					}
					clearTimeout( config.slideshow_time );
					
					config.slideshow_time = setTimeout(function() {
						aux.slideshow( $el, $thumbs, $contentItems, $navPrev, $navNext, opts );
					}, opts.slideshow_interval );
				}
			},
			// show / hide thumbs
			toggleThumbs: function( $el, $thumbs, $navNext, $navPrev, dir, speed ) {
				var navCSS, thumbsCSS;
				
				if( dir === 1 ) {
					config.thumbsNav	= true;
					navCSS 				= { bottom 	: '55px' };
					thumbsCSS			= { top 	: '0px' };
				}
				else {
					config.thumbsNav	= false;
					navCSS 				= { bottom 	: config.elH / 2 + 'px' };
					thumbsCSS			= { top 	: config.thumbH + 5 + 'px' };
				}
				
				$navNext.stop().animate( navCSS, speed );
				$navPrev.stop().animate( navCSS, speed );
				
				$el.find('div.cr-set-' + config.currentSet).stop().animate( thumbsCSS, speed, function() {
					if( dir === -1 )
						$thumbs.parent().hide();
				});
				
				// if hiding the thumbs show current's text otherwise hide it
				aux.toggleText( $thumbs );
			}
		},
		methods = {
			init: function( options ) {
				
				if( this.length ) {
					
					var settings = {
						// slideshow on
						autoplay 			: false,
						// slideshow interval
						slideshow_interval 	: 3000,
						// if true the thumbs will be show initially
						openThumbs			: true,
						// speed that the thumbs are shown / hidden
						toggleThumbsSpeed	: 300
					};
					
					return this.each(function() {
						
						// if options exist, lets merge them with our default settings
						if ( options ) {
							$.extend( settings, options );
						}
						
						var $el 			= $(this),
							// the thumb elements
							$thumbs			= $el.find('div.cr-thumbs > div').show(),
							// the main content elements
							$contentItems	= $el.find('div.cr-content-wrapper > div')
						
						/*
						 * save some values in the config variable
						 */	
						// index of the current item 
						config.current		= 0;
						// thumbsNav indicates if we are currently navigating the thumbs or the main content items 
						// (if the thumbs are shown or not)
						( settings.openThumbs ) ? config.thumbsNav	= true : config.thumbsNav	= false;
						// current set of thumbs being shown:
						// first 4 thumbs will have set = 1
						// next 4 set = 2 and so on
						config.currentSet	= 1;
						// total number of thumbs
						config.totalThumbs	= $thumbs.length;
						// the height of a thumb. We will need this later
						config.thumbH		= $thumbs.height();
						// the height of the main container. We will need this later
						config.elH			= $el.height();
						// indicates if the slideshow is on.
						config.slideshow	= settings.autoplay;
						//indicar si se ha hecho click
						config.clicked = false;				
												
						//navegación
						var $navPrev = $el.find('span.previous');
						var $navNext = $el.find('span.next');
						
						$navPrev.hide();
						
						var $content = $el.find('div.cr-content-wrapper');
						
						// setup. Organize the thumbs.. 
						aux.setup( $thumbs );
						
						// if we don't want the thumbs to be shown,
						// then show the text of the current item
						if( !settings.openThumbs ) {
							$thumbs.parent().hide();
							aux.toggleText( $thumbs );
						}						
						
						$navPrev.bind('click', function(){
							config.slideshow	= false;
							config.clicked = true;
							aux.navigateContent( $el, $thumbs, $contentItems, $navPrev, $navNext, -1 );
						});
						
						$navNext.bind('click.crotator', function(){
							config.slideshow	= false;
							config.clicked = true;
							aux.navigateContent( $el, $thumbs, $contentItems, $navPrev, $navNext, 1 );
						});
						
						$content.bind({
							
								mouseenter: function(){
									if(!config.clicked){
											config.slideshow	= false;
									}
								},
								mouseleave: function(){
									if(!config.clicked){
											config.slideshow	= true;
											if( settings.autoplay )
												config.slideshow_time = setTimeout(function() {
													aux.slideshow( $el, $thumbs, $contentItems, $navPrev, $navNext, settings );
												}, settings.slideshow_interval );
									}
								}
						});
						
						// thumb click event
						$thumbs.bind('click.crotator', function(e) {
							config.slideshow	= false;
							aux.selectItem( $(this), $thumbs, $contentItems );
						});
						
						// slideshow
						if( settings.autoplay ) {
							config.slideshowCursor	= 1;
							 
							config.slideshow_time = setTimeout(function() {
								aux.slideshow( $el, $thumbs, $contentItems, $navPrev, $navNext, settings );
							}, settings.slideshow_interval );
						}
						
					});
				}
			}
		};
	
	$.fn.crotator = function(method) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.crotator' );
		}
	};
	
})(jQuery);