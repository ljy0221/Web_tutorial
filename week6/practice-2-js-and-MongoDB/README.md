# Node.js와 MongoDB를 활용한 블로그 애플리케이션

## SQL vs NoSQL: 데이터 모델링 비교

### SQL 기반 데이터베이스

- 엄격한 스키마와 데이터 구조 정의
- 테이블, 열, 행으로 구성
- 정규화를 통한 데이터 중복 최소화
- 여러 테이블 간의 관계 정의 (외래 키)
- JOIN 연산을 통한 데이터 조합

SQL 블로그 구조 예시:

```
posts 테이블: id, title, summary, body, date, author_id
authors 테이블: id, name, email
```

### NoSQL 기반 데이터베이스 (MongoDB)

- 유연한 스키마 (Schema-less)
- 컬렉션과 문서 형태로 데이터 저장
- 문서 내에 관련 데이터 내장 가능 (임베딩)
- 자바스크립트 객체와 유사한 BSON 형식 사용
- 자주 조회되는 데이터는 함께 저장하는 것이 효율적

MongoDB 블로그 구조 예시:

```javascript
// posts 컬렉션
{
  _id: ObjectId,
  title: String,
  summary: String,
  body: String,
  date: Date,
  author: {
    id: ObjectId,
    name: String,
    email: String
  }
}

// authors 컬렉션
{
  _id: ObjectId,
  name: String,
  email: String
}
```

## SQL과 NoSQL 구현 비교

### 1. 데이터 모델링 차이점

**SQL (MySQL) 버전:**

- 별도의 테이블(posts, authors)로 분리
- JOIN 쿼리를 통해 데이터 조합
- 외래 키로 관계 설정 (posts.author_id -> authors.id)

```sql
-- 게시물과 작성자 데이터 조회 예시
SELECT posts.*, authors.name as author_name
FROM posts INNER JOIN authors
ON posts.author_id = authors.id
```

**NoSQL (MongoDB) 버전:**

- 문서 내 중첩 객체로 관련 데이터 저장 (posts 컬렉션 내 author 객체)
- JOIN 없이 단일 쿼리로 관련 데이터 조회 가능
- 유연한 스키마로 필드 추가/변경 용이

```javascript
// 게시물과 작성자 데이터가 이미 함께 저장되어 있음
db.getDb().collection("posts").find({}).toArray();
```

### 2. 데이터 조작 방식 비교

**SQL (MySQL) 버전:**

- SQL 쿼리 언어 사용
- 트랜잭션 지원
- 스키마 변경을 위한 마이그레이션 필요

```javascript
// 게시물 추가 예시 (MySQL)
await db.query(
  "INSERT INTO posts (title, summary, body, author_id) VALUES (?)",
  [data]
);
```

**NoSQL (MongoDB) 버전:**

- JavaScript 객체 형태의 쿼리
- 다양한 쿼리 연산자($set, $push 등)
- 스키마 변경이 자유로움

```javascript
// 게시물 추가 예시 (MongoDB)
await db.getDb().collection("posts").insertOne(newPost);
```

### 3. 성능 특성 비교

**SQL (MySQL):**

- 복잡한 JOIN 쿼리에 최적화
- 데이터 일관성 및 무결성 보장
- 정규화로 인한 다중 쿼리 필요

**NoSQL (MongoDB):**

- 대용량, 빠른 읽기/쓰기 작업 최적화
- 수평적 확장 용이
- 자주 접근하는 데이터를 함께 저장하여 단일 쿼리 성능 향상

## MongoDB의 특징과 장점

1. **유연한 스키마**: 필드 추가/제거가 자유로움
2. **문서 지향**: 데이터를 JSON과 유사한 BSON 형식으로 저장
3. **내장 문서(Embedded Documents)**: 관련 데이터를 단일 문서에 저장 가능
4. **쿼리 성능**: 자주 함께 사용되는 데이터는 함께 저장하여 조회 성능 향상
5. **확장성**: 수평적 확장(샤딩)이 용이함

## 학습 내용 정리

1. **NoSQL 데이터베이스 개념**

   - 스키마리스(Schema-less) 데이터 모델
   - 컬렉션과 문서 구조
   - 내장 문서와 참조 방식

2. **MongoDB와 Node.js 연동**

   - MongoDB Native Driver 사용
   - 비동기 쿼리 처리
   - CRUD 작업 구현

3. **효율적인 데이터 모델링**

   - 쿼리 패턴에 맞춘 설계
   - 내장 vs 참조 결정
   - ObjectId 활용

4. **SQL과 NoSQL 비교**
   - 각 시스템에 적합한 사용 사례
   - 데이터 모델링 접근법 차이
   - 쿼리 패턴과 성능 특성
