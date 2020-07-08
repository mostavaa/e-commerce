import ActionStatus from './Actions/ActionStatus';
import { REMOVE_ONEITEM_UPLOAD_IMG, REQUEST_ALL_ONEITEM_UPLOAD_IMG, REQUEST_ALL_ONEITEM_UPLOADS, CLOSE_ONEITEM_FILES_MODAL, ONEITEM_ADD_FILES, ONEITEM_HAS_ERROR_MODAL, ONEITEM_CLOSE_HAS_ERROR_MODAL, REQUEST_ALL_ONEITEM, REQUEST_ADD_ONEITEM, REQUEST_EDIT_ONEITEM, CLOSE_EDIT_ONEITEM_MODAL, CLOSE_DELETED_ALL_ONEITEM_MODAL, CLOSE_ADD_ONEITEM_MODAL, REQUEST_DELETE_ONEITEM, CLOSE_DELETED_ONEITEM_MODAL, REQUEST_DELETE_ALL_ONEITEM } from './Actions/Actions';
import http from './../util/http';
import { translate } from '../util/translate';
export const OneItemState = {
    isLoading: false,
    isAdded: false,
    isDeleted: false,
    isEdited: false,
    isDeletedMultiple: false,
    hasError: false,
    error: '',
    oneItem: [],
    filteredData: [],
    addFiles: 0,
    attachments: []
}
export const actionCreators = {
    uploadOneItemFiles: (files, id) => (dispatch, getState) => {
        const data = new FormData();

        for (const file of files) {
            data.append('files[]', file, file.name);
        }
        data.append('id', id);

        http.postWithFiles(`oneItem/upload`, data)
            .then(response => response.json())
            .then(data => {
                if (data && data.res)
                    dispatch({ type: ONEITEM_ADD_FILES, payload: { status: ActionStatus.SUCCESS, items: data.res } });
                else dispatch({ type: ONEITEM_ADD_FILES, payload: { status: ActionStatus.FAILED } });


            }).catch(() => {
                dispatch({ type: ONEITEM_ADD_FILES, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: ONEITEM_ADD_FILES, payload: { status: ActionStatus.STARTED } });

    },
    requestAllOneItem: () => (dispatch, getState) => {
        http.get(`oneItem/all`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && Array.isArray(data.data))
                    dispatch({ type: REQUEST_ALL_ONEITEM, payload: { status: ActionStatus.SUCCESS, oneItem: data.data } });
                else dispatch({ type: REQUEST_ALL_ONEITEM, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ALL_ONEITEM, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ALL_ONEITEM, payload: { status: ActionStatus.STARTED } });
    },
    requestRemoveUploadImage: (id) => (dispatch, getState) => {
            http.post(`oneItem/removeImg`, { id })
                .then(response => response.json())
                .then(data => {
                    if (data)
                        dispatch({ type: REMOVE_ONEITEM_UPLOAD_IMG, payload: { status: ActionStatus.SUCCESS, id } });
                    else dispatch({ type: REMOVE_ONEITEM_UPLOAD_IMG, payload: { status: ActionStatus.FAILED } });
                }).catch(() => {
                    dispatch({ type: REMOVE_ONEITEM_UPLOAD_IMG, payload: { status: ActionStatus.FAILED } });
                });
            dispatch({ type: REMOVE_ONEITEM_UPLOAD_IMG, payload: { status: ActionStatus.STARTED } });

        
    },
    
    requestGetUploadImage: (id, contentType) => (dispatch, getState) => {
        if (contentType) {
            http.post(`oneItem/getImg`, { id })
                .then(response => response.blob())
                .then(data => {
                    if (data)
                        dispatch({ type: REQUEST_ALL_ONEITEM_UPLOAD_IMG, payload: { status: ActionStatus.SUCCESS, id, attachment: data } });
                    else dispatch({ type: REQUEST_ALL_ONEITEM_UPLOAD_IMG, payload: { status: ActionStatus.FAILED } });
                }).catch(() => {
                    dispatch({ type: REQUEST_ALL_ONEITEM_UPLOAD_IMG, payload: { status: ActionStatus.FAILED } });
                });
            dispatch({ type: REQUEST_ALL_ONEITEM_UPLOAD_IMG, payload: { id,status: ActionStatus.STARTED } });

        }
    },
    requestGetUploadsOneItem: (id) => (dispatch, getState) => {
        http.post(`oneItem/getUploads`, { id })
            .then(response => response.json())
            .then(data => {
                if (data && data.data && Array.isArray(data.data))
                    dispatch({ type: REQUEST_ALL_ONEITEM_UPLOADS, payload: { status: ActionStatus.SUCCESS, attachments: data.data } });
                else dispatch({ type: REQUEST_ALL_ONEITEM_UPLOADS, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ALL_ONEITEM_UPLOADS, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ALL_ONEITEM_UPLOADS, payload: { status: ActionStatus.STARTED } });
    },
    closeFilesModal: () => (dispatch) => {
        dispatch({ type: CLOSE_ONEITEM_FILES_MODAL });
    },
    closeAddedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_ADD_ONEITEM_MODAL });
    },
    closeDeletedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_ONEITEM_MODAL });
    },
    closeDeletedAllModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_ALL_ONEITEM_MODAL });
    },
    requestDeleteOneItem: (id) => (dispatch) => {
        http.post(`oneItem/delete`, { id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_ONEITEM, payload: { status: ActionStatus.SUCCESS, id } });
                else dispatch({ type: REQUEST_DELETE_ONEITEM, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_ONEITEM, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_ONEITEM, payload: { status: ActionStatus.STARTED } });
    },
    requestEditOneItem: (obj, id) => (dispatch, getState) => {
        if (getState().oneItem.oneItem.filter(o => o.code ? (o.code.indexOf(obj.code) > -1 && id != o.id) : false).length === 0) {
            http.post(`OneItem/edit`, { ...obj, id })
                .then(response => response.json())
                .then(data => {
                    if (data)
                        dispatch({ type: REQUEST_EDIT_ONEITEM, payload: { status: ActionStatus.SUCCESS, ...obj, id } });
                    else dispatch({ type: REQUEST_EDIT_ONEITEM, payload: { status: ActionStatus.FAILED } });
                }).catch(() => {
                    dispatch({ type: REQUEST_EDIT_ONEITEM, payload: { status: ActionStatus.FAILED } });
                });
            dispatch({ type: REQUEST_EDIT_ONEITEM, payload: { status: ActionStatus.STARTED } });
        } else {
            dispatch({ type: ONEITEM_HAS_ERROR_MODAL, payload: { error: translate('common.codeExist') } });
        }

    },
    closeEditedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_EDIT_ONEITEM_MODAL });
    },
    closeErrorModal: () => (dispatch) => {
        dispatch({ type: ONEITEM_CLOSE_HAS_ERROR_MODAL });
    },
    requestAddOneItem: (obj) => (dispatch, getState) => {
        if (getState().oneItem.oneItem.filter(o => o.code ? o.code.indexOf(obj.code) > -1 : false).length === 0) {
            http.post(`OneItem/add`, { ...obj })
                .then(response => response.json())
                .then(data => {
                    if (data)
                        dispatch({ type: REQUEST_ADD_ONEITEM, payload: { status: ActionStatus.SUCCESS, ...obj, id: data.id } });
                    else dispatch({ type: REQUEST_ADD_ONEITEM, payload: { status: ActionStatus.FAILED } });
                }).catch(() => {
                    dispatch({ type: REQUEST_ADD_ONEITEM, payload: { status: ActionStatus.FAILED } });
                });
            dispatch({ type: REQUEST_ADD_ONEITEM, payload: { status: ActionStatus.STARTED } });
        } else {
            dispatch({ type: ONEITEM_HAS_ERROR_MODAL, payload: { error: translate('common.codeExist') } });
        }

    },
    requestDeleteAll: (ids) => (dispatch) => {
        http.post(`OneItem/deleteall`, { ids })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_ALL_ONEITEM, payload: { status: ActionStatus.SUCCESS, ids } });
                else dispatch({ type: REQUEST_DELETE_ALL_ONEITEM, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_ALL_ONEITEM, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_ALL_ONEITEM, payload: { status: ActionStatus.STARTED } });
    },
};

