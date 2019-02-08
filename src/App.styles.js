const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
  },
  content: {
    display: 'flex',
    flex: 'auto',
    justifyContent: 'center'
  },
  footer: {
    flex: 'none'
  }
});

export default styles;
