const styles = {
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '45vh',
    minHeight: '500px',
    minWidth: '300px',
    width: '66vw',
    maxWidth: '650px',
  },
  activeForm: {
  },
  eventTextField: {
    width: '90%',
    margin: '16px 0',
  },
  eventDate: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
    margin: '16px 0',
  },
  datetimePicker: {
    margin: '16px',
  },
  // To style react-tag-input, see:
  // https://stackoverflow.com/questions/40453058/stying-in-react-tag-input
  tags: { },
  tagInput: { },
  tagInputField: { },
  selected: { },
  tag: { },
  remove: { },
  suggestions: { },
  activeSuggesion: { },
  inputfileContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    border: '2px dotted gray',
    position: 'relative',
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
      color: 'red',
    },
  },
};

export default styles;
