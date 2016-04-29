import { combineReducers } from 'redux';
import { ADD_TODO, COMPLETE_TODO, UNCOMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions/';
const { SHOW_ALL } = VisibilityFilters;



const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [...state, {
                text: action.text,
                completed: false
            }];
        case COMPLETE_TODO:
            console.log('index: ', action.index, '; state: ', state[action.index]);
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    completed: true
                }),
                ...state.slice(action.index + 1)
            ];
        default:
            return state;
    }
}
function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            console.log('set filter action: ', action);
            return action.filter;
        default:
            return state;
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
});

export default todoApp;
