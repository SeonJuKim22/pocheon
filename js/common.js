

jQuery(function(){


    //gnb
	$('.lnb_btn').on('click',function(event){
		var $target=$(event.target);
		if($target.is('.on')){
            $(this).attr("title","메뉴 열기");
			$(this).removeClass('on').parents('#header').find('.gnb').slideUp(300);
		}else{
            $(this).attr("title","메뉴 닫기");
			$(this).addClass('on').parents('#header').find('.gnb').slideDown(300);
		};		
	});
	$(' .gnb .gnb_area  a:last-child').on('focusout',function(event){
		$(this).parents('.gnb').slideUp(300).siblings('button').removeClass('on');
	});
    $('.gnb_list li a').on('click', function(event){
		var $target=$(event.target);
		if($target.is('.on a')){
			return false;
		}else{
			$('.gnb_list li a').parents('li').removeClass('on')
			$(this).parents('li').addClass('on');
		};
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
	
	
	
});



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



