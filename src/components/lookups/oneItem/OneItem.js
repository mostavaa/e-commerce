import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as OneItemStore from './../../../store/OneItem';
import List from './List';
import Add from './Add';
import { isAuthenticated } from './../../../util/user';

export default connect(
    (state) => ({...state.oneItem, isRTL:state.user.isRTL}),
    OneItemStore.actionCreators
)(function EnhancedTable(props) {
    const requestAllOneItem = props.requestAllOneItem;
    useEffect(() => {
        requestAllOneItem();
    }, [requestAllOneItem]);
    const [editRow, setEditRow] = useState(null);

    return (
        <div>
            {isAuthenticated() ? (<Add editRow={editRow} setEditRow={setEditRow} />) : null}
            <List {...props} oneItem={props.oneItem} handleEdit={(row) => setEditRow(row)} />
        </div>
    );
});
