const availableReducer = (state = false, action) => {
  switch (action.type) {
    case "SETCHECKBOX":
      return (state = action.payload);
    default:
      return state;
  }
};

export default availableReducer;
