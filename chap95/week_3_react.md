# 3주차

# Reconciliation 알고리즘

2가지 가정을 기반한다.

1. 서로 다른 타입의 두 엘리먼트는 서도 다른 트리를 랜더한다.
2. 개발자가 `key` props을 통해, 여러 랜더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시한다.

### 엘리먼트의 타입이 다른 경우

```jsx
<div>
  <Counter />
</div>
// --------
<span>
  <Counter />
</span>
```

위 두가지 요소를 비교한다고 가정을 했을 때,
`<Counter />` 컴포넌트는 동일하지만 부모 태그의 타입이 다르기 때문에 `<Counter />` 는 사라지고 다시 랜더링 된다.

### DOM 엘리먼트 타입이 같은 경우

```jsx
<div className="before" title="stuff" />
// ------
<div className="after" title="stuff" />
```

위 2개의 엘리먼트를 비교하면 React 는 현재 DOM 노드 상에서 `classNaem` 만 수정한다.

```jsx
<div style={{color: 'red', fontWeight: 'bold'}} />
// ------
<div style={{color: 'green', fontWeight: 'bold'}} />
```

위와 같은 경우에는 `style` 전체를 변경하지 않고 `color` 속성만 수정한다.
