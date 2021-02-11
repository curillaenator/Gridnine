import Flight from "./Flight/Flight";
import Loader from "../Components/Loader/Loader";
import styles from "./main.module.scss";

const LoadMore = (props) => {
  const handler = () => props.addFlights(props.pageSize, props.pagesLoaded + 1);
  return (
    <div className={styles.loadMore}>
      <button className={styles.button} onClick={handler}>
        Показать еще
      </button>
    </div>
  );
};

const Main = (props) => {
  // console.log(props);
  return (
    <div className={styles.main}>
      {props.flights.map((f, i) => (
        <Flight flight={f} key={f.flightToken} />
      ))}
      {props.isLoading && <Loader />}
      <LoadMore
        addFlights={props.addFlights}
        pagesLoaded={props.pagesLoaded}
        pageSize={props.pageSize}
      />
    </div>
  );
};

export default Main;
