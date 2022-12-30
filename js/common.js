// 탭메뉴 공통적으로 사용
function tabOn(tab,num,img){
	var $tab,$tab_btn;
	var tabid=tab,n=num-1,btn_img=img;

	$tab=$(tabid+'> ul > li');
	$tab_btn = $(tabid+'> ul > li > a');
	$tab_btn.siblings().hide();
	$tab.eq(n).addClass('active');
	$tab.eq(n).children('a').siblings().show();

	if(btn_img=='img'){
		var btn=$tab.eq(n).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	};

	$tab_btn.on("click",function(event){
		var realTarget_text=$(this).attr('href'),
			realTarget=realTarget_text.charAt(0);

		if(realTarget!="#"){
			return
		};
		if(btn_img=='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			};
			var active = $(this).parent().attr('class');
			if(active!='active'){
				var btn_img_off=$(this).find('img')[0];
				btn_img_off.src= btn_img_off.src.replace('_off','_on');
			};
		};
		$tab_btn.siblings().hide();
		$tab_btn.parent().removeClass('active');
		$(this).siblings().show();
		$(this).parent().addClass('active');
		event.preventDefault();
	});
};
function tabOrg(tabid,a,img) {
	var $tab, $tab_btn,$obj,$obj_view;
	var tabid = tabid, num = a, btn_img = img;

	$tab = $(tabid+' .tab_item  > li');
	$tab_btn = $(tabid+' .tab_item > li > a');
	$obj = $(tabid+' .tab_obj');
	$obj_view = $(tabid+' .tab_obj.n'+num);
	$tab.eq(num-1).addClass('active');
	$obj_view.show();

	if(btn_img =='img'){
		var btn = $tab.eq(num-1).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	};
	$tab.bind("click",function(event){
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			};
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			};
		};
		var this_eq = $tab.index( $(this) );
		$tab.removeClass('active');
		$tab.eq(this_eq).addClass('active');
		$obj.hide();
		$(tabid+' .tab_obj.n'+(this_eq+1)).show();
		event.preventDefault ();
	});
};

jQuery(function(){
	
	//탭메뉴
	var tab_confirm=$('.tab_menu').hasClass('action');
	if(tab_confirm==true){
		$('.tab_menu.action li').removeClass('on');
		$('.tab_menu.action li').eq(0).addClass('on');
		$('.tab_contents').hide();
		$('.tab_contents').eq(0).show();
	};
	$('.sub_tab_menu .on a').on('click', function(event){
		var $target=$(event.target);

		if($target.is('.active_on')){
			$(this).removeClass('active_on').parents('ul').removeClass('active');
		}else{
			$(this).addClass('active_on').parents('ul').addClass('active');
		};
		return false;
	});
	$('.tab_menu a').on('click', function(event){
		var $target=$(event.target),
			tab=$(this).parents('.tab_menu'),
			nums=$(this).parents('li').index();
		
		if($target.is('.on a')){
			if($target.is('.active_on')){
				$(this).removeClass('active_on').parents('ul').removeClass('active');
			}else{
				$(this).addClass('active_on').parents('ul').addClass('active');
			};
			return false;
		}else{
			tab.find('ul').removeClass('active').find('li').removeClass('on').find('a').removeClass('active_on');
			$(this).parents('li').addClass('on');
			if($target.is('.action a')){
				if($target.is('.tab_contents a')){
					$('.tab_contents').find('li').removeClass('on');
					$('.tab_contents').find('li').eq(0).addClass('on');
				}else{
					$('.tab_contents').hide();
					$('.tab_contents').eq(nums).show();
					return false;
				};				
			}else{
				return true;
			};
		};
	});

	//탭메뉴2
	var tab_confirms=$('div').hasClass('other_tab'),
		other_tab='',
		other_button='';

	if(tab_confirms==true){
		other_tab=$('.other_tab');
		other_button=other_tab.find('.button_area button');
		other_tab.find('.button_area button').removeClass('on');
		other_tab.find('.button_area button').eq(0).addClass('on');
		other_tab.find('.other_contents').hide();
		other_tab.find('.other_contents').eq(0).show();
	};
	$('.other_tab .button_area button').on('click', function(event){
		var $target=$(event.target),
			tab=$(this).parents('.other_tab'),
			nums=$(this).index();
		
		if($target.is('.on')){
			return false;
		}else{
			other_tab.find('.button_area button').removeClass('on');
			$(this).addClass('on');
			other_tab.find('.other_contents').hide();
			other_tab.find('.other_contents').eq(nums).show();
			return false;
		};
	});

	
});


