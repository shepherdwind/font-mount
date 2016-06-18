### font-mount

To install some font for linux system. For example, If you use phantomjs to capture
web contents, you may face the problem that Linux do not have any font default.

This package is to solve this problem.

### How to work

- https://wiki.debian.org/Fonts
- https://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-x-fonts.html

From those wiki, we can install fonts just two step:

1. Copy font to user dir `~/.fonts/`
2. Run `fc-cache` to update font config

After those step, you can use what ever font you like.

For example https://github.com/adobe-fonts/source-han-sans , which open source
fonts, and support cjk fonts.

### How to use

```js
const fontMount = require('font-mount');
fontMount('/path/fonts/SourceHanSansHWSC-Regular.otf');

// or
fontMount({
  fontSource: '/path/fonts/SourceHanSansHWSC-Regular.otf',
  fontName: 'SourceHanSansHWSC-Regular.otf',
  fontDist: '~/.fonts/',
});
```
