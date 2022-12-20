# 접근성

### WAI-ARIA 속성

접근성을 갖춘 Javascript 위젯을 만드는데 필요한 기술들이 담겨있다.

### 시맨틱 HTML

HTML과 CSS 그리고 이벤트 핸들러를 통해서 HTML을 `div` 태그로만 구성할 수 있다. 웹 사이트에 방문하는 사용자 입장에서는 큰 문제가 없지만 `SEO` 와 웹 접근성 측면에서는 상당히 좋지 못한 구조다.
특히 `<ol>`,`<ul>`,`<dl>` 과 같은 목록 태그들 또는 `<table>` 태그에서 문제가 두드러진다. 이 때 `<Fragment>` 컴포넌트를 활용해서 아래와 같이 묶어주는게 권장된다.

```tsx
function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dt>{item.description}</dt>
    </Fragment>
  );
}
```

`<Fragment>` 전체를 다 입력할 필요없이 `<>` 로도 표현이 가능하다.

```tsx
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dt>{item.description}</dt>
    </>
  );
}
```

매번 `<>` 태그르를 아무런 생각없이 사용해 왔는데 `<Fragment>` 의 다른 표현이었던걸 이제야 알았다. 내가 또 거리낌 없이 사용하는 코드 중에서 이런 코드가 있을까봐 두렵기도 하면서 설레기도 한다.

### 접근성 있는 폼

##### 라벨링

`<input>` 과 `<textarea>` 같은 HTML form 컨트롤은 구분할 수 있는 라벨이 필요하다. 스크린 리더를 사용하지 않는 경우는 `placeholder` 또는 다른 방식으로 어떠한 정보가 들어가야 하는지 설명이 제공된다. 하지만 스크린 리더를 사용하는 사용자에게는 `<label>` 태그기 있지 않는 이상 해당 `form`에 어떠한 정보가 들어가야 하는지 알 수 없다. `<label>` 태그는 아래와 같이 `input` 태그와 사용할 수 있다.

```tsx
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```

다만 검색창과 같이 스크린 리더를 사용하는 사람에게만 적용하고 싶을 때는 `label` 태그에 `hidden` 속성을 사용해주면 된다.

```tsx
<label htmlFor="namedInput" hidden>Name:</label>
<input id="namedInput" type="text" name="name"/>
```

이는 무엇을 입력해야 되는지 명확할 때에만 사용하는 것이 좋다.
ex) search button 과 함께있는 검색창

##### 포커스 컨트롤

모든 웹 어플리케이션은 키보드만을 통해서 사용할 수 있어야 한다.

React는 엘리먼트들을 지속적으로 변경하기 때문에 가끔 focus를 잃거나 엉뚱한 엘리먼트에 focus를 할 수 있다. React focus를 지정하려면 `ref` 를 사용할 수 있다.

실습) 공식문서에서는 클래스형 컴포넌트 예시가 나와 있는데 이를 함수형 컴포넌트로 만들어보자

# 코드 분할

##### Route-based code splitting

```tsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```

path가 `<Route>` 컴포넌트의 path 와 일치할 때 해당하는 컴포넌트를 불러오는 방식이다. 이는 공식문서 `import()` 부분에서 동적 import를 하는 방식과 비슷하다. 더욱 자세한 내용은 ESM이 module resolution을 어떻게 하는지 알아보면 된다.

# Context

context api는 react 컴포넌트 트리 안에서 global 한 state를 공유할 수 있다.
`Provider` 로 그 경계를 구분하며 `Provider` 자식으로 위치한 컴포넌트에서는 context에서 정의한 state가 공유된다. 이는 prop drilling을 하지 않아도 된다는 장점이 있으나 사용이 번거롭다는 단점이 존재한다.

전역 state를 컴포넌트 내부로 들이는 순간부터 컴포넌트와 전역 state 간에 종속성이 발생한다. 뿐만 아니라 해당 state를 사용한 컴포넌트 간에도 종속성이 생길 수 있으므로 사용에 주의해야 한다. 종속성이 발생해도 괜찮은 case를 잘 판단하자. 예를 들어서 `로그인 상태` 라는 state 는 app 전체적으로 공유되어도 상관이 없으므로 너무 작은 단위의 컴포넌트만 아니면 사용에는 거의 무방하다. 만약 `<Button>` 과 같은 공용 컴포넌트가 `로그인 상태` 에 따라서 style이 변해야하는 경우가 있다고 하면 `<Button>` 컴포넌트 내부말고 사용하는 위치에서 `로그인 상태` 를 받아서 props로 전달하는 방법이 좋다.

실습 : `Context` 를 사용하여 간단한 TODO list 구현하기

# Error Boundary

React 16 버전부터 `<ErrorBoundary>` 를 통해서 에러 바운더리 내부에서 발생하는 에러를 포착해 Fallback UI를 손쉽게 랜더링 할 수 있다. 아래와 같은 에러는 잡아 내지 못한다.

- 이벤트 핸들러
- 비동기 코드 `setTimeout`, `requestAnimationFrame`
- SSR
- Error Boundary 자체에서 발생하는 에러

# HOC

고차 컴포넌트는 컴포넌트 로직을 재사용하기 위한 React의 기술이다. API의 일부가 아니고 React의 구성적 특성에서 나오는 패턴이다.

HOC는 같이 읽어보면 좋을 것 같습니다. 저도 이해하기가 어렵네요...

# JSX 이해하기

- 스코프내에 컴포넌트가 존재해야 한다.
- `<script>` 태그를 통해 React를 불러왔다면 React는 전역변수로 존재해서 별도로 import 할 필요가 없다.

##### JSX 타입을 위한 점 표기법 사용

```tsx
import React from "react";

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  },
};

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

##### 사용자 정의 컴포넌트는 반드시 대문자로 시작해야한다.

소문자로 시작하는 경우는 내장 컴포넌트라는 것을 의미하며 `'div'`,`'span'` 같은 문자열 형태로 `React.createElement` 에 전달된다. `<Foo />` 와 같은 대문자로 시작하는 타임들은 `React.createElement(Foo)`의 형태로 컴파일 된다.

#### null, boolean, undefined는 무시

boolean이 무시가 되기 때문에 아래와 같은 문법을 사용할 수 있다.

```tsx
<div>
  {showHeader && <Header />}
  <Content />
</div>
```

한 가지 주의해야 할 점은 boolean 이 무시된다해서 `falsy` 값까지 무시되는 건 아니라는 것이다.

```tsx
<div>{props.messages.length && <MessageList messages={props.messages} />}</div>
```

위와 같은 경우에 `0` 은 falsy 값이어서 무시되지 않고 랜더링 된다. 이를 수정하기 위해서는
`&&` 연산자 앞의 값이 boolean 이 오게끔 수정하면 된다.

```tsx
<div>
  {props.message.length > 0 && <MessageList messages={props.messages}>}
</div>
```
