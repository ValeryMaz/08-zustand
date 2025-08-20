import css from "./NotesSidebar.module.css";
import Link from "next/link";
const NotesSidebar = async () => {
  const categories = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];
  return (
    <div className={css.menuContainer}>
      {/* <button className={css.menuButton}>Notes ▾</button> */}
      <ul className={css.menuList}>
        {/* список тегів */}
        {/* <li className={css.menuLink}>
          <Link href={`/notes`}>All notes</Link>
        </li> */}
        {categories.map((cat) => {
          return (
            <li className={css.menuItem} key={cat}>
              <Link href={`/notes/filter/${cat}`} className={css.menuLink}>
                {cat}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotesSidebar;
