import { PartTitle } from "./PartTitle";
import type { Language } from "../locales";
import { RibbonCharm } from "./RibbonCharm";

const copy = {
  zh: {
    eyebrow: "A Few Little Tips",
    part: "PART 4｜贴心小提醒",
    tips: [
      {
        title: "穿得漂亮，也穿得舒服。",
        note: "草坪婚礼建议选择平底鞋或粗跟鞋，也可以备一双舒适的替换鞋。",
      },
      {
        title: "给夜晚留一件外套。",
        note: "参加晚宴和派对的朋友，建议带上外套或披肩，并根据出发前的天气预报准备衣物及雨具。",
      },
      {
        title: "任何有需要，请随时告诉我们～",
        note: "饮食忌口、食物过敏，或长辈、小朋友的出行需求，都欢迎提前与我们沟通。",
      },
    ],
    closing: [
      "不用把行程安排得太满，也不用担心自己不够盛装。",
      "你能来，就是这一天最珍贵的部分。",
    ],
    signature: "飞琪 & 小牛",
    date: "2026.10.23 · 南京见",
  },
  ko: {
    eyebrow: "A Few Little Tips",
    part: "PART 4｜작은 안내",
    tips: [
      {
        title: "예쁘게, 그리고 편안하게 입어 주세요.",
        note: "잔디밭에서 진행되는 결혼식에는 플랫슈즈나 굽이 넓은 신발을 추천합니다. 편안하게 갈아 신을 신발을 준비하셔도 좋아요.",
      },
      {
        title: "저녁을 위한 겉옷도 챙겨 주세요.",
        note: "저녁 식사와 파티에 함께하실 분들은 겉옷이나 숄을 준비해 주세요. 출발 전 일기예보를 확인하고 옷과 우산 등도 챙겨 주세요.",
      },
      {
        title: "필요한 것이 있다면 언제든 알려 주세요.",
        note: "드시지 못하는 음식이나 식품 알레르기, 어르신과 아이들의 이동에 필요한 사항은 미리 저희에게 알려 주세요.",
      },
    ],
    closing: [
      "일정을 너무 빽빽하게 잡지 않으셔도, 옷차림을 걱정하지 않으셔도 괜찮아요.",
      "여러분이 와 주시는 것만으로도 저희에게는 가장 소중한 선물입니다.",
    ],
    signature: "페이치 & 자후이",
    date: "2026.10.23 · 난징에서 만나요",
  },
  en: {
    eyebrow: "Make yourself comfortable",
    part: "PART 4｜A Few Little Tips",
    tips: [
      {
        title: "Dress beautifully—and comfortably.",
        note: "For our lawn wedding, we recommend flats or shoes with block heels. You’re also welcome to bring a comfortable pair to change into.",
      },
      {
        title: "Bring a layer for the evening.",
        note: "If you’re joining the dinner and party, bring a jacket or shawl. Check the forecast before travelling and pack suitable clothing and rain gear.",
      },
      {
        title: "Please tell us if you need anything.",
        note: "Let us know in advance about dietary requirements, food allergies or travel needs for older family members and children.",
      },
    ],
    closing: [
      "There’s no need to fill every moment of your trip or worry about dressing up enough.",
      "Having you here is the most precious part of our day.",
    ],
    signature: "Feiqi & Jiahui",
    date: "2026.10.23 · See you in Nanjing",
  },
};

export function TipsSection({ language }: { language: Language }) {
  const c = copy[language];
  return (
    <section className="tips-section section" id="tips">
      <RibbonCharm className="section-sprig" />
      <p className="eyebrow">{c.eyebrow}</p>
      <PartTitle text={c.part} />
      <div className="tips-list">
        {c.tips.map((tip) => (
          <article key={tip.title}>
            <h3>{tip.title}</h3>
            <p>{tip.note}</p>
          </article>
        ))}
      </div>
      <div className="tips-closing">
        {c.closing.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className="tips-signature">{c.signature}</p>
        <p className="tips-date">{c.date}</p>
      </div>
    </section>
  );
}
