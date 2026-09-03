import { useState } from 'react';
import { Watering, PlantFormData } from '../types/plant';
import type { ChangeEvent, FormEvent } from 'react';


function AddPlantForm({ onAddPlant }: { onAddPlant: (plant: PlantFormData) => void }) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [watering, setWatering] = useState(Watering.NeedWater);

    const validateForm = () => {
        if (!name.trim() || !category.trim() || !watering) {
            alert('All fields are required');
            return false;
        }
        return true;
    };
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);
    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => setCategory(event.target.value);
    const handleWateringChange = (event: ChangeEvent<HTMLSelectElement>) => setWatering(event.target.value as Watering);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        onAddPlant({ name: name.trim(), category: category.trim(), watering });
        setName('');
        setCategory('');
        setWatering(Watering.NeedWater);
    };
    return (
        <form className="add-plant-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Plant Name" value={name} onChange={handleNameChange} />
            <input type="text" name="category" placeholder="Category" value={category} onChange={handleCategoryChange} />
            <select name="watering" value={watering} onChange={handleWateringChange}>
                <option value={Watering.NeedWater}>Need Water</option>
                <option value={Watering.Watered}>Watered</option>
            </select>
            <button type="submit">Add Plant</button>
        </form>
    );
}

export default AddPlantForm;