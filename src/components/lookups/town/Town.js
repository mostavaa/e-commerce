import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as TownStore from './../../../store/Town';
import List from './List';
import Add from './Add';
import { isAuthenticated } from './../../../util/user';

export default connect(
    (state) => ({...state.town, isRTL:state.user.isRTL}),
    TownStore.actionCreators
)(function EnhancedTable(props) {
    const requestAllTown = props.requestAllTown;
    useEffect(() => {
        requestAllTown();
    }, [requestAllTown]);
    const [editRow, setEditRow] = useState(null);

    return (
        <div>
            {isAuthenticated() ? (<Add editRow={editRow} setEditRow={setEditRow} />) : null}
            <List {...props} town={props.town} handleEdit={(row) => setEditRow(row)} />
        </div>
    );
});
