import ActionStatus from './Actions/ActionStatus';
import { 
    REQUEST_ALL_CLIENT_ADDRESS,
    REQUEST_DELETE_CLIENT_ADDRESS,
    REQUEST_EDIT_CLIENT_ADDRESS,
    REQUEST_ADD_CLIENT_ADDRESS,SEARCH_CLIENT_BY_PHONE, REQUEST_ALL_CLIENT, REQUEST_ADD_CLIENT,REQUEST_EDIT_CLIENT, CLOSE_EDIT_CLIENT_MODAL, CLOSE_DELETED_ALL_CLIENT_MODAL, CLOSE_ADD_CLIENT_MODAL, REQUEST_DELETE_CLIENT, CLOSE_DELETED_CLIENT_MODAL, REQUEST_DELETE_ALL_CLIENT } from './Actions/Actions';
import http from './../util/http';
export const ClientState = {
    isLoading: false,
    isAdded: false,
    isDeleted: false,
    isEdited: false,
    isDeletedMultiple: false,
    client: [],
    filteredClients:[],
    address:[]
}
export const actionCreators = {
    requestAllClientAddress: (clientId) => (dispatch, getState) => {
        
        http.get(`address/all/${clientId}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && Array.isArray(data.data))
                    dispatch({ type: REQUEST_ALL_CLIENT_ADDRESS, payload: { status: ActionStatus.SUCCESS, address: data.data } });
                else dispatch({ type: REQUEST_ALL_CLIENT_ADDRESS, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ALL_CLIENT_ADDRESS, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ALL_CLIENT_ADDRESS, payload: { status: ActionStatus.STARTED } });
    },
    requestDeleteClientAddress: (id) => (dispatch) => {
        http.post(`address/delete`, { id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_CLIENT_ADDRESS, payload: { status: ActionStatus.SUCCESS, id } });
                else dispatch({ type: REQUEST_DELETE_CLIENT_ADDRESS, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_CLIENT_ADDRESS, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_CLIENT_ADDRESS, payload: { status: ActionStatus.STARTED } });
    },
    requestEditClientAddress: (dataObj) => (dispatch, getState) => {
        http.post(`address/edit`, { ...dataObj })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_EDIT_CLIENT_ADDRESS, payload: { status: ActionStatus.SUCCESS, ...dataObj } });
                else dispatch({ type: REQUEST_EDIT_CLIENT_ADDRESS, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_EDIT_CLIENT_ADDRESS, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_EDIT_CLIENT_ADDRESS, payload: { status: ActionStatus.STARTED } });
    },
    requestAddClientAddress: (dataObj) => (dispatch, getState) => {
        http.post(`address/add`, { ...dataObj })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_ADD_CLIENT_ADDRESS, payload: { status: ActionStatus.SUCCESS, ...dataObj, id: data.id } });
                else dispatch({ type: REQUEST_ADD_CLIENT_ADDRESS, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ADD_CLIENT_ADDRESS, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ADD_CLIENT_ADDRESS, payload: { status: ActionStatus.STARTED } });
    },







    requestAllClient: () => (dispatch, getState) => {
        http.get(`client/all`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && Array.isArray(data.data))
                    dispatch({ type: REQUEST_ALL_CLIENT, payload: { status: ActionStatus.SUCCESS, client: data.data } });
                else dispatch({ type: REQUEST_ALL_CLIENT, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ALL_CLIENT, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ALL_CLIENT, payload: { status: ActionStatus.STARTED } });
    },
    searchClientByPhone:(phone)=>(dispatch) => {
        dispatch({ type: SEARCH_CLIENT_BY_PHONE, payload: { phone } });
    },
    closeAddedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_ADD_CLIENT_MODAL });
    },
    closeDeletedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_CLIENT_MODAL });
    },
    closeDeletedAllModal: () => (dispatch) => {
        dispatch({ type: CLOSE_DELETED_ALL_CLIENT_MODAL });
    },
    requestDeleteClient: (id) => (dispatch) => {
        http.post(`client/delete`, { id })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_CLIENT, payload: { status: ActionStatus.SUCCESS, id } });
                else dispatch({ type: REQUEST_DELETE_CLIENT, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_CLIENT, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_CLIENT, payload: { status: ActionStatus.STARTED } });
    },
    requestEditClient: (dataObj) => (dispatch, getState) => {
        http.post(`Client/edit`, { ...dataObj })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_EDIT_CLIENT, payload: { status: ActionStatus.SUCCESS, ...dataObj } });
                else dispatch({ type: REQUEST_EDIT_CLIENT, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_EDIT_CLIENT, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_EDIT_CLIENT, payload: { status: ActionStatus.STARTED } });
    },
    closeEditedModal: () => (dispatch) => {
        dispatch({ type: CLOSE_EDIT_CLIENT_MODAL });
    },
    requestAddClient: (dataObj) => (dispatch, getState) => {
        http.post(`Client/add`, { ...dataObj })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_ADD_CLIENT, payload: { status: ActionStatus.SUCCESS, ...dataObj, id: data.id } });
                else dispatch({ type: REQUEST_ADD_CLIENT, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_ADD_CLIENT, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_ADD_CLIENT, payload: { status: ActionStatus.STARTED } });
    },
    requestDeleteAll: (ids) => (dispatch) => {
        http.post(`Client/deleteall`, { ids })
            .then(response => response.json())
            .then(data => {
                if (data)
                    dispatch({ type: REQUEST_DELETE_ALL_CLIENT, payload: { status: ActionStatus.SUCCESS, ids } });
                else dispatch({ type: REQUEST_DELETE_ALL_CLIENT, payload: { status: ActionStatus.FAILED } });
            }).catch(() => {
                dispatch({ type: REQUEST_DELETE_ALL_CLIENT, payload: { status: ActionStatus.FAILED } });
            });
        dispatch({ type: REQUEST_DELETE_ALL_CLIENT, payload: { status: ActionStatus.STARTED } });
    },
};

export const reducer = (state = ClientState, action) => {
    const { payload } = action;
    switch (action.type) {
        case REQUEST_ALL_CLIENT_ADDRESS:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        address: [],
                       
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        address: [],
                      
                    };
                case ActionStatus.SUCCESS:
                    return {
                        ...state,
                        address: [].concat(...payload.address),
                       
                    };
                default:
                    return {
                        ...state,
                        address: [],
                    
                    }
            }
            case REQUEST_ADD_CLIENT_ADDRESS:
                switch (payload.status) {
                    case ActionStatus.STARTED:
                        return {
                            ...state,
                         
                        };
                    case ActionStatus.FAILED:
                        return {
                            ...state,
                          
                        };
                    case ActionStatus.SUCCESS:
                        return {
                            ...state,
                            address: state.address.concat({ ...payload }),
                           
                        };
                    default:
                        return {
                            ...state,
                         
                        }
                }
            case REQUEST_EDIT_CLIENT_ADDRESS:
                switch (payload.status) {
                    case ActionStatus.STARTED:
                        return {
                            ...state,
                        
                        };
                    case ActionStatus.FAILED:
                        return {
                            ...state,
                      
                        };
                    case ActionStatus.SUCCESS:
                        const { id } = payload;
                        const addressIndex = state.address.findIndex(o => o.id == id);
                        if (addressIndex > -1) {
                            Object.keys(payload).forEach(key=>{
                                state.address[addressIndex][key] = payload[key];
                            });
                        }
                        return {
                            ...state,
                            address: Array.from(state.address),
                      
                        };
                    default:
                        return {
                            ...state,
                        }
                }
            case REQUEST_DELETE_CLIENT_ADDRESS:
                switch (payload.status) {
                    case ActionStatus.STARTED:
                        return {
                            ...state,
                     
                        };
                    case ActionStatus.FAILED:
                        return {
                            ...state,
                  
                        };
                    case ActionStatus.SUCCESS:
                        const { id } = payload;
                        const addressIndex = state.address.findIndex(o => o.id == id);
                        if (addressIndex > -1)
                            state.address.splice(addressIndex, 1);
                        return {
                            ...state,
                            address: Array.from(state.address),
                      
                        };
                    default:
                        return {
                            ...state,
                      
                        }
                }

                case REQUEST_ALL_CLIENT:
            switch (payload.status) {
                case ActionStatus.STARTED:
                    return {
                        ...state,
                        client: [],
                        isLoading: true
                    };
                case ActionStatus.FAILED:
                    return {
                        ...state,
                        client: [],
                        isLoading: false
                    };
                case ActionStatus.SUCCESS:
                    return {
                        ...state,
                        client: [].concat(...payload.client),
                        isLoading: false
                    };
                default:
                    return {
                        ...state,
                        client: [],
                        isLoading: false
                    }
            }
        case CLOSE_ADD_CLIENT_MODAL: {
            return {
                ...state,
                isAdded: false
            };
        }
        case CLOSE_DELETED_CLIENT_MODAL: {
            return {
                ...state,
                isDeleted: false
            };
        }
        case CLOSE_EDIT_CLIENT_MODAL: {
            return {
                ...state,
                isEdited: false
            };
        }
        case SEARCH_CLIENT_BY_PHONE:{
            const {phone} = payload;
            let filteredClients=[];
            debugger;
            if(phone)
                filteredClients = Array.from(state.client.filter(o => o.phoneNumber.indexOf(phone) > -1));
            return {
                ...state,
                filteredClients: Array.from(filteredClients),
            }
        }
        case CLOSE_DELETED_ALL_CLIENT_MODAL: {
            return {
                ...state,
                isDeletedMultiple: false
            };
        }

        case REQUEST_ADD_CLIENT:
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
                        client: state.client.concat({ ...payload }),
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
        case REQUEST_EDIT_CLIENT:
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
                    const clientIndex = state.client.findIndex(o => o.id == id);
                    if (clientIndex > -1) {
                        Object.keys(payload).forEach(key=>{
                            state.client[clientIndex][key] = payload[key];
                        });
                    }
                    return {
                        ...state,
                        client: Array.from(state.client),
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
        case REQUEST_DELETE_CLIENT:
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
                    const clientIndex = state.client.findIndex(o => o.id == id);
                    if (clientIndex > -1)
                        state.client.splice(clientIndex, 1);
                    return {
                        ...state,
                        client: Array.from(state.client),
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
        case REQUEST_DELETE_ALL_CLIENT:
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
                        const clientIndex = state.client.findIndex(o => o.id == element);
                        if (clientIndex > -1)
                            state.client.splice(clientIndex, 1);
                    }

                    return {
                        ...state,
                        client: Array.from(state.client),
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
