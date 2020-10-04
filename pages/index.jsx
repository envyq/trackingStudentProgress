import Head from 'next/head'
import Layout from 'components/layout.jsx'

import { SimpleButton, SimpleInput } from 'components/inputs.jsx'

import { MdPerson, MdLock } from 'react-icons/md'

import styles from 'styles/login.module.sass'

export default function Home() {
	return (
		<Layout title="Название">
			<div className={styles.content}>
				<div>
					<span className={styles.naming}>название</span>
					<div className={styles.sub}>Войдите для продолжения</div>
				</div>

				<div className={styles.form}>
					<SimpleInput icon={ <MdPerson size="1.4em" color="#FFC542"/> } className={styles.input} label="E-mail" type="email" />
					<SimpleInput icon={ <MdLock size="1.4em" color="#FF575F"/> } className={styles.input} label="Пароль" type="password" />
				</div>

			</div>

			<SimpleButton className="mb">ВОЙТИ</SimpleButton>
			<SimpleButton className={styles.secondBtn}>РЕГИСТРАЦИЯ</SimpleButton>
		</Layout>
	)
}
