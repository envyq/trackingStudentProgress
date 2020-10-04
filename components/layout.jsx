import Head from 'next/head'
import styles from './layout.module.sass'

const Layout = (props) => {

	return (
		<div className={styles.dark}>
			<Head>
				{props.title && (<title>{props.title}</title>)}
			</Head>
			<header className={styles.header}></header>
			{props.children}
		</div>
	);
}

export default Layout;