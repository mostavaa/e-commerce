import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as ClientStore from './../../store/Client';
import * as CityStore from './../../store/City';
import * as TownStore from './../../store/Town';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Validations from './../../util/validations';
import { translate } from './../../util/translate';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default connect(
    (state) => ({ ...state.client, cityTown: state.town.cityTown, cities: state.city.cities, isRTL: state.user.isRTL }),
    { ...ClientStore.actionCreators, requestCityTowns: TownStore.actionCreators.requestCityTowns, requestAllCities: CityStore.actionCreators.requestAllCities }
)((props) => {
    const classes = useStyles();

    const { isRTL, cityTown, address, clientId, requestCityTowns, requestAllCities, requestAllClientAddress, requestDeleteClientAddress, requestEditClientAddress, requestAddClientAddress, isAddressAdded, editRow, setEditAddressRow, isAddressEdited } = props;
    const save = (data) => {
        data.clientId = clientId;
        if (editRow) {
            //requestEditClientAddress({data})
        } else
            requestAddClientAddress(data)
    }

    useEffect(() => {
        requestAllClientAddress(clientId);
    }, [clientId]);

    useEffect(() => {
        requestAllCities();
    }, []);
    const initFormInputs = {
        details: {
            props: {},
            value: editRow ? editRow.details : "",
            valid: editRow ? true : false,
            touched: editRow ? true : false,
            validations: [
                { rule: Validations.required, valid: editRow ? true : false, key: "required" },
                { rule: Validations.validName, valid: editRow ? true : false, key: "validName" },
            ],
        },
        townId: {
            props: {},
            value: editRow ? editRow.townId : "",
            valid: editRow ? true : false,
            touched: editRow ? true : false,
            validations: [
                { rule: Validations.required, valid: editRow ? true : false, key: "required" },
            ],
        },
        cityId: {
            props: {},
            value: editRow ? editRow.cityId : "",
            valid: editRow ? true : false,
            touched: editRow ? true : false,
            validations: [
                { rule: Validations.required, valid: editRow ? true : false, key: "required" },
            ],
        },
    };

    const [formValid, updateValidity] = useState(editRow ? true : false);
    const [formInputs, setFormInputs] = useState(initFormInputs);

    const setProps = () => {
        Object.keys(formInputs).forEach((o) => {
            formInputs[o].props = {};
            if (!formInputs[o].valid && formInputs[o].touched)
                formInputs[o].props.error = true;
            else
                formInputs[o].props.success = "true";
        })
    }

    const input = (value, fieldName) => {
        Validations.input(value, formInputs, fieldName);
        setFormInputs({ ...formInputs });
        setProps();
        updateValidity(Object.keys(formInputs).every((o) => formInputs[o].valid));
    };
    useEffect(() => {
        updateValidity(Object.keys(initFormInputs).every((o) => initFormInputs[o].valid));
        setFormInputs(initFormInputs);
        setProps();
    }, [editRow]);

    const reset = () => {
        setFormInputs(initFormInputs);
        updateValidity(Object.keys(initFormInputs).every((o) => initFormInputs[o].valid));
    }
    const citySelected = (cityId) => {
        requestCityTowns(cityId);
    }
    return (
        <div>
            {address.map(o => o.details).join(',')}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <TextField multiline={true} {...formInputs.details.props} onChange={(event) => { input(event.target.value, 'details'); }} value={formInputs.details.value} label={translate('client.details')} />


                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">{translate('city.city')}</InputLabel>

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formInputs.cityId.value}
                        onChange={(event) => { input(event.target.value, 'cityId'); citySelected(event.target.value) }}
                    >
                        {props.cities.map(obj => (
                            <MenuItem key={obj.id} value={obj.id}>{isRTL ? obj.nameAr : obj.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>

                    <InputLabel id="demo-simple-select-label">{translate('town.town')}</InputLabel>
                    <Select
                        disabled={cityTown.length == 0}
                        {...formInputs.townId.props}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formInputs.townId.value}
                        onChange={(event) => input(event.target.value, 'townId')}
                    >
                        {cityTown.map(obj => (
                            <MenuItem key={obj.id} value={obj.id}>{isRTL ? obj.nameAr : obj.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div>
                    <Button disabled={!formValid} onClick={() => save({townId:formInputs.townId.value , details :formInputs.details.value})} startIcon={<SaveIcon />} variant="outlined" color="primary">{translate('common.save')}</Button>
                    {editRow ? (<Button onClick={() => { setEditAddressRow(null); reset(); }} startIcon={<CancelIcon />} variant="outlined" color="secondary">{translate('common.cancel')}</Button>) : null}
                </div>
            </div>
        </div>
    );
});
