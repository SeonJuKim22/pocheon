

jQuery(function(){

    	//lnb_btn
	$('.lnb_btn').on('click',function(event){
		var $target=$(event.target);
		if($target.is('.active_on .lnb_btn')){
				$('#header').removeClass('active_on').find('.lnb_btn').attr('title','메뉴 닫힘');
		}else{
			$('#header').addClass('active_on').find('.lnb_btn').attr('title','메뉴 열림');
		};
	});

	
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
	
	

	



