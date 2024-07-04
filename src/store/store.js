import { configureStore } from "@reduxjs/toolkit";

import cryptoSlice from "./slices"

let store = configureStore({
    reducer:{
        crypto: cryptoSlice
    }
})
export default store