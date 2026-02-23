import styles from "./Header.module.css";
import Link from "next/link";

export default function Home() {
	return (
		<header className={styles.header}>
			<Link href={'/'}>
				<img alt="Logo" src="/logo.png"/>
			</Link>
			<nav>
				<Link href="/#aboutus">Про нас</Link>
				<Link href="/#gallery">Галерея</Link>
				<Link href="/#booking">Бронювання</Link>
				<Link href="/terms">Умови</Link>
				<Link href="/#contacts">Контакти</Link>
			</nav>
		</header>
	);
}
