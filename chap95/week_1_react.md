### JSX

JSX는 `JavaScriptExtension` 의 약어이다.
JS의 확장판 이기 때문에 기본 JS 뿐 아니라 HTML의 이벤트, 상태, data fetching 및 caching 등 을 이해할 수 있다.

React는 컴포넌트라는 개념을 도입하여 UI 랜더링 부분과 비즈니스 로직 부분을 분리하면서 느슨하게 연결을 시켜 놓았다. UI에 필요한 data 또는 기타 로직들이 하나의 컴포넌트에서 사용될 수 있다.

JSX는 컴파일 되면 Javascript 객체로 취급이 된다.
즉, JSX를 `if` 또는 `for` loop에도 사용이 가능하며 변수할당, 인자할당, return 값으로도 사용이 가능하다는 의미다.

JSX의 속성은 리터럴을 이용해서 정의할 수 있는데 이 때 주의할 점은 camelCase를 사용한다는 점이다. `class` 대신에 `className` 을 사용하고 `tabindex` 는 `tabIndex` 로 사용이 된다.

JSX는 사용자로 부터 입력을 기본적으로 이스케이프 처리 하기 때문에 코드 주입공격으로 부터 안전하다.

위에서 JSX는 JS 객체로 취급을 받는다고 언급했는데 이 객체는 `React.Element` 라고 불린다. React는 이런 객체를 읽어들여서 화면에 보고 싶은 것들을 나타낸다.

---

### Element Rendering

React는 기본적으로 DOM 과 React DOM을 가지고 있다. React는 DOM 상태를 알지 못한다. 그렇기에 React DOM은 React Element를 기준으로 DOM을 업데이트 시킨다.

React가 React Element 를 랜더링 하는 과정은 다음과 같다.

- DOM 엘리먼트를 `ReactDOM.createRoot()` 로 전달한다.
- 그 다음 React Element를 `root.render()` 에 전달해야한다.

그렇기 때문에 랜더링 된 엘리먼트를 업데이트하려면 `root.render()` 함수를 다시 실행시켜 주어야 한다. 이 때 React는 React DOM을 이용해서 업데이트가 필요한 부분만 다시 랜더링 하게 된다.

---

### Components 와 Props

컴포넌트는 함수형 컴포넌트와 클래스형 컴포넌트 2가지로 나뉘는데 요즘은 함수형 컴포넌트를 많이 사용하기 때문에 클래스형 컴포넌트에 대한 언급은 하지 않겠다.

함수형 컴포넌트의 코드는 간단하게 다음과 같다.

```ts
const Welcome = (props) => <div>Hello, {props.name}</div>;
```

props는 컴포넌트 외부로 부터 주입된 값인데 이 값이 컴포넌트의 재사용성을 높여주는 요소 중 하나다. props를 어떻게 사용하느냐에 따라서 외부에서 컴포넌트의 사용성을 결정짓는 정도가 달라진다. 위의 경우 단순하게 UI 모습만 바꾸는 정도에 그치는 반면 이벤트 핸들러 또는 자식 컴포넌트를 Props로 받는 경우는 컴포넌트의 자유도가 위 예시보다 높다고 할 수 있다.

이 때 props 값은 `read-only` 값이며 컴포넌트 내부에서는 수정이 불가능하다. 순수함수라는 개념이 존재하는데 같은 input에 대해서는 항상 같은 output을 내놓는 함수를 말하는데 컴포넌트는 무조건 순수함수여야 하는 Rule 이 존재한다.

필요에 따라서 작은 컴포넌트들을 활용해서 하나의 컴포넌트로 함성할 줄 알아야 하고 덩치가 커진 컴포넌트는 작은 컴포넌트로 분리할 줄 알아야 한다. 이는 컴포넌트의 재사용성, 관심사, 책임 등을 고려하고 작업을 진행하는 것이 좋다.

---

### State and LifeCycle

##### LifeCycle

![LifeCycle](./images/ReactLifeCycle.png)

React는 위 그림과 같은 Life Cycle을 가지고 있다. 사실 이 생명주기는 클래스형 컴포넌트에서만 사용되는 메소드이다. 하지만 React가 어떤식으로 UI를 랜더링했는지 알아보는 과정은 중요하기 때문에 여기서 집고 넘어가려고 한다. 해당 이미지는 React `16.4>=` 버전에서 존재하는 생명주기이다. React는 크게 3가지의 생명주기를 가지고 있는 것으로 보인다. `Mount`,`Update`,`Unmount` 가로 축에 적힌 3가지는 컴포넌트가 최초로 생성되어서 Render 될 때, 이미 생성된 컴포넌트가 업데이트 될 때, 이미 생성된 컴포넌트가 제거 될 때를 의미한다. 세로축에 있는 `Render 단계`, `Pre-commit 단계`, `Commit 단계`는 DOM을 기준으로 작성된 단계로 보인다. 이 과정에서 각각의 함수를 호출할 수 있으며 우리는 이 함수들을 중심으로 생명주기를 알아보자.

