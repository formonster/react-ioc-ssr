const path = require("path");

var config = {
    staticDir: path.join(__dirname, '../../', 'assets'),
    buildDir: path.join(__dirname, '../../', 'build'),
    template: path.join(__dirname, '../../', 'build/index.html'),
    port: 4400,
    serverRoot: "http://localhost:7007/cheese"
}

export default config;