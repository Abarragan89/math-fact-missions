import Header from '../components/Header';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/chooseGame/chooseGame.module.css';
import styles2 from '../styles/gameLobby/gameLobby.module.css';
import useSound from 'use-sound';

function WelcomePage() {

    // fix buttons on welcome page
    // get two people have high final score and order those
    // limit the scoreboard to 10
    // Complete the friends scoreboard
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
                text={`${username}'s Missions`}
                inGame={false}
            />

            <Link href='/continueGame'><p onClick={() => play()} className={styles.hollowBtn}>Back</p></Link>
            <div>
                <Link href={`/chooseGame?username=${username}`}><p onClick={() => play()} className={styles.hollowBtn}>Missions</p></Link>
                <Link href={`/leaderBoards?username=${username}`}><p onClick={() => play()} className={styles.hollowBtn}>Ranks</p></Link>
                <Link href={`/friends?username=${username}`}><p onClick={() => play()} className={styles.hollowBtn}>Friends</p></Link>
            </div>

        </main>
    )
}

export default WelcomePage;