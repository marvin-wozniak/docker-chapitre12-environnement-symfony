const Encore = require("@symfony/webpack-encore");
const path = require("path");

Encore.setOutputPath("public/build/")
  .setPublicPath("https://localhost:8080/build")
  .setManifestKeyPrefix("build/")
  .addEntry("app", "./assets/app.ts")
  .addStyleEntry("question_show", "./assets/styles/question_show.scss")
  .splitEntryChunks()
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .copyFiles({
    from: "./assets/images",
    pattern: /\.(png|jpg|jpeg|svg|gif)$/,
    to: "images/[path][name].[ext]",
  })
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = "usage";
    config.corejs = "3.33";
  })
  .enableSassLoader()
  .enableTypeScriptLoader()
  .enableVueLoader();

Encore.configureDevServerOptions((options) => {
  options.server = {
    type: "https",
    options: {
      pfx: path.join(process.env.HOME, ".symfony5/certs/default.p12"),
    },
  };
  options.allowedHosts = "all";
});

module.exports = Encore.getWebpackConfig();
