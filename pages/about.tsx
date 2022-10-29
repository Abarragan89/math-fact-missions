import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import styles from '../styles/about/about.module.css';
import styles2 from '../styles/gameLobby/gameLobby.module.css';
import styles3 from '../styles/chooseGame/chooseGame.module.css';
import useSound from 'use-sound';


function About() {
    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })
    return (
        <>
            <Head>
                <title>About</title>
            </Head>
            <main className={styles2.lobbyMain}>
                <Header
                    text={'About'}
                    inGame={false}
                />
                <Link href={`/`}><p onClick={() => play()} className={styles3.hollowBtn}>Back</p></Link>
                <div className={styles.description}>
                    <p>Greetings User,</p>
                    <p>This game was created to help students gain mastery over their basic math facts. As an educator, I see my students struggle to find the motivation to rotely memorize their must needed math facts. This game is also intended to replace the traditional 2-minute drills many educators use to test student progress through their math facts. If a student can progress through all the levels and finish the Final Battle, you can be sure that they have mastered their facts. Incentives can be set for each level passed.</p>

                    <p>Player progress in this game is saved on the player's device. This is done intentionally in order to maintain testing fidelity. That way, students cannot go home, login, and have someone else do their battles or play their games. Additionally, players can find other users and add them to their friends list. This way, a custom scoreboard will show how they rank up against their friends in different math games and in the four Final Battles. Teachers can also make an account and add all their students as friends so they can keep track of their scores and create weekly incentives for different games.</p>

                    <p>If you find value in this app and wish to support, I do accept coffee donations. Any and all donations are greatly appreciated!
                        <a href="https://www.buymeacoffee.com/anthonybar" rel='noreferrer' target="_blank">
                            <img id='buy-me-coffee-img'
                                src={"https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"} alt="Buy Me A Coffee"
                                style={{
                                    height: '40px',
                                    width: '150px',
                                    display: 'block',
                                    margin: '0 auto',
                                    marginTop: '5px'
                                }} />
                        </a>
                    </p>
                </div>
                <div className={styles.musicCreditDiv}>
                    <div>
                        <legend><span>Music Credits</span></legend>
                    </div>
                    <h4>Alien Invasion Song:</h4>
                    <p>Powerful Trap Beat | Strong by Alex-Productions | https://onsound.eu/
                        Music promoted by https://www.chosic.com/free-music/all/
                        Creative Commons CC BY 3.0
                        https://creativecommons.org/licenses/by/3.0/
                    </p>
                    <h4>Space Race Song:</h4>
                    <p>
                        Aggressive Gaming Sport | Gaming by Alex-Productions | https://onsound.eu/
                        Music promoted by https://www.chosic.com/free-music/all/
                        Creative Commons CC BY 3.0
                        https://creativecommons.org/licenses/by/3.0/
                    </p>
                    <h4>Apocolypse Song:</h4>
                    <p>
                        Hostiles Inbound by Miguel Johnson | https://soundcloud.com/migueljohnsonmjmusic
                        Music promoted by https://www.chosic.com/free-music/all/
                        Creative Commons CC BY 3.0
                        https://creativecommons.org/licenses/by/3.0/

                    </p>
                </div>
            </main>
        </>
    )
}
export default About;