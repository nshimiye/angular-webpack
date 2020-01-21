const {AngularCompilerPlugin} = require('@ngtools/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/main.aot.ts',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                use: '@ngtools/webpack'
            },
            {
                test: /\.(html|css)$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new AngularCompilerPlugin({
            tsConfigPath: './tsconfig.json',
            entryModule: './src/app/app.module#AppModule',
            // sourceMap: true
        }),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
    ],
    optimization: {
        noEmitOnErrors: true,
        minimizer: [
            new UglifyJsPlugin({
                  minify(file, sourceMap) {
                    // https://github.com/mishoo/UglifyJS2#minify-options
                    const uglifyJsOptions = {
                      /* your `uglify-js` package options */
                      output: {
                        comments: false,
                      },
                    };
          
                    if (sourceMap) {
                      uglifyJsOptions.sourceMap = {
                        content: sourceMap,
                      };
                    }
          
                    return require('terser').minify(file, uglifyJsOptions);
                  },
            }),
        ]
    }
}