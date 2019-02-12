import React from 'react';
import {
  object,
  shape,
  func,
  string,
} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { WithContext as ReactTags } from 'react-tag-input';

import styles from './Form.styles';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const propTypes = {
  classes: shape({
    tags: string,
    tagInput: string,
    tagInputField: string,
    selected: string,
    tag: string,
    remove: string,
    suggestions: string,
    activeSuggestions: string,
  }).isRequired,
  tagsHandler: func.isRequired,
  allergiesHandler: func.isRequired,
  event: object.isRequired,
};

const foodForm = (props) => {
  const {
    classes,
    tagsHandler,
    allergiesHandler,
    event,
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
        activeSuggestions: classes.activeSuggestions,
      },
      delimiters: [KeyCodes.comma, KeyCodes.enter],
      tags: event.tags,
      suggestions: [],
      handleDelete: (index) => {
        const { tags } = props.event;
        tagsHandler(tags.filter((tag, i) => index !== i));
      },
      handleAddition: (tag) => {
        const { tags } = props.event;
        tagsHandler([...tags, tag]);
      },
      handleDrag: (tag, currPos, newPos) => {
        const { tags } = props.event;
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        tagsHandler(newTags);
      },
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
        activeSuggestions: classes.activeSuggestions,
      },
      delimiters: [KeyCodes.comma, KeyCodes.enter],
      tags: event.allergies,
      suggestions: [
        { id: 'DAIRY', text: 'Dairy' },
        { id: 'NUTS', text: 'Nuts' },
        { id: 'MEAT', text: 'Meat' },
        { id: 'VEGAN', text: 'Vegan' },
        { id: 'KOSHER', text: 'Kosher' },
        { id: 'HALAL', text: 'Halal' },
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
      },
    };
    return <ReactTags {...allergiesProps} />;
  };

  return (
    <form className={classes.form}>
      {renderTags()}
      {renderAllergies()}
    </form>
  );
};

foodForm.propTypes = propTypes;

export default withStyles(
  styles,
  { withTheme: true },
)(foodForm);
