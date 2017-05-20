var items      = [],
		filtrItems = [],
		scrollItem,
		keys       = {37: 1, 38: 1, 39: 1, 40: 1},
		body = document.body,
		lineElements = 0,
		timer;

function retina() {

	if( 'devicePixelRatio' in window && window.devicePixelRatio != 1 ){

		var imgToReplace = $('img.replace-2x').get();


		for ( var i = 0, l = imgToReplace.length; i < l; i++ ) {

			if ( !$(imgToReplace[i]).hasClass('loaded') ) {
				var src = imgToReplace[i].src;
				src = src.replace(/\.(png|jpg|gif|jpeg)+$/i, '@2x.$1');
				imgToReplace[i].src = src;

				$(imgToReplace[i]).load(function() {
					$(this).addClass('loaded');
				});
			}

		};

	}
}

var scene = document.getElementById('scene');

if (scene) {
	var parallax = new Parallax(scene);
	parallax.enable();
}

var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};


var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);
var sections = document.getElementsByTagName('SECTION');
var NavLiBgColor = document.querySelectorAll("[data-bg-color]");
var navMenu = "nav.main-menu";
var subMenuEl = ".sub-menu";
var body = document.querySelector("body");
var sideCopyright = document.querySelector(".side-copyright");
// Sub menu
var SubMenu = function(subMenuEl) {

	this.classSubMenuOpen = "open-sub";
	this.subMenuEl = document.querySelectorAll(subMenuEl);

};

SubMenu.prototype.openSubMenu = function (el) {

	this.el = el;
	var self = this;

	[].forEach.call(this.subMenuEl, function(e) {
		e.classList.remove(self.classSubMenuOpen);
		e.lastElementChild.style.height = 0 + "px";

	})

	el.classList.add(this.classSubMenuOpen);
	el.lastElementChild.style.height = el.lastElementChild.scrollHeight + "px";


};

SubMenu.prototype.closeSubMenu = function (el) {

	this.el = el;
	this.el.classList.remove(this.classSubMenuOpen);
	this.el.lastElementChild.style.height = 0;

};

SubMenu.prototype.closeAllSubMenu = function () {
	var self = this;

	[].forEach.call(this.subMenuEl, function(e) {

		e.classList.remove(self.classSubMenuOpen);
		e.lastElementChild.style.height = 0;

	});
};

SubMenu.prototype.init = function () {
	var self = this;

	[].forEach.call(this.subMenuEl, function(i) {
		i.addEventListener("click", function(e) {

			if (i.classList.contains("open-sub") && e.target.parentNode.classList.contains(self.classSubMenuOpen)) {
				self.closeSubMenu(i);
				if (document.querySelector(navMenu)) {
					setTimeout(function () {
						mainMenu.buttonsRoot();
					}, 300);
				};
			} else {
				self.openSubMenu(i);

				if (document.querySelector(navMenu)) {
					setTimeout(function () {
						mainMenu.buttonsRoot();
					}, 300);
				};
			}
		})
	})
};

if (document.querySelectorAll(subMenuEl)) {
	var subMenu = new SubMenu(subMenuEl);
	subMenu.init();
}

// Nav main menu
var MainMenu = function(navMenu) {

	this.classOpen = "open";
	this.navMenu = document.querySelector(navMenu);
	var self = this;

	window.addEventListener("resize", function () {
		self.buttonsRoot();
	})
}
MainMenu.prototype.open = function () {

	this.navMenu.classList.add(this.classOpen);

};

MainMenu.prototype.close = function () {

	this.navMenu.classList.remove(this.classOpen);

};

MainMenu.prototype.mouseListen = function() {
	var self = this;
	if (!isTouchDevice) {
		this.navMenu.addEventListener("mouseenter", function (e) {
			self.open();
		});
		this.navMenu.addEventListener("mouseleave", function(e) {
			self.close();
			setTimeout(function () {
				self.buttonsRoot();
			}, 300);
			if (document.querySelector(subMenuEl)) {
				subMenu.closeAllSubMenu();
			}
		})
	}
};

MainMenu.prototype.touchListen = function() {
	var self = this;
	var initialPointX, finalPointX, initialPointY, finalPointY;
	document.addEventListener('touchstart', function(event) {

		initialPointX = event.touches[0].pageX;
		initialPointY = event.touches[0].pageY;

	}, false);

	document.addEventListener('touchmove', function(event) {

		finalPointX = event.touches[0].pageX;
		finalPointY = event.touches[0].pageY;

	}, false);

	document.addEventListener('touchend', function(event) {

		var xAbs = Math.abs(initialPointX - finalPointX);
		var yAbs = Math.abs(initialPointY - finalPointY);

		if (xAbs > 100 && yAbs < 50) {


			if (finalPointX > initialPointX) {

				self.open();
				self.navMenu.firstElementChild.style.overflow = "auto";

			} else {

				self.close();

				if (document.querySelector(subMenuEl)) {
					subMenu.closeAllSubMenu();
				}
			}
		};

	}, false)
};

