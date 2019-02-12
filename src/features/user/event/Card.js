import React from 'react';
import {
  object,
  shape,
  string,
  func,
} from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { withStyles } from '@material-ui/core/styles';

import styles from './Card.styles';

const propTypes = {
  classes: shape({
    card: string,
    image: string,
  }).isRequired,
  event: object.isRequired,
  deleteEvent: func.isRequired,
  editEvent: func.isRequired,
};

const eventCard = (props) => {
  const {
    classes,
    event,
    deleteEvent,
    editEvent,
  } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        title={event.title}
        subheader={event.startDate.toDate().toDateString()}
      />
      <CardMedia
        className={classes.image}
        image={event.imagePath}
        title="Event Image"
      />
      <CardContent>
        <Typography component="p">
          {event.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button>
        Details
        </Button>
        <Button
          onClick={editEvent}
        >
        Edit
        </Button>
        <Button
          onClick={deleteEvent}
        >
        Delete
        </Button>
      </CardActions>
    </Card>
  );
};

eventCard.propTypes = propTypes;

export default withStyles(
  styles,
  { withTheme: true },
)(eventCard);
