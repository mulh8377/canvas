import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import _ from 'lodash';

import { Skeleton } from '/components/skeleton';
import { Hexagons } from "/components/hexagons"
import { NewScreen } from "/components/new"

import { store } from '/store';
import { api } from '/api';


export class Root extends Component {
  constructor(props) {
    super(props);
    this.state = store.state;
    store.setStateHandler(this.setState.bind(this));
  }

  render() {
    const { props, state } = this;
    let canvasList = !!state.canvasList ? state.canvasList : {};
    return (
      <BrowserRouter>
        <div className="absolute h-100 w-100 bg-gray0-d ph4-m ph4-l ph4-xl pb4-m pb4-l pb4-xl">
          <Route exact path="/~canvas"
            render={ () => {
              return (
                <Skeleton
                  activeDrawer="canvas"
                  history={props.history}
                  canvasList={canvasList}/>
              )}} />
          <Route exact path="/~canvas/new"
              render={ (props) => {
                return (
                  <Skeleton
                    history={props.history}
                    canvasList={canvasList}
                    activeDrawer="rightPanel">
                    <NewScreen
                      history={props.history}
                      api={api}
                    />
                  </Skeleton>
                );
            }} />
          <Route exact path="/~canvas/item/:name"
              render={ (props) => {
                const name =  props.match.params.name;
                if (canvasList) {
                  let canvas;
                  let data = !!canvasList[name] ? canvasList[name].data : {};
                  let canvasType = !!canvasList[name] ? canvasList[name].type : "";
                  switch (canvasType) {
                    case 'mesh':
                      canvas = <Hexagons api={api} canvas={data} name={name} />;
                      break;
                    case 'map': canvas = null; break;
                    default: canvas = null;
                  }
                  console.log(canvas);
                  return (
                    <Skeleton
                      history={props.history}
                      canvasList={canvasList}
                      activeDrawer="rightPanel">
                      {canvas}
                    </Skeleton>
                  );
                }
            }} />
        </div>
      </BrowserRouter>
    )
  }
}