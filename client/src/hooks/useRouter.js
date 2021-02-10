import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../containers/views/Admin/Home";
import {ClassroomsPage} from "../containers/views/Admin/ClassroomsPage"
import {ClassroomPage} from "../containers/views/Admin/ClassroomPage"
import { Main } from "../containers/layouts/Main";
import { Admin } from "../containers/layouts/Admin";
import { Login } from "../containers/views/Main/Auth/Login";
import { Register } from "../containers/views/Main/Auth/Register";
import { TestPage } from "../containers/views/Admin/TestPage";



export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Router>
        <Admin>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/classes" exact>
              <ClassroomsPage />
            </Route>
            <Route path="/classroom/:id" exact>
              <ClassroomPage />
            </Route>
            <Route path="/test/:id" exact>
              <TestPage />
            </Route>
          </Switch>
        </Admin>
      </Router>    
    );
  }

  return (
    <Router>
      <Main>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Main>
    </Router>

  );
};
