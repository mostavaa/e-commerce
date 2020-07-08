import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as SizeStore from './../../../store/Size';
import List from './List';
import Add from './Add';
import { isAuthenticated } from './../../../util/user';

export default connect(
    (state) => state.size,
    SizeStore.actionCreators
)(function EnhancedTable(props) {
    const requestAllSize = props.requestAllSize;
    useEffect(() => {
        requestAllSize();
    }, [requestAllSize]);
    const [editRow, setEditRow] = useState(null);

    return (
        <div>
            {isAuthenticated() ? (<Add editRow={editRow} setEditRow={setEditRow} />) : null}
            <List {...props} size={props.size} handleEdit={(row) => setEditRow(row)} />
        </div>
    );
});
