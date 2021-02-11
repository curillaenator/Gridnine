import Top from "./FlightComponents/Top";
import Body from "./FlightComponents/Body";
import styles from "./flight.module.scss";

const Flight = (props) => {
//   console.log(arr);
  return (
    <div className={styles.flightCard}>
      <Top
        amount={props.flight.flight.price.total.amount}
        carrier={props.flight.flight.carrier}
      />
      <Body legs={props.flight.flight.legs} />
      <button className={styles.submit}>ВЫБРАТЬ</button>
    </div>
  );
};
export default Flight;
