import React from 'react'

import HomeIcon from '@material-ui/icons/Home'
import MapIcon from '@material-ui/icons/Map'
import { MapEditorPage } from "../containers/MapEditorPage"
import { LandingPage } from "../containers/LandingPage"

export interface Route {
  key: string,
  path: string,
  sidebarName: string,
  component(): JSX.Element,
  Icon: JSX.Element,
}

export const Routes: Route[] = [
  {
    key: 'home',
    path: '/',
    sidebarName: 'Home',
    component: LandingPage,
    Icon: (<HomeIcon/>),
  },
  {
    key: 'map',
    path: '/map',
    sidebarName: 'Map Editor',
    component: MapEditorPage,
    Icon: (<MapIcon/>),
  },
]