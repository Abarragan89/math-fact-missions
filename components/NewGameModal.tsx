import { useState, useRef, useEffect } from 'react';
import styles from '../styles/newGameModal/newGameModal.module.css';
import styles2 from '../styles/chooseGame/chooseGame.module.css';
import useSound from 'use-sound';
const path = require('path');


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
    async function addNewUserGame(name: string) {
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
                        friends: [],
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
                    window.location.replace(`/welcomePage?username=${name}`)
                }
            }
        }
    }

    useEffect(() => {
        // focus on input element
        inputEl.current.focus();
    }, [])


    // add user to MongoDB database
    async function newUserToMongo(name: string, e) {
        name = name.trim();
        if (e) {
            e.preventDefault()
        }
        if (name === '') {
            setIsSuccessful(false)
            inputEl.current.select();
            errorText.current.innerHTML = 'You need to enter a name';

        } else {
            // check to see if name is available in Database
            const fetchRequest = await fetch(`/api/addNewUser`, {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name }),
            })
            const data = await fetchRequest.json();
            // If name is not available, then fail and send message
            if (data.error) {
                setIsSuccessful(false)
                inputEl.current.select();
                errorText.current.innerHTML = 'Sorry, that name is already taken'
            } else {
                // If name is available, then save it to indexedDB
                setIsSuccessful(true)
                await addNewUserGame(name)
            }
        }
    }
    return (
        <section className={`${styles.modalContainer}`}>
            <div>
                <h2>Enter Name</h2>
                <form className={styles.formEl} onSubmit={(e) => {
                    play();
                    newUserToMongo(username, e);
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
                    onClick={(e) => {
                        play();
                        newUserToMongo(username, e)
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