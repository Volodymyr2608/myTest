import { HIDE_LOADER, SHOW_LOADER } from "../types/loaderType"

export const showLoaderAction = () => {
  return {
    type: SHOW_LOADER
  }
}

export const hideLoaderAction = () => {
  return {
    type: HIDE_LOADER
  }
}