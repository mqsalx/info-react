/* eslint-disable */
import { useEffect, useState, useRef } from "react"
import "./styles.css"

const isObjEqual = (objA, objB) => {
    return JSON.stringify(objA) === JSON.stringify(objB)
}

export const useFetch = (url, options) => {
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldLoad, setShouldLoad] = useState(false)
    const urlRef = useRef(url)
    const optionsRef = useRef(options)

    useEffect(() => {
        let changed = false

        if (!isObjEqual(url, urlRef.current)) {
            urlRef.current = url
            changed = true
        }

        if (!isObjEqual(options, optionsRef.current)) {
            optionsRef.current = options
            changed = true
        }

        if (changed) {
            setShouldLoad((prev) => !prev)
        }
    }, [url, options])

    useEffect(() => {
        let wait = false

        const controller = new AbortController()
        const signal = controller.signal

        console.log(optionsRef.current.headers)

        setLoading(true)

        const fetchData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            try {
                const response = await fetch(urlRef.current, {
                    signal,
                    ...optionsRef.current,
                })
                const data = await response.json()

                if (!wait) {
                    setResult(data)
                    setLoading(false)
                }
            } catch (error) {
                if (!wait) {
                    setLoading(false)
                }
                throw error
            }
        }
        fetchData()

        return () => {
            wait = true
            // controller.abort()
        }
    }, [shouldLoad])

    return [result, loading]
}
