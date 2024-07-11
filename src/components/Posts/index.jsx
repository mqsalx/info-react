import { PostsContext } from "../../context/PostsProvider/context"
import { useContext, useEffect, useRef } from "react"
import { loadPosts } from "../../context/PostsProvider/actions"
import { CounterContext } from "../../context/CounterProvider/context"
import {
    incrementCounter,
    decrementCounter,
} from "../../context/CounterProvider/actions"

export const Posts = () => {
    const isMounted = useRef(true)

    const postsContext = useContext(PostsContext)
    const { postsState, postsDispatch } = postsContext

    const counterContext = useContext(CounterContext)
    const { counterState, counterDispatch } = counterContext

    useEffect(() => {
        loadPosts(postsDispatch).then((dispatch) => {
            isMounted.current = true

            if (isMounted.current) {
                dispatch()
            }
        })
        return () => {
            isMounted.current = false
        }
    }, [postsDispatch])

    return (
        <div>
            <button onClick={() => incrementCounter(counterDispatch)}>
                Counter {counterState.counter} +{" "}
            </button>
            <button onClick={() => decrementCounter(counterDispatch)}>
                Counter {counterState.counter} +{" "}
            </button>
            <h1>Posts</h1>
            {postsState.loading && (
                <p>
                    <strong>Loading...</strong>
                </p>
            )}
            {postsState.posts.map((post) => (
                <div key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    )
}
