import { applyMiddleware, combineReducers, createStore } from "redux"
import { allUserReducer, userReducer } from "./reducers/userReducer"
import thunk from "redux-thunk"
import { postsReducer } from "./reducers/postReducer"
import { composeWithDevTools } from "redux-devtools-extension";


const rootReducer = combineReducers({
    user: userReducer,
    users: allUserReducer,
    posts: postsReducer
})

const middleware = [thunk]

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store