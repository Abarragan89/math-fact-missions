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

    const [user, setUser] = useState(null);
    const [showBoard, setShowBoards] = useState<string>('');
    const [showFriendBoards, setShowFriendBoards] = useState<boolean>(false);
    const [operation, setOperation] = useState<string>('multiplication');
    const [gameType, setGameType] = useState<string>('game1Highscore');
    const [level, setLevel] = useState<string>('0');
    const [rankings, setRankings] = useState(null)


    async function getUserData(searchName) {
        searchName = searchName.toLowerCase();
        const data = await fetch(`/api/getUser?name=${searchName}`, {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        const res = await data.json();
        setUser(res);
    }

    useEffect(() => {
        if (username) {
            getUserData(username)
        }
    }, [username])

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

    //  Get ranks among friends
    async function getFriendScoreboard(e) {
        e.preventDefault();
        const data = await fetch(`/api/getFriendScoreboard?level=${level}&operation=${operation}&gameType=${gameType}`, {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        const fullfilledPromise = await data.json()
        setRankings(fullfilledPromise)
    }
    console.log(rankings)
    return (
        <main className={styles2.lobbyMain}>
            <Header
                text={`${showBoard} Ranks`}
                inGame={false}
            />
            <Link href={`/welcomePage?username=${username}`}><p onClick={() => play()} className={styles3.hollowBtn}>Back</p></Link>
            {showBoard === 'Global' ?
                <>
                    <form onSubmit={(e) => getGlobalScoreboard(e)} className='flex-box-se-wrap'>
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
                            <option value="finalHighscore">Final Score</option>
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
                        <button type='submit'>Go</button>
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
                </>

                :

                showFriendBoards ?
                    <>
                        <form onSubmit={(e) => getGlobalScoreboard(e)} className='flex-box-se-wrap'>
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
                                <option value="finalHighscore">Final Score</option>
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
                            <button type='submit'>Go</button>
                        </form>
                        <div className={styles.scoreBoard}>
                            {rankings &&
                                rankings.user.map((player, index: number) =>
                                    <div key={index} className={`${styles.scoreboardRow} flex-box-sa`}>
                                        <p>{index + 1}. {player.displayName}</p>
                                        {gameType === 'game1Highscore' &&
                                            <p>{player.games.game1Highscore[level]}</p>
                                        }
                                        {gameType === 'game2Highscore' &&
                                            <p>{player.games.game2Highscore[level]}</p>
                                        }
                                        {gameType === 'game3Highscore' &&
                                            <p>{player.games.game3Highscore[level]}</p>
                                        }
                                        {gameType === 'finalHighscore' &&
                                            <p>{player.games.finalHighscore}</p>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </>
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