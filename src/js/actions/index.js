export const fetchedData = (data = {}) => {
  return {
    type: "FETCHED_DATA",
    fetchedData : data
  }
}

export const fetchedDataBatmobile = (data = {}) => {
  return {
    type: "FETCHED_DATA_BATMOBILE",
    batMobile : data
  }
}

export const fetchedDataVillainLocation = (data = {}) => {
  return {
    type: "FETCHED_DATA_VILLAIN_LOCATION",
    location : data
  }
}

export const updateTargets = (data = {}) => {
  return {
    type: "FETCHED_DATA_UPDATE_TARGETS",
    targets : data
  }
}

export const createDestroyRoute = (open = {}) => {
  return {
    type: "MENU_ACTIVE_ROUTE",
    activeRoute : open
  }
}


