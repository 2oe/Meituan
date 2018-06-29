require(['jquery', 'render', 'bscroll'], function($, render, bscroll) {
    // 点击返回主页面
    $('header').on('click', 'span', function() {
        location.href = '/';
    });
    $.ajax({
            url: '/api/search',
            dataType: 'json',
            success: function(res) {
                // 优化数据格式
                var newArr = information(res);
                render('#searchTpl', '.con', newArr);
                render('#letterTpl', '.markList', newArr);
                var myScroll = new bscroll('section', {
                        scrollbar: true,
                        scrollY: true,
                        probeType: 2,
                        click: true
                    })
                    // 封装点击跳转
                scrollToLetter(myScroll);
                $('.con').on('click', 'p', function() {
                    var con = $(this).html();
                    location.href = '../../../index.html?con=' + con;
                })
            },
            error: function(error) {
                console.warn(error);
            }
        })
        // 优化数据
    function information(res) {
        var obj = {};
        res.data.forEach(function(item) {
            var key = item.pinyin.substr(0, 1).toUpperCase();
            if (!obj[key]) {
                obj[key] = {
                    title: key,
                    list: []
                }
            }
            obj[key].list.push(item);
        })
        var arr = [];
        for (var k in obj) {
            arr.push(obj[k]);
        }
        arr.sort(function(x, y) {
            return x.title.charCodeAt(0) - y.title.charCodeAt(0);
        })
        return arr;
    }

    function scrollToLetter(myScroll) {
        // 点击span
        $('.markList').on('click', 'span', function() {
            var letter = $(this).html();
            $('.con .letter').each(function(i, val) {
                // 滚动到相应位置
                if ($(val).html() == letter) {
                    myScroll.scrollToElement(val);
                }
            })

        })
    }
})