export const reducer = (state = OneItemState, action) => {
    const { payload } = action;
    switch (action.type) {
        case REQUEST_ALL_ONEITEM_UPLOADS:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        attachments: [],
                        isLoading: true
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        attachments: [],
                        isLoading: false
                    };
                case ActionStatus.SUCCESS:
                    return {
                        ...state,
                        attachments: [].concat(...payload.attachments),
                        isLoading: false
                    };
                default:
                    return {
                        ...state,
                        attachments: [],
                        isLoading: false
                    }
            }
            case REMOVE_ONEITEM_UPLOAD_IMG: 
            switch (payload.status) {
                case ActionStatus.SUCCESS:
                    let arr = [...state.attachments];
                    const index = arr.findIndex(o => o.id == payload.id);
                    if (index > -1) {
                        arr.splice(index,1);
                    }
                    return {
                        ...state,
                        attachments: [].concat(...arr),
                    };
                default:
                    return {
                        ...state,
                        isLoading: false
                    }
            }
        case REQUEST_ALL_ONEITEM_UPLOAD_IMG:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    let arrData = [...state.attachments];
                    const indexData = arrData.findIndex(o => o.id == payload.id);
                    if (indexData > -1) {
                            arrData[indexData].isLoading = true;
                    }
                    return {
                        ...state,
                        attachments: [].concat(...arrData),
                    };
                case ActionStatus.SUCCESS:
                    let arr = [...state.attachments];
                    const index = arr.findIndex(o => o.id == payload.id);
                    if (index > -1) {
                        if (payload.attachment)
                            arr[index].src = payload.attachment;
                    }
                    return {
                        ...state,
                        attachments: [].concat(...arr),
                    };
                default:
                    return {
                        ...state,
                        isLoading: false
                    }
            }
        case REQUEST_ALL_ONEITEM:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        oneItem: [],
                        isLoading: true
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        oneItem: [],
                        isLoading: false
                    };
                case ActionStatus.SUCCESS:
                    return {
                        ...state,
                        oneItem: [].concat(...payload.oneItem),
                        isLoading: false
                    };
                default:
                    return {
                        ...state,
                        oneItem: [],
                        isLoading: false
                    }
            }
        case ONEITEM_ADD_FILES:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        isLoading: true,
                        addFiles: 0
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        isLoading: false,
                        addFiles: 0
                    };
                case ActionStatus.SUCCESS:
                    const { items } = payload;
                    let arr = [...state.attachments];
                    if (items && items.length > 0) {
                        arr.push(...items);
                    }
                    return {
                        ...state,
                        isLoading: false,
                        attachments: [...arr],
                        addFiles: 1
                    };
                default:
                    return {
                        ...state,
                    }
            }

        case CLOSE_ADD_ONEITEM_MODAL: {
            return {
                ...state,
                isAdded: false
            };
        }
        case CLOSE_ONEITEM_FILES_MODAL: {
            return {
                ...state,
                addFiles: false
            };
        }

        case CLOSE_DELETED_ONEITEM_MODAL: {
            return {
                ...state,
                isDeleted: false
            };
        }
        case CLOSE_EDIT_ONEITEM_MODAL: {
            return {
                ...state,
                isEdited: false
            };
        }
        case ONEITEM_CLOSE_HAS_ERROR_MODAL: {
            return {
                ...state,
                hasError: false
            };
        }
        case ONEITEM_HAS_ERROR_MODAL: {
            return {
                ...state,
                hasError: true,
                error: payload.error
            };
        }
        case CLOSE_DELETED_ALL_ONEITEM_MODAL: {
            return {
                ...state,
                isDeletedMultiple: false
            };
        }
        case REQUEST_ADD_ONEITEM:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        isLoading: true,
                        isAdded: false
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        isLoading: false,
                        isAdded: false
                    };
                case ActionStatus.SUCCESS:
                    return {
                        ...state,
                        oneItem: state.oneItem.concat({ ...payload }),
                        isLoading: false,
                        isAdded: true,
                    };
                default:
                    return {
                        ...state,
                        isLoading: false,
                        isAdded: false
                    }
            }
        case REQUEST_EDIT_ONEITEM:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        isLoading: true,
                        isEdited: false
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        isLoading: false,
                        isEdited: false
                    };
                case ActionStatus.SUCCESS:
                    const { id } = payload;
                    const oneItemIndex = state.oneItem.findIndex(o => o.id == id);
                    if (oneItemIndex > -1) {
                        Object.keys(payload).forEach(key => {
                            state.oneItem[oneItemIndex][key] = payload[key];
                        });
                    }
                    return {
                        ...state,
                        oneItem: Array.from(state.oneItem),
                        isLoading: false,
                        isEdited: true,
                    };
                default:
                    return {
                        ...state,
                        isLoading: false,
                        isEdited: false
                    }
            }
        case REQUEST_DELETE_ONEITEM:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        isLoading: true,
                        isDeleted: false
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        isLoading: false,
                        isDeleted: false
                    };
                case ActionStatus.SUCCESS:
                    const { id } = payload;
                    const oneItemIndex = state.oneItem.findIndex(o => o.id == id);
                    if (oneItemIndex > -1)
                        state.oneItem.splice(oneItemIndex, 1);
                    return {
                        ...state,
                        oneItem: Array.from(state.oneItem),
                        isLoading: false,
                        isDeleted: true,
                    };
                default:
                    return {
                        ...state,
                        isLoading: false,
                        isDeleted: false
                    }
            }
        case REQUEST_DELETE_ALL_ONEITEM:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        isLoading: true,
                        isDeletedMultiple: false
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        isLoading: false,
                        isDeletedMultiple: false
                    };
                case ActionStatus.SUCCESS:
                    const { ids } = payload;
                    for (let index = 0; index < ids.length; index++) {
                        const element = ids[index];
                        const oneItemIndex = state.oneItem.findIndex(o => o.id == element);
                        if (oneItemIndex > -1)
                            state.oneItem.splice(oneItemIndex, 1);
                    }

                    return {
                        ...state,
                        oneItem: Array.from(state.oneItem),
                        isLoading: false,
                        isDeletedMultiple: true,
                    };
                default:
                    return {
                        ...state,
                        isLoading: false,
                        isDeletedMultiple: false
                    }
            }


    }

    return state;
};
