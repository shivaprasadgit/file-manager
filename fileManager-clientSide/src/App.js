import React from 'react'
import Folder from './components/Folder/index'
import NewFolder from './components/NewFolder/index'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
export default function App() {
  return (
    <>
    <Router>
      <Switch>
          <Route exact path='/' component={Folder}/>
          <Route exact path='/:title/:id' component={Folder}/>
      </Switch>
    </Router>
      
    </>
  )
}
