"use client";

import { Search } from "@/widgets/Search";
import styles from "./index.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        {" "}
        <div className={styles.header__logo}>
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="Logo"
            width={150}
          />
        </div>
        <Search />
      </div>
    </header>
  );
};
