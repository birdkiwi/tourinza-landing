new WOW().init();
(function( $ ) {
    $.fn.bServices = function() {
        var $this = this;

        $this.each(function(){

            var $container = $(this),
                $links = $container.find('[data-state]'),
                stateDefault = 'state-default';

            $links.each(function(){
                var $link = $(this),
                    stateClass = $link.data('state');

                $link.hover(function(){
                    $container.addClass(stateClass).removeClass(stateDefault);
                }, function(){
                    $container.addClass(stateDefault).removeClass(stateClass);
                });
            });


        });

        return $this;
    };
})(jQuery);

(function( $ ) {
    $.fn.bReasons = function() {
        var $this = this;

        $this.each(function(){

            var $container = $(this),
                $links = $container.find('a'),
                stateActive = 'state-open';

            $links.click(function(){

                if(!$container.hasClass(stateActive))
                {
                    $container.addClass(stateActive);
                }

                if(!$(this).parent('li').hasClass('active'))
                {
                    $(this).parent('li').addClass('active').siblings('li').removeClass('active');
                }

                return false;
            });

        });

        return $this;
    };
})(jQuery);

(function( $ ) {
    $.fn.bScheme = function() {
        var $this = this;

        $this.each(function(){

            var $container = $(this),
                $optionsLinks = $container.find('[data-option]');

            function setActive($link)
            {
                var option = $link.data('option');
                if(option == 1)
                {
                    $container.addClass('state-1').removeClass('state-2');
                } else if (option == 2)
                {
                    $container.addClass('state-2').removeClass('state-1');
                }
                $link.parent('li').addClass('active').siblings('li').removeClass('active');
            }

            setActive($optionsLinks.eq(0));

            $optionsLinks.click(function(){
                if(!$(this).parent('li').hasClass('active'))
                {
                    setActive($(this));
                }
            });

        });

        return $this;
    };
})(jQuery);

(function( $ ) {
    $.fn.bPartnersSlider = function() {
        var $this = this;

        $this.each(function(){

            var $container = $(this),
                $holder = $container.find('[data-holder]'),
                $items = $holder.find('[data-item]'),
                itemsVal = $items.length,
                $prev = $container.find('[data-prev]'),
                $next = $container.find('[data-next]'),
                clickFlag = true,
                animationTime = 300;

            $items.css({'left': '100%'}).eq(0).css({'left': 0}).addClass('active');

            $next.click(function(){
                if(clickFlag)
                {
                    clickFlag = false;
                    var $itemCurrent = $items.filter('.active'),
                        $itemNext = $itemCurrent.next('[data-item]').length ? $itemCurrent.next('[data-item]') : $items.eq(0);

                    $itemCurrent.animate({'left': '-100%'}, animationTime).removeClass('active');
                    $itemNext.css({'left': '100%'}).animate({'left': 0}, animationTime, function(){
                        $(this).addClass('active');
                        clickFlag = true;
                    });
                }
            });

            $prev.click(function(){
                if(clickFlag)
                {
                    clickFlag = false;
                    var $itemCurrent = $items.filter('.active'),
                        $itemNext = $itemCurrent.prev('[data-item]').length ? $itemCurrent.prev('[data-item]') : $items.eq(itemsVal - 1);

                    $itemCurrent.animate({'left': '100%'}, animationTime).removeClass('active');
                    $itemNext.css({'left': '-100%'}).animate({'left': 0}, animationTime, function(){
                        $(this).addClass('active');
                        clickFlag = true;
                    });
                }
            });

        });

        return $this;
    };
})(jQuery);

(function( $ ) {
    $.fn.bSlider = function() {
        var $this = this;

        $this.each(function(){

            var $container = $(this),
                $holder = $container.find('[data-holder]'),
                $items = $container.find('[data-item]'),
                $nav = $container.find('[data-nav]'),
                itemsVal = $items.length,
                animationSpeed = 300,
                clickFlag = true,
                timer,
                delay = 10000;

            for(var $i=0; $i < itemsVal; $i++)
            {
                $nav.append('<li><a data-to-slide="' + $i + '"></a></li>');
            }

            $items.hide().eq(0).show();

            $nav.find('li:first').addClass('active');

            function showSlide(item)
            {
                var $currSlide = $items.filter(':visible'),
                    nextSlide = parseInt(item.data('to-slide')),
                    $nextSlide = $items.eq(nextSlide);

                item.parent('li').addClass('active').siblings('li').removeClass('active');

                clickFlag = false;

                $currSlide.fadeOut(animationSpeed);
                $nextSlide.fadeIn(animationSpeed, function(){
                    clickFlag = true;
                });
            }

            $nav.find('a').click(function(){
                if(!$(this).parent('li').hasClass('active'))
                {
                    showSlide($(this));
                }
                return false;
            });

            function setTimer()
            {
                timer = setTimeout(function(){
                    var $nextLinkHolder = $nav.find('.active').next('li').length ? $nav.find('.active').next('li') : $nav.find('li:first');

                    showSlide($nextLinkHolder.find('a'));
                    setTimer();

                },delay);
            }

            setTimer();

            $container.hover(function(){
                clearTimeout(timer);
            }, function(){
                setTimer();
            });

        });

        return $this;
    };
})(jQuery);

