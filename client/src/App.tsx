import React from 'react'
import {
  BrowserRouter,
} from "react-router-dom"

import { DrawerContainerWithRouter } from "./containers/DrawerContainer"

export const App = (): JSX.Element => (
  <BrowserRouter>
    <DrawerContainerWithRouter />
  </BrowserRouter>
)
