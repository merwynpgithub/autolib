import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Books from './components/pages/Books';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Book from './components/pages/Book';
import NewBook from './components/pages/NewBook';
import User from './components/pages/User';
import Footer from './components/Footer';
import Request from './components/pages/Request';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const appData = {};
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<App />}>
          <Route path="/" element={<Home appData={appData} />}/>
          <Route path="/new" element={<NewBook appData={appData} />}/>
          <Route path="/about" element={<About appData={appData} />}/>
          <Route path="/books" element={<Books appData={appData} />}>
            <Route path=":bookId" element={<Book />}/>
          </Route>
          <Route path="/login" element={<Login appData={appData} />}/>
          <Route path="/register" element={<Register appData={appData} />}/>
          <Route path="/user" element={<User appData={appData} />}/>
          <Route path="/request" element={<Request appData={appData} />}/>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
