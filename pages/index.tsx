import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/homePage/index.module.css';
import useSound from 'use-sound';
import NewGameModal from '../components/NewGameModal';

function HomePage() {

    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })

    const [initiateNewGame, setInitiateNewGame] = useState<boolean>(false)
    const [modalTriggered, setModalTriggered] = useState<Boolean>(false)

    return (
        <>
            <Head>
                <title>Math Fact Missions</title>
            </Head>
            {initiateNewGame &&
                <NewGameModal
                    modalTriggered={initiateNewGame}
                    setModalTriggered={setInitiateNewGame}
                />
            }

            <main className={styles.homepageMain}>
                <h1>Math Fact Missions</h1>
                <Image className={styles.homePageImage} src="/rocketShip.png" width="350px" height="250px" alt="spaceship blasting off into space"></Image> <br />
                
                <button className={`mainButton ${styles.homePageBtn}`}
                    onClick={() => {
                        play();
                        setInitiateNewGame(true);
                    }}
                ><span>New Adventure</span></button>
                
                <br />
                <Link href='/continueGame'>
                    <button
                        className={`mainButton ${styles.homePageBtn}`}
                        onClick={() => play()}
                    ><span>Continue</span></button>
                </Link>
                <br />
                <Link href='/about'>
                    <button
                        className={`mainButton ${styles.homePageBtn}`}
                        onClick={() => play()}
                    ><span>About</span></button>
                </Link>
                    <br /><br />
                <form action="/api/practiceRoute">
                    <input type="text" name="text"/>
                    <button type="submit">submit</button>
                </form>

                <p className={styles.message}>Battle to progress through the levels. Train if you need practice. See how you rank against other players or add friends to create a customized scoreboard and become a math fact champion!</p>
            </main>
        </>
    )
}

export default HomePage