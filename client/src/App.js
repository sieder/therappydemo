import React from 'react';
import './App.css';
import Home from './pages/home/home.component'
import TherapistList from './pages/therapist-list/therapist-list.component'
import Profile from './components/profile/profile.component'
import Payment from './components/payment/payment.components'
import Feedback from './components/feedback/feedback.component'

import { Switch, Route } from 'react-router-dom'

function App() {
  return (

      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/therapylist' component={TherapistList} />
        <Route path='/therapist' component={Profile} />
        <Route path='/payment' component={Payment} />
        <Route path='/feedback' component={Feedback} />
      </Switch>

  );
}

export default App;
