
var neonLogin = neonLogin || {};

;(function(jQuery, window, undefined)
{
	"use strict";
	
	jQuery(document).ready(function()
	{
		neonLogin.jQuerycontainer = jQuery("#form_login");
		
		
		// Login Form & Validation
		neonLogin.jQuerycontainer.validate({
			rules: {
				username: {
					required: true	
				},
				
				password: {
					required: true
				},
				
			},
			
			highlight: function(element){
				jQuery(element).closest('.input-group').addClass('validate-has-error');
			},
			
			
			unhighlight: function(element)
			{
				jQuery(element).closest('.input-group').removeClass('validate-has-error');
			},
			
			submitHandler: function(ev)
			{
				/* 
					Updated on v1.1.4
					Login form now processes the login data, here is the file: data/sample-login-form.php
				*/
				
				jQuery(".login-page").addClass('logging-in'); // This will hide the login form and init the progress bar
					
					
				// Hide Errors
				jQuery(".form-login-error").slideUp('fast');

				// We will wait till the transition ends				
				setTimeout(function()
				{
					var random_pct = 25 + Math.round(Math.random() * 30);
					
					// The form data are subbmitted, we can forward the progress to 70%
					neonLogin.setPercentage(40 + random_pct);
											
					// Send data to the server
					jQuery.ajax({
						url: '/user',
						method: 'POST',
						dataType: 'json',
						data: {
							username: jQuery("#username").val(),
							password: jQuery("#password").val(),
						},
						error: function()
						{
							alert("An error occoured!");
						},
						success: function(response)
						{
							// Login status [success|invalid]
							var login_status = response.login_status;					
							// Form is fully completed, we update the percentage
							neonLogin.setPercentage(100);
							
							
							// We will give some time for the animation to finish, then execute the following procedures	
							setTimeout(function()
							{
								// If login is invalid, we store the 
								if(login_status == 'invalid')
								{
									jQuery(".login-page").removeClass('logging-in');
									neonLogin.resetProgressBar(true);
								}
								else
								if(login_status == 'success')
								{
									// Redirect to login page
									setTimeout(function()
									{
										var redirect_url = "/home";			
										window.location.href = redirect_url;
									}, 400);
								}
								
							}, 1000);
						}
					});
						
					
				}, 650);
			}
		});
		
		
		
		
		// Lockscreen & Validation
		var is_lockscreen = jQuery(".login-page").hasClass('is-lockscreen');
		
		if(is_lockscreen)
		{
			neonLogin.jQuerycontainer = jQuery("#form_lockscreen");
			neonLogin.jQueryls_thumb = neonLogin.jQuerycontainer.find('.lockscreen-thumb');
			
			neonLogin.jQuerycontainer.validate({
				rules: {
				
					password: {
						required: true
					},
					
				},
				
				highlight: function(element){
					jQuery(element).closest('.input-group').addClass('validate-has-error');
				},
				
				
				unhighlight: function(element)
				{
					jQuery(element).closest('.input-group').removeClass('validate-has-error');
				},
				
				submitHandler: function(ev)
				{	
					/* 
						Demo Purpose Only 
						
						Here you can handle the page login, currently it does not process anything, just fills the loader.
					*/
					
					jQuery(".login-page").addClass('logging-in-lockscreen'); // This will hide the login form and init the progress bar
	
					// We will wait till the transition ends				
					setTimeout(function()
					{
						var random_pct = 25 + Math.round(Math.random() * 30);
						
						neonLogin.setPercentage(random_pct, function()
						{
							// Just an example, this is phase 1
							// Do some stuff...
							
							// After 0.77s second we will execute the next phase
							setTimeout(function()
							{
								neonLogin.setPercentage(100, function()
								{
									// Just an example, this is phase 2
									// Do some other stuff...
									
									// Redirect to the page
									setTimeout("window.location.href = '../../'", 600);
								}, 2);
								
							}, 820);
						});
						
					}, 650);
				}
			});
		}
		
		
		
		
		
		
		// Login Form Setup
		neonLogin.jQuerybody = jQuery(".login-page");
		neonLogin.jQuerylogin_progressbar_indicator = jQuery(".login-progressbar-indicator h3");
		neonLogin.jQuerylogin_progressbar = neonLogin.jQuerybody.find(".login-progressbar div");
		
		neonLogin.jQuerylogin_progressbar_indicator.html('0%');
		
		if(neonLogin.jQuerybody.hasClass('login-form-fall'))
		{
			var focus_set = false;
			
			setTimeout(function(){ 
				neonLogin.jQuerybody.addClass('login-form-fall-init')
				
				setTimeout(function()
				{
					if( !focus_set)
					{
						neonLogin.jQuerycontainer.find('input:first').focus();
						focus_set = true;
					}
					
				}, 550);
				
			}, 0);
		}
		else
		{
			neonLogin.jQuerycontainer.find('input:first').focus();
		}
		
		// Focus Class
		neonLogin.jQuerycontainer.find('.form-control').each(function(i, el)
		{
			var jQuerythis = jQuery(el),
				jQuerygroup = jQuerythis.closest('.input-group');
			
			jQuerythis.prev('.input-group-addon').click(function()
			{
				jQuerythis.focus();
			});
			
			jQuerythis.on({
				focus: function()
				{
					jQuerygroup.addClass('focused');
				},
				
				blur: function()
				{
					jQuerygroup.removeClass('focused');
				}
			});
		});
		
		// Functions
		jQuery.extend(neonLogin, {
			setPercentage: function(pct, callback)
			{
				pct = parseInt(pct / 100 * 100, 10) + '%';
				
				// Lockscreen
				if(is_lockscreen)
				{
					neonLogin.jQuerylockscreen_progress_indicator.html(pct);
					
					var o = {
						pct: currentProgress
					};
					
					TweenMax.to(o, .7, {
						pct: parseInt(pct, 10),
						roundProps: ["pct"],
						ease: Sine.easeOut,
						onUpdate: function()
						{
							neonLogin.jQuerylockscreen_progress_indicator.html(o.pct + '%');
							drawProgress(parseInt(o.pct, 10)/100);
						},
						onComplete: callback
					});	
					return;
				}
				
				// Normal Login
				neonLogin.jQuerylogin_progressbar_indicator.html(pct);
				neonLogin.jQuerylogin_progressbar.width(pct);
				
				var o = {
					pct: parseInt(neonLogin.jQuerylogin_progressbar.width() / neonLogin.jQuerylogin_progressbar.parent().width() * 100, 10)
				};
				
				TweenMax.to(o, .7, {
					pct: parseInt(pct, 10),
					roundProps: ["pct"],
					ease: Sine.easeOut,
					onUpdate: function()
					{
						neonLogin.jQuerylogin_progressbar_indicator.html(o.pct + '%');
					},
					onComplete: callback
				});
			},
			
			resetProgressBar: function(display_errors)
			{
				TweenMax.set(neonLogin.jQuerycontainer, {css: {opacity: 0}});
				
				setTimeout(function()
				{
					TweenMax.to(neonLogin.jQuerycontainer, .6, {css: {opacity: 1}, onComplete: function()
					{
						neonLogin.jQuerycontainer.attr('style', '');
					}});
					
					neonLogin.jQuerylogin_progressbar_indicator.html('0%');
					neonLogin.jQuerylogin_progressbar.width(0);
					
					if(display_errors)
					{
						var jQueryerrors_container = jQuery(".form-login-error");
						
						jQueryerrors_container.show();
						var height = jQueryerrors_container.outerHeight();
						
						jQueryerrors_container.css({
							height: 0
						});
						
						TweenMax.to(jQueryerrors_container, .45, {css: {height: height}, onComplete: function()
						{
							jQueryerrors_container.css({height: 'auto'});
						}});
						
						// Reset password fields
						neonLogin.jQuerycontainer.find('input[type="password"]').val('');
					}
					
				}, 800);
			}
		});
		
		
		// Lockscreen Create Canvas
		if(is_lockscreen)
		{
			neonLogin.jQuerylockscreen_progress_canvas = jQuery('<canvas></canvas>');
			neonLogin.jQuerylockscreen_progress_indicator =  neonLogin.jQuerycontainer.find('.lockscreen-progress-indicator');
			
			neonLogin.jQuerylockscreen_progress_canvas.appendTo(neonLogin.jQueryls_thumb);
			
			var thumb_size = neonLogin.jQueryls_thumb.width();
			
			neonLogin.jQuerylockscreen_progress_canvas.attr({
				width: thumb_size,
				height: thumb_size
			});
			
			
			neonLogin.lockscreen_progress_canvas = neonLogin.jQuerylockscreen_progress_canvas.get(0);
			
			// Create Progress Circle
			var bg = neonLogin.lockscreen_progress_canvas,
				ctx = ctx = bg.getContext('2d'),
				imd = null,
				circ = Math.PI * 2,
				quart = Math.PI / 2,
				currentProgress = 0;
			
			ctx.beginPath();
			ctx.strokeStyle = '#eb7067';
			ctx.lineCap = 'square';
			ctx.closePath();
			ctx.fill();
			ctx.lineWidth = 3.0;
			
			imd = ctx.getImageData(0, 0, thumb_size, thumb_size);
			
			var drawProgress = function(current) {
			    ctx.putImageData(imd, 0, 0);
			    ctx.beginPath();
			    ctx.arc(thumb_size/2, thumb_size/2, 70, -(quart), ((circ) * current) - quart, false);
			    ctx.stroke();
			    
			    currentProgress = current * 100;
			}
			
			drawProgress(0/100);
			
			
			neonLogin.jQuerylockscreen_progress_indicator.html('0%');
			
			ctx.restore();
		}
		
	});
	
})(jQuery, window);