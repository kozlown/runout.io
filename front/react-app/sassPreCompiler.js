const sass = require('node-sass')
const fs   = require('fs')

const sassPreCompiler = {
    execute: () => {
        sass.render(
            {
                file          : __dirname + '/src/stylesheet/sass/index.sass',
                indentedSyntax: true
            },
            (err, result) => {
                if (err) {
                    console.error(err);
                    return
                }
                fs.writeFile(__dirname + '/src/stylesheet/css/index.css', result.css, function(err){
                    if(err){
                        console.error(err);
                    }
                    else {
                        console.log('SASS Pre-Compilation successfully terminated.');
                    }
                });
            }
        )
    }
}

sassPreCompiler.execute()
