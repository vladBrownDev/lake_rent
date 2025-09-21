import styles from "./Header.module.css";
import Link from "next/link";

export default function Home() {
	return (
		<header className={styles.header}>
			<Link href={'/'}>
				<img alt="Logo" src="/logo.png"/>
			</Link>
			<nav>
				<a href="/#aboutus">Про нас</a>
				<a href="/#gallery">Галерея</a>
				<a href="/#booking">Бронювання</a>
				<a href="/#contacts">Контакти</a>
			</nav>
		</header>
	);
}
