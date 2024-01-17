# dreamhack-cli
> dreamhack-cli는 드림핵 문제 풀이 환경을 더 쉽고 간편하게 설정하는 툴입니다.

### 해결해야할 점 (To-do)

- [ ] 문제 이름에 특수문자가 들어갈 경우 docker 컨테이너 이름이 안됨
    - 그냥 특수문자 없애면 됩니다
- [ ] docker 생성하기 위한 DockerFile의 경로가 어디인지 정확히 알 수가 없어요. 보통 `/` 바로 폴더 최상위에 있지만, 상당수의 문제들이 다른 폴더 경로에 위치함. 또한 `Santa's_workshop_Buffed` 같은 문제는 `/db/` 에도 있고, `/server` 에도 있음
    - 모든 파일을 확인하면서 DockerFile 파일을 찾을 수 있음
- [ ] 이 문제가 docker가 있는지, 어느 포트를 사용하는지, 사용하는 url이 여러개인지 모름
    - docker 파일 있는지 ⇒ DockerFile 파일 찾기
    - 어느 포트를 사용하는지 ⇒ DockerFile 파일 찾기, index.js, app.js 등 파일 확인하기
        - 또는 docker의 모든 포트를 열어놓기!!!
- [ ] docker build를 할 때 오류남 `ex) Dreamhack Image v1`
    - cmd에서 실행해도 오류나니 딱히 `dreamhack-cli`가 문제가 아님