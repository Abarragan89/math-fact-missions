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
    const { username } = router.query

    const inputEl = useRef(null)
    const friendName = useRef<string>('')
    const [friendFound, setFriendFound] = useState(null);
    const [addedFriend, setAddedFriend] = useState<number>(0);
    const [user, setUser] = useState(null);

    async function searchMongo(searchName) {
        searchName = searchName.toLowerCase();
        const data = await fetch(`/api/getUser?name=${searchName}`, {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        const res = await data.json();
        console.log(await res)
        return res;
    }
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
    console.log('user', user)

    async function searchFriends(e) {
        friendName.current = e.target.value
        setFriendFound(await searchMongo(friendName.current))
    }
    useEffect(() => {
        if (username) {
            getUserData(username)
        }
    }, [username, addedFriend])

    async function addFriend(username, friendName) {
        friendName = friendName.toLowerCase();
        await fetch(`/api/addFriend`, {
            method: "POST",
            body: JSON.stringify({
                username,
                friendName
            }),
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        setAddedFriend(addedFriend + 1)
    }

    async function removeFriendMongoDB(friendName: string, username) {
        friendName = friendName.toLowerCase();
        await fetch(`/api/deleteFriend`, {
            method: "PUT",
            body: JSON.stringify({
                username,
                friendName
            }),
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        setAddedFriend(addedFriend + 1)

    }

    function removeFriend(friendName: string) {
        const message = 'Are you sure you want to remove this friend? This is irreversible.'
        const confirmation = confirm(message)
        if (confirmation) {
            removeFriendMongoDB(friendName, username)
        }
    }

    return (
        <main className={styles2.lobbyMain}>
            <Header
                text='Find Friends'
                inGame={false}
            />
            <Link href={`/chooseGame?username=${username}`}><p onClick={() => play()} className={styles3.hollowBtn}>Back</p></Link>

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
                            <p className={styles.foundFriend}>{friendFound.name}</p>
                            {user.friends.includes(friendFound) ?
                                <p onClick={() => addFriend(user.name, friendFound.name)}>Friended</p>
                                :
                                <button className={styles.addFriendBtn} onClick={() => addFriend(user.name, friendFound.name)}>Add</button>
                            }
                        </div>
                    }
                </div>

                {/* friend list */}
                <div>
                    <h2 className={styles.subtitle}>Friends</h2>
                    {user &&
                        user.friends.map((friend: string, index: number) =>
                            <div key={index}>
                                <ul>
                                    <div className={styles.friendList} key={index}>
                                        <li>{friend}</li>
                                        <button onClick={() => removeFriend(friend)}>Remove</button>
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