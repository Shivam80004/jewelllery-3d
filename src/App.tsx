
import Canvas from './experience/Canvas.jsx'
import PaginationUI from './components/PaginationUI.js';
import Loader from './components/Loader.js';

export default function App() {

  return (
    <>
      <section className="w-full h-full min-h-fit flex md:flex-row flex-col  ">
        <Loader>
          {" "}
          <Canvas />
        </Loader>
        <div className="md:w-[45vw] min-h-fit w-full md:h-full h-[50vh] flex flex-col justify-center items-center">
          <PaginationUI />
        </div>
      </section>
    </>
  );
}


