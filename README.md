# Illustrated Wedding Invitation

분홍 리본·고양이·큐피드의 수채화 청첩장. React + TypeScript + Vite 프런트엔드와 작은 Node.js 날씨 서버로 구성되며 중국어 간체·영어·한국어를 지원합니다. 신랑 牛嘉汇, 신부 郭飞琪. 예식은 2026년 10월 23일 중국 현지 16:26이며, 식순도 반영했습니다. 예식장은 南京山囿里酒店, 주소는 南京市玄武区博爱路18号T80科技文化国际社区35栋입니다. 초대 문구와 교통 상세는 추가 수정할 수 있습니다.

## 실행

Node.js 22.12 이상, npm 사용. 검증 환경은 Node.js 24입니다.

```sh
npm ci
npm run dev
```

http://127.0.0.1:5173/ — 중국어 기본, `?lang=en`, `?lang=ko`로 언어 지정. 선택은 URL과 브라우저 저장소에 유지됩니다.

```sh
npm test
npm run build
npm start
```

`dist/`는 프런트엔드 빌드 결과물입니다. `npm start`는 이를 제공하고 `/api/weather`를 처리합니다. 날씨는 `.env.weather.local`의 서버 전용 인증정보를 사용합니다. 개발 서버 5173의 날씨 요청은 4173으로 프록시되므로 개발 시에도 `npm start`를 실행합니다. `npm run preview`는 정적 파일만 제공하므로 실제 날씨 조회에는 사용하지 않습니다. DB·로그인·갤러리·계좌·업로드는 없으며 외부 폰트, Google 지도, 분석 스크립트를 사용하지 않습니다.

## 실제 내용으로 교체

- `src/venue.json`: 예식장 공유 링크·중국어 원문 주소·지도 이미지·GCJ-02 좌표. 지도와 날씨 서버가 같은 위치 설정을 사용합니다.
- `src/invitation.ts`: 시작 ISO 날짜, 타임존, 식순 시간, 표지 경로, 배경 조각 경로, 모노그램. 날짜에 실제 오프셋(예: `+08:00`)을 명시합니다. 확정 후 `isDemo: false`로 변경하세요.
- `src/locales/index.ts`: 3개 언어 이름·초대 문구·장소·주소·교통·식순 설명. `romanNames`도 수정하고 주소의 예시 문구도 교체하세요.
- `public/images/pink/couple.jpg`: 새 분홍 커플 일러스트. 원본은 `docs/artwork/pink/couple-original.png`이며 교체 경로는 `invitation.hero`에 설정합니다.
- `src/style.css`: 색상·서체·여백. 시스템 폰트이므로 기기별 서체가 다를 수 있습니다.
- `index.html`: JS를 실행하지 않는 크롤러용 기본 제목·설명. 원하는 대표 언어로 수정하세요.

시간은 설정 날짜와 타임존에서 계산합니다. 식순 시간은 `schedule`도 함께 수정하세요. 달력과 카운트다운을 표시하며, 캘린더 추가 버튼은 제공하지 않습니다.

## 고덕지도

현재 실제 예식장 공유 링크 `https://surl.amap.com/dPgrKAeufB8`를 지도 열기 버튼에 사용합니다. API 키 없이 이동하며, 주소 복사는 중국어 원문 주소를 제공합니다. 기존 상하이 예시 좌표는 제거했습니다.

화면 안의 지도는 캡처 이미지를 넣는 방식으로 준비했습니다. `invitation.venue.mapImage`에 `/images/venue-map.jpg` 같은 로컬 이미지 경로를 지정하면 지도 이미지를 표시하고 클릭 시 같은 고덕 링크를 엽니다. 값이 비어 있으면 장소 안내 카드를 표시합니다.

