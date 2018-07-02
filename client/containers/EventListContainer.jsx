// event list container
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import Select from 'rc-select';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import { getEvents } from '../actions/actionCreators';
import EventListComponent from '../views/EventListComponent';

class EventListContainer extends React.Component {
  componentDidMount() {
    const parsedQueryString = queryString.parse(location.search);
    const { page, limit } = parsedQueryString;
    this.props.getEvents(page, limit);
  }

  /**
   * @description gets centers based on the param given
   * 
   * @param { number } current current page number
   * @param { number } pageSize pageSize number
   * 
   * @returns { array } list of events taht satisfy the param
   */
  onPageChange = (current, pageSize) => {
    this.props.getEvents(current, pageSize);
  };

  /**
   * @description gets centers when the page buttons are clicked
   * 
   * @param { number } current current page number
   * @param { number } pageSize pageSize number
   * 
   * @returns { array } list of events that satisfy the param
   */
  onShowSizeChange = (current, pageSize) => {
    console.log(current);
    console.log(pageSize);
    this.props.getEvents(current, pageSize);
  }

  render() {
    const { events, match, isFetching, error, paginationData } = this.props;
    return (
      <div>
        <div className="e-list-page">
          <h3>My Events</h3>
          <div className="e-list">
            <EventListComponent
              events={events}
              match={match}
              isFetching={isFetching}
              error={error}
            />
          </div>

          <Pagination
          style={{ display: 'flex', justifyContent: 'center' }}
          current={paginationData.page}
          total={paginationData.count}
          defaultPageSize={9}
          pageSize={9}
          onChange={this.onPageChange}
          selectComponentClass={Select}
          showQuickJumper
          showSizeChanger
          onShowSizeChange={this.onShowSizeChange}
          locale={{"items_per_page": "Items", "skip": "Goto"}}
          className='custom-pagination'
        />

        </div>
        <Link to="/events/add" className="float">
          <i className="fa fa-plus my-float" />
        </Link>
      </div>
    );
  }
}

EventListContainer.propTypes = {
  events: PropTypes.array.isRequired,
  getEvents: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string
};

const mapStateToProps = state => ({
  events: state.eventsReducer.events,
  isFetching: state.eventsReducer.isFetching,
  error: state.eventsReducer.error,
  paginationData: state.centersReducer.paginationData,
});

export default connect(mapStateToProps, {
  getEvents
})(EventListContainer);
