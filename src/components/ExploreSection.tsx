import { PartTitle } from "./PartTitle";
import type { Language } from "../locales";
import { RibbonCharm } from "./RibbonCharm";

const copy = {
  zh: {
    eyebrow: "Explore Nanjing",
    part: "PART 3｜\n在南京，慢慢逛",
    lead: "婚礼之外，也留一点时间给这座城市。",
    intro:
      "大家住在紫金山、中山陵景区附近，可以优先选择钟山片区的景点；不必一次全部逛完，挑一两处喜欢的，慢慢走就很好。",
    spots: [
      {
        title: "梧桐大道 · 美龄宫",
        note: "沿着林荫路散步，看看老建筑，留几张旅行合影。",
      },
      {
        title: "中山陵 · 音乐台",
        note: "感受南京的经典风景。中山陵台阶较多，请根据体力安排游览。",
      },
      {
        title: "明孝陵 · 石象路",
        note: "喜欢古迹、石刻和林间步道的朋友，可以选择这一站。",
      },
      {
        title: "南京博物院",
        note: "喜欢历史与文物的朋友，不妨留出半天慢慢参观。",
      },
      {
        title: "老门东 · 夫子庙秦淮河",
        note: "适合傍晚逛老街、尝小吃，再看看秦淮夜色。",
      },
    ],
    reminder: "出发前请确认景点开放及预约要求。",
  },
  ko: {
    eyebrow: "Explore Nanjing",
    part: "PART 3｜난징, 천천히 둘러보기",
    lead: "결혼식 전후로 난징을 둘러볼 시간도 남겨 두세요.",
    intro:
      "숙소가 쯔진산·중산릉 관광지 인근에 있어 중산 지역의 명소부터 둘러보시면 좋습니다. 한 번에 모두 방문하기보다 마음에 드는 한두 곳을 골라 여유롭게 걸어 보세요.",
    spots: [
      {
        title: "우퉁대로 · 메이링궁",
        note: "나무 그늘이 드리운 길을 걷고 오래된 건축물을 둘러보며 함께 여행 사진을 남겨 보세요.",
      },
      {
        title: "중산릉 · 음악대",
        note: "난징의 대표적인 풍경을 만나 보세요. 중산릉에는 계단이 많으니 체력에 맞춰 일정을 잡아 주세요.",
      },
      {
        title: "명효릉 · 석상로",
        note: "유적과 석조 조각, 숲길 산책을 좋아하는 분들께 어울리는 코스입니다.",
      },
      {
        title: "난징 박물원",
        note: "역사와 문화재에 관심이 있다면 반나절 정도 여유를 두고 관람해 보세요.",
      },
      {
        title: "라오먼둥 · 푸쯔먀오·친화이허",
        note: "해 질 무렵 옛 거리를 걷고 간식을 맛본 뒤, 친화이허의 야경을 즐기기 좋습니다.",
      },
    ],
    reminder: "방문 전에 각 명소의 운영 시간과 예약 필요 여부를 확인해 주세요.",
  },
  en: {
    eyebrow: "Enjoy the city",
    part: "PART 3｜Explore Nanjing",
    lead: "Beyond the wedding, leave a little time for the city.",
    intro:
      "As you’ll be staying near Purple Mountain and the Sun Yat-sen Mausoleum scenic area, start with sights around Zhongshan. There’s no need to see everything at once—choose one or two places you like and enjoy them at your own pace.",
    spots: [
      {
        title: "Wutong Avenue · Meiling Palace",
        note: "Stroll along tree-lined roads, admire historic buildings and take a few photos together.",
      },
      {
        title: "Sun Yat-sen Mausoleum · Music Stage",
        note: "Enjoy some of Nanjing’s classic scenery. The mausoleum has many steps, so plan your visit at a pace that suits you.",
      },
      {
        title: "Ming Xiaoling Mausoleum · Stone Elephant Road",
        note: "A lovely stop for those who enjoy historic sites, stone sculptures and woodland walks.",
      },
      {
        title: "Nanjing Museum",
        note: "If you enjoy history and cultural treasures, set aside half a day for a leisurely visit.",
      },
      {
        title: "Laomendong · Confucius Temple & Qinhuai River",
        note: "Explore old streets and try local snacks in the early evening, then enjoy the Qinhuai River after dark.",
      },
    ],
    reminder:
      "Please check opening times and reservation requirements before visiting.",
  },
};

export function ExploreSection({ language }: { language: Language }) {
  const c = copy[language];
  return (
    <section className="explore-section section" id="explore">
      <RibbonCharm className="section-sprig" />
      <p className="eyebrow">{c.eyebrow}</p>
      <PartTitle text={c.part} />
      <p className="explore-lead">{c.lead}</p>
      <p className="explore-intro">{c.intro}</p>
      <div className="explore-spots">
        {c.spots.map((spot, i) => (
          <article key={spot.title}>
            <span className="explore-number" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3>{spot.title}</h3>
              {language !== "zh" && (
                <p className="explore-local-name" lang="zh-CN">
                  {copy.zh.spots[i].title}
                </p>
              )}
              <p>{spot.note}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="explore-reminder">{c.reminder}</p>
    </section>
  );
}
