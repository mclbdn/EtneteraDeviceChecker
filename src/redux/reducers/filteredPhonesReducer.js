const filteredPhones = (state = [], action) => {
  switch (action.type) {
    case "SETFILTEREDPHONES":
      return (state = action.payload);
    default:
      return state;
  }
};

export default filteredPhones;
