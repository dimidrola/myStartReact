import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

class App extends Component {
    render() {
        // Получено благодаря вызову connect():
        const { dispatch, visibleTodos, visibilityFilter } = this.props
        return (
            <div>
                <AddTodo onAddClick={text => dispatch(addTodo(text)) }/>
                <TodoList todos={visibleTodos}  onTodoClick={index => dispatch(completeTodo(index))}/>
                <Footer filter={visibilityFilter} onFilterChange={nextFilter => dispatch(setVisibilityFilter(nextFilter))}/>
            </div>
        )
    }
}

App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
}

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)
    }
}

// Какие именно props мы хотим получить из приходящего, как аргумент глобального состояния?
// Обратите внимание: используйте https://github.com/faassen/reselect для лучшей производительности.
function select(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
}

// Оборачиваем компонент `App` для внедрения в него функции `dispatch` и состояния
export default connect(select)(App)

//export default class App extends Component {
//    render() {
//        return (
//            <div>
//                <AddTodo onAddClick={text => console.log('add todo', text)}/>
//                <TodoList todos={[{
//                                text: 'Use Redux',
//                                completed: true
//                              },{
//                                text: 'Learn to connect it to React',
//                                completed: false
//                                }]
//                              }
//                          onTodoClick={index => console.log('todo clicked', index)
//                }/>
//                <Footer
//                    filter='SHOW_ALL'
//                    onFilterChange={filter =>console.log('filter change', filter)
//                }/>
//            </div>
//        )
//    }
//}