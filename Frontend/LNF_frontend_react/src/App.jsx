import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddItem from './pages/AddItem';
import ItemDetail from './pages/ItemDetail';
import EditItem from './pages/EditItem';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/edit/:id" element={<EditItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App