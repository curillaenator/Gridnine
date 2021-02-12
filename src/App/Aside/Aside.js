import { useState } from "react";
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
  const color = props.disabled ? "#d9d9d9" : "#1b1b1b";
  return (
    <label style={{ color: color }}>
      <input
        type="checkbox"
        onChange={props.handler}
        value={props.value}
        disabled={props.disabled}
      />
      {props.title}
    </label>
  );
};

const Input = (props) => {
  const [input, setInput] = useState("");
  const data = props.filter.byPrice;
  const textHandler = (e) => {
    setInput(e.target.value);
    if (props.title === "от") data.from = +e.target.value;
    if (props.title === "до") data.to = +e.target.value;
    props.handler(data);
  };

  return (
    <div className={styles.textinput}>
      <p>{props.title}</p>
      <input type="number" onChange={textHandler} value={input} />
    </div>
  );
};

const Aside = (props) => {
  // console.log(props);

  const handleRadio = (e) => {
    props.setSort(e.target.value);
  };

  const transfer = (e) => {
    props.setfilterData(
      "byTransfer",
      props.filter,
      e.target.value,
      e.target.checked
    );
  };

  const carriers = (e) => {
    props.setfilterData(
      "byCarriers",
      props.filter,
      e.target.value,
      e.target.checked
    );
  };

  const filteredCarriers = [
    ...new Set(props.dataFiltered.map((f) => f.flight.carrier.caption)),
  ];

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
            <Checkbox title="1-пересадка" value="2" handler={transfer} />
            <Checkbox title="без пересадок" value="1" handler={transfer} />
          </div>
          <h3>Цена</h3>
          <div className={styles.input}>
            <Input
              title="от"
              handler={props.setPriceFilterData}
              filter={props.filter}
            />
            <Input
              title="до"
              handler={props.setPriceFilterData}
              filter={props.filter}
            />
          </div>
          <h3>Авиакомпании</h3>
          <div className={styles.input}>
            {props.carriers.map((c) => (
              <Checkbox
                title={c}
                key={c}
                value={c}
                handler={carriers}
                disabled={!filteredCarriers.includes(c)}
              />
            ))}
          </div>
        </div>
      </form>
    </aside>
  );
};
export default Aside;
