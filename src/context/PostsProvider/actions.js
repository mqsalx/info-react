/* eslint-disable no-undef */
import * as types from "./types"

export const loadPosts = async (dispatch) => {
    dispatch({ type: types.POSTS_LOADING })
    const postRaw = await fetch("https://jsonplaceholder.typicode.com/posts")
    const posts = await postRaw.json()
    return () => dispatch({ type: types.POSTS_SUCCESS, payload: posts })
}
