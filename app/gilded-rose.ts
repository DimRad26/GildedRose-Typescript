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
        for (let i = 0; i < this.items.length; i++) {
            // Handle Expiration Date - sellIn
            this.items[i].sellIn -= 1;

            var name = this.items[i].name;
            var quality = this.items[i].quality;
            var sellIn = this.items[i].sellIn;

            // Handle Sulfuras
            if (name.startsWith('Sulfuras'))
                continue;

            // Handle the update for each type of product
            let updateAmount: number = -1;
            let expirationCoeficient: number = sellIn < 0 ? 2 : 1;

            // Handle AgedBrie update amount
            if (name == 'Aged Brie') {
                updateAmount = +1;
            }

            // Handle Backstage passes update amount - based on sellIn
            if (name.startsWith('Backstage passes')) {
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

            this.items[i].quality = this.cap(quality + expirationCoeficient * updateAmount);
        }

        return this.items;
    }
}