import React from 'react'
import Login from '../login/login.component'
// import {TherapistList} from '../therapist-list/therapist-list.component'

import { Link, withRouter } from 'react-router-dom'

const Home = () => {

    const [isUserLoggedIn, setUserLoggedIn] = React.useState(false)

    React.useEffect(() => {
        const setToken = async () => {
            localStorage.getItem('jwtToken') && setUserLoggedIn(true)
        }
        setToken()
    }, [])

    const handleLogOut = () => {
        localStorage.removeItem('jwtToken')
        window.location.reload()
    }
    console.log("home")
    return (
        <div>
            <p>Home</p>
            <p>
                {
                    isUserLoggedIn
                        ? (
                            <Link to='/therapylist'>Therapy List</Link>
                        )
                        : ''
                }
            </p>
            {
                isUserLoggedIn
                    ? <button onClick={handleLogOut}>Logout</button>
                    : <Login />
            }

        </div>
    )
}

export default Home