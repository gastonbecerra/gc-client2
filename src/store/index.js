import { configureStore } from "@reduxjs/toolkit";
import sheets from './slices/sheets';
import vars from "./slices/vars";
import contexts from "./slices/contexts";

export default configureStore({
    reducer: {
        sheets,
        vars,
        contexts
    }
});