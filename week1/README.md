# HTML & CSS 학습 정리

이 저장소는 HTML과 CSS 학습 내용을 정리한 것임.

## 목차

1. [HTML 리스트](#1-html-리스트)
2. [CSS 기본 개념](#2-css-기본-개념)
3. [HTML 구조](#3-html-구조)
4. [Block vs Inline](#4-block-vs-inline)
5. [선택자 및 결합자](#5-선택자-및-결합자)
6. [CSS 반응형 디자인 기초](#6-css-반응형-디자인-기초)

## 1. HTML 리스트

리스트는 유사한 내용의 문단(`<p>`)들을 하나의 목록으로 묶어서 나타낼 때 사용.

- `<ol>` (ordered list): 순서가 필요한 리스트 (출력 시 1, 2, 3 순서로 출력)
- `<ul>` (unordered list): 순서가 중요하지 않은 리스트 (출력 시 bullet point(●)로 출력)
- `<li>` (list item): 정의된 리스트 안에 내용을 삽입할 때 사용

### 상속(Inheritance)

모든 항목의 자식 항목은 부모 항목의 기본 설정을 상속. 자식 항목의 설정을 따로 수정하지 않으면 부모 항목의 속성을 그대로 적용.

### CSS 적용 우선순위

동일 속성에 대한 다른 조건을 연속해서 작성하면 마지막에 작성된 코드가 적용.

```css
li {
  list-style: none; /* 이 코드는 무시되고 */
  list-style: square; /* 이 코드가 적용됨 */
}
```

가장 최신(가장 마지막에 작성된) 코드가 해당 속성의 최종 값이 됨.

## 2. CSS 기본 개념

### Cascading (계단식 적용)

하나의 요소에 다양한 규칙들이 적용될 수 있다

예) `<li>`에는 하나의 규칙만 작성하였지만, `<body>`, `<ul>`에서 먼저 정의되었던 규칙들이 동일하게 적용되는 경우

### Specificity (명시도)

가장 구체적인 선택자가 가장 강력한 규칙력을 가진다.

선택자 우선순위:

1. !important
2. 인라인 스타일 (style 속성)
3. ID 선택자 (#id)
4. 클래스 선택자 (.class), 속성 선택자, 가상 클래스
5. 요소 선택자 (태그), 가상 요소

### CSS Box Model

개발자 도구 > 요소 > 스타일에서 확인 가능.

![CSS Box Model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model/boxmodel.png)

- **Content**: 내용물 (텍스트, 이미지 등)
- **Padding**: Content와 Border 사이의 공간
- **Border**: Box의 경계
- **Margin**: Box와 외부 공간과의 거리

## 3. HTML 구조

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- 메타데이터, 타이틀, CSS 링크 등 -->
  </head>
  <body>
    <header>
      <!-- 페이지 헤더 (로고, 네비게이션 등) -->
    </header>
    <main>
      <!-- 페이지의 주요 내용 -->
    </main>
    <footer>
      <!-- 페이지 푸터 (저작권 정보, 연락처 등) -->
    </footer>
  </body>
</html>
```

[MDN의 HTML 문서 구조화 가이드](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)를 참조.

## 4. Block vs Inline

### Block 요소

- 전체 너비를 사용(매번 새로운 영역을 만들어서 사용)함
- 예: `<p>`, `<div>`, `<h1>~<h6>`, `<ul>`, `<ol>`, `<li>` 등
- 기본적으로 줄바꿈이 발생함
- width, height, margin, padding 속성이 모두 적용

### Inline 요소

- 필요한 너비만 사용(다른 요소들 사이에 삽입 가능)
- 예: `<a>`, `<button>`, `<img>`, `<span>` 등임
- 좌, 우 margin을 사용 (각 요소의 양 옆에 무언가 삽입될 가능성이 있음)
- 주의사항: 상, 하 padding을 사용 시 표현 범위에 오버로딩이 발생 가능
  - `display: block` 또는 `display: inline-block` 속성을 이용해 표현 방법을 조절 가능

### 마진 상쇄(Margin Collapse)

- 두 개 이상 블록 요소의 상하 마진이 겹칠 때 큰 값만 적용하는 규칙
- `display: inline-block` 속성 사용으로 해결 가능

## 5. 선택자 및 결합자

### 선택자(Selectors)

1. **타입 선택자(Type Selector)**: 요소 이름을 직접 사용

   ```css
   p {
     color: blue;
   }
   ```

2. **ID 선택자(ID Selector)**: # 기호와 ID 이름 사용

   ```css
   #header {
     background-color: black;
   }
   ```

3. **그룹 선택자(Group Selector)**: 여러 선택자를 쉼표로 구분

   ```css
   h1,
   h2,
   h3 {
     font-weight: bold;
   }
   ```

4. **클래스 선택자(Class Selector)**: . 기호와 클래스 이름 사용

   ```css
   .highlight {
     background-color: yellow;
   }
   ```

### 결합자(Combinators)

1. **자손 결합자(Descendant Combinator)**: 공백을 사용

   ```css
   li p {
     color: red;
   }
   ```

   li 요소의 자손인 모든 p 요소에 적용.

2. **자식 결합자(Child Combinator)**: > 기호 사용

   ```css
   h2 > p {
     font-style: italic;
   }
   ```

   h2 요소의 직접적인 자식인 p 요소에만 적용.

3. **인접 형제 결합자(Adjacent Sibling Combinator)**: + 기호 사용

   ```css
   h1 + p {
     font-weight: bold;
   }
   ```

   h1 요소 바로 다음에 오는 p 요소에만 적용.

4. **일반 형제 결합자(General Sibling Combinator)**: ~ 기호 사용

   ```css
   h1 ~ p {
     color: blue;
   }
   ```

   h1 요소 이후에 오는 모든 p 형제 요소에 적용.

## 6. CSS 반응형 디자인 기초

반응형 웹 디자인은 다양한 디바이스와 화면 크기에서 웹 페이지가 잘 작동하도록 하는 접근 방식.

### 미디어 쿼리 (Media Queries)

```css
/* 화면 너비가 최대 768px일 때 적용되는 스타일 */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
  .container {
    width: 100%;
  }
}
```

### 반응형 단위

- **상대적 단위**: em, rem, %, vw, vh
- **절대적 단위**: px, pt, cm, mm

출처: [MDN Web Docs - 반응형 디자인 기초](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

## 참고 자료

- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [W3Schools - HTML Tutorial](https://www.w3schools.com/html/)
- [W3Schools - CSS Tutorial](https://www.w3schools.com/css/)
- [CSS-Tricks - A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS-Tricks - A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
