import styles from "../flight.module.scss";

const Top = (props) => {
  return (
    <div className={styles.top}>
      <div className={styles.carier}>Aeroflot</div>
      <div className={styles.price}>
        <div className={styles.amount}>125000</div>
        <div className={styles.comment}>dfhdfhdfhs</div>
      </div>
    </div>
  );
};

export default Top;
