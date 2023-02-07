import { Update } from "@ngrx/entity";
import {
    createActionGroup,
    createFeature,
    createReducer,
    createSelector,
    emptyProps,
    on,
    props
} from "@ngrx/store";

export interface Order {
    id: string;
    name: string;
}

export interface State {
    orders: Order[];
    selectedOrderId: string | null;
}

export const OrderActions = createActionGroup({
    source: "Orders",
    events: {
        enter: emptyProps(),
        add: props<{ order: Order }>(),
        edit: props<{ order: Update<Order> }>,
        delete: props<{ id: string }>(),
        set: props<{ id: string }>(),
    },
});

export const initialState: State = { orders: [], selectedOrderId: null };

export const ordersFeature = createFeature({
    name: "orders",
    reducer: createReducer(
        initialState,
        on(OrderActions.enter, () => ({ orders: [], selectedOrderId: null })),
        on(OrderActions.add, (state, action) => ({
            ...state,
            orders: [...state.orders, action.order],
        })),
        on(OrderActions.delete, (state, action) => ({
            ...state,
            orders: state.orders.filter((order) => order.id !== action.id),
        })),
        on(OrderActions.set, (state, action) => ({
            ...state,
            selectedOrderId: action.id,
        }))
    ),
});

export const {
    name,
    reducer,
    selectOrdersState,
    selectOrders,
    selectSelectedOrderId,
} = ordersFeature;

export const vm$ = createSelector(
    selectOrders,
    selectSelectedOrderId,
    (orders, selectedOrderId) => ({
        orders,
        selectedOrderId,
    })
);
