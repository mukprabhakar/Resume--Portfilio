import React, { useEffect, useState } from 'react'

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scroll = `${totalScroll / windowHeight}`
            setScrollProgress(Number(scroll))
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-zinc-800/20">
            <div
                className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 origin-left transition-transform duration-100 ease-out"
                style={{ transform: `scaleX(${scrollProgress})` }}
            />
        </div>
    )
}

export default ScrollProgress