MainMenu.prototype.buttonUp = function() {
	var wHeight = window.innerHeight;
	var self = this;
	var scrollTopHeight = 0;
	var navHeight = 0;
	var upButton = this.navMenu.querySelector(".up");
	var downButton = this.navMenu.querySelector(".down");
	var navWrapHeight = this.navMenu.offsetHeight;
	var scrollNavUlHeight = 0;

	upButton.addEventListener('click', function() {

		scrollNavUlHeight = self.navMenu.firstElementChild.scrollHeight;

		if (scrollTopHeight > 0) {

			downButton.disabled = false;

			scrollTopHeight -= navWrapHeight;

			$("nav>ul").animate({
				scrollTop: scrollTopHeight
			}, 200);

		} else {

			scrollTopHeight = 0;
			upButton.disabled = true;

		}

	});
	downButton.addEventListener('click', function() {

		scrollNavUlHeight = self.navMenu.firstElementChild.scrollHeight;

		if (scrollTopHeight <= scrollNavUlHeight - navWrapHeight) {

			upButton.disabled = false;

			scrollTopHeight += navWrapHeight;

			$("nav>ul").animate({
				scrollTop: scrollTopHeight
			}, 200);


		} else {

			scrollTopHeight = scrollNavUlHeight - navWrapHeight;
			downButton.disabled = true;

		}

	});
};

MainMenu.prototype.buttonsRoot = function () {
	var wHeight = window.innerHeight;
	var navUlHeight = this.navMenu.querySelector("ul").scrollHeight;
	var upButton = this.navMenu.querySelector(".up");
	var downButton = this.navMenu.querySelector(".down");
	if (!isTouchDevice) {
		if (navUlHeight > wHeight) {

			this.navMenu.classList.remove("hide-buttons");
			this.navMenu.querySelector("ul").style.height = "calc(100% - 60px)";

		} else {

			this.navMenu.classList.add("hide-buttons");
			this.navMenu.querySelector("ul").style.height = "100%";

			upButton.disabled = false;
			downButton.disabled = false;
		}
	} else {
		this.navMenu.classList.add("hide-buttons");
		this.navMenu.querySelector("ul").style.height = "100%";
	}

};

MainMenu.prototype.init = function() {

	this.mouseListen();
	this.touchListen();
	this.buttonsRoot();
	this.buttonUp();
}

if (document.querySelector(navMenu)) {
	var mainMenu = new MainMenu(navMenu);
	mainMenu.init();
};

// Scroll to
var scrollTo = function() {
	if (document.querySelector(navMenu)) {

		var targets = document.querySelector(navMenu).querySelectorAll("a");
		var destination = "";

		[].forEach.call(targets, function(el) {
			el.addEventListener("click", function(e) {

				if ( $('section' + $(e.target).attr('href') ).length ) {
					e.preventDefault();
					destination = document.getElementById(this.hash.slice(1));

					if (destination) {
						$("html, body").animate({ scrollTop: $(destination).offset().top }, 500, function(){
							window.location.hash = $(e.target).attr('href');
						});
					}

				}

			})
		})
	}
};
var selectMode = false;
// convert list menu portfolio to select on small screen
function listMenuToSelect(item) {


	setTimeout(function () {
		var widthScreen = $(window).width();
		var widthItem = item[0].offsetWidth;

		if (selectMode === false) {
			if (widthItem > widthScreen) {

					selectMode = true;
					var selectNode = document.createElement("select");

					$(selectNode).addClass("selectpicker portfolio-ul-to-select");

					item.css({
						display: "none",
					});

					item.after(selectNode);
					item.find($("li")).children().each(function(i, v) {
						$(selectNode).append("<option>" + v.innerText + "</option>");
					});

					$(".portfolio-ul-to-select").selectpicker({
						size: 4,
						mouseWheel:{ preventDefault:true }
					});
					$(".dropdown-menu, html").on("mouseup pointerup",function(e){
						$(".dropdown-menu .mCSB_scrollTools").removeClass("mCSB_scrollTools_onDrag");
					}).on("click",function(e){
						if($(e.target).parents(".mCSB_scrollTools").length || $(".dropdown-menu .mCSB_scrollTools").hasClass("mCSB_scrollTools_onDrag")){
							e.stopPropagation();
						}
					});
					if (!isMobile.any()) {
						$(".bootstrap-select ul.dropdown-menu").mCustomScrollbar();
					}
			}
		}
		if(selectMode === true) {
			$(item).css({
				opacity: 0,
				position: "absolute",
				display: "block",
			});
			if (widthItem < widthScreen){
				$(".portfolio-ul-to-select").remove();
				$(item).css({
					opacity: 1,
					position: "static",
					display: "inline-block",
				});
				selectMode = false;
			}
		}
	}, 100);
}

//replace .social-menu-links from top to contact
function socialMenuLinks(outItem, destItem) {
	var html = $(outItem)[0].innerHTML;
	$(destItem).html(html);
}

