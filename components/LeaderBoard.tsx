import styles from '../styles/leaderBoard/leaderBoard.module.css';

function LeaderBoard() {
    return (
        <>
            <form>
                <label htmlFor="operation">Choose an Operation</label>
                <select name="operation" id="operation">
                    <option value="multiplication">Multiplication</option>
                    <option value="division">Division</option>
                    <option value="addition">Addition</option>
                    <option value="subtraction">Subtraction</option>
                </select>
            </form>
        </>
    )
}

export default LeaderBoard;