import ActionStatus from './Actions/ActionStatus';
import { REQUEST_ALL_ORDER_STATUS, REQUEST_ADD_ORDER_STATUS,REQUEST_EDIT_ORDER_STATUS, CLOSE_EDIT_ORDER_STATUS_MODAL, CLOSE_DELETED_ALL_ORDER_STATUS_MODAL, CLOSE_ADD_ORDER_STATUS_MODAL, REQUEST_DELETE_ORDER_STATUS, CLOSE_DELETED_ORDER_STATUS_MODAL, REQUEST_DELETE_ALL_ORDER_STATUS } from './Actions/Actions';
import http from './../util/http';
export const OrderStatusState = {
    isLoading: false,
    isAdded: false,
    isDeleted: false,
    isEdited: false,
    isDeletedMultiple: false,
    orderStatus: []
}
export const actionCreators = {
    requestAllOrderStatus: () => (dispatch, getState) => {
        http.get(`orderStatus/all`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && Array.isArray(data.data))
                    dispatch({ type: REQUEST_ALL_ORDER_STATUS, payload: { status: ActionStatus.SUCCESS, orderStatus: data.data } });
                else dispatch({ type: REQUEST_ALL_ORDER_STATUS, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ALL_ORDER_STATUS, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ALL_ORDER_STATUS, payload: { status: ActionStatus.STARTED } });
    },
    closeAddedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_ADD_ORDER_STATUS_MODAL });
    },
    closeDeletedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_ORDER_STATUS_MODAL });
    },
    closeDeletedAllModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_ALL_ORDER_STATUS_MODAL });
    },
    requestDeleteOrderStatus: (id) => (dispatch) => {
        http.post(`orderStatus/delete`, { id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_ORDER_STATUS, payload: { status: ActionStatus.SUCCESS, id } });
                else dispatch({ type: REQUEST_DELETE_ORDER_STATUS, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_ORDER_STATUS, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_ORDER_STATUS, payload: { status: ActionStatus.STARTED } });
    },
    requestEditOrderStatus: (name, nameAr, id) => (dispatch, getState) => {
        http.post(`OrderStatus/edit`, { name, nameAr, id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_EDIT_ORDER_STATUS, payload: { status: ActionStatus.SUCCESS, nameAr, name, id } });
                else dispatch({ type: REQUEST_EDIT_ORDER_STATUS, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_EDIT_ORDER_STATUS, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_EDIT_ORDER_STATUS, payload: { status: ActionStatus.STARTED } });
    },
    closeEditedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_EDIT_ORDER_STATUS_MODAL });
    },
    requestAddOrderStatus: (name, nameAr) => (dispatch, getState) => {
        http.post(`OrderStatus/add`, { name, nameAr })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_ADD_ORDER_STATUS, payload: { status: ActionStatus.SUCCESS, nameAr, name, id: data.id } });
                else dispatch({ type: REQUEST_ADD_ORDER_STATUS, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ADD_ORDER_STATUS, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ADD_ORDER_STATUS, payload: { status: ActionStatus.STARTED } });
    },
    requestDeleteAll: (ids) => (dispatch) => {
        http.post(`OrderStatus/deleteall`, { ids })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_ALL_ORDER_STATUS, payload: { status: ActionStatus.SUCCESS, ids } });
                else dispatch({ type: REQUEST_DELETE_ALL_ORDER_STATUS, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_ALL_ORDER_STATUS, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_ALL_ORDER_STATUS, payload: { status: ActionStatus.STARTED } });
    },
};

export const reducer = (state = OrderStatusState, action) => {
    const { payload } = action;
    switch (action.type) {
        case REQUEST_ALL_ORDER_STATUS:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        orderStatus: [],
                        isLoading: true
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        orderStatus: [],
                        isLoading: false
                    };
                case ActionStatus.SUCCESS:
                    return {
                        ...state,
                        orderStatus: [].concat(...payload.orderStatus),
                        isLoading: false
                    };
                default:
                    return {
                        ...state,
                        orderStatus: [],
                        isLoading: false
                    }
            }
        case CLOSE_ADD_ORDER_STATUS_MODAL: {
            return {
                ...state,
                isAdded: false
            };
        }
        case CLOSE_DELETED_ORDER_STATUS_MODAL: {
            return {
                ...state,
                isDeleted: false
            };
        }
        case CLOSE_EDIT_ORDER_STATUS_MODAL: {
            return {
                ...state,
                isEdited: false
            };
        }
        case CLOSE_DELETED_ALL_ORDER_STATUS_MODAL: {
            return {
                ...state,
                isDeletedMultiple: false
            };
        }

        case REQUEST_ADD_ORDER_STATUS:
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
                        orderStatus: state.orderStatus.concat({ nameAr: payload.nameAr, name: payload.name, id: payload.id }),
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
        case REQUEST_EDIT_ORDER_STATUS:
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
                    const { id, name, nameAr } = payload;
                    const orderStatusIndex = state.orderStatus.findIndex(o => o.id == id);
                    if (orderStatusIndex > -1) {
                        state.orderStatus[orderStatusIndex].name = name;
                        state.orderStatus[orderStatusIndex].nameAr = nameAr;
                    }
                    return {
                        ...state,
                        orderStatus: Array.from(state.orderStatus),
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
        case REQUEST_DELETE_ORDER_STATUS:
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
                    const orderStatusIndex = state.orderStatus.findIndex(o => o.id == id);
                    if (orderStatusIndex > -1)
                        state.orderStatus.splice(orderStatusIndex, 1);
                    return {
                        ...state,
                        orderStatus: Array.from(state.orderStatus),
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
        case REQUEST_DELETE_ALL_ORDER_STATUS:
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
                        const orderStatusIndex = state.orderStatus.findIndex(o => o.id == element);
                        if (orderStatusIndex > -1)
                            state.orderStatus.splice(orderStatusIndex, 1);
                    }

                    return {
                        ...state,
                        orderStatus: Array.from(state.orderStatus),
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
