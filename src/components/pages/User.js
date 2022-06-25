import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import '../styles/user.scss';
import BookThumb from './UserBookThumb';

function User() {
  const appData = useOutletContext();
  // Store the list of books currently in user's possession
  const [bookP, setBookP] = useState([]);

  const [profile, setProfile] = useState(appData.user);


  const updateProfileState = (e) => {
    const newState = { ...profile };
    newState[e.target.name] = e.target.value;
    setProfile(newState);
  }

  const updateDb = () => appData.updateUser(profile);

  useEffect(() => {
    const url = "/api/resources?withStatus&current_possessor_id=" + appData.user?.id;
    axios.get(url).then(res => {
      setBookP(res.data);
    })
  }, [appData.user?.id])

  const booksPossessed = bookP.map(book => <BookThumb book={book} key={book.id}/>);
  
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
    return provinces.map(p => <option key={p} value={p}>{p}</option>);
  };

  return (
    <>
      <Navigation appData={appData}/>
      <div className="user-container">
        <p className='header'>Your Profile</p>
        <p>Name: {appData.user.first_name} {appData.user.last_name}</p>
        <div>

          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div className="wrapper">
            <Form>
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
                  value={profile.phone}
                  name="phone"
                  onChange={updateProfileState}
                  onBlur={updateDb}
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
                  onBlur={updateDb}
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
                  onBlur={updateDb}
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
                  onBlur={updateDb}
                  defaultValue={appData.user.province}
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
                  onBlur={updateDb}
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
