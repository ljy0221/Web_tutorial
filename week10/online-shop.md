# 온라인 쇼핑몰 프로젝트 기획서

## 1. 프로젝트 개요

이 프로젝트는 Node.js, Express, MongoDB를 활용한 풀스택 온라인 쇼핑몰 웹 애플리케이션.
일반 고객과 관리자를 위한 기능을 구현하여 실제 온라인 상거래 플랫폼의 핵심 기능을 학습하고 구현하는 것을 목표.

### 기술 스택

**프론트엔드**

- HTML
- CSS
- JavaScript(클라이언트)

**백엔드**

- Node.js
- Express.js
- MongoDB

## 2. 주요 기능 및 페이지

### 고객 페이지

1. **회원가입(Signup)**

   - 새로운 사용자 계정 생성
   - 사용자 정보 입력 및 저장

2. **로그인(Login)**

   - 기존 사용자 인증
   - 세션 관리

3. **전체 상품 목록(All Products)**

   - 상품 카탈로그 표시
   - 필터링 및 정렬 기능

4. **상품 상세 페이지(Product Details)**

   - 개별 상품의 상세 정보 표시
   - 장바구니에 추가 기능

5. **장바구니(Shopping Cart)**

   - 선택한 상품 관리
   - 수량 변경 및 상품 제거
   - 총 금액 계산

6. **주문 내역(All Orders For Customer)**
   - 고객별 주문 이력 표시
   - 주문 상태 확인

### 관리자 페이지

1. **대시보드(Dashboard)**

   - 주요 통계 및 개요 표시
   - 매출, 주문, 상품 등 정보 요약

2. **전체 상품 관리(All Products)**

   - 등록된 모든 상품 목록
   - 상품 관리 기능

3. **새 상품 등록(New Product)**

   - 새로운 상품 정보 입력
   - 이미지 업로드

4. **상품 수정(Update Product)**

   - 기존 상품 정보 수정
   - 상품 가격, 재고 등 업데이트

5. **전체 주문 관리(All Orders)**
   - 모든 고객의 주문 이력
   - 주문 상태 변경 및 관리

## 3. 데이터 모델

### 사용자(User)

- 이메일(Email)
- 비밀번호(Password)
- 관리자 여부(isAdmin)
- 이름(Name)
- 주소(Address)

### 상품(Product)

- 상품명(Name)
- 요약(Summary)
- 가격(Price)
- 이미지(Image)
- 상세 설명(Description)

### 장바구니(Cart)

- 상품 목록(Items)
- 총 가격(Total Price)
- 상품 수량(Number of Items)

### 주문(Order)

- 사용자 정보(User Data)
- 상품/장바구니 정보(Products/Cart Data)
- 주문 날짜(Date)
- 주문 상태(Status)

## 4. API 엔드포인트

### 인증 관련

- `POST /auth/signup`: 회원가입
- `POST /auth/login`: 로그인
- `POST /auth/logout`: 로그아웃

### 상품 관련

- `GET /products`: 모든 상품 조회
- `GET /products/:id`: 특정 상품 상세 조회
- `POST /products`: 새 상품 등록 (관리자용)
- `PATCH /products/:id`: 상품 정보 수정 (관리자용)
- `DELETE /products/:id`: 상품 삭제 (관리자용)

### 장바구니 관련

- `GET /cart`: 현재 사용자의 장바구니 조회
- `POST /cart/items`: 장바구니에 상품 추가
- `PATCH /cart/items/:id`: 장바구니 상품 수량 변경
- `DELETE /cart/items/:id`: 장바구니에서 상품 제거

### 주문 관련

- `POST /orders`: 새 주문 생성
- `GET /orders`: 사용자의 주문 내역 조회
- `GET /orders/:id`: 특정 주문 상세 조회
- `GET /admin/orders`: 모든 주문 조회 (관리자용)
- `PATCH /admin/orders/:id`: 주문 상태 변경 (관리자용)

## 5. 프로젝트 구조

```
online-shop/
├── app.js                  # 애플리케이션 메인 파일
├── package.json            # 프로젝트 의존성 정보
├── config/                 # 설정 파일들
│   └── database.js         # 데이터베이스 연결 설정
├── controllers/            # 컨트롤러
│   ├── auth-controller.js
│   ├── cart-controller.js
│   ├── order-controller.js
│   ├── product-controller.js
│   └── admin-controller.js
├── models/                 # 데이터 모델
│   ├── user.js
│   ├── product.js
│   ├── cart.js
│   └── order.js
├── routes/                 # 라우트 정의
│   ├── auth-routes.js
│   ├── cart-routes.js
│   ├── order-routes.js
│   ├── product-routes.js
│   └── admin-routes.js
├── middleware/             # 미들웨어
│   ├── auth-middleware.js
│   └── error-handler.js
├── util/                   # 유틸리티 함수
│   ├── validation.js
│   └── session.js
├── views/                  # 템플릿 파일
│   ├── customer/
│   │   ├── products/
│   │   ├── cart/
│   │   └── orders/
│   ├── admin/
│   │   ├── products/
│   │   └── orders/
│   ├── auth/
│   └── shared/
└── public/                 # 정적 파일
    ├── css/
    ├── js/
    └── images/
```

---
