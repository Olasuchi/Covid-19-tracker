import React, {useState, useEffect} from "react"
import axios from "axios"

function Vaccine (){
    const url = "https://disease.sh/v3/covid-19/vaccine" 
    const [vaccine, setVaccine] = useState (null)

        useEffect (() => {
            axios.get(url)
            .then(response => {
                setVaccine (repsonse.data)
            })
        }, [url])

        return (
            <div>
                <h1>vaccine </h1>
            </div>
        )
}


export default Vaccine;