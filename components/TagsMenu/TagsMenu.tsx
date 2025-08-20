"use client";

import Link from "next/link";
import css from "./TagsMenu.module.css";
import { useState } from "react";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const categories = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];

  const openClick = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = () => {
    setIsOpen(false);
  };
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={openClick}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {/* список тегів */}
          {/* <li className={css.menuLink}>
          <Link href={`/notes`}>All notes</Link>
        </li> */}
          {categories.map((cat) => {
            return (
              <li className={css.menuItem} key={cat}>
                <Link
                  href={`/notes/filter/${cat}`}
                  className={css.menuLink}
                  onClick={handleClick}
                >
                  {cat}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
