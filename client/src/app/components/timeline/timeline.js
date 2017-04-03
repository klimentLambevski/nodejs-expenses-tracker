Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
};

Date.prototype.addMinutes = function (m) {
    this.setTime(this.getTime() + (1 * m * 60 * 1000));
    return this;
};

export class Timeline extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hours: (new Array(24)).fill().map((e, i) => i)
        };

        this.firstElement = null;
    }

    componentDidMount() {
        this.firstElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            console.log( this.mapRecordsToTimeline(nextProps.records));
            return {
                timelineRecords: this.mapRecordsToTimeline(nextProps.records),
            }
        });
    }

    mapRecordsToTimeline(records) {
        return records.reduce((acc, record) => {

            let workedFromHour = new Date(record.workedFrom).getHours();
            let workedToHour = new Date(record.workedTo).getHours();
            let workedFromMinutes = new Date(record.workedFrom).getMinutes();
            let workedToMinutes = new Date(record.workedTo).getMinutes();
            if (!acc[workedFromHour]) {
                acc[workedFromHour] = [];
            }

            acc[workedFromHour].push({
                workedFrom: new Date(record.workedFrom),
                workedTo: new Date(record.workedTo),
                from: (workedFromMinutes / 60) * 100,
                to: (workedToHour - workedFromHour) * 100 + ((workedToMinutes - workedFromMinutes) / 60) * 100,
                id: record.id,
                notes: record.notes
            });
            return acc;
        }, {})
    }

    deleteRecord(record) {
        this.props.deleteRecord(record);
    }

    render() {
        return (
            <div className="timeline-component">
                <div className="timeline-container">
                    <div className="timeline">
                    {
                        this.state.hours.map((hour) => {
                            return (
                                <div
                                    key={hour}
                                    className={"timeline-hour-item"}
                                    ref = {(el) => { hour === 10 ? this.firstElement = el: null; }}
                                    >
                                    <div className="timeline-hour">
                                        {hour}
                                    </div>
                                    <div className="timeline-slot" >
                                        {
                                            this.state.timelineRecords &&
                                            this.state.timelineRecords[hour] &&
                                            this.state.timelineRecords[hour].map((rec, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={
                                                            this.props.workingHours.from <= rec.workedFrom.getHours() &&  this.props.workingHours.to >= rec.workedTo.getHours() ?
                                                                'timeline-record working-time': 'timeline-record'
                                                        }
                                                         style={{height: `${rec.to}%`, top: `${rec.from}%`}}>
                                                        <div className="timeline-record-from">
                                                            From {rec.workedFrom.getHours()}:{rec.workedFrom.getMinutes()}
                                                        </div>
                                                        <div className="timeline-record-notes">
                                                            {rec.notes}
                                                        </div>
                                                        <div className="timeline-record-to">
                                                            To {rec.workedTo.getHours()}:{rec.workedTo.getMinutes()}
                                                        </div>
                                                        <div className="delete-record" onClick={_ => {this.deleteRecord(rec)}}>
                                                            X
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }
}