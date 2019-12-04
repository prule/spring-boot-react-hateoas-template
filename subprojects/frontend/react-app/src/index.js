import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/styles';
import theme, {styles} from './theme';
import * as serviceWorker from './serviceWorker';
import {Router} from "react-router";
import history from "./history";
import {StateProvider} from "./State";
import ActionType from "./common/ActionType";
import Wrapper from "./Wrapper";

function Paperbase(props) {
  const {classes} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const initialState = {
    index: null
  };

  const reducer = (state, action: ActionType) => {
    console.log('action', action);
    let func = ActionType.handlerMap[action.type];
    if (func) {
      return func(state, action);
    } else {
      console.error('No handler has been defined for action ', action);
    }
  };

  return (

    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <StateProvider initialState={initialState} reducer={reducer}>

            <Wrapper/>

          </StateProvider>
        </Router>
      </ThemeProvider>
    </BrowserRouter>

  )
}


ReactDOM.render(
  <Paperbase classes={styles}/>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
