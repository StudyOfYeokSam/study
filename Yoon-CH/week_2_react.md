#### 접근성

- 접근성이 필요한 이유

- 웹 접근성(별칭: a11y)은 `모두가 사용할 수 있도록 웹사이트를 디자인, 개발하는 것`을 의미합니다.

- 보조과학기술(assistive technology)들이 웹페이지들을 해석할 수 있도록 접근성을 갖추는 것이 필요합니다.

- `React는 접근성을 갖춘 웹사이트를 만들 수 있도록 모든 지원`을 하고 있으며, 대부분은 표준 HTML 기술이 사용됩니다.

#### 시맨틱 HTML

- 시맨틱 HTML은 웹 애플리케이션에 있어 접근성의 기초입니다.

- 정보의 의미가 강조되는 HTML 엘리먼트를 웹 사이트에서 사용하면 `자연스럽게 접근성`이 갖추어지곤 합니다.

- 가끔 React로 구성한 코드가 돌아가게 만들기 위해 <div>와 같은 엘리먼트를 사용해 HTML의 의미를 깨트리곤 합니다.

- 특히, 목록(ol, ul, dl)과 HTML table을 사용할 때 문제가 두드러집니다. 이 경우에는, `React Fragment`를 사용하여 여러 엘리먼트를 하나로 묶어주는 것을 권장합니다.

```
function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}


{props.items.map(item => (
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
))}
```

- Fragment 태그에 `어떤 props도 필요하지 않고`, 사용하고 있는 도구에서 지원한다면 짧게 줄여 쓸 수 있습니다.

#### 라벨링

- input과 textarea 같은 모든 HTML 폼 컨트롤은 구분할 수 있는 라벨이 필요합니다.

#### 번들링

- 대부분 React 앱들은 Webpack, Rollup 또는 Browserify 같은 툴을 사용하여 여러 파일을 하나로 병합한 “번들 된” 파일을 웹 페이지에 포함하여 한 번에 전체 앱을 로드 할 수 있습니다.

#### import()

- 앱에 코드 분할을 도입하는 가장 좋은 방법은 동적 import() 문법을 사용하는 방법입니다.

#### React.lazy

- React.lazy 함수를 사용하면 동적 import를 사용해서 컴포넌트를 렌더링 할 수 있습니다.

```
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

#### Context

- context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있습니다.

- context는 React 컴포넌트 트리 안에서 전역적(global)이라고 볼 수 있는 데이터를 공유할 수 있도록 고안된 방법입니다

- context를 사용하면 중간에 있는 엘리먼트들에게 props를 넘겨주지 않아도 됩니다.

- `Context는 리액트 컴포넌트간에 어떠한 값을 공유할수 있게 해주는 기능입니다. `
- 주로 `Context는 전역적(global)으로 필요한 값`을 다룰 때 사용한다.

- 꼭 전역적일 필요는 없습니다. Context를 단순히 `"리액트 컴포넌트에서 Props가 아닌 또 다른 방식으로 컴포넌트간에 값을 전달하는 방법이다"` 라고 접근을 하시는 것이 좋습니다.

#### context를 사용하기 전에 고려할 것

- context의 주된 용도는 다양한 레벨에 네스팅된 많은 컴포넌트에게 데이터를 전달하는 것입니다. context를 사용하면 컴포넌트를 재사용하기가 어려워지므로 꼭 필요할 때만 쓰세요.

- 여러 레벨에 걸쳐 props 넘기는 걸 대체하는 데에 context보다 컴포넌트 합성이 더 간단한 해결책일 수도 있습니다.

#### React.createContext

- Context 객체를 만듭니다. Context 객체를 구독하고 있는 컴포넌트를 렌더링할 때 React는 트리 상위에서 가장 가까이 있는 짝이 맞는 Provider로부터 현재값을 읽습니다.

#### Context.Provider

- Context 오브젝트에 포함된 React 컴포넌트인 Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할을 합니다.

- Provider 컴포넌트는 value prop을 받아서 이 값을 하위에 있는 컴포넌트에게 전달합니다.
- 값을 전달받을 수 있는 컴포넌트의 수에 제한은 없습니다.

#### Props로만 데이터를 전달하면 발생할 수 있는 문제

- 리액트 애플리케이션에서는 일반적으로 컴포넌트에게 데이터를 전달해주어야 할 때 Props를 통해 전달합니다.
- 그런데 깊숙히 위치한 컴포넌트에 데이터를 전달해야 하는 경우에는 여러 컴포넌트를 거쳐 연달아서 Props를 설정해주어야 하기 때문에 불편하고 실수할 가능성이 높아지죠.

```
Props Drilling 예제
function App() {
  return <GrandParent value="Hello World!" />;
}

function GrandParent({ value }) {
  return <Parent value={value} />;
}

function Parent({ value }) {
  return <Child value={value} />;
}

function Child({ value }) {
  return <GrandChild value={value} />;
}
```

#### 이벤트 핸들러

- 에러 경계는 이벤트 핸들러 내부에서는 에러를 포착하지 않습니다.

- React는 이벤트 핸들러의 에러를 해결하기 위해서 에러 경계를 필요로 하지 않습니다.

- render 메서드 및 생명주기 메서드와 달리 이벤트 핸들러는 렌더링 중에 발생하지 않습니다.

#### Fragments

- React에서 컴포넌트가 여러 엘리먼트를 반환하는 것은 흔한 패턴입니다. Fragments는 DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화할 수 있습니다.

```
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}


render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}
```

- key 또는 어트리뷰트를 지원하지 않는다는 것을 빼고 다른 엘리먼트처럼 <></>을 사용할 수 있습니다.
