import { useEffect } from "react";
import Flight from "./Flight/Flight";
import Loader from "../Components/Loader/Loader";
import styles from "./main.module.scss";

const LoadMore = (props) => {
  const { pageSize, pagesLoaded, showMoreFlights, dataFiltered } = props;
  const handler = () =>
    showMoreFlights(pageSize, pagesLoaded + 1, dataFiltered);

  const buttonStyle = props.disabled ? styles.buttonDis : styles.button;

  return (
    <div className={styles.loadMore}>
      <button
        className={buttonStyle}
        onClick={handler}
        disabled={props.disabled}
      >
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

  const buttonDisabled =
    props.dataToShow.length === 0 ||
    props.dataToShow.length === data.data.length ||
    props.dataToShow.length === data.dataFiltered.length;

  return (
    <main className={styles.main}>
      {props.dataToShow.length === 0 && !props.isLoading && (
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
        dataFiltered={data.dataFiltered}
        disabled={buttonDisabled}
      />
    </main>
  );
};

export default Main;
