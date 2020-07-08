import ActionStatus from './Actions/ActionStatus';
import { REQUEST_ALL_TOWN_CITY,REQUEST_ALL_TOWN, REQUEST_ADD_TOWN,REQUEST_EDIT_TOWN, CLOSE_EDIT_TOWN_MODAL, CLOSE_DELETED_ALL_TOWN_MODAL, CLOSE_ADD_TOWN_MODAL, REQUEST_DELETE_TOWN, CLOSE_DELETED_TOWN_MODAL, REQUEST_DELETE_ALL_TOWN } from './Actions/Actions';
import http from './../util/http';
export const TownState = {
    isLoading: false,
    isAdded: false,
    isDeleted: false,
    isEdited: false,
    isDeletedMultiple: false,
    town: [],
    cityTown:[]
}
export const actionCreators = {
    requestAllTown: () => (dispatch, getState) => {
        http.get(`town/all`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && Array.isArray(data.data))
                    dispatch({ type: REQUEST_ALL_TOWN, payload: { status: ActionStatus.SUCCESS, town: data.data } });
                else dispatch({ type: REQUEST_ALL_TOWN, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ALL_TOWN, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ALL_TOWN, payload: { status: ActionStatus.STARTED } });
    },
    requestCityTowns:(id) => (dispatch) => {
        http.post(`town/getCityTowns`, { id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_ALL_TOWN_CITY, payload: { status: ActionStatus.SUCCESS, id , town:data.data } });
                else dispatch({ type: REQUEST_ALL_TOWN_CITY, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ALL_TOWN_CITY, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ALL_TOWN_CITY, payload: { status: ActionStatus.STARTED } });
    },
    closeAddedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_ADD_TOWN_MODAL });
    },
    closeDeletedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_TOWN_MODAL });
    },
    closeDeletedAllModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_ALL_TOWN_MODAL });
    },
    requestDeleteTown: (id) => (dispatch) => {
        http.post(`town/delete`, { id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_TOWN, payload: { status: ActionStatus.SUCCESS, id } });
                else dispatch({ type: REQUEST_DELETE_TOWN, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_TOWN, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_TOWN, payload: { status: ActionStatus.STARTED } });
    },
    requestEditTown: (name, nameAr,cityId ,  id , city) => (dispatch, getState) => {
        http.post(`Town/edit`, { name, nameAr,cityId , id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_EDIT_TOWN, payload: { status: ActionStatus.SUCCESS, cityName : city.name , cityNameAr:city.nameAr, nameAr,cityId ,  name, id } });
                else dispatch({ type: REQUEST_EDIT_TOWN, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_EDIT_TOWN, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_EDIT_TOWN, payload: { status: ActionStatus.STARTED } });
    },
    closeEditedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_EDIT_TOWN_MODAL });
    },
    requestAddTown: (name, nameAr , cityId , city) => (dispatch, getState) => {
        http.post(`Town/add`, { name, nameAr ,cityId})
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_ADD_TOWN, payload: { status: ActionStatus.SUCCESS, cityName : city.name , cityNameAr:city.nameAr,  nameAr,cityId , name, id: data.id } });
                else dispatch({ type: REQUEST_ADD_TOWN, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ADD_TOWN, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ADD_TOWN, payload: { status: ActionStatus.STARTED } });
    },
    requestDeleteAll: (ids) => (dispatch) => {
        http.post(`Town/deleteall`, { ids })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_ALL_TOWN, payload: { status: ActionStatus.SUCCESS, ids } });
                else dispatch({ type: REQUEST_DELETE_ALL_TOWN, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_ALL_TOWN, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_ALL_TOWN, payload: { status: ActionStatus.STARTED } });
    },
};

export const reducer = (state = TownState, action) => {
    const { payload } = action;
    switch (action.type) {
        case REQUEST_ALL_TOWN:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        town: [],
                        isLoading: true
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        town: [],
                        isLoading: false
                    };
                case ActionStatus.SUCCESS:
                    return {
                        ...state,
                        town: [].concat(...payload.town),
                        isLoading: false
                    };
                default:
                    return {
                        ...state,
                        town: [],
                        isLoading: false
                    }
            }
        case REQUEST_ALL_TOWN_CITY:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        cityTown: [],
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        cityTown: [],
                    };
                case ActionStatus.SUCCESS:
                    return {
                        ...state,
                        cityTown: [].concat(...payload.town),
                    };
                default:
                    return {
                        ...state,
                        cityTown: [],
                    }
            }
        case CLOSE_ADD_TOWN_MODAL: {
            return {
                ...state,
                isAdded: false
            };
        }
        case CLOSE_DELETED_TOWN_MODAL: {
            return {
                ...state,
                isDeleted: false
            };
        }
        case CLOSE_EDIT_TOWN_MODAL: {
            return {
                ...state,
                isEdited: false
            };
        }
        case CLOSE_DELETED_ALL_TOWN_MODAL: {
            return {
                ...state,
                isDeletedMultiple: false
            };
        }

        case REQUEST_ADD_TOWN:
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
                        town: state.town.concat({ cityId : payload.cityId, cityName :payload.cityName , cityNameAr:payload.cityNameAr,nameAr: payload.nameAr, name: payload.name, id: payload.id }),
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
        case REQUEST_EDIT_TOWN:
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
                    const { id, name, nameAr ,cityId , cityNameAr , cityName} = payload;
                    const townIndex = state.town.findIndex(o => o.id == id);
                    if (townIndex > -1) {
                        state.town[townIndex].name = name;
                        state.town[townIndex].nameAr = nameAr;
                        state.town[townIndex].cityId = cityId;
                        state.town[townIndex].cityName = cityName;
                        state.town[townIndex].cityNameAr = cityNameAr;
                    }
                    return {
                        ...state,
                        town: Array.from(state.town),
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
        case REQUEST_DELETE_TOWN:
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
                    const townIndex = state.town.findIndex(o => o.id == id);
                    if (townIndex > -1)
                        state.town.splice(townIndex, 1);
                    return {
                        ...state,
                        town: Array.from(state.town),
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
        case REQUEST_DELETE_ALL_TOWN:
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
                        const townIndex = state.town.findIndex(o => o.id == element);
                        if (townIndex > -1)
                            state.town.splice(townIndex, 1);
                    }

                    return {
                        ...state,
                        town: Array.from(state.town),
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
