/* eslint-disable */
export class Urls {
    static MPHRMS_API_PREFIX = 'api/';

    //users
    static FETCH_ADMIN_LOGIN = Urls.MPHRMS_API_PREFIX + 'users/get-admin-login/';
    static FETCH_ADMIN_DASHBOARD = Urls.MPHRMS_API_PREFIX + 'users/get-admin-dashboard/';
    static GRAPH_ADMIN_DASHBOARD = Urls.MPHRMS_API_PREFIX + 'users/admin-charts/';
    static REST_AVAILABLE_FETCH = Urls.MPHRMS_API_PREFIX + 'users/is_rest_available/';
    static GET_CUSTOMERS_DATA = Urls.MPHRMS_API_PREFIX + 'users/get-customer/';
    static BAN_UNBAN_CUSTOMERS = Urls.MPHRMS_API_PREFIX + 'users/action-customer/';
    static SINGLE_CUSTOMER = Urls.MPHRMS_API_PREFIX + 'users/single-customer-fetch/';
    static NOTIFICATION_ADMIN = Urls.MPHRMS_API_PREFIX + 'users/notification-admin-fetch/';



    //orders
    static GET_ORDERS_LIST = Urls.MPHRMS_API_PREFIX + 'orders/fetch-order/';
    static GET_SINGLE_ORDER = Urls.MPHRMS_API_PREFIX + 'orders/fetch-single-order/';
    static CHANGE_ORDER_STATUS = Urls.MPHRMS_API_PREFIX + 'orders/order-status-change/';

    //menu
    static GET_CATEGORY = Urls.MPHRMS_API_PREFIX + 'menu/get-category/';
    static GET_MENU = Urls.MPHRMS_API_PREFIX + 'menu/get-menu/';
    static CHANGE_AVAILABILITY = Urls.MPHRMS_API_PREFIX + 'menu/change-availability/';
    static CHANGE_BUY_ONE_GET_ONE = Urls.MPHRMS_API_PREFIX + 'menu/change-buy-one-get-one/';
    static CHANGE_ADD_ON = Urls.MPHRMS_API_PREFIX + 'menu/change-add-on/';
    static ADD_CATEGORY = Urls.MPHRMS_API_PREFIX + 'menu/add-category/';
    static DELETE_CATEGORY = Urls.MPHRMS_API_PREFIX + 'menu/delete-category/';
    static ADD_MENU_ITEM = Urls.MPHRMS_API_PREFIX + 'menu/add-menu-item/';

 

}
