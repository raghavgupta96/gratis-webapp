// To style react-tag-input, see:
// https://stackoverflow.com/questions/40453058/stying-in-react-tag-input
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { WithContext as ReactTags } from 'react-tag-input';
import styles from './Form.styles';

const KeyCodes = {
  comma: 188,
  enter: 13
};

const foodForm = (props) => {
  const {
    classes,
    tagsHandler,
    allergiesHandler,
    event
  } = props;

  const renderTags = () => {
    const tagsProps = {
      classNames: {
        tags: classes.tags,
        tagInput: classes.tagInput,
        tagInputField: classes.tagInputField,
        selected: classes.selected,
        tag: classes.tag,
        remove: classes.remove,
        suggestions: classes.suggestions,
        activeSuggestions: classes.activeSuggestions
      },
      delimiters: [KeyCodes.comma, KeyCodes.enter],
      tags: event.tags,
      suggestions: [ ],
      handleDelete: (index) => {
        const { tags } = props.event;
        tagsHandler(tags.filter((tag, i) => index !== i));
      },
      handleAddition: (tag) => {
        const { tags } = props.event;
        console.log(tags, tag)
        tagsHandler([...tags, tag]);
      },
      handleDrag: (tag, currPos, newPos) => {
        const { tags } = props.event;
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        tagsHandler(newTags);
      }
    };
    return <ReactTags {...tagsProps} />;
  };

  const renderAllergies = () => {
    const allergiesProps = {
      classNames: {
        tags: classes.tags,
        tagInput: classes.tagInput,
        tagInputField: classes.tagInputField,
        selected: classes.selected,
        tag: classes.tag,
        remove: classes.remove,
        suggestions: classes.suggestions,
        activeSuggestions: classes.activeSuggestions
     },
      delimiters: [KeyCodes.comma, KeyCodes.enter],
      tags: event.allergies,
      suggestions: [
        { id: 'DAIRY', text: 'Dairy' },
        { id: 'NUTS', text: 'Nuts' },
        { id: 'MEAT', text: 'Meat' },
        { id: 'VEGAN', text: 'Vegan' },
        { id: 'KOSHER', text: 'Kosher' },
        { id: 'HALAL', text: 'Halal' }
      ],
      handleDelete: (index) => {
        const { allergies } = props.event;
        allergiesHandler(allergies.filter((tag, i) => index !== i));
      },
      handleAddition: (tag) => {
        const { allergies } = props.event;
        allergiesHandler([...allergies, tag]);
      },
      handleDrag: (tag, currPos, newPos) => {
        const { allergies } = props.event;
        const newTags = allergies.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        allergiesHandler(newTags);
      }
    };
    return <ReactTags {...allergiesProps} />
  };

  return (
    <form className={classes.form}>
      {renderTags()}
      {renderAllergies()}
    </form>
  );
};

foodForm.propTypes = {
  newEvent: PropTypes.object,
  handlers: PropTypes.objectOf(PropTypes.func)
};

foodForm.defaultProps = {
  newEvent: null,
  handlers: { }
};

export default withStyles(
  styles,
  { withTheme: true }
)(foodForm);
