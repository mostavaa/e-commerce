import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as OrderStatusStore from './../../../store/OrderStatus';
import List from './List';
import Add from './Add';
import { isAuthenticated } from './../../../util/user';

export default connect(
    (state) => state.orderStatus,
    OrderStatusStore.actionCreators
)(function EnhancedTable(props) {
    const requestAllOrderStatus = props.requestAllOrderStatus;
    useEffect(() => {
        requestAllOrderStatus();
    }, [requestAllOrderStatus]);
    const [editRow, setEditRow] = useState(null);

    return (
        <div>
            {isAuthenticated() ? (<Add editRow={editRow} setEditRow={setEditRow} />) : null}
            <List {...props} orderStatus={props.orderStatus} handleEdit={(row) => setEditRow(row)} />
        </div>
    );
});
