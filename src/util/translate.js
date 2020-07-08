import { EN, AR, RTL_KEY } from './constants';
const DefaultLanguage = EN;
const Resources = {
    ar: {
        dateLocale: "ar-EG",
        client: {
            phone: "رقم الهاتف",
            client: 'العميل',
            details: 'التفاصيل',
            address: 'العنوان',
        },
        city: {
            city: 'المدينة',
            cities: 'المدن',
            clients: 'العملاء',
        },
        size: {
            size: 'الحجم',
            sizes: 'الاحجام',
        },
        color: {
            color: 'اللون',
            colors: 'الالوان',
        },
        type: {
            type: 'النوع',
            types: 'الانواع',
        },
        item: {
            item: 'صنف',
            items: 'اصناف',
            quantity: 'الكمية',
            price: 'السعر',
            code: 'الكود'
        },
        town: {
            town: 'المنطقة',
            towns: 'المناطق',
        },
         oneItem: {
            oneItem: 'عنصر واحد',
            oneItems: 'العناصر الصغيرة',
        },
        orderStatus: {
            orderStatus: 'حالة الطلب',
            orderStatuses: 'حالات الطلب',
        },
        validations: {
            maxLength: 'الحد الاقصى هو ',
            validNatDate: 'تاريخ الميلاد والرقم القومي غير متطابقان',
            validName: 'برجاء ادخال اسم صحيح',
            validNumber: 'برجاء ادخال رقم صحيح',
            alphaNumericEnglish: 'برجاء ادخال اسم صحيح',
            validPhoneNumber: 'برجاء ادخال رقم موبايل صحيح',
            required: 'هذا الحقل مطلوب',
            matchEmail: 'البريد الاكتروني غير مطابق',
            matchPassword: 'الرقم السري غير مطابق',
            isEmail: 'برجاء ادخال بريد الكتروني صحيح',
            validDate: 'برجاء ادخال تاريخ صحيح',
            exactLength: 'هذا الحقل غير مطابق لعدد الحروف المتوقعة',
            validNatId: 'برجاء ادخال رقمك القومي صحيح',
            registerdBefore: 'هذا البريد مسجل من قبل',
            natIdUsedBefore: 'هذا الرقم مسجل من قبل',
            authIp: 'برجاء ادخال بريد جامعي او بريد عمل او الاتصال بشبكة الجامعة',
        }
        ,
        err: {
            common: {
                header: 'حدث خطأ',
                msg: 'من فضلك حاول مرة اخرى',
                btn: 'محاولة اخرى',
                ok: 'موافق'
            },
            skipLogin: {
                header: 'يرجى الملاحظة',
                msg: 'لا يمكن الوصول إلى جميع الميزات من "تخطي تسجيل الدخول"',
                btn: 'متابعة',
            },
            noNet: {
                header: 'حدث خطأ',
                msg: 'برجاء التأكد من اتصال الجهاز بالانترنت',
                btn: 'موافق',
            },
            serverErr: {
                ok: 'موافق',
                btn: 'اعادة المحاولة',
                header: 'حدث خطأ',
                msg: 'خطأ في الخادم الداخلي من فضلك حاول مرة اخرى لاحقآ',
            },
            eventReminderErr: {
                header: 'حدث خطأ',
                msg: 'لقد قمت بطلب التذكير علي هذه الفاعلية من قبل',
                ok: 'موافق'
            }
        },
        common: {
            upload:'رفع',
            success: 'نجاح',
            addedSuccess: 'تمت الاضافة بنجاح',
            editedSuccess: 'تم التعديل بنجاح',
            deletedSuccess: 'تم الحذف بنجاح',
            deletedAllSuccess: 'تم حذف جميع العناصر بنجاح',
            name: 'الاسم',
            nameAr: 'الاسم بالعربية',
            save: 'حفظ',
            delete: 'حذف',
            edit: 'تعديل',
            add: 'اضافة',
            cancel: 'الغاء',
            agree: 'موافق',
            disagree: 'غير موافق',
            confirmation: 'تأكيد',
            dark: 'تغيير الواجهة',
            deletedConfirmation: 'هل تريد حذف العناصر المختارة؟',
            actions: 'اجرائات',
            selectAll: 'اختيار الكل',
            selected: 'عناصر مختارة',
            rowPerPage: 'صفوف بالصفحة',
            densePadding: 'تقليل الحجم',
            is: '',
            are: '',
            asc: 'مرتبة تصاعديآ',
            desc: 'مرتبة تنازليآ',
            retry: 'اعادة المحاولة',
            error: 'حدث خطأ',
            codeExist: 'هذا الكود موجود مسبقا',
            
            errorServer: 'خطأ في الخادم الداخلي من فضلك حاول مرة اخرى لاحقآ',
            noDataFound: 'لا يوجد نتائج',
            trySearch: 'جرب تغيير تصفية البحث للعثور على ما تبحث عنه',
            closeIAB: 'العودة لبنك المعرفة المصري⬅',

        },
        success: {
            reminder: {
                header: 'عملية ناجحة',
                msg: 'تمت إضافة الحدث للتذكير',
                btn: 'متابعة'
            }
        }
    },
    en: {
        dateLocale: "en-US",
        client: {
            phone: "Phone Number",
            client: 'Client',
            clients: 'Clients',
            details: 'Details',
            address: 'Address',
        },
        city: {
            city: 'City',
            cities: 'Cities'
        },
        size: {
            size: 'Size',
            sizes: 'Sizes',
        },
        color: {
            color: 'Color',
            colors: 'Colors',
        },
        type: {
            type: 'Type',
            types: 'Types',
        },
        item: {
            item: 'Item',
            items: 'Items',
            price: 'Price',
            code: 'Code',
            quantity: 'Quantity',
        },
        town: {
            town: 'Town',
            towns: 'Towns',
        },
        oneItem: {
            oneItem: 'One Item',
            oneItems: 'Small Items',
        },
        orderStatus: {
            orderStatus: 'Order Status',
            orderStatuses: 'Order Statuses',
        },
        validations: {
            validName: 'Please enter a valid name',
            validNumber: 'Please enter a valid number',
            alphaNumericEnglish: 'Please enter a valid name',
            validPhoneNumber: 'Please enter a valid phone number',
            maxLength: 'Maximum length is ',
            validNatDate: 'Birthdate and national id are not identical',
            required: 'This field is required',
            matchEmail: 'cannot match e-mail address',
            matchPassword: 'cannot match password address',
            isEmail: 'Please enter a valid e-mail address',
            validDate: 'Please enter a valid Date',
            exactLength: 'This field doesn\'t match the exact length',
            validNatId: 'Please enter a valid national id',
            registerdBefore: 'This E-mail is registered before',
            natIdUsedBefore: 'This National ID is registered before',
            authIp: 'Please enter a Professional E-mail or connect from a university network',
        },
        err: {

            common: {
                header: 'Something wrong happened',
                msg: 'Please try again',
                btn: 'Try again',
                ok: 'Ok'
            },
            skipLogin: {
                header: 'Please Note',
                msg: 'Not all features are accessible from the "skip login"',
                btn: 'CONTINUE ANYWAY',
            },
            noNet: {
                header: 'Something wrong happened',
                msg: 'Please make sure the device is connected to the Internet',
                btn: 'Ok',
            },
            serverErr: {
                ok: 'ok',
                btn: 'Try again',
                header: 'Error Occured',
                msg: 'Internal server error, please try again later',
            },
            eventReminderErr: {
                header: 'Something wrong happened',
                msg: 'You already requested reminder for this event before',
                ok: 'Ok'
            }

        },
        common: {
            upload:'Upload',
            success: 'Success',
            addedSuccess: 'added successfully',
            editedSuccess: 'edited successfully',
            deletedSuccess: 'deleted successfully',
            deletedAllSuccess: 'all items are deleted successfully',
            name: 'Name',
            nameAr: 'Arabic Name',
            save: 'Save',
            delete: 'Delete',
            edit: 'Edit',
            add: 'Add',
            cancel: 'Cancel',
            agree: 'Agree',
            disagree: 'Disagree',
            confirmation: 'Confirmation',
            dark: 'Dark Mode',
            deletedConfirmation: 'are you sure you want to delete the selected items ?',
            actions: 'Actions',
            selectAll: 'Select All',
            selected: 'Selected',
            rowPerPage: 'Row Per Page',
            densePadding: 'Dense padding',
            is: 'is',
            are: 'are',
            asc: 'sorted ascending',
            desc: 'sorted descending',
            retry: 'retry',
            error: 'Error',
            codeExist: 'Code Already Exists',
            errorServer: 'Internal server error, please try again later',
            noDataFound: 'No Data Found',
            trySearch: 'Try Adjust Filters to find what you are looking for',
            closeIAB: '⬅Back to EKB',
        },
        success: {
            reminder: {
                header: 'Success',
                msg: 'The event has been added to the reminder list',
                btn: 'Proceed'
            }
        }
    }
};
export const getCurrentLng = () => {
    return localStorage.getItem(RTL_KEY);
}
export const isRTL = () => {
    return getCurrentLng() === AR ? true : false;
}

export const setLanguage = (lang) => {
    if (lang) {
        localStorage.setItem(RTL_KEY, lang);
        window.location.reload();
    }
}
export const translate = (key) => {
    const currentLanguage = getCurrentLng() || DefaultLanguage || EN;
    const local = Resources[currentLanguage];
    let path = { ...local };
    if (key) {
        let pathArr = key.split('.');
        if (pathArr) {
            pathArr.forEach(entry => {
                if (entry)
                    path = path[entry];
            });
        }
        path = path || '';
        return path;
    }
}
