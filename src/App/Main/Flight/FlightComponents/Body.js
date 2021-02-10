import arrow from "../../../../Assets/Images/arrow.png";
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
        airport={{ uid: "SVO", caption: "ШЕРЕМЕТЬЕВО" }}
        city={{ uid: "MOW", caption: "Москва" }}
      />
      <img src={arrow} alt="до" />
      {/* ARRIVAL */}
      <Cities
        airport={{ uid: "CDG", caption: "ШАРЛЬ ДЕ ГОЛЛЬ" }}
        city={{ uid: "PAR", caption: "ПАРИЖ" }}
      />
    </div>
  );
};

const Time = (props) => {
  return (
    <div className={styles.time}>
      <div className={styles.departs}>
        <h3>20:40</h3>
        <p>18 авг. вт</p>
      </div>
      <div className={styles.inflight}>
        <img src="" alt="" />
        <h3>14ч 45мин</h3>
      </div>
      <div className={styles.arrives}>
        <p>19 авг. ср</p>
        <h3>9:25</h3>
      </div>
      <div className={styles.transit}></div>
    </div>
  );
};

const Body = (props) => {
  return (
    <div className={styles.body}>
      <div className={styles.flight}>
        <Legs />
        <Time />
        <div className={styles.info}></div>
      </div>
    </div>
  );
};
export default Body;
