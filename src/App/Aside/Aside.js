import styles from "./aside.module.scss";

const RadioBtn = (props) => {
  return (
    <label>
      <input
        type="radio"
        name="sortBySelected"
        checked={props.checked === props.value}
        onChange={props.handleRadio}
        value={props.value}
      />
      {props.title}
    </label>
  );
};

const Checkbox = (props) => {
  return (
    <label>
      <input type="checkbox" onChange={props.handler} value={props.value} />
      {props.title}
    </label>
  );
};

const Input = (props) => {
  return (
    <div className={styles.textinput}>
      <p>{props.title}</p>
      <input type="text" onChange={props.handleTransfer} />
    </div>
  );
};

const Aside = (props) => {
  const handleRadio = (e) => {
    props.setSort(e.target.value);
  };

  const handleTransfer = (e) => {
    console.log(e.target.value);
  };
  
  const handleCarrier = (e) => {
    const filterData = e.target.checked
      ? [...props.filterByCarriers, e.target.value]
      : props.filterByCarriers.filter((c) => c !== e.target.value);
    props.filterBy(filterData);
  };

  return (
    <aside className={styles.aside}>
      <form className={styles.filter}>
        <div className={styles.sortBy}>
          <h3>Сортировать</h3>
          <div className={styles.input}>
            <RadioBtn
              title="По возрастанию цены"
              handleRadio={handleRadio}
              value="priceIncrease"
              checked={props.sortOption}
            />
            <RadioBtn
              title="По убыванию цены"
              handleRadio={handleRadio}
              value="priceDecrease"
              checked={props.sortOption}
            />
            <RadioBtn
              title="По времени в пути"
              handleRadio={handleRadio}
              value="flightTime"
              checked={props.sortOption}
            />
          </div>
        </div>
        <div className={styles.filterBy}>
          <h3>Фильтровать</h3>
          <div className={styles.input}>
            <Checkbox title="1-пересадка" value="1" handler={handleTransfer} />
            <Checkbox
              title="без пересадок"
              value="0"
              handler={handleTransfer}
            />
          </div>
          <h3>Цена</h3>
          <div className={styles.input}>
            <Input title="от" />
            <Input title="до" />
          </div>
          <h3>Авиакомпании</h3>
          <div className={styles.input}>
            {props.carriers.map((c) => (
              <Checkbox title={c} key={c} value={c} handler={handleCarrier} />
            ))}
          </div>
        </div>
      </form>
    </aside>
  );
};
export default Aside;
