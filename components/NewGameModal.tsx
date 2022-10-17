import { useState, useRef, useEffect } from 'react';
import styles from '../styles/newGameModal/newGameModal.module.css';
import styles2 from '../styles/chooseGame/chooseGame.module.css';
import useSound from 'use-sound';

function NewGameModal({ modalTriggered, setModalTriggered }) {
    // Set up Sound
    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })
    const [username, setUsername] = useState<string>('');
    // const isSuccessful = useRef<boolean>(false)
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false)
    const inputEl = useRef<HTMLInputElement>(null);
    const errorText = useRef<HTMLBodyElement>(null);


    // save user data to indexedDB
    async function addNewUserGame(name: string, e?) {
        name = name.trim();
        if (e) {
            e.preventDefault()
        }
        const indexedDB = window.indexedDB;
        const request = indexedDB.open('GameDatabase', 1);
        request.onerror = function (event) {
            console.error('An error occurred saving your game.')
            console.error(event)
        }
        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction('activeGames', 'readwrite');
            const store = transaction.objectStore('activeGames');
            // check to see if name already exists
            const searchIndex = store.index('name');
            searchIndex.get(name.toLowerCase().trim()).onsuccess = (event) => {
                if ((event.target as IDBRequest).result) {
                    setIsSuccessful(false)
                    inputEl.current.select();
                    errorText.current.innerHTML = 'Sorry, that name is already taken'
                } else if (name === '') {
                    setIsSuccessful(false)
                    inputEl.current.select();
                    errorText.current.innerHTML = 'You need to enter a name'
                } else {
                    setIsSuccessful(true)
                    // Adding Data
                    store.put({
                        display_name: name.trim(),
                        name: name.toLowerCase().trim(),
                        games:
                            [{
                                operations: 'multiplication',
                                level: 1,
                                highscore: 0,
                                finalHighscore: 0,
                                game1Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game2Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game3Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                            },
                            {
                                operations: 'division',
                                level: 1,
                                highscore: 0,
                                finalHighscore: 0,
                                game1Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game2Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game3Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                            },
                            {
                                operations: 'addition',
                                level: 1,
                                highscore: 0,
                                finalHighscore: 0,
                                game1Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game2Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game3Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                            },
                            {
                                operations: 'subtraction',
                                level: 1,
                                highscore: 0,
                                finalHighscore: 0,
                                game1Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game2Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game3Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                            }]
                    })
                    window.location.replace(`/chooseGame?username=${name}`)
                }
            }
        }
    }

    useEffect(() => {
        // focus on input element
        inputEl.current.focus();
    }, [])

    // add user to MongoDB database
    async function newUserToMongo(username: string) {
        const data = await fetch(`http://localhost:3000/api/addNewUser`, {
            method: "POST",
            body: JSON.stringify(username),
            headers:
            {
                "Content-Type": "application/json"
            }
        })
    }
    return (
        <section className={`${styles.modalContainer}`}>
            <div>
                <h2>Enter Name</h2>
                <form className={styles.formEl} onSubmit={ async (e) => {
                    play();
                    await newUserToMongo(username);
                    addNewUserGame(username);
                }}>
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        type='text'
                        ref={inputEl}
                    />
                </form>
                <br />
                {/* Error message */}
                <span className={styles.errorMsg} ref={errorText}></span>
                <br />
                <button
                    type='submit'
                    onClick={ async (e) => {
                        play();
                        await newUserToMongo(username);
                        addNewUserGame(username, e);
                    }}
                    className='mainButton mt-5 mb-5'
                ><span>Let&apos;s Go!</span></button>
                <br />
                <button
                    className={styles.btn}
                    onClick={() => {
                        setModalTriggered(false);
                        play();
                    }}
                ><p className={styles2.hollowBtn}>Back</p></button>
            </div>
        </section>
    )
}

export default NewGameModal