# 아키텍처 패턴 가이드

## MVC 패턴

MVC(Model-View-Controller)는 애플리케이션을 세 가지 주요 구성 요소로 분리하는 소프트웨어 아키텍처 패턴입니다.

### Model (모델)

**역할:**

- 데이터와 데이터 저장소와 상호 작용하는 로직 포함
- 데이터베이스에 데이터를 저장하거나 데이터베이스에서 데이터를 가져오는 함수/메서드 정의
- 비즈니스 로직 및 데이터 유효성 검사 처리
- 데이터의 상태 및 변경 관리

**예시:**

```javascript
// user-model.js
const db = require("../data/database");

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  async save() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    const result = await db.getDb().collection("users").insertOne(userData);
    return result;
  }

  static async findByEmail(email) {
    return await db.getDb().collection("users").findOne({ email: email });
  }
}

module.exports = User;
```

### View (뷰)

**역할:**

- 사용자에게 데이터/콘텐츠를 표시하는 로직 포함
- 일반적으로 템플릿과 템플릿 내의 로직(예: EJS 태그)으로 구성
- 사용자 인터페이스 및 표현 담당
- 데이터를 시각적으로 렌더링

**예시:**

```html
<!-- user-profile.ejs -->
<div class="profile-container">
  <h1><%= user.username %>'s Profile</h1>
  <div class="profile-details">
    <p>Email: <%= user.email %></p>
    <% if (user.bio) { %>
    <p>Bio: <%= user.bio %></p>
    <% } else { %>
    <p>No bio provided.</p>
    <% } %>
  </div>
  <% if (isOwner) { %>
  <a href="/profile/edit" class="btn">Edit Profile</a>
  <% } %>
</div>
```

### Controller (컨트롤러)

**역할:**

- 모델과 뷰를 연결
- 일반적으로 라우트에 연결됨
- HTTP 요청 처리 및 응답 생성
- 모델에서 데이터를 가져와 뷰에 전달

**예시:**

```javascript
// user-controller.js
const User = require("../models/user-model");

async function getProfile(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).render("404");
    }

    const isOwner = req.session.user && req.session.user.id === userId;

    res.render("user-profile", {
      user: user,
      isOwner: isOwner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("500");
  }
}

module.exports = {
  getProfile,
};
```

### MVC 패턴의 이점

- **관심사 분리**: 각 구성 요소는 애플리케이션의 특정 측면만 처리
- **모듈성**: 코드가 더 모듈화되어 유지보수 및 확장이 용이
- **재사용성**: 컴포넌트를 다시 사용하기 쉬움
- **병렬 개발**: 개발자는 다른 구성 요소에 영향을 주지 않고 특정 구성 요소에서 작업 가능

MVC 패턴은 선택 사항이지만, 많은 프로젝트에서 널리 사용되는 패턴이며 많은 경우에 좋은 선택입니다.

## MVVM 패턴

MVVM(Model-View-ViewModel)은 MVC의 확장된 형태로, 특히 사용자 인터페이스 개발에 초점을 맞춘 아키텍처 패턴입니다.

### Model (모델)

MVC의 모델과 유사하게, 데이터와 비즈니스 로직을 관리합니다.

### View (뷰)

사용자에게 표시되는 UI 요소를 정의합니다. MVVM에서 뷰는 일반적으로 수동적이며, 뷰모델의 변경 사항을 반영합니다.

### ViewModel (뷰모델)

**역할:**

- 모델의 데이터를 뷰에 표시하기 위한 형식으로 변환
- 뷰의 상태와 동작을 관리
- 데이터 바인딩을 통해 뷰와 통신
- 뷰의 이벤트를 처리하고 모델을 업데이트

**예시:**

```javascript
// user-viewmodel.js
class UserViewModel {
  constructor(userModel) {
    this.userModel = userModel;
    this.username = userModel.username;
    this.email = userModel.email;
    this.formattedJoinDate = this._formatDate(userModel.joinDate);
    this.isAdmin = userModel.role === "admin";
  }

  _formatDate(date) {
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  async updateProfile(userData) {
    // 데이터 검증 및 처리
    this.userModel.username = userData.username;
    if (userData.bio) {
      this.userModel.bio = userData.bio;
    }

    await this.userModel.save();
    // 뷰모델 속성 업데이트
    this.username = this.userModel.username;
  }
}

module.exports = UserViewModel;
```

