import React, { useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import General from './General';
import ForgotPin from './General/ForgotPin';
import Security from './Security';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const AccountView = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('profile');

  const tabs = [
    { value: 'profile', label: 'Profile' },
    { value: 'forgotpin', label: 'Forgot Pin' },
    { value: 'changeemail', label: 'Change Email' },
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>

        <Divider />
        <Box mt={3}>
          {currentTab === 'profile' && <General />}
          {currentTab === 'forgotpin' && <Security />}
          {currentTab === 'changeemail' && <ForgotPin />}
        </Box>
      </Container>
    </Page>
  );
};

export default AccountView;
