import { useEffect, useState, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import EndGameModal from '../components/endGameModal';
import Link from 'next/link';
import { AppContext } from '../AppContext';
import styles from '../styles/quizStyles/quizStyles.module.css';
import styles2 from '../styles/chooseGame/chooseGame.module.css';
import useSound from 'use-sound';
import Head from 'next/head';

function AdditionQuiz({ startGame, setStartGame, showModal, setShowModal, stopMusic }) {
    // set up correct, incorrect and winning sounds
    const [playFailedMission] = useSound('/sounds/failedGame.wav', {
        volume: .5,
        interrupt: false
    })
    const [playPassedMission] = useSound('/sounds/passedGame.wav', {
        volume: .5,
        interrupt: false
    })
    const [playCalculatorClick] = useSound('/sounds/calculatorClick.wav');
    const [playProblemTimerExpired] = useSound('/sounds/problemTimerExpired.wav');
    const [playCorrectAnswer] = useSound('/sounds/correctAnswer.wav')
    const [playIncorrectAnswer] = useSound('/sounds/wrongAnswer.wav')

    // Data from Context API
    const { numberRange } = useContext(AppContext)

    // Get Data from IndexedDB
    const [highscore, setHighscore] = useState<number>(null)
    // get username from URL to query in IndexedDB
    const router = useRouter();
    const { username, gameType } = router.query
    const [passedLevels, setPassedLevels] = useState<number>(null)
    const [operationType, setOperationType] = useState<string[] | string>('')
    const [winningScore, setWinningScore] = useState<number>(18500)
    const [finalHighscore, setFinalHighscore] = useState<number>(null)

    // retrieve data from database to show appropriate amount of squares
    useEffect(() => {
        if (username && gameType) {
            setOperationType(gameType)
            const indexedDB = window.indexedDB;
            const request = indexedDB.open('GameDatabase', 1);
            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction('activeGames', 'readwrite')
                const objectStore = transaction.objectStore('activeGames')
                // target specific field for search
                const searchIndex = objectStore.index('display_name');
                searchIndex.get(username).onsuccess = function (event) {
                    if (gameType === 'addition') {
                        setPassedLevels((event.target as IDBRequest).result.games[2].level)
                        setHighscore((event.target as IDBRequest).result.games[2].highscore)
                        setFinalHighscore((event.target as IDBRequest).result.games[2].finalHighscore)
                    } else if (gameType === 'subtraction') {
                        setPassedLevels((event.target as IDBRequest).result.games[3].level)
                        setHighscore((event.target as IDBRequest).result.games[3].highscore)
                        setFinalHighscore((event.target as IDBRequest).result.games[3].finalHighscore)
                    }
                }
            }
        }
    }, [username, gameType])

    const inputEl = useRef(null)
    // set up all variables for numbers, answers, responses, and timers
    const [userResponse, setUserResponse] = useState<string>('');
    const [numberOne, setNumberOne] = useState<number>(null);
    const [numberTwo, setNumberTwo] = useState<number>(null);
    const [correctAnswer, setCorrectAnswer] = useState<number>(null);

    // problem timer works better with useRef since it has to quickly reset and hold value
    const problemTimer = useRef<number>(100);
    const [mainTimer, setMainTimer] = useState<number>(100);
    const [currentScore, setCurrentScore] = useState<number>(0);

    // Set up numbers and answers
    function pickRandomNumbers(range: number, operation: string | string[]): void {
        if (operation === 'subtraction') {
            const randomOne = Math.floor(Math.random() * (range / 2) + 1);
            const randomTwo = Math.floor(Math.random() * (range / 2) + 1);
            setNumberOne(Math.max(randomOne, randomTwo));
            setNumberTwo(Math.min(randomOne, randomTwo));
            setCorrectAnswer(Math.max(randomOne, randomTwo) - Math.min(randomOne, randomTwo));

        } else {
            const randomOne = Math.floor(Math.random() * (range / 2) + 1);
            const randomTwo = Math.floor(Math.random() * (range / 2) + 1);
            setNumberOne(randomOne);
            setNumberTwo(randomTwo);
            setCorrectAnswer(randomOne + randomTwo);
        }
    }

    // Don't have focus on keyboard immediately so keyboard on mobile will not appear. 
    // Only after a key is pressed is focused but on the element.
    function focusOnInput() {
        if (inputEl.current) {
            inputEl.current.focus();
        }
    }
    // Set initial values and focus on input EL
    useEffect(() => {
        pickRandomNumbers(numberRange, gameType);
        window.onkeydown = focusOnInput;
    }, [])

    // Set timers. I needed to make a problemTrigger variable to change within the setTimeout
    // of the problem timer. The useRef would cause weird inconsistent renders if it was a 
    // dependecy on the useEffect. I just needed a variable to trigger every 100ms. 
    const [problemTrigger, setProblemTrigger] = useState<boolean>(false);

    useEffect(() => {
        problemTimerControl();
        mainTimerControl();
    }, [problemTrigger])
    


    // check to see if the user reponse is correct. 
    interface eventObj {
        preventDefault: Function
    }
    function assessResponse(e: eventObj): void {
        e.preventDefault();
        const userProduct = parseInt(userResponse);
        if (userProduct === correctAnswer) {
            playCorrectAnswer();
            addToScore();
            setUserResponse('');
            pickRandomNumbers(numberRange, gameType);
            problemTimer.current = 100;
        } else {
            playIncorrectAnswer();
            setUserResponse('')
        }
    }

    // problem timer function
    const [stopProblemTimer, setStopProblemTimer] = useState<boolean>(false)
    function problemTimerControl(): void {
        if (stopProblemTimer) {
            return;
        } else if (problemTimer.current > 0) {
            setTimeout(() => {
                setProblemTrigger(!problemTrigger)
                problemTimer.current--
            }, 100)
        } else {
            playProblemTimerExpired()
            problemTimer.current = 100;
            pickRandomNumbers(numberRange, gameType);
            problemTimerControl();
        }
    }

    // main timer function
    function mainTimerControl(): void {
        if (mainTimer === 0 || currentScore >= winningScore) {
            stopMusic();
            setStopProblemTimer(true);
            endGame();
        } else {
            setTimeout(() => setMainTimer(mainTimer - 1), 1000);
        }
    }

    // Add points to their score
    function addToScore() {
        const pointValue = problemTimer.current * 5
        setCurrentScore(currentScore + pointValue)
    }

    // // Update highscore if new highscore
    function updateHighscore() {
        const indexedDB = window.indexedDB;
        const request = indexedDB.open('GameDatabase', 1);
        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction('activeGames', 'readwrite')
            const objectStore = transaction.objectStore('activeGames')
            // target specific field for search
            const searchIndex = objectStore.index('display_name');
            searchIndex.get(username).onsuccess = function (event) {
                if (gameType === 'addition') {
                    const obj = ((event.target as IDBRequest).result);
                    // set the highscore or final highscore
                    if (numberRange > 90) {
                        obj.games[2].finalHighscore = currentScore
                        updateFinalHighscores()
                    } else {
                        obj.games[2].highscore = currentScore
                    }
                    if (currentScore > winningScore) {
                        playPassedMission();
                        // high score remain high score if on last level. Or else rest to zero
                        numberRange > 90 ? obj.games[2].finalHighscore = currentScore : obj.games[2].highscore = 0;
                        const possiblePromotion = numberRange / 10 + 1
                        obj.games[2].level = Math.max(obj.games[2].level, possiblePromotion);
                        obj.games[2].level > 10 ? obj.games[2].level = 10 : obj.games[2].level = obj.games[2].level;
                        setPassed(true)
                        // update operation level in Mongo
                        updateOperationLevelMongo(obj.games[2].level)
                    }
                    objectStore.put(obj)

                } else if (gameType === 'subtraction') {
                    const obj = ((event.target as IDBRequest).result);
                    // set the highscore or final highscore
                    if (numberRange > 90) {
                        obj.games[3].finalHighscore = currentScore
                        updateFinalHighscores()
                    } else {
                        obj.games[3].highscore = currentScore
                    }
                    if (currentScore > winningScore) {
                        playPassedMission();
                        // high score remain high score if on last level. Or else rest to zero
                        numberRange > 90 ? obj.games[3].finalHighscore = currentScore : obj.games[3].highscore = 0;
                        const possiblePromotion = numberRange / 10 + 1
                        obj.games[3].level = Math.max(obj.games[3].level, possiblePromotion);
                        obj.games[3].level > 10 ? obj.games[3].level = 10 : obj.games[3].level = obj.games[3].level;
                        setPassed(true)
                        // update operation level in Mongo
                        updateOperationLevelMongo(obj.games[3].level)
                    }
                    objectStore.put(obj)
                }
            }
        }
    }

    // update level in operation in Mongo if level passed
    async function updateOperationLevelMongo(gameLevel: number) {
        await fetch(`/api/updateOperationLevel`, {
            method: "PUT",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                gameType,
                gameLevel,
            }),
        })
    }

    // update Final Highscore to MongoDB 
    async function updateFinalHighscores() {
        // operation will be a number that points to its location in the database array
        // Ex. [multiplication, division, addition, subtraction]
        let operation: number;
        if (gameType === 'multiplication') {
            operation = 0
        } else if (gameType === 'division') {
            operation = 1
        } else if (gameType === 'addition') {
            operation = 2
        } else {
            operation = 3
        }
        await fetch(`/api/updateFinalScore`, {
            method: "PUT",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                operation,
                highscore: currentScore
            }),
        })
    }

    // End Game function
    function endGame(): void {
        if (currentScore > highscore) {
            updateHighscore();
        } else {
            playFailedMission()
        }
        setGameHasEnded(true)
    }

    const [gameHasEnded, setGameHasEnded] = useState<boolean>(false)
    const [passed, setPassed] = useState<boolean>(false)

    return (
        <>
            <Head>
                <title>Math Battle</title>
            </Head>
            {gameHasEnded &&
                <EndGameModal
                    passed={passed}
                    currentScore={currentScore}
                    gameType={gameType}
                    username={username}
                    numberRange={numberRange}
                    startGame={startGame}
                    setStartGame={setStartGame}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    winningScore={winningScore}
                />
            }
            <main className={styles.mainQuiz}>
                <h1 onClick={() => setStopProblemTimer(true)}>{gameType}</h1>
                <Link href='/continueGame'>
                    <p className={`${styles2.hollowBtn} ${styles.quitBtn}`}
                        onClick={() => stopMusic()}
                    >Abort</p>
                </Link>
                <div className='flex-box-sa'>
                    <div>
                        <p className={styles.timerLabels} >Problem Timer<br /><span>{problemTimer.current}</span></p>
                    </div>
                    <div>
                        <p className={styles.timerLabels} >Timer<br /><span>{mainTimer}</span></p>
                    </div>
                </div>
                <div className={styles.currentProblem}>
                    <span id='number1'>{numberOne}</span>
                    {gameType === 'subtraction' ?
                        <span>-</span>
                        :
                        <span>+</span>
                    }
                    <span id='number2'>{numberTwo}</span>
                </div>
                <form onSubmit={(e) => assessResponse(e)}>
                    <input
                        type="text"
                        onChange={(e) => setUserResponse(e.target.value)}
                        value={userResponse}
                        ref={inputEl}
                    />
                </form>

                <progress id='file' value={currentScore} max={winningScore}></progress>


                <div className={styles.numberPads}>
                    <div className='flex-box-sa'>
                        <p onClick={() => { setUserResponse(userResponse + '1'), playCalculatorClick() }} className={styles.numberPad}>1</p>
                        <p onClick={() => { setUserResponse(userResponse + '2'), playCalculatorClick() }} className={styles.numberPad}>2</p>
                        <p onClick={() => { setUserResponse(userResponse + '3'), playCalculatorClick() }} className={styles.numberPad}>3</p>
                    </div>
                    <div className='flex-box-sa'>
                        <p onClick={() => { setUserResponse(userResponse + '4'); playCalculatorClick() }} className={styles.numberPad}>4</p>
                        <p onClick={() => { setUserResponse(userResponse + '5'), playCalculatorClick() }} className={styles.numberPad}>5</p>
                        <p onClick={() => { setUserResponse(userResponse + '6'); playCalculatorClick() }} className={styles.numberPad}>6</p>
                    </div>
                    <div className='flex-box-sa'>
                        <p onClick={() => { setUserResponse(userResponse + '7'); playCalculatorClick() }} className={styles.numberPad}>7</p>
                        <p onClick={() => { setUserResponse(userResponse + '8'); playCalculatorClick() }} className={styles.numberPad}>8</p>
                        <p onClick={() => { setUserResponse(userResponse + '9'); playCalculatorClick() }} className={styles.numberPad}>9</p>
                    </div>
                    <div className='flex-box-sa'>
                        <p className={`${styles.numberPad} ${styles.deleteBtn}`} onClick={() => setUserResponse('')}>Clear</p>
                        <p onClick={() => { setUserResponse(userResponse + '0'); playCalculatorClick() }} className={`${styles.numberPad} ${styles.numberPadZero}`}>0</p>
                        <p className={`${styles.numberPad} ${styles.enterBtn}`} onClick={assessResponse}>Enter</p>
                    </div>
                </div>
                <hr />
                <div className='flex-box-sa'>
                    <div>
                        <p className={styles.highScore}>Highscore<br /><span>
                            {
                                numberRange < 100 ?
                                    passedLevels > numberRange / 10 ?
                                        "passed"
                                        :
                                        highscore
                                    :
                                    finalHighscore > winningScore ?

                                        `passed ${finalHighscore}`
                                        :
                                        finalHighscore
                            }
                        </span></p>
                    </div>
                    <div>
                        <p className={styles.highScore}>Score<br /><span>{currentScore}</span></p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdditionQuiz;