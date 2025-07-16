import Image from "next/image";
import Nav from "@/components/nav";
import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  return (
    <section className={styles.mainContainer}>
      <Nav />
      <div className={styles.RightContainer}>
        <p className={styles.info}>
          I’m a frontend developer passionate about building clean, accessible,
          and pixel-perfect user interfaces that combine thoughtful design with
          smooth user experiences. I enjoy crafting web applications that not
          only look great but are optimized for performance and usability.
          <br />
          <br />
          So far, most of my work has been on personal projects, including
          <Link href={"https://comica.tcats.uz"}> Comica TCats</Link>, where I
          focused on creating a seamless and visually engaging experience.{" "}
          <br />
          <br />
          I’m always exploring new technologies and improving my craft with each
          project I build. In my free time, I dive into mobile development,
          learning React Native to expand my skills beyond the web.
        </p>
        <div className={styles.skillsSection}>
          <h1>Skills</h1>
          <div className={styles.skillsGrid}>
            <Link
              href={"https://ru.wikipedia.org/wiki/HTML"}
              target="_blank"
              className={styles.boxOneSkills}
            >
              <p>HTML</p>
              <h6>advanced</h6>
            </Link>
            <Link
              href={"https://ru.wikipedia.org/wiki/CSS"}
              target="_blank"
              className={styles.boxOneSkills}
            >
              <p>CSS</p>
              <h6>advanced</h6>
            </Link>
            <Link
              href={"https://ru.wikipedia.org/wiki/JavaScript"}
              target="_blank"
              className={styles.boxOneSkills}
            >
              <p>JavaScript</p>
              <h6>intermediate</h6>
            </Link>
            <Link
              href={"https://en.wikipedia.org/wiki/Git"}
              target="_blank"
              className={styles.boxOneSkills}
            >
              <p>Git</p>
              <h6>basic</h6>
            </Link>
            <Link
              href={"https://react.dev/"}
              target="_blank"
              className={styles.boxOneSkills}
            >
              <p>React</p>
              <h6>intermediate</h6>
            </Link>
            <Link
              href={"https://nextjs.org/"}
              target="_blank"
              className={styles.boxOneSkills}>
              <p>Next.js</p>
              <h6>intermediate</h6>
            </Link>
          </div>
        </div>
        <div className={styles.projectsSection}>
          <h1>Projects</h1>
          <Link href={'https://bimretail.uz'} className={styles.oneProject} target="_blank">
            <Image
              src={"/projects/bimretail.uz.png"}
              alt="bim"
              width={125}
              height={78}
            />
            <div className={styles.boxTextOneProject}>
              <p>bimretail.uz</p>
              <h6>
                BIM Retail — это молодой и развивающийся бренд в Ташкенте, сочетающий в себе кафе и специализированный магазин корейских товаров. Он ориентирован на вкусные напитки, модные закуски и яркую атмосферу, активно расширяя сеть через франчайзинг.
              </h6>
              <div className={styles.projectTexnologys}>
                <div className={styles.oneTexnology}>Next.js</div>
                <div className={styles.oneTexnology}>Next.js</div>
                <div className={styles.oneTexnology}>Next.js</div>
                <div className={styles.oneTexnology}>Next.js</div>
              </div>
            </div>
          </Link>

                    <Link href={'https://bimretail.uz'} className={styles.oneProject} target="_blank">
            <Image
              src={"/projects/bimretail.uz.png"}
              alt="bim"
              width={125}
              height={78}
            />
            <div className={styles.boxTextOneProject}>
              <p>bimretail.uz</p>
              <h6>
                BIM Retail — это молодой и развивающийся бренд в Ташкенте, сочетающий в себе кафе и специализированный магазин корейских товаров. Он ориентирован на вкусные напитки, модные закуски и яркую атмосферу, активно расширяя сеть через франчайзинг.
              </h6>
              <div className={styles.projectTexnologys}>
                <div className={styles.oneTexnology}>Next.js</div>
                <div className={styles.oneTexnology}>Next.js</div>
                <div className={styles.oneTexnology}>Next.js</div>
                <div className={styles.oneTexnology}>Next.js</div>
              </div>
            </div>
          </Link>

                    <Link href={'https://bimretail.uz'} className={styles.oneProject} target="_blank">
            <Image
              src={"/projects/bimretail.uz.png"}
              alt="bim"
              width={125}
              height={78}
            />
            <div className={styles.boxTextOneProject}>
              <p>bimretail.uz</p>
              <h6>
                BIM Retail — это молодой и развивающийся бренд в Ташкенте, сочетающий в себе кафе и специализированный магазин корейских товаров. Он ориентирован на вкусные напитки, модные закуски и яркую атмосферу, активно расширяя сеть через франчайзинг.
              </h6>
              <div className={styles.projectTexnologys}>
                <div className={styles.oneTexnology}>Next.js</div>
                <div className={styles.oneTexnology}>Next.js</div>
                <div className={styles.oneTexnology}>Next.js</div>
                <div className={styles.oneTexnology}>Next.js</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
