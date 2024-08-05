declare global {
    function bitmap(template: TemplateStringsArray): Bitmap;
    function map(template: TemplateStringsArray): Map;

    function setLegend(...bitmaps: [string, Bitmap][]): void;
    function setBackground(bitmapKey: string): void;
    function setMap(map: Map): void;
    function setSolids(bitmapKeys: string[]): void;
    function setPushables(pushMap: { [key: string[]]: string }): void;
    function width(): number;
    function height(): number;

    function onInput(button: string, callback: () => void): void;
    function afterInput(callback: () => void): void;

    type Sprite = {
        type: string;
        x: number;
        y: number;
    };
    type Tile = Sprite[];

    function getTile(x: number, y: number): Tile;
    function tilesWith(...types: string[]): Tile[];
    function addSprite(x: number, y: number, type: string): void;
    function clearTile(x: number, y: number): void;
    function getAll(type?: string): Sprite[];
    function getFirst(type: string): Sprite;

    function color(template: TemplateStringsArray): Color;
    type AddTextOptions = {
        x?: number;
        y?: number;
        color?: Color;
    };

    function addText(text: string, options?: AddTextOptions): void;
    function clearText(): void;

    function tune(template: TemplateStringsArray): Tune;
    type Playback = {
        end: () => void;
    };

    function playTune(tune: Tune, repeats: number): Playback;
}

export {};
