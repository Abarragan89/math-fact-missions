import Head from 'next/head';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import styles from '../styles/homePage/index.module.css';
import styles2 from '../styles/chooseGame/chooseGame.module.css';
import { FaTrash } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import useSound from 'use-sound';

function ContinueGame() {
    // Set up Sound
    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })
    const [deleteGameSound] = useSound('/sounds/deleteGame.wav', {
        volume: .4
    })

    const [activeGameData, setActiveGameData] = useState<object[]>(null)
    // IndexDB setup /////////////////////////
    useEffect(() => {
        const indexedDB = window.indexedDB
        const request = indexedDB.open('GameDatabase', 1);
        request.onerror = (event: object) => {
            console.error('An error occurred saving your game.')
            console.error(event);
        }
        // query all the data to show in the continue
        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction('activeGames', 'readwrite');
            const store = transaction.objectStore('activeGames');

            let data = store.getAll();
            data.onsuccess = (event) => {
                setActiveGameData((event.target as IDBRequest).result)
            }
        }
    }, [])

    async function deleteGame(e, username: string) {
        // make sure the correct item was clicked so when we remove from UI, it removes the correct item through DOM traverse
        // delete from database
        const indexedDB = window.indexedDB;
        const request = indexedDB.open('GameDatabase', 1);
        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction('activeGames', 'readwrite')
            const objectStore = transaction.objectStore('activeGames')
            // target specific field for search
            const searchIndex = objectStore.index('name');
            searchIndex.get(username).onsuccess = function (event) {
                const obj = ((event.target as IDBRequest).result);
                objectStore.delete(obj.name)
            }
        }
        // remove from UI
        if (e.target.tagName === 'path') {
            const divElement = e.target.parentNode.parentNode.parentNode
            divElement.style.display = 'none';
        } else {
            const divElement = e.target.parentNode.parentNode
            divElement.style.display = 'none';
        }
    }
    async function confirmDelete(e, username: string) {
        const message = 'Are you sure you want to delete? This is irreversible.'
        const confirmation = confirm(message)
        if (confirmation) {
            deleteGameSound();
            deleteGame(e, username.toLowerCase())
            deleteUserFromMongo(username.toLowerCase())
        }
    }
    async function deleteUserFromMongo(username: string) {
        await fetch(`/api/deleteUser`, {
            method: "DELETE",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username }),
        })
    }

    return (
        <>
            <Head>
                <title>Active Missions</title>
            </Head>
            {activeGameData &&
                <main className={styles.homepageMain}>
                    <Header
                        text='Active Missions'
                        inGame={false}
                    />
                    <Link href='/'><p onClick={() => play()} className={styles2.hollowBtn}>Back</p></Link>
                    {activeGameData.map((data: any, index: number) => (
                        <div key={index} className={`${styles.continueGameDiv} flex-box-sb-wrap`}>
                            <div className={`${styles.gameInfoDiv} flex-box-sb-wrap`}>
                                <p>{data.display_name}</p>
                            </div>
                            <Link href={{
                                pathname: `/welcomePage`,
                                query: {
                                    username: data.display_name,
                                }
                            }}>
                                <h3
                                    onClick={() => play()}
                                ><FaPlay /></h3>
                            </Link>
                            <button>
                                <FaTrash onClick={(e) => confirmDelete(e, data.display_name)} />
                            </button>
                        </div>
                    ))}
                </main>
            }
        </>
    )
}

export default ContinueGame