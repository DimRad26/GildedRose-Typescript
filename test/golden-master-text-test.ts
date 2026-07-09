import { Item, GildedRose } from '../app/gilded-rose';
import {expect} from "chai";

function printInn(Inn: GildedRose) : void {
    let items = Inn.items;
    for (let i = 0; i < items.length; i++) {
        console.log(items[i].name, ": RemainingDays:", items[i].sellIn, "Quality:", items[i].quality);
    }
}

function testInn(Inn: GildedRose, days: number = 0) : number[] {
    let itemQualities : number[] = [];
    for (let i = 0; i < days; i++)
        Inn.updateQuality();

    for (let i = 0; i < Inn.items.length; i++)
        itemQualities.push(Inn.items[i].quality);

    return itemQualities;
}

function testItemQuality(item: Item, days: number = 0) : number {
    let Inn = new GildedRose([item]);
    for (let i = 0; i < days; i++)
        Inn.updateQuality();

    let updatedItem = Inn.items[0];
    return updatedItem.quality;
}

describe('Gilded Rose Matser Golden Test', function () {

    it('Test Bunch - Full Inn', function() {
        const gildedRose = new GildedRose([]);
        // Usual Tests
        gildedRose.items.push(new Item("Peaches", 20, 25));
        gildedRose.items.push(new Item("Grapes", 10, 10));
        gildedRose.items.push(new Item("Apples", 10, 20));
        gildedRose.items.push(new Item("Pineapples", 0, -20));
        gildedRose.items.push(new Item("Mangoes", 0, 200));
        // Past Expiration Tests
        gildedRose.items.push(new Item("Pears", 5, 15));
        gildedRose.items.push(new Item("Apricots", 5, 20));
        gildedRose.items.push(new Item("Bananas", 5, 10));
        // Aged Brie Tests
        gildedRose.items.push(new Item("Aged Brie", 10, 10));
        gildedRose.items.push(new Item("Aged Brie", 10, 45));
        // Sulfuras Tests
        gildedRose.items.push(new Item("Sulfuras", 5, 40));
        gildedRose.items.push(new Item("Sulfuras", 15, 200));
        gildedRose.items.push(new Item("Sulfuras", -1, 15));
        // Backstage Passes Tests
        gildedRose.items.push(new Item("Backstage passes", 20, 10));
        gildedRose.items.push(new Item("Backstage passes", 15, 10));
        gildedRose.items.push(new Item("Backstage passes", 12, 10));
        gildedRose.items.push(new Item("Backstage passes", 10, 10));
        gildedRose.items.push(new Item("Backstage passes", 5, 10));
        // Conjured Tests
        gildedRose.items.push(new Item("Conjured Grapes", 10, 25));
        gildedRose.items.push(new Item("Conjured Apples", 10, 20));
        gildedRose.items.push(new Item("Conjured Apples", 10, 15));
        gildedRose.items.push(new Item("Conjured Pears", 5, 35));
        gildedRose.items.push(new Item("Conjured Apricots", 5, 30));
        gildedRose.items.push(new Item("Conjured Bananas", 5, 15));

        // Expected Results
        const expectedResult : number[] = [/**Usual*/15, 0, 10, 0, 40,
                                           /**PastExp*/0, 5, 0,
                                           /**AgedBrie*/20, 50,
                                           /**Sulfuras*/40, 200, 15,
                                           /**BackstagePasses*/20, 25, 31, 0, 0,
                                           /**Conjured*/5, 0, 0, 5, 0, 0];

        expect(testInn(gildedRose, 10)).to.deep.equal(expectedResult);
    });

});