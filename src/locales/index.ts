export type Language = "zh" | "en" | "ko";
export interface Copy {
  title: string;
  subtitle: string;
  names: [string, string];
  romanNames: [string, string];
  invitation: string[];
  welcome: string;
  couple: string;
  roles: [string, string];
  coupleNote: string;
  dateTitle: string;
  countdown: string;
  units: string[];
  scheduleTitle: string;
  scheduleIntro: string;
  events: { title: string; note: string }[];
  venueTitle: string;
  weddingPart: string;
  weddingEyebrow: string;
  venueLabel: string;
  venueName: string;
  address: string;
  demo: string;
  map: string;
  loadMap: string;
  copyAddress: string;
  copyPhone: string;
  transport: { title: string; note: string }[];
  shareTitle: string;
  shareNote: string;
  shareHelp: string;
  wechat: string;
  kakao: string;
  copyLink: string;
  systemShare: string;
  footer: string;
  copied: string;
  failed: string;
  close: string;
  wechatGuide: string;
  kakaoGuide: string;
  mapGuide: string;
  loading: string;
  imageLoading: string;
  imageFailed: string;
  retry: string;
  manualCopy: string;
  weekdays: string[];
  nav: string[];
  countdownEnd: string;
}
export const locales: Record<Language, Copy> = {
  zh: {
    title: "我们结婚啦",
    subtitle: "与你相遇，与爱同行",
    names: ["牛嘉汇", "郭飞琪"],
    romanNames: ["NIU JIAHUI", "GUO FEIQI"],
    invitation: [
      "亲爱的家人和朋友们：",
      "谢谢你们跨越距离，来见证我们的重要时刻。",
      "愿这趟南京之行，\n有婚礼的热闹，也有自在相聚的美好。",
      "请收下这份邀请，我们在南京等你赴约！",
    ],
    welcome: "来南京，参加我们的婚礼",
    couple: "故事里的我们",
    roles: ["新郎", "新娘"],
    coupleNote: "一生很长，想和你慢慢走。",
    dateTitle: "良辰已定 · 喜待君来",
    countdown: "距离我们的好日子",
    units: ["天", "时", "分", "秒"],
    scheduleTitle: "婚礼日程",
    scheduleIntro: "与你一起，留下这一天的美好回忆。",
    events: [
      { title: "新人迎宾", note: "欢迎你的到来，与我们合影留念" },
      { title: "婚礼仪式", note: "许下誓言，共赴未来" },
      { title: "婚宴", note: "美食相伴，共享喜悦" },
      { title: "After party~", note: "让音乐与欢笑延续这个美好的夜晚" },
    ],
    venueTitle: "婚礼地点",
    weddingPart: "PART 1｜婚礼时刻",
    weddingEyebrow: "Wedding Day",
    venueLabel: "婚礼地点：南京·山囿里",
    venueName: "南京山囿里酒店",
    address: "南京市玄武区博爱路18号T80科技文化国际社区35栋",
    demo: "预览示例 · 场地及坐标待确认",
    map: "在高德地图中打开",
    loadMap: "查看互动地图",
    copyAddress: "复制地址",
    copyPhone: "复制电话号码",
    transport: [
      {
        title: "当天联络人：曹梦露",
        note: "联系电话：",
      },
    ],
    shareTitle: "分享我们的喜悦",
    shareNote: "把这份邀请，送给我们珍惜的人。",
    shareHelp: "复制链接，通过微信分享给亲朋好友。",
    wechat: "微信",
    kakao: "KakaoTalk",
    copyLink: "复制链接",
    systemShare: "更多分享",
    footer: "期待与你相见",
    copied: "已复制",
    failed: "暂时无法完成，请复制下方链接。",
    close: "关闭",
    wechatGuide:
      "在微信中打开本页，点击右上角「···」，选择发送给朋友或分享到朋友圈。也可以复制链接后发送。",
    kakaoGuide: "暂时无法通过 KakaoTalk 分享，请复制链接发送给朋友。",
    mapGuide: "地图暂时无法显示，请点击链接在高德地图中查看婚礼地点。",
    loading: "加载中…",
    imageLoading: "地图图片加载中…",
    imageFailed: "地图图片暂时无法显示，可点击下方按钮打开高德地图。",
    retry: "重新加载图片",
    manualCopy: "长按或选中以下内容复制",
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    nav: ["邀请", "日程", "地点"],
    countdownEnd: "今天以后，也一起走下去。",
  },
  en: {
    title: "We’re getting married",
    subtitle: "Two hearts, a brighter tomorrow",
    names: ["Niu Jiahui", "Guo Feiqi"],
    romanNames: ["NIU JIAHUI", "GUO FEIQI"],
    invitation: [
      "Dear family and friends,",
      "Thank you for travelling to celebrate this important moment with us.",
      "We hope your time in Nanjing brings both the joy of our wedding and lovely moments together.",
      "Please accept our invitation. We can’t wait to welcome you to Nanjing!",
    ],
    welcome: "Join us in Nanjing",
    couple: "The two of us",
    roles: ["THE GROOM", "THE BRIDE"],
    coupleNote: "A lifetime of little moments, together.",
    dateTitle: "A day to remember",
    countdown: "Counting down to our day",
    units: ["DAYS", "HRS", "MIN", "SEC"],
    scheduleTitle: "Our wedding day",
    scheduleIntro: "A day of moments to share with you.",
    events: [
      {
        title: "Welcome & photos",
        note: "Join the bride and groom for photos",
      },
      { title: "Wedding ceremony", note: "Our promises and a new beginning" },
      { title: "Wedding dinner", note: "Good food and warm company" },
      { title: "After party~", note: "More music, laughter and celebration" },
    ],
    venueTitle: "Wedding venue",
    weddingPart: "PART 1｜Wedding Day",
    weddingEyebrow: "Celebrate with us",
    venueLabel: "Wedding venue: Shanyouli, Nanjing",
    venueName: "南京山囿里酒店",
    address:
      "Building 35, T80 Science & Culture International Community, 18 Bo’ai Road, Xuanwu District, Nanjing",
    demo: "DEMO · Venue and coordinates to be confirmed",
    map: "Open in AMap",
    loadMap: "View interactive map",
    copyAddress: "Copy address",
    copyPhone: "Copy phone number",
    transport: [
      {
        title: "Wedding day contact: 曹梦露",
        note: "Phone: ",
      },
    ],
    shareTitle: "Share our joy",
    shareNote: "Share this invitation with our loved ones.",
    shareHelp: "Copy the link and send it through WeChat or KakaoTalk.",
    wechat: "WeChat",
    kakao: "KakaoTalk",
    copyLink: "Copy link",
    systemShare: "More ways to share",
    footer: "We can’t wait to see you",
    copied: "Copied",
    failed: "Unable to complete. Please copy the link below.",
    close: "Close",
    wechatGuide:
      "Open this page in WeChat, tap “···” at the top right, and choose Share with friends or Moments. You can also copy and send the link.",
    kakaoGuide:
      "KakaoTalk sharing is currently unavailable. Please copy the link and send it to your friends.",
    mapGuide:
      "The map is currently unavailable. Open the AMap link to view the wedding venue.",
    loading: "Loading…",
    imageLoading: "Loading the map image…",
    imageFailed:
      "The map image is unavailable. Use the button below to open AMap.",
    retry: "Retry image",
    manualCopy: "Select or long-press to copy",
    weekdays: ["S", "M", "T", "W", "T", "F", "S"],
    nav: ["Invitation", "Schedule", "Venue"],
    countdownEnd: "Here’s to every day together.",
  },
  ko: {
    title: "우리 결혼합니다",
    subtitle: "서로를 만나 함께 그리는 내일",
    names: ["뉴자후이", "궈페이치"],
    romanNames: ["NIU JIAHUI", "GUO FEIQI"],
    invitation: [
      "사랑하는 가족과 친구 여러분,",
      "멀리까지 오셔서 저희의 소중한 순간을 함께해 주셔서 감사합니다.",
      "이번 난징 여행이 결혼식의 즐거움과 편안한 만남의 추억으로 가득하길 바랍니다.",
      "이 초대장을 받아 주세요. 난징에서 여러분을 기다리겠습니다!",
    ],
    welcome: "난징에서 함께할 우리의 결혼식",
    couple: "이야기 속의 우리",
    roles: ["신랑", "신부"],
    coupleNote: "앞으로의 모든 날을 함께하고 싶어요.",
    dateTitle: "함께 기억할 하루",
    countdown: "결혼식까지 남은 시간",
    units: ["일", "시간", "분", "초"],
    scheduleTitle: "결혼식 식순",
    scheduleIntro: "여러분과 함께 소중한 추억을 만들어 갑니다.",
    events: [
      {
        title: "환영 및 포토타임",
        note: "신랑·신부와 함께 사진을 남겨 주세요",
      },
      { title: "결혼식", note: "평생을 약속하는 순간을 함께해 주세요" },
      { title: "저녁 식사", note: "맛있는 음식과 웃음을 나누는 저녁" },
      { title: "After party~", note: "음악과 함께 이어지는 즐거운 밤" },
    ],
    venueTitle: "오시는 길",
    weddingPart: "PART 1｜결혼식 안내",
    weddingEyebrow: "Wedding Day",
    venueLabel: "결혼식 장소: 난징 · 산유리",
    venueName: "南京山囿里酒店",
    address:
      "중국 난징시 쉬안우구 보아이로 18번지 T80 과학문화 국제커뮤니티 35동",
    demo: "미리보기 · 장소, 좌표는 확정 전 예시입니다",
    map: "고덕지도에서 열기",
    loadMap: "인터랙티브 지도 보기",
    copyAddress: "주소 복사",
    copyPhone: "전화번호 복사",
    transport: [
      {
        title: "당일 연락 담당자: 曹梦露",
        note: "연락처: ",
      },
    ],
    shareTitle: "기쁜 소식을 나눠요",
    shareNote: "소중한 사람들에게 이 초대장을 전해 주세요.",
    shareHelp: "링크를 복사해 카카오톡으로 보내 주세요.",
    wechat: "위챗",
    kakao: "카카오톡",
    copyLink: "링크 복사",
    systemShare: "다른 앱으로 공유",
    footer: "여러분과 만날 날을 기다립니다",
    copied: "복사했습니다",
    failed: "완료하지 못했습니다. 아래 링크를 복사해 주세요.",
    close: "닫기",
    wechatGuide:
      "위챗 안에서 이 페이지를 열고 오른쪽 위 ··· 메뉴에서 친구 또는 모멘트 공유를 선택해 주세요. 링크를 복사해서 보내셔도 됩니다.",
    kakaoGuide:
      "지금은 카카오톡으로 바로 공유할 수 없습니다. 링크를 복사해서 보내 주세요.",
    mapGuide:
      "지도를 표시할 수 없습니다. 고덕지도에서 예식장 위치를 확인해 주세요.",
    loading: "불러오는 중…",
    imageLoading: "지도 이미지를 불러오는 중…",
    imageFailed:
      "지도 이미지를 불러오지 못했습니다. 아래 버튼으로 고덕지도를 열 수 있습니다.",
    retry: "이미지 다시 불러오기",
    manualCopy: "길게 누르거나 선택해 복사해 주세요",
    weekdays: ["일", "월", "화", "수", "목", "금", "토"],
    nav: ["초대", "식순", "장소"],
    countdownEnd: "앞으로의 모든 날을 함께합니다.",
  },
};
