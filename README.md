# cardsmith

디스코드에 올라오는 디시인사이드·인스타그램 링크를 임베드로 만들어주는 편의성 봇.

디스코드 자체 링크 미리보기가 두 사이트에서는 잘 동작하지 않아서, 채팅에 링크가
올라오면 봇이 직접 해당 게시물을 읽어와 제목/이미지/작성자 등을 담은 임베드로
다시 보여준다.

- **디시인사이드**: 갤러리 글 링크(PC/모바일) → 제목, 본문 요약, 이미지 임베드
- **인스타그램**: 게시물/릴스 링크 → 작성자, 캡션, 이미지·영상 썸네일 임베드

`src/`는 [bot-core](https://github.com/Engineer-bots/bot-core)에서 복사한 부트스트랩
코어(`config`/`logger`/`client`/`dispatch`/`module`/`events`/`presence`/`cache`) 위에
`src/index.ts`가 실제 봇을 부트스트랩하고, `src/modules/dcEmbed.ts`·`src/modules/igEmbed.ts`가
링크 감지·임베드 변환을 담당한다.

DB 없이 메시지 단위로만 동작하며 미리보기 캐시도 URL 기준(서버 무관)이라, 별도 설정 없이
봇이 초대된 모든 서버에서 동시에 동작한다. `COMMAND_SCOPE=global`(기본값)로 실행하면 된다.

## 필요 권한

### Developer Portal

[Discord Developer Portal](https://discord.com/developers/applications) → 봇 애플리케이션 →
**Bot** 탭에서 **MESSAGE CONTENT INTENT**를 켜야 한다. 채팅 메시지 본문(링크 URL)을 읽어야
하는 privileged intent라 기본값(꺼짐)으로는 링크를 감지하지 못한다.

### 서버 초대 시 권한

봇 초대(OAuth2) 시 `bot` scope와 아래 채널 권한이 필요하다.

| 권한 | 용도 |
| --- | --- |
| View Channel (채널 보기) | 링크가 올라온 메시지를 확인 |
| Send Messages (메시지 보내기) | 임베드 전송 |
| Manage Messages (메시지 관리) | 임베드 전송 후 원본 링크 메시지 삭제 |
| Embed Links (링크 첨부) | 임베드 전송 |
| Attach Files (파일 첨부) | 미리보기 이미지를 첨부파일로 재업로드 |

권한 정수값은 `60416` (위 5개 권한 합). `DISCORD_CLIENT_ID`를 채워 아래 URL로 초대하면 된다.

```
https://discord.com/oauth2/authorize?client_id=<DISCORD_CLIENT_ID>&scope=bot&permissions=60416
```

Manage Messages 권한이 없으면 임베드는 정상 전송되지만 원본 링크 메시지는 삭제되지 않고
남는다(에러가 아니라 조용히 무시됨, `src/modules/dcEmbed.ts`·`igEmbed.ts`의 메시지 삭제
`catch` 블록 참고).

## 배포

`v*.*.*` 형식의 태그를 푸시하면 `.github/workflows/docker-publish.yml`이 실행되어
[Docker Hub(igor0670/cardsmith)](https://hub.docker.com/repository/docker/igor0670/cardsmith/tags)에
`<버전>`/`latest` 태그로 이미지를 배포하고, `docker-compose.yml`·`.env.example`을 첨부하고
`CHANGELOG.md`에서 해당 버전 항목을 추출해 릴리즈 노트로 담은 GitHub Release를 생성한다.
저장소 시크릿으로 `DOCKER_USERNAME`, `DOCKER_TOKEN`(Docker Hub Access Token)이 필요하다.

운영 서버에서 실행하려면 Release에서 두 파일을 받아:

```bash
cp .env.example .env   # 값 채우기
docker compose up -d   # Docker Hub에서 이미지를 받아 실행
```
