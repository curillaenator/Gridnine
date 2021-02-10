import Top from "./FlightComponents/Top";
import Body from "./FlightComponents/Body";
import styles from "./flight.module.scss";

const Flight = (props) => {
  return (
    <div className={styles.flight}>
      <Top />
      <Body />
      <div className={styles.submit}>sub</div>
    </div>
  );
};
export default Flight;