function sectionHeight(section) {
	var sections = section;
	for (var i = 0; i < sections.length; i++) {
		sections[i].style.minHeight = window.innerHeight + "px";
	}
}
function bgColorNavDataAttr(NavLiBgColor) {
	var arr = Object.getOwnPropertyNames(NavLiBgColor);
	var newArr = arr.filter(function(number) {
		return number >= 0;
	});
	for (var i = 0; i < newArr.length; i++) {
		// NavLiBgColor[i].style.backgroundColor = NavLiBgColor[i].dataset.bgColor;
		NavLiBgColor[i].style.backgroundColor = NavLiBgColor[i].getAttribute('data-bg-color');
	}
}
var div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

div.style.visibility = 'hidden';

document.body.appendChild(div);

var scrollWidth = div.offsetWidth - div.clientWidth;
document.body.removeChild(div);

function disableScroll(elem) {
	elem.on( 'mousewheel DOMMouseScroll', function ( e ) {
		var e0    = e.originalEvent,
				delta = e0.wheelDelta || -e0.detail;

		this.scrollTop += ( delta < 0 ? 1 : -1 ) * 60;
		e.preventDefault();
	});
}

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
			e.preventDefault();
	e.returnValue = false;
}

function hasWhiteSpace(s) {	
	return /\s/g.test(s);
}

