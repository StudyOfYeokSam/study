### 접근성

- 접근성이 필요한 이유

- 웹 접근성(별칭: a11y)은 모두가 사용할 수 있도록 웹사이트를 디자인, 개발하는 것을 의미합니다.

- 보조과학기술(assistive technology)들이 웹페이지들을 해석할 수 있도록 접근성을 갖추는 것이 필요합니다.

- React는 접근성을 갖춘 웹사이트를 만들 수 있도록 모든 지원을 하고 있으며, 대부분은 표준 HTML 기술이 사용됩니다.

#### 시맨틱 HTML

- 시맨틱 HTML은 웹 애플리케이션에 있어 접근성의 기초입니다.

- 정보의 의미가 강조되는 HTML 엘리먼트를 웹 사이트에서 사용하면 자연스럽게 접근성이 갖추어지곤 합니다.

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
