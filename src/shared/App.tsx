import React from 'react';
import { Link } from "react-router-dom";
import { renderRoutes, RouteConfig } from 'react-router-config'
import routes from "./router";

export default function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      <hr />

      {renderRoutes(routes as RouteConfig[])}
    </div>
  );
}