(function( $ ) {
    $.fn.pageNavigation = function() {
        var $this = this;

        $this.each(function(){

            var $container = $(this),
                $positionHolder = $container.find('[data-position-holder]'),
                $items = $container.find('[data-block]'),
                itemsVal = $items.length,
                headerScrollClass = 'b-header--state-scroll',
                $header = $container.find('header');

            function headerStatus()
            {
                var scrolled = $(window).scrollTop();
                if(scrolled == 0)
                {
                    $header.removeClass(headerScrollClass);
                } else
                {
                    $header.addClass(headerScrollClass);
                }
            }

            $(window).scroll(function(){
                headerStatus();
            });

            headerStatus();

            $positionHolder.html('1/' + itemsVal);

            for(var $i = 0; $i < itemsVal; $i++ )
            {
                $items.eq($i).attr('data-block', $i);
            }

            $items.each(function(){
                var $this = $(this),
                    thisPosition = $this.data('block') + 1,
                    pointStart = $this.offset().top - 50,
                    pointStop = pointStart + $this.outerHeight() - 50;

                $(window).scroll(function(){

                    var scrolled = $(window).scrollTop() + $(window).height()/2;

                    if(scrolled >= pointStart && scrolled < pointStop)
                    {
                        $positionHolder.html( thisPosition  + '/' + itemsVal);
                    }

                });

            });
        });

        return $this;
    };
})(jQuery);

(function( $ ) {
    $.fn.pageMenu = function() {
        var $this = this;

        $this.each(function(){

            var $container = $(this),
                $btnShowModal = $container.find('[data-b-menu-button]'),
                $modal = $('[data-b-menu-modal]'),
                $btnCloseModal = $modal.find('[data-btn-close]'),
                $linksHolder = $modal.find('[data-b-menu-anchors]'),
                $links = $linksHolder.find('a');

            $btnShowModal.click(function(){
                $modal.fadeIn(300);
                $btnShowModal.fadeOut(300);
                return false;
            });

            $btnCloseModal.click(function(){
                $btnShowModal.fadeIn(300);
                $modal.fadeOut(300);
            });

            $links.click(function() {
                $btnShowModal.fadeIn(300);
                $modal.fadeOut(300);
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 50
                        }, 1000);
                        return false;
                    }
                }
            });

        });


        return $this;
    };
})(jQuery);

(function( $ ) {
    $.fn.pIndex = function() {
        var $this = this;

        $this.each(function(){

            var $container = $(this),
                $header = $container.find('[data-header]'),
                $content = $container.find('[data-content]'),
                $footer = $container.find('[data-footer]');

            function setCenter()
            {
                var $window = $(window),
                    winH = $window.height(),
                    headerH = $header.height(),
                    contentH = $content.height(),
                    footerH = $footer.height(),
                    sumH = headerH + contentH + footerH;

                if(winH >  sumH)
                {
                    var contentMargin = (winH - sumH)/2;
                    $content.css({'marginTop': contentMargin, 'marginBottom': contentMargin});
                }
            }

            setCenter();

            $(window).resize(function(){
                setCenter();
            });


        });

        return $this;
    };
})(jQuery);

(function( $ ) {
    $.fn.iMouse = function() {
        var $this = this;

        $this.each(function(){

            var $this = $(this);

            $this.click(function(){
                $('html,body').animate({
                    scrollTop: $('[data-block]').eq(1).offset().top - 50
                }, 600);
                return false;
            });

            $this.addClass('animated');
            setTimeout(function(){
                $this.removeClass('animated');
            }, 9000);

            setInterval(function(){
                $this.addClass('animated');
                setTimeout(function(){
                    $this.removeClass('animated');
                }, 3000);
            }, 20000);
        });

        return $this;
    };
})(jQuery);

