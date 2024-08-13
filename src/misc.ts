export const spawnFood = (food: string) => {
    while (true) {
        const nextPosition = [
            Math.round(Math.random() * 17) + 1,
            Math.round(Math.random() * 11) + 3,
        ];

        if (getTile(nextPosition[0], nextPosition[1]).length == 1) {
            addSprite(nextPosition[0], nextPosition[1], food);
            break;
        }
    }
};
