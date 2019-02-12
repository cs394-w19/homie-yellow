import React from 'react'

import dates from 'date-arithmetic'
import BigCalendar from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import moment from 'moment'

import './index.scss';

// the css isn't applying for whatever reason

class MyWeek extends React.Component {
  render() {
    let { date } = this.props
    let range = MyWeek.range(date)

    return <TimeGrid {...this.props} range={range} eventOffset={15} />
  }
}

MyWeek.range = date => {
  let start = date;
  let end = dates.add(start, 2, 'day');
  let current = start;
  let range = [];

  while (dates.lte(current, end, 'day')) {
    range.push(current);
    current = dates.add(current, 1, 'day');
  };
  return range;
}

MyWeek.navigate = (date, action) => {
  switch (action) {
    case BigCalendar.Navigate.PREVIOUS:
      return dates.add(date, -3, 'day');
    case BigCalendar.Navigate.NEXT:
      return dates.add(date, 3, 'day');
    default:
      return date;
  }
}

MyWeek.title = date => {
  return `${moment(date).format("MMM D")} - ${moment(dates.add(date, 3, 'day')).format("D")}`;
}

export default MyWeek;
