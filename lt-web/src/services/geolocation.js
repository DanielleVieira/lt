// fonte: https://github.com/firebase/snippets-web/blob/36740fb2c39383621c0c0a948236e9eab8a71516/firestore/test.solution-geoqueries.js#L13-L29
// Com modificações
import {
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { db } from "./firebase";
const geofire = require("geofire-common");

export const generateHash = (lat, lng) => {
  const hash = geofire.geohashForLocation([lat, lng]);
  return {
    geohash: hash,
    lat: lat,
    lng: lng,
  };
};

export const geoQueryShelters = (center, radiusInKm, done) => {
  const radiusInM = radiusInKm * 1000;

  const bounds = geofire.geohashQueryBounds(center, radiusInM);
  const promises = [];
  try {
    for (const b of bounds) {
      const q = query(
        collection(db, "shelters"),
        orderBy("location.geohash"),
        startAt(b[0]),
        endAt(b[1]),
        limit(100)
      );
      promises.push(getDocs(q));
    }
    Promise.all(promises)
      .then((snapshots) => {
        const matchingDocs = [];
        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            const lat = doc.data().location.lat;
            const lng = doc.data().location.lng;

            const distanceInKm = geofire.distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
              matchingDocs.push(doc);
            }
          }
        }

        return matchingDocs;
      })
      .then((matchingDocs) => {
        done(matchingDocs);
      });
  } catch (error) {
    console.log(error);
  }
};
