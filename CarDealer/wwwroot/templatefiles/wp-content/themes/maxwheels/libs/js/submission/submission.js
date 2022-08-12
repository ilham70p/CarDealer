if(typeof(get_strings) !== 'undefined' && get_strings !== null)
{
	(function($) {
		"use strict";
			
        var myLanguage = {
		 	errorTitle: get_strings.submission_fail,
		};
        
        $.validate({
				form : '#mw_submission',
				modules : 'sanitize',
				validateOnBlur : true, 
				showErrorDialogs : false, 
				language : myLanguage,
				onSuccess : function() {
                $('.sonu-button').buttonLoader('start');
				$(".sonu-button").attr("disabled", true); 
                Pace.restart();    
				$.post(get_strings.ajax_url,{action : 'mw_submission', security:get_strings.ajax_nonce, collect_data:$( "form[name='mw_submission']").serialize()}).done( function(response) 
				{
                    $('.sonu-button').buttonLoader('stop');
					$(".sonu-button").attr("disabled", false);
					if (true === response.success) {
						$( "form[name='mw_submission']")[0].reset();
						notify('success', get_strings.congratulations,response.data.message);
						window.location	=	response.data.referral;
					}
					else {
						  notify('info', get_strings.whoops, response.data.message);
					}
				});
				  return false;
				}
			});
        
        
        $.validate({
				form : '#mw_submission_two',
				modules : 'sanitize',
                validateHiddenInputs : true,
				validateOnBlur : true, 
				showErrorDialogs : true, 
				language : myLanguage,
				onSuccess : function() {
                $('.sonu-button').buttonLoader('start');
				$(".sonu-button").attr("disabled", true); 
                Pace.restart();
				var desc;
				if ($('.tmce-active').length > 0) {
					desc = tinyMCE.get('mw-desc').getContent();
				}
					$.post(get_strings.ajax_url,{action : 'mw_submission_two', security:get_strings.ajax_nonce,desc:desc,collect_data:$( "form[name='mw_submission_two']").serialize()}).done( function(response)
				{
                    $('.sonu-button').buttonLoader('stop');
					$(".sonu-button").attr("disabled", false);
					if (true === response.success) {
						$( "form[name='mw_submission_two']")[0].reset();
						notify('success', get_strings.congratulations,response.data.message);
						window.location	=	response.data.referral;
					}
					else {
						  notify('info', get_strings.whoops, response.data.message);
						  window.location = response.data.pkg_url;

					}
				});
				  return false;
				}
			});



		$(".custom-meta-gallery").sortable({
				handle : '.shuffle-img',
				cancel:'',
				connectWith: ".sort_list_img", 
				cursor: 'move', 
				forcePlaceholderSize: true,
				update : function () { 
				var orderz =  $(this).sortable('toArray').toString();
					$("#selected_imgz_idz").val(orderz);
				} 
			});
        
        
         /* Gallery files*/
	$(document.body).on('change', '#gallery_files', function (e) {
		 e.preventDefault;
		 $("#selected_imgz_html_render").html('');
		 var fd = new FormData();
		 var files_datas = $('#gallery_files');
		 var listing_id = $(this).attr('data-listing-id');
		 $.each($(files_datas), function(i, obj) {
            $.each(obj.files,function(j,file){
                fd.append('files[' + j + ']', file);
            })
        });
		var total_images = document.getElementById("gallery_files").files.length;
		var imageHTML = '';
		imageHTML += '<ul class="custom-meta-gallery only-with-preview ">';
		for(var i=0;i<total_images;i++)
		{
			imageHTML +='<li class="sort_list_img"><div class="custom-meta-gallery_container "><span class="loading-center"><i class="fas fa-spinner fa-spin"></i> </span><div class="pre-temp-img"><img class="img-fluid" src='+URL.createObjectURL(event.target.files[i])+' alt=""></div></div><div class="img-overlay"></div></li>';
		}
		imageHTML += '</ul>';
		$(".temp_gallery_data").html(imageHTML);
		fd.append('listing_id', listing_id);	
		fd.append('action', 'mw_gallery_images');
		$.ajax({
                url: get_strings.ajax_url,
                type: 'POST',
                contentType: false,
                processData: false,
                data: fd,
                success: function (response)
				{
                    if (true === response.success) {
						$(".temp_gallery_data").html('');
						$("#selected_imgz_html_render").html(response.data.referral_data);
						$("#selected_imgz_idz").val(response.data.selected_attachments);
						$(".custom-meta-gallery").sortable({ 
							handle : '.shuffle-img',
							cancel:'',
							connectWith: ".sort_list_img", 
							cursor: 'move', 
							forcePlaceholderSize: true,
							update : function () { 
							var orderz =  $(this).sortable('toArray').toString();
								$("#selected_imgz_idz").val(orderz);
							} 
						});
					}
					else {
						 $(".temp_gallery_data").html('');
						 notify('error', get_strings.whoops, response.data.message); 
					}
                }
            });
	});
		
$(document).on('click', '.custom-gallery-del', function(e){
		var attachment_id = $(e.target).children('img').attr('id');
		var listing_id = $(e.target).children('img').attr("data-property-id");
		e.preventDefault();
		$.confirm({
			title: get_strings.conf,
			icon: 'fa fa-question',
			theme: 'material',
			closeIcon: true,
			type: 'orange',
			animation: 'scale',
			content: get_strings.content,
			buttons: {
				'confirm': {
						text: get_strings.ok,
						action: function () { 
							$.post(get_strings.ajax_url,{action : 'mw_delete_selected_gallery_attachment', attachment_id:attachment_id, listing_id:listing_id}).done( function(response) 
							{
							if (true === response.success) {
								$("#"+attachment_id).remove();
								$("#selected_imgz_idz").val(response.data.selected_attachments);
							}
							else {
								  notify('info', get_strings.whoops, response.data.message);
							}
						});
						}
				},
				cancle: {
						text: get_strings.cancle,
					},
			}
		});
});


	})(jQuery);
}
