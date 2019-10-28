import React from 'react'
import { Button } from 'antd'
import axios from 'axios'
const SERVER_URL = 'http://localhost:4000'

const Feedback = props => {

    const [rate, setRate] = React.useState(0)
    const [comment, setComment] = React.useState('')
    const token = localStorage.getItem("jwtToken")
    const config = { headers: { 'Authorization': "Bearer " + token } }

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name, value)
        name === "rate" && setRate(value)
        name === "comment" && setComment(value)

    }

    const handleSubmit = () => {
        console.log(rate, comment)
        axios.post(SERVER_URL + '/feedback', {
            feedback: comment,
            rate: rate
        }, config).then((result) => {
            console.log(result)
        })

        const postedAlert = window.confirm('feedback posted, ok to go back to homepage')
        if (postedAlert) {
            props.history.push('/')
        }
    }

    return (
        <div>
            <p>
                <button onClick={() => props.history.push('/')}>go to homepage</button>
            </p>
            <b>feedback</b>
            <p>give your feedback</p>
            <p>
                <input 
                    type="text" 
                    name="rate" 
                    placeholder="rate from 1 to 5" 
                    onChange={handleChange}
                />
            </p>
            <textarea 
                placeholder="comment"
                name="comment"
                onChange={handleChange}
            />
            <p>
            <Button onClick={handleSubmit}>submit feedback</Button>
            </p>
        </div>
    )
}

export default Feedback