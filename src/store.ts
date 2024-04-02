import {combineReducers, configureStore } from "@reduxjs/toolkit";
import  holdingReducer  from "./features/holding/holdingSlice";
import  userReducer  from "./features/user/userSlice";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { nextReduxCookieMiddleware, wrapMakeStore } from "next-redux-cookie-wrapper";
import { TypedUseSelectorHook, useSelector } from "react-redux";


//using REDUX TOOLKIT and NEXT-REDUX-WRAPPER

const combinedReducer = combineReducers({
    holding : holdingReducer,
    user : userReducer,
  });
  

  // handling hypretion type according to redux wrapper docs
  const reducer = (state: ReturnType<typeof combinedReducer>, action: any) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      return nextState;
    } else {
      return combinedReducer(state, action);
    }
  };
  
  const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: ["holding.holdingInfo","user.userInfo"], // for save data in cookie with redux-cookie-wrapper
        })
      ),
      devTools: true,
  })
);

// const makeStore: MakeStore<any> = () =>
//     configureStore({
//         reducer,
//         devTools: true,
//     });


 type AppStore = ReturnType<typeof makeStore>;
//  export type AppState = ReturnType<AppStore['getState']>;
//  export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const wrapper = createWrapper<AppStore>(makeStore, {debug: true});