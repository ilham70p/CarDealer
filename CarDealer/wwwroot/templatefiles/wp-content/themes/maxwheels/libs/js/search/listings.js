(function($) {
    "use strict";
    
    
	
if(typeof(get_strings) !== 'undefined' && get_strings !== null)
{	
        
    $('#mw-search-inv').on('keyup keypress', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) { 
        e.preventDefault();
        return false;
      }
    });
    
    
/*$(".for-radius-get").on('click', function () {	
	$(this).buttonLoader('start');
	$(this).attr("disabled", true);
	if ("geolocation" in navigator){ 
		navigator.geolocation.getCurrentPosition(show_location, show_error, {enableHighAccuracy: true}); 
		
	}else{
		notify('info', get_strings.whoops, get_strings.geolocation);
	}
});
function show_location(position)
{
    $('input[name="latitude"]').val(position.coords.latitude);
    $('input[name="longitude"]').val(position.coords.longitude);
    $('.only-for-radius').slideDown('slow');
    $('.sonu-button').buttonLoader('stop');
    $(".sonu-button").attr("disabled", false);
}	    

    //Error Callback
function show_error(error){
   switch(error.code) {
        case error.PERMISSION_DENIED:
			notify('info', get_strings.whoops, get_strings.p_denied);
            break;
        case error.POSITION_UNAVAILABLE:
			notify('info', get_strings.whoops, get_strings.p_unava);
            break;
        case error.TIMEOUT:
			notify('info', get_strings.whoops, get_strings.req_timeout);
            break;
        case error.UNKNOWN_ERROR:
			notify('info', get_strings.whoops, get_strings.unknow_error);
            break;
    }
	$('.sonu-button').buttonLoader('stop');
	$(".sonu-button").attr("disabled", false);
}
 */   
    if ( $( ".radius-range" ).length )
    {
         $(".radius-range").ionRangeSlider({
                skin: "round",
                onFinish: function (data)
                {
                    var sort_by = $("#sort-by").val();
                    call_me_search('',sort_by);
                },
         });
    }
$(document.body).on('change', '.make-check', function () {
        var make_id = $(this).val();
        $('input[name=category]').val(make_id);
        $.post(get_strings.ajax_url, {action: 'mw_get_search_cats',make_id: make_id}).done(function (response)
        {
            if (true === response.success)
            {
                $('.parent-makes-all').html(response.data.result);
                $('.parent-makes-all').before(response.data.selected_tag);
            }
            else
            {
                $('.parent-makes-all').html(response.data.result);
                $('.parent-makes-all').before(response.data.selected_tag);
            }
        });
        var sort_by = $("#sort-by").val();
        call_me_search('',sort_by);
	    //custom fields
		$.post(get_strings.ajax_url,{action : 'mw_get_custom', cat_parent:make_id, is_search:1}).done( function(response) 
		{
			$('.on-mw-request').css("display", "block");
			$('.load-acf-custom').LoadingOverlay("show");
			if (true === response.success)
			{
				$('.load-acf-custom').LoadingOverlay("hide");
				$('#dynamic-custom-fields-search').html(response.data.fields);
				if ($( ".custom-fields-theme-selects" ).length > 0) {$('.custom-fields-theme-selects').select2({ width:'100%',theme: "classic"});}
				if ($( ".custom-range-slider" ).length > 0){$(".custom-range-slider").ionRangeSlider({skin: "round"});}
			}
			else
			{
				$('.load-acf-custom').LoadingOverlay("hide");
				$('.on-mw-request').css("display", "none");
			}
		});
});



$(document.body).on('change', '.loc-checks', function () {
        var loc_id = $(this).val();
        $('input[name=location]').val(loc_id);
        $.post(get_strings.ajax_url, {action: 'mw_get_listing_loc',location_id: loc_id}).done(function (response)
        {
            if (true === response.success)
            {
                $('.listing-makes-all').html(response.data.result);
                $('.listing-makes-all').before(response.data.selected_tag);
            }
            else
            {
                $('.listing-makes-all').html(response.data.result);
                $('.listing-makes-all').before(response.data.selected_tag);
            }
        });
        var sort_by = $("#sort-by").val();
        call_me_search('',sort_by);

    });


    $(document.body).on('click', '#location-widget-location .loc-cat-rm-lnk', function () {
        var cat_slug = $(this).attr("data-term-slug");
        var cat_slug_parent = $(this).attr("data-term-parent");
        $('input[name=location]').val(cat_slug_parent);
        $(this).parent('span.loc-tag').fadeOut(1000, function(){});
        $(this).parent('span.loc-tag').nextAll('span').remove();
        $.post(get_strings.ajax_url, {action: 'mw_return_parents_loc',cat_slug:cat_slug}).done(function (response)
        {
            if (true === response.success)
            {
                $('.listing-makes-all').html(response.data.result);
            }
            else
            {
            }
        });
        $(".grid.mysearch-page").height('auto');
        $('.loaders').show();
        $(".grid.mysearch-page").html('');
        $("#listing_ajax_pagination").html('');
        var sort_by = $("#sort-by").val();
        $.post(get_strings.ajax_url, {action: 'mw_listing_search', collect_data: $("form#mw-search-inv").serialize()+"&category="+cat_slug_parent+"&id_del=yes",sort_by: sort_by}).done(function (response)
        {
            $('.loaders').hide();
            if (true === response.success)
            {
                $(".grid.mysearch-page").html(response.data.listings);
                $(".my-filer-tags").html(response.data.fliters);
                $(".filter-sorting-bar .clr-yal").html(response.data.total_results);
                $("#listing_ajax_pagination").html(response.data.pagination);
                initialiceMasonry();
                window.history.pushState('', '', '?' +$("form#mw-search-inv").serialize());
            }
            else
            {
                $(".grid.mysearch-page").html(response.data.no_result);
                $(".my-filer-tags").html(response.data.fliters);
                $(".filter-sorting-bar .clr-yal").html(response.data.total_results);
                window.history.pushState('', '', '?' +$("form#mw-search-inv").serialize());
            }
        });
    });










    

$(document.body).on('click', '#category-widget .cat-rm-lnk', function () {
    var cat_slug = $(this).attr("data-term-slug");
    var cat_slug_parent = $(this).attr("data-term-parent");
    $('input[name=category]').val(cat_slug_parent);
    $(this).parent('span.cat-tag').fadeOut(1000, function(){});
    $(this).parent('span.cat-tag').nextAll('span').remove();
    $.post(get_strings.ajax_url, {action: 'mw_return_parents_cats',cat_slug:cat_slug}).done(function (response)
    {
        if (true === response.success)
        {
            $('.parent-makes-all').html(response.data.result);
        }
        else
        {
        }
    });
    $(".grid.mysearch-page").height('auto');
    $('.loaders').show();
    $(".grid.mysearch-page").html('');
    $("#listing_ajax_pagination").html('');
    var sort_by = $("#sort-by").val();
    $.post(get_strings.ajax_url, {action: 'mw_listing_search', collect_data: $("form#mw-search-inv").serialize()+"&category="+cat_slug_parent+"&id_del=yes",sort_by: sort_by}).done(function (response)
    {
        $('.loaders').hide();
        if (true === response.success) 
        {
            $(".grid.mysearch-page").html(response.data.listings);
            $(".my-filer-tags").html(response.data.fliters);
            $(".filter-sorting-bar .clr-yal").html(response.data.total_results);
            $("#listing_ajax_pagination").html(response.data.pagination);
            initialiceMasonry();
            window.history.pushState('', '', '?' +$("form#mw-search-inv").serialize());
        }
        else
        {
            $(".grid.mysearch-page").html(response.data.no_result);
            $(".my-filer-tags").html(response.data.fliters);
            $(".filter-sorting-bar .clr-yal").html(response.data.total_results);
            window.history.pushState('', '', '?' +$("form#mw-search-inv").serialize());
        }
    });
});

//Reset Selected Filters;
$(document.body).on('click', '.mw-filter-reset-btn', function () {
        $(this).parent('li').fadeOut(1000, function(){});
        var params = $(this).attr("data-name");
        var second_params = $(this).attr("data-name-second");
        var third_params = $(this).attr("data-name-third");
        var filter_type = $(this).attr("data-check");

        var new_url = new URLSearchParams(window.location.search);
        if (typeof second_params !== "undefined") {
            new_url.delete(params);
            new_url.delete(second_params);
            new_url.delete(third_params);
        }
        new_url.delete(params);
        window.history.pushState('', '', '?' +new_url);
        if(filter_type == 'checkcolumn')
        {
             $('input[name="'+params+'"]').prop('checked', false);
        }
        else if(filter_type == 'nearbyme')
        {
            $('input[name="latitude"]').val('');
            $('input[name="longitude"]').val('');
            $('input[name="distance"]').val('');
            $('.only-for-radius').fadeOut(1000);
        }
        else
        {
            $('input[name="'+params+'"]').val('');
        }
        var sort_by = $("#sort-by").val();
        call_me_search('',sort_by);
 });
    
$(document.body).on('click', '.typeahead__button , .mw-price-search, .filter-results ,.sel-class,.my-types', function () {
    var sort_by = $("#sort-by").val();
    call_me_search('',sort_by);
});
    
$(document.body).on('change', '.my-cond,.my-body-type, .my-fuel, .my-year, .my-transm, .my-drive, .my-ext-clr, .my-owns, .my-sellers', function () {
    var sort_by = $("#sort-by").val();
    call_me_search('',sort_by);
});
    
$(document.body).on('change', '#sort-by', function () {
    var sort_by = $(this).val();
    call_me_search('',sort_by);
});
	
 
if ( $( ".js-range-slider-mileage" ).length )
{
     $(".js-range-slider-mileage").ionRangeSlider({
            skin: "round",
            onFinish: function ()
            {
                var sort_by = $("#sort-by").val();
                call_me_search('',sort_by);
            },
    });    
}
    
/*Pagination*/
 $(document.body).on('click', '.fetch_result', function () {
    var page_no = $(this).attr("data-page-no");
    var sort_by = $("#sort-by").val();
    $(this).addClass("active");
    $(".fetch_result").not(this).removeClass("active");
    call_me_search(page_no,sort_by);
 });
    
if ( $( ".js-range-slider-price" ).length )
{
    var $servicesRange = $(".js-range-slider-price"),
    $servicesInputFrom = $(".js-input-from"),
    $servicesInputTo = $(".js-input-to"),
    instance,
    min = $(this).prop("value"),
    max = $(this).prop("value"),
    from = 0,
    to = 0;
    $servicesRange.ionRangeSlider({
        skin: "round",
        type: "double",
        onStart: updateInputs,
        onChange: updateInputs,
        onFinish: make_me_call,
    });

    instance = $servicesRange.data("ionRangeSlider");
    function updateInputs (data) {
        from = data.from;
        to = data.to;
        $servicesInputFrom.prop("value", from);
        $servicesInputTo.prop("value", to);	
    }
    function make_me_call (data) {
        from = data.from;
        to   = data.to;
        var sort_by = $("#sort-by").val();
        call_me_search('',sort_by);
    }

    $servicesInputFrom.on("input", function () {
        var val = $(this).prop("value");
        // validate
        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }
        instance.update({
            from: val
        });
    });
    $servicesInputTo.on("input", function () {
        var val = $(this).prop("value");
        // validate
        if (val < from) {
            val = from;
        } else if (val > max) {
            val = max;
        }
        instance.update({
            to: val
        });
    });
}    
		

	/*Ajax Suggestions*/
	if ($('.for_search_pages').is('.specific_search'))
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
                ajax: {type: "post", url: get_strings.ajax_url, data: {q: '{{query}}', action: 'mw_listing_search_suggestions' }},
            },
            callback: {
            onSubmit: function (node, a, item, event) {
                event.preventDefault();
                var keyCode =event.keyCode || event.which;
                if (keyCode === 13) { 
                    event.preventDefault();
                    return false;
                }
            },

    }
        });
        
    }
	
	
	/*Form search fields*/
	$('button[name=properties_search_home]').on('click', function () {
		$(".grid.mysearch-page").height('auto');
        $('.fb-like-animation').show();
        $(".grid.mysearch-page").html('');
		$("#listing_ajax_pagination").html('');
		call_me_search('','');
    });
	

