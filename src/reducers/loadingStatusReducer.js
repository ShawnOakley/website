import { LoadingStatusActions } from './../constants/loadingStatusConstants';

let defaultState = {
    rootLoaded: false
}

export default function formStateReducer(state = defaultState, action) {
const {data} = action;
  switch (action.type) {
    case LoadingStatusActions.SET_ROOT_LOADED_STATUS:
        return Object.assign(state, {
            root: data,
        })
    default:
      return state;
  }
}