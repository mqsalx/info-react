/* eslint-disable */
import React from "react"
import { useEffect, useState } from "react"

const useMediaQuery = (queryValue, initialValue = false) => {
    const [match, setMatch] = useState(initialValue)

    useEffect(() => {
        let isMounted = true
        const matchMedia = window.matchMedia(queryValue)

        const handleChange = () => {
            if (!isMounted) {
                setMatch(Boolean(matchMedia.matches))
            }
        }

        matchMedia.addEventListener("change", handleChange)
        setMatch(!!matchMedia.matches)

        return () => {
            isMounted = false
            matchMedia.removeEventListener("change", handleChange)
        }

    }, [queryValue])

    return match
}

const App = () => {
    const huge = useMediaQuery("(min-width: px)")
    const background = huge ? "green" : "blue"
    return (
        <div style={{ fontSize: "60px", background }}>
            <h1>Hi</h1>
        </div>
    )
}

export default App
