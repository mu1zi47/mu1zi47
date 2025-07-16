"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./nav.module.css";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function Nav() {
  const [socialButton, setSocialButton] = useState(0);
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navTopInfo}>
          <h1>mu1zi47</h1>
          <h2>Front End Developer</h2>
          <h6>
            I build accessible, pixel-perfect digital experiences for the web.
          </h6>
        </div>

        <div className={styles.navCenterButtons}>
          <button className={styles.buttonActive}>
            <hr /> <p>About</p>
          </button>
          <button className={styles.buttonNotActive}>
            <hr /> <p>Skills</p>
          </button>
          <button className={styles.buttonNotActive}>
            <hr /> <p>Projects</p>
          </button>
        </div>

        <div className={styles.navBottomButtons}>
      <AnimatePresence mode="wait">
        {socialButton !== 0 && (
          <motion.div
            key={socialButton} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={styles.socialText}>
            {socialButton === 1 ? (
              <Link href="https://t.me/mu1zi47" target="_blank">
                @mu1zi47
              </Link>
            ) : socialButton === 2 ? (
              <Link href="https://github.com/mu1zi47" target="_blank">
                mu1zi47
              </Link>
            ) : socialButton === 3 ? (
              <Link href="https://instagram.com/mu1zi47" target="_blank">
                @mu1zi47
              </Link>
            ) : socialButton === 4 ? (
              <Link href="mailto:mu1zi47@yandex.uz">
                mu1zi47@yandex.uz
              </Link>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
          <div className={styles.navSocialButtonsRow}>
            <button onClick={() => setSocialButton(socialButton !== 1 ? 1 : 0)}>
              <Image
                src="/telegram.svg"
                alt="telegram"
                width={24}
                height={24}
              />
            </button>
            <button onClick={() => setSocialButton(socialButton !== 2 ? 2 : 0)}>
              <Image src="/github.svg" alt="github" width={24} height={24} />
            </button>
            <button onClick={() => setSocialButton(socialButton !== 3 ? 3 : 0)}>
              <Image src="/insta.svg" alt="insta" width={24} height={24} />
            </button>
            <button onClick={() => setSocialButton(socialButton !== 4 ? 4 : 0)}>
              <Image src="/mail.svg" alt="mail" width={24} height={24} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
