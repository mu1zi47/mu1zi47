"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./projects.module.css";
import useApi from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/context/languageContext";
import ImageWithLoader from "@/components/imageLoader";

export default function Projects() {
  const api = useApi();
  const { translate, language } = useLanguage();

  const fetchProjects = async () => {
    const response = await api.get("projects/");
    console.log(response.data);
    return response.data;
  };

  const { data: projects, isLoading: isProjectsLoading } = useQuery({
    queryKey: ["projectsPage", language],
    queryFn: fetchProjects,
    enabled: true,
  });

  const month = {
    '01': translate('январь'),
    '02': translate('февраль'),
    '03': translate('Март'),
    '04': translate('Апрель'),
    '05': translate('Май'),
    '06': translate('Июнь'),
    '07': translate('Июль'),
    '08': translate('Август'),
    '09': translate('Сентябрь'),
    '10': translate('Октябрь'),
    '11': translate('Ноябрь'),
    '12': translate('Декабрь')
  }

  return (
    <>
      <section className={styles.mainContainer}>
        <div className={styles.boxTop}>
          <Link href={"/"} className={styles.backToHomePage}>
            <h3>{translate("Back to Home page")}</h3>
          </Link>
          <h1>{translate("All Projects")}</h1>
        </div>

        <div className={styles.table}>
          <div className={styles.firstTable}>
            <div className={styles.firstCol}>
              <p>{translate("Image")}</p>
            </div>
            <div className={styles.secondCol}>
              <p>{translate("Date")}</p>
            </div>
            <div className={styles.thirdCol}>
              <p>{translate("Technologies")}</p>
            </div>
            <div className={styles.fouthCol}>
              <p>{translate("Link")}</p>
            </div>
          </div>
          <hr />
          {projects?.map((item, index) => (
            <div key={item.id} className={styles.projectsColumn}>
              <div className={styles.secondTable}>
                <div className={styles.firstCol}>
                  <ImageWithLoader src={item.image} alt={item.name} width={125} height={78}/>
                </div>
                <div className={styles.secondCol}>
                  <p>{month[item.month]} {item.year}</p>
                </div>
                <div className={styles.thirdCol}>
                  <div className={styles.projectTexnologys}>
                    {item.technologies.map((data) => (
                        <div key={data.id} className={styles.oneTexnology}>
                        <h5>{data.name}</h5>
                        </div>
                    ))}
                  </div>
                </div>
                <div className={styles.fouthCol}>
                  <Link href={item.link}>{item.name}</Link>
                </div>
              </div>
              {index !== projects.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
