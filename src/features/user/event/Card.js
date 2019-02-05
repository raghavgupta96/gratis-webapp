import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

import styles from './Card.styles';

const card = (props) => {
  const { event } = props;

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
  return null;
};

export default withStyles(
  styles,
  { withTheme: true }
)(card);
