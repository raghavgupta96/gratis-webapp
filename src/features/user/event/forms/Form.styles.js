const styles = theme => ({
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '45vh'
  },
  eventTextField: {
    width: '90%',
    margin: '16px 0'
  },
  eventDate: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    width: '90%',
    margin: '16px 0'
  },
  datetimepicker: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tags: {
  },
  tagInput: {

  },
  tagInputField: {

  },
  selected: {

  },
  tag: {
  },
  remove: {
    color: 'red'
  },
  suggestions: {

  },
  activeSuggesion: {

  },
  inputfileContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    border: '2px dotted gray',
    position: 'relative'
  },
  inputfile: {
    width: '100%',
    height: '100%',
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    cursor: 'pointer',
    '& + label': {
      fontSize: '1.25em',
      fontWeight: 700,
      display: 'inline-block',
    },
    '&:focus + label': {
      color: 'red'
    }
  }
});

export default styles;
