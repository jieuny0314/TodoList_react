// 액션, 액션 생성함수인 리듀서 
// 액션 -> dispatch() -> 리듀서 -> store 생성

// 액션 타입 정의
const TODO_INSERT = "TODO/INSERT";
const TODO_REMOVE = "TODO/REMOVE";
const TODO_UPDATE = "TODO/UPDATE";
const TODO_TOGGLE = "TODO/TOGGLE";


// 액션 생성 함수 정의(컴포넌트에서 받아온 인자를 전달받아 사용한다)
export const todoInsert = (id, text) => {
  return {
    type: TODO_INSERT,
    payload: {
      id: id,
      text: text,
      isCompleted: false,
    },
  };
};
export const todoRemove = (id) => {
  return {
    type: TODO_REMOVE,
    payload: { id: id },
  };
};
export const todoUpdate = (id, text) => {
  return {
    type: TODO_UPDATE,
    payload: { id: id, text: text },
  };
};
export const todoToggle = (id) => {
  return {
    type: TODO_TOGGLE,
    payload: { id: id },
  };
};

const initState = {
  todos: [
    {
      id: 1,
      text: "끝내주게 숨쉬기",
      isCompleted: true,
      createdDate : '2023-03-27'
    },
    {
      id: 2,
      text: "간지나게 자기",
      isCompleted: false,
      createdDate : '2023-03-27'
    },
    {
      id: 3,
      text: "작살나게 밥먹기",
      isCompleted: false,
      createdDate : '2023-03-27'
    },
  ],
  
};

// 리듀서 생성(액션을 리듀서에 전달하고, 리듀서가 이를 보고 스토어의 상태를 업데이트 한다)
// 액션을 리듀서에 전달하기 위해서는 dispatch() 메소드를 사용해야 한다.
export default function todoReducer(state = initState, { type, payload }) {
  switch (type) {

    case TODO_INSERT:
      return {
        ...state,
        todos: state.todos.concat({
          id: payload.id,
          text: payload.text,
          isCompleted: false,
        }),
      };

    case TODO_REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload.id),
      };

    case TODO_UPDATE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id ? { ...todo, text: payload.text } : todo
        ),
      };

    case TODO_TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };

    default:
      return { ...state };
  }
}