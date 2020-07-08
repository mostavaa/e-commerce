import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as OrderStatusStore from './../../../store/OrderStatus';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Validations from './../../../util/validations';
import Modal from './../../Common/modal';
import { translate } from './../../../util/translate';
export default connect(
    (state) => ({...state.orderStatus, isRTL:state.user.isRTL}),
    OrderStatusStore.actionCreators
)((props) => {
    const { isAdded, closeAddedModal, editRow, setEditRow, isEdited, closeEditedModal  ,isRTL } = props;
    const save = (name, nameAr, id) => {
        if (editRow) {
            props.requestEditOrderStatus(name, nameAr, editRow.id)
        } else
            props.requestAddOrderStatus(name, nameAr)
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

    const reset = () => {
        setFormInputs(initFormInputs);
        updateValidity(Object.keys(initFormInputs).every((o) => initFormInputs[o].valid));
    }
    return (
        <div>
            <Modal onClose={() => { closeAddedModal(); reset() }} open={isAdded} title={translate('common.success')} body={`${translate('orderStatus.orderStatus')} ${isRTL ? formInputs.nameAr.value : formInputs.name.value} ${translate('common.addedSuccess')}`} />
            <Modal onClose={() => { closeEditedModal(); setEditRow(null); reset() }} open={isEdited} title={translate('common.success')} body={`${translate('orderStatus.orderStatus')} ${isRTL ? formInputs.nameAr.value : formInputs.name.value} ${translate('common.editedSuccess')}`} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <TextField {...formInputs.name.props} onChange={(event) => input(event.target.value, 'name')} value={formInputs.name.value} label={translate('common.name')} />
                <TextField {...formInputs.nameAr.props} onChange={(event) => input(event.target.value, 'nameAr')} value={formInputs.nameAr.value} label={translate('common.nameAr')} />
                <div>
                    <Button disabled={!formValid} onClick={() => save(formInputs.name.value, formInputs.nameAr.value)} startIcon={<SaveIcon />} variant="outlined" color="primary">{translate('common.save')}</Button>
                    {editRow ? (<Button onClick={() => setEditRow(null)} startIcon={<CancelIcon />} variant="outlined" color="secondary">{translate('common.cancel')}</Button>) : null}
                </div>
            </div>
        </div>
    );
});
