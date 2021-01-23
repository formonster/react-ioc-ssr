module.exports = {
    apps: [{
        name: "awilix",
        script: "ts-node",
        args: "app.ts",
        error_file: './log/err.log',
        out_file: './log/out.log',
        log_file: './log/combined.log',
        time: true,
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}