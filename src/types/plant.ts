type Plant = {
    id: number | string;
    name: string;
    category: string;
    watering: Watering;
};

enum Watering {
    NeedWater = 'Need Water',
    Watered = 'Watered'
}

export type { Plant };
export { Watering };