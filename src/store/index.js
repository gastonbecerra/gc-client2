import { configureStore } from "@reduxjs/toolkit";
import sheets from './slices/sheets';
import vars from "./slices/vars";
import contexts from "./slices/contexts";
import users from "./slices/user";

export default configureStore({
    reducer: {
        sheets,
        vars,
        contexts,
        users
    }
});