# Node.js와 Express.js 학습 정리

## Node.js란?

### JavaScript Runtime

- 브라우저 외부에서 JavaScript 코드를 실행하기 위한 도구
- 어떤 컴퓨터에도 설치 가능하며 서버 측 JavaScript 코드를 작성하고 실행하는 데 사용

### Command Line 사용

- "Command Line"은 머신에서 명령을 실행할 수 있는 텍스트 기반 인터페이스
- 모든 운영 체제에 기본적으로 설치된 도구
  - macOS: Terminal
  - Windows: Command Prompt
  - Linux: Bash

## Express.js

### 개요

- Node.js 기반의 웹 애플리케이션 프레임워크
- 웹 서버 및 API 구축을 위한 간결하고 유연한 솔루션 제공
- 미들웨어 기반 아키텍처로 HTTP 요청 처리 파이프라인 구성

### 기본 설정

```javascript
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
```

## 정적 vs 동적 콘텐츠

### 정적 콘텐츠

- 변경되지 않는 파일(HTML, CSS, 이미지 등)
- Express에서 정적 파일 제공:

```javascript
app.use(express.static("public"));
```

### 동적 콘텐츠

- 요청 시 서버에서 생성되는 콘텐츠
- 템플릿 엔진(예: EJS, Pug)을 사용한 동적 HTML 생성

```javascript
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "홈페이지", message: "환영합니다!" });
});
```

## 라우팅

### 기본 라우팅

```javascript
// GET 요청 처리
app.get("/users", (req, res) => {
  res.send("사용자 목록");
});

// POST 요청 처리
app.post("/users", (req, res) => {
  res.send("사용자 생성 완료");
});
```

### 동적 라우트 핸들링

- URL 파라미터를 사용한 동적 경로 처리

```javascript
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`사용자 ID: ${userId} 정보`);
});

// 여러 파라미터 처리
app.get("/products/:category/:productId", (req, res) => {
  const { category, productId } = req.params;
  res.send(`카테고리: ${category}, 제품 ID: ${productId}`);
});
```

### 쿼리 파라미터 처리

```javascript
app.get("/search", (req, res) => {
  const query = req.query.q;
  const page = req.query.page || 1;
  res.send(`검색어: ${query}, 페이지: ${page}`);
});
```

## HTTP 상태 코드

웹 서버는 표준화된 상태 코드를 통해 요청과 응답의 상태를 전달합니다:

- **200**: 성공! 요청이 성공적으로 처리되고 응답 생성
- **404**: 클라이언트 오류! 요청한 리소스/URL을 찾을 수 없음
- **401**: 클라이언트 오류! 요청 클라이언트(사용자)가 인증되지 않음
- **500**: 서버 오류! 요청은 유효했지만 서버에서 문제 발생

```javascript
// 성공 응답
app.get("/success", (req, res) => {
  res.status(200).send("성공적으로 처리되었습니다.");
});

// 오류 처리
app.get("/items/:id", (req, res) => {
  const item = findItem(req.params.id);
  if (!item) {
    return res.status(404).send("아이템을 찾을 수 없습니다.");
  }
  res.status(200).json(item);
});
```

## 미들웨어

Express의 핵심 개념으로, 요청 처리 파이프라인의 기능을 제공합니다:

```javascript
// 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // 다음 미들웨어로 전달
});

// JSON 파싱 미들웨어
app.use(express.json());

// URL 인코딩된 본문 파싱
app.use(express.urlencoded({ extended: true }));

// 특정 경로에만 미들웨어 적용
app.use("/api", apiAuthMiddleware);
```

## 오류 처리

Express에서 오류를 효과적으로 처리하는 방법:

```javascript
// 동기식 오류 처리
app.get("/items/:id", (req, res) => {
  try {
    const item = getItemOrThrow(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(404).json({ error: "아이템을 찾을 수 없습니다." });
  }
});

// 비동기식 오류 처리
app.get("/async-data", async (req, res, next) => {
  try {
    const data = await fetchDataAsync();
    res.json(data);
  } catch (error) {
    next(error); // 오류 처리 미들웨어로 전달
  }
});

// 오류 처리 미들웨어 (모든 라우트 정의 후에 설정)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("서버에 문제가 발생했습니다.");
});
```

## MVC 패턴 구현

Express에서 MVC(Model-View-Controller) 패턴을 구현하는 방법:

```
project/
├── models/          # 데이터 모델 (데이터베이스 작업)
├── views/           # 템플릿 (EJS, Pug 등)
├── controllers/     # 비즈니스 로직
├── routes/          # 라우트 정의
├── public/          # 정적 파일
├── middleware/      # 커스텀 미들웨어
├── app.js           # 메인 애플리케이션 파일
└── package.json
```

## 참고 자료

- Node.js 공식 문서: https://nodejs.org/
- Express.js 공식 문서: https://expressjs.com/
- AcadeMind Node.js 강의

---

작성일: 2025-03-21
