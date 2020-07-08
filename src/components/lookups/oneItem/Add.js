import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as OneItemStore from './../../../store/OneItem';
import * as ColorStore from './../../../store/Color';
import * as SizeStore from './../../../store/Size';
import * as ItemStore from './../../../store/Item';
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
import Uploader from './../../Common/uploader';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
    (state) => ({ ...state.oneItem,item: state.item.item, size: state.size.size,color: state.color.color , isRTL:state.user.isRTL }),
    { ...OneItemStore.actionCreators, requestAllItem: ItemStore.actionCreators.requestAllItem,requestAllSize: SizeStore.actionCreators.requestAllSize ,requestAllColor: ColorStore.actionCreators.requestAllColor }
)((props) => {
    const classes = useStyles();
    const { isAdded, closeFilesModal,closeAddedModal, editRow, setEditRow, isEdited, closeEditedModal ,isRTL} = props;
    const getSelectedColor = (id)=>{
        const colorIndex = props.color.findIndex(o=>o.id ==id );
        if(colorIndex>-1){
            return props.color[colorIndex];
        }
    }

    const getSelectedSize = (id)=>{
        const sizeIndex = props.size.findIndex(o=>o.id ==id );
        if(sizeIndex>-1){
            return props.size[sizeIndex];
        }
    }

    const getSelectedItem = (id)=>{
        const itemIndex = props.item.findIndex(o=>o.id ==id );
        if(itemIndex>-1){
            return props.item[itemIndex];
        }
    }
    const save = (obj) => {
         const color = getSelectedColor(obj.colorId);
         const size = getSelectedSize(obj.sizeId);
         const item = getSelectedItem(obj.itemId);
         obj.itemName = item.name;
         obj.colorName = color.name;
         obj.colorNameAr = color.nameAr;
         obj.sizeName = size.name;
         obj.sizeNameAr = size.nameAr;
         
        if (editRow) {
            props.requestEditOneItem(obj, editRow.id)
        } else
            props.requestAddOneItem(obj)
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
        colorId: {
            props: {},
            value: editRow ? editRow.colorId : "",
            valid: editRow ? true : false,
            touched: editRow ? true : false,
            validations: [
                { rule: Validations.required, valid: editRow ? true : false, key: "required" },
            ],
        },
        sizeId: {
            props: {},
            value: editRow ? editRow.sizeId : "",
            valid: editRow ? true : false,
            touched: editRow ? true : false,
            validations: [
                { rule: Validations.required, valid: editRow ? true : false, key: "required" },
            ],
        },
        itemId: {
            props: {},
            value: editRow ? editRow.itemId : "",
            valid: editRow ? true : false,
            touched: editRow ? true : false,
            validations: [
                { rule: Validations.required, valid: editRow ? true : false, key: "required" },
            ],
        },
        price: {
            props: {},
            value: editRow ? editRow.price : "",
            valid: editRow ? true : false,
            touched: editRow ? true : false,
            validations: [
                { rule: Validations.required, valid: editRow ? true : false, key: "required" },
                { rule: Validations.validNumber, valid: editRow ? true : false, key: "validNumber" },
            ],
        },
        code: {
            props: {},
            value: editRow ? editRow.code : "",
            valid: editRow ? true : false,
            touched: editRow ? true : false,
            validations: [
                { rule: Validations.required, valid: editRow ? true : false, key: "required" },
                { rule: Validations.alphaNumericSpaceEnglish, valid: editRow ? true : false, key: "alphaNumericSpaceEnglish" },
            ],
        },
        quantity: {
            props: {},
            value: editRow ? editRow.quantity : "",
            valid: editRow ? true : false,
            touched: editRow ? true : false,
            validations: [
                { rule: Validations.required, valid: editRow ? true : false, key: "required" },
                { rule: Validations.validNumber, valid: editRow ? true : false, key: "validNumber" },
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
        if(editRow){
            props.requestGetUploadsOneItem(editRow.id);
        }
        updateValidity(Object.keys(initFormInputs).every((o) => initFormInputs[o].valid));
        setFormInputs(initFormInputs);
        setProps();
    }, [editRow]);


    useEffect(() => {
        if (editRow) {
            if (props.attachments && props.attachments.length > 0) {
                props.attachments.forEach(element => {
                    if (element && !element.isLoading && !element.src && element.contentType) {
                        props.requestGetUploadImage(element.id , element.contentType);
                    }
                });
            }
        }
    }, [props.attachments]);

    useEffect(() => {
        props.requestAllColor();
        props.requestAllSize();
        props.requestAllItem();
    }, []);

    const reset = () => {
        setFormInputs(initFormInputs);
        updateValidity(Object.keys(initFormInputs).every((o) => initFormInputs[o].valid));
    }
    const upload =(files)=>{
        props.uploadOneItemFiles(files , editRow.id);
    }
    return (
        <div>  
            {props.addFiles == 0 && props.isLoading ? (<CircularProgress />) : null}
           
            <Modal onClose={() => { closeFilesModal();}} open={props.addFiles == 1 && !props.isLoading} title={translate('common.success')} body={`${translate('common.addedSuccess')}`} />
            <Modal onClose={() => { closeAddedModal(); reset() }} open={isAdded} title={translate('common.success')} body={`${translate('oneItem.oneItem')} ${formInputs.name.value} ${translate('common.addedSuccess')}`} />
            <Modal onClose={() => { closeEditedModal(); setEditRow(null); reset() }} open={isEdited} title={translate('common.success')} body={`${translate('oneItem.oneItem')} ${formInputs.name.value} ${translate('common.editedSuccess')}`} />
            {props.attachments.length > 0 ? (
                <div>
                    <div className={classes.root}>
                        <GridList cellHeight={240} className={classes.gridList} cols={2.5}>
                            {props.attachments.filter(o=>o.contentType).map((tile, i) => (
                                <GridListTile key={i}>
                                    {tile.src?(<>
                                        <img src={URL.createObjectURL(tile.src)} alt={i + 1} />
                                    <GridListTileBar
                                        title={i + 1}
                                        classes={{
                                            root: classes.titleBar,
                                            title: classes.title,
                                        }}
                                        actionIcon={
                                            <IconButton onClick={()=>props.requestRemoveUploadImage(tile.id)} aria-label={`star ${i + 1}`}>
                                                <CloseIcon className={classes.title} />
                                            </IconButton>
                                        }
                                    />
                                    </>
                                    ):
                                    (
                                        <img src={require("./../../../assets/images/rsws-loading.gif")} alt={i + 1} />
                                    )
                                    }
                                   
                                </GridListTile>
                            ))}
                        </GridList>

                    </div>
                </div>
            ) : null}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <TextField {...formInputs.name.props} onChange={(event) => input(event.target.value, 'name')} value={formInputs.name.value} label={translate('common.name')} />
                
                <TextField {...formInputs.price.props} type="number" onChange={(event) => input(event.target.value, 'price')} value={formInputs.price.value} label={translate('item.price')} />
                <TextField {...formInputs.code.props} onChange={(event) => input(event.target.value, 'code')} value={formInputs.code.value} label={translate('item.code')} />
                <TextField {...formInputs.quantity.props} type="number" onChange={(event) => input(event.target.value, 'quantity')} value={formInputs.quantity.value} label={translate('item.quantity')} />
                
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">{translate('size.size')}</InputLabel>
                    <Select
                        {...formInputs.sizeId.props}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formInputs.sizeId.value}
                        onChange={(event) => input(event.target.value, 'sizeId')}
                    >
                        {props.size.map(size => (
                            <MenuItem key={size.id} value={size.id}>{isRTL ? size.nameAr : size.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">{translate('color.color')}</InputLabel>
                    <Select
                        {...formInputs.colorId.props}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formInputs.colorId.value}
                        onChange={(event) => input(event.target.value, 'colorId')}
                    >
                        {props.color.map(color => (
                            <MenuItem key={color.id} value={color.id}>{isRTL ? color.nameAr : color.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">{translate('item.item')}</InputLabel>
                    <Select
                        {...formInputs.itemId.props}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formInputs.itemId.value}
                        onChange={(event) => input(event.target.value, 'itemId')}
                    >
                        {props.item.map(item => (
                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div>
                    <Button disabled={!formValid} onClick={() => save({name:formInputs.name.value,price:+formInputs.price.value,quantity:+formInputs.quantity.value,code:formInputs.code.value, sizeId:formInputs.sizeId.value,colorId:formInputs.colorId.value,itemId:formInputs.itemId.value})} startIcon={<SaveIcon />} variant="outlined" color="primary">{translate('common.save')}</Button>
                    {editRow ? (<Button onClick={() => setEditRow(null)} startIcon={<CancelIcon />} variant="outlined" color="secondary">{translate('common.cancel')}</Button>) : null}
                </div>
            </div>
            {editRow ? (<Uploader  upload={upload}/>) : null}
        </div>
    );
});
