import t from 'services/actionTypes';

export default {
  sendContactUsFormDetails ({commit}, payload) {
    console.log('Contact Us data has been sending => ', JSON.stringify(payload));
    postData('https://example.com', payload)
      .finally(() => {
        commit(t.CONTACT_US_SEND_FORM_DETAILS, payload);
      });
  }
}

function postData (url = '', data = {}) {
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })
}
