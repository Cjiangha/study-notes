module.exports = [
    {
        "title": "HTML题：设置网页编码字符集",
        "answer": ["<meta charset=\"UTF-8\"> \ngb2312(缺点：无法识别繁体字)\n gbk(国家标准字符集)\n unicode(万国码)\nUTF-8", "meta charset=\"UTF-8\"", "<meta charset=\"UTF-8\">",
            "meta charset=\"utf-8\"", "<meta charset=\"utf-8\">"]
    },
    {
        "title": "HTML题：斜体标签",
        "answer": ["<em>斜体</em>", "em", "<em>", "<em></em>"]
    },
    {
        "title": "HTML题：删除线标签",
        "answer": ["<del>删除线/中划线</del>", "del", "<del>", "<del></del>"]
    },
    {
        "title": "HTML题：头标签",
        "answer": ["<head></head>", "head", "<head>"]
    },
    {
        "title": "HTML题：标题标签",
        "answer": ["<\"title\">标题</\"title\">", "\"title\"", "<\"title\">", "<\"title\"></\"title\">"]
    },
    {
        "title": "HTML题：有序列表",
        "answer": ["<ol><li><li></ol>", "ol", "<ol>", "<ol></ol>"]
    },
    {
        "title": "HTML题：无序列表",
        "answer": ["<ul><li><li></ul>", "ul", "<ul>", "<ul></ul>"]
    },
    {
        "title": "HTML题：图片标签",
        "answer": ["<img src=\"当文件出错的时候展示的信息\"></img>", "img", "<img src=\"\"/>", "<img src=\"\" alt=\"\"/>"]
    },
    {
        "title": "HTML题：超链接标签",
        "answer": ["<a harf=\"url\" target=\"_blank在新标签页打开\"></a>\n1、超链接 2、锚点  3、打电话  4协议限定符\n<a href=\"tel:电话号码\">打电话</a>\n<a href=\"javascript:while(1){alert('内容')}\">协议限定符</a>\n<a harf=\"#id\">锚点</a>",
            "a", "<a harf=\"\"></a>"]
    },
    {
        "title": "HTML题：input标签文本框的type值是：",
        "answer": ["<input type=\"text\">", "text"]
    },
    {
        "title": "HTML题：input标签文本框的type值是：",
        "answer": ["<input type=\"text\">", "text"]
    },
    {
        "title": "HTML题：input标签密码框的type值是：",
        "answer": ["<input type=\"password\">", "password"]
    },
    {
        "title": "HTML题：input标签普通按钮的type值是：",
        "answer": ["<input type=\"button\">", "button"]
    },
    {
        "title": "HTML题：input标签提交按钮的type值是：",
        "answer": ["<input type=\"submit\">", "submit"]
    },
    {
        "title": "HTML题：input标签单选框的type值是：",
        "answer": ["<input type=\"radio\">", "radio"]
    },
    {
        "title": "HTML题：input标签复选框的type值是：",
        "answer": ["<input type=\"checkbox\">", "checkbox"]
    },
    {
        "title": "HTML题：下拉菜单标签",
        "answer": ["<select name=\"数据名\">\n<option></option>\n</select>", "select option", "select", "option"]
    },
    {
        "title": "HTML题：下拉菜单标签",
        "answer": ["<select><option></option></select>", "select option", "select", "option"]
    },
    {
        "title": "HTML题：表格标签",
        "answer": ["table th tr td\n<table>\n<caption>表格标题</caption>\n<tr><th>table heading 的简称，表示表格的表头</th></tr>\n<tr><td>单元格</td></tr></table>\n\
        <table> 表示表格，表格的所有内容需要写在 <table> 和 </table> 之间。\n\
<tr> 是 table row 的简称，表示表格的行。表格中有多少个 <tr> 标签就表示有多少行数据。\n\
<td> 是 table datacell 的简称，表示表格的单元格，这才是真正存放表格数据的标签。单元格的数据可以是文本、图片、列表、段落、表单、水平线、表格等多种形式。\n\
<th> 是 table heading 的简称，表示表格的表头。<th> 其实是 <td> 单元格的一种变体，本质上还是一种单元格。<th> 一般位于第一行，充当每一列的标题。大多数的浏览器会把表头显示为粗体居中的文本。\n\
默认情况下，表格是没有边框的。但是我们可以使用 <table border=\"1\"> 标签中的 border 属性来设置表格的边框宽度，单位是像素（px）\n\
展示的表格默认为双层边框。为了避免这种情况，我们可以利用 CSS 中的 border-collapse 属性来设置表格的边框。border-collapse 是“边框塌陷”的意思，当属性值为 collapse 时，可以使表格的双边框变为单边框。\n\
<caption> 标签来为表格设置标题，标题用来描述表格的内容。\n\
默认情况下，表格的标题位于整个表格的第一行并且居中显示。一个表格只能有一个标题，也就是说 <table> 标签中只能有一个 <caption> 标签。\n\
rowspan：表示跨行合并。在 HTML 代码中，允许我们使用 rowspan 特性来表明单元格所要跨越的行数。\n\
colspan：表示跨列合并。同样的，在 HTML 中，允许我们使用 colspan 特性来表明单元格所要跨越的列数。\n\
<td rowspan=\"n\">单元格内容</td>\n\
<td colspan=\"n\">单元格内容</td>\n\
", "table", "table th tr td"]
    },
    {
        "title": "HTML题：音频播放器标签",
        "answer": ["<audio controls></audio>\ncontrols 播放控件 如果没有这个属性的话标签display: none","audio"]
    },
    {
        "title": "HTML题：视频播放器标签",
        "answer": ["<video controls></video>\ncontrols 播放控件 如果没有这个属性的话标签display: none","video"]
    },
    {
        "title": "HTML题：内联标签",
        "answer": ["<iframe src=\"\"></iframe>","iframe"]
    }
]