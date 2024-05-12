import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home'
import Favorites from './pages/favorites/favorites';
import Details from './pages/details/details';
import Navbar from './components/navbar/navbar';
import DetailItem from './components/detail-item/detail-item';

//npm install react-router-dom
//리액트 라우터를 사용하려면 index.js에서
//App컴포넌트를 <BrowserRouter>로 감싸준다.

function App() {
  return (
    <div className='base-container'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/favorites' element={<Favorites/>}></Route>
        {/* 쿼리파라미터(동적으로 url을 설정하는 페이지) : */}
        <Route path='/detail/:id' element={<Details/>}></Route>
      </Routes>
      <div>

      </div>
    </div>
  );
}

export default App;