고덕지도 모바일 공유 페이지에서 실제 호텔 위치와 T80 단지 지도를 확인해 캡처했습니다. `public/images/venue-map.jpg`를 표시하며 원본 캡처는 `docs/previews/amap-venue-source.png`에 있습니다. 고덕 로고와 출처 표시는 유지했습니다. 웹페이지 상세에서 표현하는 주소와 별도로, 청첩장 주소는 사용자가 제공한 건물 35동 주소를 사용합니다.

현재 페이지는 내장 인터랙티브 지도를 사용하지 않습니다. 기존 `src/lib/integrations.ts`의 AMap 로더와 `.env.example`의 AMap 설정은 향후 내장 지도가 필요할 때 사용할 수 있는 준비 코드입니다. 정적 지도 API로 이미지를 자동 생성하는 방식은 API 키가 필요하지만, 직접 준비한 캡처 이미지와 공유 링크에는 필요하지 않습니다.

[고덕 URI API](https://developer.amap.com/api/uri-api/gettingstarted)

## 공유

- 링크 복사: HTTPS/localhost 클립보드. 권한 거부 시 직접 선택할 수 있는 링크 입력창 제공.
- OS 공유: Web Share 지원 시 공유창, 미지원 시 링크 복사.
- 위챗: 앱 안의 우측 상단 `···` 메뉴로 친구/모멘트 공유 안내. 일반 브라우저에서 위챗 친구 선택창을 직접 여는 기능은 아닙니다.
- 카카오톡: `VITE_KAKAO_JS_KEY` 설정 후 SDK 카드 공유. 앱의 JavaScript SDK 도메인 및 제품 링크용 웹 도메인 등록 필요. 키 미설정·로드 실패 시 링크 안내. 실제 발송은 운영 도메인과 앱에서 별도 검증해야 합니다.

[카카오 공유 튜토리얼](https://developers.kakao.com/docs/ko/tutorial/js-share), [SDK 다운로드](https://developers.kakao.com/docs/ko/javascript/download)

위챗 **맞춤 공유 카드**는 포함하지 않았습니다. 공식 계정의 JS-SDK 권한·도메인 설정 확인과 서버의 `jsapi_ticket` 기반 URL 서명·토큰 캐시가 필요합니다. 계정 조건 확인 후 서버 기능으로 추가하세요. `appSecret`은 프론트엔드에 넣지 마세요. [WeChat 공식 JS-SDK 문서](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html) (검토 당시 문서 자동 접근 제한; 최신 계정 권한은 콘솔 확인 필요)

## 배포 및 중국 접근

Vercel: 저장소를 연결하면 `vercel.json`으로 빌드. 미리보기용으로 사용하기 쉽습니다. `VITE_SITE_URL`을 실제 도메인의 HTTPS origin으로 설정하면 절대 URL의 `og:url`과 `og:image`가 빌드 HTML에 추가됩니다. 공유 이미지 경로 변경은 `vite.config.ts`에도 반영하세요.

중국 하객을 위한 운영은 Alibaba Cloud/Tencent Cloud 등의 **홍콩 리전 HTTPS 서버 + 자체 도메인**을 우선 후보로 추천합니다. `dist/`와 `server/`, `scripts/`, `src/venue.json`을 함께 배포하고 Node.js 서버를 실행합니다. 정적 호스팅만 사용하는 경우에는 날씨 API를 별도 서버에서 제공해야 합니다. 현재 루트 도메인 기준 구성으로, 하위 경로는 Vite base와 이미지 경로 조정이 필요합니다.

Vercel은 중국 본토 노드가 없고 접속·성능을 보장하지 않습니다. 홍콩 호스팅도 중국 접속을 보장하지는 않습니다. 본토 서버·CDN을 이용하면 ICP备案 및 제공자의 관련 요건을 확인해야 합니다. 홍콩/해외 리전 ICP 적용은 실제 서버·CDN 노드 위치를 기준으로 확인하세요.

배포 후 China Mobile·China Unicom·China Telecom 및 위챗 iOS/Android에서 본문·이미지·고덕지도 이동·공유를 확인하세요. 현재 로컬 검증만 진행했으며 중국 현지 테스트, 실제 배포, 도메인 연결, 중국 현지 날씨 API 접속 검증은 하지 않았습니다. QWeather 인증정보는 사용자가 발급해 제공했으며 로컬 서버에서 연결했습니다.

[Vercel 중국 접속 안내](https://vercel.com/kb/guide/accessing-vercel-hosted-sites-from-mainland-china), [Alibaba Cloud ICP 안내](https://help.aliyun.com/en/icp-filing/basic-icp-service/support/for-the-record-process-faq)

## 배경 조각과 내용 길이

원본은 `docs/artwork/pink/reference-original.jpg`에 보존했습니다. 상단 고양이·전화기와 하단 사진은 원본에서 분리해 사용하며, 실제 인물 사진을 재생성하지 않았습니다.

- `public/images/pink/header.jpg`: 상단 장식. 독립된 `<img>`로 원래 비율 유지.
- `public/images/pink/middle-1.jpg` ~ `middle-3.jpg`: 본문 리본·종이 배경. `PaperBackground`가 짧은 이미지 조각을 순서대로 반복하며 본문 크기에 맞춰 위치를 계산합니다. `middle.jpg`는 이전 통합 이미지 참고용입니다.
- `public/images/pink/footer.jpg`: 하단 얼굴 사진·화분·파란 바닥. 푸터 끝의 독립 `<img>`로 비율 유지.

초대 문구·교통 안내 등이 길어지면 본문만 늘어나고 하단 장식은 자연스럽게 내려갑니다. 페이지 전체 높이에 맞춰 원본 이미지를 늘리는 구조가 아닙니다. 원본 절단 좌표와 이미지 규격은 `docs/artwork/pink/README.md`에 기록했습니다.

## QWeather 날씨

현재 실제 호텔 좌표로 현재 기온·날씨·풍속·자외선 지수와 7일 예보(최고·최저 기온, 낮/밤 중 높은 강수확률)를 조회합니다. 중국 지역 조회는 QWeather 공식 안내에 맞춰 GCJ-02 좌표를 사용합니다. 본문은 날씨 요청을 기다리지 않으며 실패 시 재시도 버튼을 표시합니다. 데이터 출처는 QWeather입니다. 예식일이 예보에 포함되면 해당 날짜를 강조하고, 그 전에는 조회 가능 시 자동 표시된다고 안내합니다.

`.env.weather.local`에 다음 서버 전용 변수를 설정하세요. 파일은 Git에서 제외되며 브라우저 번들에 포함하지 않습니다. 개발자 ID는 API KEY 인증에 사용하지 않습니다.

```env
QWEATHER_API_HOST=your-host.qweatherapi.com
QWEATHER_API_KEY=your-api-key
```

```sh
npm run build
npm start
```

`server/weather.mjs`는 언어별로 30분간 메모리 캐시하고 동일한 동시 요청을 묶습니다. 공급자 요청 실패 시 최근 24시간 이내 캐시가 있으면 지연 안내와 함께 사용합니다. 재시작이나 서버리스 콜드 스타트 뒤에는 캐시가 없어 다시 조회합니다. 실제 관측 시각 대신 서버 조회 시간을 UTC+8로 표시합니다. 30분간 페이지를 열어 두면 자동 재조회합니다.

Vercel은 `api/weather.js`에서 동일한 핸들러를 제공하며 프로젝트 환경변수에 위 두 값을 서버용으로 설정해야 합니다. `VITE_` 접두사를 붙이지 마세요. 중국 운영 호스트 선정과 실제 배포는 별도입니다.

[QWeather 현재 날씨](https://dev.qweather.com/en/docs/api/weather/weather-current/), [일별 예보](https://dev.qweather.com/en/docs/api/weather/weather-daily-forecast/), [좌표 기준](https://dev.qweather.com/en/docs/resource/glossary/)
