import React from 'react'
import {
  Switch,
  Route,
} from "react-router-dom"
import { Routes, Route as CCORoute  } from "./Routes"

export const AppRouter = (): JSX.Element => (
    <Switch>
      {Routes.map((route: CCORoute) => (
        <Route exact path={route.path} key={route.path}>
          <route.component />
        </Route>
      ))}
    </Switch>
  )