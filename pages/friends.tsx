import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/friends/friends.module.css'
import styles2 from '../styles/gameLobby/gameLobby.module.css';
import styles3 from '../styles/chooseGame/chooseGame.module.css';
import Header from '../components/Header';
import useSound from 'use-sound';

function Friends() {
    // Set up Sound
    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })

    const router = useRouter();
    let { username } = router.query

    const inputEl = useRef(null)
    const friendName = useRef<string>('')
    const [friendFound, setFriendFound] = useState(null);
    const [addedFriend, setAddedFriend] = useState<number>(0);
    const [indexedDBName, setindexedDBName] = useState<string>(null);
    const [user, setUser] = useState<any>(null)


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

    // Search mongo for users on keypress
    async function searchMongo(searchName: string) {
        searchName = searchName.toLowerCase();
        const data = await fetch(`/api/getUser?name=${searchName}`, {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        const res = await data.json();
        if (res.user === null) {
            return;
        } else {
            setFriendFound(res)
        }
    }

    // Search mongo for User info after confirmed with indexedDB
    async function getUserData(searchName) {
        searchName = searchName;
        const data = await fetch(`/api/getUser?name=${searchName}`, {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        const res = await data.json();
        console.log(res)
        setUser(res);
    }

    async function searchFriends(e) {
        friendName.current = e.target.value
        await searchMongo(friendName.current)
    }

    useEffect(() => {
        // get the user from MongoDB only if it exists in indexedDB
        if (indexedDBName) {
            getUserData(indexedDBName)
        }
    }, [indexedDBName, addedFriend])

    async function addFriend(user, friendID) {
        await fetch(`/api/addFriend`, {
            method: "POST",
            body: JSON.stringify({
                user,
                friendID
            }),
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        setAddedFriend(addedFriend + 1)
    }

    async function removeFriendMongoDB(friendID: string, username: string) {
        await fetch(`/api/deleteFriend`, {
            method: "PUT",
            body: JSON.stringify({
                username,
                friendID
            }),
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        setAddedFriend(addedFriend + 1)
    }

    function removeFriend(friendID: string) {
        const message = 'Are you sure you want to remove this friend? This is irreversible.'
        const confirmation = confirm(message)
        if (confirmation) {
            removeFriendMongoDB(friendID, indexedDBName)
        }
    }

    console.log(user)

    return (
        <main className={styles2.lobbyMain}>
            <Header
                text='Find Friends'
                inGame={false}
            />
            <Link href={`/welcomePage?username=${username}`}><p onClick={() => play()} className={styles3.hollowBtn}>Back</p></Link>

            <div className='flex-box-sa'>
                {/* Search Div */}
                <div className={styles.searchFriendDiv}>
                    <div className='flex-box-sb'>
                        <input
                            onChange={(e) => searchFriends(e)}
                            type="text"
                            ref={inputEl}
                        />
                        <button onClick={(e) => searchFriends(e)}>Find</button>
                    </div>
                    {friendFound && user &&
                        <div className='flex-box-sb'>
                            <p className={styles.foundFriend}>{friendFound.user.name}</p>
                            {user.user.friends.length === 0 ?
                                <button className={styles.addFriendBtn} onClick={() => addFriend(user.user, friendFound.user._id)}>Add</button>
                                :
                                user.user.friends.map((friendObj, index: number) => {
                                    if (friendObj._id === friendFound.user._id) {
                                        return (
                                            <p key={index}>Friended</p>
                                        )
                                    } else if (user.user._id === friendFound.user._id) {
                                        return (
                                            <p key={index}>(You)</p>
                                        )
                                    }
                                    else {
                                        return (
                                            <button className={styles.addFriendBtn} onClick={() => addFriend(user.user, friendFound.user._id)}>Add</button>
                                        )
                                    }
                                })

                            }
                        </div>
                    }
                </div>

                {/* friend list */}
                <div>
                    <h2 className={styles.subtitle}>Friends</h2>
                    {user &&
                        user.user.friends.map((friend, index: number) =>
                            <div key={index}>
                                <ul>
                                    <div className={styles.friendList} key={index}>
                                        <li>{friend.name}</li>
                                        <button onClick={() => removeFriend(friend._id)}>Remove</button>
                                    </div>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        </main>
    )
}

export default Friends;