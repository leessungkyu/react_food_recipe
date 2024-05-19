import { useContext } from "react";
import "./favorites.css";
import { GlobalContext } from "../../context/context";
import DetailItem from "../../components/detail-item/detail-item"

export default function Favorites(){
  //Context API에 있는 state를 필요한 것만 받아오고
  //화면을 작성
  //facoritesList에 즐겨찾기 항목이 들어있음
  //Context API를 사용하려면 useContext()사용
  const {favoritesList} = useContext(GlobalContext);  
  return(
    <div className="favorites-container">
      {/* favoritesList에 무언가 안담겨 있으면 추가하라고 글을 표시 */}
      {/* 무언가 담겨있으면 담긴 항목을 표시 */}
      {
        favoritesList && favoritesList.length > 0 ? (
              favoritesList.map((item, idx) => (
                <DetailItem item={item} key={idx} />
              ))
          
        ) :
        (
          <div className="no-item-style"> 
            <p>즐겨찾기에 추가된 항목이 없음</p>
          </div>
        )
      }
    </div>
  )
}