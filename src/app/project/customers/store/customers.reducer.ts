import { createEntityAdapter, EntityState, Update } from "@ngrx/entity";
import {
    createActionGroup,
    createFeature,
    createFeatureSelector,
    createReducer,
    createSelector,
    emptyProps,
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
        enter: emptyProps(),
        "Successful Fetch": props<{ entities: Customer[] }>(),
        "Failed Fetch": props<{ error: any }>(),
    },
});

export interface State extends EntityState<Customer> {
    selectedCustomerId: string | null;
    error: any;
    loading: boolean;
}

export const adapter = createEntityAdapter<Customer>();

export const initialState: State = adapter.getInitialState({
    selectedCustomerId: null,
    error: null,
    loading: false,
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
        ),
        on(customersActions.successfulFetch, (state, action) =>
            adapter.addMany(action.entities, state)
        ),
        on(customersActions.failedFetch, (state, action) => ({
            ...state,
            error: action.error,
        }))
    ),
});

export const selectCustomersState = createFeatureSelector<State>("customers");

export const getSelectedCustomerId = createSelector(
    selectCustomersState,
    (state: State) => state.selectedCustomerId
);

export const selectError = createSelector(
    selectCustomersState,
    (state: State) => state.error
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
    adapter.getSelectors(selectCustomersState);
