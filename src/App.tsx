import './App.css';
import { useEffect, useState } from 'react';
import Counter from './components/Counter';
import AddPlantForm from './components/AddPlantForm';
import PlantList from './components/PlantList';
import ProductList from './components/ProductList';
import { Plant, Watering } from './types/plant';


const plants = [
  { id: 1, name: 'Aloe Vera', category: 'Succulent', watering: Watering.NeedWater },
  { id: 2, name: 'Spider Plant', category: 'Houseplant', watering: Watering.Watered },
  { id: 3, name: 'Peace Lily', category: 'Flowering', watering: Watering.NeedWater },
];

function App() {
  const [plantList, setPlantList] = useState<Plant[]>(() => {
    const storedPlants = localStorage.getItem('plants');
    if (!storedPlants) {
      return plants;
    }
    try {
      return JSON.parse(storedPlants);
    } catch {
      return plants;
    }
  });

  useEffect(() => {
    localStorage.setItem('plants', JSON.stringify(plantList));
  }, [plantList]);

  const waterPlant = (id: number | string) => {
    setPlantList((prevPlantList) =>
      prevPlantList.map((plant) =>
        plant.id === id ? { ...plant, watering: Watering.Watered } : plant
      )
    );
  };

  const addPlant = (plant: Omit<Plant, 'id'>) => {
    setPlantList((prevPlantList) => [
      ...prevPlantList,
      { id: crypto.randomUUID(), ...plant },
    ]);
  };

  const deletePlant = (id: number | string) => {
    setPlantList((prevPlantList) => prevPlantList.filter((plant) => plant.id !== id));
  };

  const updatePlant = (updatedPlant: Plant) => {
    setPlantList((prevPlantList) =>
      prevPlantList.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Plant App</h1>
      </header>
      <main>
        <Counter></Counter>
        <PlantList plants={plantList} onWater={waterPlant} onDelete={deletePlant} onEdit={updatePlant} />
        <AddPlantForm onAddPlant={(plant: Omit<Plant, 'id'>) => addPlant(plant)}/>
        <ProductList></ProductList>
      </main>
    </div>
  );
}

export default App;
