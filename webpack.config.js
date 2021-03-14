const AotPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const CopyPlugin = require('copy-webpack-plugin');

// const ContainerReferencePlugin = require("webpack/lib/container/ContainerReferencePlugin");
// const ContainerPlugin = require("webpack/lib/container/ContainerPlugin");

const shellConfig = {
    entry: ["./travel-booking-shell/src/polyfills.ts", "./travel-booking-shell/src/main.ts"],
    resolve: {
        mainFields: ["browser", "module", "main"]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist/travel-booking-shell"),
        port: 5000
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "@ngtools/webpack" }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            remotes: {
                flightbooking: "flightbooking"
            },
            shared: ["@angular/core", "@angular/common", "@angular/router"]
        }),
        new AotPlugin({
            skipCodeGeneration: false,
            tsConfigPath: "./travel-booking-shell/tsconfig.app.json",
            directTemplateLoading: true,
            entryModule: path.resolve(
                __dirname,
                "./travel-booking-shell/src/app/app.module#AppModule"
            )
        }),
        new CopyPlugin(
            [
                { from: 'travel-booking-shell/src/assets', to: 'assets' }
            ]
        ),
        new HtmlWebpackPlugin({
            template: "./travel-booking-shell/src/index.html"
        })
    ],
    output: {
        filename: "[id].[name].js",
        path: __dirname + "/dist/travel-booking-shell",
        chunkFilename: "[id].[chunkhash].js"
    },
    mode: "production"
};

const mfe1Config = {
    entry: ["./flightbooking/src/polyfills.ts", "./flightbooking/src/main.ts"],
    resolve: {
        mainFields: ["browser", "module", "main"]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist/flightbooking"),
        port: 3000
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "@ngtools/webpack" }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "flightbooking",
            library: { type: "var", name: "flightbooking" },
            filename: "remoteEntry.js",
            exposes: {
                Component: './flightbooking/src/app/app.component.ts',
                Module: './flightbooking/src/app/search/search.module.ts'
            },
            shared: ["@angular/core", "@angular/common", "@angular/router"]
        }),
        new AotPlugin({
            skipCodeGeneration: false,
            tsConfigPath: "./flightbooking/tsconfig.app.json",
            directTemplateLoading: true,
            entryModule: path.resolve(
                __dirname,
                "./flightbooking/src/app/app.module#AppModule"
            )
        }),
        new CopyPlugin([
            { from: 'flightbooking/src/assets', to: 'assets' }
        ]),
        new HtmlWebpackPlugin({
            template: "./flightbooking/src/index.html"
        })
    ],
    output: {
        publicPath: "http://localhost:3000/",
        filename: "[name].js",
        path: __dirname + "/dist/flightbooking",
        chunkFilename: "[id].[chunkhash].js"
    },
    mode: "production"
};

module.exports = [shellConfig, mfe1Config];