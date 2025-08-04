"use client";
import Image from "next/image";
import Nav from "@/components/nav";
import Link from "next/link";
import styles from "./home.module.css";
import useApi from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "motion/react";
import { useToast } from "@/components/ToastProvider";
import ImageWithLoader from "@/components/imageLoader";
import confetti from "canvas-confetti";
import PingPongGame from "@/components/PingPongGame";
import Cookies from "js-cookie";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Задержка между дочерними элементами
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const api = useApi();
  const { showToast } = useToast();
  const [memMessage, setMemMessage] = useState();
  const [destroyed, setDestroyed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [kanomiModal, setKanomiModal] = useState(false);

  const fetchProjects = async () => {
    const response = await api.get("projects/");
    return response.data;
  };

  const { data: projects, isLoading: isProjectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    enabled: true,
  });

  const fetchSkills = async () => {
    const response = await api.get("skills/");
    return response.data;
  };

  const { data: skills, isLoading: isSkillsLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    enabled: true,
  });

  const [name, setName] = useState(Cookies.get('userName') || "");
  const [telegramUser, setTelegramUser] = useState(Cookies.get('telegramUser') || "");
  const [message, setMessage] = useState("");

  const disabledButton =
    name.length === 0 || telegramUser.length === 1 || message.length === 0;
  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
    setName(value);
  };

  const handleTelegramChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("@")) {
      value = "@" + value.replace(/@/g, "");
    }
    value = value.replace(/^@|[^a-zA-Z0-9_]/g, (match, offset) => {
      return offset === 0 ? "@" : "";
    });
    setTelegramUser(value);
  };

  const handleTelegramFocus = () => {
    if (!telegramUser.startsWith("@")) {
      setTelegramUser("@" + telegramUser);
    }
  };

  const handleTelegramBlur = () => {
    if (telegramUser === "@") {
      setTelegramUser("");
    }
  };

  const successMessages = [
    "✅ Message delivered faster than pizza! 🍕",
    "🎉 Bingo! Sent with zero bugs (for now) 🤫",
    "🚀 Your message flew into space and arrived safely!",
    "💌 Message successfully sent. Hope the receiver loves it!",
    "✨ All good! Even the server smiled :)",
  ];

  const errorMessages = [
    "❌ Oops! Looks like the server went for a tea break ☕",
    "🚨 Error 404… but not really 404 🤔",
    "💥 Beep-boop, I crashed. Try again!",
    "🦖 Server went on a prehistoric vacation…",
    "🤖 I tried, but the internet said 'no'",
  ];

  const handleSendMessage = async () => {
    try {
      await api.post("message/create/", {
        name,
        telegramUser,
        message,
      });
      let toastMessage = "";

      if (name.trim().toLowerCase() === "rick") {
        toastMessage = "🎵 Sending a special track for Rick...";
        showToast(toastMessage, "success");
        setTimeout(() => {
          window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        }, 1000);
      } else if (name.trim().toLowerCase() === "admin") {
        toastMessage = "👀 Oh, admin! Don’t forget to check the logs.";
        showToast(toastMessage, "success");
      } else {
        const randomSuccess =
          successMessages[Math.floor(Math.random() * successMessages.length)];
        showToast(randomSuccess, "success");
      }
      Cookies.set('userName', name);
      Cookies.set('telegramUser', telegramUser);

      setName(Cookies.get('userName') || "");
      setTelegramUser(Cookies.get('telegramUser') || "");
      setMessage("");
    } catch (error) {
      console.error("Error: ", error);

      const randomError =
        errorMessages[Math.floor(Math.random() * errorMessages.length)];
      showToast(randomError, "error");
    }
  };

  // ----------------------- Secret Canomi -----------------------

  const [kanomi, setKanomi] = useState(false);

  useEffect(() => {
    const konamiSequence = [
      "m",
      "u",
      "1",
      "z",
      "i",
      "4",
      "7",
    ];

    let currentIndex = 0;

    const handleKeyDown = (e) => {
      if (e.key === konamiSequence[currentIndex]) {
        currentIndex++;
        if (currentIndex === konamiSequence.length) {
          setKanomi(true); // активируем кнопку
          currentIndex = 0; // сбрасываем после активации
          showToast(
            "Secret mode activated… but nothing changed. Or did it? 👀",
            "success"
          );
          confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } });
          setTimeout(() => {
            confetti({
              particleCount: 100,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
            });
            confetti({
              particleCount: 100,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
            });
          }, 500);
        }
      } else {
        currentIndex = 0; // сброс если нажата не та клавиша
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = kanomiModal ? "hidden" : "auto";
  }, [kanomiModal]);

  return (
    <>
      {destroyed === false ? (
        <>
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={styles.mainContainer}
          >
            <Nav />
            <div className={styles.RightContainer}>
              <motion.div variants={itemVariants} className={styles.navTopInfo}>
                <h1>mu1zi47</h1>
                <h2>Front End Developer</h2>
                <h6>
                  I build accessible, pixel-perfect digital experiences for the
                  web.
                </h6>
              </motion.div>
              <motion.div
                variants={itemVariants}
                id="about"
                className={styles.aboutSection}
              >
                <h1>About</h1>
                <p className={styles.info}>
                  I’m a frontend developer passionate about building clean,
                  accessible, and pixel-perfect user interfaces that combine
                  thoughtful design with smooth user experiences. I enjoy
                  crafting web applications that not only look great but are
                  optimized for performance and usability.
                  <br />
                  <br />
                  So far, most of my work has been on personal projects,
                  including
                  <Link href={"https://comica.tcats.uz"}> Comica TCats</Link>,
                  where I focused on creating a seamless and visually engaging
                  experience. <br />
                  <br />
                  I’m always exploring new technologies and improving my craft
                  with each project I build. In my free time, I dive into mobile
                  development, learning Flutter to expand my skills beyond the
                  web.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} id="skills" className={styles.skillsSection}>
                <h1>Skills</h1>
                <div className={styles.skillsGrid}>
                  <Swiper slidesPerView={3} spaceBetween={10} pagination={{clickable: true}} 
                  modules={[Pagination, Mousewheel]} mousewheel={true} className="mySwiper2">
                  {isSkillsLoading ? (
                    <>
                      <div className={styles.boxOneSkills}>
                        <p><Skeleton width={80} height={24} baseColor="#1e293b80" highlightColor="#2dd4bf1a"/></p>
                        <h6><Skeleton width={50} height={18} baseColor="#1e293b80" highlightColor="#2dd4bf1a" /></h6>
                      </div>
                      <div className={styles.boxOneSkills}>
                        <p><Skeleton width={80} height={24} baseColor="#1e293b80" highlightColor="#2dd4bf1a"/></p>
                        <h6><Skeleton width={50} height={18} baseColor="#1e293b80" highlightColor="#2dd4bf1a"/></h6>
                      </div>
                    </>
                  ) : skills?.length > 0 ? (
                    skills.map((item) => (
                      <SwiperSlide className={styles.swiperSlide2}>
                      <Link key={item.id} href={item.link} target="_blank" className={styles.boxOneSkills}>
                        <p>{item.name}</p>
                        <h6>{item.level}</h6>
                      </Link>
                      </SwiperSlide>
                    ))
                  ) : null}
                  </Swiper>
                </div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                id="projects"
                className={styles.projectsSection}>
                <h1>Projects</h1>
                <Swiper
                  direction={'vertical'} slidesPerView={1} spaceBetween={30} mousewheel={true}
                  pagination={{clickable: true,}} modules={[Mousewheel, Pagination]} className="mySwiper">
                {isProjectsLoading ? (
                  <>
                    <div className={styles.oneProject}>
                      <Skeleton
                        width={125}
                        height={78}
                        baseColor="#1e293b80"
                        highlightColor="#2dd4bf1a"
                      />
                      <div className={styles.boxTextOneProject}>
                        <p>
                          <Skeleton
                            width={100}
                            height={24}
                            baseColor="#1e293b80"
                            highlightColor="#2dd4bf1a"
                          />
                        </p>
                        <h6>
                          <Skeleton
                            width={"100%"}
                            height={20}
                            baseColor="#1e293b80"
                            highlightColor="#2dd4bf1a"
                          />
                        </h6>
                        <div className={styles.projectTexnologys}>
                          <Skeleton
                            width={60}
                            baseColor="#1e293b80"
                            highlightColor="#2dd4bf1a"
                            className={styles.oneTexnology}
                          />
                          <Skeleton
                            width={60}
                            baseColor="#1e293b80"
                            highlightColor="#2dd4bf1a"
                            className={styles.oneTexnology}
                          />
                          <Skeleton
                            width={60}
                            baseColor="#1e293b80"
                            highlightColor="#2dd4bf1a"
                            className={styles.oneTexnology}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : projects?.length > 0 ? (
                  projects.map((item) => (
                    <SwiperSlide key={item.id} className={styles.swiperSlide}>
                      <Link href={item.link} className={styles.oneProject} target="_blank">
                        <div className={styles.boxProjectImageAndName}>
                        <ImageWithLoader src={item.image} alt={item.name} width={125} height={78}/>
                        <div className={styles.boxTextOneProject}>
                          <p>{item.name}</p>
                          <h6>{item.description}</h6>
                        </div>
                        </div>
                        <div className={styles.projectTexnologys}>
                          {item.technologies.map((data) => (
                            <div key={data.id} className={styles.oneTexnology}>
                              <h5>{data.name}</h5>
                            </div>
                          ))}
                        </div>
                    </Link>
                    </SwiperSlide>
                  ))
                ) : null}
                </Swiper>
              </motion.div>
              <motion.div variants={itemVariants} id="contacts" className={styles.contactsSection}>
                <h1>Write me</h1>
                <div className={styles.boxInputsRow}>
                  <div className={styles.boxOneInput}>
                    <input type="text" placeholder="Name" value={name} onChange={handleNameChange} maxLength={50}/>
                  </div>
                  <div className={styles.boxOneInput}>
                    <input type="text" placeholder="Telegram username" value={telegramUser} onChange={handleTelegramChange} 
                    onFocus={handleTelegramFocus} onBlur={handleTelegramBlur} maxLength={50}/>
                  </div>
                </div>
                <div className={styles.boxOneInput}>
                  <textarea
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={500}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={disabledButton}
                  className={styles.sendMessage}
                >
                  <p>Send Message</p>
                </button>
              </motion.div>
              <div className={styles.footerSection}>
                <div className={styles.navSocialButtonsRow}>
                  <Link href={"https://t.me/mu1zi47"}>
                    <Image
                      src="/telegram.svg"
                      alt="telegram"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Link href={"https://github.com/mu1zi47"}>
                    <Image
                      src="/github.svg"
                      alt="github"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Link href={"https://instagram.com/mu1zi47/"}>
                    <Image
                      src="/insta.svg"
                      alt="insta"
                      width={24}
                      height={24}
                    />
                  </Link>
                </div>
                <p className={styles.hover}>© mu1zi47 2025</p>
              </div>
            </div>
          </motion.section>
          {kanomi && (
            <div className={styles.kanomiSection}>
              <button onClick={() => setKanomiModal(true)}>
                <h2>🏓 Play Ping Pong 🏓</h2>
              </button>
            </div>
          )}
          {kanomiModal && (
            <>
              <div
                className={styles.kanomiModalOverlay}
                onClick={() => setKanomiModal(false)}
              >
                <div
                  className={styles.kanomiModal}
                  onClick={(e) => e.stopPropagation()}
                >
                  <PingPongGame />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
