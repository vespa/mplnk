export const ApiPath = "http://code-challenge.maplink.com.br/coordinate";
export const GoogleAPIKey = "AIzaSyCSWdQQNI2QKO7Q9WOK2n6c39ygm63JNH8";
export const GoogleConfig = "https://maps.googleapis.com/maps/api/js?&language=en&key="+GoogleAPIKey+"&libraries=geometry,drawing,places&units=metric";
export const GothamBoundaries = () => {
    const boundaries = {
                        bottom_left: [
                            40.746422,
                            -73.994753
                            ],
                        top_right: [
                            40.763328,
                            -73.968039
                            ]
                        }
    const getRandomInRange = (from, to) => {
        return (Math.random() * (to - from) + from);
    }
    const lat = getRandomInRange(boundaries.top_right[0], boundaries.bottom_left[0]);
    const lng = getRandomInRange(boundaries.top_right[1], boundaries.bottom_left[1]);
    return {
        lat,
        lng
    }
}