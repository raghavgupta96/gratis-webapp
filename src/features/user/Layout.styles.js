const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'row nowrap',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  layout: {
    width: '100%',
    height: '100%'
  },
  appBar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  grow: {
    flexGrow: 1
  },
  logo: {
    width: '64px',
    height: 'auto',
    margin: '8px'
  },
  menuButton: {
    color: 'white'
  }
});

export default styles
