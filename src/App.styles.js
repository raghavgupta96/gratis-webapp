const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    fontFamily: 'Arial, sans-serif',
    zIndex: -1
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
