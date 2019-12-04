import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import App from './App';
import theme, {drawerWidth, styles} from './theme';
import * as serviceWorker from './serviceWorker';
import Hidden from "@material-ui/core/Hidden";
import Navigator from "./Navigator";
import Header from "./Header";
import LoginPage from "./app/LoginPage";
import HomePage from "./app/home/HomePage";
import Content from "./Content";
import Box from "@material-ui/core/Box";

function Container(props) {
  const {classes} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (

    <BrowserRouter>
      <ThemeProvider theme={theme}>

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
      </ThemeProvider>
    </BrowserRouter>

    // <ThemeProvider theme={theme}>
    //   <BrowserRouter>
    //     <CssBaseline />
    //     <Route component={App}/>
    //   </BrowserRouter>
    // </ThemeProvider>
    // , document.getElementById('root')
  )
};


ReactDOM.render(
  <Paperbase classes={styles}/>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
