const path = require('path')
const webpack = require('webpack')
const process = require('process')
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const RemoveStrictPlugin = require('remove-strict-webpack-plugin')

// Overwrite __dirname to support symlinks
__dirname = process.env.PWD


const roots = {
    'assets': {
        'css': {
            'base': 'css/base.scss',
            'challenge-board': 'css/challenge-board.scss',
        },
        'js': {
            'pages/main': 'js/pages/main.js',
            'pages/challenges': 'js/pages/challenges.js',
            'pages/setup': '../../core/assets/js/pages/setup.js',
            'pages/scoreboard': '../../core/assets/js/pages/scoreboard.js',
            'pages/settings': '../../core/assets/js/pages/settings.js',
            'pages/stats': '../../core/assets/js/pages/stats.js',
            'pages/notifications': '../../core/assets/js/pages/notifications.js',
            'pages/teams/private': '../../core/assets/js/pages/teams/private.js',
        }
    },
}

function getJSConfig(root, type, entries, mode) {
    const out = {}
    const ext = mode == 'development' ? 'dev' : 'min'
    const chunk_file = `[name].${ext}.chunk.js`

    for (let key in entries) {
        out[key] = path.resolve(__dirname, root, entries[key])
    }

    return {
        entry: out,
        output: {
            path: path.resolve(__dirname, 'static', type),
            publicPath: '/static/' + type,
            filename: `[name].${ext}.js`,
            chunkFilename: chunk_file,
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    echarts: {
                        name: 'echarts',
                        filename: `echarts.bundle.${ext}.js`,
                        test: /echarts/,
                        priority: 1,
                        enforce: true,
                    },
                    vendor: {
                        name: 'vendor',
                        filename: `vendor.bundle.${ext}.js`,
                        test: /node_modules/,
                        // maxSize: 1024 * 256,
                        enforce: true,
                    },
                    graphs: {
                        name: 'graphs',
                        filename: `graphs.${ext}.js`,
                        test: /graphs/,
                        priority: 1,
                        reuseExistingChunk: true,
                    },
                    helpers: {
                        name: 'helpers',
                        filename: `helpers.${ext}.js`,
                        test: /helpers/,
                        priority: 1,
                        reuseExistingChunk: true,
                    },
                    default: {
                        filename: `core.${ext}.js`,
                        minChunks: 2,
                        priority: -1,
                        reuseExistingChunk: true,
                    },
                },
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    uglifyOptions: {
                        compress: {
                            // Remove console.log in production
                            drop_console: mode === 'production'
                        },
                    },
                }),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                ['@babel/preset-env', { useBuiltIns: 'entry', modules: 'commonjs' }],
                            ],
                        }
                    }
                },
            ],
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new RemoveStrictPlugin(),
        ],
        resolve: {
            extensions: ['.js'],
            alias: {
                hacker: path.resolve(__dirname, 'assets/js/'),
                core: path.resolve(__dirname, '../core/assets/js/'),
            },
        },
    }
}

function getCSSConfig(root, type, entries, mode) {
    const out = {}
    const ext = mode == 'development' ? 'dev' : 'min'
    const ouptut_file = `[name].${ext}.css`
    const chunk_file = `[id].${ext}.css`

    for (let key in entries) {
        out[key] = path.resolve(__dirname, root, entries[key])
    }

    return {
        entry: out,
        output: {
            path: path.resolve(__dirname, 'static', type),
            publicPath: '/static/' + type,
        },
        optimization: {
            minimizer: [
                new OptimizeCssAssetsPlugin({})
            ]
        },
        module: {
            rules: [
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?(#\w+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                publicPath: '../fonts',
                                outputPath: '../fonts',
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?(#\w+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                publicPath: '../img',
                                outputPath: '../img',
                            }
                        }
                    ]
                },
                {
                    test: /\.(s?)css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                            }
                        },
                        {
                            loader: 'string-replace-loader',
                            options: {
                                multiple: [
                                    // Replace core font-faces
                                    { search: "font-face\s*{\s*font-family:\s*[\"']Lato[\"']", replace: "font-face{font-family:'LatoOffline'", flags: 'gm' },
                                    { search: "font-face\s*{\s*font-family:\s*[\"']Raleway[\"']", replace: "font-face{font-family:'RalewayOffline'", flags: 'gm' },
                                    // Replace Font-Awesome font-faces
                                    { search: "font-face\s*{\s*font-family:\s*[\"']Font Awesome 5 Free[\"']", replace: "font-face{font-family:'Font Awesome 5 Free Offline'", flags: 'gm' },
                                    { search: "font-face\s*{\s*font-family:\s*[\"']Font Awesome 5 Brands[\"']", replace: "font-face{font-family:'Font Awesome 5 Brands Offline'", flags: 'gm' },
                                    // Replace Font-Awesome class rules
                                    { search: "far\s*{\s*font-family:\s*[\"']Font Awesome 5 Free[\"']", replace: "far{font-family:'Font Awesome 5 Free','Font Awesome 5 Free Offline'", flags: 'gm' },
                                    { search: "fas\s*{\s*font-family:\s*[\"']Font Awesome 5 Free[\"']", replace: "fas{font-family:'Font Awesome 5 Free','Font Awesome 5 Free Offline'", flags: 'gm' },
                                    { search: "fab\s*{\s*font-family:\s*[\"']Font Awesome 5 Brands[\"']", replace: "fab{font-family:'Font Awesome 5 Brands','Font Awesome 5 Brands Offline'", flags: 'gm' },
                                ],
                                strict: true,
                            }
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                },
            ]
        },
        resolve: {
            extensions: ['.css'],
            alias: {
                core: path.resolve(__dirname, '../core/assets/css/'),
            },
        },
        plugins: [
            new FixStyleOnlyEntriesPlugin(),
            new MiniCssExtractPlugin({
                filename: ouptut_file,
                chunkFilename: chunk_file
            }),
        ],
    }
}

const mapping = {
    'js': getJSConfig,
    'css': getCSSConfig,
}

module.exports = (env, options) => {
    let output = []
    let mode = options.mode
    for (let root in roots) {
        for (let type in roots[root]) {
            let entry = mapping[type](root, type, roots[root][type], mode);
            output.push(entry)
        }
    }
    return output
}
