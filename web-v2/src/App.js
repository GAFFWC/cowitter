import LoginWithGoogle from "./components/Google";
import LoginWithKakao from "./components/Kakao";

function App() {
    return (
        <div className="App">
            <LoginWithKakao />
            <LoginWithGoogle />
        </div>
    );
}

export default App;
