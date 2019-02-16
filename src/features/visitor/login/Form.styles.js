const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: '8px',
    padding: '8px',
  },
  form: {
    width: '100%',
    minWidth: '256px',
    maxWidth: '512px',
    '& > *': {
      margin: '8px 0',
    },
  },
  controls: {
    width: '33%',
    minWidth: '128px',
    maxWidth: '152px',
    margin: '8px',
  },
  textField: {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(0, 193, 115, .10)', /* #00C173 w/ alpha=% */
    borderRadius: '8px 8px 0 0',
    border: 'none',
    outline: 'none',
  },
  submitButton: {
    width: '100%',
    padding: '1em',
    color: 'white',
    borderRadius: '32px',
  },
  error: {
    height: '1em',
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
});

export default styles;
