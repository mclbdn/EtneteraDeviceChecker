export const setSearch = (query) => {
  return {
    type: "SETSEARCH",
    payload: query,
  };
};

export const setIsAvailableCheckboxChecked = (bool) => {
  return {
    type: "SETCHECKBOX",
    payload: bool,
  };
};

export const setPhones = (arr) => {
  return {
    type: "SETPHONES",
    payload: arr,
  };
};

export const setFilteredPhones = (arr) => {
  return {
    type: "SETFILTEREDPHONES",
    payload: arr,
  };
};

export const setOsList = (arr) => {
  return {
    type: "SETOSLIST",
    payload: arr,
  };
};

export const setVendorList = (arr) => {
  return {
    type: "SETVENDORLIST",
    payload: arr,
  };
};

export const setIsResetBtnVisble = (bool) => {
  return {
    type: "SETISRESETBTNVISIBLE",
    payload: bool,
  };
};

export const setIsAdmin = (bool) => {
  return {
    type: "SETISADMIN",
    payload: bool,
  };
};
