// This function will hold everything related to setting up our game
const setup = (function () {
  const shipFactory = (
    length,
  ) => {
    let damageTaken;
    let position;
    let sunk;

    return {
      length,
      hit(spotHit) {
        // We are going to iterate over all of the ships coordinates
        // If the hit coordinate matches the ships position, we add one to damage taken
        // We then call isSunk, then return true.
        for (const coordinate of this.position) {
          if (coordinate.x === spotHit.x && coordinate.y === spotHit.y) {
            this.damageTaken++;
            this.isSunk();
            return true;
          }
        }
      },
      isSunk() {
        if (this.length === this.damageTaken) {
          // I'm thinking of changing the color of the boat, maybe graying it out.
          this.sunk = true;
        }
      },
    }
  }

  const orderCoords = (num1, num2) => {
    return [num1, num2].sort((a, b) => a - b);
  };

  const shipPlacementFill = (shipPlacements) => {
    for (const ship of shipPlacements) {
      if (ship[0]) {
        // We want this to ignore the loop with ship 1 as it's only a 1 unit ship. It's a useless iteration.
        return;
      }
      const xCoords = orderCoords[ship[0].x, ship[1].x];
      const yCoords = orderCoords[ship[0].y, ship[1].y];

      const vertical = xCoords[0] === xCoords[1];

      if (vertical) {
        for (let i = yCoords[0] + 1; i < yCoords[1]; i++) {
          ship.push({ x: xCoords[0], y: i })
        }
      }
      else {
        for (let i = xCoords[0] + 1; i < xCoords[1]; i++) {
          ship.push({ x: i, y: yCoords[0] })
        }
      }
    }
  }

  const gameboardFactory = () => {
    let gameboard = [];
    for (let xValue = 1; xValue <= 6; xValue++) {
      for (let yValue = 1; yValue <= 6; yValue++) {
        gameboard.push({ x: xValue, y: yValue, shipID: null, spotHit: false });
      }
    }

    return {
      gameboard,
      getShipPlacements() {
        let shipPlacements = {};
        // We will indicate the steps to assign ship values when the DOM is made
        // We will also have =
        // alert("Ship's names are indicitive of their size (Ship 1 is 1 unit long, Ship 2 is 2 Units, and so on..)");
        // alert('Inputting an invalid ship position will cause errors!');
        for (let i = 1; i <= 5; i++) {
          if (i = 1) {
            let position = prompt('Give us the position of Ship ' + i).split(' ');
            shipPlacements[`ship${i}`] = [{ x: position[0], y: position[1] }];
          }
          else {
            let startingPosition = prompt('Give us the starting position of Ship ' + i).split(' ');
            let endingPosition = prompt('Give us the ending position of Ship ' + i).split(' ');
            shipPlacements[`ship${i}`] = [{ x: startingPosition[0], y: startingPosition[1] }, { x: endingPosition[0], y: endingPosition[1] }];
          }
        }
        return shipPlacements;
      },
      receiveAttack(xValue, yValue, enemyShips, enemyGameBoard) {
        enemyGameBoard.forEach(coordinate => {
          if (coordinate.x === xValue && coordinate.y === yValue && coordinate.spotHit === false) {
            if (coordinate.spotHit === false) {
              coordinate.spotHit = true;
              enemyShips.hit({ x: xValue, y: yValue });
            }
          }
        })
      }
    }
  }
  //      1  2  3  4  5  6 x
  //  1  A1 B1 C1 D1 E1 F1
  //  2  A2 B2 C2 D2 E2 F2
  //  3  A3 B3 C3 D3 E3 F3
  //  4  A4 B4 C4 D4 E4 F4 
  //  5  A5 B5 C5 D5 E5 F5
  //  6  A6 B6 C6 D6 E6 F6
  //  y

  const samplePositions = {
    ship1: [{ x: 1, y: 1 }, { x: 1, y: 1 }],
    ship2: [{ x: 1, y: 1 }, { x: 1, y: 2 }],
    ship3: [{ x: 1, y: 3 }, { x: 1, y: 6 }],
    ship4: [{ x: 2, y: 2 }, { x: 2, y: 6 }],
    ship5: [{ x: 3, y: 1 }, { x: 1, y: 5 }],
    ship6: [{ x: 4, y: 1 }, { x: 4, y: 6 }]
  }





  return {
    shipFactory,
    gameboardFactory,
    getShipPlacements,
    orderCoords,
    samplePositions,
  }
})();

export {
  setup,
}