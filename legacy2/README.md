# F1 Portfolio (React + Vite + Framer Motion)

FPV 레이스 시작 화면에서 `START`를 누르면 카메라가 상승하며 탑뷰 트랙으로 전환되고,
스크롤이 트랙 진행으로 매핑되어 `Skills → Experience → Projects → Contact` 카드가 순차 등장하는 포트폴리오입니다.

## Tech Stack

- Vite + React + TypeScript
- Framer Motion
- GitHub Pages 배포

## Local Run

```bash
yarn install
yarn dev
```

## Build

```bash
yarn build
yarn preview
```

## GitHub Pages 설정

### 1) Vite base

`vite.config.ts`에서 기본 base는 `/portfolio/`로 설정되어 있습니다.
레포 이름이 다르면 아래처럼 빌드 시 환경변수로 덮어쓸 수 있습니다.

```bash
GITHUB_PAGES_BASE=/your-repo-name/ yarn build
```

### 2) Actions 배포 (권장)

워크플로: `/Users/jwamingyeong/STUDY/portfolio/.github/workflows/deploy.yml`

- `main` 브랜치 push 시 자동 빌드/배포
- GitHub 저장소 설정에서 `Pages > Build and deployment > Source`를 `GitHub Actions`로 설정

### 3) CLI 배포 스크립트 (대안)

```bash
yarn deploy
```

`package.json` 스크립트:
- `predeploy`: `yarn build`
- `deploy`: `npx gh-pages -d dist`

## Asset Notes

현재 사용 중인 핵심 에셋:
- `src/assets/fpv-start.png`
- `src/assets/top-track-straight.png` (탑뷰 repeat-y 타일)
- `src/assets/car-rear.png`
- `src/assets/car-top.png`

향후 corner/hairpin 타일 추가 시 `f1-layer-top`의 배경 시스템을 확장해 같은 방식으로 연결 가능합니다.
