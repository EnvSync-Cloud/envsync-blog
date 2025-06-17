import Link from "next/link";
import Head from "next/head";
import ExtLink from "./ext-link";
import { useRouter } from "next/router";
import styles from "../styles/header.module.css";

const navItems: { label: string; page?: string; link?: string }[] = [
	{ label: "Blog", page: "/" },
	{ label: "EnvSync Cloud", link: "https://envsync.cloud" },
	{ label: "Github", link: "https://github.com/envsync-cloud" },
];

const ogImageUrl = "https://blog.envsync.cloud/og-image.png";

const Header = ({ titlePre = "" }) => {
	const { pathname } = useRouter();

	return (
        <header className={styles.header}>
            <Head>
				<title>{[titlePre, 'EnvSync Blog'].filter(Boolean).join(' | ')}</title>
				<meta name="description" content="Official EnvSync blogs" />
				<meta name="og:title" content="EnvSync Blogs" />
				<meta property="og:image" content={ogImageUrl} />
				<meta name="twitter:site" content="@bravo68web" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:image" content={ogImageUrl} />
			</Head>
            <ul>
				{navItems.map(({ label, page, link }) => (
					<li key={label}>
						{page ? (
							<Link href={page} className={pathname === page ? "active" : undefined}>
								{label}
							</Link>
						) : (
							<ExtLink href={link}>{label}</ExtLink>
						)}
					</li>
				))}
			</ul>
        </header>
    );
};

export default Header;
