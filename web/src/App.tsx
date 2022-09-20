import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {Main} from './pages/Main'
import {Login} from './pages/Login'
import { Register } from './pages/Register'
import {useSelector} from 'react-redux'
import { RootStateOrAny } from 'react-redux'


function App() {

     const user = useSelector<RootStateOrAny, object>((state) => state.user.currentUser);

     return (
      <Router>
        <Routes>
          <Route path='/' element={user ? <Main /> : <Navigate to="/login" />}/>
          <Route path='/login' element={user ? <Navigate to='/'/> : <Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>    
    
   )  
}

export default App
