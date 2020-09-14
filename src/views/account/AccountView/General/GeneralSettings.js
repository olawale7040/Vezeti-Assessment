import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import './account.css'
import {
  List,
  ListItem,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {}
}));

const GeneralSettings = ({ className, user, ...rest }) => {
  const classes = useStyles();
  return (
    
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardHeader title="Profile" />
            <Divider />
            <CardContent>
              
        <List>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
           <span className="span-bold">First Name</span>
            <span>{user.firstName}</span>
          </ListItem>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
            <span className="span-bold">Last Name</span>
            <span>{user.lastName}</span>
          </ListItem>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
            <span className="span-bold">Phone number</span>
            <span>{user.phone}</span>
          </ListItem>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
            <span className="span-bold">Account Balance</span>
            <span>{user.userAcountBalance}</span>
          </ListItem>
        </List>
            </CardContent>
            <Divider />
          </Card>
        
  );
};

GeneralSettings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default GeneralSettings;
