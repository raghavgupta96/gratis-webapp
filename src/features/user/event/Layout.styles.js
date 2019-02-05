const styles = theme => ({
  layout: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'auto'
  },
  dialogPaper: {
    width: '75vw',
    maxWidth: '600px',
    minHeight: '66vh',
    maxHeight: '66vh'
  },
  fab: {
    position: 'absolute',
    bottom: '32px',
    right: '32px',
    width:  '72px',
    padding: 0,
    color: 'white',
    borderRadius: '32px'
  }
});

export default styles;
