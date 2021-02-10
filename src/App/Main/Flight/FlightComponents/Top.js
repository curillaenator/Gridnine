import currency from "../../../../Assets/Images/currency.png";
import styles from "../flight.module.scss";

const Top = (props) => {
  return (
    <div className={styles.top}>
      {/* <div className={styles.carrier}>Aeroflot</div> */}
      <img
        className={styles.carrier}
        src={`http://pics.avs.io/120/27/${props.carrier.uid}.png`}
        alt={props.carrier.caption}
      />
      <div className={styles.price}>
        <div className={styles.amount}>
          <h3>{props.amount}</h3>
          <img src={currency} alt="руб." />
        </div>
        <div className={styles.comment}>
          Стоимость для одного взрослого пассажира
        </div>
      </div>
    </div>
  );
};

export default Top;
