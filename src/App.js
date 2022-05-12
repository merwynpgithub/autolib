import { BrowserRouter, Route, Routes } from 'react-router-dom';

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

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/new" element={<NewBook />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/books/*" element={<Books />}/>
          <Route path="/books/:bookId" element={<Book />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/user" element={<User />}/>
          <Route path="/request" element={<Request />}/>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
