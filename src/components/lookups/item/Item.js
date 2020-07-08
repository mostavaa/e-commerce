import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as ItemStore from './../../../store/Item';
import List from './List';
import Add from './Add';
import { isAuthenticated } from './../../../util/user';

export default connect(
    (state) => ({...state.item, isRTL:state.user.isRTL}),
    ItemStore.actionCreators
)(function EnhancedTable(props) {
    const requestAllItem = props.requestAllItem;
    useEffect(() => {
        requestAllItem();
    }, [requestAllItem]);
    const [editRow, setEditRow] = useState(null);

    return (
        <div>
            {isAuthenticated() ? (<Add editRow={editRow} setEditRow={setEditRow} />) : null}
            <List {...props} item={props.item} handleEdit={(row) => setEditRow(row)} />
        </div>
    );
});
