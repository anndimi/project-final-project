import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import add from "../reducers/add";
import { API_URL } from "../utils/constants";

const AddForm = () => {
  const [typeOf, setTypeOf] = useState("Join");
  const [info, setInfo] = useState({
    // typeOf: "",
    title: "",
    description: "",
    budget: "",
    currency: "",
    category: "",
  });

  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...info,
        typeOf,
      }),
    };
    console.log(info, "info");
    fetch(API_URL("adds"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(add.actions.setTypeOf(data.response.typeOf));
            dispatch(add.actions.setTitle(data.response.title));
            dispatch(add.actions.setDescription(data.response.description));
            dispatch(add.actions.setBudget(data.response.budget));
            dispatch(add.actions.setCurrency(data.response.currency));
            dispatch(add.actions.setCategory(data.response.category));
            dispatch(add.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(add.actions.setTypeOf(null));
            dispatch(add.actions.setTitle(null));
            dispatch(add.actions.setDescription(null));
            dispatch(add.actions.setBudget(null));
            dispatch(add.actions.setCurrency(null));
            dispatch(add.actions.setCategory(null));
            dispatch(add.actions.setError(data.response));
          });
          alert(data.response);
        }
      });
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="Looking for">Looking for </label>
        <input
          id="Looking for"
          type="radio"
          value="Looking for"
          checked={typeOf === "Looking for"}
          onChange={(e) => setTypeOf(e.target.value)}
        />

        <label htmlFor="Join">Join </label>
        <input
          id="Join"
          type="radio"
          value="Join"
          checked={typeOf === "Join"}
          onChange={(e) => setTypeOf(e.target.value)}
        />

        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          value={info.title}
          onChange={(e) => setInfo({ ...info, title: e.target.value })}
        ></input>

        <label htmlFor="category">Category:</label>
        <select
          value={info.category}
          onChange={(e) => setInfo({ ...info, category: e.target.value })}
        >
          <option hidden>Category</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Graphics and Design">Graphics and Design</option>
          <option value="Fullstack">Fullstack</option>
          <option value="App Developer">App Developer</option>
          <option value="Chatbots">Chatbots</option>
          <option value="Project Lead">Project Lead</option>
          <option value="QA">QA</option>
          <option value="Legal Consulting">Legal Consulting</option>
          <option value="Financial Consulting">Financial Consulting</option>
          <option value="Analytics">Analytics</option>
          <option value="Game Developer">Game Developer</option>
        </select>

        <label htmlFor="description">Description: </label>
        <textarea
          id="title"
          type="text"
          value={info.description}
          autoComplete="off"
          onChange={(e) => setInfo({ ...info, description: e.target.value })}
        />

        <label htmlFor="password">Budget: </label>
        <input
          id="budget"
          type="number"
          value={info.budget}
          onChange={(e) => setInfo({ ...info, budget: e.target.value })}
        ></input>
        <label htmlFor="currency">Currency:</label>
        <select
          value={info.currency}
          onChange={(e) => setInfo({ ...info, currency: e.target.value })}
        >
          <option hidden>currency</option>
          <option value="SEK">SEK</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="NOK">NOK</option>
          <option value="GBP">GBP</option>
          <option value="DKK">DKK</option>
          <option value="CNY">CNY</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default AddForm;