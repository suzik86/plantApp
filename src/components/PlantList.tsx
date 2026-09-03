import { Plant } from '../types/plant';
import PlantItem from './PlantItem';

type PlantListProps = {
    plants: Plant[];
    onWater: (id: number | string) => void;
    onDelete: (id: number | string) => void;
    onEdit: (plant: Plant) => void;
};

function PlantList({ plants, onWater, onDelete, onEdit }: PlantListProps) {
    
    return(
        <div className="plant-list">
            {plants.map((plant) => (
                <PlantItem key={plant.id} {...plant} onWater={() => onWater(plant.id)} onDelete={() => onDelete(plant.id)} onEdit={onEdit} />
            ))}
        </div>
    )
}

export default PlantList;