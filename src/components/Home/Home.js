import video from '../../assets/videoBackground.mp4'

function Home() {
    return (
        <>
            <video
                className='videoBackground'
                src={video}
                autoPlay
                muted
                loop
            />
            <div className='titleWev'>
                <h1>Get to know your customers with forms worth filling out</h1>
                <p>Collect all the data you need to understand customers with forms designed to be refreshingly different.</p>
                <button type="button" class="btn btn-outline-dark">Get started-it's free</button>
            </div>
        </>
    );
}

export default Home;