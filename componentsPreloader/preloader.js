/*
    图片预加载插件

 */


!function ($) {
    // 1 定义构造函数
    var PicPreloader = function (el, imgUrl) {
        // 如果自身是IMG元素 就不再找容器内的IMG元素
        if (el[0].tagName == 'IMG') {
            this.el = el;
        } else {
            this.el = el.find('img');
        }
        this.imgUrl = imgUrl;

        // console.log(this.el);
        this.realSrc = '';
        this.initPic();
        this.reloadPic();
    };
    // 2 定义原型方法
    PicPreloader.prototype = {
        initPic: function () {
            var _this = this;
            this.el.each(function (index, element) {
                var realSrc = $(element).attr("src");
                $(element).attr("src", _this.imgUrl);
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
        picPreloader: function (imgUrl) {
            this.each(function(){
                new PicPreloader($(this), imgUrl);
            });
            return $(this);
        }
    });
}(jQuery);