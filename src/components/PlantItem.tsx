import { Plant, Watering } from '../types/plant';
import { useState } from 'react';

function PlantItem({ id, name, category, watering, onWater }: Plant & { onWater: (id: number | string) => void }) {
    const [plant, setPlant] = useState<Plant>({ id, name, category, watering });

    const needWatering = plant.watering === Watering.NeedWater;

    const handleWater = () => {
        setPlant((currentPlant) => ({
            ...currentPlant,
            watering: Watering.Watered,
        }));
        onWater(id);
    };

    return (
        <div className="plant-item">
            <h2>{plant.name}</h2>
            <p>{plant.category}</p>
            <p>{plant.watering}</p>
            <button onClick={handleWater} disabled={!needWatering}>
                {needWatering ? 'Water' : 'Watered'}
            </button>
        </div>
    );
}

export default PlantItem;