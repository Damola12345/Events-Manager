import React from 'react';
import PropTypes from 'prop-types'
import Event from './Event.jsx'

// renders the Event component with two details and delete buttons
const EventItem = ({ event, onCurrentEventClicked, handleDeleteEvent }) => (
  <div style={{ marginBottom: 20 }}>
    <Event
      title={event.title}
      id={event.id}
    />
    <button
      style={{ marginRight: 10 }}
      className='btn btn-outline-primary btn-sm'
      onClick={onCurrentEventClicked}>
      <i className='fa fa-info'></i>
    </button>
    <button
      className='btn btn-outline-danger btn-sm'      
      onClick={handleDeleteEvent}>
        <i className='fa fa-trash'></i>
    </button>
    <hr/>
  </div>
)

EventItem.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }).isRequired,
  onCurrentEventClicked: PropTypes.func.isRequired
}

export default EventItem;