import * as webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const devServer: DevServerConfiguration = {
    host: '0.0.0.0',
    port: 3000,
    hot: 'only',
    historyApiFallback: true, // will redirect 404s to /index.html, needed for client-side-routing
    static: false,
};

const config: webpack.Configuration = merge(common, {
    output: {
        publicPath: 'http://localhost:3000/',
    },
    mode: 'development',
    devtool: 'eval-source-map',
    stats: 'minimal',
    devServer,
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom', // see https://github.com/gaearon/react-hot-loader/issues/1227
        },
    },
});

export default config;
