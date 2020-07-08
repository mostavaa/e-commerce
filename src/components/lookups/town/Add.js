import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as TownStore from './../../../store/Town';
import * as CityStore from './../../../store/City';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Validations from './../../../util/validations';
import Modal from './../../Common/modal';
import { translate } from './../../../util/translate';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default connect(
    (state) => ({ ...state.town, cities: state.city.cities , isRTL:state.user.isRTL }),
    { ...TownStore.actionCreators, requestAllCities: CityStore.actionCreators.requestAllCities }
)((props) => {
    const classes = useStyles();
    const { isAdded, closeAddedModal, editRow, setEditRow, isEdited, closeEditedModal ,isRTL} = props;
    const getSelectedCity = (id)=>{
        const cityIndex = props.cities.findIndex(o=>o.id ==id );
        if(cityIndex>-1){
            return props.cities[cityIndex];
        }
    }
    const save = (name, nameAr, cityId) => {

        if (editRow) {
            props.requestEditTown(name, nameAr, cityId, editRow.id , getSelectedCity(cityId))
        } else
            props.requestAddTown(name, nameAr, cityId,getSelectedCity(cityId))
    }
  
    const initFormInputs = {
        name: {
            props: {},
            value: editRow ? editRow.name : "",
            valid: editRow ? true : false,
            touched: editRow ? true : false,
            validations: [
                { rule: Validations.required, valid: editRow ? true : false, key: "required" },
                { rule: Validations.alphaNumericSpaceEnglish, valid: editRow ? true : false, key: "alphaNumericSpaceEnglish" },
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
        nameAr: {
            props: {},
            value: editRow ? editRow.nameAr : "",
            valid: editRow ? true : false,
            touched: editRow ? true : false,
            validations: [
                { rule: Validations.required, valid: editRow ? true : false, key: "required" },
                { rule: Validations.isArabic, valid: editRow ? true : false, key: "isArabic" },
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
        updateValidity(Object.keys(formInputs).every((o) => formInputs[o].valid));
        setFormInputs({ ...formInputs });
        setProps();
    };
    useEffect(() => {
        updateValidity(Object.keys(initFormInputs).every((o) => initFormInputs[o].valid));
        setFormInputs(initFormInputs);
        setProps();
    }, [editRow]);
    useEffect(() => {
        props.requestAllCities();
    }, []);

    const reset = () => {
        setFormInputs(initFormInputs);
        updateValidity(Object.keys(initFormInputs).every((o) => initFormInputs[o].valid));
    }
    return (
        <div>
            <Modal onClose={() => { closeAddedModal(); reset() }} open={isAdded} title={translate('common.success')} body={`${translate('town.town')} ${isRTL ? formInputs.nameAr.value : formInputs.name.value} ${translate('common.addedSuccess')}`} />
            <Modal onClose={() => { closeEditedModal(); setEditRow(null); reset() }} open={isEdited} title={translate('common.success')} body={`${translate('town.town')} ${isRTL ? formInputs.nameAr.value : formInputs.name.value} ${translate('common.editedSuccess')}`} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <TextField {...formInputs.name.props} onChange={(event) => input(event.target.value, 'name')} value={formInputs.name.value} label={translate('common.name')} />
                <TextField {...formInputs.nameAr.props} onChange={(event) => input(event.target.value, 'nameAr')} value={formInputs.nameAr.value} label={translate('common.nameAr')} />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">{translate('city.city')}</InputLabel>
                    <Select
                        {...formInputs.cityId.props}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formInputs.cityId.value}
                        onChange={(event) => input(event.target.value, 'cityId')}
                    >
                        {props.cities.map(city => (
                            <MenuItem key={city.id} value={city.id}>{isRTL ? city.nameAr : city.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div>
                    <Button disabled={!formValid} onClick={() => save(formInputs.name.value, formInputs.nameAr.value, formInputs.cityId.value)} startIcon={<SaveIcon />} variant="outlined" color="primary">{translate('common.save')}</Button>
                    {editRow ? (<Button onClick={() => setEditRow(null)} startIcon={<CancelIcon />} variant="outlined" color="secondary">{translate('common.cancel')}</Button>) : null}
                </div>
            </div>
        </div>
    );
});
