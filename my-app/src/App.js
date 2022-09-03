import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AddNotes from './pages/AddNotes';
import Blogs from './pages/Blogs';
import Signup from './pages/Signup'
import Login from './pages/Login';
import CoursePlannerPage from './pages/CoursePlanner'
import MyNavbar from './components/MyNavbar';
import FeedbackForm from './components/Feedback-form';
import BrowseNotes from './components/BrowseNotes';
import BrowseReview from './components/BrowseReview';
import Container from 'react-bootstrap/Container';
import ReviewDetail from './components/ReviewDetail';
import EventCalendar from './components/EventCalendar'
import Profile from './pages/Profile';
import Footer from './pages/Footer';
import useToken from './components/userToken';
import HomePrivate from './pages/HomePrivate';
import ReviewList from './components/ReviewList';

function App() {
  const { token, setToken } = useToken();
  const [courseID, setCourseID] = useState();
  const [review, setReview] = useState();


  return (
    <div className="App">
      <Container fluid>
        <Router>
          <MyNavbar token={token} setToken={setToken}></MyNavbar>
          <Routes>
            <Route path='/' exact element={!token ? <Home token={token} setToken={setToken} /> : <HomePrivate />} />
            <Route path='/notes/create' element={<AddNotes />} />
            <Route path='/notes/browse' element={<BrowseNotes token={token} setToken={setToken} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login setToken={setToken} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/feedback/create' element={<FeedbackForm />} />
            <Route path='/feedback/browse' element={<BrowseReview courseID={courseID} setCourseID={setCourseID} />} />
            <Route path='/feedback/browse/:courseID/reviews/:reviewID' element={<ReviewDetail review={review} setReview={setReview} />} />
            <Route path='/feedback/browse/:courseID/reviews' exact element={<ReviewList courseID={courseID} review={review} setReview = {setReview}/>} />
            <Route path='/calendar/events' element={<EventCalendar />} />
						<Route path='/planner' element={<CoursePlannerPage />} />
            <Route path='random' element={<ReviewDetail />} />

            {/* <Route path='/feedback/browse/:courseID' element={<ReviewDetail />} /> */}

          </Routes>
          {/* <Footer></Footer> */}
        </Router>

      </Container>
    </div>
  );
}

export default App;
