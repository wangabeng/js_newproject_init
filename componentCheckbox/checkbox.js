!function () {
    // 1 定义构造函数
    var Checkbox = function (ele) {
        this.ele = ele;
        this.name = this.ele.find('input').attr('name');
        this.allInputs = this.ele.find("input[name=" + this.name + "]");
        this.init();
        this.bindChange();        
    };

    // 2 定义方法 
    Checkbox.prototype = {
        init: function () {
            var that = this;
            console.log(this);
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
                $(this).parents('li').find('i').toggleClass('fa-square-o fa-check-square-o');
            });
        }
    };
    // 3 扩展jquery
    $.fn.extend({
        defineCheckbox: function () {
            this.each(function(){
                new Checkbox($(this));
            });
            return $(this);
        } 
    });
}();