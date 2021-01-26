import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../../webpack.dev.js';
import chalk from 'chalk';

process.env.NODE_ENV = 'development';
console.log(chalk.blue('Generating minified bundle for development...'));

const compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer);
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(9000, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:9000');
});
