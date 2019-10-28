import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const Payment = props => {
    const { firstName, lastName, aboutMe, hourlyRate, specialties, servicesOffered } = props.history.location.state.profileData
    console.log(props.history.location.state)
    return (
        <div>
            <p><b>Make payment</b></p>
            <p>Appointment Details</p>
            <p>{firstName + " " + lastName}</p>
            <br />
            <p>Payment Details</p>
            <p>1 hour session - ${hourlyRate}/hr</p>
            <p>Total Amount - ${hourlyRate}/hr</p>
            <Link to={{pathname: '/feedback'}}>
                <Button>Confirm Payment</Button>
            </Link>
        </div>
    )
}

export default Payment