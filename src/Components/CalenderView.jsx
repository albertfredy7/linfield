import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { enUS } from 'date-fns/locale';

function CalendarView() {
 return (
    <div className="calendar  text-gray-900">
      <Calendar
        className="react-calendar"
        onChange={(value) => console.log(value)}
        locale={enUS}
      />
    </div>
 );
}

export default CalendarView;
