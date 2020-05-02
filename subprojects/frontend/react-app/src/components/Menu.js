import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import React from "react";
import PropTypes from "prop-types";

export default function Menu(props) {

  const classes = props.classes;
  const key = props.menuKey;

  return (
    <List>
      <ListItem className={classes.nested}>
        <ListItemText inset secondary={props.title}/>
      </ListItem>

      <List component="div" disablePadding>
        {props.items.map((item, index) => {
          return (
            <ListItem button className={classes.nested} onClick={item.onClick} key={`${key}-${index}`}>
              {item.icon &&
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              }
              <ListItemText secondary={item.name}/>
            </ListItem>
          )
        })}
      </List>
    </List>
  );

}

Menu.propTypes = {
  menuKey: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.array,
  classes: PropTypes.any
};
