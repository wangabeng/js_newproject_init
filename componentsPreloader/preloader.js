!function ($) {
    // 1 定义构造函数
    var PicPreloader = function (el) {
        this.el = el;
        this.reloadPic();
    };
    // 2 定义原型方法
    PicPreloader.prototype = {
        // 预加载后替换图片
        reloadPic: function () {
            console.log(this.el);
            var _this = this;
            this.imageObj = new Image();
            this.imageObj.src = this.el.attr('data-src');
            this.imageObj.onload = function () {
                _this.el.attr('src', _this.imageObj.src);
            };
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