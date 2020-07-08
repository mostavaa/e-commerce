import * as React from 'react';
import { connect } from 'react-redux';
import Client from './client/Client';
import City from './lookups/city/City';
import Size from './lookups/size/Size';
import Color from './lookups/color/Color';
import Type from './lookups/type/Type';
import Town from './lookups/town/Town';
import Item from './lookups/item/Item';
import OneItem from './lookups/oneItem/OneItem';
import OrderStatus from './lookups/orderStatus/OrderStatus';





const Home = () => (
  <div>
    <Item />
    <OneItem />
    <Client />
    <City />
    <Town />
    <Size />
    <Color />
    <Type />
    <OrderStatus />
  </div>
);

export default connect()(Home);
