const phones = (state = [], action) => {
  switch (action.type) {
    case "SETPHONES":
      return (state = action.payload);
    default:
      return state;
  }
};

export default phones;
