import { useState } from 'react';
import { Watering, Plant } from '../types/plant';
import type { FormEvent } from 'react';


function AddPlantForm({ onAddPlant }: { onAddPlant: (plant: Omit<Plant, 'id'>) => void }) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [watering, setWatering] = useState(Watering.NeedWater);

    const validateForm = () => {
        if (!name.trim() || !category.trim()) {
            alert('All fields are required');
            return false;
        }
        return true;
    };
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        onAddPlant({ name, category, watering });        
        setName('');
        setCategory('');
        setWatering(Watering.NeedWater);
    };
    return (
        <form className="add-plant-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Plant Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" name="category" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <select name="watering" value={watering} onChange={(e) => setWatering(e.target.value as Watering)}>
                <option value={Watering.NeedWater}>Need Water</option>
                <option value={Watering.Watered}>Watered</option>
            </select>
            <button type="submit">Add Plant</button>
        </form>
    );
}

export default AddPlantForm;