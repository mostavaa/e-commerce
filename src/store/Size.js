import ActionStatus from './Actions/ActionStatus';
import { REQUEST_ALL_SIZE, REQUEST_ADD_SIZE,REQUEST_EDIT_SIZE, CLOSE_EDIT_SIZE_MODAL, CLOSE_DELETED_ALL_SIZE_MODAL, CLOSE_ADD_SIZE_MODAL, REQUEST_DELETE_SIZE, CLOSE_DELETED_SIZE_MODAL, REQUEST_DELETE_ALL_SIZE } from './Actions/Actions';
import http from './../util/http';
export const SizeState = {
    isLoading: false,
    isAdded: false,
    isDeleted: false,
    isEdited: false,
    isDeletedMultiple: false,
    size: []
}
export const actionCreators = {
    requestAllSize: () => (dispatch, getState) => {
        http.get(`size/all`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && Array.isArray(data.data))
                    dispatch({ type: REQUEST_ALL_SIZE, payload: { status: ActionStatus.SUCCESS, size: data.data } });
                else dispatch({ type: REQUEST_ALL_SIZE, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ALL_SIZE, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ALL_SIZE, payload: { status: ActionStatus.STARTED } });
    },
    closeAddedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_ADD_SIZE_MODAL });
    },
    closeDeletedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_SIZE_MODAL });
    },
    closeDeletedAllModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_ALL_SIZE_MODAL });
    },
    requestDeleteSize: (id) => (dispatch) => {
        http.post(`size/delete`, { id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_SIZE, payload: { status: ActionStatus.SUCCESS, id } });
                else dispatch({ type: REQUEST_DELETE_SIZE, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_SIZE, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_SIZE, payload: { status: ActionStatus.STARTED } });
    },
    requestEditSize: (name, nameAr, id) => (dispatch, getState) => {
        http.post(`Size/edit`, { name, nameAr, id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_EDIT_SIZE, payload: { status: ActionStatus.SUCCESS, nameAr, name, id } });
                else dispatch({ type: REQUEST_EDIT_SIZE, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_EDIT_SIZE, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_EDIT_SIZE, payload: { status: ActionStatus.STARTED } });
    },
    closeEditedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_EDIT_SIZE_MODAL });
    },
    requestAddSize: (name, nameAr) => (dispatch, getState) => {
        http.post(`Size/add`, { name, nameAr })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_ADD_SIZE, payload: { status: ActionStatus.SUCCESS, nameAr, name, id: data.id } });
                else dispatch({ type: REQUEST_ADD_SIZE, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ADD_SIZE, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ADD_SIZE, payload: { status: ActionStatus.STARTED } });
    },
    requestDeleteAll: (ids) => (dispatch) => {
        http.post(`Size/deleteall`, { ids })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_ALL_SIZE, payload: { status: ActionStatus.SUCCESS, ids } });
                else dispatch({ type: REQUEST_DELETE_ALL_SIZE, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_ALL_SIZE, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_ALL_SIZE, payload: { status: ActionStatus.STARTED } });
    },
};

export const reducer = (state = SizeState, action) => {
    const { payload } = action;
    switch (action.type) {
        case REQUEST_ALL_SIZE:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        size: [],
                        isLoading: true
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        size: [],
                        isLoading: false
                    };
                case ActionStatus.SUCCESS:
                    return {
                        ...state,
                        size: [].concat(...payload.size),
                        isLoading: false
                    };
                default:
                    return {
                        ...state,
                        size: [],
                        isLoading: false
                    }
            }
        case CLOSE_ADD_SIZE_MODAL: {
            return {
                ...state,
                isAdded: false
            };
        }
        case CLOSE_DELETED_SIZE_MODAL: {
            return {
                ...state,
                isDeleted: false
            };
        }
        case CLOSE_EDIT_SIZE_MODAL: {
            return {
                ...state,
                isEdited: false
            };
        }
        case CLOSE_DELETED_ALL_SIZE_MODAL: {
            return {
                ...state,
                isDeletedMultiple: false
            };
        }

        case REQUEST_ADD_SIZE:
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
                        size: state.size.concat({ nameAr: payload.nameAr, name: payload.name, id: payload.id }),
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
        case REQUEST_EDIT_SIZE:
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
                    const sizeIndex = state.size.findIndex(o => o.id == id);
                    if (sizeIndex > -1) {
                        state.size[sizeIndex].name = name;
                        state.size[sizeIndex].nameAr = nameAr;
                    }
                    return {
                        ...state,
                        size: Array.from(state.size),
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
        case REQUEST_DELETE_SIZE:
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
                    const sizeIndex = state.size.findIndex(o => o.id == id);
                    if (sizeIndex > -1)
                        state.size.splice(sizeIndex, 1);
                    return {
                        ...state,
                        size: Array.from(state.size),
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
        case REQUEST_DELETE_ALL_SIZE:
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
                        const sizeIndex = state.size.findIndex(o => o.id == element);
                        if (sizeIndex > -1)
                            state.size.splice(sizeIndex, 1);
                    }

                    return {
                        ...state,
                        size: Array.from(state.size),
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
