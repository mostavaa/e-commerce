import ActionStatus from './Actions/ActionStatus';
import { REQUEST_ALL_CITIES, REQUEST_ADD_CITIES,REQUEST_EDIT_CITIES, CLOSE_EDIT_CITY_MODAL, CLOSE_DELETED_ALL_CITY_MODAL, CLOSE_ADD_CITY_MODAL, REQUEST_DELETE_CITY, CLOSE_DELETED_CITY_MODAL, REQUEST_DELETE_ALL_CITY } from './Actions/Actions';
import http from './../util/http';
export const CityState = {
    isLoading: false,
    isAdded: false,
    isDeleted: false,
    isEdited: false,
    isDeletedMultiple: false,
    cities: []
}
export const actionCreators = {
    requestAllCities: () => (dispatch, getState) => {
        http.get(`cities/all`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && Array.isArray(data.data))
                    dispatch({ type: REQUEST_ALL_CITIES, payload: { status: ActionStatus.SUCCESS, cities: data.data } });
                else dispatch({ type: REQUEST_ALL_CITIES, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ALL_CITIES, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ALL_CITIES, payload: { status: ActionStatus.STARTED } });
    },
    closeAddedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_ADD_CITY_MODAL });
    },
    closeDeletedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_CITY_MODAL });
    },
    closeDeletedAllModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_ALL_CITY_MODAL });
    },
    requestDeleteCity: (id) => (dispatch) => {
        http.post(`cities/delete`, { id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_CITY, payload: { status: ActionStatus.SUCCESS, id } });
                else dispatch({ type: REQUEST_DELETE_CITY, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_CITY, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_CITY, payload: { status: ActionStatus.STARTED } });
    },
    requestEditCity: (name, nameAr, id) => (dispatch, getState) => {
        http.post(`cities/edit`, { name, nameAr, id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_EDIT_CITIES, payload: { status: ActionStatus.SUCCESS, nameAr, name, id } });
                else dispatch({ type: REQUEST_EDIT_CITIES, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_EDIT_CITIES, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_EDIT_CITIES, payload: { status: ActionStatus.STARTED } });
    },
    closeEditedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_EDIT_CITY_MODAL });
    },
    requestAddCity: (name, nameAr) => (dispatch, getState) => {
        http.post(`cities/add`, { name, nameAr })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_ADD_CITIES, payload: { status: ActionStatus.SUCCESS, nameAr, name, id: data.id } });
                else dispatch({ type: REQUEST_ADD_CITIES, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ADD_CITIES, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ADD_CITIES, payload: { status: ActionStatus.STARTED } });
    },
    requestDeleteAll: (ids) => (dispatch) => {
        http.post(`cities/deleteall`, { ids })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_ALL_CITY, payload: { status: ActionStatus.SUCCESS, ids } });
                else dispatch({ type: REQUEST_DELETE_ALL_CITY, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_ALL_CITY, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_ALL_CITY, payload: { status: ActionStatus.STARTED } });
    },
};

export const reducer = (state = CityState, action) => {
    const { payload } = action;
    switch (action.type) {
        case REQUEST_ALL_CITIES:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        cities: [],
                        isLoading: true
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        cities: [],
                        isLoading: false
                    };
                case ActionStatus.SUCCESS:
                    return {
                        ...state,
                        cities: [].concat(...payload.cities),
                        isLoading: false
                    };
                default:
                    return {
                        ...state,
                        cities: [],
                        isLoading: false
                    }
            }
        case CLOSE_ADD_CITY_MODAL: {
            return {
                ...state,
                isAdded: false
            };
        }
        case CLOSE_DELETED_CITY_MODAL: {
            return {
                ...state,
                isDeleted: false
            };
        }
        case CLOSE_EDIT_CITY_MODAL: {
            return {
                ...state,
                isEdited: false
            };
        }
        case CLOSE_DELETED_ALL_CITY_MODAL: {
            return {
                ...state,
                isDeletedMultiple: false
            };
        }

        case REQUEST_ADD_CITIES:
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
                        cities: state.cities.concat({ nameAr: payload.nameAr, name: payload.name, id: payload.id }),
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
        case REQUEST_EDIT_CITIES:
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
                    const cityIndex = state.cities.findIndex(o => o.id == id);
                    if (cityIndex > -1) {
                        state.cities[cityIndex].name = name;
                        state.cities[cityIndex].nameAr = nameAr;
                    }
                    return {
                        ...state,
                        cities: Array.from(state.cities),
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
        case REQUEST_DELETE_CITY:
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
                    const cityIndex = state.cities.findIndex(o => o.id == id);
                    if (cityIndex > -1)
                        state.cities.splice(cityIndex, 1);
                    return {
                        ...state,
                        cities: Array.from(state.cities),
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
        case REQUEST_DELETE_ALL_CITY:
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
                        const cityIndex = state.cities.findIndex(o => o.id == element);
                        if (cityIndex > -1)
                            state.cities.splice(cityIndex, 1);
                    }

                    return {
                        ...state,
                        cities: Array.from(state.cities),
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
