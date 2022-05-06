import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container fluid>
        <Navbar.Brand href="#home">AutoLib</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">About</Nav.Link>
          <Nav.Link href="#features">Grab A Book</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      <Navigation />
    </div>
  );
}

export default App;
