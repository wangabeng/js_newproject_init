/*
    ** 图片或视频上传本地预览
 */
!function ($) {
    // 1 定义构造函数
    var Preview = function (el, filetype) {
        this.el = el;
        this.filetype = filetype;
        this.inputEle = el.find('.upload-image');
        this.previewContainer = el.find('.preview-warpper');
        this.bindUpload();
    }; 
    // 2 定义方法
    Preview.prototype = {
        bindUpload: function () {
            var that = this;
            this.inputEle.on('change', function () {
                // 此处上传的文件集合
                var allFiles = this.files;
                // 预览预览容器
                // var previewContainer = $('.preview-warpper');
                // 如果文件不为空 清除之前上传的文件 生成预览
                if (allFiles.length > 0) {
                    that.previewContainer.html('');
                    for (var i = 0; i < allFiles.length; i++) {
                        var fileReader = new FileReader();
                        fileReader.readAsDataURL(allFiles[i]);
                        fileReader.onload = function (e) {
                            // 获取base64的字符串（可以直接上传 在服务器端存储为正常的图片格式）
                            var baseContent = e.target.result.split(',')[1];
                            // 获取文档类型
                            var fileType = e.target.result.split(',')[0].split(':')[1].split(';')[0];

                            console.log(fileType);
                            // 当图片格式是jpg或png的时候 才执行
                            if (that.filetype == 'img') {
                                // 把图片追加到dom中
                                var liEle = document.createElement("li");
                                var newImageWrapper = document.createElement("img");
                                $(newImageWrapper).attr('src', e.target.result);
                                liEle.append(newImageWrapper);
                                that.previewContainer.append(liEle);                                
                            } else if (that.filetype == 'video') {
                                // 把video追加到dom中
                                var liEle = document.createElement("li");
                                var newImageWrapper = document.createElement("video");
                                $(newImageWrapper).attr({'src': e.target.result, controls: 'controls', poster: './img/video.jpg'});
                                liEle.append(newImageWrapper);
                                that.previewContainer.append(liEle);
                            } else {
                                // alert('请上传jpg或png格式的图片');
                                layer.tips('请上传符合要求的文件', '.upload-wrapper');
                            }

                        }
                    }                    
                }
            });
        }
    };
    // 3 扩展jquery
    $.fn.extend({
        previewPic: function (filetype) {
            this.each(function(){
                new Preview($(this), filetype);
            });
            return $(this);
        } 
    });

}(jQuery);