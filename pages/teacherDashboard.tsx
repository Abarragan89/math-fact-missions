import useSound from 'use-sound';

function TeacherDashboard() {

    // Set up Sound
    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })

    return (
        <main>
            <p>Teacher Dashboard</p>

        </main>
    )
}

export default TeacherDashboard;