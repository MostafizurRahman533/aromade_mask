!function($){$.fn._smthScroll=function(t){var n=$.extend(!0,{},{speed:400,animate:"scroll"},t);return this.each(function(){$(this).is("[href^=#]")&&$(this).click(function(t){t.preventDefault();var e=$($(this).attr("href")).offset().top;"scroll"==n.animate?$("body,html").animate({scrollTop:e},{duration:n.speed,easing:"swing"}):"fade"==n.animate&&$("body").animate({opacity:0},{duration:n.speed/2,easing:"swing",complete:function(){$(window).scrollTop(e)}}).animate({opacity:1},{duration:n.speed/2})})})},$.fn._selectLabel=function(t){var n=$.extend(!0,{},{name:"for"},t);return this.each(function(){function t(){e.text(i.find("option:selected").text())}var e=$(this),a=e.attr(n.name),i=$("#"+a);t(),i.on("change",function(){t()})})},$.fn._accordion=function(t){var n=$.extend(!0,{},{animate:"slide",speed:400,classname:{btn:"_acd_btn",contents:"_acd_conts",opend:"_acd_open"}},t);return this.each(function(){var t=$(this),e=t.find("."+n.classname.contents);t.find("."+n.classname.btn).on("click",function(a){a.preventDefault(),"slide"==n.animate?e.slideToggle(n.speed):"fade"==n.animate&&e.fadeToggle(n.speed),t.toggleClass(n.classname.opend)})})},$.fn._fixedScroll=function(t){function n(){e.scrollTop()>=i.start.position?a.addClass(i.start["class"]):a.removeClass(i.start["class"]),e.scrollTop()>=i.end.position?a.addClass(i.end["class"]):a.removeClass(i.end["class"])}var e=$(window),a=$(this),i=$.extend(!0,{},{start:{position:0,"class":"_fixed"},end:{position:function(){return $("body").height()-e.height()}(),"class":"_bottom"}},t),s=i.start.position,o=i.end.position;e.on("resize",function(){s=i.start.position,o=i.end.position,n()}),e.on("scroll",function(){n()})},$.fn._tab1=function(){return this.each(function(){var t=$(this);t.find('._tab_btn a[href^="#"]').on("click",function(n){n.preventDefault();var e=$(this),a=e.closest("._tab_layout"),i=e.attr("href"),s=i.match(/(#)([a-zA-Z]*)(\d*$)/),o=t.find("[id^="+s[2]+"]");o.hide(),t.find(i).show(),a.find("._tab_btn a").removeClass("active"),$(this).toggleClass("active")})})}}(jQuery);