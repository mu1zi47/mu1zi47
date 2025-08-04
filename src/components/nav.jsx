'use client';
import Image from "next/image";
import styles from "./nav.module.css";
import LanguageSwitcher from "./language";
import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/context/languageContext";

export default function Nav() {
  const [modal, setModal] = useState(false);
  const { translate, language, setLanguage } = useLanguage();


  return (
    <>
      <motion.nav initial={{height:60}} animate={modal ? {height:311} : {height:60}} exit={{height:60}} transition={{duration:0.2}} className={styles.navContainer}>
        <div className={styles.nav}>
          <h1>Mu1zi47</h1>
          <div className={styles.navCenterButtons}>
            <button onClick={() => document.getElementById("about")?.scrollIntoView()}>
              <p>{translate("About")}</p>
            </button>
            <button onClick={() => document.getElementById("skills")?.scrollIntoView()}>
                <p>{translate("Skills")}</p>
            </button>
            <button onClick={() => document.getElementById("projects")?.scrollIntoView()}>
              <p>{translate("Projects")}</p>
            </button>
            <button onClick={() => document.getElementById("contacts")?.scrollIntoView()}>
              <p>{translate("Contacts")}</p>
            </button>
          </div>
          <LanguageSwitcher />
          <button onClick={() => setModal(!modal)} className={styles.burgerMenu}>
            <motion.div initial={{rotateX:0}} animate={modal ? {rotateX:180} : {rotateX:0}} exit={{rotate:0}} transition={{duration:0.2}}>
              <Image src={modal ? "/close.svg" : "/list.svg"} alt="list" width={28} height={28} className={styles.hover}/>
              <Image src={modal ? "/close2.svg" : "/list2.svg"} alt="list" width={28} height={28} className={styles.hovered}/>
            </motion.div>
          </button>
        </div>
        {modal ? (
          <motion.div initial={{y:-20}} animate={{y:0}} exit={{y:-20}} transition={{duration:0.2}} className={styles.adaptiveModalBox}>
            <button onClick={() => {setModal(false), setTimeout(() => {document.getElementById("about")?.scrollIntoView()}, 200)}}>
              <p>{translate("About")}</p>
            </button>
            <button onClick={() => {setModal(false), setTimeout(() => {document.getElementById("skills")?.scrollIntoView()}, 200)}}>
                <p>{translate('Skills')}</p>
            </button>
            <button onClick={() => {setModal(false), setTimeout(() => {document.getElementById("projects")?.scrollIntoView()}, 200)}}>
              <p>{translate("Projects")}</p>
            </button>
            <button onClick={() => {setModal(false), setTimeout(() => {document.getElementById("contacts")?.scrollIntoView()}, 200)}}>
              <p>{translate("Contacts")}</p>
            </button>
            <div className={styles.rowLanguages}>
              <button onClick={() => setLanguage('en')} className={language === 'en' ? styles.oneLanguageActive : styles.oneLanguage}>
                <Image src="/en.svg" alt="en" width={24} height={17}/>
              </button>
              <button onClick={() => setLanguage('ru')} className={language === 'ru' ? styles.oneLanguageActive : styles.oneLanguage}>
                <Image src="/ru.svg" alt="ru" width={24} height={17}/>
              </button>
              <button onClick={() => setLanguage('uz')} className={language === 'uz' ? styles.oneLanguageActive : styles.oneLanguage}>
                <Image src="/uz.svg" alt="uz" width={24} height={17}/>
              </button>
            </div>
          </motion.div>
        ) : null}
      </motion.nav>
    </>
  );
}
