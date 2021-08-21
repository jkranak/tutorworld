export const starRating = (rating: number): number[] => {
  rating = Math.round(rating * 2);
    const starArr: number[] = [];
      for (let i = 0; i < 5; i++) {
        if (rating >= 2) {
          starArr.push(2);
          rating -= 2;
        }
        else if (rating === 1) {
          starArr.push(1);
          rating -= 1;
        }
        else starArr.push(0);
      }
      return starArr;
}

export const starRatingWhole = (rating: number): number[] => {
  const starArr: number[] = [];
  for (let i = 0; i < 5; i++) {
    if (rating >= 1) {
      starArr.push(2);
      rating -= 1;
    } else starArr.push(0);
  }
  return starArr;
}