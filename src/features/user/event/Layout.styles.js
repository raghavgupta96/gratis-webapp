const styles = {
  layout: {
    width: '100%',
    height: '95%',
    paddingBottom: '64px',
    overflowY: 'auto',
  },
  content: {
    display: 'grid',
    justifyItems: 'center',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  },
  grow: {
    flex: 'auto',
  },
  fade: {
    width: '100%',
    height: '32px',
    bottom: '0',
    position: 'absolute',
    backgroundImage: 'linear-gradient(to bottom, rgba(250, 250, 250, 0), rgba(250, 250, 250, 1))',
  },
  fab: {
    position: 'absolute',
    bottom: '32px',
    right: '32px',
    width: '72px',
    padding: 0,
    color: 'white',
    borderRadius: '32px',
  },
};

export default styles;