function filterElements() {
	if ( $('.portfolio').length > 0 ) {

		var filterValue,
				elementValue,
				firstItems,
				elementValueArray,
				items        = $('.port-item'),
				left         = [],
				itemsWidth   = 0,
				itemsChange  = [],
				itemK        = 0,
				filteredItemsNumber = [],
				filteredItems = [],
				loadMore      = $('.load-more'),
				clickedButton = loadMore.attr('data-opened-items') * 1,

				openedLines = 2,
				openElements = 0,

				lastLineElements;
				firstItems = items;

		left = [];
		itemK = 0;
		filteredItemsNumber = [];
		filteredItems = [];

		items.each( function(m, elem) {

			elem.classList.remove('top-1', 'top-2', 'top-3', 'top-4');

			if ( $(elem).hasClass('filtered') ) {
				itemK++;
				filteredItemsNumber.push(m);
				filteredItems.push(elem);
			}

		});

		openElements = 0;
		clickedButton = loadMore.attr('data-opened-items');

		lineElements = Math.round( items.length / (items[filteredItemsNumber[0]].offsetWidth * items.length / $('.portfolio')[0].offsetWidth) );

		openElements = lineElements * openedLines;


		if ( filteredItemsNumber.length >= lineElements ) {
			for ( var x = 0; x < lineElements; x++ ) {
				left.push(items[filteredItemsNumber[x]].getBoundingClientRect().left);
			}
		} else {
			for ( var x = 0; x < filteredItemsNumber.length; x++ ) {
				left.push(items[filteredItemsNumber[x]].getBoundingClientRect().left);
			}
		}


		//                                      add not visible items
		var k = 0,
				n = 0;


		if ( filteredItems.length > openElements * clickedButton ) {
			filteredItems.forEach( function(elem, m) {
				if ( m + 1 > openElements * clickedButton ) {
					elem.classList.add('not-visible', 'none', 'hide-item');
					loadMore.removeClass('none');
					setTimeout(function() {
						loadMore.removeClass('hide-item');
					}, 200);
				} else {
					elem.classList.remove('not-visible', 'none', 'hide-item');
					loadMore.addClass('none hide-item');
				}
			});
		}



		for ( var x = 0; x < left.length; x++ ) {
			items.each( function(m, elem) {
				if ( left[x] == elem.getBoundingClientRect().left ) {
					elem.classList.add('top-' + (x+1));
				}
			});
		};

		function filterButtons(button) {
			$(button).on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();

				loadMore.addClass('hide-item none');

				clickedButton = loadMore.attr('data-opened-items');

				if ( $(this).find('a').hasClass('active') ) {
					return
				};

				$(this).parent().find('a').removeClass('active');

				filterValue = $(this).attr('data-filter');
				$(this).find('a').addClass('active');

				items.addClass('hide-item');

				setTimeout(function() {
					items.addClass('none');
				}, 300);

				items.each( function(i, elem) {
					elementValue      = $(elem).attr('data-brand');
					elementValueArray = elementValue.split(' ');

					elem.classList.remove('filtered');

					setTimeout(function() {
						$(elem).removeClass('not-visible top-1 top-2 top-3 top-4');
					}, 300);

					for ( var j = 0; elementValueArray.length > j; j++ ) {

						if ( filterValue == elementValueArray[j] ) {
							setTimeout(function() {
								elem.classList.remove('none');
								elem.classList.add('filtered');
							}, 300);
							setTimeout(function() {
								elem.classList.remove('hide-item');
							}, 500);
						}

					}



					if ( filterValue === '*' ) {
						items.addClass('filtered');
						setTimeout(function() {
							items.removeClass('none');
						}, 300);
						setTimeout(function() {
							items.removeClass('hide-item');
						}, 500);
					}

				});

				setTimeout( function() {
					itemsChange = [];

					for ( var j = 0; j < items.length; j++ ) {

						var elem = items[j];

						if ( !$(elem).hasClass('none') ) {
							itemsChange.push(items[j]);
						}

					}

					if ( itemsChange.length > openElements * clickedButton ) {
						for ( var m = 0; m < itemsChange.length; m++ ) {
							var elem = itemsChange[m];

							if ( m >= lineElements * 2 ) {
								$(elem).addClass('not-visible none hide-item');
							}

							setTimeout(function() {
								if ( !$(elem).hasClass('not-visible') ) {
									$(elem).removeClass('none')
								}
							}, 300);
							setTimeout(function() {
								if ( !$(elem).hasClass('not-visible') ) {
									$(elem).removeClass('hide-item');
								}
							}, 500);

						}

						loadMore.removeClass('none');
						setTimeout(function() {
							loadMore.removeClass('hide-item');
						}, 200);

					} else {
						loadMore.addClass('hide-item none');
					}

					for ( var k = 0; k < lineElements; k++ ) {


						if ( k > itemsChange.length - 1 ) {
							return
						}

						left = itemsChange[k].getBoundingClientRect().left;

						for ( var p = 0 ; p < itemsChange.length; p++ ) {

							var elem = itemsChange[p];

							if ( left == elem.getBoundingClientRect().left ) {
								elem.classList.add('top-' + ( k + 1));
							}

						}

					}
				}, 300);
			});
		}


		setTimeout(function(){
			if ( $('.portfolio-ul-to-select') ) {

					$('.filter-buttons li').each(function(index, element) {
						var listItem = $('.portfolio-ul-to-select .dropdown-menu.inner').find('li')[index];
						$(listItem).attr('data-filter', $(element).attr('data-filter'));
					});

					filterButtons($('.portfolio-ul-to-select .dropdown-menu.inner li'));

			}
		}, false);

		filterButtons($('.filter-buttons li'));

		loadMore.off('click');

		loadMore.on('click', function() {
			clickedButton++;

			$(this).attr('data-opened-items', clickedButton);

			loadMore.addClass('hide-item');
			setTimeout(function() {
				loadMore.addClass('none');
			}, 200);

			var loadedItems = [];

			setTimeout(function() {
				items.each( function(m, elem) {
					if ( $(elem).hasClass('not-visible') ) {
						k++;
						loadedItems.push(elem);
					}

				});

				if ( loadedItems.length > 0 ) {
					var p = 0;

					for ( var l = 0; l < openElements; l++ ) {
						var elem = loadedItems[l];

						$(elem).addClass('hide-item').removeClass('none not-visible');

						setTimeout(function() {
							$(loadedItems[p]).removeClass('hide-item');
							p++;
						}, 300);

					}

					var loadItems = [];

					loadItems = [];


					items.each( function(m, elem) {
						if ( !$(elem).hasClass('hide-item') ) {
							loadItems.push(elem);
						}
					});

					left = [];

					for ( var x = 0; x < lineElements; x++ ) {
						left.push(loadItems[x].getBoundingClientRect().left);
					}

					for ( var x = 0; x < left.length; x++ ) {
						$(loadedItems).each( function(m, item) {
							if ( left[x] == item.getBoundingClientRect().left ) {
								item.classList.add('top-' + (x+1));
							}

						});
					};
					openedLines += 2;
				}
			}, 200);


			setTimeout(function() {
				k = 0;
				items.each( function(m, elem) {
					if ( $(elem).hasClass('not-visible') ) {
						k++;
						loadedItems.push(elem);
					}

				});

				if ( k == 0 ) {
					loadMore.addClass('hide-item');
					setTimeout(function() {
						loadMore.addClass('none');
					}, 200);
				} else {
					loadMore.removeClass('none');
					setTimeout(function() {
						loadMore.removeClass('hide-item');
					}, 200);
				}
			}, 200);
		});

	}

}

function unique(arr) {
	var obj = {};

	for (var i = 0; i < arr.length; i++) {
		var str = arr[i];
		obj[str] = true;
	}

	return Object.keys(obj);
}

