# MyKcaLog

###

하루 먹은 음식을 대략적으로 선택 후 열량 계산 및 통계를 확인할 수 있는 서비스

### 사용한 기술 스택

```
1. react
2. docker
3. nest
4. redis
```

### 메인기능

1. 기록된 하루 단위의 열량 계산과 통계
2. 하루 , 일주일, 한달, 1년 평균통계를 기록 및 차트로 확인
3. 게시글로 정보 공유
4. 관리자 페이지(음식 및 열량 추가,수정,삭제)

```
* 로그인 하지 않았을 시, 모든 url 접속을 제한하고 로그인화면으로 redirect
* 로그인 구현은 JWT 토큰으로 구현
* 토큰은 HttpOnly Cookie 저장
* 반응형으로 구현하지 않아, 웹으로만 정상적인 화면을 유지
```

## 프로젝트 구성

### 1. 로그인 화면

<p align="left">
<img src="https://user-images.githubusercontent.com/68360133/206944898-6e59e623-e369-4ab0-8c6c-880ed9c952a7.gif" width="800px">
</p>
- 로그인 api를 요청하여 로그인처리

### 2. 회원가입 화면

<p align="left">
<img src="https://user-images.githubusercontent.com/68360133/206948043-d5214098-df6a-4f6b-87a6-75bbf51c9766.gif" width="800px">
</p>
- 회원가입 api를 요청하여 회원가입처리<br>
- 입력폼 데이터 유효성 확인<br>
- 모든 유효성 검증이 완료될 때 까지 회원가입 버튼 비활성화 처리

### 3. 메인화면

1. 오늘의 열량 저장
<p align="left">
<img src="https://user-images.githubusercontent.com/68360133/206948626-5f0f1f2a-54cf-48f0-827e-96d6883fb68a.gif" width="800px">
</p>

2. 기간별 열량 그래프 <br>
<p align="left">
<img src="https://user-images.githubusercontent.com/68360133/207023037-5b4ac653-02ea-46a6-b888-a02e275bae47.gif" width="800px">
</p>

- 현재 날짜(백엔드 서버 TimeZone)를 기준으로 선택된 값(일주일, 한달, 3달, 6달, 1년)만큼의 데이터를 가져와 그래프로 표시
  <br>

3. 기간별 섭취 음식 분류 그래프<br>
<p align="left">
<img src="https://user-images.githubusercontent.com/68360133/207038317-85645c29-bbb7-47f2-aa19-dba66f5dd3fe.png" width="800px">
</p>
4. 특정 날짜 열량 및 섭취 음식 조회[미완성 및 진행중]<br>

### 4. 게시판

<p align="left">
<img src="https://user-images.githubusercontent.com/68360133/207846125-171661ad-2974-4422-8b2c-a2e8e847e424.gif" width="800px">
</p>
- 게시판 리스트 조회<br>
- 게시판 상세 조회<br>
- 게시판 수정<br>
- 게시판 삭제<br>
- 게시판 검색 [미완성 및 진행중]
<br>
```
게시판 검색은 elastic search 사용 유무를 결정하기 위해 보류
```

### 5. 마이페이지

- 닉네임 변경 <br>
<p align="left">
<img src="https://user-images.githubusercontent.com/68360133/207846510-32b20407-54e4-49b5-9d9f-e380aa72eb63.gif" width="800px">
</p>
- 패스워드 변경(이메일 인증)<br>
<p align="left">
<img src="https://user-images.githubusercontent.com/68360133/207846710-25ae3af7-d868-4f7e-8319-cc86782b5645.gif" width="800px">
</p>
- 회원탈퇴 <br>
<p align="left">
<img src="https://user-images.githubusercontent.com/68360133/207846843-ae473105-53fe-4fd2-98cc-046af75fa0bb.gif" width="800px">
</p>
- 나의 전체 평균 칼로리 [미완성 및 진행중]
