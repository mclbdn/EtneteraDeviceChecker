import { combineReducers } from "redux";
import availableReducer from "./availableReducer";
import searchReducer from "./searchReducer";
import phonesReducer from "./phonesReducer";
import filteredPhonesReduced from "./filteredPhonesReducer";
import osListReducer from "./osListReducer";
import vendorListReducer from "./vendorListReducer";
import isResetBtnVisibleReducer from "./isResetBtnVisibleReducer";
import isAdminReducer from "./isAdminReducer";

const allReducers = combineReducers({
  search: searchReducer,
  available: availableReducer,
  phones: phonesReducer,
  filteredPhones: filteredPhonesReduced,
  osList: osListReducer,
  vendorList: vendorListReducer,
  isResetBtnVisible: isResetBtnVisibleReducer,
  isAdmin: isAdminReducer,
});

export default allReducers;
