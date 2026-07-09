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
            // Handle Sulfuras
            if (this.items[i].name.startsWith('Sulfuras'))
                continue;

            // Handle Expiration Date - sellIn
            this.items[i].sellIn = this.items[i].sellIn - 1;

            // Handle the update for each type of product
            let updateAmount: number = -1;
            let expirationCoeficient: number = this.items[i].sellIn < 0 ? 2 : 1;

            // Handle AgedBrie update amount
            if (this.items[i].name == 'Aged Brie') {
                updateAmount = +1;
            }

            // Handle Backstage passes update amount - based on sellIn
            if (this.items[i].name.startsWith('Backstage passes')) {
                updateAmount = +1;
                if (this.items[i].sellIn < 10)
                    expirationCoeficient = 2;
                if (this.items[i].sellIn < 5)
                    expirationCoeficient = 3;
                if (this.items[i].sellIn < 0) {
                    expirationCoeficient = -1;
                    updateAmount = this.items[i].quality;
                }
            }

            this.items[i].quality += expirationCoeficient * updateAmount;
            this.items[i].quality = this.cap(this.items[i].quality);
        }

        return this.items;
    }
}