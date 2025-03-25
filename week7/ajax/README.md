# JavaScript와 AJAX 기술 개요

## AJAX란 무엇인가?

AJAX(Asynchronous JavaScript And XML)는 JavaScript를 사용하여 웹 페이지를 새로고침하지 않고도 서버와 데이터를 교환할 수 있는 기술.

- "Asynchronous JavaScript And XML"의 약자
- JavaScript를 통한 HTTP 요청을 일반적으로 지칭함
- 브라우저에서 사용되는 두 가지 내장 기능:
  - XMLHttpRequest
  - fetch() API

## AJAX를 사용하는 이유

### 기존 HTTP 요청 방식 (AJAX 없이)

- URL 입력 (GET 요청)
- 링크 클릭 (GET 요청)
- 폼 제출 (GET 또는 POST 요청)
- 이러한 방식은 모두 **새로운 페이지**를 로드함

### AJAX를 사용한 HTTP 요청

- 브라우저 측 JavaScript를 통해 HTTP 요청 전송
- 브라우저 동작을 완전히 제어할 수 있음 (**새 페이지 로드 방지**)
- 같은 스크립트 코드에서 응답을 처리할 수 있음

## XMLHttpRequest

XMLHttpRequest는 JavaScript를 통해 HTTP 요청을 보내기 위한 객체.

- 브라우저 측 JavaScript에 내장된 객체
- 원래는 XML 데이터를 전송하기 위해 개발됨
- 사용이 다소 복잡함
- 일반적으로 axios와 같은 서드파티 라이브러리를 통해 간접적으로 사용됨

```javascript
// XMLHttpRequest 예제
const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/data", true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);
    console.log(response);
  }
};
xhr.send();
```

## XML에서 JSON으로

XML(Extensible Markup Language)은 데이터를 구조화하는 마크업 언어.

```xml
<post-comment>
  <title>This was great!</title>
  <comment-text>Thanks a lot – this was really helpful!</comment-text>
</post-comment>
```

XML 대신 JSON(JavaScript Object Notation)이 데이터 전송에 많이 사용.

```json
{
  "title": "This was great!",
  "commentText": "Thanks a lot – this was really helpful!"
}
```

JSON의 특징:

- JavaScript 객체와 유사한 형태
- 모든 키(속성 이름)는 큰따옴표로 묶음
- 모든 텍스트 값은 큰따옴표로 묶음
- 숫자, 불리언, 중첩 배열 및 객체도 지원함
- XML보다 간결하고 가독성이 높음

## fetch() API

fetch() API는 XMLHttpRequest의 현대적인 대안.

- 브라우저 측 JavaScript에 내장된 API
- Promise를 사용하는 현대적인 JavaScript 기능 활용
- 비교적 사용하기 간단함
- XMLHttpRequest나 axios 같은 라이브러리의 대안

```javascript
// fetch() API 예제
fetch("/api/data")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

## 다양한 HTTP 메서드

JavaScript를 사용한 HTTP 요청을 통해 더 많은 HTTP 메서드를 활용 가능능.

### 기본 브라우저 HTTP 메서드

- **GET**: 데이터 가져오기
  - URL 입력 (`method='GET'`)
  - 링크 클릭
  - `method="GET"`인 폼
- **POST**: 데이터 저장하기
  - `method="POST"`인 폼

### JavaScript/AJAX를 통해 사용 가능한 추가 메서드

- **PUT**: 데이터 대체/업데이트 (`method: 'PUT'`, Request Body 포함)
- **PATCH**: 데이터 부분 업데이트 (`method: 'PATCH'`, Request Body 포함)
- **DELETE**: 데이터 삭제 (`method: 'DELETE'`)

## 실제 AJAX 구현 예제

### fetch() API를 사용한 GET 요청

```javascript
fetch("https://api.example.com/data")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### fetch() API를 사용한 POST 요청

```javascript
fetch("https://api.example.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "New Post",
    content: "This is a new post.",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### async/await 구문을 사용한 현대적인 접근법

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();
```

## AJAX를 활용한 사용자 경험 개선 예시

- 페이지 새로고침 없이 댓글 제출
- 실시간 검색 결과 표시
- 무한 스크롤 구현
- 폼 데이터의 즉시 유효성 검사
- 실시간 알림 시스템

## 주의 사항 및 모범 사례

1. **오류 처리**: 응답 오류를 항상 처리하여 사용자에게 피드백 제공
2. **로딩 상태 표시**: 요청 중임을 사용자에게 시각적으로 표시
3. **크로스 오리진 이슈**: CORS(Cross-Origin Resource Sharing) 정책 이해 필요
4. **보안**: 데이터를 항상 검증하고 민감한 정보는 암호화
5. **접근성**: AJAX 기능이 스크린 리더와 같은 보조 기술 사용자에게도 작동하도록 보장

---
