import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export default {
  mode: process.env.WEBPACK_SERVE ? "development" : "production",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.[chunkhash].js",
    path: path.resolve(process.cwd(), "dist"),
    clean: true,
  },
  devtool: process.env.WEBPACK_SERVE ? "inline-source-map" : "source-map",
  devServer: {
    port: 9000,
    hot: true,
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
