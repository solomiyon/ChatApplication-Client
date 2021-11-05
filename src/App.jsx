import "antd/dist/antd.css";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from './pages/SignUp/SignUp';
import MyProfile from './pages/UserProfile/MyProfile';
import Chat from "./pages/Chat/Chat";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile" component={MyProfile} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
