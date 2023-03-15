import { setup } from '../src/index.js';

let gameboardP1 = setup.gameboardFactory();
let shipsP1 = setup.shipFactory();

describe.skip('shipFactory functionality', () => {
  let ship = setup.shipFactory(1);
  ship.position = [{ x: 1, y: 1 }];
  ship.isHit({ x: 1, y: 1 });

  let ship2 = setup.shipFactory(3);
  ship2.position = [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }];

  // Ship Factory Function
  test('Returns a ship object', () => {
    expect(setup.shipFactory()).toEqual({
      length, damageTaken, position, isHit, isSunk
    });
  });

  // isHit method
  test('isHit will return true on actual hit', () => {
    expect(ship.isHit({ x: 1, y: 1 })).toBe(true);
  });

  // isSunk method
  test('isSunk will add a sunk = true property on sunken ship', () => {
    expect(ship.sunk).toBe(true);
  });

  test("isSunk will not change on a not sunk ship", () => {
    expect(ship2.isSunk()).toBe(undefined);
  })

  // damageTaken property
  test('ship.damageTaken should = 1', () => {
    expect(ship.damageTaken).toBe(1);
  });
})

describe('gameboardFactory functionality', () => {

  test.skip('Expecting gameboardFactory to return an array', () => {
    expect(setup.gameboardFactory()).toBe(['x : 1 y : 1']);
  })

  test.skip('expecting orderCoords to return ordered coords, least to greatest', () => {
    expect(setup.orderCoords(5, 1)).toStrictEqual([1, 5]);
  })

  test.skip('shipPlacer works with correctly ordered coords', () => {
    expect(setup.shipPlacer([{ x: 1, y: 1 }, { x: 1, y: 3 }])).toBe([{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }]);
  })

  test('receiveAttack works by going through gameBoard', () => {

    expect()
  })
})
