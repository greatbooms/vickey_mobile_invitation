import { useState } from "react";
import { Copy, MapPin, Navigation } from "lucide-react";
import type { Language } from "../locales";
import { RibbonCharm } from "./RibbonCharm";

const hotels = [
  {
    name: "花筑·钟山云邸（南京中山陵梧桐大道店）",
    address: "玄武区中山门大街文化园东南侧约30米",
    url: "https://surl.amap.com/2dg8YNAOF9yj",
    image: "/images/hotel-1-map.jpg",
  },
  {
    name: "南京中山陵逸扉酒店",
    address: "玄武区中山门大街卫岗55号",
    url: "https://surl.amap.com/2dmexIlM1ueQl",
    image: "/images/hotel-2-map.jpg",
  },
];

const copy = {
  zh: {
    part: "PART 2｜交通与住宿",
    arrivalTitle: "抵达南京",
    arrival:
      "乘坐高铁或火车，可选择南京站、南京南站；乘坐飞机，可选择南京禄口国际机场。请提前将抵达时间及同行人数告诉我们，方便沟通行程。",
    stayTitle: "住宿安排",
    stay: "由于酒店房间安排的原因，本次宾客将分别入住以下两家酒店，均位于紫金山·中山陵景区附近，感谢大家理解。",
    labels: ["酒店一", "酒店二"],
    map: "在高德地图中打开",
    copyAddress: "复制地址",
    mapFallback: "点击下方按钮查看酒店地图。",
    notes: [
      "出发前，请务必确认自己被安排入住的酒店名称及地址，按照对应定位前往，避免走错酒店。",
      "酒店与婚礼场地是不同的目的地，请分别核对定位。",
      "婚礼当天的入场路线、停车及接送事宜，请提前与我们沟通确认。",
    ],
  },
  ko: {
    part: "PART 2｜교통과 숙박",
    arrivalTitle: "난징에 오시는 길",
    arrival:
      "고속철도나 기차로 오시면 난징역 또는 난징남역, 비행기로 오시면 난징 루커우 국제공항을 이용하실 수 있습니다. 일정 조율을 위해 도착 시간과 동행 인원을 미리 알려 주세요.",
    stayTitle: "숙박 안내",
    stay: "객실 배정 사정으로 하객 여러분은 아래 두 호텔에 나누어 숙박하시게 됩니다. 두 호텔 모두 쯔진산·중산릉 관광지 인근에 있습니다. 양해해 주셔서 감사합니다.",
    labels: ["호텔 1", "호텔 2"],
    map: "고덕지도에서 열기",
    copyAddress: "주소 복사",
    mapFallback: "아래 버튼으로 호텔 지도를 확인해 주세요.",
    notes: [
      "출발 전에 배정받은 호텔의 이름과 주소를 꼭 확인하고, 해당 호텔의 지도 위치에 맞춰 이동해 주세요.",
      "숙소와 예식장은 서로 다른 장소입니다. 지도 위치를 각각 확인해 주세요.",
      "예식 당일 입장 경로, 주차와 픽업·이동에 관한 사항은 미리 저희와 상의해 주세요.",
    ],
  },
  en: {
    part: "PART 2｜TRAVEL & STAY",
    arrivalTitle: "Arriving in Nanjing",
    arrival:
      "By high-speed rail or train, arrive at Nanjing Railway Station or Nanjing South Railway Station. By air, arrive at Nanjing Lukou International Airport. Please let us know your arrival time and the number of people travelling with you in advance so we can coordinate your plans.",
    stayTitle: "Where you’ll stay",
    stay: "Due to room arrangements, our guests will stay at the two hotels below. Both are near the Purple Mountain and Sun Yat-sen Mausoleum scenic area. Thank you for your understanding.",
    labels: ["Hotel 1", "Hotel 2"],
    map: "Open in AMap",
    copyAddress: "Copy address",
    mapFallback: "Use the button below to view the hotel map.",
    notes: [
      "Before you travel, please confirm the name and address of your assigned hotel and follow its map location to avoid going to the wrong hotel.",
      "The hotels and wedding venue are different destinations. Please check each location separately.",
      "Please confirm the wedding-day entrance route, parking and pickup arrangements with us in advance.",
    ],
  },
};

function HotelMap({
  hotel,
  fallback,
}: {
  hotel: (typeof hotels)[number];
  fallback: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <a
      className="hotel-map"
      href={hotel.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={hotel.name}
    >
      {failed ? (
        <span className="hotel-map-fallback">
          <MapPin size={24} />
          {fallback}
        </span>
      ) : (
        <img
          src={hotel.image}
          alt={`${hotel.name} · 高德地图`}
          width="1000"
          height="650"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </a>
  );
}

export function TravelSection({
  language,
  onCopy,
}: {
  language: Language;
  onCopy: (value: string) => Promise<void>;
}) {
  const c = copy[language];
  return (
    <section className="travel-section section" id="travel">
      <RibbonCharm className="section-sprig" />
      <p className="eyebrow">{c.part}</p>
      <h2>Getting Here &amp; Staying Over</h2>
      <div className="travel-copy">
        <h3>{c.arrivalTitle}</h3>
        <p>{c.arrival}</p>
        <h3>{c.stayTitle}</h3>
        <p>{c.stay}</p>
      </div>
      <div className="hotel-list">
        {hotels.map((hotel, i) => (
          <article className="hotel-card" key={hotel.url}>
            <p className="hotel-label">{c.labels[i]}</p>
            <h3>{hotel.name}</h3>
            <p className="hotel-address">{hotel.address}</p>
            <HotelMap hotel={hotel} fallback={c.mapFallback} />
            <a
              className="button outlined"
              href={hotel.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation size={16} />
              {c.map}
            </a>
            <button
              className="hotel-copy-address"
              onClick={() => onCopy(hotel.address)}
            >
              <Copy size={14} />
              {c.copyAddress}
            </button>
          </article>
        ))}
      </div>
      <div className="travel-notes">
        {c.notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
    </section>
  );
}
