import { createEntityAdapter, EntityState, Update } from "@ngrx/entity";
import {
    createActionGroup,
    createFeature,
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
    props,
} from "@ngrx/store";

export interface Customer {
    id: string;
    name: string;
}

export const customersActions = createActionGroup({
    source: "customers",
    events: {
        add: props<{ entity: Customer }>(),
        edit: props<{ entity: Update<Customer> }>(),
        set: props<{ id: string }>(),
        delete: props<{ id: string }>(),
    },
});

export interface State extends EntityState<Customer> {
    selectedCustomerId: string | null;
}

export const adapter = createEntityAdapter<Customer>();

export const initialState: State = adapter.getInitialState({
    selectedCustomerId: null,
});

export const customersFeature = createFeature({
    name: "customers",
    reducer: createReducer(
        initialState,
        on(customersActions.add, (state, action) =>
            adapter.addOne(action.entity, state)
        ),
        on(customersActions.edit, (state, action) =>
            adapter.updateOne(action.entity, state)
        ),
        on(customersActions.set, (state, action) => ({
            ...state,
            selectedCustomerId: action.id,
        })),
        on(customersActions.delete, (state, action) =>
            adapter.removeOne(action.id, state)
        )
    ),
});

export const selectCustomersState = createFeatureSelector<State>("customers");

export const getSelectedCustomerId = createSelector(
    selectCustomersState,
    (state: State) => state.selectedCustomerId
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
    adapter.getSelectors(selectCustomersState);
