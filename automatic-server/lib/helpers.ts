export const  shuffleArray = <T>(array: T[]) => {
    let copy: T[] = []
    let n = array.length
    let i = 0;
    
      while (n) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * array.length);
  
      // If not already shuffled, move it to the new array.
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }
  
    return copy;
  }

  export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
