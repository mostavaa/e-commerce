import ActionStatus from './Actions/ActionStatus';
import { REQUEST_ALL_COLOR, REQUEST_ADD_COLOR,REQUEST_EDIT_COLOR, CLOSE_EDIT_COLOR_MODAL, CLOSE_DELETED_ALL_COLOR_MODAL, CLOSE_ADD_COLOR_MODAL, REQUEST_DELETE_COLOR, CLOSE_DELETED_COLOR_MODAL, REQUEST_DELETE_ALL_COLOR } from './Actions/Actions';
import http from './../util/http';
export const ColorState = {
    isLoading: false,
    isAdded: false,
    isDeleted: false,
    isEdited: false,
    isDeletedMultiple: false,
    color: []
}
export const actionCreators = {
    requestAllColor: () => (dispatch, getState) => {
        http.get(`color/all`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && Array.isArray(data.data))
                    dispatch({ type: REQUEST_ALL_COLOR, payload: { status: ActionStatus.SUCCESS, color: data.data } });
                else dispatch({ type: REQUEST_ALL_COLOR, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ALL_COLOR, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ALL_COLOR, payload: { status: ActionStatus.STARTED } });
    },
    closeAddedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_ADD_COLOR_MODAL });
    },
    closeDeletedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_COLOR_MODAL });
    },
    closeDeletedAllModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_ALL_COLOR_MODAL });
    },
    requestDeleteColor: (id) => (dispatch) => {
        http.post(`color/delete`, { id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_COLOR, payload: { status: ActionStatus.SUCCESS, id } });
                else dispatch({ type: REQUEST_DELETE_COLOR, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_COLOR, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_COLOR, payload: { status: ActionStatus.STARTED } });
    },
    requestEditColor: (name, nameAr, id) => (dispatch, getState) => {
        http.post(`Color/edit`, { name, nameAr, id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_EDIT_COLOR, payload: { status: ActionStatus.SUCCESS, nameAr, name, id } });
                else dispatch({ type: REQUEST_EDIT_COLOR, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_EDIT_COLOR, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_EDIT_COLOR, payload: { status: ActionStatus.STARTED } });
    },
    closeEditedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_EDIT_COLOR_MODAL });
    },
    requestAddColor: (name, nameAr) => (dispatch, getState) => {
        http.post(`Color/add`, { name, nameAr })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_ADD_COLOR, payload: { status: ActionStatus.SUCCESS, nameAr, name, id: data.id } });
                else dispatch({ type: REQUEST_ADD_COLOR, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ADD_COLOR, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ADD_COLOR, payload: { status: ActionStatus.STARTED } });
    },
    requestDeleteAll: (ids) => (dispatch) => {
        http.post(`Color/deleteall`, { ids })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_ALL_COLOR, payload: { status: ActionStatus.SUCCESS, ids } });
                else dispatch({ type: REQUEST_DELETE_ALL_COLOR, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_ALL_COLOR, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_ALL_COLOR, payload: { status: ActionStatus.STARTED } });
    },
};

export const reducer = (state = ColorState, action) => {
    const { payload } = action;
    switch (action.type) {
        case REQUEST_ALL_COLOR:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        color: [],
                        isLoading: true
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        color: [],
                        isLoading: false
                    };
                case ActionStatus.SUCCESS:
                    return {
                        ...state,
                        color: [].concat(...payload.color),
                        isLoading: false
                    };
                default:
                    return {
                        ...state,
                        color: [],
                        isLoading: false
                    }
            }
        case CLOSE_ADD_COLOR_MODAL: {
            return {
                ...state,
                isAdded: false
            };
        }
        case CLOSE_DELETED_COLOR_MODAL: {
            return {
                ...state,
                isDeleted: false
            };
        }
        case CLOSE_EDIT_COLOR_MODAL: {
            return {
                ...state,
                isEdited: false
            };
        }
        case CLOSE_DELETED_ALL_COLOR_MODAL: {
            return {
                ...state,
                isDeletedMultiple: false
            };
        }

        case REQUEST_ADD_COLOR:
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
                        color: state.color.concat({ nameAr: payload.nameAr, name: payload.name, id: payload.id }),
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
        case REQUEST_EDIT_COLOR:
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
                    const colorIndex = state.color.findIndex(o => o.id == id);
                    if (colorIndex > -1) {
                        state.color[colorIndex].name = name;
                        state.color[colorIndex].nameAr = nameAr;
                    }
                    return {
                        ...state,
                        color: Array.from(state.color),
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
        case REQUEST_DELETE_COLOR:
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
                    const colorIndex = state.color.findIndex(o => o.id == id);
                    if (colorIndex > -1)
                        state.color.splice(colorIndex, 1);
                    return {
                        ...state,
                        color: Array.from(state.color),
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
        case REQUEST_DELETE_ALL_COLOR:
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
                        const colorIndex = state.color.findIndex(o => o.id == element);
                        if (colorIndex > -1)
                            state.color.splice(colorIndex, 1);
                    }

                    return {
                        ...state,
                        color: Array.from(state.color),
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
