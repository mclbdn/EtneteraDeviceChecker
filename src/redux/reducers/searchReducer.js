const searchReducer = (state = "", action) => {
  switch (action.type) {
    case "SETSEARCH":
      return (state = action.payload);
    default:
      return state;
  }
};

export default searchReducer;
