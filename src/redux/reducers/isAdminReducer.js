const isAdmin = (state = false, action) => {
  switch (action.type) {
    case "SETISADMIN":
      return (state = action.payload);
    default:
      return state;
  }
};

export default isAdmin;
