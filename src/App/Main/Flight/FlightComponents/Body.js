import arrow from "../../../../Assets/Images/arrow.png";
import clock from "../../../../Assets/Images/clock.png";
import styles from "../flight.module.scss";

const Cities = (props) => {
  return (
    <div className={styles.city}>
      <h3>
        {props.city.caption}, {props.airport.caption}
      </h3>
      <p>({props.airport.uid})</p>
    </div>
  );
};

const Legs = (props) => {
  return (
    <div className={styles.legs}>
      {/* DEPARTURE */}
      <Cities
        airport={props.segments[0].departureAirport}
        city={props.segments[0].departureCity}
      />
      <img src={arrow} alt="до" />
      {/* ARRIVAL */}
      <Cities
        airport={props.segments[1].arrivalAirport}
        city={props.segments[1].arrivalCity}
      />
    </div>
  );
};

const Time = (props) => {
  const departs = new Date(props.segments[0].departureDate);
  const arrives = new Date(props.segments[1].arrivalDate);

  const opts = {
    time: { hour: "numeric", minute: "numeric" },
    date: { month: "short", day: "numeric" },
    day: { weekday: "short" },
  };

  const getTime = (date, opt) => date.toLocaleString("ru", opt);
  const duration = (mins) => `${Math.trunc(mins / 60)} ч ${mins % 60} мин`;

  return (
    <>
      <div className={styles.time}>
        <div className={styles.timeline}>
          <div className={styles.departs}>
            <h3>{getTime(departs, opts.time)}</h3>
            <p>
              {getTime(departs, opts.date)} {getTime(departs, opts.day)}
            </p>
          </div>

          <div className={styles.inflight}>
            <img src={clock} alt="время" />
            <h3>{duration(props.duration)}</h3>
          </div>

          <div className={styles.arrives}>
            <p>
              {getTime(arrives, opts.date)} {getTime(arrives, opts.day)}
            </p>
            <h3>{getTime(arrives, opts.time)}</h3>
          </div>
        </div>

        {props.isTransfer && (
          <div className={styles.transit}>
            <p>1 пересадка</p>
            <div className={styles.line}></div>
          </div>
        )}
      </div>
    </>
  );
};

const Info = (props) => {
//   console.log(props.segments[0].airline.caption);
  //   console.log(props.segments[1].airline);
  return (
    <div className={styles.info}>
      <p>Рейс выполняет: {props.segments[0].airline.caption}</p>
    </div>
  );
};

const Card = (props) => {
  //   console.log(props.seg);

  return (
    <div className={styles.body} key={props.seg}>
      <div className={styles.flight}>
        <Legs segments={props.seg.segments} />
        <Time
          duration={props.seg.duration}
          segments={props.seg.segments}
          isTransfer={true}
        />
        <Info segments={props.seg.segments} />
      </div>
    </div>
  );
};

const Body = (props) => {
  //   console.log(props);
  return props.legs.map((seg, i) => <Card seg={seg} key={i} />);
};
export default Body;
