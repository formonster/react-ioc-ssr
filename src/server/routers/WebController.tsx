import fs from "fs";
import React from "react";
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from "react-router-dom";
import { GET, route } from "awilix-koa";
import Router from "@koa/router";

import routes from '../../shared/router';
import { getState } from "../../shared/store";
import App from '../../shared/App';
import config from '../../../config';

const readTemplate = (path: string) => fs.readFileSync(path, 'utf8').toString();
const template = readTemplate(config.template);
function createHtml(props: { HTML: string, STORE: string }) {
    return template
        .replace('__HTML__', props.HTML)
        .replace('__STORE__', props.STORE);
}

@route('/*')
class ApiController {
    @route('/')
    @GET()
    async page(ctx: Router.RouterContext, next: () => Promise<unknown>): Promise<any> {
        const url = ctx.req.url;
        if (url.includes("/api")) {
            await next();
        } else {
            const route = routes.find(route => matchPath(url, route));
            if (route && route.loadData) await route.loadData(route.statePath);
            const html = ReactDOMServer.renderToString(<StaticRouter location={ctx.req.url}><App /></StaticRouter>)
            ctx.body = createHtml({ HTML: html, STORE: JSON.stringify(getState().pageState || {}) });
        }
    }
}

export default ApiController;