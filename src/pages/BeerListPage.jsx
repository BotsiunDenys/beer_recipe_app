import { useEffect, useState } from "react";
import { useBeerStore } from "../store/store";
import BeerCard from "../components/BeerCard";

const BeerListPage = () => {
  const {
    fetchRecipes,
    renderBeerList,
    deleteElements,
    fullBeerList,
    increasePageNum,
    isLoading,
    error,
  } = useBeerStore((state) => ({
    fetchRecipes: state.fetchRecipes,
    renderBeerList: state.renderBeerList,
    deleteElements: state.deleteElements,
    fullBeerList: state.fullBeerList,
    increasePageNum: state.increasePageNum,
    isLoading: state.isLoading,
    error: state.error,
  }));
  const [elementsToDelete, setElementsToDelete] = useState([]);
  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (!fullBeerList.length) {
      increasePageNum()
      fetchRecipes();
    }
  }, [fullBeerList])

  const handleDelete = () => {
    deleteElements(elementsToDelete);
    setElementsToDelete([]);
  };
  return (
    <main className="flex flex-col gap-5 min-h-screen justify-center items-center py-10 bg-[rgb(243,245,247)] relative">
      {elementsToDelete.length ? (
        <button
          onClick={handleDelete}
          className=" p-3 bg-red-500 hover:bg-red-600 fixed top-5 left-5 rounded-md"
        >
          Delete selected
        </button>
      ) : null}
      {isLoading && <h1 className="text-3xl font-bold">Loading...</h1>}
      {error && <h1 className="text-3xl font-bold text-red-600">{error}</h1>}
      <h1 className="text-3xl font-bold">Beer recipes</h1>
      <section className="flex flex-col gap-10">
        {renderBeerList.map((recipe) => (
          <BeerCard
            elementsToDelete={elementsToDelete}
            setElementsToDelete={setElementsToDelete}
            recipe={recipe}
            key={recipe.id}
          />
        ))}
      </section>
    </main>
  );
};

export default BeerListPage;
