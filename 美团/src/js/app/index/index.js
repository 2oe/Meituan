require(['jquery', 'swiper', 'render'], function($, swiper, render) {
    // 请求数据
    $.ajax({
        url: '/api/swiper',
        dataType: 'json',
        success: function(res) {
            // 渲染swiper
            render('#swiperTpl', '.swipers', res.data);
            var bannerSwiper = new swiper('.bannerSwiper', {
                autoplay: true,
                loop: true,
                pagination: {
                    el: '.swiper-pagination'
                }
            });
            var _line = $('.line');
            // 点击tab_list类型切换
            $('.tab_list').on('click', 'span', function() {
                    var idx = $(this).index();
                    if (idx == 1) {
                        _line.addClass('active');
                    } else {
                        _line.removeClass('active');
                    }
                })
                // 点击搜索按钮
            $('#searchBtn').on('click', function() {
                // 跳转页面
                location.href = '../../page/list.html';
            })
        },
        error: function(error) {
            console.log(error);
        }
    })
});