// const path = require("path");

// module.exports = {
//     webpack(config) {
//         const wasmExtensionRegExp = /\.wasm$/;

//         config.resolve.extensions.push('.wasm');

//         config.module.rules.forEach(rule => {
//             (rule.oneOf || []).forEach(oneOf => {
//                 if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
//                     // make file-loader ignore WASM files
//                     oneOf.exclude.push(wasmExtensionRegExp);
//                 }
//             });
//         });

//         // add a dedicated loader for WASM
//         config.module.rules.push({
//             test: wasmExtensionRegExp,
//             include: path.resolve(__dirname, 'src'),
//             use: [{ loader: require.resolve('wasm-loader'), options: {} }]
//         });

//         return config;
//     },
// }

module.exports = {
    webpack(config) {
        config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'
        return config
    },
}