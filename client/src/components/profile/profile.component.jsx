import React from 'react'

import { Link } from 'react-router-dom'
import { Button } from 'antd'

const Profile = props => {
    console.log("therapist profile", props.history.location)
    const { firstName, lastName, aboutMe, hourlyRate, specialties, servicesOffered} = props.history.location.state.profileData
    const profileData = props.history.location.state.profileData
    const handleBack = () => {
        props.history.push('/therapylist')
    }
    return(
        <div>
            <button onClick={handleBack}>back</button>
            <p>Profile</p>
            <p>first name: {firstName}</p>
            <p>last name: {lastName}</p>
            <p>about me: {aboutMe}</p>
            <p>rate: ${hourlyRate}/hr</p>
            <p>specialties: {specialties}</p>
            <p>service offered: {servicesOffered === 1 ? <p>chat - video call - audio call</p> : "" }</p>
            <Link to={{pathname: '/payment', state: { profileData: profileData } }} > 
            <Button type="primary">Book an appointment</Button>
            </Link>
        </div>
    )
}

export default Profile