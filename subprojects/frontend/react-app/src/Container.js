import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import App from './App';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import Hidden from "@material-ui/core/Hidden";
import Navigator from "./Navigator";
import Header from "./Header";
import LoginPage from "./app/LoginPage";
import HomePage from "./app/home/HomePage";
import Content from "./Content";
import Box from "@material-ui/core/Box";
import {StateProvider} from "./State";
import {withStyles} from "@material-ui/core/styles";
import Index from "./app/Index";
const drawerWidth = 300;

function Container(props) {
  const {classes} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="js">
          <Navigator
            PaperProps={{style: {width: drawerWidth}}}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <Navigator PaperProps={{style: {width: drawerWidth}}}/>
        </Hidden>
      </nav>
      <div className={classes.app}>
        <Header onDrawerToggle={handleDrawerToggle}/>
        <main className={classes.main}>
          <Route component={App}/>
        </main>
        <footer className={classes.footer}>
          footer
        </footer>
      </div>
    </div>
  )
};

// export default withStyles(styles)(Container);
export default (Container);