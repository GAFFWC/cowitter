import LoginWithGoogle from "./components/Google";
import LoginWithKakao from "./components/Kakao";

function App() {
    console.log(process.env);
    return (
        <div className="App">
            <LoginWithKakao />
            <LoginWithGoogle />
        </div>
    );
}

export default App;
