const vendorList = (state = [], action) => {
  switch (action.type) {
    case "SETVENDORLIST":
      return (state = action.payload);
    default:
      return state;
  }
};

export default vendorList;