- `getDerivedStateFromProps` : `Mount`, `Update` 단계에서 `render` 메소드가 호출되기 직전에 호출된다. state를 갱신하기 위한 객체를 반환하거나 null 을 반환하여 아무 것도 갱신하지 않을 수 있다.
- `shouldComponentUpdate`: 이 메소드는 props 또는 state를 변경했을 때 다시 랜더링을 할지 말지 결정하는 메소이다. return 값은 boolean 이며 true가 되면 컴포넌트를 다시 랜더링하고 false가 되면 컴포넌트를 다시 랜더링하지 않는다.

```ts
 shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }
```

위 코드는 공식문서에 나와있는 `shouldComponentUpdate` 함수 예시코드다.

- `render` : 클래스형 컴포넌트에서 컴포넌트를 UI에 랜더링 하기 위한 함수이다. 이 함수의 종료가 정확히 브라우저에서 UI 랜더링을 의미하지는 않는다.
- `getSnapshotBeforeUpdate` : `render` 함수에서 만들어진 결과가 브라우저에 실제로 반영되기 직전에 호출이 된다. `render` 결과 반영되기 전 상태를 저장하기 위해서 주로 호출되며 스크롤 위치 값을 기억하기 위해서 주로 호출이 된다.
- `componentDidMount` : 해당 메소드는 컴포넌트를 생성하고 첫 랜더링을 마친 후에 실행된다. 함수형 컴포넌트에서는 `useEffect` 에 비어있는 `dep list` 를 두어서 활용이 가능하다. 이는 랜더링이 끝나고 실행이 되기 때문에 Server 단 에서는 절대 실행이 되지 않는다. 또한 `useEffect` 의 타이밍이 `componentDidMount` 와 일치한다해서 `useEffect` 를 생명주기로 받아들이면 안된다.
- `componentDidUpdate` : 해당 메소드는 컴포넌트가 업데이트 되고 난 후에 실행된다. 함수형 컴포넌트에서는 `useEffect` 의 `dep list`에 값이 들어있을 때를 생각하면 된다. `useEffect` 는 `dep list`에 들어있는 값이 변할 때 로직을 실행한다.
- `componentWillUnmount` : 해당 메소드는 컴포넌트가 사라지기 직전에 실행이 된다. 주로 해당 메소드에서는 state를 초기화 할 때 사용한다. `useEffect` 에서는 `return` 문에 있는 함수가 실행이 된다.

##### State

state 는 함수형 컴포넌트에서 `useState` 훅으로 생성이 가능하다.

```ts
const [isValid, setIsValid] = useState<boolean>(false);
```

위와 같이 코딩하는데 TS에서 `useState` 함수를 호출할 때 제네릭 변수에 타입을 할당하게 되면 `isValid` 값과 setter 함수인 `setIsValid` 함수의 타입이 해당 타입으로 결정이 된다.

state는 항상 setter 함수인 `setXXX` 로 업데이트 해야하며 직접적으로 값을 할당하면 컴포넌트가 다시 랜더링 되지 않는다.

state는 자식 컴포넌트의 props로 전달이 가능하다. 하지만 다른 컴포넌트에서 state의 접근은 불가능 하다. 컴포넌트의 기본 개념이 독립성이기 때문에 다른 컴포넌트가 state에 접근하는 것을 기본적으로 허용하지 않는다.

---

### 리스트와 Key

key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 도와준다.

```ts
const numList = [1, 2, 3, 4, 4, 5, 5];

return numList.map((value) => <li>{value}</li>);
```

위 예제에서 값은 같지만 서로 다른 컴포넌트가 존재한다. 이 때 React가 쉽게 컴포넌트를 구분할 수 있게 해주기 위해서 `key` 라는 속성을 사용하게 된다. `key` 는 형제사이에서만 절대 중복되지 않는 값을 사용한다.

```ts
const numList = [1, 2, 3, 4, 4, 5, 5];

return numList.map((value, index) => <li key={`list${index}`}>{value}</li>);
```

위와 같이 구현해 주면 React는 형태가 같은 컴포넌트라도 다른 컴포넌트로 인식하게 된다. 가끔 `key` 값을 잘못 넣어주거나 설정해주지 않아서 문제가 발생하는 경우도 종종 볼 수 있다.

### Composition VS Inheritance

React 공식문서에서는 상속대신 합성을 사용하여 컴포넌트 간에 코드를 재사용하는 것을 추천하고 있다. 상속에 대한 예시는 아예 없는 것 처럼 보이지만 합성에 대한 예시는 상당히 많이 존재한다.

```ts
const Wrapper = (props: { children: JSX.Element }) => {
  return (
    <div>
      <h1>제목</h1>
      {props.children}
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <Wrapper>
        <div>
          <p>내용</p>
        </div>
      </Wrapper>
    </div>
  );
};
```

위와 같이 태그 안에 Element를 배치함으로 의도적으로 `children` props에 전달하지 않아도 자연스럽게 전달이 된다.

여러 컴포넌트를 전달해야 할 경우에는 props에 `children` 키워드를 제외한 다른 리터럴로 표현이 가능하다. 하지만 의도적으로 JSX Element를 props로 전달해야한다.
