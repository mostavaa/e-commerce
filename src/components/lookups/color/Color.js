import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as ColorStore from './../../../store/Color';
import List from './List';
import Add from './Add';
import { isAuthenticated } from './../../../util/user';

export default connect(
    (state) => state.color,
    ColorStore.actionCreators
)(function EnhancedTable(props) {
    const requestAllColor = props.requestAllColor;
    useEffect(() => {
        requestAllColor();
    }, [requestAllColor]);
    const [editRow, setEditRow] = useState(null);

    return (
        <div>
            {isAuthenticated() ? (<Add editRow={editRow} setEditRow={setEditRow} />) : null}
            <List {...props} color={props.color} handleEdit={(row) => setEditRow(row)} />
        </div>
    );
});
