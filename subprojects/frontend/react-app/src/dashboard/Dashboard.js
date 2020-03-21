import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {secondaryListItems} from './listItems';
import {useStateValue} from '../State';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Routes from "../Routes";
import {Route, useHistory} from 'react-router-dom'
import Api from "../Api";
import HomePage from "../app/home/HomePage";
import PersonsPage from "../app/person/PersonsPage";
// import PersonPage from "../app/person/PersonPage";
// import PersonPetPage from "../app/person/PersonPetPage";
import Content from "../Content";
import LoginPage from "../app/LoginPage"; // IMPORT withRouter

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [competitions, setCompetitions] = React.useState([]);
  const [{title}, dispatch] = useStateValue();
  const history = useHistory();

  React.useEffect(() => {
    dispatch({
      type: 'changeTitle',
      title: 'Template'
    });
  }, []);


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  console.log('rendering dashboard');
  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon/>
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {title}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon/>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <List>
          <ListItem button className={classes.nested}>
            <ListItemText inset secondary="Competition Planner"/>
          </ListItem>
          <List component="div" disablePadding>
            {Object.keys(competitions).map( (key)=> {
              const competition = competitions[key];
              return (
                <ListItem key={competition.id} button className={classes.nested} onClick={() => Routes.main.competitionPlanner(competition.id).navigate(history)}>
                  <ListItemIcon>
                    <AssignmentIcon/>
                  </ListItemIcon>
                  <ListItemText primary={competition.meta.name ? competition.meta.name : 'Unnamed'}/>
                </ListItem>
              )
            })}
            <ListItem button className={classes.nested} >
              <ListItemIcon>
                <LibraryAddIcon/>
              </ListItemIcon>
              <ListItemText secondary="Owners"  onClick={() => Routes.person.persons().navigate(history)} />
              <ListItemText secondary="Logout"/>

            </ListItem>
          </List>
        </List>
        <Divider/>
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            {/*<Grid item xs={12} md={8} lg={9}>*/}
            {/*  <Paper className={fixedHeightPaper}>*/}
            {/*    <Chart/>*/}
            {/*  </Paper>*/}
            {/*</Grid>*/}
            {/* Recent Deposits */}
            {/*<Grid item xs={12} md={4} lg={3}>*/}
            {/*  <Paper className={fixedHeightPaper}>*/}
            {/*    <Deposits/>*/}
            {/*  </Paper>*/}
            {/*</Grid>*/}
            {/* Recent Orders */}
            {/*<Grid item xs={12}>*/}
            {/*  <Paper className={classes.paper}>*/}
            {/*    <Orders/>*/}
            {/*  </Paper>*/}
            {/*</Grid>*/}

            <Grid item xs={12}>
              <Route exact path="/app" component={HomePage}/>
              <Route exact path="/app/persons" component={PersonsPage}/>
              {/*<Route exact path="/app/persons/:key" component={PersonPage}/>*/}
              {/*<Route exact path="/app/persons/:personKey/pets/:petKey" component={PersonPetPage}/>*/}

            </Grid>
          </Grid>

        </Container>
      </main>
    </div>
  );
}
