const firebaseConfig = {
  apiKey: "AIzaSyCtqLm88zrejzPfr7hofLAALgN-3nw2pao",
  authDomain: "senai-teste-4c16c.firebaseapp.com",
  projectId: "senai-teste-4c16c",
  storageBucket: "senai-teste-4c16c.firebasestorage.app",
  messagingSenderId: "485222722251",
  appId: "1:485222722251:web:cf5b9037b25e950b43494e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ experimentalForceLongPolling: true });

async function addData() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  try {
    const docRef = await db.collection('users').add({
      name: name,
      age: Number.parseInt(age, 10)
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

async function getData() {
  try {
    const querySnapshot = await db.collection('users').get();
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement('li');
      listItem.textContent = `${data.name}, ${data.age}`;
      dataList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

window.addData = addData;
window.getData = getData;
