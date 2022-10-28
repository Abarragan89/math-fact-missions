import Header from '../components/Header';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/chooseGame/chooseGame.module.css';
import styles2 from '../styles/gameLobby/gameLobby.module.css';
import useSound from 'use-sound';

function WelcomePage() {

    // Complete the friends scoreboard
    // check if friends page is hackable through URL
    //  Finish Styles!!!


    // Set up Sound
    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })
    const router = useRouter();
    const { username } = router.query

    return (
        <main className={styles2.lobbyMain}>
            <Header
                text={`${username}'s Control Center`}
                inGame={false}
            />

            <Link href='/continueGame'><p onClick={() => play()} className={styles.hollowBtn}>Back</p></Link>
            <div className={styles.controlPanelButtons}>
                <Link href={`/chooseGame?username=${username}`}><p onClick={() => play()} className='mainButton'>
                    <span>Missions</span>
                    </p></Link>
                <Link href={`/leaderBoards?username=${username}`}><p onClick={() => play()} className='mainButton'>
                    <span>Ranks</span>
                    </p></Link>
                <Link href={`/friends?username=${username}`}><p onClick={() => play()} className='mainButton'>
                    <span>Find Friends</span>
                    </p></Link>
            </div>

        </main>
    )
}

export default WelcomePage;