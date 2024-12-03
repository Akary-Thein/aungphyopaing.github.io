$(document).ready(function () {
    //Menu Toggle
    $(".header .menu-toggle").on("click", function () {
        $(this).toggleClass("active");
        $(".gnav").toggleClass("is-show");
        $("html").toggleClass("scroll-prevent");
    });

    // Set header height for offset calculation
    $headerHeight = $("header").outerHeight();
    function smoothScrollTo(target) {
        target = target.length ? target : $("[name='" + this.hash.slice(1) + "']");
        if (target.length) {
            $("html,body").animate({
                scrollTop: target.offset().top - $headerHeight
            }, 800);
        }
    }

    // Adjust scroll position when a link with a hash is clicked
    $(".header .gnav a[href*='#']:not([href='#'])").click(function () {
        $(".header .gnav a.active").removeClass("active");
        $(this).addClass("active");
        $(".header .menu-toggle").removeClass("active");
        $(".gnav").removeClass("is-show");
        $("html").removeClass("scroll-prevent");

        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname) {
            smoothScrollTo($(this.hash));
            return false;
        }
    });

    // Initial scroll offset adjustment when the page loads with a hash
    setTimeout(function () {
        if (location.hash) {
            window.scrollTo(0, 0);
            var target = location.hash.split("#")[1];
            if (target) {
                smoothScrollTo($("#" + target));
            }
        }
    }, 1000);

    // Scroll event to add the 'active' class to the section in view
    //$(window).on('scroll', function () {
    //    var scrollPosition = $(window).scrollTop() + $headerHeight;
    //
    //    $('section').each(function () {
    //        var sectionOffset = $(this).offset().top;
    //        var sectionHeight = $(this).outerHeight();
    //
    //        // Check if the scroll position is within the section's range
    //        if (scrollPosition >= sectionOffset && scrollPosition < sectionOffset + sectionHeight) {
    //            var id = $(this).attr('id');
    //            $('.header .gnav a').removeClass('active');
    //            $('.header .gnav a[href="#' + id + '"]').addClass('active');
    //        }
    //    });
    //});


    // Change Header Background Color
    var mvHeight = $(".header").height();
    updateHeaderClass(mvHeight);

    $(window).scroll(function () {
        updateHeaderClass(mvHeight);
    });

    function updateHeaderClass() {
        if ($(window).scrollTop() >= mvHeight) {
            $(".header").addClass("active");
        } else {
            $(".header").removeClass("active");
        }
    };

    // Typing Animation
    function typing() {
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var $stat = $(".js-animation");
        $stat.each(function () {
            var $self = $(this);
            var prev = $self.offset().top;
            if (scrollTop >= prev - windowHeight + 200) {
                $self.addClass("active");
            }
        });
    }
    typing();

    $(window).on("scroll", function () {
        typing();
    });

    // Page Top
    var topBtn = $(".page-top");
    topBtn.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
        scrollHeight = $(document).height();
        scrollPosition = $(window).height() + $(window).scrollTop();
        footHeight = $(".footer").innerHeight();
        if (scrollHeight - scrollPosition <= footHeight) {
            $(".page-top").css({
                "position": "absolute",
                "bottom": footHeight + 20,
            });
            $("body").css({
                "position": "relative",
            });
        }
        else {
            $(".page-top").css({
                "position": "fixed",
                "bottom": 35,
            });
        }
    });
    $(".page-top").click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 1000);
    });
});