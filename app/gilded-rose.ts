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

    private inBounds(quality: number) : boolean {
        return quality > 0 && quality < 50;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            // Handle Sulfuras
            if (this.items[i].name.startsWith('Sulfuras'))
                continue;

            // Handle Expiration Date - sellIn
            this.items[i].sellIn = this.items[i].sellIn - 1;

            if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (this.inBounds(this.items[i].quality)) {
                    this.items[i].quality = this.items[i].quality - 1;
                }
            } else {
                if (this.inBounds(this.items[i].quality)) {
                    this.items[i].quality = this.items[i].quality + 1
                    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].sellIn < 10) {
                            if (this.inBounds(this.items[i].quality)) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                        if (this.items[i].sellIn < 5) {
                            if (this.inBounds(this.items[i].quality)) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                    }
                }
            }

            // Handle Expired Items
            if (this.items[i].sellIn < 0) {
                if (this.items[i].name == 'Aged Brie') {
                    if (this.inBounds(this.items[i].quality)) {
                        this.items[i].quality = this.items[i].quality + 1
                    }
                } else if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                    this.items[i].quality = 0;
                } else {
                    if (this.inBounds(this.items[i].quality)) {
                        this.items[i].quality = this.items[i].quality - 1;
                    }
                }

            }
        }

        return this.items;
    }
}
