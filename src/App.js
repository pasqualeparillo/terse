import Intro from "./Intro";
import LinkForm from "./input";
import Header from "./header";

function App() {
  return (
    <div className="min-h-screen relative flex flex-col">
      <Header />
      <Intro />
      <LinkForm />
    </div>
  );
}

export default App;
