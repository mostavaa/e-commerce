import ActionStatus from './Actions/ActionStatus';
import { REQUEST_ALL_TYPE, REQUEST_ADD_TYPE,REQUEST_EDIT_TYPE, CLOSE_EDIT_TYPE_MODAL, CLOSE_DELETED_ALL_TYPE_MODAL, CLOSE_ADD_TYPE_MODAL, REQUEST_DELETE_TYPE, CLOSE_DELETED_TYPE_MODAL, REQUEST_DELETE_ALL_TYPE } from './Actions/Actions';
import http from './../util/http';
export const TypeState = {
    isLoading: false,
    isAdded: false,
    isDeleted: false,
    isEdited: false,
    isDeletedMultiple: false,
    type: []
}
export const actionCreators = {
    requestAllType: () => (dispatch, getState) => {
        http.get(`type/all`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && Array.isArray(data.data))
                    dispatch({ type: REQUEST_ALL_TYPE, payload: { status: ActionStatus.SUCCESS, type: data.data } });
                else dispatch({ type: REQUEST_ALL_TYPE, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ALL_TYPE, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ALL_TYPE, payload: { status: ActionStatus.STARTED } });
    },
    closeAddedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_ADD_TYPE_MODAL });
    },
    closeDeletedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_TYPE_MODAL });
    },
    closeDeletedAllModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_ALL_TYPE_MODAL });
    },
    requestDeleteType: (id) => (dispatch) => {
        http.post(`type/delete`, { id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_TYPE, payload: { status: ActionStatus.SUCCESS, id } });
                else dispatch({ type: REQUEST_DELETE_TYPE, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_TYPE, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_TYPE, payload: { status: ActionStatus.STARTED } });
    },
    requestEditType: (name, nameAr, id) => (dispatch, getState) => {
        http.post(`Type/edit`, { name, nameAr, id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_EDIT_TYPE, payload: { status: ActionStatus.SUCCESS, nameAr, name, id } });
                else dispatch({ type: REQUEST_EDIT_TYPE, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_EDIT_TYPE, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_EDIT_TYPE, payload: { status: ActionStatus.STARTED } });
    },
    closeEditedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_EDIT_TYPE_MODAL });
    },
    requestAddType: (name, nameAr) => (dispatch, getState) => {
        http.post(`Type/add`, { name, nameAr })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_ADD_TYPE, payload: { status: ActionStatus.SUCCESS, nameAr, name, id: data.id } });
                else dispatch({ type: REQUEST_ADD_TYPE, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ADD_TYPE, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ADD_TYPE, payload: { status: ActionStatus.STARTED } });
    },
    requestDeleteAll: (ids) => (dispatch) => {
        http.post(`Type/deleteall`, { ids })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_ALL_TYPE, payload: { status: ActionStatus.SUCCESS, ids } });
                else dispatch({ type: REQUEST_DELETE_ALL_TYPE, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_ALL_TYPE, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_ALL_TYPE, payload: { status: ActionStatus.STARTED } });
    },
};

export const reducer = (state = TypeState, action) => {
    const { payload } = action;
    switch (action.type) {
        case REQUEST_ALL_TYPE:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        type: [],
                        isLoading: true
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        type: [],
                        isLoading: false
                    };
                case ActionStatus.SUCCESS:
                    return {
                        ...state,
                        type: [].concat(...payload.type),
                        isLoading: false
                    };
                default:
                    return {
                        ...state,
                        type: [],
                        isLoading: false
                    }
            }
        case CLOSE_ADD_TYPE_MODAL: {
            return {
                ...state,
                isAdded: false
            };
        }
        case CLOSE_DELETED_TYPE_MODAL: {
            return {
                ...state,
                isDeleted: false
            };
        }
        case CLOSE_EDIT_TYPE_MODAL: {
            return {
                ...state,
                isEdited: false
            };
        }
        case CLOSE_DELETED_ALL_TYPE_MODAL: {
            return {
                ...state,
                isDeletedMultiple: false
            };
        }

        case REQUEST_ADD_TYPE:
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
                        type: state.type.concat({ nameAr: payload.nameAr, name: payload.name, id: payload.id }),
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
        case REQUEST_EDIT_TYPE:
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
                    const typeIndex = state.type.findIndex(o => o.id == id);
                    if (typeIndex > -1) {
                        state.type[typeIndex].name = name;
                        state.type[typeIndex].nameAr = nameAr;
                    }
                    return {
                        ...state,
                        type: Array.from(state.type),
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
        case REQUEST_DELETE_TYPE:
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
                    const typeIndex = state.type.findIndex(o => o.id == id);
                    if (typeIndex > -1)
                        state.type.splice(typeIndex, 1);
                    return {
                        ...state,
                        type: Array.from(state.type),
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
        case REQUEST_DELETE_ALL_TYPE:
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
                        const typeIndex = state.type.findIndex(o => o.id == element);
                        if (typeIndex > -1)
                            state.type.splice(typeIndex, 1);
                    }

                    return {
                        ...state,
                        type: Array.from(state.type),
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
