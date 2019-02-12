const styles = theme => ({
  navLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    margin: '8px 0',
  },
  activeNavLink: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
  },
});

export default styles;