function portfolioOpen() {
	var items   = $('.port-item'),
			itemsArr = [],
			portfolio = $('.portfolio'),
			openWrapper = $(".open-item"),

			nextButton = openWrapper.find('.next-item'),
			prevButton = openWrapper.find('.prev-item'),

			openBox     = $('.open-box-content'),
			itemId  = 0,
			posTop  = 0,
			posLeft = 0,
			worksArr = [],

			visible = 0,

			openHeigth,
			openWidth,
			openLeft,

			openedHeight,
			openedWidth,

			scaleX,
			scaleY,
			scaleLeft,
			scaleTop;

	if ( openWidth >= 960 ) {
		openWidth == 960;
	};

	items.each(function(i, elem) {

		$(elem).on('click', function(e) {
			e.preventDefault();

			var clickedButton = $(elem);

			clickedButton.find('div').append('<span class="loader"><span class="loader-inner"></span></span>');

			worksArr = [];


			openHeigth = $(window).height() - 100,
			openWidth  = 10/12*$('.container').width() + 50,


			posTop = elem.getBoundingClientRect().top;
			posLeft = elem.getBoundingClientRect().left + 15;

			openedHeight = clickedButton.find('img').height(),
			openedWidth  = clickedButton.width();

			scaleX    = openedWidth/openWidth,
			scaleY    = openedHeight/openHeigth,
			scaleTop  = posTop - ( openHeigth - openedHeight) / 2,
			scaleLeft = posLeft - ( openWidth - openedWidth ) / 2;


			itemId = $(this).attr('data-id');

			$('.wrapper-port-item').addClass('cliked-item');
			clickedButton.addClass('opened-item');

			$.getJSON('js/portfolioOpen.json', function(data) {
				$.each(data, function(key, val) {
					if ( val.id == itemId ) {

						worksArr = [];

						$.each(val.works, function(keyw, valw) {
							if ( !hasWhiteSpace(valw) ) {
								worksArr += '<img src="'+valw+'" class="replace-2x" alt="work">'
							} else {
								worksArr += '<div class="work-description"><p>'+valw+'</p></div>'
							}
						});

						portfolio.find('.open-box-content').append('<header><p><strong>Client:</strong>'+val.client+'</p><p><strong>Art-director:</strong>'+val.artDir+'</p><p><strong>Front-end:</strong>'+val.frontEnd+'</p><p><strong>Site:</strong><a href="http://'+val.site+'">'+val.site+'</a></header>'+worksArr);

						if (!isMobile.any()) {
							portfolio.find('.open-box').mCustomScrollbar();
							portfolio.find('.open-box button.close').remove();
							portfolio.find('.open-box').append('<button class="close"></button>');
						} else {
							openWrapper.find('button.close').remove();
							$(openWrapper).append('<button class="close"></button>');
						}

						var m = 0;
						portfolio.find('.open-box img').each(function(k, image) {
							$(image).on('load', function() {
								m++;
								if ( m == portfolio.find('.open-box img').length ) {


									openWrapper.addClass('open');

									clickedButton.find('.preloader').remove();

									$("html").css({
										overflowY: "hidden",
										marginRight: scrollWidth + "px",
									})
									if (!isMobile.any()) {
										portfolio.find('.open-box').css({'height': openHeigth, 'width': openWidth,
											'-webkit-transform': 'translate('+scaleLeft+'px, '+scaleTop+'px) scale('+scaleX+','+scaleY+')',
											'-moz-transform': 'translate('+scaleLeft+'px, '+scaleTop+'px) scale('+scaleX+','+scaleY+')',
											'-ms-transform': 'translate('+scaleLeft+'px, '+scaleTop+'px) scale('+scaleX+','+scaleY+')',
											'-o-transform': 'translate('+scaleLeft+'px, '+scaleTop+'px) scale('+scaleX+','+scaleY+')',
											'transform': 'translate('+scaleLeft+'px, '+scaleTop+'px) scale('+scaleX+','+scaleY+')'
										});
										setTimeout(function() {
											portfolio.find('.open-box').css({'left': 0 , 'top': 0,
											'-webkit-transform': 'translate('+ ($(window).width() - openWidth)/2+'px, 100px) scale(1)',
											'-moz-transform': 'translate('+ ($(window).width() - openWidth)/2+'px, 100px) scale(1)',
											'-ms-transform': 'translate('+ ($(window).width() - openWidth)/2+'px, 100px) scale(1)',
											'-o-transform': 'translate('+ ($(window).width() - openWidth)/2+'px, 100px) scale(1)',
											'transform': 'translate('+ ($(window).width() - openWidth)/2+'px, 100px) scale(1)',
											"-moz-transition": ".4s cubic-bezier(0.45, 0.05, 0.55, 0.95)",
											"-o-transition": ".4s cubic-bezier(0.45, 0.05, 0.55, 0.95)",
											"-webkit-transition": ".4s cubic-bezier(0.45, 0.05, 0.55, 0.95)",
											"transition": ".4s cubic-bezier(0.45, 0.05, 0.55, 0.95)",
											"backface-visibility": "hidden",
											"-webkit-backface-visibility": "hidden"});
										}, false);
									}


									scrollItem = document.getElementsByClassName('open-box');

									closePortfolioItem(openWrapper, scaleLeft, scaleTop, scaleX, scaleY, clickedButton);

									setTimeout(function() {
										clickedButton.find('.loader').remove();
									}, 700);

									retina();

								}
							});
						});


					}
				});





			});

			calculateItems();


		});


	});

	function calculateItems() {
		visible = 0;

		itemsArr = [];

		items.each(function(i, elem) {
			if ( elem.classList.contains('filtered') ) {
				itemsArr.push(elem);
				visible++
			}
		});

		$(itemsArr).each(function(k, el) {

			if ( el.classList.contains('opened-item') ) {

				if ( visible == k + 1 ) {
					nextButton.addClass('hide');
					prevButton.removeClass('hide');
				} else if ( k == 0 ) {
					prevButton.addClass('hide');
					nextButton.removeClass('hide');
				} else {
					prevButton.removeClass('hide');
					nextButton.removeClass('hide');
				}
			}
		});

	}

	function nextPrev() {
		posTop = elem.getBoundingClientRect().top;
		posLeft = elem.getBoundingClientRect().left + 15;

		scaleTop  = posTop - ( openHeigth - openedHeight) / 2,
		scaleLeft = posLeft - ( openWidth - openedWidth ) / 2;

		$('.open-item').append('<span class="loader" style="opacity: 0"><span class="loader-inner"></span></span>');
		setTimeout(function(){
			$('.open-item').find('.loader').css({'opacity': 1});
		}, 150);
		$('.open-box-content').css({'opacity': 0});

		$.getJSON('js/portfolioOpen.json', function(data) {
			$.each(data, function(key, val) {
				if ( val.id == itemId ) {

					clickedButton.addClass('opened-item');

					calculateItems();
					worksArr = [];

					$.each(val.works, function(keyw, valw) {
						if ( !hasWhiteSpace(valw) ) {
							worksArr += '<img src="'+valw+'" class="replace-2x" alt="work">'
						} else {
							worksArr += '<div class="work-description"><p>'+valw+'</p></div>'
						}
					});


					portfolio.find('.open-box-content').html('<header><p><strong>Client:</strong>'+val.client+'</p><p><strong>Art-director:</strong>'+val.artDir+'</p><p><strong>Front-end:</strong>'+val.frontEnd+'</p><p><strong>Site:</strong><a href="http://'+val.site+'">'+val.site+'</a></header>'+worksArr);
					if (!isMobile.any()) {
						portfolio.find('.open-box').mCustomScrollbar();
						portfolio.find('.open-box button.close').remove();
						portfolio.find('.open-box').append('<button class="close"></button>');
					}

					var m = 0;
					portfolio.find('.open-box img').each(function(k, image) {
						$(image).on('load', function() {
							m++;
							if ( m == portfolio.find('.open-box img').length ) {

								openWrapper.addClass('open');

								$('.open-box-content').css({'opacity': 1});
								setTimeout(function(){
									$('.open-item').find('.loader').remove();
								}, 200);

								scrollItem = document.getElementsByClassName('open-box');

								closePortfolioItem(openWrapper, scaleLeft, scaleTop, scaleX, scaleY, clickedButton);
							}
						});
					});

					retina();


				}
			});


		});
	}


	nextButton.on('click', function() {
		portfolio.find('.open-box').mCustomScrollbar("destroy");
		openBox.html('');


		$(itemsArr).each(function(k, el) {
			if ( el.classList.contains('opened-item') ) {
				itemId = $(itemsArr[k+1]).attr('data-id');
				clickedButton = $(itemsArr[k+1]);
				elem = itemsArr[k+1];
			}
			el.classList.remove('opened-item');
		});
		nextPrev();

	});

	prevButton.on('click', function() {
		portfolio.find('.open-box').mCustomScrollbar("destroy");
		openBox.html('');


		$(itemsArr).each(function(k, el) {
			if ( el.classList.contains('opened-item') ) {
				itemId = $(itemsArr[k-1]).attr('data-id');
				clickedButton = $(itemsArr[k-1]);
				elem = itemsArr[k-1];
			}
			el.classList.remove('opened-item');
		});

		nextPrev();
	});

}

