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

  // console.log(
  //   data.filterByTransfer.some(
  //     (t) => +t === data.data[0].flight.legs[0].segments.length
  //   )
  // );
  // console.log(data.filterByTransfer);
  // console.log(data.data[0].flight.legs[0].segments.length);

  useEffect(() => showWithFilters(data, pageSize, pagesLoaded), [
    data.data,
    data.filteredCount,
  ]);

  return (
    <main className={styles.main}>
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
