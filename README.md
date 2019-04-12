# js_newproject_init
新项目初始化设置 用jauery 插件

# 字符串转dom
```
// parseDom("<div><a>test</a></div>")
 function parseDom(arg) {

　　 var objE = document.createElement("div");

　　 objE.innerHTML = arg;

　　 return objE.childNodes;

};
```