function closePortfolioItem(openWrapper, scaleLeft, scaleTop, scaleX, scaleY, clickedItem) {

	var closeButton = openWrapper.find('.close');

	closeButton.on('click', function() {
		var box = document.querySelector('.open-item');

		box.classList.remove('open');

		$("html").css({
			overflowY: "auto",
			marginRight: 0,
		})

		$('.portfolio .open-box').css({
			'-webkit-transform': 'translate('+scaleLeft+'px, '+scaleTop+'px) scale('+scaleX+','+scaleY+')',
			'-moz-transform': 'translate('+scaleLeft+'px, '+scaleTop+'px) scale('+scaleX+','+scaleY+')',
			'-ms-transform': 'translate('+scaleLeft+'px, '+scaleTop+'px) scale('+scaleX+','+scaleY+')',
			'-o-transform': 'translate('+scaleLeft+'px, '+scaleTop+'px) scale('+scaleX+','+scaleY+')',
			'transform': 'translate('+scaleLeft+'px, '+scaleTop+'px) scale('+scaleX+','+scaleY+')',
			'opacity': 0
		});

		setTimeout(function() {
			$('.portfolio .open-box').mCustomScrollbar("destroy");
			$('.portfolio .open-box').removeAttr('style');
			$('.portfolio .open-box-content').html('');
			$(openWrapper.find("button.close")).remove();
		}, 450);

		clickedItem.removeClass('opened-item');

		$('.wrapper-port-item').removeClass('cliked-item');
	})
}

