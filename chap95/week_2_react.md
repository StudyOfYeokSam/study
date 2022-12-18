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
`<input>` 과 `<textarea>` 같은 HTML form 컨트롤은 구분할 수 있는 라벨이 필요하다. 스크린 리더를 사용하지 않는 경우는 `placeholder` 또는 다른 방식으로 어떠한 정보가 들어가야 하는지 설명이 제공된다. 하지만 스크린 리더를 사용하는 사용자에게는 `<label>` 태그기 있지 않는 이상 해당 `form`에 어떠한 정보가 들어가야 하는지 알 수 없다. `<label>` 태그는 
