// 스타일 ㅅ기트, 자바 스크립트 데이터를 import
/* 
./ = 지금 여기 
../ = 한번 나가서 
/ = 메인 경로
/src : src폴더로 들어가서 
*/
import { useState } from "react";
import data from "./data.js"; // 이 파일 옆에 있는 data 파일과 data란 키워드로 가져오기
import "./style.css"; // 이 파일 옆에 있는 style.css를 갖다 쓰겟다

export default function Accordion() {
  // 선택된 title의 번호를 저장할 state (UI와 연결된 변수)
  let [selected, setSelected] = useState(null); // null : 없음 선택되면 setSelected를 통해 id 넣어줌
  // 플래그 (단일선택 || 다중선택)
  let [enableMultiSelection, setEnableMultiSelection] = useState(false); // false : 단일 true : 다중
  let [selectedList, setSelectedList] = useState([]);
  function clickTitle(id) {
    //console.log(null);
    // 아이디를 selected에 넣는다
    setSelected(id);
    // useState 의 값을 갱신하려면 두번째 있는 것을 사용

    // 조건체크 : 이미 눌린애네? 그럼 없애
    // if (selected === id) {
    //   setSelected(null);
    // } else {
    //   setSelected(id);
    // }

    // selected가 null 이면 눌렀을떄 id로
    // selected가 id와 다르면 id 값을 넣고 같으면 null 값

    id !== selected ? setSelected(id) : setSelected(null);
  }

  // console.log(enableMultiSelection);
  // 다중 선택일떄는 선택된 애들을 모두 보관 ==> 배열
  //console.log(selectedList.indexOf(selectedList));
  function multiSelectTitle(id) {
    // 배열의 값을 갱신하기 위해서는 ...으로 분해했다가 다시 []로 감싼다
    // 객체의 값을 갱신하기 위해서는 ...으로 분해했다가 다시 {}로 감싼다
    let copyList = [...selectedList];
    console.log = selectedList.indexOf(id); // 다중선택배열에서 id값 검색 (indexOf : 만약 배열에 안에서 id를 찾을수 없다면 -1)
    //있는지 검사 ==> 없으면 추가
    let findIndexOfid = selectedList.indexOf(id); // 아이디 이미 있으면 그 위치
    // jsx가 아닌 js문법이라 if-else 가능
    if (findIndexOfid === -1) {
      // 없다
      copyList.push(id); // 배열에 추가
    } else {
      // 없으면 제거
      copyList.splice(findIndexOfid, 1); // 배열에서 제거 찾은 인덱스로부터 1개 없앰
    }
    setSelectedList(copyList);
    // console.log(selectedList);
  }

  return (
    <div className="wrapper">
      <button
        onClick={() => {
          setEnableMultiSelection(!enableMultiSelection);
        }}
      >
        다중 선택 ON/OFF
      </button>
      <div className="accordion">
        {data.map((element, idx) => {
          return (
            <div className="item">
              <div
                className="title"
                onClick={() => {
                  enableMultiSelection === true
                    ? multiSelectTitle(element.id)
                    : clickTitle(element.id);
                }}
              >
                <h3>{element.title}</h3>
                <span>+</span>
              </div>
              {
                // && : 그리고      trur && true : true /  true && fasle : flase / false && true : flase / false && fasle : flase /
                // && : 앞에거 틀렸으면 어차피 false 니까 뒤에거 검사안함
                // || : 앞에거 맞았으면 어차피 true 니까 뒤에거 검사안함
                enableMultiSelection === true
                  ? selectedList.indexOf(element.id) !== -1 && (
                      <div className="content">{element.content}</div>
                    )
                  : selected === element.id && (
                      <div className="content">{element.content}</div>
                    )
              }
              {/* {
                // selected 값이 id와 같은 부분만 content 생성
                selected === element.id && enableMultiSelection === false ? (
                  <div className="content">{element.content}</div>
                ) : null
              } */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
