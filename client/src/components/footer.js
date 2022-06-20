import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { Link } from "react-router-dom";
import './assets/css/footer.css'

const styles = {
  iconStyle: {
    justifyContent: 'flex-wrap',
    position: 'fixed',
    bottom: '10px',
    margin: '0px',
    marginRight: '370px',
  },
  copyright: {
    position: 'absolute',
    bottom: '0px',
    width: '100%',
    textAlign: 'center',
    height: '10px',
    left: '0',
    right: '0'
  }
};

// imported "LabelBottomNavigation" to App.js page line 14
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

      <BottomNavigation
        sx={{ width: 500 }}
        value={value}
        onChange={handleChange}
      >
        <p style={styles.copyright}>© 2022 Let's Go All Rights Reserved</p>
        <BottomNavigationAction
          style={styles.iconStyle}
          label="Contact Support"
          value="Support"
          component={Link}
          to="/ContactSupport"
          icon={<ContactSupportIcon />}
        />{" "}
      </BottomNavigation>
  );
}