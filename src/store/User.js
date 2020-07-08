import { TOGGLE_DARK, TOGGLE_LANGUAGE } from './Actions/Actions';
import { DARK_KEY ,ISDARK,IS_NOT_DARK, EN,AR , RTL_KEY } from "./../util/constants";

export const setLanguage = (lang) => {
    if (lang) {
        localStorage.setItem(RTL_KEY, lang);
    }
}


export const State = {
    isDark: localStorage.getItem(DARK_KEY) === ISDARK,
    isRTL: localStorage.getItem(RTL_KEY) === AR
}

export const actionCreators = {
    toggleDarkMode: () => (dispatch, getState) => {
        if (getState().user.isDark == true) {
            localStorage.setItem(DARK_KEY, IS_NOT_DARK);
        }
        else {
            localStorage.setItem(DARK_KEY, ISDARK);
        }
        dispatch({ type: TOGGLE_DARK, payload: { isDark: !getState().user.isDark } });
    },
    toggleLanguage: () => (dispatch, getState) => {
        if (getState().user.isRTL == true) {
            localStorage.setItem(RTL_KEY, EN);
        }
        else {
            localStorage.setItem(RTL_KEY, AR);
        }
        dispatch({ type: TOGGLE_LANGUAGE, payload: { isRTL: !getState().user.isRTL } });
        //window.location.reload();
    },
};

export const reducer = (state = State, action) => {
    const { payload } = action;
    switch (action.type) {
        case TOGGLE_DARK:
            return { ...state, isDark: payload.isDark };
        case TOGGLE_LANGUAGE:
            return { ...state, isRTL: payload.isRTL };
    }

    return state;
};
