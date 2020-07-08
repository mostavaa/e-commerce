import ActionStatus from './Actions/ActionStatus';
import {  REQUEST_ALL_ITEM, REQUEST_ADD_ITEM, REQUEST_EDIT_ITEM, CLOSE_EDIT_ITEM_MODAL, CLOSE_DELETED_ALL_ITEM_MODAL, CLOSE_ADD_ITEM_MODAL, REQUEST_DELETE_ITEM, CLOSE_DELETED_ITEM_MODAL, REQUEST_DELETE_ALL_ITEM } from './Actions/Actions';
import http from './../util/http';
export const ItemState = {
    isLoading: false,
    isAdded: false,
    isDeleted: false,
    isEdited: false,
    isDeletedMultiple: false,
    item: [],
    filteredData: []
}
export const actionCreators = {
    requestAllItem: () => (dispatch, getState) => {
        http.get(`item/all`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && Array.isArray(data.data))
                    dispatch({ type: REQUEST_ALL_ITEM, payload: { status: ActionStatus.SUCCESS, item: data.data } });
                else dispatch({ type: REQUEST_ALL_ITEM, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ALL_ITEM, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ALL_ITEM, payload: { status: ActionStatus.STARTED } });
    },
    closeAddedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_ADD_ITEM_MODAL });
    },
    closeDeletedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_ITEM_MODAL });
    },
    closeDeletedAllModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_ALL_ITEM_MODAL });
    },
    requestDeleteItem: (id) => (dispatch) => {
        http.post(`item/delete`, { id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_ITEM, payload: { status: ActionStatus.SUCCESS, id } });
                else dispatch({ type: REQUEST_DELETE_ITEM, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_ITEM, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_ITEM, payload: { status: ActionStatus.STARTED } });
    },
    requestEditItem: (name, typeId, id, type) => (dispatch, getState) => {
        //if (getState().item.item.filter(o => o.code ? (o.code.indexOf(code) > -1 && id != o.id) : false).length === 0) {
            http.post(`Item/edit`, { name, typeId, id })
                .then(response => response.json())
                .then(data => {
                    if (data)
                        dispatch({ type: REQUEST_EDIT_ITEM, payload: { status: ActionStatus.SUCCESS, typeName: type.name, typeNameAr: type.nameAr, typeId, name, id } });
                    else dispatch({ type: REQUEST_EDIT_ITEM, payload: { status: ActionStatus.FAILED } });
                }).catch(() => {
                    dispatch({ type: REQUEST_EDIT_ITEM, payload: { status: ActionStatus.FAILED } });
                });
            dispatch({ type: REQUEST_EDIT_ITEM, payload: { status: ActionStatus.STARTED } });
      
    },
    closeEditedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_EDIT_ITEM_MODAL });
    },
    requestAddItem: (name, typeId, type) => (dispatch, getState) => {
        //if (getState().item.item.filter(o => o.code ? o.code.indexOf(code) > -1 : false).length === 0) {
            http.post(`Item/add`, { name, typeId })
                .then(response => response.json())
                .then(data => {
                    if (data)
                        dispatch({ type: REQUEST_ADD_ITEM, payload: { status: ActionStatus.SUCCESS, typeName: type.name, typeNameAr: type.nameAr, typeId, name, id: data.id } });
                    else dispatch({ type: REQUEST_ADD_ITEM, payload: { status: ActionStatus.FAILED } });
                }).catch(() => {
                    dispatch({ type: REQUEST_ADD_ITEM, payload: { status: ActionStatus.FAILED } });
                });
            dispatch({ type: REQUEST_ADD_ITEM, payload: { status: ActionStatus.STARTED } });
      

    },
    requestDeleteAll: (ids) => (dispatch) => {
        http.post(`Item/deleteall`, { ids })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_ALL_ITEM, payload: { status: ActionStatus.SUCCESS, ids } });
                else dispatch({ type: REQUEST_DELETE_ALL_ITEM, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_ALL_ITEM, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_ALL_ITEM, payload: { status: ActionStatus.STARTED } });
    },
};

export const reducer = (state = ItemState, action) => {
    const { payload } = action;
    switch (action.type) {
        case REQUEST_ALL_ITEM:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        item: [],
                        isLoading: true
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        item: [],
                        isLoading: false
                    };
                case ActionStatus.SUCCESS:
                    return {
                        ...state,
                        item: [].concat(...payload.item),
                        isLoading: false
                    };
                default:
                    return {
                        ...state,
                        item: [],
                        isLoading: false
                    }
            }
        case CLOSE_ADD_ITEM_MODAL: {
            return {
                ...state,
                isAdded: false
            };
        }
        case CLOSE_DELETED_ITEM_MODAL: {
            return {
                ...state,
                isDeleted: false
            };
        }
        case CLOSE_EDIT_ITEM_MODAL: {
            return {
                ...state,
                isEdited: false
            };
        }
        case CLOSE_DELETED_ALL_ITEM_MODAL: {
            return {
                ...state,
                isDeletedMultiple: false
            };
        }
        case REQUEST_ADD_ITEM:
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
                        item: state.item.concat({ typeId: payload.typeId, typeName: payload.typeName, typeNameAr: payload.typeNameAr, name: payload.name, id: payload.id }),
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
        case REQUEST_EDIT_ITEM:
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
                    const { id, name, typeId, typeNameAr, typeName } = payload;
                    const itemIndex = state.item.findIndex(o => o.id == id);
                    if (itemIndex > -1) {
                        state.item[itemIndex].name = name;
                        state.item[itemIndex].typeId = typeId;
                        state.item[itemIndex].typeName = typeName;
                        state.item[itemIndex].typeNameAr = typeNameAr;
                    }
                    return {
                        ...state,
                        item: Array.from(state.item),
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
        case REQUEST_DELETE_ITEM:
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
                    const itemIndex = state.item.findIndex(o => o.id == id);
                    if (itemIndex > -1)
                        state.item.splice(itemIndex, 1);
                    return {
                        ...state,
                        item: Array.from(state.item),
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
        case REQUEST_DELETE_ALL_ITEM:
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
                        const itemIndex = state.item.findIndex(o => o.id == element);
                        if (itemIndex > -1)
                            state.item.splice(itemIndex, 1);
                    }

                    return {
                        ...state,
                        item: Array.from(state.item),
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
