## Queries

https://tanstack.com/query/v4/docs/react/guides/queries

### Query basic

- 쿼리란 비동기적인 데이터에 대한 선언적인 의존성(declarative dependency)을 말한다.
- 쿼리는 method(GET, POST 등)에 기반한 모든 Promise 와 함께 서버에서 데이터를 패칭하는 데 사용할 수 있다.
- 서버에 대한 데이터를 수정한다면 Mutations 를 사용하는걸 추천

너의 컴포넌트나 커스텀 훅에 있는 쿼리를 구독하기 위해서는 `useQuery` 훅을 다음과 함꼐 사용해라

1. 쿼리에 대한 unique key
2. roselved data나 error를 던지는 Promise 를 리턴하는 함수

```tsx
import { useQuery } from "@tanstack/react-query";

function App() {
  const info = useQuery({ queryKey: ["todos"], queryFn: fetchTodoList });
}
```

> **unique key** 는 내부적으로 리패칭, 캐싱, 쿼리를 앱에 공유하는 경우 사용한다.

## Query Functions

https://tanstack.com/query/v4/docs/react/guides/query-functions

> 쿼리 함수(Query Functions)는 promise를 리턴하는 모든 함수를 말한다. 이 promise 는 resolve the data 혹은 throw an error 를 리턴한다.

```tsx
// 쿼리함수 사용 예시
useQuery({ queryKey: ["todos"], queryFn: fetchAllTodos });
useQuery({ queryKey: ["todos", todoId], queryFn: () => fetchTodoById(todoId) });
useQuery({
  queryKey: ["todos", todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId);
    return data;
  },
});
useQuery({
  queryKey: ["todos", todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
});
```

## Placeholder Query Data

- placeholder data는 쿼리가 이미 데이터를 가지고 있는 것처럼 작동하게 해준다.<br>
- `initialData`랑 비슷한데 차이점은 캐시에 유지되진 않는다.
- 실제 데이터가 백그라운드에서 패치되는 동안 부분적인 자료(혹은 페이크 자료)를 빠르게 랜더링 해서 보여주고 싶은 상황에서 유용하다.

캐시에 placeholder data 를 쿼리로 제공하는 방법

1. 캐시가 비어있으면 placeholderData를 prepopulate 하기
   ㅔㅔ
