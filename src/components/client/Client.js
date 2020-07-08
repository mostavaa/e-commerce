import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as ClientStore from './../../store/Client';
import List from './List';
import Add from './Add';
import { isAuthenticated } from './../../util/user';

export default connect(
    (state) => state.client,
    ClientStore.actionCreators
)(function EnhancedTable(props) {
    const requestAllClient = props.requestAllClient;
    useEffect(() => {
        requestAllClient();
    }, [requestAllClient]);
    const [editRow, setEditRow] = useState(null);

    return (
        <div>
            {isAuthenticated() ? (<Add editRow={editRow} setEditRow={setEditRow} />) : null}
            <List {...props} client={props.client} handleEdit={(row) => setEditRow(row)} />
        </div>
    );
});
