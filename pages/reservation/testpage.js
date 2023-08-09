import React from 'react'

export default function TestPage() {

    const [data, setData] = useState({
        
    })

    useEffect(() => {
        fetch(`${process.env.API_SERVER}/restaurants`)
            .then(r => r.json())
            .then(data = {

            })
    }, [])

    return (
        <>

        </>
    )
}
