import styles from '../styles/newGameModal/newGameModal.module.css';
import useSound from 'use-sound';

function EndTrainingModal({
    currentScore, 
    newHighscore,
}) {

    const [play]  = useSound('/sounds/buttonClick.wav')

    return (
        <>
            <section className={`${styles.modalContainer}`}>
                <div className={`${styles.endGameModal}`}>
                    {newHighscore ? <h2>New Highscore!!</h2>  : <h2>Game Over.</h2>}
                    <h3>score: {currentScore}</h3>
                    <div className='flex-box-se-wrap'>
                        <p onClick={() => {
                            play();
                            window.location.reload();
                        }}
                            className='mainButton mr-5 ml-5'
                        ><span>Missions</span></p>
                    </div>
                </div>
            </section>
        </>
    )
}
export default EndTrainingModal;