# Changelog

## [26.1.1] - 2026-08-31

### Fixed
- 인스타그램 임베드: 로그인·연령 확인이 필요한 제한된 게시물(oEmbed API가 `geoblock_required` 반환)을 일시적 오류로 잘못 처리하던 버그 수정 (`src/modules/igEmbed.ts`)
  - 재시도해도 절대 풀리지 않는데 "잠시 후 다시 시도해주세요"라고 안내하던 문제
  - 이제 제한된 게시물임을 명확히 안내하고 원본 링크 메시지를 정리함

## [26.1.0] - 2026-08-20

### Added
- bot-core 기반 프로젝트 최초 생성.
- bot-core의 core 소스(`config`/`logger`/`client`/`dispatch`/`module`/`events`/`presence`/`cache`) 복사.
- 디시인사이드·인스타그램 링크 자동 임베드 변환 기능 추가 (`src/modules/dcEmbed.ts`, `igEmbed.ts`)
  - DB 없이 메시지 단위로 동작해 별도 설정 없이 여러 서버에서 동시 운영 가능
- `src/index.ts`에 실제 봇 부트스트랩(`loadConfig` → `createDiscordClient` → `dispatchCommand`) 구현
- Docker Hub 배포 및 GitHub Release 자동화 워크플로우 추가 (`Dockerfile`, `docker-compose.yml`, `.github/workflows/docker-publish.yml`)
- README에 필요 Discord 권한 및 배포 가이드 추가

### Fixed
- `loadConfig` 제네릭 시그니처가 default 값이 있는 스키마를 받아들이지 못하던 버그 수정
