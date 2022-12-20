## useForm 이 도와주는 일

1. 이벤트 핸들
2. validation 유효성 검사
3. state 관리

## 사용 : register, watch

- `const {register, watch} = useForm();`

1. register 에다 문자열 인자를 넣어주면 해당 문자열을 key 로 하는 form 이 등록된다.
2. **register 함수가 리턴하는 값을 원하는 input 에 props로 전달해준다.**

   - `registeer("toDo")` 가 리턴하는 객체 : `{name: 'toDo', onChange: f, onBlur: f, ref: f}`

3. watch 함수는 form 의 입력값들의 변화를 관찰할수 있게 해준다.
4. `watch()` 가 리턴: `{toDo: 'abcdef'}`

```javascript
function ToDoList() {
  const { register, watch } = useForm();

  return (
    <div>
      <form>
        <input {...register("toDo")} placeholder='Write a toDo' />
        <button>Add</button>
      </form>
    </div>
  );
}
```

## form validation

### handleSubmit

- 유효성 검사를 담당한다
- const { handleSubmit } = useForm();

#### 사용

1. <form> 에 onSubmit 이벤트를 등록한다.
2. handleSubmit 호출을 해주는데 handleSubmit 은 2개의 인자를 받는다.
   - 하나는 데이터가 유효할 때 호출되는 함수(필수) =: onValid
   - 다른 하나는 데이터가 유효하지 않을때 호출되는 함수
3. 유효할 경우, handleSubmit 이 onValid에 data 객체를 전달한다.
4. data = { email: "1234", firstname: "456}

```typescript
const {register, watch, handleSubmit} =useForm();
const onValid = (data) =>{
  console.log(data)  // { email: "1234", firstname: "456}
}

return (
  <div>
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("email")}>
      <input {...register("firstname")}>
      <button> submit </button>
  </div>
)

```

#### 유효하지 않은 경우

1. require 넣기

- register 함수에 `{required :true}` 객체 인자를 하나 더 전달한다
- `{...register("email", {required: true })}` 이 props 가 없는 인풋요소노가 있을떼 submit 이 되면 해당 인풋으로 자동 포커싱 된다.

2. 최소 문자 길이

- register 함수에 전달하는 객체에 `minLength : 5` 를 추가해준다.
- `{...register("email", {required: true , minLength: 5})}`

3. `formState` 를 useForm() 에서 하나 더 가져온다

- 에러를 관리할 수 있다.
- submit 했을 때 invalid 인 경우 해당 에러가 `formState.errors` 객체에 담긴다.

```typescript
const { register, handleSubmit, formState } = useForm();

console.log(formState.errors);
/*
  {
    email: { message: "" , ref: input, type: "minLength" },
    firstName: {message:"", ref: input, type: "required"}
  }
*/
```

4. 유효성을 검사하는 객체의 value 에 메세지를 전달할 경우, 해당 에러가 발생하면 메세지를 띄울 수 있다.

```typescript
// <input {...register("email", {required: "필수 입력사항입니다." , minLength: 5})} type="text"> , input 을 채우지 않고 제출시

console.log(formState.errors);

/*
  {
    email: { message: "필수 입력사항입니다." , ref: input, type: "required" },
    firstName: {message:"", ref: input, type: "required"}
  }
*/
```

```typescript
<input {...register("email", {
  required: "필수 입력사항입니다.",
  minLength: {
    value: 5,
    message: "5글자 이상으로 해야 합니다."
    }
})} type="text">

console.log(formState.errors)

/*
  {
    email: { message: "5글자 이상으로 해야 합니다." , ref: input, type: "minLength" },
  }
*/

```

5. 정규식 사용하기

   - 객체에 `pattern : 정규식` 를 추가한다
   -

```javascript
<input {...register("email",
  {
    required: "필수 입력사항입니다." ,
    minLength: 5,
    pattern : {
      value: /^[A-Z]+naver.com$/
      message: "패턴이 불일치했습니다."
    }
    })} type="text">
```

#### Tip: error 꺼내기

```javascript
const { register, handleSubmit, formState } = useForm();

<span>{formState.error?.email?.message}</span>;
// 대신에 아래처럼 쓸 수 있다.
const {
  register,
  handleSubmit,
  formState: { error },
} = useForm();

<span>{error?.email.message}</span>;
```

d
