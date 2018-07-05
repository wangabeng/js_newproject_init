!function ($) {
  // 1 定义构造函数
  var DefineOptions = function (el) {
    this.el = el;
    this.optionsWrapper = el.find('ul');
    this.toggleOptions();
    this.bodyEvent();
    this.selectEvent();
  }; 
  // 2 定义方法
  DefineOptions.prototype = {
    // 切换选项显示隐藏
    toggleOptions: function () {
      var _this = this;
      this.el.on('click', function (event) {
        event.stopPropagation();
        _this.optionsWrapper.toggle();
      });
    },
    // 选择列表
    selectEvent: function () {
      var _this = this;
      this.optionsWrapper.find('li').on('click', function () {
        var value = $(this).html();
        _this.el.find('.option-selected').html(value);
      });
    },
    // 点击body隐藏选项列表
    bodyEvent: function () {
      var _this = this;
      $('body').on('click', function () {
        _this.optionsWrapper.hide();
      });
    }
  };
  // 3 扩展jquery
    $.fn.extend({
        defineOptions: function () {
            this.each(function(){
                new DefineOptions($(this));
            });
            return $(this);
        } 
    });
}(jQuery);