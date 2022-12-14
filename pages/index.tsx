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
    useEffect(() => {
        const indexedDB = window.indexedDB
        // the result of this open isrequest.result is an instance of the database
        const request = indexedDB.open('GameDatabase', 1);
        request.onerror = (event: object) => {
            console.error('An error occurred saving your game. Please allow IndexedDb.')
            console.error(event);
        }

        // Schema
        request.onupgradeneeded = () => {
            const db = request.result;
            const store = db.createObjectStore('activeGames', { keyPath: 'name' });
            store.createIndex('display_name', 'display_name', {unique: true })
            store.createIndex('name', 'name', { unique: true });
            store.createIndex('games', ['games'])
        }
    }, [])

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
                <p className={styles.message}>Battle to progress through the levels. Train if you need practice. See how you rank against other players or add friends to create a customized scoreboard and become a math fact champion!</p>
            </main>
        </>
    )
}

export default HomePage