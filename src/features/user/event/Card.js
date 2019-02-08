import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { withStyles } from '@material-ui/core/styles';
import styles from './Card.styles';

const eventCard = (props) => {
  const {
    classes,
    event,
    deleteEvent,
    editEvent
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
        <Button
        > Details
        </Button>
        <Button
          onClick={editEvent}
        > Edit
        </Button>
        <Button
          onClick={deleteEvent}
        > Delete
        </Button>
      </CardActions>
    </Card>
  );

  /*
  // Include time
  // see https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
  const dateToString = (d) => {
    const weekDays = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Nov',
      'Dec'
    ];
    const weekDay = weekDays[d.getDay()];
    const month = months[d.getMonth()];
    const day = d.getDate();

    return `${weekDay}, ${month} ${day}`;
  };

  return (Object.keys(event).length > 0)
    ? (
      <div className="EventCard">
        {event.imgSrc
          ? (
            <img
              src={event.imgInfo[0].downloadURL}
              width="300px"
              height="200px"
              alt={`${event.title}`}
            />)
          : <div className="EventCardNoImage"> <span>No Image</span> </div>
        }

        <p>{event.title}</p>
        <p>On {dateToString(event.startDate.toDate())}</p>
        <p>Till {dateToString(event.endDate.toDate())}</p>
      </div>)
    : null;
  */
};

export default withStyles(
  styles,
  { withTheme: true }
)(eventCard);
