export const countWords = (sentence) => {

  if(!sentence) {
    return 0
  }
  // Remove leading and trailing whitespaces
  const trimmedSentence = sentence.trim();

  // Split the sentence into an array of words
  const wordsArray = trimmedSentence.split(/\s+/);

  // Count the number of words
  return wordsArray.length;
}

 export const getAddressDetails = (place) => {
   const byType = (place.address_components || []).reduce(function (acc, data) {
     data.types.forEach(function (type) {
       acc[type] = data
     })
     return acc
   }, {})

   let result = {
     streetNumber: placeGet('street_number', false, byType),
     streetName: placeGet('route', false, byType),
     city: placeGet('locality', false, byType) ||
         placeGet('postal_town', false, byType) ||
         placeGet('sublocality', false, byType) ||
         placeGet('sublocality_level_1', false, byType) ||
         placeGet('neighborhood', false, byType) ||
         placeGet('administrative_area_level_3', false, byType) ||
         placeGet('administrative_area_level_2', false, byType),
     county: placeGet('administrative_area_level_2', false, byType),
     stateShort: placeGet('administrative_area_level_1', true, byType),
     stateLong: placeGet('administrative_area_level_1', false, byType),
     countryShort: placeGet('country', true, byType),
     countryLong: placeGet('country', false, byType),
     zipCode: placeGet('postal_code', false, byType)
   }

   return result
 }

const placeGet = (key, short, byType) => {
  if (!(key in byType)) return ''

  return short ? byType[key].short_name : byType[key].long_name
}