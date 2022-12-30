/*  게시판 */
function addCellHeader(table,length){
    if(!table) {
        return false;
    };
	//console.log(length);

    //var table=$(table).eq(length);
    var table=$('.react_table').eq(length),
		trs=table.find('tr'),
		trsChild,
		grid={},
		cells,
		cellHeader='',
		cellConent='',
		confirm=table.find('thead').length;
if(confirm==1){
    for(i=0,cntI=trs.length;i<cntI;i++){
        if(!grid[i]){
            grid[i]={};
        };
        trsChild=trs.eq(i).children();
        cells=0;
        for(j=0,cntJ=trsChild.length;j<cntJ;j++){
            if(trsChild[j].nodeType==1){
                grid[i][cells++]=trsChild[j];
            };
        };
    };
    for(row in grid) {
        if(row==0){
            continue;
        };
        for(cell in grid[row]){
            /*if(cell==0){
                continue;
            };*/
            cellHeader=grid[0][cell].innerHTML+'：';
			//cellConent=grid[row][cell].innerHTML;
            grid[row][cell].setAttribute('data-cell-header',cellHeader);
            //grid[row][cell].setAttribute('data-cell-content',cellConent);
        };
    };
};
};

$(function (){
    var bbsTableRwdb=$('[data-rwdb="yes"]');
	bbsTableRwdb.addClass('react_table')
    if(bbsTableRwdb.length > 0){
        var thisTable=bbsTableRwdb.attr('class').replace(/ /g, '.');
		if(navigator.appVersion.indexOf('MSIE 7.')==-1 && navigator.appVersion.indexOf('MSIE 8.')==-1){
			for(t=0;t<bbsTableRwdb.length;t++){
				addCellHeader('.'+thisTable,t);
			};
		};
    };
});

/* faq */
function faqList(list){
	var faqList=$(list).find('.list > li'),
		faqBtn_open=faqList.find('.bbs_question'),
		faqBtn_close=faqList.find('.close');

	faqBtn_open.on('click',function(){
		var item=$(this).parent('li');

		if(item.hasClass('active')) {
			item.removeClass('active');
			$(this).siblings('div').slideUp();
		}else{
			faqList.not(item).each(function() {
				$(this).removeClass('active');
				$(this).find('.bbs_answer_area').slideUp();
			});
			item.addClass('active');
			$(this).siblings('div').slideDown();
		};
	});
	faqBtn_close.on('click',function(){
		faqList.removeClass('active');
		faqList.find('.bbs_answer_area').slideUp();
	});
};

$(function (){
    var faq=$('[data-list="faq"]');

    if(faq.length>0){
        var list=faq.attr('class').replace(/ /g, '.');
        $(window).on({
            load:function(){
                faqList('.'+list)
            }
        });
    };
});
$(document).ready(function(){
	//bbs_popup
	var focus_button;
	$('.bbs_popup_open').on('click',function(event){
		focus_button=$(event.target);
		$('body').addClass('bbs_popup_active');
	});
	$('.bbs_popup .close').on('click',function(){
		$('body').removeClass('bbs_popup_active');
		focus_button.focus();
	});
});