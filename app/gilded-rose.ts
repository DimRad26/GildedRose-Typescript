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

            let updateAmount = -1;

            if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                this.items[i].quality += updateAmount;
            } else {
                this.items[i].quality -= updateAmount;
                if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                    if (this.items[i].sellIn < 10) {
                        this.items[i].quality -= updateAmount;
                    }
                    if (this.items[i].sellIn < 5) {
                        this.items[i].quality -= updateAmount;
                    }
                }
            }

            // Handle Expired Items
            if (this.items[i].sellIn < 0) {
                if (this.items[i].name == 'Aged Brie') {
                    this.items[i].quality -= updateAmount;
                } else if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                    this.items[i].quality = 0;
                } else {
                    this.items[i].quality += updateAmount;
                }

            }

            this.items[i].quality = this.cap(this.items[i].quality);
        }

        return this.items;
    }
}
