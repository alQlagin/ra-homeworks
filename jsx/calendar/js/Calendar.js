class Calendar extends React.Component {

    render() {
        const currentDate = this.props.date;
        return <div className="ui-datepicker">
            <CalendarMaterialHeader date={currentDate}/>
            <CalendarHeader date={currentDate}/>
            <CalendarTable date={currentDate}/>
        </div>
    }

    renderCurrentDate(dateMoment) {

    }
}

class CalendarMaterialHeader extends React.Component {
    render() {
        const [day, month, year, dayOfWeek] = moment(this.props.date).format('D MMMM YYYY dddd').split(' ');
        return <div className="ui-datepicker-material-header">
            <div className="ui-datepicker-material-day">{dayOfWeek}</div>
            <div className="ui-datepicker-material-date">
                <div className="ui-datepicker-material-day-num">{day}</div>
                <div className="ui-datepicker-material-month">{month}</div>
                <div className="ui-datepicker-material-year">{year}</div>
            </div>
        </div>
    }
}

class CalendarHeader extends React.Component {
    render() {
        const [month, year] = moment(this.props.date).format('MMMM YYYY').split(' ');
        return <div className="ui-datepicker-header">
            <div className="ui-datepicker-title">
                <span className="ui-datepicker-month">{month}</span>&nbsp;
                <span className="ui-datepicker-year">{year}</span>
            </div>
        </div>
    }
}

class CalendarTable extends React.Component {
    render() {
        return <table className="ui-datepicker-calendar">
            {this.colsGroup}
            {this.head}
            <tbody>
            {this.getTableRows(this.props.date)}
            </tbody>
        </table>
    }

    getTableRows(date) {

        const today = moment(date);
        const rows = [];
        const _date = today.clone().startOf('month').startOf('week');
        while (_date.month() <= today.month()) {
            const row = [];
            do {
                row.push(
                    <td className={!today.isSame(_date, 'month') ? 'ui-datepicker-other-month' : ''}>
                        {_date.date()}
                    </td>
                );
                _date.add(1, 'day');
            } while (row.length < 7);
            rows.push(row);
        }
        return rows.map(row => <tr>{row}</tr>)
    }

    get colsGroup() {
        return <colgroup>
            <col/>
            <col/>
            <col/>
            <col/>
            <col/>
            <col className=" ui-datepicker-week-end"/>
            <col className=" ui-datepicker-week-end"/>
        </colgroup>
    }

    get head() {
        return <thead>
        <tr>
            <th scope=" col" title=" Понедельник">Пн</th>
            <th scope=" col" title=" Вторник">Вт</th>
            <th scope=" col" title=" Среда">Ср</th>
            <th scope=" col" title=" Четверг">Чт</th>
            <th scope=" col" title=" Пятница">Пт</th>
            <th scope=" col" title=" Суббота">Сб</th>
            <th scope=" col" title=" Воскресенье">Вс</th>
        </tr>
        </thead>
    }
}