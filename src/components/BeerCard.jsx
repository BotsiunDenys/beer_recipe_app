import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BeerCard = (props) => {
  const navigate = useNavigate();
  const { recipe, setElementsToDelete, elementsToDelete } = props;
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setIsSelected((prev) => !prev);
    if (!elementsToDelete.includes(recipe)) {
      setElementsToDelete((prev) => [...prev, recipe]);
    }
    if (isSelected) {
      const el = elementsToDelete.find((item) => item.id === recipe.id);
      const newArray = elementsToDelete.filter((item) => item.id !== el.id);
      setElementsToDelete(newArray)
    }
  };

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      className={`flex cursor-pointer gap-10 transition-colors rounded-lg p-10 shadow-md ${
        isSelected
          ? "bg-red-300 hover:bg-red-500"
          : "bg-white hover:bg-slate-50"
      }`}
    >
      <img src={recipe.image_url} className=" h-56 w-24" />
      <div className="flex flex-col max-w-[300px] min-h-[100%]">
        <strong>{recipe.name}</strong>
        <i>{recipe.tagline}</i>
      </div>
    </div>
  );
};

export default BeerCard;
