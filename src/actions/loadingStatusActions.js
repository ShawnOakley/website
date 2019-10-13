import { LoadingStatusActions } from '../constants/loadingStatusActions';

    // action creators

    // Sets the loaded Status
    export function setRootLoadEDStatus(data) {
        return { type: LoadingStatusActions.SET_ROOT_LOADED_STATUS, data };
    }
