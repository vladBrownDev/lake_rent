import styles from "./page.module.css";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <main className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>Оренда місць для рибалки</h1>
              <p>
                Відпочинок на природі з комфортом. Насолоджуйтесь мальовничими
                краєвидами, чистим повітрям та справжньою риболовною пригодою!
              </p>
              <Link href="/rent">
                <button className={styles.ctaBtn}>Забронювати місце</button>
              </Link>
            </div>
            <div className={styles.heroMedia}>
              <Image
                src="/biglogo.png"
                alt="Логотип озера Бердихів"
                width={560}
                height={560}
                priority
                sizes="(max-width: 900px) 70vw, 40vw"
                className={styles.heroLogo}
              />
            </div>
          </div>
        </section>

        {/* Lake Info Section */}
        <section id={"aboutus"} className={styles.info}>
          <h2>Про озеро</h2>
          <h3>🐟 Озеро Бердихів — риболовля в задоволення</h3>
          <p><strong>Де клює завжди!</strong></p>

          <p>
            Озеро Бердихів — це сучасна локація для риболовлі та активного відпочинку
            всього за 4 км від м. Новояворівськ, Львівська область.
          </p>
          <p>🔹 Територія озера — 12 гектарів</p>
          <p>🔹 Понад 40 секторів (приблизно по 14 метрів кожен)</p>
          <p>🔹 Ідеальний підʼїзд: зручна дорога до самої водойми, можливість підʼїхати авто прямо до сектора</p>

          <p>🎣 Озеро добре зариблене, водяться такі види риб:</p>

          <p>
            Осетр, веслоніс, короп (різні породи), білий амур, карась, лин, товстолоб,
            сом, щука, судак, окунь, плотва
          </p>
          <h3>🌳 Все для вашого комфорту</h3>

          <ul>
            <li>Сектори з короповими матами, альтанками, лавками, розетками та освітленням</li>
            <li>Освітлення кругом озера для зручності вночі</li>
            <li>Магазин на території — рибальські товари, продукти, напої</li>
            <li>Будиночки для ночівлі — затишно й тепло</li>
            <li>Мангал + дрова</li>
            <li>Wi-Fi по всій території</li>
            <li>Питна вода з крану</li>
            <li>Зона альтанок у сосновому лісі — запах хвої, тінь, спокій</li>
            <li>Міні-зоопарк з тваринками (фазани, папуги, голуби) — справжнє задоволення для дітей</li>
            <li>Гойдалки та дитяча зона</li>
          </ul>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <h2>Чому обирають нас</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3>🌿 Природа</h3>
              <p>
                Вдале розташування далеко від міського шуму, чисте повітря та
                тиха атмосфера створюють ідеальні умови для відпочинку.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>🎣 Риболовля</h3>
              <p>
                Озеро постійно зариблюється, тож кожен має шанс упіймати трофейну
                рибу. Є місця як для професійних рибалок, так і для новачків.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>🔥 Відпочинок</h3>
              <p>
                Комфортні альтанки, мангали, місця для пікніку та вечірнього
                відпочинку біля вогню. Чудовий варіант для компаній та сімей.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>🌙 Нічна рибалка</h3>
              <p>
                Любите рибалити в тиші під зоряним небом? У нас доступна оренда
                місць для нічної рибалки з 14:00 до 12:00 наступного дня.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>🍲 Зручності</h3>
              <p>
                Поруч можна замовити дрова, воду та інші необхідні послуги для
                комфортного перебування.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id={"gallery"} className={styles.gallery}>
          <h2>Галерея</h2>
          <p>
            Перегляньте фото з нашого озера та переконайтеся, що це чудове місце
            для відпочинку та риболовлі.
          </p>
          <div className={styles.galleryGrid}>
            <img src="/images/lake1.jpg" alt="Озеро 1" />
            <img src="/images/lake2.jpg" alt="Озеро 2" />
            <img src="/images/lake3.jpg" alt="Озеро 3" />
            <img src="/images/lake4.jpg" alt="Озеро 4" />
          </div>
        </section>

        {/* Pricing/Booking Section */}
        <section id={"booking"} className={styles.booking}>
          <h2>Бронювання</h2>
          <p>
            Ми пропонуємо гнучкі варіанти оренди: денна рибалка (6:00–18:00) або
            добова (14:00–12:00 наступного дня). Додатково можна замовити послуги
            – дрова, альтанку чи будинок на колесах.
          </p>
          <p>
            Забронюйте своє місце вже зараз та насолоджуйтесь чудовим відпочинком
            на озері!
          </p>
          <Link href="/rent">
            <button className={styles.ctaBtn}>Перейти до бронювання</button>
          </Link>
        </section>

        {/* Contacts Section */}
        <section id={"contacts"} className={styles.contacts}>
          <h2>Контакти</h2>
          <p>
            Для зв’язку з адміністрацією використовуйте такі контактні дані:
          </p>
          <p>
            📍 <b>Адреса:</b> Львівська обл., о. Бердихів
          </p>
          <p>
            📞 <b>Службовий:</b> 0 (97) 716 67 74
          </p>
          <p>
            📞 <b>Микола:</b> 0 (98) 989 88 60
          </p>
          <p>
            📧 <b>Електронна пошта:</b> ozeroberdykhiv@gmail.com
          </p>
          <iframe
            className={styles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d322688.3628504514!2d23.611012741078703!3d49.90307922832799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473b17732b65c62d%3A0x8ff07bdb5692510!2sOzero%20Berdykhiv!5e0!3m2!1sru!2sua!4v1758363506983!5m2!1sru!2sua"
            loading="lazy"
          ></iframe>
        </section>

        {/* FAQ Section */}
        <section id={"faq"} className={styles.faq}>
          <h2>Поширені запитання</h2>
          <div className={styles.faqItem}>
            <h3>Які види риби водяться в озері?</h3>
            <p>У нашому озері ви зможете впіймати коропа, щуку, карася, ляща та амура.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>Чи можна приїхати з дітьми?</h3>
            <p>
              Так, озеро чудово підходить для сімейного відпочинку. Є альтанки,
              пікнікові зони та безпечні місця біля води.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3>Чи дозволена нічна риболовля?</h3>
            <p>
              Так, можна забронювати місце на добу з 14:00 до 12:00 наступного
              дня.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
