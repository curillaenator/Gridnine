import { useEffect } from "react";
import Flight from "./Flight/Flight";
import Loader from "../Components/Loader/Loader";
import styles from "./main.module.scss";

const LoadMore = (props) => {
  const { pageSize, pagesLoaded, showMoreFlights, sortedData } = props;
  const handler = () => showMoreFlights(pageSize, pagesLoaded + 1, sortedData);

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
  const { pageSize, pagesLoaded, showMoreFlights, sortedData } = props;
  useEffect(() => showMoreFlights(pageSize, pagesLoaded, sortedData), [sortedData]);

  return (
    <main className={styles.main}>
      {props.flights.map((f, i) => (
        <Flight flight={f} key={f.flightToken} />
      ))}
      {props.isLoading && <Loader />}
      <LoadMore
        showMoreFlights={showMoreFlights}
        pagesLoaded={pagesLoaded}
        pageSize={pageSize}
        sortedData={sortedData}
      />
    </main>
  );
};

export default Main;
