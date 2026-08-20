# cardsmith

디스코드에 올라오는 디시인사이드·인스타그램 링크를 임베드로 만들어주는 편의성 봇.

디스코드 자체 링크 미리보기가 두 사이트에서는 잘 동작하지 않아서, 채팅에 링크가
올라오면 봇이 직접 해당 게시물을 읽어와 제목/이미지/작성자 등을 담은 임베드로
다시 보여준다.

- **디시인사이드**: 갤러리 글 링크(PC/모바일) → 제목, 본문 요약, 이미지 임베드
- **인스타그램**: 게시물/릴스 링크 → 작성자, 캡션, 이미지·영상 썸네일 임베드

`src/`는 [bot-core](https://github.com/Engineer-bots/bot-core)에서 복사한 부트스트랩
코어(`config`/`logger`/`client`/`dispatch`/`module`/`events`/`presence`/`cache`)이며,
아직 봇 진입점과 링크 임베드 기능은 구현되지 않았다.

## 다음 작업

- `src/index.ts`를 core 위에서 실제 봇 부트스트랩(`loadConfig` → `createDiscordClient`
  → `dispatchCommand`)으로 채우기
- 디시인사이드·인스타그램 링크 임베드 기능 모듈 작성
