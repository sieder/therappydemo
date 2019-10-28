import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'
import { Card } from 'antd';

const TherapistList = (props) => {
    const SERVER_URL = 'https://arcane-savannah-62336.herokuapp.com/'
    const token = localStorage.getItem("jwtToken")

    const [profiles, setProfiles] = React.useState([])

    //include this line for every authenticated api call
    const config = {
        headers: { 'Authorization': "Bearer " + token }
    }

    // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`} 
    React.useEffect(() => {
        const fetchProfiles = async () => {
            const result = await axios(SERVER_URL + "therapist", config)
            setProfiles(result.data)
            console.log(result.data)
        }
        fetchProfiles()
    }, [])

    const backButton = () => {
        props.history.push('/')
    }

    return (
        <div>
            <button onClick={backButton}>back</button>
            <p>Therapist Page</p>
            <ul>
                {
                    profiles.map((object) => {
                        const profileUrl = "/therapist/" + object._id
                        return (
                            <Card
                                size="small"
                                title={object.firstName}
                                extra={
                                <Link to={{
                                    pathname: profileUrl,
                                    state: {
                                        profileData: object
                                    }
                                }}
                                >
                                    BOOK NOW
                                </Link>} style={{ width: 300 }}>
                                <p></p>
                            </Card>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default TherapistList