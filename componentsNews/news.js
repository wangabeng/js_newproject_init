/*
    新闻滚动插件

 */
!function ($) {
    // 1 定义构造函数
    var NewsScroll = function (el) {
        this.$moveEl = el.find('ul');
        this.curIndex = 0;
        this.allLenth = 0;
        // 复制li
        this.copyNews();
        // 获取每个li的高度
        this.eachHeight = this.getElementStyle(this.$moveEl.find('li')[0], 'height');
        // 自动滚动
        this.autoScroll();
    };
    // 2 定义原型方法
    NewsScroll.prototype = {
        // 获取样式集合
        getElementStyle: function (element, attr) {
            var getValue = element.currentStyle ? element.currentStyle[attr] : window.getComputedStyle(element, null)[attr];
            return parseFloat(getValue);
        },
        // 复制一份列表内容
        copyNews: function () {
            var copyContent = this.$moveEl[0].innerHTML;
            this.$moveEl.append(copyContent);
            this.allLength = this.$moveEl.find('li').length;
        },
        // 向上滚动
        autoScroll: function () {
            var _this = this;
            clearInterval(moveTimer);
            var moveTimer = setInterval(intervalFn, 1000);

            addHandler(window, 'resize', function () {
                clearInterval(moveTimer);
                moveTimer = setInterval(intervalFn, 1000);
            });

            function addHandler (element,type,handler) {
                if (element.addEventListener) {
                    element.addEventListener(type, handler, false);
                }else if (element.attachEvent) {
                    element.attachEvent('on' + type, handler);
                }else{
                    element['on' + type] = handler;
                }
            }

            function intervalFn () {
                if (_this.curIndex === _this.allLength - 1) {
                     _this.$moveEl.css({'top': -1 * (_this.allLength / 2 -1) * _this.eachHeight});
                     _this.curIndex = _this.allLength / 2 -1;
                }
                // 获取当前的top值
                var curTop = _this.getElementStyle(_this.$moveEl[0], 'top');

                _this.$moveEl.animate({'top': curTop + (-1 * _this.eachHeight)}, 500, function () {
                    _this.curIndex ++ ;
                });
            }
        }
    };
    // 3 拓展jquery函数
    $.fn.extend({
        newsScroll: function () {
            this.each(function(){
                new NewsScroll($(this));
            }); 
            return $(this);
        } 
    });
}(jQuery);
