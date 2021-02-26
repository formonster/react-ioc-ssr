import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config'
import routes from "./router";

export default function App() {
  return (
    <div>
      {renderRoutes(routes as RouteConfig[])}
    </div>
  );
}
