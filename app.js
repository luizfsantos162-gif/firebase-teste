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
  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');

  if (!nameInput.value || !ageInput.value) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  try {
    await db.collection('users').add({
      name: nameInput.value,
      age: Number.parseInt(ageInput.value, 10)
    });
    nameInput.value = '';
    ageInput.value = '';
  } catch (error) {
    console.error('Erro ao adicionar usuário: ', error);
  }
}

function listenToUsers() {
  db.collection('users').onSnapshot((querySnapshot) => {
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement('li');
      
      listItem.innerHTML = `
        <strong>${data.name}</strong> - ${data.age} anos 
        <button onclick="editData('${doc.id}', '${data.name}', ${data.age})">Editar</button>
        <button onclick="deleteData('${doc.id}')">Excluir</button>
      `;
      
      dataList.appendChild(listItem);
    });
  }, (error) => {
    console.error('Erro ao escutar alterações: ', error);
  });
}

async function editData(id, currentName, currentAge) {
  const newName = prompt('Novo nome:', currentName);
  const newAge = prompt('Nova idade:', currentAge);

  if (newName !== null && newAge !== null) {
    try {
      await db.collection('users').doc(id).update({
        name: newName,
        age: Number.parseInt(newAge, 10)
      });
      console.log('Documento atualizado com sucesso:', id);
    } catch (error) {
      console.error('Erro ao atualizar documento: ', error);
    }
  }
}

async function deleteData(id) {
  if (confirm('Deseja realmente excluir este usuário?')) {
    try {
      await db.collection('users').doc(id).delete();
      console.log('Documento removido com sucesso:', id);
    } catch (error) {
      console.error('Erro ao remover documento: ', error);
    }
  }
}

window.onload = listenToUsers;

window.addData = addData;
window.editData = editData;
window.deleteData = deleteData;
