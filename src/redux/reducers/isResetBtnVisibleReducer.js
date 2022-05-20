const isResetBtnVisible = (state = false, action) => {
  switch (action.type) {
    case "SETISRESETBTNVISIBLE":
      return (state = action.payload);
    default:
      return state;
  }
};

export default isResetBtnVisible;
