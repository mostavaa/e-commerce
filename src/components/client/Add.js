import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as ClientStore from './../../store/Client';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Validations from './../../util/validations';
import Modal from './../Common/modal';
import { translate } from './../../util/translate';
import Address from './Address';


export default connect(
    (state) => ({...state.client, isRTL:state.user.isRTL}),
    ClientStore.actionCreators
)((props) => {

    const { filteredClients ,isAdded, closeAddedModal, editRow, setEditRow, isEdited, closeEditedModal  ,searchClientByPhone } = props;
    const save = (name, phoneNumber, id) => {
        if (editRow) {
            props.requestEditClient({name, phoneNumber,id: editRow.id})
        } else
            props.requestAddClient({name, phoneNumber})
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
        phoneNumber: {
            props: {},
            value: editRow ? editRow.phoneNumber : "",
            valid: editRow ? true : false,
            touched: editRow ? true : false,
            validations: [
                { rule: Validations.required, valid: editRow ? true : false, key: "required" },
                { rule: Validations.validMobileNumber, valid: editRow ? true : false, key: "validMobileNumber" },
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
        updateValidity(Object.keys(formInputs).every((o) => formInputs[o].valid)&& filteredClients.length === 0);
    };
    useEffect(() => {
        updateValidity(Object.keys(formInputs).every((o) => formInputs[o].valid)&& filteredClients.length === 0);
    }, [filteredClients]);
    useEffect(() => {
        updateValidity(Object.keys(initFormInputs).every((o) => initFormInputs[o].valid)&& filteredClients.length === 0);
        setFormInputs(initFormInputs);
        setProps();
    }, [editRow]);

    const reset = () => {
        setFormInputs(initFormInputs);
        updateValidity(Object.keys(initFormInputs).every((o) => initFormInputs[o].valid)&& filteredClients.length === 0);
        searchClientByPhone('');
    }
const address =editRow?( <Address clientId={editRow.id}/>):null
    
    return (
        <div>
            {address}
            <Modal onClose={() => { closeAddedModal(); reset() }} open={isAdded} title={translate('common.success')} body={`${translate('client.client')} ${formInputs.name.value} ${translate('common.addedSuccess')}`} />
            <Modal onClose={() => { closeEditedModal(); setEditRow(null); reset() }} open={isEdited} title={translate('common.success')} body={`${translate('client.client')} ${formInputs.name.value} ${translate('common.editedSuccess')}`} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <TextField {...formInputs.phoneNumber.props} onChange={(event) => {searchClientByPhone(event.target.value);input(event.target.value, 'phoneNumber'); }} value={formInputs.phoneNumber.value} label={translate('client.phone')} />
                <TextField {...formInputs.name.props} onChange={(event) => input(event.target.value, 'name')} value={formInputs.name.value} label={translate('common.name')} />
                <div>
                    <Button disabled={!formValid} onClick={() => save(formInputs.name.value, formInputs.phoneNumber.value)} startIcon={<SaveIcon />} variant="outlined" color="primary">{translate('common.save')}</Button>
                    {editRow ? (<Button onClick={() => {setEditRow(null);reset();}} startIcon={<CancelIcon />} variant="outlined" color="secondary">{translate('common.cancel')}</Button>) : null}
                </div>
            </div>
        </div>
    );
});
