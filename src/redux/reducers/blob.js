// Actions
import {
  BLOB_SET_INITIAL_DATA,
  BLOB_FETCH_SUCCESS,
  BLOB_FETCH_ERROR,
  BLOB_SPREADSHEET_AWARENESS
} from '../actions/blob';

export default function blob( state = {}, action ) {
  switch(action.type) {
    case BLOB_SET_INITIAL_DATA:
      return Object.assign({}, state, {characterData: action.payload});
    case BLOB_FETCH_SUCCESS:
      return Object.assign({}, state, {characterData: action.payload, fetchError: false});
    case BLOB_FETCH_ERROR:
      return Object.assign({}, state, {characterData: action.fallbackData, fetchError: action.error});
    case BLOB_SPREADSHEET_AWARENESS: 
    return Object.assign({}, state, {spreadsheetAware: action.bool })
  }
  return state;
}
