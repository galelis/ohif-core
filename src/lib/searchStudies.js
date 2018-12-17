import { Meteor } from '';

const studySearchPromises = new Map();

/**
 * Search for studies information by the given filter
 *
 * @param {Object} filter Filter that will be used on search
 * @returns {Promise} resolved with an array of studies information or rejected with an error
 */
OHIF.studies.searchStudies = filter => {
  const promiseKey = JSON.stringify(filter);
  if (studySearchPromises.has(promiseKey)) {
    return studySearchPromises.get(promiseKey);
  } else {
    const promise = new Promise((resolve, reject) => {
      const server = OHIF.servers.getCurrentServer();

      if (
        server.type === 'dicomWeb' &&
        server.requestOptions.requestFromBrowser === true
      ) {
        OHIF.studies.services.QIDO.Studies(server, filter).then(
          resolve,
          reject
        );
      }
    });
    studySearchPromises.set(promiseKey, promise);
    return promise;
  }
};
