module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? './++resource++bise-maes/'
    : '/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        const oldTP = args[0].templateParameters;
        args[0].templateParameters = (compilation, assets, pluginOptions) => {
          pluginOptions.minify = {
            ...pluginOptions.minify,
            removeAttributeQuotes: false
          };
          return oldTP(compilation, assets, pluginOptions);
        };
        return args;
      })
  }
};