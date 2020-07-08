import * as City from './City';
import * as Size from './Size';
import * as Color from './Color';
import * as Type from './Type';
import * as Client from './Client';
import * as Town from './Town';
import * as Item from './Item';
import * as OneItem from './OneItem';
import * as OrderStatus from './OrderStatus';
import * as User from './User';

export const ApplicationState  = {
    city: City.CityState,
    size: Size.SizeState,
    color: Color.ColorState,
    type: Type.TypeState,
    client: Client.ClientState,
    town: Town.TownState,
    item: Item.ItemState,
    oneItem: OneItem.OneItemState,
    orderStatus: OrderStatus.OrderStatusState,
    user: User.State
}

export const reducers = {
    city: City.reducer,
    size: Size.reducer,
    color: Color.reducer,
    type: Type.reducer,
    client: Client.reducer,
    town: Town.reducer,
    item: Item.reducer,
    oneItem: OneItem.reducer,
    orderStatus: OrderStatus.reducer,
    user: User.reducer,
};
