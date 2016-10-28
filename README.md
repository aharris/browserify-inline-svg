# Browerify Inline svg

A browserify plugin to inline svgs directly into your markup.


## How?

Add the browserify plugin and pass in the `basePath`

    var inlineSvg = require('browserify-inline-svg');

    browserify( 'index.js' )
      .bundle()
      .pipe( inlineSvg({
        basePath: './target/www/app/'
      }))
      .pipe(process.stdout);

Add `data-inline-svg` to your image

    <img data-inline-svg class="my-icon" src="assets/icons/my-icon.svg" />

This file will be inlined as full svg code
