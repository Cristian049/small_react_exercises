function SelectNumber({ dispatch, numberOfQuestions }) {
  return (
    <div className="selecting">
      <h2>Welcome to the React Quiz!</h2>
      <h3>Select the number of questions</h3>
      <select
        value={numberOfQuestions || ""}
        onChange={(e) =>
          dispatch({
            type: "selectNumOfQuestions",
            payload: Number(e.target.value),
          })
        }
      >
        <option value="" disabled>
          -- Select --
        </option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  );
}

export default SelectNumber;
