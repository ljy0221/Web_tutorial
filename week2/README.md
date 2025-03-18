# HTML & CSS 기초 요약

오늘 학습한 HTML과 CSS의 기본 개념을 요약함.

## 목차
1. [HTML 요약](#html-요약)
2. [CSS 요약](#css-요약) 
3. [실습 프로젝트 분석](#실습-프로젝트-분석)
4. [새롭게 배운 CSS 속성](#새롭게-배운-css-속성)

## HTML 요약

HTML(HyperText Markup Language)은 웹페이지의 콘텐츠, 구조 및 의미를 정의하는 데 사용함. 스타일링 목적으로는 사용하지 않음(이를 위해 CSS를 사용함).

### 주요 특징:
- HTML은 "요소"를 사용하여 콘텐츠를 설명(주석)함
- HTML 요소는 일반적으로 여는 태그, 콘텐츠, 닫는 태그로 구성됨
- 이미지와 같은 빈(void) 요소도 있음
- 속성을 사용하여 요소를 구성할 수 있음
- 사용 가능한 요소 목록은 많지만 시간이 지남에 따라 경험을 쌓게 됨

모든 HTML 요소에 대해 더 자세히 알아보려면 [MDN HTML 요소 참조](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)를 참조하세요.

## CSS 요약

CSS(Cascading Style Sheets)는 페이지 콘텐츠의 스타일을 지정하는 데 사용함.

### 주요 특징:
- 스타일은 속성-값 쌍을 통해 할당됨
- "style" 속성을 통해 스타일을 할당할 수 있음
- 코드 중복을 피하기 위해 일반적으로 전역 스타일("style" 요소 사용)을 대신 사용함
- 또는 "link"로 연결하는 외부 스타일시트 파일을 사용할 수 있음
- CSS 작업 시 "상속", "명시도", "박스 모델"과 같은 개념을 이해해야 함

모든 CSS 속성 및 값에 대해 더 자세히 알아보려면 [MDN CSS 속성 참조](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)를 참조하세요.

## 실습 프로젝트 분석

오늘의 실습 프로젝트는 HTML과 CSS 기초를 요약한 웹 페이지를 만드는 것이었음.

### 프로젝트 구조:
```
- HTML 기본 구조 설정
- Google Fonts 사용 (Roboto)
- 외부 CSS 파일 연결
- 헤더, 메인 콘텐츠, 푸터 구성
- HTML과 CSS 섹션으로 나누어 내용 정리
- 하이라이트된 주요 포인트 강조
```

### 중요 포인트:
- 시맨틱 태그 사용 (`<header>`, `<main>`, `<section>`, `<footer>`)
- 외부 폰트 서비스 연결 방법
- 외부 리소스 링크 (MDN 문서, PDF 다운로드)
- 클래스를 활용한 스타일 적용 (`.highlight`)
- 가상 클래스 사용 (`:hover`, `:active`)

## 새롭게 배운 CSS 속성

### 색상과 폰트 설정
- `font-family`: 구글 폰트 적용 (Roboto)
- 다양한 색상 표현법: HEX(#5831bf), RGB(rgb(250, 201, 39))

### 박스 모델 활용
- `border-radius`: 요소의 모서리를 둥글게 설정
- `padding`과 `margin`을 사용한 여백 조절
- `border-left`: 왼쪽 테두리만 설정하여 하이라이트 효과

### 레이아웃 기법
- `text-align: center`: 텍스트 중앙 정렬
- `margin: 32px auto`: 수평 중앙 정렬
- `width`: 고정 너비 설정

### 링크 스타일링
- `text-decoration: none`: 링크 밑줄 제거
- `:hover`, `:active` 가상 클래스로 상호작용 스타일

### 목록 스타일링
- `list-style-type: none`: 목록 기호 제거

### 특수 효과
- `.highlight` 클래스로 중요 내용 강조
- 투명 테두리에서 색상 있는 테두리로 전환

## 학습 정리

- HTML은 문서의 구조와 의미를 정의함
- CSS는 시각적 표현을 담당함
- 외부 리소스 활용이 웹 개발에서 중요함
- 선택자와 가상 클래스를 통한 다양한 스타일링 가능
- 일관된 색상 팔레트 사용이 디자인의 일관성에 중요함