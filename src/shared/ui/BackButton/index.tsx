"use client";

import { useRouter } from "next/navigation";
import styles from "./index.module.scss";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className={styles.backButton}>
      ← Назад
    </button>
  );
};
