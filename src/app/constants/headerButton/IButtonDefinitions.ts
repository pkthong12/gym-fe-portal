import { EnumBaseButton } from "./ButtonDefinitions";

export interface ICoreButtonVNS {
    code: any;
    iconClass?: any;
    caption : string;
    styleClass? : any;
    order?: any;
}

export const BASE_BUTTONS: ICoreButtonVNS[] = [
    {
        code: EnumBaseButton.CREATE,
        iconClass: 'flaticon-043-plus',
        caption: 'Thêm mới',
        styleClass: 'btn btn-primary',
        order: 1,
    },
    {
        code: EnumBaseButton.EDIT,
        iconClass: 'flaticon-068-pencil',
        caption: 'Chỉnh sửa',
        styleClass: 'btn btn-primary',
        order: 2,
    },
    {
        code: EnumBaseButton.ACTIVATE,
        iconClass: 'flaticon-151-check',
        caption: 'Áp dụng',
        styleClass: 'btn btn-primary',
        order: 3,
    },
    {
        code: EnumBaseButton.INACTIVATE,
        iconClass: 'flaticon-042-minus',
        caption: 'Ngừng áp dụng',
        styleClass: 'btn btn-primary',
        order: 4,
    },
    {
        code: EnumBaseButton.DELETE,
        iconClass: 'flaticon-133-trash',
        caption: 'Xóa',
        styleClass: 'btn btn-primary',
        order: 5,
    },
    {
        code: EnumBaseButton.PDF,
        iconClass: 'fa fa-file-pdf-o',
        caption: 'Xuất file PDF',
        styleClass: 'btn btn-primary',
        order: 5,
    },
    {
        code: EnumBaseButton.EXCEL,
        iconClass: 'fa fa-file-excel-o',
        caption: 'Xuất file excel',
        styleClass: 'btn btn-primary',
        order: 5,
    },

]