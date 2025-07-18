"use client";
import Image from "next/image";
import Nav from "@/components/nav";
import Link from "next/link";
import styles from "./home.module.css";
import useApi from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useToast } from "@/components/ToastProvider";

export default function Home() {
  const api = useApi();
  const { showToast } = useToast();
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

  const [name, setName] = useState("");
  const [telegramUser, setTelegramUser] = useState("");
  const [message, setMessage] = useState("");

  const disabledButton =
    name.length === 0 || telegramUser.length === 1 || message.length === 0;

  const handleNameChange = (e) => {
    // Разрешаем только буквы (латиница/кириллица) и пробелы
    const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
    setName(value);
  };

  const handleTelegramChange = (e) => {
    let value = e.target.value;

    // Если удалили @, возвращаем его в начало
    if (!value.startsWith("@")) {
      value = "@" + value.replace(/@/g, "");
    }

    // Разрешаем только буквы, цифры и _
    // ^@ — оставляем первую собачку
    // [^a-zA-Z0-9_] — убираем все лишние символы
    value = value.replace(/^@|[^a-zA-Z0-9_]/g, (match, offset) => {
      return offset === 0 ? "@" : "";
    });

    setTelegramUser(value);
  };

  // При фокусе добавляем @, если пусто
  const handleTelegramFocus = () => {
    if (!telegramUser.startsWith("@")) {
      setTelegramUser("@" + telegramUser);
    }
  };

  // При потере фокуса, если осталась только @, очищаем поле
  const handleTelegramBlur = () => {
    if (telegramUser === "@") {
      setTelegramUser("");
    }
  };

  const successMessages = [
    "✅ Сообщение доставлено быстрее, чем пицца! 🍕",
    "🎉 Бинго! Всё отправилось без багов (пока) 🤫",
    "🚀 Твоё сообщение улетело в космос и доставлено!",
    "💌 Сообщение успешно отправлено. Надеюсь, получатель оценит!",
    "✨ Всё чётко! Сервер даже улыбнулся :)",
  ];

  const errorMessages = [
    "❌ Ой! Похоже, сервер ушёл пить чай ☕",
    "🚨 Ошибка 404… но на самом деле не 404 🤔",
    "💥 Бип-буп, я сломался. Попробуй ещё раз!",
    "🦖 Сервер ушёл в доисторический отпуск…",
    "🤖 Я пытался, но интернет сказал «нет»",
  ];

  const handleSendMessage = async () => {
    try {
      await api.post("message/create/", {
        name,
        telegramUser,
        message,
      });

      const randomSuccess = successMessages[Math.floor(Math.random() * successMessages.length)];
      showToast(randomSuccess, 'success');

      setName("");
      setTelegramUser("");
      setMessage("");
    } catch (error) {
      console.error("Error: ", error);

      const randomError =
        errorMessages[Math.floor(Math.random() * errorMessages.length)];
        showToast(randomError, 'error');
    }
  };
  return (
    <section className={styles.mainContainer}>
      <Nav />
      <div className={styles.RightContainer}>
        <div id="about" className={styles.aboutSection}>
          <h1>About</h1>
          <p className={styles.info}>
            I’m a frontend developer passionate about building clean,
            accessible, and pixel-perfect user interfaces that combine
            thoughtful design with smooth user experiences. I enjoy crafting web
            applications that not only look great but are optimized for
            performance and usability.
            <br />
            <br />
            So far, most of my work has been on personal projects, including
            <Link href={"https://comica.tcats.uz"}> Comica TCats</Link>, where I
            focused on creating a seamless and visually engaging experience.{" "}
            <br />
            <br />
            I’m always exploring new technologies and improving my craft with
            each project I build. In my free time, I dive into mobile
            development, learning React Native to expand my skills beyond the
            web.
          </p>
        </div>
        <div id="skills" className={styles.skillsSection}>
          <h1>Skills</h1>
          <div className={styles.skillsGrid}>
            {isSkillsLoading ? (
              <>
                <div className={styles.boxOneSkills}>
                  <p>
                    <Skeleton
                      width={80}
                      height={24}
                      baseColor="#1e293b80"
                      highlightColor="#2dd4bf1a"
                    />
                  </p>
                  <h6>
                    <Skeleton
                      width={50}
                      height={18}
                      baseColor="#1e293b80"
                      highlightColor="#2dd4bf1a"
                    />
                  </h6>
                </div>
                <div className={styles.boxOneSkills}>
                  <p>
                    <Skeleton
                      width={80}
                      height={24}
                      baseColor="#1e293b80"
                      highlightColor="#2dd4bf1a"
                    />
                  </p>
                  <h6>
                    <Skeleton
                      width={50}
                      height={18}
                      baseColor="#1e293b80"
                      highlightColor="#2dd4bf1a"
                    />
                  </h6>
                </div>
              </>
            ) : skills?.length > 0 ? (
              skills.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  className={styles.boxOneSkills}
                >
                  <p>{item.name}</p>
                  <h6>{item.level}</h6>
                </Link>
              ))
            ) : null}
          </div>
        </div>
        <div id="projects" className={styles.projectsSection}>
          <h1>Projects</h1>
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
              <Link
                key={item.id}
                href={item.link}
                className={styles.oneProject}
                target="_blank"
              >
                <Image src={item.image} alt="bim" width={125} height={78} />
                <div className={styles.boxTextOneProject}>
                  <p>{item.name}</p>
                  <h6>{item.description}</h6>
                  <div className={styles.projectTexnologys}>
                    {item.technologies.map((data) => (
                      <div key={data.id} className={styles.oneTexnology}>
                        <h5>{data.name}</h5>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          ) : null}
        </div>
        <div id="contacts" className={styles.contactsSection}>
          <h1>Write me</h1>
          <div className={styles.boxInputsRow}>
            <div className={styles.boxOneInput}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                maxLength={50}
              />
            </div>
            <div className={styles.boxOneInput}>
              <input
                type="text"
                placeholder="Telegram username"
                value={telegramUser}
                onChange={handleTelegramChange}
                onFocus={handleTelegramFocus}
                onBlur={handleTelegramBlur}
                maxLength={50}
              />
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
        </div>
        <div className={styles.footerSection}>
          <p className={styles.hover}>© mu1zi47 2025</p>
          <p className={styles.hovered}>
            {"| Made with ❤️, ☕ & way too much JavaScript"}
          </p>
        </div>
      </div>
    </section>
  );
}
