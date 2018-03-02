const INITIAL_STATE = {
  activeRoute: false,
  activeTargetList: false
}
//
const menuCommands = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'MENU_ACTIVE_ROUTE':
      return Object.assign({}, state, action);
    default:
      return state;
  }
}
export default menuCommands