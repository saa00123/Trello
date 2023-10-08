const webpack = require("webpack");

module.exports = {
  configureWebpack: {
    entry: "./src/main.js",
    output: {
      filename: "build.js",
    },
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
      },
      extensions: ["*", ".js", ".vue", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[ext]?[hash]",
            },
          },
        },
      ],
    },
    devtool:
      process.env.NODE_ENV === "production"
        ? "#source-map"
        : "#eval-source-map",
    plugins:
      process.env.NODE_ENV === "production"
        ? [
            new webpack.DefinePlugin({
              "process.env": {
                NODE_ENV: '"production"',
              },
            }),
            new webpack.optimize.UglifyJsPlugin({
              sourceMap: true,
              compress: {
                warnings: false,
              },
            }),
            new webpack.LoaderOptionsPlugin({
              minimize: true,
            }),
          ]
        : [],
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        // modify the options...
        return options;
      });

    config.module
      .rule("js")
      .exclude.add(/node_modules/)
      .end()
      .use("babel-loader")
      .loader("babel-loader");
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
  },
  performance: {
    hints: false,
  },
};
