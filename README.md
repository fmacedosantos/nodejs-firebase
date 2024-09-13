# Front

### Dependências
- Criar um projeto no firebase
- Criar uma atenticação com email e senha
- Adicionar, pelo console do firebase, um novo usuário
- Registrar o projeto web nas configurações do mesmo

##### Na tela de login
- Importe o script "https://www.gstatic.com/firebasejs/10.13.1/firebase-app-compat.js" (caso nosso projeto fosse mais complexo, usaríamos https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js)
- Adicionar mais um script com as configurações do firebase, disponíveis na criação do projeto pelo console, após 
> // Your web app's Firebase configuration
- Depois, adicione:
> firebase.initializeApp(firebaseConfig);
- Para acessar as funções de autenticação, importe https://www.gstatic.com/firebasejs/10.13.1/firebase-auth-compat.js

Uma maneira de testarmos:
> console.log('antes'); </br>
  firebase.auth().signInWithEmailAndPassword('any@email.com', '1234').then(response => { </br>
    console.log('success', response);</br>
  }).catch(error => {</br>
    console.log('error', error); </br>
  });</br>
  console.log('depois');</br>

O console mostrará um erro. Agora, caso mudarmos os valores para os do usuário que criamos pelo console do firebase, dará sucesso.
# Back

### Dependências

> $ npm install express nodemon

> $ npm i firebase-admin

- Criar chave sdk no firebase e colar na raiz do projeto