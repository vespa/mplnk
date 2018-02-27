const currentPos = (state = [], action) => {
  action.data = action.data || [];
  switch (action.type) {
    case 'CURRENT_POS':
      return action.data
    default:
      return state;
  }
}
export default currentPos