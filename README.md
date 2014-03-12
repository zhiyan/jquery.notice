# jQuery Notice

jQuery 简单弹出框插件

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/zhiyan/jquery.notice/master/dist/jquery.notice.min.js
[max]: https://raw.github.com/zhiyan/jquery.notice/master/dist/jquery.notice.js

使用方式:

```html
<script src="jquery.js"></script>
<link rel="stylesheet" href="jquery.notice.css">
<script src="jquery.notice.min.js"></script>
...
<script>
$.notice({
    "title":"the title",
    "content" : "the content"
})
</script>
```

## 文档
options
* title 标题
* content 内容（模板），可用包含{{xx}}变量的html
* width 宽度,px,默认auto
* height 高度,px,默认auto
* position 定位方式, absolute/fixed 默认absolute
* esc esc键退出开启，默认true
* type 类型：dialog/notice/modal

## Examples
见/demo

## Release History
_(Nothing yet)_