(function( $ ) {
    $.fn.pReg = function() {
        var $this = this;

        $this.each(function(){

            var $this = $(this),
                //classState1 = 'p-reg--step-1',
                //classState2 = 'p-reg--step-2',
                $startList = $this.find('[data-start-options]'),
                $startOptions = $startList.find('[data-form]'),
                $activeList = $this.find('[data-form-options]'),
                $activeOptions = $activeList.find('[data-form]'),
                $formsHolder = $this.find('[data-forms-holder]'),
                $forms = $formsHolder.find('[data-form]');

            $forms.hide();

            $startOptions.click(function(){
                var formActive = $(this).data('form');
                $('.b-reg-start h2, .b-reg-start p').animate({
                    opacity: 0
                }, 100, function(){
                    $('.b-reg-start').animate({
                        top: "10%",
                        opacity: 0
                    }, 500, function(){
                        $('.b-reg-start').css({
                            display: "none"
                        })
                    });

                    $('.b-header__reg-list').css({
                        opacity: 0,
                        display: "block"
                    }).animate({
                        opacity: 1
                    }, 500);

                    $('.b-reg-forms').css({
                        opacity: 0,
                        display: "block"
                    }).animate({
                        opacity: 1
                    }, 500);
                });
                //$this.removeClass(classState1).addClass(classState2);
                $(this).parents('li').removeClass('active');
                $activeList.parents('li').removeClass('active');
                $activeOptions.filter('[data-form="' + formActive + '"]').parents('li').addClass('active');
                $forms.hide();
                $forms.filter('[data-form="' + formActive + '"]').show();
                return false;
            });

            $activeOptions.click(function(){
                var formActive = $(this).data('form');
                $(this).parent('li').addClass('active').siblings('li').removeClass('active');
                $forms.hide();
                $forms.filter('[data-form="' + formActive + '"]').show();
            });

        });

        return $this;
    };
})(jQuery);

(function( $ ) {
    $.fn.modalLogin = function() {
        var $this = this;

        $this.each(function(){

            var $this = $(this),
                $modalHolder = $('[data-b-login]'),
                $modal = $modalHolder.find('[data-b-login-modal]'),
                $btnCloseModal = $modalHolder.find('[data-btn-close]');

            $this.click(function(){
                $modalHolder.fadeIn(300);
                $modal.css({'marginTop': $modal.height()/(-2)});
            });

            $btnCloseModal.click(function(){
                $modalHolder.fadeOut(300);
            });


        });

        return $this;
    };
})(jQuery);

(function( $ ) {
    $.fn.btnUp = function() {
        var $btnLanguage = $(this).data('btn-up');
        var $btn = $('<a class="btn-up btn-up-' + $btnLanguage + '"></a>');
        $('body').append($btn);
        $btn.click(function(){
            $('html,body').animate({
                scrollTop: 0
            }, 600);
        });
        function btnState()
        {
            var scrolled = $(window).scrollTop();
            if(scrolled > 100)
            {
                $btn.addClass('active');
            } else
            {
                $btn.removeClass('active');
            }
        }

        btnState();

        $(window).scroll(function(){
            btnState();
        });

        return $btn;

    };
})(jQuery);

$(document).ready(function(){

    $('[data-p-index]').pIndex();
    $('[data-p-reg]').pReg();

    $('[data-b-services]').bServices();
    $('[data-b-reasons]').bReasons();
    $('[data-b-scheme]').bScheme();
    $('[data-b-partners-slider]').bPartnersSlider();
    $('[data-b-slider]').bSlider();
    $('[data-page-navigation]').pageNavigation();
    $('[data-page-menu]').pageMenu();
    $('[data-i-mouse]').iMouse();
    $('[data-login-btn]').modalLogin();
    $('[data-btn-up]').btnUp();

    var hoverIntentOpts = {
        over: showServices, // function = onMouseOver callback (REQUIRED)
        timeout: 0, // number = milliseconds delay before onMouseOut
        out: hideServices // function = onMouseOut callback (REQUIRED)
    };

    function showServices() {
        $('[data-show-service]').addClass('opacity');
        var serviceId = $(this).data('show-service');

        if ($(this).hasClass('current')) {
            return true;
        } else {
            $('[data-show-service]').removeClass('active current');
            $(this).removeClass('opacity').addClass('active current');
            $('[data-service]').hide();
            $('[data-service="' + serviceId + '"]').show();
            return false;
        }
    }

    function hideServices() {
        $('[data-show-service]').removeClass('active current opacity');
        $('[data-service]').hide();
        $('[data-service="0"]').show();
    }

    $('[data-show-service]').hoverIntent(hoverIntentOpts);
});

