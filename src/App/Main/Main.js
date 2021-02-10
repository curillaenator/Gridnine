import Flight from "./Flight/Flight";
import styles from "./main.module.scss";

const Main = (props) => {
  console.log(props);
  return (
    <div className={styles.main}>
      <Flight />
    </div>
  );
};

export default Main;
