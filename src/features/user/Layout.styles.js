const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'row nowrap',
    width: '100%',
    height: '100%'
  },
  layout: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
    height: '100%'
  },
  logo: {
    width: '175px',
    height: 'auto',
    padding: '32px'
  },
  signOutButton: {
    width: '100%',
    fontSize: '1.25em',
    margin: '16px 0',
    padding: '16px 0',
    color: 'white',
    backgroundColor: '#2E3823'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  menuButton: {
    color: 'white'
  },
  logoutButton: {
    color: 'white'
  },
  drawer: {
    height: '100%'
  },
  drawerProfile: {
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: '8px 16px',
    backgroundColor: theme.palette.secondary.light
  },
  navLinks: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: '16px 0'
  },
  navLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    padding: '8px 0'
  },
  activeNavLink: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main
  }
});

export default styles
