# [Markdown Edit](http://georgeosddev.github.com/markdown-edit)

This is a online markdown editor/viewer.<br>
This help you to edit markdown document with the power of web technology.

[![Screen Shot](images/ScreenShot.png)](http://georgeosddev.github.com/markdown-edit)

## Quick Start

Try on [Demo](http://georgeosddev.github.com/markdown-edit) page.<br>
Or Install on your local PC. Check [Guide](#on-your-local-pc) to how to install.

## Feature
### Editor
Part of Editor is depend on [CodeMirror](http://codemirror.net/).It enabeles

* Display **line number**.
* **Match Brackets** in the document.
* Visible `Tab` key
* **Highlight syntax** of markdown.
* **Drag and Drop** file read.

For more option, see [programming API](http://codemirror.net/doc/manual.html) of CodeMirror, and Hack [Markdown Edit](http://github.com/georgeosddev/markdown-edit)


#### Option: Use [marked](https://github.com/chjj/marked) as conveter.
If you checked radio `Use marked for conveter` **markdown-edit** use [marked](https://github.com/chjj/marked)
and [highlight.js](http://softwaremaniacs.org/soft/highlight/en/) instad of Github's API.
It is faster than API call and make you enable to use this app at offline.

*NOTICE* : [marked](https://github.com/chjj/marked) does not support Anchor.

### Viewer
To display converted HTML like Github, Markdown-Edit apply github.css from highlight.js and github-style.css inspired by [gollum](https://github.com/gollum/gollum/blob/master/lib/gollum/public/gollum/css/template.css).

```html
<link rel="stylesheet" href="bower_components/highlightjs/styles/github.css">
<link rel="stylesheet" href="css/github-style.css">
```

If you want to see raw html what [Github's API](http://developer.github.com/v3/markdown/#render-a-markdown-document-in-raw-mode) responsed, click `Raw .html` button on navbar.


## Licence

Source code can be found on [github](https://github.com/paraNorth/widget-type-range), licenced under [MIT](http://opensource.org/licenses/mit-license.php).

Developed by [Chris Dorman](https://paraNorth.com)

    
