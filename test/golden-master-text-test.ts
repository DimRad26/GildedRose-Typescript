import { Item, GildedRose } from '../app/gilded-rose';
import {expect} from "chai";

function testInn(items: Item[], days: number = 0) : number[] {
    let Inn: GildedRose = new GildedRose(items);
    let itemQualities : number[] = [];
    for (let i = 0; i < days; i++)
        Inn.updateQuality();

    for (let i = 0; i < Inn.items.length; i++)
        itemQualities.push(Inn.items[i].quality);

    return itemQualities;
}

describe('Gilded Rose Matser Golden Test', function () {

    it('Test Bunch - Full Inn', function() {
        let items: Item[] = [];
        // Usual Tests
        items.push(new Item("Peaches", 20, 25));
        items.push(new Item("Grapes", 10, 10));
        items.push(new Item("Apples", 10, 20));
        // Past Expiration Tests
        items.push(new Item("Pears", 5, 15));
        items.push(new Item("Apricots", 5, 20));
        items.push(new Item("Bananas", 5, 10));
        // Aged Brie Tests
        items.push(new Item("Aged Brie", 10, 10));
        items.push(new Item("Aged Brie", 10, 45));
        items.push(new Item("Aged Brie", 5, 40));
        // Sulfuras Tests
        items.push(new Item("Sulfuras, Hand of Ragnaros", 5, 40));
        items.push(new Item("Sulfuras, Hand of Ragnaros", 15, 200));
        items.push(new Item("Sulfuras, Hand of Ragnaros", -1, 15));
        // Backstage Passes Tests
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 10));
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 10));
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10));
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10));
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 40));
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30));
        // Conjured Tests
        /*
        items.push(new Item("Conjured Grapes", 10, 25));
        items.push(new Item("Conjured Apples", 10, 20));
        items.push(new Item("Conjured Apples", 10, 15));
        items.push(new Item("Conjured Pears", 5, 35));
        items.push(new Item("Conjured Apricots", 5, 30));
        items.push(new Item("Conjured Bananas", 5, 15));
        */

        // Expected Results
        const expectedResult : number[] = [/**Usual*/15, 0, 10,
                                           /**PastExp*/0, 5, 0,
                                           /**AgedBrie*/20, 50, 50,
                                           /**Sulfuras*/40, 200, 15,
                                           /**BackstagePasses*/20, 25, 35, 0, 50, 50
                                           /**Conjured*//*5, 0, 0, 5, 0, 0*/];

        expect(testInn(items, 10)).to.deep.equal(expectedResult);
    });

});