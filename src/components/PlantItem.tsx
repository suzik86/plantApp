import { Plant, PlantFormData, Watering } from '../types/plant';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

function PlantItem({ id, name, category, watering, onWater, onDelete, onEdit }: Plant & { onWater: (id: number | string) => void, onDelete: (id: number | string) => void, onEdit: (plant: Plant) => void }) {
    const [draft, setDraft] = useState<PlantFormData>({ name, category, watering });
    const [isEditing, setIsEditing] = useState(false);

    const needWatering = watering === Watering.NeedWater;

    const handleWater = () => onWater(id);
    const handleEdit = () => {
        if (!isEditing) {
            setDraft({ name, category, watering });
        }
        setIsEditing((isCurrentlyEditing) => !isCurrentlyEditing);
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, name: event.target.value });
    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, category: event.target.value });
    const handleWateringChange = (event: ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, watering: event.target.value as Watering });

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedDraft: PlantFormData = {
            name: draft.name.trim(),
            category: draft.category.trim(),
            watering: draft.watering,
        };
        if (!trimmedDraft.name || !trimmedDraft.category || !trimmedDraft.watering) {
            alert('All fields are required');
            return;
        }
        onEdit({ id, ...trimmedDraft });
        setDraft(trimmedDraft);
        setIsEditing(false);
    };

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <div className="plant-item">
            <div className='edit-btn-container'>
                <button onClick={handleEdit} className='edit-btn'>Edit</button>
            </div>   
            {isEditing && (
                <form className='edit-plant-form' onSubmit={handleSave}>
                    <input type="text" value={draft.name} onChange={handleNameChange} />
                    <input type="text" value={draft.category} onChange={handleCategoryChange} /> 
                    <input type="text" value={draft.watering} onChange={handleWateringChange} />
                    <button type="submit">Save</button>
                </form>
            )}
            <h2>{name}</h2>
            <p>{category}</p>
            <p>{watering}</p>
            <div className='button-container'>
                <button onClick={handleWater} disabled={!needWatering}>
                    {needWatering ? 'Water' : 'Watered'}
                </button>
                <button onClick={handleDelete} className='delete-btn'>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default PlantItem;