require.config({
    baseUrl: '',
    　　paths: {
        "underscore": "lib/underscore.min",
        "slider": "js/slider",
		"mobile": "js/mobile",
        "config": "js/config"
    }
});

(function() {
    require(['underscore', 'mobile', 'config'], function(_, isMobile, gUserInfoConf) {
        //Initialize Page initInfo
        var template = _.template($('#mainTpl').html());
        $('.wrapper').html(template(gUserInfoConf));

        var skillProficiencyAnim = function(argument) {
            var gDelayTime = 0;
            _.each(gUserInfoConf.workSkill, function(desc, index) {
                gDelayTime = (gDelayTime || 0) + 200; /*Unit Of Time: ms */
                _.delay(function() {
                    $('#workSkill').find('div').eq(index).find('.skillSpan').css({
                        'width': desc.ability
                    });
                }, gDelayTime);
            });
        }

        var scrollFunc = function(e) {
            e = e || window.event;
            var offset_chrome = document.getElementsByTagName("body");
            var offset_firebox = document.getElementsByTagName("body");

            if (e.wheelDelta) {         //如果是IE/Opera/Chrome浏览器
                offset_chrome.value = e.wheelDelta;
            } else if (e.detail) {      //如果是Firefox浏览器
                offset_firebox.value = e.detail;
            }

            //offset_chrome.value<0 仿简书:滚动鼠标-使得页面往下滑动:隐藏导航条;
            if (offset_chrome.value < 0 || offset_firebox.value < 0) {
                if ($("#magellanBar").hasClass('fVisible') == false) {
                    $("[data-magellan-expedition]").fadeOut('fast', function() {
                        $("#magellanBar").addClass('fVisible');
                    });
                }
            } else {
                if ($("#magellanBar").hasClass('fVisible') == true) {
                    $("[data-magellan-expedition]").fadeIn('fast', function() {
                        $("#magellanBar").removeClass('fVisible');
                    });
                }
            }
        }

        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
            document.addEventListener('mousewheel', scrollFunc, false);
        }

		if( isMobile.anyMobile() ){
			$('#magellanBar').css({"position":"static !important"});
            $('#magellanBar').attr('data-magellan-expedition','none');
		}

        skillProficiencyAnim();

        //Initialize Foundation JS
        $(document).foundation();
    })
})();
