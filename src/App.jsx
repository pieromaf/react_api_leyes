import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MiApi from './components/MiApi';



const App = () => {

  return (
    <>
    <div className='container'>
    <h1 className='pt-4'> Leyes Feriados Chile</h1>
    <MiApi/>
    </div>
    </>
  )
}

export default App
