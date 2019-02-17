import React, { Component } from 'react';
import {
  object,
  shape,
  string,
  func,
} from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';

import styles from './Card.styles';

class EventCard extends Component {
  static propTypes = {
    classes: shape({
      card: string,
      image: string,
    }).isRequired,
    event: object.isRequired,
    deleteEvent: func.isRequired,
    editEvent: func.isRequired,
  }

  state = {
    showMenu: false,
    anchorEl: null,
  }

  handlers = {
    handleChange: key => value => this.setState({ [key]: value }),
  }

  render() {
    const {
      classes,
      event,
      deleteEvent,
      editEvent,
    } = this.props;
    const {
      anchorEl,
    } = this.state;
    const {
      handleChange,
    } = this.handlers;

    const moreVertMenu = (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'card-menu' : undefined}
          aria-haspopup="true"
          onClick={e => handleChange('anchorEl')(e.currentTarget)}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="card-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleChange('anchorEl')(null)}
        >
          <MenuItem onClick={() => editEvent()}>Edit</MenuItem>
          <MenuItem onClick={() => deleteEvent()}>Delete</MenuItem>
        </Menu>
      </div>
    );

    return (
      <Card className={classes.card}>
        <CardHeader
          title={event.title}
          subheader={event.startDate.toDate().toDateString()}
          action={moreVertMenu}
        />
        <CardMedia
          className={classes.image}
          image={event.imagePath}
          title="Event Image"
        />
        <CardContent>
          <Typography component="p">
            Code:
            {event.code}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(
  styles,
  { withTheme: true },
)(EventCard);
