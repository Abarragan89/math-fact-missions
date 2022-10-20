import Link from 'next/link';
import styles from '../styles/headerStyles/headerStyles.module.css';


function Header({ text, inGame }) {
    return (
        <header className={`flex-box-se ${styles.header}`}>
            <h1>{text}</h1>
        </header>
    )
}

export default Header;

