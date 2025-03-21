# JavaScript 기초 개념 정리

## Variables와 Constants

### Variables

- "진짜" 변수로, 저장된 값이 실제로 변경될 수 있음
- `let` 키워드를 사용하여 선언
- 예:
  ```javascript
  let name = "Anna";
  name = "Max";
  ```

### Constants

- 값이 절대 변경되지 않는 "변수"
- `const` 키워드를 사용하여 선언
- 예:
  ```javascript
  const enteredValue = "Hi";
  ```

## Window와 Document 객체

### Window 객체

- 내장된 변수 및 함수를 포함하는 글로벌 객체
- 활성화된 브라우저 창/탭과 관련된 정보와 기능을 보유
- 예: 현재 location, alert()와 같은 utility functions

### Document 객체

- window.document 객체
- 로드된 웹사이트 콘텐츠와 관련된 정보와 기능을 보유
- 예: HTML 요소에 접근하기 위한 utility functions 제공

## DOM (Document Object Model)

### 정의

- 구문 분석된 HTML 코드의 데이터 표현("internal representation")
- 브라우저가 HTML 코드를 구문 분석하고 모든 요소를 JavaScript 객체로 저장
- JavaScript 코드는 DOM과 상호 작용하여 데이터를 추출하거나 조작할 수 있음

## HTML에서 DOM으로

### HTML 코드 (서버에서 브라우저로 전송)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    <h1>Hi there!</h1>
    <p>
      This is a
      <a href="...">link</a>
    </p>
  </body>
</html>
```

### DOM 객체 (translated data representation)

```javascript
{
  ...,
  body: {
    ...,
    children: [
      ...,
      {
        nodeName: 'P',
        children: [
          { nodeName: 'A' }
        ]
      },
    ]
  }
}
```

> 참고: 이는 매우 단순화된 표현이며, "document" 객체는 훨씬 더 많은 데이터를 포함함

## DOM Tree

DOM은 tree 구조로 표현됩니다:

- document (루트)
  - head
  - body
    - h1
    - p
      - a

## DOM Elements 선택하기

### "Drill Into Elements" 방식

```javascript
document.body.children[0].firstChild;
```

- DOM 구조를 알아야 함
- DOM 구조가 변경되면 코드도 변경해야 함

### Query Elements 방식

```javascript
document.getElementById("some-id");
document.querySelector(".some-class");
```

- CSS처럼 요소 선택이 작동함
- 정확한 DOM 구조 knowledge가 필요하지 않음

## Events

### 반응할 수 있는 Events 예시

- 사용자가 특정 element(예: 버튼)를 클릭
- 사용자가 input field에 텍스트 입력
- 사용자가 페이지의 특정 부분으로 스크롤

### Event Listener 추가하기

```javascript
someElement.addEventListener('<EVENT>', ...);
```

## 참고 자료

- AcadeMind JavaScript 강의
