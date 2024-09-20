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

O console mostrará um erro. Agora, caso mudarmos os valores para os do usuário que criamos pelo console do firebase, dará sucesso. Depois disso, é necessário mudar essa lógica de autenticação para o arquivo javascript responsável pela tela de login e receber, ao clicar no botão 'Entrar', em vez de valores estáticos, os colocados nos inputs.

No nosso caso, ficou assim:
> function login() { </br>
    firebase.auth().signInWithEmailAndPassword( </br>
        form.email().value, form.password().value</br>
    ).then(response => {</br>
        window.location.href = './pages/home/home.html';</br>
    }).catch(error => {</br>
        alert(getErrorMessage(error))</br>
    });</br>
}

Criamos uma função para mostrar uma mensagem de erro mais amigável ao usuário:
> function getErrorMessage(error){</br>
    if(error.code == 'auth/invalid-credential'){</br>
        return 'Usuário não encontrado!'</br>
    } else {</br>
        return error.message;</br>
    }</br>
}

# Back

### Dependências

> $ npm install express nodemon

> $ npm i firebase-admin

- Criar chave sdk no firebase e colar na raiz do projeto

> $ npm install --save-dev jest

- Alterar em package.json:

> "scripts": { <br/>
    "test": "jest", <br/>
    "test:dev": "jest --watch=true", <br/>
    "start": "nodemon ./index.js localhost 3000"<br/>
  },

  - Criar a pasta de testes e criar o arquivo de teste
  __tests__/model.spec.js
  - Criar o teste
  - Rodar: 
  > $ npm run test:dev