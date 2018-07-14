/*
    * 图片预加载
 */

!function ($) {
    // 1 定义构造函数
    var PicPreloader = function (el) {
        this.el = el.find('img');
        console.log(this.el);
        this.realSrc = '';
        this.initPic();
        this.reloadPic();
    };
    // 2 定义原型方法
    PicPreloader.prototype = {
        initPic: function () {
            this.el.each(function (index, element) {
                var realSrc = $(element).attr("src");
                $(element).attr("src", "./img/test.png");
                $(element).attr("data-src", realSrc);
            });
        },
        // 预加载后替换图片
        reloadPic: function () {
            // console.log(this.el);
            var _this = this;
            this.el.each(function (index, element) {
                var newImageObj = new Image();
                newImageObj.src = $(element).attr('data-src');
                newImageObj.onload = function () {
                    $(element).attr('src', newImageObj.src);
                };
            });
        }
    };
    // 3 拓展jquery函数
    $.fn.extend({
        picPreloader: function () {
            this.each(function(){
                new PicPreloader($(this));
            });
            return $(this);
        }
    });
}(jQuery);