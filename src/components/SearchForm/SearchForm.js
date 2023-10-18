import "./SearchForm.css";
import imageButton from "../../images/icon_search_button.svg";
import { useEffect, useState } from "react";

function SearchForm({
  value,
  handleSearch,
  onChangeShort,
  shortStatus,
  title,
}) {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  const changeInput = (event) => {
    setInputValue(event.target.value);

    if (event.target.value === "") {
      setInputError("Нужно ввести ключевое слово");
    } else {
      setInputError("");
    }
  };
  const handleChangeShort = (e) => {
    onChangeShort(e);
    handleSearch(inputValue);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSearch(inputValue);
  };
  return (
    <section className="search">
      <div className="search__wrapper">
        <form className="search__form" onSubmit={handleSubmit} noValidate>
          <input
            className="search__input"
            type="search"
            autoComplete="off"
            placeholder={title}
            required
            minLength={2}
            maxLength={20}
            onChange={changeInput}
            value={inputValue || ""}
          />
          <button className="search__button" type="submit">
            <div className="search__button-inside">
              <img
                className="search__button-image"
                src={imageButton}
                alt="Кнопка поиска"
              />
            </div>
          </button>
        </form>
        <span className="search__error">{inputError}</span>
        <div className="search__switch-block">
          <label className="search__switch">
            <input
              className="search__switch-input"
              type="checkbox"
              checked={shortStatus}
              id="checkbox"
              onChange={() => handleChangeShort(!shortStatus)}
            />
            <span className="search__switch-slider search__switch-slider-round" />
          </label>
          <p className="search__switch-text">Короткометражки</p>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
