import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as ItemStore from './../../../store/Item';
import * as TypeStore from './../../../store/Type';
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
    (state) => ({ ...state.item, type: state.type.type, isRTL: state.user.isRTL }),
    { ...ItemStore.actionCreators, requestAllType: TypeStore.actionCreators.requestAllType }
)((props) => {
    const classes = useStyles();
    const { isAdded, closeAddedModal, editRow, setEditRow, isEdited, closeEditedModal, isRTL } = props;
    const getSelectedType = (id) => {
        const typeIndex = props.type.findIndex(o => o.id == id);
        if (typeIndex > -1) {
            return props.type[typeIndex];
        }
    }
    const save = (name, typeId) => {
        if (editRow) {
            props.requestEditItem(name, typeId, editRow.id, getSelectedType(typeId))
        } else
            props.requestAddItem(name, typeId, getSelectedType(typeId))
    }

    const initFormInputs = {
        name: {
            props: {},
            value: editRow ? editRow.name : "",
            valid: editRow ? true : false,
            touched: editRow ? true : false,
            validations: [
                { rule: Validations.required, valid: editRow ? true : false, key: "required" },
                { rule: Validations.validName, valid: editRow ? true : false, key: "validName" },
            ],
        },
        typeId: {
            props: {},
            value: editRow ? editRow.typeId : "",
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
        props.requestAllType();
    }, []);

    const reset = () => {
        setFormInputs(initFormInputs);
        updateValidity(Object.keys(initFormInputs).every((o) => initFormInputs[o].valid));
    }
    return (
        <div>
            <Modal onClose={() => { closeAddedModal(); reset() }} open={isAdded} title={translate('common.success')} body={`${translate('item.item')} ${formInputs.name.value} ${translate('common.addedSuccess')}`} />
            <Modal onClose={() => { closeEditedModal(); setEditRow(null); reset() }} open={isEdited} title={translate('common.success')} body={`${translate('item.item')} ${formInputs.name.value} ${translate('common.editedSuccess')}`} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <TextField {...formInputs.name.props} onChange={(event) => input(event.target.value, 'name')} value={formInputs.name.value} label={translate('common.name')} />


                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">{translate('type.type')}</InputLabel>
                    <Select
                        {...formInputs.typeId.props}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formInputs.typeId.value}
                        onChange={(event) => input(event.target.value, 'typeId')}
                    >
                        {props.type.map(type => (
                            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div>
                    <Button disabled={!formValid} onClick={() => save(formInputs.name.value, formInputs.typeId.value)} startIcon={<SaveIcon />} variant="outlined" color="primary">{translate('common.save')}</Button>
                    {editRow ? (<Button onClick={() => setEditRow(null)} startIcon={<CancelIcon />} variant="outlined" color="secondary">{translate('common.cancel')}</Button>) : null}
                </div>
            </div>
        </div>
    );
});
