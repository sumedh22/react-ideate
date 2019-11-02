import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

//pages
import Dashboard from "./page/Dashboard";
import Landing from "./page/Landing";
import IdeaCreate from "./page/IdeaCreate";
import IdeaDetail from "./page/IdeaDetail";
import NoAccess from "./page/NoAccess";

//components
import DayNightMode from "./component/Mode";

//redux
import getStoreAndPersistor from "./state/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { doLogout } from "./state/action";
const { store, persistor } = getStoreAndPersistor();

function Load() {
  const loggedIn = useSelector(state => state.user.loggedIn, shallowEqual);
  const dispatch = useDispatch();
  return (
    <>
      {!loggedIn && <><header><DayNightMode /></header><NoAccess /></>}
      {loggedIn && (
        <Router>
          <header>
            <Link title="Home" to="/" className="App-new">
              Home
            </Link>
            {" | "}
            <Link
              title="Submit a new one"
              to="/idea-create"
              className="App-new"
            >
              new
            </Link>
            {" | "}
            <a title="Log out" href="#" onClick={e => dispatch(doLogout())}>
              logout
            </a>
            {" | "}
            <DayNightMode />
          </header>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/idea-create">
              <IdeaCreate />
            </Route>
            <Route path="/idea-detail/:id">
              <IdeaDetail />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Load />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
