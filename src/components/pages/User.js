import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import '../styles/user.scss';

function User() {
  const user = JSON.parse(localStorage.user);

  // Store the list of books currently in user's possession
  const [bookP, setBookP] = useState([]);

  const [profile, setProfile] = useState(user);


  const updateProfileState = (e) => {
    const newState = { ...profile };
    newState[e.target.name] = e.target.value;
    setProfile(newState);
  }

  const onBlur = (e) => {
    handleSubmit(e);
  }

  
  function handleSubmit(e) {
    e.preventDefault();
    axios.put("/api/users", profile).then(res => { // Use Local storage to set new users
      localStorage.setItem("user", JSON.stringify(profile));
      //navigate("/");
    }).catch(err => console.log(err));
  }



  useEffect(() => {
    const url = "/api/resources?withStatus&current_possessor_id=" + user.id;
    axios.get(url).then(res => {
      setBookP(res.data);
      console.log(res.data);
    })
  }, [user.id])

  const booksPossessed = bookP.map(book => {

    const availability = book.status?.availableAt
      ? <span className='text-success'>expires {new Date(book.status?.availableAt).toLocaleDateString()}</span>
      : <span className='text-warning'>expired/in library</span>

    return (
      <div className="book" key={book.id}>
        <a href={"/books/" + book.id}><img src={book.cover_image || '/no-photo-available.png'} alt={book.title} loading="lazy" /></a>
        <p className='title'>{book.title}</p>
        <p>{availability}</p>
      </div>
    );
  });

  const getProvinceOptions = () => {
    const provinces = [
      'Alberta',
      'British Columbia',
      'Manitoba',
      'New Brunswick',
      'Newfoundland and Labrador',
      'Northwest Territories',
      'Nova Scotia',
      'Nunavut',
      'Ontario',
      'Prince Edward Island',
      'Quebec',
      'Sasketchewan',
      'Yukon',
    ]
    return provinces.map(p => <option value={p}>{p}</option>);
  };

  return (
    <>
      <Navigation/>
      <div className="user-container">
        <p className='header'>Your Profile</p>
        <p>Name: {user.first_name} {user.last_name}</p>
        <div>

          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div className="wrapper">
            <Form onSubmit={handleSubmit}>
            <div className="user-details">
              <Form.Group className="form-input" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"
                  placeholder="Please enter your email address"
                  value={profile.email}
                  name="email"
                  onChange={updateProfileState}
                  disabled
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="form-input" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="number"
                  placeholder="Please enter your phone number"
                  value={user.phone}
                  name="phone"
                  onChange={updateProfileState}
                  onBlur={onBlur}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

            </div>

            <div className="user-details">
              <Form.Group className="form-input" controlId="formBasicAddress">
                <Form.Label>Street Address</Form.Label>
                <Form.Control type="text"
                  placeholder="Please enter your street address"
                  value={profile.street_address}
                  name="street_address"
                  onChange={updateProfileState}
                  onBlur={onBlur}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="form-input" controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text"
                  placeholder="Please enter your city"
                  value={profile.city}
                  name="city"
                  onChange={updateProfileState}
                  onBlur={onBlur}
              />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
            </div>

            <div className="user-details">
              <Form.Group className="form-input" controlId="formBasicProvince">
                <Form.Label>Province</Form.Label>
                <Form.Select aria-label="Province"
                  name="province"
                  onChange={updateProfileState}  
                  onBlur={onBlur}
                  defaultValue={user.province}
                >
                  <option>Please select your province</option>
                  {getProvinceOptions()}
                </Form.Select>
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              
              <Form.Group className="form-input" controlId="formBasicZip">
                <Form.Label>Zip code</Form.Label>
                <Form.Control type="text"
                  placeholder="Please enter your zip code"
                  value={profile.zip_code}
                  name="zip_code"
                  onChange={updateProfileState}
                  onBlur={onBlur}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

            </div>
          </Form>
            </div>
 
          </div>
          <div className='possessions'>
            <p className='header'>Books in your Possession</p>
            <div className='booklist-container'>
            {bookP.length ? booksPossessed : <p>You currently have no books in your possession</p>}          
            </div>
          </div> 
        </div>

        
      </div>
      
    </>
  );
}

export default User;
