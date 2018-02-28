export const fetchedData = (data = {}) => {
  return {
    type: "FETCHED_DATA",
    fetchedData : data
  }
}

export const villainData = ( {name, location} ) => {
  return {
    type: "FETCHED_DATA_VILAIN",
    villain : name,
    location
  }
}