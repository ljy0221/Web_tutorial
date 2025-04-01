# JavaScript 함수의 다양한 형태와 활용

## 함수 선언 방식

### 함수 선언식 (Function Declaration)

함수 선언식은 함수를 독립적인 문장으로 선언하는 방식입니다.

```javascript
function multiply(a, b) {
  return a * b;
}
```

**특징:**

- 호이스팅(Hoisting)되어 코드의 어느 위치에서든 사용 가능
- 함수가 정의되기 전에도 호출 가능

**게임 코드 예시:**

```javascript
function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  const monsterDamage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= monsterDamage;

  endRound();
}
```

### 함수 표현식 (Function Expression)

함수 표현식은 함수를 변수에 할당하는 방식입니다.

```javascript
const multiply = function (a, b) {
  return a * b;
};
```

**특징:**

- 변수 선언만 호이스팅되고 함수 할당은 호이스팅되지 않음
- 함수를 정의한 후에만 사용 가능
- 함수를 값으로 취급하여 변수에 저장

**게임 코드에서 적용 예시:**

```javascript
// 현재 코드:
function attackHandler() {
  attackMonster("ATTACK");
}

// 함수 표현식으로 변경:
const attackHandler = function () {
  attackMonster(MODE_ATTACK);
};
```

### 화살표 함수 (Arrow Function)

화살표 함수는 ES6에서 도입된 간결한 함수 표현 방식입니다.

```javascript
const multiply = (a, b) => a * b;
```

**특징:**

- 더 간결한 구문
- `this` 바인딩을 상속받음 (자신만의 `this`를 가지지 않음)
- 다양한 축약 형태 지원

**문법 형태:**

1. 매개변수가 없는 경우: `() => { ... }`
2. 매개변수가 하나인 경우: `arg => { ... }` (괄호 생략 가능)
3. 함수 본문이 표현식 하나인 경우: `(a, b) => a + b` (중괄호와 return 생략 가능)
4. 여러 표현식이 있는 경우: `(a, b) => { a *= 2; return a + b; }` (중괄호와 return 필요)

**게임 코드에서 적용 예시:**

```javascript
// 현재 코드:
function healHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - healValue) {
    alert("You can't heal to more than your max initial health.");
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

// 화살표 함수로 변경:
const healHandler = () => {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - healValue) {
    alert("You can't heal to more than your max initial health.");
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
};
```

## 특수 매개변수

### Rest 매개변수

Rest 매개변수는 함수에 전달된 여러 인수를 배열로 수집하는 기능입니다.

```javascript
function sum(...numbers) {
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  return total;
}

console.log(sum(1, 2, 3, 4)); // 10
```

**특징:**

- 함수 정의에서 `...` 구문을 사용
- 여러 인수를 하나의 배열로 변환
- 매개변수 목록의 마지막에 사용해야 함

**게임 코드에 적용 예시:**

```javascript
// 현재 로깅 함수:
function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry;
  // ... 기존 코드 ...
  battleLog.push(logEntry);
}

// Rest 매개변수를 사용한 개선:
function writeToLog(event, ...data) {
  let logEntry;
  const [value, monsterHealth, playerHealth] = data;

  // 기존 로직과 동일하게 이벤트 타입에 따라 로그 엔트리 생성
  if (event === LOG_EVENT_PLAYER_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: "MONSTER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  }
  // ... 나머지 조건문 ...

  battleLog.push(logEntry);
}
```

## 함수의 고급 활용

### 콜백 함수 (Callback Function)

콜백 함수는 다른 함수에 인수로 전달되는 함수입니다.

```javascript
function calculate(num1, num2, calcFn) {
  return calcFn(num1, num2);
}

function add(a, b) {
  return a + b;
}

console.log(calculate(5, 3, add)); // 8
```

**특징:**

- 비동기 작업에 많이 사용됨
- 이벤트 핸들러로도 자주 사용
- 함수를 값으로 전달

**게임 코드 예시:**

```javascript
// 이벤트 리스너에 콜백 함수로 전달
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
logBtn.addEventListener("click", printLogHandler);

// 함수를 직접 콜백으로 사용하는 대안적 방법:
attackBtn.addEventListener("click", function () {
  attackMonster(MODE_ATTACK);
});

// 또는 화살표 함수로:
attackBtn.addEventListener("click", () => attackMonster(MODE_ATTACK));
```

### bind() 메서드

`bind()` 메서드는 함수의 `this` 값과 일부 인수를 미리 설정하여 새로운 함수를 생성합니다.

```javascript
const person = {
  name: "Max",
  greet: function () {
    console.log(`Hello, I am ${this.name}`);
  },
};

const greetFunction = person.greet.bind(person);
greetFunction(); // "Hello, I am Max"
```

**특징:**

- 함수의 컨텍스트(`this`)를 지정
- 함수에 일부 인수를 미리 지정 가능
- 원본 함수를 변경하지 않고 새 함수 반환

**인수 미리 설정 예시:**

```javascript
function multiply(x, y) {
  return x * y;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10
```

**게임 코드에 적용 예시:**

```javascript
// 현재 코드:
function attackMonster(mode) {
  // ... 기존 코드 ...
}

// bind를 사용한 새로운 이벤트 핸들러 설정 방법:
attackBtn.addEventListener("click", attackMonster.bind(null, MODE_ATTACK));
strongAttackBtn.addEventListener(
  "click",
  attackMonster.bind(null, MODE_STRONG_ATTACK)
);
```
