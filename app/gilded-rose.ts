// App
export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    private cap(quality: number) : number {
        if (quality < 0) quality = 0;
        if (quality > 50) quality = 50;
        return quality;
    }

    updateQuality() {
        const agedBrie: string = 'Aged Brie';
        const backstage: string = 'Backstage passes';
        const sulfuras: string = 'Sulfuras';
        const conjured: string = 'Conjured';
        for (let i = 0; i < this.items.length; i++) {
            // Handle Sulfuras
            if (this.items[i].name.startsWith(sulfuras))
                continue;

            // Handle Expiration Date - sellIn
            this.items[i].sellIn -= 1;

            var name = this.items[i].name;
            var quality = this.items[i].quality;
            var sellIn = this.items[i].sellIn;

            // Handle the update for each type of product
            let updateAmount: number = -1;
            let expirationCoeficient: number = sellIn < 0 ? 2 : 1;

            // Handle AgedBrie update amount
            if (name == agedBrie) {
                updateAmount = +1;
            }

            // Handle Backstage passes update amount - based on sellIn
            if (name.startsWith(backstage)) {
                updateAmount = +1;
                if (sellIn < 10)
                    expirationCoeficient = 2;
                if (sellIn < 5)
                    expirationCoeficient = 3;
                if (sellIn < 0) {
                    expirationCoeficient = -1;
                    updateAmount = quality;
                }
            }

            if (name.startsWith(conjured)) {
                expirationCoeficient *= 2;
            }

            this.items[i].quality = this.cap(quality + expirationCoeficient * updateAmount);
        }

        return this.items;
    }
}