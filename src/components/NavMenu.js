import * as React from 'react';
import { connect } from 'react-redux';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import Button from '@material-ui/core/Button';
import LanguageIcon from '@material-ui/icons/Language';
import {   translate } from "./../util/translate";
import * as UserStore from './../store/User';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default connect(
    (state) => state.user,
    UserStore.actionCreators
)(class NavMenu extends React.Component {
    state = {
        isOpen: false,
    };
    changeLanguage=()=>{
        this.props.toggleLanguage();
    }
    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">react_redux</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <Button onClick={() =>this.changeLanguage()} startIcon={<LanguageIcon />} variant="outlined" color="primary">{this.props.isRTL?'EN':'AR'}</Button>
                                <FormControlLabel
        control={
          <Switch
            checked={this.props.isDark}
            onChange={()=>this.props.toggleDarkMode()}
            name="checkedB"
            color="primary"
          />
        }
        label={translate('common.dark')}
      />
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
})
