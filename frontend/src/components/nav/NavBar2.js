import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../../assets/sub chef LOGO/Artboard 2.png";
import AppBar from '@material-ui/core/AppBar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Menu, 
        MenuItem,
        IconButton,
        Typography,
        Toolbar } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import '../../styles/Navbar.css';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
        flexGrow: 1,
  },
  headerOptions: {
      display: "flex",
      flex: 1,
      justifyContent: "space-evenly"
  }
}));

const Header = (props) => {
  const { history } = props;
  const { LogOut } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const token = localStorage.getItem('token');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const loggedOutMenuItems = [
      {
          menuTitle: 'Log in',
          pageURL: '/login'
      },
      {
          menuTitle: 'Sign up',
          pageURL: '/signup'
      }
  ]
  return (
    <div className={classes.root}>
      <AppBar className="mb-4" position="static" color="transparent">
        <Toolbar>
          <Typography edge="start" className={classes.menuButton} color="inherit">
            <a href="/"><img className="logo" src={logo} alt="logo"/></a>
          </Typography>
          <Typography variant="h6" className={classes.title}>
              Find Jobs, Get Paid
          </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
            {token ? 
            <div>
                <MenuItem onClick={() => handleMenuClick('/user')}>User</MenuItem>
                <MenuItem onClick={() => handleMenuClick('/companies')}>Companies</MenuItem>
                <MenuItem onClick={() => LogOut()}>Logout</MenuItem>
            </div>        
                : loggedOutMenuItems.map(menuItem => {
                    const { menuTitle, pageURL } = menuItem;
                    return (
                        <MenuItem onClick={() => handleMenuClick(pageURL)}>{menuTitle}</MenuItem>
                        )
                })
            }
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);