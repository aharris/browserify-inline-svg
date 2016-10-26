var through2 = require('through2');
var _ = require('lodash');
var fs     = require( 'fs' );

module.exports = function (file) {
    return through2.obj(function (chunk, enc, callback) {
        var string = chunk.toString(),
            regex = /<img(?:.*?)>/g,
            foundImgs = string.match(regex);

        if ( foundImgs ) {
            var foundSvgs =_.filter(foundImgs, function( it ) {
                return _.includes(it, 'data-inline-svg');
            });

            if ( foundSvgs && foundSvgs.length > 0 ) {
                _.each(foundSvgs, function( it ) {
                    var srcMatch = /src=(?:"|\\'|')/;
                    var classMatch = /class=(?:"|\\'|')/;
                    var endMatch = /(?:"|\\'|')/;

                    var filePath = './target/www/app/' + it.split( srcMatch )[1].split( endMatch )[0];
                    var contents = fs.readFileSync(filePath, 'utf8');

                    if ( _.includes(it, 'class="') ) {
                        var classes = it.split( classMatch )[1].split( endMatch )[0];
                        var classString = 'class="' + classes + '" ';

                        contents = contents.replace('<svg', '<svg ' + classString);
                    }

                    string = string.replace( it, contents.trim() );
                });
            }
        }

        this.push(string);

        callback();
    });
};