### MVVM 패턴의 이점

- **향상된 테스트 가능성**: 뷰모델은 뷰와 독립적으로 테스트 가능
- **데이터 바인딩**: 뷰와 뷰모델 간의 자동 데이터 동기화
- **상태 관리**: 뷰의 상태를 더 효과적으로 관리
- **UI 로직 분리**: 사용자 인터페이스 로직이 뷰모델에 포함되어 관심사 분리 강화

MVVM은 특히 Angular, Vue.js, React(Context 또는 Redux 사용) 등의 프레임워크에서 사용하기 적합합니다.

## MVP 패턴

MVP(Model-View-Presenter)는 MVC 패턴에서 파생된 아키텍처 패턴으로, 사용자 인터페이스와 비즈니스 로직을 더 명확하게 분리합니다.

### Model (모델)

MVC의 모델과 유사하게, 데이터와 비즈니스 로직을 관리합니다.

### View (뷰)

**역할:**

- 사용자 인터페이스 표시
- 사용자 입력 수신
- 모든 사용자 상호작용을 Presenter에 위임
- MVP에서 뷰는 완전히 수동적(passive)이며, 어떤 로직도 처리하지 않음

**예시:**

```javascript
// UserView.js (인터페이스 정의)
class IUserView {
  displayUserProfile(user) {}
  showError(message) {}
  showLoading(isLoading) {}
}

// UserProfileView.js (구현)
class UserProfileView extends IUserView {
  constructor(presenter) {
    super();
    this.presenter = presenter;
    this.presenter.setView(this);

    // DOM 요소 초기화
    this.userNameElement = document.getElementById("user-name");
    this.userEmailElement = document.getElementById("user-email");
    this.editButton = document.getElementById("edit-profile");

    // 이벤트 리스너 설정
    this.editButton.addEventListener("click", () => {
      this.presenter.onEditButtonClicked();
    });
  }

  displayUserProfile(user) {
    this.userNameElement.textContent = user.name;
    this.userEmailElement.textContent = user.email;
  }

  showError(message) {
    alert(message);
  }

  showLoading(isLoading) {
    // 로딩 표시기 구현
  }
}
```

### Presenter (프레젠터)

**역할:**

- 뷰와 모델 사이의 중재자 역할
- 뷰로부터 사용자 상호작용 이벤트를 받음
- 모델을 업데이트하고 적절한 데이터로 뷰를 갱신
- 뷰에 대한 참조를 가지고 있으며, 뷰의 메서드를 직접 호출

**예시:**

```javascript
// UserPresenter.js
class UserPresenter {
  constructor(userModel) {
    this.userModel = userModel;
    this.view = null;
  }

  setView(view) {
    this.view = view;
  }

  initialize() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      this.view.showLoading(true);
      const user = await this.userModel.getUserProfile();
      this.view.displayUserProfile(user);
    } catch (error) {
      this.view.showError("Failed to load user profile: " + error.message);
    } finally {
      this.view.showLoading(false);
    }
  }

  onEditButtonClicked() {
    // 프로필 편집 로직 처리
    // 모델 업데이트 후 뷰 갱신
  }
}
```

### MVP 패턴의 이점

- **뷰와 모델의 완전한 분리**: 프레젠터가 모든 로직을 처리하여 뷰와 모델 간의 의존성 제거
- **테스트 용이성**: 뷰를 모의 객체(mock)로 쉽게 대체하여 프레젠터 테스트 가능
- **뷰의 수동적 특성**: 뷰는 단순히 명령을 표시하고 사용자 입력을 전달하기만 함
- **코드의 명확한 분리**: 각 구성 요소의 책임이 명확하게 정의됨

## 아키텍처 패턴 비교: MVC vs MVVM vs MVP

### 주요 차이점

1. **데이터 흐름**:

   - MVC: 컨트롤러가 모델과 뷰 사이의 중개자 역할
   - MVVM: 뷰모델이 모델을 뷰에 바인딩하며, 뷰의 상태와 행동을 관리
   - MVP: 프레젠터가 뷰와 모델 사이의 모든 통신을 관리

