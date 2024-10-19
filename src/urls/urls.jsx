/* eslint-disable */

import { HttpAxiosService } from './httpService';
import { Urls } from './constantsUrls.jsx';
import { test_url } from "../../src/config/environment.js"

const project = new HttpAxiosService(test_url);

//login and signup
export const loginFunction = (payload_data) => {
  return project.post(Urls.FETCH_ADMIN_LOGIN, payload_data);
};
export const DashboardFunction = (payload_data) => {
  return project.get(Urls.FETCH_ADMIN_DASHBOARD, payload_data);
};
export const DashboardGraphFunction = (payload_data) => {
  return project.get(Urls.GRAPH_ADMIN_DASHBOARD, payload_data);
};
export const getRestStatusFunction = (payload_data) => {
  return project.get(Urls.REST_AVAILABLE_FETCH, payload_data);
};
export const changeRestStatusFunction = (payload_data) => {
  return project.post(Urls.REST_AVAILABLE_FETCH, payload_data);
};
export const getOrderList = (payload_data) => {
  return project.get(Urls.GET_ORDERS_LIST, payload_data);
};
export const getSingleOrderDetails = (payload_data) => {
  return project.get(Urls.GET_SINGLE_ORDER, payload_data);
};
export const ChangeOrderStatus = (payload_data) => {
  return project.post(Urls.CHANGE_ORDER_STATUS, payload_data);
};
export const getCustomerData = (payload_data) => {
  return project.get(Urls.GET_CUSTOMERS_DATA, payload_data);
};
export const BanUnbanCustomer = (payload_data) => {
  return project.post(Urls.BAN_UNBAN_CUSTOMERS, payload_data);
};
export const getMenuData = (payload_data) => {
  return project.get(Urls.GET_MENU, payload_data);
};
export const getCategoriesData = (payload_data) => {
  return project.get(Urls.GET_CATEGORY, payload_data);
};
export const changeMenuAvailablility = (payload_data) => {
  return project.post(Urls.CHANGE_AVAILABILITY, payload_data);
};
export const AddNewCategory = (payload_data) => {
  return project.post(Urls.ADD_CATEGORY, payload_data);
};
export const DeleteCategory = (payload_data) => {
  return project.post(Urls.DELETE_CATEGORY, payload_data);
};
export const AddMenuItem = (payload_data) => {
  return project.multiPartFormData(Urls.ADD_MENU_ITEM, payload_data);
};