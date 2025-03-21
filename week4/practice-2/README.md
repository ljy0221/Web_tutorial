# JavaScript Control Structures 정리

## Control Structures란?

- 특별한 JavaScript 문법/기능으로 코드 실행을 제어할 수 있게 해줌
- 코드가 실행되는 조건과 실행 빈도를 제어
- 두 가지 주요 유형: if-Statements와 Loops

## Boolean Values("Booleans")

- true와 false 두 가지 값만 가짐
- 예/아니오 질문에 유용함
- if-statements에서 주로 사용됨

## Comparison Operators & Logical Operators

### Comparison Operators (boolean 값 도출)

- 동등 연산자(==, ===): 값과 타입의 동등성 검사

  ```javascript
  2 == 2; // true
  "2" === 2; // false
  3 === 3; // true
  3 === 5; // false
  "h" == "s"; // false
  ```

- 비교 연산자(>, <, >=, <=): 크기 비교

  ```javascript
  5 > 3; // true
  5 < 3; // false
  "a" < "b"; // true
  "c" < "b"; // false
  4 <= 4; // true
  ```

- 부정 연산자(!, !=, !==): 값의 반대를 반환
  ```javascript
  !(4 < 4); // true
  5 !== 2; // true
  8 != 8; // false
  "4" !== 4; // true
  "4" != 4; // false
  ```

### Logical Operators (boolean 값 결합)

- AND(&&): 두 값이 모두 true일 때만 true 반환

  ```javascript
  5 == 5 && 3 < 4; // true
  5 == 5 && 6 < 4; // false
  ```

- OR(||): 두 값 중 하나라도 true면 true 반환
  ```javascript
  5 == 5 || 3 < 4; // true
  5 == 5 || 6 < 4; // true
  ```

## Loops (반복문)

### Arrays용 반복문

- for: n번 반복
  - Loop n number of times
- for...of: 배열의 모든 요소를 순회
  - 배열의 모든 요소를 반복하는 데 매우 유용
  - "You'll use this one a lot!"

### Objects용 반복문

- for...in: 객체의 모든 속성을 순회
  - 객체의 모든 속성을 반복하는 데 매우 유용
  - "You'll use this one a lot!"

### 조건부 반복문

- while: 특정 조건이 충족되는 동안 계속 반복
  - Loop as long as a certain condition is met

## 참고 자료

- AcadeMind JavaScript 강의
