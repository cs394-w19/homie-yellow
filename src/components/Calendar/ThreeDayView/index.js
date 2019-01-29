import React from 'react'

import dates from 'date-arithmetic'
import events from '../events'
import BigCalendar from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import ExampleControlSlot from '../ExampleControlSlot'


let CustomView = ({ localizer }) => (
  <React.Fragment>

    <BigCalendar
      events={events}
      localizer={localizer}
      defaultView={BigCalendar.Views.WEEK}
      defaultDate={new Date.today}
      views={{ month: true, week: MyWeek }}
    />
  </React.Fragment>
)

export default CustomView