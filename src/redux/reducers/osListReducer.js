const osList = (state = [], action) => {
  switch (action.type) {
    case "SETOSLIST":
      return (state = action.payload);
    default:
      return state;
  }
};

export default osList;
