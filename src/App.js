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
import Notification from "./component/Notification";
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
    <Router>
      <header>
        <Link title="Home" to="/" className="App-new">
          Ideate
        </Link>
        {" | "}
        <Link title="Submit a new one" to="/idea-create" className="App-new">
          New
        </Link>
        {" | "}
        {loggedIn && <a title="Log out" href="#" onClick={e => dispatch(doLogout())}>
          Logout
        </a>}
        {!loggedIn && <Link title="Home" to="/signup" className="App-new">
          Get access
        </Link>}
        
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
        <Route path="/signup">
          <NoAccess />
        </Route>
      </Switch>
      <Notification />
    </Router>
  );
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.StrictMode>
            <Load />
          </React.StrictMode>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
