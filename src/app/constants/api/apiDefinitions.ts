export enum api{
    QUERY_LIST_TEST = '/api/TrCenter/QueryList?id=2',

    // Auth
    SYS_LOGIN = '/api/authentication/ClientsLogin',
    SYS_LOGOUT = '/api/authentication/Logout',
    SYS_REFRESH = '/api/authentication/Refresh',

    //SYS_OTHER_LIST_TYPE
    SYS_OTHER_LIST_TYPE_QUERY_LIST = '/api/SysOtherListType/QueryList',
    SYS_OTHER_LIST_TYPE_CREATE = '/api/SysOtherListType/Create',
    SYS_OTHER_LIST_TYPE_READ = '/api/SysOtherListType/GetById?id=',
    SYS_OTHER_LIST_TYPE_UPDATE = '/api/SysOtherListType/Update',
    SYS_OTHER_LIST_TYPE_DELETE_IDS = '/api/SysOtherListType/DeleteIds',
    SYS_OTHER_LIST_TYPE_GET_LIST = '/api/SysOtherListType/GetList',
    
    //SYS_OTHER_LIST
    SYS_OTHER_LIST_QUERY_LIST = '/api/SysOtherList/QueryList',
    SYS_OTHER_LIST_CREATE = '/api/SysOtherList/Create',
    SYS_OTHER_LIST_READ = '/api/SysOtherList/GetById?id=',
    SYS_OTHER_LIST_UPDATE = '/api/SysOtherList/Update',
    SYS_OTHER_LIST_DELETE_IDS = '/api/SysOtherList/DeleteIds',
    SYS_OTHER_LIST_EXPORT_EXCEL = '/api/SysOtherList/ExportExcelSysOtherList',
    SYS_OTHER_LIST_GET_LIST_BY_GROUP = '/api/SysOtherList/GetOtherListByGroup?code=',
    SYS_OTHER_LIST_GET_LIST_BY_CODE = '/api/SysOtherList/GetListByCode?typeCode=',
    SYS_OTHER_LIST_GET_LIST_BY_TYPE = '/api/SysOtherList/GetListByType?type=',
    SYS_OTHER_LIST_GET_ALL_USER = '/api/SysOtherList/GetAllUser',

    //SYS_USER
    SYS_USER_QUERY_LIST = '/api/SysUser/QueryList',
    SYS_USER_CREATE = '/api/SysUser/CreateUser',
    SYS_USER_UPDATE = '/api/SysUser/UpdateUser',
    SYS_USER_READ = '/api/SysUser/GetByIdString?id=',
    SYS_USER_DELETE_IDS = '/api/SysUser/DeleteIds',

    //SYS_MENU
    SYS_MENU_QUERY_LIST = '/api/SysMENU/QueryList',
    SYS_MENU_CREATE = '/api/SysMENU/Create',
    SYS_MENU_READ = '/api/SysMENU/GetById?id=',
    SYS_MENU_UPDATE = '/api/SysMENU/Update',
    SYS_MENU_DELETE_IDS = '/api/SysMENU/DeleteIds',
    SYS_MENU_GET_ACTION_BY_USER = '/api/SysMenu/GetActionByUser',
    SYS_MENU_GET_ALL_ACTION = '/api/SysMenu/GetAllAction',

    //PER_CUSTOMER
    PER_CUSTOMER_QUERY_LIST = '/api/PerCustomer/QueryList',
    PER_CUSTOMER_CREATE = '/api/PerCustomer/Create',
    PER_CUSTOMER_READ = '/api/PerCustomer/GetById?id=',
    PER_CUSTOMER_UPDATE = '/api/PerCustomer/Update',
    PER_CUSTOMER_DELETE_IDS = '/api/PerCustomer/DeleteIds',
    PER_CUSTOMER_TOGGLE_ACTIVE = '/api/PerCustomer/ToggleActiveIds',

    //PER_EMPLOYEE
    PER_EMPLOYEE_QUERY_LIST = '/api/PerEmployee/QueryList',
    PER_EMPLOYEE_CREATE = '/api/PerEmployee/Create',
    PER_EMPLOYEE_READ = '/api/PerEmployee/GetById?id=',
    PER_EMPLOYEE_UPDATE = '/api/PerEmployee/Update',
    PER_EMPLOYEE_DELETE_IDS = '/api/PerEmployee/DeleteIds',

    // GYM_PACKAGE 
    GYM_PACKAGE_QUERY_LIST = '/api/GymPackage/QueryList',
    GYM_PACKAGE_CREATE = '/api/GymPackage/Create',
    GYM_PACKAGE_READ = '/api/GymPackage/GetById?id=',
    GYM_PACKAGE_UPDATE = '/api/GymPackage/Update',
    GYM_PACKAGE_DELETE_IDS = '/api/GymPackage/DeleteIds',

    // GYM_SHIFT 
    GYM_SHIFT_QUERY_LIST = '/api/GymShift/QueryList',
    GYM_SHIFT_CREATE = '/api/GymShift/Create',
    GYM_SHIFT_READ = '/api/GymShift/GetById?id=',
    GYM_SHIFT_UPDATE = '/api/GymShift/Update',
    GYM_SHIFT_DELETE_IDS = '/api/GymShift/DeleteIds',
    GYM_SHIFT_GET_LIST = '/api/GymShift/GetList',

    //GOODS_LIST
    GOODS_LIST_QUERY_LIST = '/api/GoodsList/QueryList',
    GOODS_LIST_CREATE = '/api/GoodsList/Create',
    GOODS_LIST_READ = '/api/GoodsList/GetById?id=',
    GOODS_LIST_UPDATE = '/api/GoodsList/Update',
    GOODS_LIST_DELETE_IDS = '/api/GoodsList/DeleteIds',
    GOODS_LIST_GET_LIST = '/api/GoodsList/GetList',

    //CARD_CHECK_IN
    CARD_CHECK_IN_QUERY_LIST = '/api/CardCheckIn/QueryList',
    CARD_CHECK_IN_CREATE = '/api/CardCheckIn/Create',
    CARD_CHECK_IN_READ = '/api/CardCheckIn/GetById?id=',
    CARD_CHECK_IN_UPDATE = '/api/CardCheckIn/Update',
    CARD_CHECK_IN_CHECK_IN = '/api/CardCheckIn/CheckIn',
    CARD_CHECK_IN_DELETE_IDS = '/api/CardCheckIn/DeleteIds',
    CARD_CHECK_IN_TOGGLE_ACTIVE = '/api/CardCheckIn/ToggleActiveIds',

    //CARD_INFO
    CARD_INFO_QUERY_LIST = '/api/CardInfo/QueryList',
    CARD_INFO_CREATE = '/api/CardInfo/Create',
    CARD_INFO_READ = '/api/CardInfo/GetById?id=',
    CARD_INFO_CALCULATE = '/api/CardInfo/CalculateByCardId?id=',
    CARD_INFO_UPDATE = '/api/CardInfo/Update',
    CARD_INFO_DELETE_IDS = '/api/CardInfo/DeleteIds',
    CARD_INFO_TOGGLE_ACTIVE = '/api/CardInfo/ToggleActiveIds',
    CARD_INFO_GET_ALL_CARD_VALID = '/api/CardInfo/GetAllCardValid',
    CARD_INFO_GET_LIST_CUSTOMER = '/api/CardInfo/GetListCustomer',    

    //CARD_HISTORY
    CARD_HISTORY_QUERY_LIST = '/api/CardHistory/QueryList',
    CARD_HISTORY_CREATE = '/api/CardHistory/Create',
    CARD_HISTORY_READ = '/api/CardHistory/GetById?id=',
    CARD_HISTORY_UPDATE = '/api/CardHistory/Update',
    CARD_HISTORY_DELETE_IDS = '/api/CardHistory/DeleteIds',
    CARD_HISTORY_TOGGLE_ACTIVE = '/api/CardHistory/ToggleActiveIds',
    CARD_HISTORY_GET_LIST_CARD_CODE = '/api/CardHistory/GetListCardCode',

    // GOODS_EQUIPMENT
    GOODS_EQUIPMENT_QUERY_LIST = '/api/GoodsEquipment/QueryList',
    GOODS_EQUIPMENT_CREATE = '/api/GoodsEquipment/Create',
    GOODS_EQUIPMENT_READ = '/api/GoodsEquipment/GetById?id=',
    GOODS_EQUIPMENT_UPDATE = '/api/GoodsEquipment/Update',
    GOODS_EQUIPMENT_DELETE_IDS = '/api/GoodsEquipment/DeleteIds',
    GOODS_EQUIPMENT_GET_LIST = '/api/GoodsEquipment/GetList',
    GOODS_EQUIPMENT_GET_LIST_BY_TYPE_CODE = '/api/GoodsEquipment/GetListByTypeCode?typeCode=',

    // GOODS_EQUIPMENT_FIX
    GOODS_EQUIPMENT_FIX_QUERY_LIST = '/api/GoodsEquipmentFix/QueryList',
    GOODS_EQUIPMENT_FIX_CREATE = '/api/GoodsEquipmentFix/Create',
    GOODS_EQUIPMENT_FIX_READ = '/api/GoodsEquipmentFix/GetById?id=',
    GOODS_EQUIPMENT_FIX_UPDATE = '/api/GoodsEquipmentFix/Update',
    GOODS_EQUIPMENT_FIX_DELETE_IDS = '/api/GoodsEquipmentFix/DeleteIds',
    GOODS_EQUIPMENT_FIX_GET_LIST = '/api/GoodsEquipmentFix/GetList',

    //PER_CUSTOMER
    PER_CUSTOMER_TRANSACTIONS_QUERY_LIST = '/api/PerCusTransaction/QueryList',
    PER_CUSTOMER_TRANSACTIONS_CREATE = '/api/PerCusTransaction/Create',
    PER_CUSTOMER_TRANSACTIONS_READ = '/api/PerCusTransaction/GetById?id=',
    PER_CUSTOMER_TRANSACTIONS_UPDATE = '/api/PerCusTransaction/Update',
    PER_CUSTOMER_TRANSACTIONS_DELETE_IDS = '/api/PerCusTransaction/DeleteIds',
    PER_CUSTOMER_TRANSACTIONS_TOGGLE_ACTIVE = '/api/PerCusTransaction/ToggleActiveIds',

    //GOODS_LOCKER
    GOODS_LOCKER_QUERY_LIST = '/api/GoodsLocker/QueryList',
    GOODS_LOCKER_CREATE = '/api/GoodsLocker/Create',
    GOODS_LOCKER_READ = '/api/GoodsLocker/GetById?id=',
    GOODS_LOCKER_UPDATE = '/api/GoodsLocker/Update',
    GOODS_LOCKER_DELETE_IDS = '/api/GoodsLocker/DeleteIds',
    GOODS_LOCKER_TOGGLE_ACTIVE = '/api/GoodsLocker/ToggleActiveIds',
    GOODS_LOCKER_GET_ALL_LOCKER_VALID = '/api/GoodsLocker/GetAllLockerValid',

    //PER_CUSTOMER
    CARD_ISSUANCE_QUERY_LIST = '/api/CardIssuance/QueryList',
    CARD_ISSUANCE_CREATE = '/api/CardIssuance/Create',
    CARD_ISSUANCE_READ = '/api/CardIssuance/GetById?id=',
    CARD_ISSUANCE_UPDATE = '/api/CardIssuance/Update',
    CARD_ISSUANCE_DELETE_IDS = '/api/CardIssuance/DeleteIds',
    CARD_ISSUANCE_TOGGLE_ACTIVE = '/api/CardIssuance/ToggleActiveIds',
}