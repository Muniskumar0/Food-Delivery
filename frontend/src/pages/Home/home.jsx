import './home.css'
import Header from '../../comonents/header/header'
import ExploreMenu from '../../comonents/ExploreMenu/ExploreMenu'
import bike from "./bike.png"

const Home = ({setCategory }) => {

  
  return (
    <div>
      <Header/>
      <ExploreMenu setCategory={setCategory} />
      <marquee direction="right">
            <img src={bike} alt="bike" style={{height:'300px'}} />
      </marquee>
      
    </div>
  )
}

export default Home