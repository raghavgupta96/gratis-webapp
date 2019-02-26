const styles = {
  container: {
    width: '100%',
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layout: {
    height: '85%',
    width: '75%',
    position: 'relative',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flex: 'auto',
    flexFlow: 'column nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  grow: {
    flex: 'auto',
  },
};

export default styles;
