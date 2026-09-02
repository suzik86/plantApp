import { Plant } from '../types/plant';
import PlantItem from './PlantItem';

type PlantListProps = {
    plants: Plant[];
    onWater: (id: number | string) => void;
};

function PlantList({ plants, onWater }: PlantListProps) {
    
    return(
        <div className="plant-list">
            {plants.map((plant) => (
                <PlantItem key={plant.id} {...plant} onWater={() => onWater(plant.id)} />
            ))}
        </div>
    )
}

export default PlantList;