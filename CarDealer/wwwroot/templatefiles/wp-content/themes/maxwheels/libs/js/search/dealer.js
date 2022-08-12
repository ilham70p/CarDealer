(function($) {
    "use strict";	
	
if(typeof(get_strings) !== 'undefined' && get_strings !== null)
{
	if ( $( ".radius-range" ).length )
    {
         $(".radius-range").ionRangeSlider({
			skin: "round",
			onFinish: function (data)
			{
				var sort_by = $("#sort-by").val();
				call_me_search_dealers('',sort_by);
			},
         });
    }
	
/*Selected Loc Levels*/	
$(document.body).on('change', '.loc-check', function () {
	var make_id = $(this).val();
	$('input[name=location]').val(make_id);
	$.post(get_strings.ajax_url, {action: 'mw_get_search_locations',make_id: make_id}).done(function (response)
	{
		if (true === response.success)
		{
			$('.dealers-makes-all').html(response.data.result);
			$('.dealers-makes-all').before(response.data.selected_tag);
		}
		else
		{
			$('.dealers-makes-all').html(response.data.result);
			$('.dealers-makes-all').before(response.data.selected_tag);
		}
	});
	var sort_by = $("#sort-by").val();
	call_me_search_dealers('',sort_by);
});
/*Del Loc Levels*/	
	$(document.body).on('click', '#location-widget .cat-rm-lnk', function () {
	var cat_slug = $(this).attr("data-term-slug");
    var cat_slug_parent = $(this).attr("data-term-parent");
    $('input[name=location]').val(cat_slug_parent);
	$(this).parent('span.cat-tag').fadeOut(1000, function(){});
    $(this).parent('span.cat-tag').nextAll('span').remove();
	$.post(get_strings.ajax_url, {action: 'mw_return_parents_cats',cat_slug:cat_slug,type:'mw-dealer-locations'}).done(function (response)
    {
        if (true === response.success)
        {
            $('.dealers-makes-all').html(response.data.result);
        }
        else
        {
        }
    });
	var sort_by = $("#sort-by").val();
	call_me_search_dealers('',sort_by,cat_slug_parent,'yes');
});
	
	/*Pagination*/
	$(document.body).on('click', '.dealers-search .fetch_result', function () {
        var page_no = $(this).attr("data-page-no");
		var sort_by = $("#sort-by").val();
        $(this).addClass("active");
        $(".fetch_result").not(this).removeClass("active");
		call_me_search_dealers(page_no, sort_by);
	});
	/* Buttons Click*/
	$(document.body).on('click', '.typeahead__button , .mw-price-search, .filter-results ,.sel-class,.my-types', function () {
		var sort_by = $("#sort-by").val();
		call_me_search_dealers('', sort_by);
	});
	
	$(document.body).on('change', '#sort-by', function () {
		var sort_by = $(this).val();
		call_me_search_dealers('', sort_by);
	});
	
	$(document.body).on('click', '#reset_ajax_result', function () {
		$('input[name="by_title"]').val('');
		$('input[name="location"]').val('');
		$('input[name="places_search"]').val('');
		//window.history.pushState('', '', '?' +$("form#mydeal_search").serialize());
		history.replaceState(null, "", location.href.split("?")[0]);
		location.reload(); 
	});
	
	/*Ajax Suggestions*/
	if ($('.for_search_pages ').is('.specific_search'))
    {
        $('.for_search_pages').typeahead({
            minLength: 1,
            hint: true,
            maxItem: 15,
            order: "asc",
            dynamic: true,
            delay: 200,
    		compression: true,
            emptyTemplate: get_strings.no_rest + "{{query}}",
            source: {
                ajax: {type: "GET", url: get_strings.ajax_url, data: {q: '{{query}}', action: 'mw_dealer_search_suggestions' }},
            },
        });
    }


/* Call For Ajax */    
function call_me_search_dealers(page_no ='',sort_by = '',loc='',id_del='')
{
	$('.loaders').show();
	$(".grid.my-dealer-page .apprend-that-data").html('');
	$("#listing_ajax_pagination").html('');
    Pace.restart();
	$.post(get_strings.ajax_url, {action: 'mw_dealer_search', collect_data: $("form#mydeal_search").serialize(),page_no: page_no,sort_by: sort_by,loc: loc,id_del: id_del}).done(function (response)
    {
		 Pace.stop();
		 $('.loaders').hide();
		 if (true === response.success) 
		 {
			$(".filter-sorting-bar .clr-yal").html(response.data.total_results);
			$(".grid.my-dealer-page .apprend-that-data").html(response.data.listings);
			$(".my-filer-tags").html(response.data.fliters);
			$("#listing_ajax_pagination").html(response.data.pagination);
			$('[data-toggle="tooltip"]').tooltip();
			initialiceMasonry();
			window.history.pushState('', '', '?' +$("form#mydeal_search").serialize());
		 }
		 else
		 {
		   $(".grid.my-dealer-page").height();
		   $(".filter-sorting-bar .clr-yal").html(response.data.total_results);
		   $(".my-filer-tags").html(response.data.fliters);
		   $(".grid.my-dealer-page .apprend-that-data").html(response.data.no_result);
		   initialiceMasonry();
		   window.history.pushState('', '', '?' +$("form#mydeal_search").serialize());
		 }
	});
	return false;
}

/* Re-initialize*/
function initialiceMasonry()
{
	var $item = $('.grid');
    $item.imagesLoaded(function () {
		 $item.isotope();
		$item.masonry('reloadItems');
		$item.isotope('destroy');
        $item.isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            layoutMode: 'masonry',
            transitionDuration: '0.7s',
            masonry: {
                columnWidth: '.grid-item'
            }
        });
    });
}


}

})(jQuery);