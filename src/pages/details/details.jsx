import { useContext, useEffect } from "react";
import "./details.css";
import { GlobalContext } from "../../context/context";
import { useParams } from "react-router-dom";

export default function Details(){
  //아이디를 통해서 들어왔으므로 해당 아이디에 대한 데이터를 가져온다.
  const {id} = useParams();
  
  //Context에서 사용할 state들을 받아온다
  //상세보기에서 foodDetailData에 데이터를 받아오고,
  //상세보기에서 즐겨찾기에 추가하게 한다.
  const {foodDetailData, setFoodDetailData, favoritesList, hAddToFavorite} = useContext(GlobalContext);

  //오래걸리는 작업은 useEffect처리
  useEffect(()=>{
      //상세보기 화면에 들어오면 id를 받아 데이터를 요청
      async function getFoodDetail(){
        //음식상세정보 받아오기
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`); //get요청으로 서버에서 데이터를 받아온다.
        const data = await res.json(); //json 문자열 -> 자바스크립트에 맞게 변환
        console.log(data);
        //성공시 foodDetailData에 담기
        if(data?.data){
          setFoodDetailData(data?.data);
        }
      }

      getFoodDetail();   //함수 사용
  }, [])   //useEffect가 처음 켜졌을때만 동작하도록 []를 넣어줌다([]를 안넣어주면 바뀔때마다 update발동)

  //useEffect : mount, update, unmount ==> update에 대해서 동작을 안하게 하고 싶다면 , []를 추가

  return(
    <div className="details-container">
      {/* 이미지 */}
      <div className="img-container"> 
        <div className='img-wrapper'>
          <img src={foodDetailData?.recipe?.image_url} className="img-style" alt="사진"/>
        </div>  
      </div>
      {/* 내용 */}
      <div className="content-container">
        <span className="text-publisher">{foodDetailData?.recipe.publisher}</span>
        <h3 className="text-title">{foodDetailData?.recipe.title}</h3>
        {/* 즐겨찾기 버튼 */}
        <div>
          <button type="button" className="favorites-btn" onClick={()=>{
            hAddToFavorite(foodDetailData?.recipe)
          }}>
            {/* 해당 아이디가 favoritesList에 없으면 '즐겨찾기 추가' 있으면 '즐겨찾기 제거 */}
            {
              favoritesList &&  favoritesList.length > 0  && favoritesList.findIndex(item=>item.id === foodDetailData.recipe?.id) !== -1 ? '즐겨찾기 제거' : '즐겨찾기 추가'
            }
          </button>
        </div>
        {/* 레시피 내용 */}
        <div>
          <span className="recipe-title">레시피:</span>
          <ul className="recipe-content">
            {
              //map을 통해서 들어있는 만큼만 반복하며 li태크 생성
              foodDetailData?.recipe?.ingredients.map((item, idx)=>{
                return(
                  <li key={idx}>
                    <span>{item.quantity} {item.description}</span>

                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      
      
    </div>

  )
}