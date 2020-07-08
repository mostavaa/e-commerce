import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as TypeStore from './../../../store/Type';
import List from './List';
import Add from './Add';
import { isAuthenticated } from './../../../util/user';

export default connect(
    (state) => state.type,
    TypeStore.actionCreators
)(function EnhancedTable(props) {
    const requestAllType = props.requestAllType;
    useEffect(() => {
        requestAllType();
    }, [requestAllType]);
    const [editRow, setEditRow] = useState(null);

    return (
        <div>
            {isAuthenticated() ? (<Add editRow={editRow} setEditRow={setEditRow} />) : null}
            <List {...props} type={props.type} handleEdit={(row) => setEditRow(row)} />
        </div>
    );
});