2. **사용자 인터랙션**:

   - MVC: 사용자 입력은 주로 컨트롤러에 의해 처리
   - MVVM: 사용자 입력은 뷰에서 뷰모델로 바인딩됨
   - MVP: 사용자 입력은 뷰가 수신하고 프레젠터에 위임

3. **뷰와 로직의 결합도**:

   - MVC: 뷰가 모델에 직접 접근할 수 있음
   - MVVM: 뷰와 뷰모델은 데이터 바인딩으로 연결됨
   - MVP: 뷰는 프레젠터에 의존하며, 모델에 직접 접근하지 않음

4. **적합한 사용 사례**:
   - MVC: 서버 측 애플리케이션, 더 단순한 UI를 가진 웹 애플리케이션
   - MVVM: 복잡한 사용자 인터페이스, 반응형 웹 애플리케이션, SPA
   - MVP: 복잡한 UI 로직, 광범위한 단위 테스트가 필요한 애플리케이션

### 선택 기준

프로젝트의 요구 사항과 복잡성에 따라 패턴을 선택하는 것이 중요합니다:

- **MVC 선택 시기**:

  - 서버 측 렌더링을 주로 사용하는 경우
  - 상대적으로 간단한 UI 인터랙션
  - 전통적인 웹 애플리케이션 구조

- **MVVM 선택 시기**:
  - 풍부한 클라이언트 측 기능이 있는 경우
  - 복잡한 UI 상태 관리가 필요한 경우
  - 주로 SPA 또는 동적 웹 애플리케이션
- **MVP 선택 시기**:
  - 높은 테스트 커버리지가 필요한 경우
  - 뷰와 비즈니스 로직의 명확한 분리가 중요한 경우
  - 레거시 코드베이스의 점진적 리팩토링

## 실제 프로젝트에서의 구조화 예시

### MVC 패턴 기반 프로젝트 구조

```
my-app/
├── models/              # 데이터 모델 및 비즈니스 로직
│   ├── user-model.js
│   └── product-model.js
├── views/               # 템플릿 파일
│   ├── users/
│   │   ├── profile.ejs
│   │   └── login.ejs
│   └── products/
│       ├── list.ejs
│       └── details.ejs
├── controllers/         # 컨트롤러 로직
│   ├── user-controller.js
│   └── product-controller.js
├── routes/              # 라우트 정의
│   ├── user-routes.js
│   └── product-routes.js
├── public/              # 정적 파일
├── util/                # 유틸리티 함수
├── middlewares/         # 미들웨어
├── data/                # 데이터베이스 연결 등
├── app.js               # 메인 애플리케이션 파일
└── package.json
```

### MVVM 패턴 기반 프로젝트 구조 (클라이언트 측 프레임워크 사용)

```
my-app/
├── src/
│   ├── models/          # 데이터 모델
│   │   ├── user.js
│   │   └── product.js
│   ├── viewmodels/      # 뷰모델
│   │   ├── user-vm.js
│   │   └── product-vm.js
│   ├── views/           # UI 컴포넌트
│   │   ├── UserProfile.vue
│   │   └── ProductList.vue
│   ├── services/        # API 통신 등
│   ├── utils/           # 유틸리티 함수
│   └── main.js          # 애플리케이션 진입점
├── public/              # 정적 파일
└── package.json
```

### MVP 패턴 기반 프로젝트 구조

```
my-app/
├── models/              # 데이터 모델
│   ├── UserModel.js
│   └── ProductModel.js
├── views/               # 뷰 인터페이스 및 구현
│   ├── interfaces/
│   │   ├── IUserView.js
│   │   └── IProductView.js
│   └── implementations/
│       ├── UserView.js
│       └── ProductView.js
├── presenters/          # 프레젠터
│   ├── UserPresenter.js
│   └── ProductPresenter.js
├── services/            # API 서비스
├── utils/               # 유틸리티 함수
├── public/              # 정적 파일
├── app.js               # 메인 애플리케이션 파일
└── package.json
```
