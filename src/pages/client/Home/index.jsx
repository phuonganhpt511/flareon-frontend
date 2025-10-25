import ListCategory from './components/ListCategory'
import ListProduct from './components/ListProduct'

const Home = () => {
  return (
    <>
      <h1 className="text-4xl font-bold bg-amber-400">Home Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quae corporis fuga aperiam
        consectetur aspernatur harum? Id, quibusdam magnam ut ullam illum sit alias eligendi
        exercitationem voluptatem aspernatur harum velit!
      </p>
      <div className="flex flex-col lg:flex-row gap-4 p-6">
        <div className="w-full lg:w-[200px]">
          <ListCategory />
        </div>
        <div className="w-full flex-1">
          <ListProduct />
        </div>
      </div>
    </>
  )
}

export default Home
