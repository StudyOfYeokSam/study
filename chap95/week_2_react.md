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
  )
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
  )
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

##### 마우스와 포인터 이벤트
