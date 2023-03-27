import TodoInsert from '../components/TodoInsert';

export default {
  title: "TodoList/TodoInsert",
  component: TodoInsert,

  // 이번에 작성한 전달인자의 타입은 Storybook을 보고 직접 확인해보세요.
  argTypes: {
      color: { control: 'color'},
      size: { control: { type:'radio', options : ['big', 'small'] }},
      text: { control: 'text'}
  }
};

export const StorybookButton = (args) => (
  <TodoInsert />
)

