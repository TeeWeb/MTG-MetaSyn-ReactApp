import React, { useState, useEffect } from "react";

import "./SearchParams.css";

const SearchParams = ({ requestCards }) => {
  const [keyword, setKeyword] = useState("");
  const [cardType, setCardType] = useState("");
  const [subtype, setSubtype] = useState("");
  const [activeColors, setActiveColors] = useState([]);
  const [colorOperator, setColorOperator] = useState("And/Or");
  const [allCardTypes, setAllCardTypes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [allCardSets, setAllCardSets] = useState([]);
  const [allKeywords, setAllKeywords] = useState([]);
  const [cardSet, setCardSet] = useState("");

  const getAllCardTypes = () => {
    fetch("http://localhost:5000/api/types").then((res) => {
      const types = res.json().then((data) => {
        const typesData = data;
        let typesArray = [];
        typesData.forEach((cardTypes) => {
          typesArray.push(cardTypes);
        });
        setAllCardTypes(typesArray);
        return typesArray;
      });
      return types;
    });
  };

  const getAllSubtypes = (cardType) => {
    fetch("http://localhost:5000/api/subtypes?type=" + cardType).then((res) => {
      const subtypes = res.json().then((data) => {
        const subtypesData = data;
        let subtypesArray = [];
        subtypesData.forEach((cardSubtypes) => {
          subtypesArray.push(cardSubtypes);
        });
        setSubtypes(subtypesArray);
        return subtypesArray;
      });
      return subtypes;
    });
  };

  const getAllSets = () => {
    fetch("http://localhost:5000/api/sets").then((res) => {
      const sets = res.json().then((data) => {
        const setsData = data;
        let setsArray = [];
        setsData.forEach((set) => {
          setsArray.push(set);
        });
        setAllCardSets(setsArray);
        return setsArray;
      });
      return sets;
    });
  };

  const getAllKeywords = () => {
    fetch("http://localhost:5000/api/keywords").then((res) => {
      const keywords = res.json().then((data) => {
        const keywordsData = data;
        let keywordsArray = [];
        keywordsData.forEach((keyword) => {
          keywordsArray.push(keyword);
        });
        setAllKeywords(keywordsArray);
        return keywordsArray;
      });
      return keywords;
    });
  };

  // Use main "Type" selection to determine list of subtypes
  const handleSetCardType = (selection) => {
    setCardType(selection);
    getAllSubtypes(selection);
  };

  useEffect(() => {
    getAllKeywords();
    getAllCardTypes();
    getAllSubtypes();
    getAllSets();
    setActiveColors([]);
  }, [setActiveColors]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestCards(
            activeColors,
            colorOperator,
            cardSet,
            keyword,
            cardType,
            subtype
          );
        }}
      >
        <div className="search-params-colors">
          <label htmlFor="search-color-white" className="search-param">
            White
            <input
              className="search-param-checkbox"
              type="checkbox"
              id="search-color-white"
              name="search-color-white"
              value="White"
              defaultChecked
            ></input>
          </label>
          <label htmlFor="search-color-blue" className="search-param">
            Blue
            <input
              className="search-param-checkbox"
              type="checkbox"
              id="search-color-blue"
              name="search-color-blue"
              value="White"
              defaultChecked
            ></input>
          </label>
          <label htmlFor="search-color-red" className="search-param">
            Red
            <input
              className="search-param-checkbox"
              type="checkbox"
              id="search-color-red"
              name="search-color-red"
              value="red"
              defaultChecked
            ></input>
          </label>
          <label htmlFor="search-color-black" className="search-param">
            Black
            <input
              className="search-param-checkbox"
              type="checkbox"
              id="search-color-black"
              name="search-color-black"
              value="black"
              defaultChecked
            ></input>
          </label>
          <label htmlFor="search-color-green" className="search-param">
            Green
            <input
              className="search-param-checkbox"
              type="checkbox"
              id="search-color-green"
              name="search-color-green"
              value="green"
              defaultChecked
            ></input>
          </label>
        </div>
        <div className="search-param-color-operator">
          <label
            htmlFor="search-color-operation-selector"
            className="search-param"
          >
            Color Select Rule
            <select
              className="search-param-radio"
              id="search-color-operation-selector"
              name="search-color-operation-selector"
              onChange={(e) => setColorOperator(e.target.value)}
              onBlur={(e) => setColorOperator(e.target.value)}
            >
              <option>And/Or</option>
              <option>Or</option>
              <option>And</option>
            </select>
          </label>
        </div>
        <div className="search-params-terms">
          <div className="search-params-keywords">
            <label htmlFor="search-set" className="search-param">
              Card Set
              <select
                className="search-param-set"
                id="search-set"
                name="set"
                onChange={(e) => setCardSet(e.target.value)}
                onBlur={(e) => setCardSet(e.target.value)}
              >
                <option></option>
                {allCardSets.map((set) => (
                  <option key={set} value={set}>
                    {set}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="search-params-keywords">
            <label htmlFor="search-keyword" className="search-param">
              Keyword
              <select
                className="search-param-keyword"
                id="search-keyword"
                name="keyword"
                onChange={(e) => setKeyword(e.target.value)}
                onBlur={(e) => setKeyword(e.target.value)}
              >
                <option></option>
                {allKeywords.map((keyword) => (
                  <option key={keyword} value={keyword}>
                    {keyword}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="search-params-types">
            <label htmlFor="search-type" className="search-param">
              Type
              <select
                className="search-param-type"
                id="search-type"
                name="type"
                onChange={(e) => handleSetCardType(e.target.value)}
                onBlur={(e) => handleSetCardType(e.target.value)}
              >
                <option></option>
                {allCardTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="search-params-subtypes">
            <label htmlFor="search-subtype" className="search-param">
              Subtype
              <select
                className="search-param-subtype"
                id="search-subtype"
                name="subtype"
                onChange={(e) => {
                  setSubtype(e.target.value);
                }}
                onBlur={(e) => setSubtype(e.target.value)}
              >
                <option></option>
                {subtypes.map((subtype) => (
                  <option key={subtype} value={subtype}>
                    {subtype}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