/* Call For Ajax */    
function call_me_search(page_no ='', sort_by = '')
{
	    $(".mysearch-page").LoadingOverlay("show");
       // $(".grid.mysearch-page").height('auto');
        //$(".grid.mysearch-page").html('');
        $("#listing_ajax_pagination").html('');
        Pace.restart();
        $.post(get_strings.ajax_url, {action: 'mw_listing_search', collect_data: $("form#mw-search-inv").serialize(),page_no: page_no,sort_by: sort_by}).done(function (response)
        {
             $(".mysearch-page").LoadingOverlay("hide");
             if (true === response.success) 
             {
                $(".grid.mysearch-page").html(response.data.listings);
                $(".my-filer-tags").html(response.data.fliters);
                $(".filter-sorting-bar .clr-yal").html(response.data.total_results);
                $("#listing_ajax_pagination").html(response.data.pagination);
                initialiceMasonry();
                window.history.pushState('', '', '?' +$("form#mw-search-inv").serialize());
             }
             else
             {
                $(".grid.mysearch-page").html(response.data.no_result);
                $(".my-filer-tags").html(response.data.fliters);
                $(".filter-sorting-bar .clr-yal").html(response.data.total_results);
                window.history.pushState('', '', '?' +$("form#mw-search-inv").serialize());
             }
        });
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
            layoutMode: 'fitRows',
            transitionDuration: '0.7s',
        });
    });
}


}

})(jQuery);