import { useParams } from "react-router-dom";
import { useBeerStore } from "../store/store";

const BeerRecipe = () => {
  const { id } = useParams();
  const fullBeerList = useBeerStore((state) => state.fullBeerList);
  const element = fullBeerList.find((item) => item.id == id);
  return (
    <main className="flex gap-16 min-h-screen 2xl:px-96 px-24 py-10 bg-[rgb(243,245,247)]">
      <img src={element.image_url} className=" h-[650px]" />
      <div className="flex flex-col gap-10">
        <strong className="text-3xl">{element.name}</strong>
        <i>{element.tagline}</i>
        <p>Firstly brewed: {element.first_brewed}</p>
        <p>{element.description}</p>
        <ul>
          <li>
            <strong>Pairs with:</strong>
          </li>
          {element.food_pairing.map((element) => (
            <li key={element}>{element}</li>
          ))}
        </ul>
        <p>
          <strong>Brewers tips:</strong> {element.brewers_tips}
        </p>
      </div>
    </main>
  );
};

export default BeerRecipe;
