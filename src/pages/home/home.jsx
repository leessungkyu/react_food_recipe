import { useContext } from "react";
import "./home.css";
import { GlobalContext } from "../../context/context";
import DetailItem from "../../components/detail-item/detail-item"


export default function Home(){
  const {foodList} = useContext(GlobalContext);
  return(
    <div className="home-container">
      {
        foodList && foodList.length > 0 ? (
          //데리어탁 있을떄
          foodList.map((food, idx)=>{
            return(
              //map에서 컴포넌트를 생성할땐 첫번째 인자를 전달
              <DetailItem key={idx} item={food}/>
            )
          })
        ) 
        : (
          //데이터가 없을때
          <div className="no-item">
            <p>검색하세요. pizza, banana, aplle ...</p>
            <a href="https://forkify-api.herokuapp.com/phrase.html" target="_blank">
              <button className="guide-btn"> 검색항목안내</button>
            </a>
          </div>
        )
      }
    </div>
  )
}