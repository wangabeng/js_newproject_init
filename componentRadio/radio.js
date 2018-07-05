!function () {
    // 1 定义构造函数
    var Radio = function (ele) {
        this.ele = ele;
        this.name = this.ele.find('input').attr('name');
        this.allInputs = this.ele.find("input[name=" + this.name + "]");
        this.init();
        this.bindChange();        
    };

    // 2 定义方法 
    Radio.prototype = {
        init: function () {
            var that = this;
            this.allInputs.each(function (index, element) {
                var thisAttr = $(element).attr("checked");
                // console.log(index, thaht.ele, thisAttr);
                var par = $(element).parents('li');
                if (thisAttr) {
                    par.find('i').removeClass('fa-square-o').addClass('fa-check-square-o');
                }
            });
        },
        bindChange: function () {
            var that = this;
            this.allInputs.change(function () {
                that.ele.find('i').addClass('fa-square-o').removeClass('fa-check-square-o');
                $(this).parents('li').find('i').removeClass('fa-square-o').addClass('fa-check-square-o');
            });
        }
    };
    // 3 扩展jquery
    $.fn.extend({
        defineRadio: function () {
            this.each(function(){
                new Radio($(this));
            });
            return $(this);
        } 
    });
}();