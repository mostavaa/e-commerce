import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as CityStore from './../../../store/City';
import List from './List';
import Add from './Add';
import { isAuthenticated } from './../../../util/user';

export default connect(
    (state) => state.city,
    CityStore.actionCreators
)(function EnhancedTable(props) {
    const requestAllCities = props.requestAllCities;
    useEffect(() => {
        requestAllCities();
    }, [requestAllCities]);
    const [editRow, setEditRow] = useState(null);

    return (
        <div>
            {isAuthenticated() ? (<Add editRow={editRow} setEditRow={setEditRow} />) : null}
            <List {...props} cities={props.cities} handleEdit={(row) => setEditRow(row)} />
        </div>
    );
});
