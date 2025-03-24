# Node.js와 Express.js를 활용한 블로그 웹사이트 구현

## 데이터베이스 설계

### 데이터베이스 구조

프로젝트에서는 두 개의 주요 테이블을 사용합니다:

#### Posts 테이블

- `id`: INT (Primary Key)
- `title`: VARCHAR
- `summary`: VARCHAR
- `body`: TEXT
- `date`: DATETIME
- `author_id`: INT (Foreign Key)

#### Authors 테이블

- `id`: INT (Primary Key)
- `name`: VARCHAR
- `email`: VARCHAR

### 백엔드에서의 데이터베이스 연결

프론트엔드가 아닌 백엔드에서 데이터베이스에 연결하는 이유:

- 프론트엔드 JavaScript 코드는 브라우저 개발 도구를 통해 노출됨
- 데이터베이스 자격 증명이 노출될 수 있음
- 쿼리가 수정되거나 악의적으로 사용될 위험이 있음

## CRUD 작업 정리

### 1. Create (생성)

- `/new-post` 경로에서 새 게시물 작성 폼 제공
- `/posts` POST 요청으로 새 게시물 저장

### 2. Read (조회)

- `/posts` 경로에서 모든 게시물 목록 표시
- `/posts/:id` 경로에서 특정 게시물 상세 정보 표시

### 3. Update (수정)

- `/posts/:id/edit` 경로에서 게시물 수정 폼 제공
- `/posts/:id/edit` POST 요청으로 게시물 정보 업데이트

### 4. Delete (삭제)

- `/posts/:id/delete` POST 요청으로 게시물 삭제

## 동적 라우트 핸들링

Express.js의 라우트 매개변수(`:id`)를 사용하여 동적 라우팅을 구현:

```javascript
router.get("/posts/:id", async function (req, res) {
  const postId = req.params.id;
  // postId를 사용하여 데이터베이스 쿼리 실행
});
```

## 학습 내용 정리

1. **Node.js와 Express.js**

   - Express 라우팅 시스템 활용
   - 미들웨어 구성
   - 오류 처리

2. **MySQL 데이터베이스 연동**

   - mysql2/promise 모듈을 사용한 비동기 데이터베이스 연결
   - SQL 쿼리 작성 및 실행
   - 데이터베이스 풀 설정

3. **CRUD 작업 구현**
   - RESTful API 개념 적용
   - 동적 라우트 처리
   - 폼 데이터 처리

## 보안 고려사항

- 사용자 입력 데이터 검증
- 매개변수화된 쿼리를 사용하여 SQL 인젝션 방지
- 오류 처리 및 적절한 상태 코드 반환
