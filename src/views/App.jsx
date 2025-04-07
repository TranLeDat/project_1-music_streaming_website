import './App.scss'
import Logo from './Sidebar/Logo'


function App() {

  return (
    <>
      <container id="container" className="container">
        <div className='sidebar'>
            <Logo/>
        </div>
        <div className='mainContent'></div>
      </container>
    </>
  )
}

export default App
