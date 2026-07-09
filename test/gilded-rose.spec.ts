import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

function testItemQuality(item: Item, days: number = 0) : number {
    let Inn = new GildedRose([item]);
    for (let i = 0; i < days; i++)
        Inn.updateQuality();

    let updatedItem = Inn.items[0];
    return updatedItem.quality;
}

describe('Gilded Rose Unit Tests', function () {

    it('Test testing', function() {
        const item = new Item("Nothing", 0, 0);
        const expectedQuality = 0;
        expect(testItemQuality(item, 0)).to.equal(expectedQuality);
    });

    it('Test Sulfuras', function() {
        const item = new Item("Sulfuras, Hand of Ragnaros", 50, 10);
        const expectedQuality = 10;
        expect(testItemQuality(item, 20)).to.equal(expectedQuality);
    });

    it('Test IsBounded', function() {
        const item1 = new Item("Aged Brie", 50, 45);
        const item2 = new Item("Apples", 50, 5);
        const expectedQuality = [50, 0];
        expect([testItemQuality(item1, 10), testItemQuality(item2, 10)])
            .to.deep.equal(expectedQuality);
    });

});