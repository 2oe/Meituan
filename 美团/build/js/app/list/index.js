require(["jquery","render"],function(e,i){e.ajax({url:"/api/list",dataType:"json",success:function(o){i("#listTpl",".con",o.data.searchresult);var c=e("section").height();e("section").on("scroll",function(){var n=e(".con").height()-c;e(this).scrollTop()>n-30&&i("#listTpl",".con",o.data.searchresult,!0)}),e("header").on("click","span",function(){location.href="/"}),e(".con").on("click","dl",function(){var n=e(this).index();location.href="../../page/detail.html?id="+n})},error:function(n){console.warn(n)}})});