function portfolio() {

	var filtrItemsArr = [],
			hoveredClass  = 'hovered-item';
	$.getJSON('js/portfolioClose.json', function(data) {

		var items       = [],
				fieldsArr   = [],
				fieldsLinks = [];

		$.each(data, function(key, val) {
			fieldsArr = [];
			for ( var n = 0; n < val.fields.length; n++ ) {
				fieldsArr.push(val.fields[n].split(' ').join('-'));

				filtrItemsArr.push(val.fields[n].split(' ').join('-'));

				fieldsLinks.push(val.fields[n]);
			}

			items.push('<div class="col-md-3 col-sm-4 col-xs-6 port-item filtered" data-brand="'+fieldsArr.join(' ')+'" data-id="'+val.id+'"><a href="#"><div><img src="'+val.images+'" class="replace-2x" alt="#"></div><span>'+val.title+'</span></a></div>');
		});

		items.push('<div class="load-more-wrapper"><button class="load-more btn btn-white" data-opened-items="1">load more</button></div>')

		filtrItemsArr = unique(filtrItemsArr).sort();
		fieldsLinks   = unique(fieldsLinks).sort()

		for ( var m = 0; m < filtrItemsArr.length; m++ ) {
			filtrItems.push('<li data-filter="'+ filtrItemsArr[m] +'"><a href="#">'+fieldsLinks[m]+'</a></li>');
		}

		$('.filter-buttons').append(filtrItems);
		$('.wrapper-port-item').append(items);

		filterElements();

		var time;

		$('.port-item a').hover(
			function() {
				time = setTimeout(function() {
					$('.wrapper-port-item').addClass(hoveredClass);
				}, 1000);
			},
			function() {
				clearTimeout(time);
				$('.wrapper-port-item').removeClass(hoveredClass);
			}
		);

		portfolioOpen();

	});

}

function accordion() {
	var item            = $('.specialty .item'),
			itemDescription = $('.specialty .description');

	itemDescription.each(function(i, elem) {
		if ( i != 0 ) {
			$(elem).hide();
		} else {
			$(elem).addClass('ac-open');
			$(item[0]).addClass('heading-open');
		}
	});

	item.each(function(i, elem) {

		$(elem).on('click', function() {
			itemDescription.stop().slideUp();
			item.removeClass('heading-open');

			itemDescription.each(function(m, itemDescr) {

				if ( $(itemDescr).attr('data-item') == $(elem).attr('data-item') && !$(itemDescr).hasClass('ac-open') ) {

					$(itemDescr).stop().slideDown().addClass('ac-open');
					$(elem).addClass('heading-open')

				} else {

					$(itemDescr).removeClass('ac-open');

				}
			});
		});
	});

}

function scillProgress() {
	var scillsItem = $('.scills .item'),
			spanNumber = 10,
			activeSpan;

	scillsItem.each(function(i, elem) {
		activeSpan = ( $(elem).attr("data-skill") * spanNumber ) / 100;
		for ( var m = 0; m < activeSpan; m++ ) {
			$(elem).append('<span class="active">');
		}
		for ( var m = 0; m < ( spanNumber - activeSpan) ; m++ ) {
			$(elem).append('<span>');
		}
	});

}


//                                                                        FORMS


function validateEmail(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}

function validateName(name) {
	return /^[A-Za-z\s]+$/.test(name)
}

function formCheck(form) {
	var inputEmail = form.find('input[type="email"]'),
			inputText  = form.find('input[type="text"]'),
			submitBtn  = form.find('button[type="submit"]');

	form.on('submit', function(e) {

		e.preventDefault();

		$.ajax({
			type: 'POST',
			url : 'php/contact.php',
			data: form.serialize(),
			success: function(data){

				form.find('.form-message').html(data).fadeIn();

				form.find('.btn').prop('disabled', true);

				if ($(data).is('.send-true')){
					form.addClass('send');
					inputEmail.parent().removeClass('danger');
					inputText.parent().removeClass('danger');

					setTimeout(function(){
						form.trigger('reset').removeClass('send');

						form.find('.btn').prop('disabled', false);

						form.find('.form-message').fadeOut().delay(500).queue(function(){
							form.find('.form-message').html('').dequeue();
						});
					}, 1500);
				} else {
					inputEmail.parent().addClass('danger');
					inputText.parent().addClass('danger');
					form.find('.btn').prop('disabled', false);
				}
			}
		});

	});

}


var app = {};

app.$ = {
	"sections"	: $("section"),
	"document"	: $(window.document),
	"window"		: $(window)
};

app.scrollWorking = false;


