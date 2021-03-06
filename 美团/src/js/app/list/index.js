require(['jquery', 'render'], function($, render) {
    var listName = decodeURI(location.search.split('?')[1].split('=')[1]);
    // 获取页面数据
    $.ajax({
        url: '/api/list?con=' + listName,
        dataType: 'json',
        success: function(res) {
            // 渲染list页面
            render('#listTpl', '.con', res.data.searchresult);
            // 获取section的高度
            var hei = $('section').height();
            $('section').on('scroll', function() {
                    // 内容高度
                    var con = $('.con').height();
                    var maxScrollY = con - hei;
                    if ($(this).scrollTop() > maxScrollY - 30) {
                        // 加载更多数据
                        render('#listTpl', '.con', res.data.searchresult, true);
                    }
                })
                // 点击返回
            $('header').on('click', 'span', function() {
                history.go(-1);
            })

            // 点击dl跳转详情
            $('.con').on('click', 'dl', function() {
                var idx = $(this).index();
                // 跳转详情页和传入id
                location.href = '../../page/detail.html?id=' + idx + '&con=' + listName;
            })

        },
        error: function(error) {
            console.warn(error);
        }
    })
})