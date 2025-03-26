# 웹 보안과 인증 가이드

## 목차

1. [보안과 인증의 차이](#보안과-인증의-차이)
2. [웹 보안 위협과 대응](#웹-보안-위협과-대응)
   - [CSRF 공격](#csrf-공격)
   - [XSS 공격](#xss-공격)
   - [SQL 인젝션](#sql-인젝션)
3. [인증(Authentication)](#인증authentication)
   - [비밀번호 해싱](#비밀번호-해싱)
   - [세션과 쿠키를 통한 인증 상태 관리](#세션과-쿠키를-통한-인증-상태-관리)
4. [인가(Authorization)](#인가authorization)
5. [모범 사례](#모범-사례)

## 보안과 인증의 차이

### 인증(Authentication)

- 웹사이트 방문자의 예상된 작업을 제어
- 로그인한 방문자에게 더 많은 권한 부여
- 예: 개인 프로필, 주문 내역, 관리자 페이지 등에 접근 가능

### 웹사이트 보안(Security)

- 방문자나 다른 사람의 예상치 못한(잠재적으로 악의적인) 작업 방지
- 데이터 노출 또는 코드나 특정 작업에 대한 원치 않는 접근 방지

## 웹 보안 위협과 대응

### CSRF 공격

#### CSRF(Cross-Site Request Forgery) 이해

CSRF는 사용자가 자신의 의지와는 무관하게 공격자가 의도한 행위를 웹사이트에 요청하게 하는 공격입니다.

![CSRF 공격 흐름도](https://example.com/csrf-attack.png)

1. 악의적인 사이트가 위조된 요청 생성
2. 사용자 세션(로그인 상태)을 이용하여 요청 전송
3. 웹사이트의 백엔드 코드가 요청을 처리하고 작업 실행

#### CSRF 공격 방어 방법

- 모든 요청에 CSRF 토큰 요구
- CSRF 토큰을 뷰(templates)에 주입
- 유효한 CSRF 토큰이 없는 요청은 차단

```javascript
// CSRF 토큰 생성 (서버 측)
const csrfToken = crypto.randomBytes(20).toString('hex');
req.session.csrfToken = csrfToken;

// 폼에 CSRF 토큰 포함 (뷰에서)
<form action="/submit" method="POST">
  <input type="hidden" name="_csrf" value="<%= csrfToken %>">
  <!-- 다른 필드들 -->
</form>

// 요청 검증 (서버 측)
if (req.body._csrf !== req.session.csrfToken) {
  return res.status(403).send('CSRF 토큰이 유효하지 않습니다');
}
```

### XSS 공격

#### XSS(Cross-Site Scripting) 이해

XSS는 악의적인 스크립트를 웹 페이지에 주입하여 사용자의 브라우저에서 실행되게 하는 공격입니다.

![XSS 공격 흐름도](https://example.com/xss-attack.png)

1. 클라이언트가 서버에서 가져온 데이터 표시
2. 데이터에 악의적인 브라우저 측 JS 코드 포함
3. 코드가 실행되어 사용자 정보 탈취 등의 위험 발생

#### XSS 공격 방어 방법

- 사용자 입력 데이터를 처리 및 저장 전에 살균(sanitize)
- 사용자가 제공한 원시 HTML 콘텐츠를 출력하거나 파싱하지 않음

```javascript
// 입력 살균 예시
const sanitizedInput = sanitizeHtml(req.body.comment);

// EJS 템플릿에서 자동 이스케이프 처리
<div><%= userComment %></div> // 안전: 자동으로 이스케이프 처리됨
<div><%- userComment %></div> // 위험: 원시 HTML로 렌더링됨
```

### SQL 인젝션

#### SQL 인젝션 이해

SQL 인젝션은 악의적인 SQL 코드를 웹 애플리케이션의 입력 필드에 삽입하여 데이터베이스를 조작하는 공격입니다.

![SQL 인젝션 흐름도](https://example.com/sql-injection.png)

1. 백엔드 코드가 SQL 쿼리에 사용자 제공 데이터를 포함
2. 악의적인 입력이 쿼리 구문을 변경할 수 있음

#### SQL 인젝션 방어 방법

- 처리 중인 사용자 입력을 이스케이프 처리
- 준비된 구문(Prepared Statements) 사용

```javascript
// 안전하지 않은 방법
const query = `SELECT * FROM users WHERE username = '${username}'`;

// 안전한 방법 (준비된 구문)
const query = `SELECT * FROM users WHERE username = ?`;
const [results] = await db.execute(query, [username]);
```

## 인증(Authentication)

### 인증이란?

인증은 특정 "영역"(페이지)가 인증된(로그인한) 사용자만 접근할 수 있도록 하는 과정입니다.

인증이 필요한 영역의 예:

- 소셜 네트워크 사이트의 개인 프로필
- 온라인 쇼핑몰의 장바구니와 주문 내역
- 블로그 웹사이트의 관리자 영역

인증 흐름:

1. 사용자 가입(이메일 + 비밀번호로 계정 생성)
2. 사용자 로그인(이메일 + 비밀번호 입력)
3. 사용자 인증(보호된 페이지에 대한 접근 권한 부여)

### 비밀번호 해싱

데이터 유출 시 보안 관련 데이터(예: 비밀번호)를 무용지물로 만들기 위해 해싱 처리해야 합니다.

#### 해싱이란?

해싱은 문자열(예: 비밀번호)을 디코딩할 수 없는 다른 문자열로 변환하는 과정입니다.

```
"myplaintextpassword" → [해싱 알고리즘] → "lakfjadsf6wafhfsfdkjfasl..."
```

중요한 특징: 안전하게 해싱된 값은 원래 값으로 되돌리거나, 디코딩하거나, 변환할 수 없습니다.

```javascript
// Node.js에서 bcrypt를 사용한 비밀번호 해싱 예시
const bcrypt = require("bcryptjs");

// 비밀번호 해싱
const hashedPassword = await bcrypt.hash(password, 12);

// 비밀번호 검증
const isValid = await bcrypt.compare(password, hashedPassword);
```

### 세션과 쿠키를 통한 인증 상태 관리

웹 서버(백엔드 코드)는 들어오는 모든 요청이 유사하게 보이므로, 사용자에게 접근 권한을 부여해야 하는지 알 수 없다.

"입장 티켓(토큰)"을 서버에 저장하고 방문자에게 제공.

#### 세션 기반 인증 흐름:

1. 사용자가 로그인 자격 증명 전송
2. 서버 측 코드가 자격 증명 검증
3. 고유 ID가 있는 세션 생성(예: 데이터베이스 문서/레코드)
4. 세션 ID가 포함된 쿠키를 응답/요청 헤더 데이터로 전송
5. 브라우저가 쿠키를 자동으로 저장
6. 제한된 페이지에 대한 요청에 쿠키 첨부

```javascript
// Express.js에서 세션 설정
const session = require("express-session");

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// 로그인 처리
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }

  // 세션에 사용자 정보 저장
  req.session.isAuthenticated = true;
  req.session.user = { id: user._id, email: user.email };

  res.redirect("/dashboard");
});

// 보호된 라우트 미들웨어
function isAuthenticated(req, res, next) {
  if (!req.session.isAuthenticated) {
    return res.redirect("/login");
  }
  next();
}

// 보호된 라우트 사용
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.session.user });
});
```

## 인가(Authorization)

### 인증(Authentication) vs 인가(Authorization)

#### 인증(Authentication)

- 자격 증명으로 가입 및 로그인
- 인증된(로그인한) 사용자는 제한된 리소스에 접근할 수 있음

#### 인가(Authorization)

- 인증된 사용자도 웹사이트의 모든 것에 접근할 수 없을 수 있음
- 예: 모든 인증된 사용자가 다른 사용자의 주문 내역에 접근할 수 없음

```javascript
// Express.js에서 사용자 역할 기반 인가 예시
function isAdmin(req, res, next) {
  if (!req.session.isAuthenticated || req.session.user.role !== "admin") {
    return res.status(403).send("Access denied");
  }
  next();
}

// 관리자 전용 라우트
app.get("/admin/users", isAuthenticated, isAdmin, async (req, res) => {
  const users = await User.find();
  res.render("admin/users", { users });
});
```

## 모범 사례

1. **정적으로 제공하는 폴더(및 그 내용)에 주의**

   - 정적으로 제공되는 모든 파일은 문제 없이 요청 및 조회 가능
   - CSS, 이미지, 브라우저 측 JS 파일은 정적으로 제공하지만 다른 것은 제공하지 않도록 함

2. **방문자에게 원시 오류 메시지 전송 방지**
   - 원시 오류 메시지는 노출하고 싶지 않은 정보(예: 코드 스니펫)를 포함할 가능성이 높음
   - 대신 사용자 정의 오류 처리 및 메시지 설정

### 핵심 보안 원칙

1. **사용자를 신뢰하지 말 것 - 특히 그들의 입력!**
2. **사용자 입력 데이터를 검열하거나 이스케이프 처리 후 출력**
3. **정말로 알고 있는 경우가 아니라면 원시 입력 데이터를 브라우저에 출력하지 말 것**
