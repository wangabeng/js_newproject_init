!function ($) {
  // 1 定义构造函数
  var DefineOptions = function (el, callback) {
    this.el = el;
    this.optionsWrapper = el.find('ul');
    this.randomData = "" + parseInt(Math.random().toFixed(6) * 1.0E+6);
    this.addIdentify();
    this.toggleOptions();
    this.bodyEvent();
    this.selectEvent();
    this.callback = callback;
  }; 
  // 2 定义方法
  DefineOptions.prototype = {
    // 切换选项显示隐藏
    toggleOptions: function () {
      var _this = this;
      this.el.on('click', function (event) {
        event.stopPropagation();
        _this.optionsWrapper.toggle();

        // 隐藏其他的ul
        $('.options-wrapper ul').each(function (index, ele) {
          if ($(ele).data("identy") != _this.randomData) {
            $(ele).hide();
          }
        });

      });

    },
    // 选择列表
    selectEvent: function () {
      var _this = this;
      this.optionsWrapper.find('li').on('click', function () {
        var value = $(this).html();
        _this.el.find('.option-selected').html(value);

        _this.callback && _this.callback(value);

      });
    },
    // 点击body隐藏选项列表
    bodyEvent: function () {
      var _this = this;
      $('body').on('click', function () {
        _this.optionsWrapper.hide();
      });
    },
    // 为当前弹出选项列表ul添加唯一标识
    addIdentify: function () {
      var _this = this;
      _this.optionsWrapper.data("identy", _this.randomData);
    }
  };
  // 3 扩展jquery
    $.fn.extend({
        defineOptions: function (callback) {
            this.each(function(){
                new DefineOptions($(this), callback);
            });
            return $(this);
        } 
    });

}(jQuery);