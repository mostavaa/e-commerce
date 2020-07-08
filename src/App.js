import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import './custom.css'
import { createMuiTheme, ThemeProvider, jssPreset, StylesProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { create } from 'jss';
import rtl from 'jss-rtl';
import * as UserStore from './store/User';


const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
function RTL(props) {
    return (
        <StylesProvider jss={jss}>
            {props.children}
        </StylesProvider>
    );
}
const ThemeProviderComponent = connect(
    (state) => state.user,
    UserStore.actionCreators
)((props) => {
    const theme = createMuiTheme({
        palette: {
            type: props.isDark ? "dark" : 'light',
            background: {
                default: props.isDark ? '#263238' : undefined,
                paper: props.isDark ? '#37474f' : undefined
            }
        },
        direction: props.isRTL ? 'rtl' : 'ltr'
    });
    return (
        <RTL>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div dir={props.isRTL ? 'rtl' : 'ltr'}>
                    {props.children}
                </div>
            </ThemeProvider>
        </RTL>
    )
})
export default () => (
    <ThemeProviderComponent>
        <Layout>
            <Route exact path='/' component={Home} />
        </Layout>
    </ThemeProviderComponent>
);
