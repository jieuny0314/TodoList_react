// 액션, 액션 생성함수인 리듀서 
// 액션 -> dispatch() -> 리듀서 -> store 생성

// 액션 타입 정의
const MEMO_INSERT = "MEMO/INSERT";
const MEMO_REMOVE = "MEMO/REMOVE";
const MEMO_UPDATE = "MEMO/UPDATE";


// 액션 생성 함수 정의(컴포넌트에서 받아온 인자를 전달받아 사용한다)
export const memoInsert = (id, text) => {
  return {
    type: MEMO_INSERT,
    payload: {
      id: id,
      text: text,
      isCompleted: false,
    },
  };
};
export const memoRemove = (id) => {
  return {
    type: MEMO_REMOVE,
    payload: { id: id },
  };
};
export const memoUpdate = (id, text) => {
  return {
    type: MEMO_UPDATE,
    payload: { id: id, text: text },
  };
};

const initState = {
  memos: [
    {
      id: 1,
      text: "와 리덕스 합치기 성공",
      isCompleted: false,
      createdDate : '2023-03-01'
    },
    {
      id: 2,
      text: 
      "놀이 것은 영원히 밝은 동력은 인간은 뿐이다. 새 밝은 속잎나고, 천자만홍이 있는 무엇을 인간이 가는 것이다. 열락의 끓는 붙잡아 가치를 내는 노년에게서 사막이다. 긴지라 사라지지 설레는 있을 이상 것은 얼마나 고동을 같은 철환하였는가? \n\n우리의 위하여 청춘을 별과 이상은 풍부하게 피다. 그들은 소담스러운 찾아다녀도, 용감하고 구할 원대하고, 이성은 위하여서. 피가 넣는 같은 만물은 얼마나 천자만홍이 품고 찾아 그들을 것이다.\n 속에 주며, 밝은 옷을 황금시대의 그러므로 황금시대다.",
      isCompleted: false,
      createdDate : '2023-03-04'
    },
    {
      id: 3,
      text: "황금시대를 풀이 대고, 뼈 찾아다녀도, 예가 바로 크고 힘있다.무엇이 같은 할지니, 반짝이는 너의 보배를 봄바람이다. 그들의 이상은 같이 노래하며 없으면 인생에 것이다.있는 간에 없으면 밥을 얼음에 아니다.",
      isCompleted: false,
      createdDate : '2023-03-08'
    }
  ],
};

// 리듀서 생성(액션을 리듀서에 전달하고, 리듀서가 이를 보고 스토어의 상태를 업데이트 한다)
// 액션을 리듀서에 전달하기 위해서는 dispatch() 메소드를 사용해야 한다.
export default function memoReducer(state = initState, { type, payload }) {
  switch (type) {
    case MEMO_INSERT:
      let today = new Date().toISOString().slice(0, 10);
      return {
        ...state,
        memos: state.memos.concat({
          id: payload.id,
          text: payload.text,
          isCompleted: false,
          createdDate: today
        }),
      };
    case MEMO_REMOVE:
      return {
        ...state,
        memos: state.memos.filter((memo) => memo.id !== payload.id),
      };
    case MEMO_UPDATE:
      return {
        ...state,
        memos: state.memos.map((memo) =>
          memo.id === payload.id ? { ...memo, text: payload.text } : memo
        ),
      };

    default:
      return { ...state };
  }
}