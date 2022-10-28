import { ReactNode, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import LeaderBoard from '../components/leaderBoard';
import styles from '../styles/leaderBoard/leaderBoard.module.css';
import styles2 from '../styles/gameLobby/gameLobby.module.css'
import button from '../styles/homePage/index.module.css';
import styles3 from '../styles/chooseGame/chooseGame.module.css';
import Header from '../components/Header';
import useSound from 'use-sound';

function Friends() {
    // Set up Sound
    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })

    const router = useRouter();
    const { username } = router.query
    const [user, setUser] = useState<string>(null)
    const [showBoard, setShowBoards] = useState<string>('');
    const [showFriendBoards, setShowFriendBoards] = useState<boolean>(false);
    const [operation, setOperation] = useState<string>('multiplication');
    const [gameType, setGameType] = useState<string>('game1Highscore');
    const [level, setLevel] = useState<string>('0');
    const [rankings, setRankings] = useState(null)
    const [indexedDBName, setindexedDBName] = useState<string>(null);

    // Get global ranks
    async function getGlobalScoreboard(e) {
        e.preventDefault();
        const data = await fetch(`/api/getGlobalScoreboard?level=${level}&operation=${operation}&gameType=${gameType}`, {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        const fullfilledPromise = await data.json()
        setRankings(fullfilledPromise)
    }

    ////////////////// friend scoreboard  Logic///////////
    // Get user Data from indexedDB first so users can't hack into mongo through URL
    // if name exists in indexedDB, then access mongoDB
    useEffect(() => {
        if (username) {
            const indexedDB = window.indexedDB;
            const request = indexedDB.open('GameDatabase', 1);
            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction('activeGames', 'readonly')
                    .objectStore('activeGames')
                    .index('display_name');
                const keyRange = IDBKeyRange.only(username);
                // Set up the request query
                const cursorRequest = transaction.openCursor(keyRange);
                cursorRequest.onsuccess = (event: any) => {
                    setindexedDBName(event.target.result.value.name)
                }
            }
        }
    }, [username])

    //  Get ranks among friends
    async function getFriendScoreboard(e) {
        e.preventDefault();
        const data = await fetch(`/api/getFriendScoreboard?level=${level}&operation=${operation}&gameType=${gameType}&name=${indexedDBName}`, {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        const fullfilledPromise = await data.json()
        setRankings(fullfilledPromise)
    }

    return (
        <main className={styles2.lobbyMain}>
            <Header
                text={`${showBoard} Ranks`}
                inGame={false}
            />
            <Link href={`/welcomePage?username=${username}`}><p onClick={() => play()} className={styles3.hollowBtn}>Back</p></Link>
            {showBoard === 'Global' ?
                <div className={styles.leaderBoardForm}>
                    <form onSubmit={(e) => getGlobalScoreboard(e)}>
                        <div className='flex-box-se'>
                            <select onChange={(e) => {
                                setRankings(null);
                                setOperation(e.target.value);
                            }} name="operation" id="operation">
                                <option value="multiplication">Multiplication</option>
                                <option value="division">Division</option>
                                <option value="addition">Addition</option>
                                <option value="subtraction">Subtraction</option>
                            </select>
                            <select onChange={(e) => {
                                setRankings(null);
                                setGameType(e.target.value);
                            }} name="game" id="game">
                                <option value="game1Highscore">Alien Invasion</option>
                                <option value="game2Highscore">Space Race</option>
                                <option value="game3Highscore">Apocolypse</option>
                                <option value="finalHighscore">Final Battle</option>
                            </select>
                            <select onChange={(e) => {
                                setRankings(null);
                                setLevel(e.target.value)
                            }} name="level" id="level">
                                <option value="0">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option value="3">4</option>
                                <option value="4">5</option>
                                <option value="5">6</option>
                                <option value="6">7</option>
                                <option value="7">8</option>
                                <option value="8">9</option>
                                <option value="9">10</option>
                                <option value="10">11</option>
                                <option value="11">12</option>
                            </select>
                        </div>
                        <button type='submit'>Launch</button>
                    </form>
                    <div className={styles.scoreBoard}>
                        {rankings &&
                            rankings.user.map((player, index: number) =>
                                <div key={index} className={`${styles.scoreboardRow} flex-box-sa`}>
                                    <p>{index + 1}. {player.displayName}</p>
                                    {gameType === 'finalHighscore' ?
                                        <p>{player.games[operation][gameType]}</p>
                                        :
                                        <p>{player.games[operation][gameType][level]}</p>
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                :
                showFriendBoards ?
                    <div className={styles.leaderBoardForm}>
                        <form onSubmit={(e) => getFriendScoreboard(e)}>
                            <div className='flex-box-se'>
                                <select onChange={(e) => {
                                    setRankings(null);
                                    setOperation(e.target.value);
                                }} name="operation" id="operation">
                                    <option value="multiplication">Multiplication</option>
                                    <option value="division">Division</option>
                                    <option value="addition">Addition</option>
                                    <option value="subtraction">Subtraction</option>
                                </select>
                                <select onChange={(e) => {
                                    setRankings(null);
                                    setGameType(e.target.value);
                                }} name="game" id="game">
                                    <option value="game1Highscore">Alien Invasion</option>
                                    <option value="game2Highscore">Space Race</option>
                                    <option value="game3Highscore">Apocolypse</option>
                                    <option value="finalHighscore">Final Battle</option>
                                </select>
                                <select onChange={(e) => {
                                    setRankings(null);
                                    setLevel(e.target.value)
                                }} name="level" id="level">
                                    <option value="0">1</option>
                                    <option value="1">2</option>
                                    <option value="2">3</option>
                                    <option value="3">4</option>
                                    <option value="4">5</option>
                                    <option value="5">6</option>
                                    <option value="6">7</option>
                                    <option value="7">8</option>
                                    <option value="8">9</option>
                                    <option value="9">10</option>
                                    <option value="10">11</option>
                                    <option value="11">12</option>
                                </select>
                            </div>
                            <button type='submit'>Launch</button>
                        </form>
                        <div className={styles.scoreBoard}>
                            {rankings &&
                                rankings.user.friends.map((player, index: number) =>
                                    <div key={index} className={`${styles.scoreboardRow} flex-box-sa`}>
                                        <p>{index + 1}. {player.displayName}</p>
                                        {gameType === 'finalHighscore' ?
                                            <p>{player.games[operation][gameType]}</p>
                                            :
                                            <p>{player.games[operation][gameType][level]}</p>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    :
                    <div className={styles.mainButtonDiv}>
                        <button
                            className={`mainButton ${button.homePageBtn}`}
                            onClick={() => {
                                play();
                                setShowBoards('Global');
                            }}
                        ><span>Global</span>
                        </button>
                        <button
                            className={`mainButton ${button.homePageBtn}`}
                            onClick={() => {
                                play();
                                setShowFriendBoards(true);
                                setShowBoards('Friend');
                            }}
                        ><span>Friends</span>
                        </button>
                    </div>

            }


        </main>
    )
}

export default Friends;