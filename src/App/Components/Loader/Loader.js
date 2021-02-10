import loader from "../../../Assets/Images/loader.gif";
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src={loader} alt="Загрузка..." />
    </div>
  );
};
export default Loader;
