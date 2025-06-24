import {Transport, PlanetT} from '../types'
export class GameService {

  static findNearestPlanet(planets: PlanetT[], currentPlanetId: number | null, allPlanets: PlanetT[]) {
    let minPath: number = Infinity;
    let nearestPlanet: PlanetT | null = null;
    let shortPath: number = 0;

    for (const planet of planets) {
      const pathLength = this.calcPathLength(planet, currentPlanetId, allPlanets);
      if (pathLength === null) continue;

      if (pathLength < minPath) {
        minPath = pathLength;
        nearestPlanet = planet;
        shortPath = pathLength;
      }
    }
    return nearestPlanet ? { nearestPlanet, shortPath } : null;
  }

  static calcPathLength(planet: PlanetT, currentPlanetId: number | null, allPlanets: PlanetT[]){
    if (!currentPlanetId) {
      const allPaths=planet.paths
      return Math.min(...allPaths)
    }
    const pathProperty = `pathsPlanet${planet.id}`;
    const paths = allPlanets[currentPlanetId - 1][pathProperty];
    return paths?.[0];
  }

  static generatePermutations(arr: any[], permutation: any[] = [], used: boolean[] = [], callback: (perm: any[]) => void) {
    if (permutation.length === arr.length) {
      callback(permutation);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (!used[i]) {
        used[i] = true;
        permutation.push(arr[i]);
        this.generatePermutations(arr, permutation, used, callback);
        permutation.pop();
        used[i] = false;
      }
    }
  }

  static processPermutations(transports: Transport[], planets: PlanetT[]) {
    const results: { permutation: number[]; total: number }[] = [];
    const permutations: Transport[][] = [];

    this.generatePermutations(transports.slice(0, 3), [], [], (permutation) => {
      permutations.push([...permutation]);
    });

    for (const permutation of permutations) {
      const planetsCopy = planets.map(planet => ({ ...planet }));
      let totalSum = 0;

      for (const transport of permutation) {
        const transportCopy = { ...transport };
        let capacity = transportCopy.capacity;
        let currentPlanetId: number | null = null;
        let routeLength = 0;

        while (capacity > 0) {
          const availablePlanets = planetsCopy.filter(planet => planet.countPerson > 0);
          if (availablePlanets.length === 0) break;

          const nearest = this.findNearestPlanet(availablePlanets, currentPlanetId, planetsCopy);
          if (!nearest) break;

          const numPerson = Math.min(capacity, nearest.nearestPlanet.countPerson);
          nearest.nearestPlanet.countPerson -= numPerson;
          capacity -= numPerson;
          routeLength += nearest.shortPath;
          currentPlanetId = nearest.nearestPlanet.id;
        }

        totalSum += routeLength;
      }

      results.push({
        permutation: permutation.map(t => t.id),
        total: totalSum
      });
    }

    console.log(Math.min(...results.map(res => res.total)));
    return Math.min(...results.map(res => res.total));
  }
}