$(document).ready(function(){
	//리사이징 체크를 위한 가로사이즈 
	var loadWidth = window.innerWidth;
	
	/* pc버전 메뉴 제어 
	$('#header').delegate('#gnb > ul > li', 'mouseenter focus', function(){
		var GnbSub = $(this).children('div').innerHeight();
		$('.header_inner').height(106 + GnbSub).addClass('active');
		$('#gnb > ul > li > div').removeClass('active');
		$('#gnb > ul > li > a').removeClass('on');
		$(this).children('a').addClass('on');
		$(this).children('div').addClass('active');
		$('.header_wrap').addClass('active');
		var GnbBtn = $(this).children('div').children('ul').innerHeight();
		$('.header_wrap #gnb .gnb_btn').css('top',106 + GnbBtn);
	}); 

	$('#gnb, .header_wrap').mouseleave(function(){
		$('#gnb > ul > li > a').removeClass('on');
		$('.header_inner').height(106).removeClass('active');
		$('#gnb > ul > li > div').removeClass('active');
		$('.header_wrap').removeClass('active');
		$('.header_wrap #gnb .gnb_btn').css('top',180);
	});

	$('.gnb_btn').focusout(function(){
		$('#gnb > ul > li > a').removeClass('on');
		$('.header_inner').height(106).removeClass('active');
		$('#gnb > ul > li > div').removeClass('active');
		$('.header_wrap').removeClass('active');
		$('.header_wrap #gnb .gnb_btn').css('top',180);
	});

    
*/
	/* //pc버전 메뉴 제어 */

	/* 전체메뉴 열기 */
	$('.all_mn_open').on('click', function(){
		$('.all_menu_wrap').addClass('active');
	}); 
	/* 전체메뉴 닫기 */
	$('.all_mn_close').on('click', function(){
		$('.all_menu_wrap').removeClass('active');
	}); 

	/* 모바일 검색 제어 */
	$('.btn_search_open').on('click', function(){
		$('.header_search').addClass('active');
	}); 
	$('.btn_search_close').on('click', function(){
		$('.header_search').removeClass('active');
	}); 

	/* 간부재실현황 */
	$('.btn_occupancy').on('click', function(){
		$('.quick_pop_area').removeClass('active');
		$('.occupancy_detail').addClass('active');
	}); 
	$('.occ_close').on('click', function(){
		$('.occupancy_detail').removeClass('active');
	}); 
	/* 메뉴설정 */
	$('.btn_setting').on('click', function(){
		$('.quick_pop_area').removeClass('active');
		$('.setting_detail').addClass('active');
	}); 
	$('.btn_setting_close').on('click', function(){
		$('.setting_detail').removeClass('active');
	}); 

	/* 모바일 위로 버튼 */
	$('.btn_top button').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	/* 레이어 팝업 */
	//$(".layer_popup").hide();
	$(".btn_layer").click(function(){
		$('html, body').css({'overflow': 'hidden', 'height': '100%'});
		var el = $(this);
		$(".layer_overlay").show();
		var pop_name = $(this).data('pop_name')
		$("."+ pop_name +"").show();
		$(".layer_wrap").attr("tabindex", "0").focus().css('outline','0');
		el.attr('data-focus','on');
		var pop_height = $("."+ pop_name +" .layer_wrap").outerHeight();
		var pop_width = $("."+ pop_name +" .layer_wrap").outerWidth();
		$("."+ pop_name +" .layer_wrap").css('margin-top','-'+ pop_height/2 +'px').css('margin-left','-'+pop_width/2+'px');
		return false;
	});
	
	$(".layer_popup .btn_pop_close").click(function(){
		$('html, body').css({'overflow': 'auto', 'height': 'auto'});
		$(".layer_popup").removeClass("mini_popup");
		$(".layer_overlay").hide();
		$(".layer_popup").hide();
		$("a[data-focus~=on]").focus();
		$("button[data-focus~=on]").focus();
		window.setTimeout(function(){
			$("a[data-focus~=on]").removeAttr("data-focus");
			$("button[data-focus~=on]").removeAttr("data-focus");
		},500);
		return false;
	});
	
	/* 간부재실현황 부재선택 */
	$(".opp_check input[type=radio]").click(function(){
		if($(this).hasClass('check_abs')){
			$(this).parent().parent().parent().next('.abs_detail').show();	
		}else {
			$(this).parent().parent().parent().next('.abs_detail').hide();
		}
    });

	/* 메인 탭 */
	if(typeof ('.idx_cont_tab') !== "undifined"){
		$('.idx_cont_tab > li > a').on('click', function(){
			if($(this).hasClass('tab_blank')){
				return;
			}else{
				var tab_name = $(this).attr('class');
				$(this).closest('.idx_cont').find('.notice_cont').removeClass('active');
				$(this).closest('.idx_cont').find('.idx_cont_tab > li').removeClass('on');
				$(this).parent('li').addClass('on');
				$('.notice_cont.'+ tab_name +'').addClass('active');
				return false;
			}
			
	
		}); 
	}

	if(loadWidth > 1800 ){
		/* 퀵메뉴 스크롤 반응  */
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#quick_wrap').stop();
				$('#quick_wrap').animate( { "top": "30px" }, 0 );
			}else{
				$('#quick_wrap').stop();
				$('#quick_wrap').animate( { "top": "160px" }, 0 );
			}
		});
	}

	if(loadWidth < 1801 ){
		/* 퀵메뉴 스크롤 반응  */
		$(window).scroll(function () {
			if ($(this).scrollTop() < 104) {
				$('#quick_wrap').stop();
				$('#quick_wrap').animate( { "top": "160px" }, 0 );
			}else{
				$('#quick_wrap').stop();
				$('#quick_wrap').animate( { "top": $(document).scrollTop() + 30 + "px" }, 0 );
			}
		});
	}

	if(loadWidth < 1025 ){
		$('.all_mn_cont > ul > li > a').unbind().bind("click",function(){
			if($(this).hasClass('on')){
				$('.all_mn_cont > ul > li > ul').slideUp();
			}else{
				$('.all_mn_cont > ul > li > a').removeClass('on');
				$('.all_mn_cont > ul > li > ul').slideUp();
				$(this).addClass('on');
				$(this).parent().find('ul').slideDown();
				
			}
			
		}); 
	}

	//======================  리사이즈 별 작동여부 
	$(window).resize(function(){
		//반응시 디바이스width체크 
		var viewWidth = window.innerWidth;
		

		if(viewWidth > 1800 ){
			$('#quick_wrap').animate( { "top": "160px" }, 0 );
			/* 퀵메뉴 스크롤 반응  */
			$(window).scroll(function () {
				if ($(this).scrollTop() > 0) {
				$('#quick_wrap').stop();
				$('#quick_wrap').animate( { "top": "30px" }, 0 );
				}else{
					$('#quick_wrap').stop();
					$('#quick_wrap').animate( { "top": "160px" }, 0 );
				}
			});
		}
		
		if(viewWidth < 1801 ){
			/* 퀵메뉴 스크롤 반응  */
			$(window).scroll(function () {
				if ($(this).scrollTop() < 104) {
					$('#quick_wrap').stop();
					$('#quick_wrap').animate( { "top": "160px" }, 0 );
				}else {
					$('#quick_wrap').stop();
					$('#quick_wrap').animate( { "top": $(document).scrollTop() + 30 + "px" }, 0 );
				}
			});
		}

			//반응시 메뉴가 pc 사이즈 일 경우에는 동작 
			if(viewWidth > 1024 ){
				/* 전체메뉴 제어 */
				$('.all_mn_cont > ul > li > ul').removeAttr("style");
				$('.all_mn_cont > ul > li > a').unbind().bind("click",function(){
					return false;
				}); 

			}

			//반응시 메뉴가 태블릿 및 모바일일 경우
			if(viewWidth < 1025 ){
				/* gnb제어 */
				$('.header_inner').removeClass('active');
				$('#gnb > ul > li > div').removeClass('active');
				$('.header_inner').height(106);
				$('#gnb > ul > li > a').removeClass('on');
				
				$('.quick_pop_area').removeClass('active');

				/* 재실현황 관리 리사이즈 강제 닫기 */
				$(".layer_opp_manager .btn_pop_close").trigger('click');

				/* 전체메뉴 제어 */
				$('.all_mn_cont > ul > li > a').unbind().bind("click",function(){
					if($(this).hasClass('on')){
						$('.all_mn_cont > ul > li > ul').slideUp();
					}else{
						$('.all_mn_cont > ul > li > a').removeClass('on');
						$('.all_mn_cont > ul > li > ul').slideUp();
						$(this).addClass('on');
						$(this).parent().find('ul').slideDown();
						
					}
					

				}); 
				
			}

			if(viewWidth > 767 ){
				$('.header_search').removeClass('active');
			}

	});

});
	
