import { useEffect } from "react";
import Flight from "./Flight/Flight";
import Loader from "../Components/Loader/Loader";
import styles from "./main.module.scss";

const LoadMore = (props) => {
  const { pageSize, pagesLoaded, showMoreFlights, dataFiltered } = props;
  const handler = () =>
    showMoreFlights(pageSize, pagesLoaded + 1, dataFiltered);

  return (
    <div className={styles.loadMore}>
      <button className={styles.button} onClick={handler}>
        Показать еще
      </button>
    </div>
  );
};

const Main = (props) => {
  const {
    pageSize,
    pagesLoaded,
    showMoreFlights,
    showWithFilters,
    data,
  } = props;

  useEffect(() => showWithFilters(data, pageSize, pagesLoaded), [
    data.data,
    data.filteredCount,
  ]);

  return (
    <main className={styles.main}>
      {props.dataToShow.length === 0 && (
        <div className={styles.notfound}>
          <h2>Не найдено</h2>
        </div>
      )}
      {props.dataToShow.map((f, i) => (
        <Flight flight={f} key={f.flightToken} />
      ))}
      {props.isLoading && <Loader />}
      <LoadMore
        showMoreFlights={showMoreFlights}
        pagesLoaded={pagesLoaded}
        pageSize={pageSize}
        dataFiltered={data.dataFiltered} // change to filtered
      />
    </main>
  );
};

export default Main;