var onScroll = function (event){
	var scrollPos;

	if(!app.scrollWorking){
		app.scrollWorking = true;
		scrollPos = app.$.document.scrollTop();
		setTimeout(function(){
			app.$.sections.each(function (i, elem) {
				var section = $(this),
					windowHeight = app.$.window.height(),
					sectionPos = section.position();

				if ( ( sectionPos.top - windowHeight / 3 ) <= scrollPos && ( sectionPos.top +  section.height() - section.height() / 3 ) >= scrollPos ) {

					$('body').css({
						background: section.data('color')
					});

					$('nav > ul > li').each(function(e, el){

						$(el).removeClass('active');
						if ( !$(el).hasClass('sub-menu') ) {
							if ( $(el).find('a').attr('href').replace('#', '') == section.attr('id') ) {
								$(el).addClass('active');
							}
						}

					});



					if ( scene ) {
						if ( i == 0 ) {
							parallax.enable();
						} else {
							parallax.disable();
						};
					}



					section.find('.bg-image img').css({
						opacity: 1,
						"-moz-transition": ".5s opacity .3s",
						"-o-transition": ".5s opacity .3s",
						"-webkit-transition": ".5s opacity .3s",
						"transition": ".5s opacity .3s"
					});
					return true;
				} else if(sectionPos.top >= scrollPos + windowHeight){
					return false;
				}

				section.find('.bg-image img').css({
					opacity: 0,
					"-moz-transition": "opacity .15s",
					"-o-transition": "opacity .15s",
					"-webkit-transition": "opacity .15s",
					"transition": "opacity .15s"
				});
			});
			app.scrollWorking = false;
		}, false);
	}
}
$(window).on("load", function(e) {
	setTimeout(function(){
	  $('.preloader').fadeOut('slow',function(){$(this).remove();});
	}, 1000);




});

$(document).ready(function() {

	if (isMobile.any()) {
		body.classList.add('touch');
	}

	try {
		scrollTo();
		sectionHeight(sections);
		bgColorNavDataAttr(NavLiBgColor);

	} catch (e) {
		alert(e)
	}

	$("nav").on("touchstart", function(e) {
		if (isMobile.any()) {
			if (!$(this).hasClass("open")) {
				e.preventDefault();
				e.stopPropagation();

				setTimeout(function () {
					$("nav").addClass("open");
				}, false);
			};
		}
	})

	$('.side-copyright').css({'right': -100 * ( $('.side-copyright').width() / 4 ) / $(window).width() + '%'});

	if ($('.selectpicker').length) {
		$('.selectpicker').selectpicker({
			size: 4
		});
		if (!isMobile.any()) {
			$(".bootstrap-select ul.dropdown-menu").mCustomScrollbar();
		}
		$(".dropdown-menu, html").on("mouseup pointerup",function(e){
			$(".dropdown-menu .mCSB_scrollTools").removeClass("mCSB_scrollTools_onDrag");
		}).on("click",function(e){
			if($(e.target).parents(".mCSB_scrollTools").length || $(".dropdown-menu .mCSB_scrollTools").hasClass("mCSB_scrollTools_onDrag")){
				e.stopPropagation();
			}
		});
	};

	if ($(".filter-buttons").length) {
		listMenuToSelect($(".filter-buttons"));
	};

	if ($(".main ul.social-menu-links").length) {
		socialMenuLinks($(".main ul.social-menu-links"), $(".contact ul.social-menu-links"));
	};

	portfolio();

	accordion();

	scillProgress();

	formCheck($('.contact-form'));

	setTimeout(function() {
		retina();
	}, 200);
});



var timerA;

$(window).on('resize', function() {

	if ( !isMobile.any() ) {
		var openWidth  = 10/12*$('.container').width() + 50,
				openHeigth = $(window).height() - 100;

		$('.portfolio').find('.open-box').css({
			'width': openWidth,
			'height': openHeigth,
			'-webkit-transform': 'translate('+ ($(window).width() - openWidth)/2+'px, 100px) scale(1)',
			'-moz-transform': 'translate('+ ($(window).width() - openWidth)/2+'px, 100px) scale(1)',
			'-ms-transform': 'translate('+ ($(window).width() - openWidth)/2+'px, 100px) scale(1)',
			'-o-transform': 'translate('+ ($(window).width() - openWidth)/2+'px, 100px) scale(1)',
			'transform': 'translate('+ ($(window).width() - openWidth)/2+'px, 100px) scale(1)',
		});
	}


	if ($(".filter-buttons").length) {
		listMenuToSelect($(".filter-buttons"));
	};

	clearTimeout( timerA );
	timerA = setTimeout( function () {

		$('.side-copyright').css({'right': -100 * ( $('.side-copyright').width() / 4 ) / $(window).width() + '%'});

		sectionHeight(sections);

		filterElements();

	}, 300);

});

var timer;

$(window).on('scroll', function() {

	clearTimeout(timer);
	onScroll();

});
