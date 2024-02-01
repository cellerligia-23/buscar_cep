const inputCep = document.querySelector("#input-cep");
const button = document.querySelector("#btn");
const cepPesquisado = document.querySelector("#cep-pesquisado");
let inputEndereco = document.querySelector("#logradouro");
let inputBairro = document.querySelector("#bairro");
let inputCidade = document.querySelector("#localidade");
let inputUf = document.querySelector("#uf");

const  buscarCepApi = (cep) => {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if(data.erro === true){

        alert("CEP informado não encontrado.");
        return;

      } else{
        inputEndereco.value = data.logradouro;
        inputBairro.value = data.bairro;
        inputCidade.value = data.localidade;
        inputUf.value = data.uf;
      }
      // console.log(data);
    });
};

function  limparInput() {
  inputCep.value = "";
};

function pegarCepPesquisado(cep) {
  cepPesquisado.innerHTML = `Cep pesquisado: ${cep}`;
};

function validarDadosInput (cepInput){
  if (!Number.isNaN(cepInput) || cepInput === "" || cepInput.length !== 8 ) {
    cepPesquisado.innerHTML = `Cep pesquisado inválido`;
    // cepPesquisado.style.color = "red";
    return
  } 
};

button.addEventListener('click', (evento) => {
  console.log(inputCep.value);
  validarDadosInput(inputCep.value)

  buscarCepApi(inputCep.value);

  pegarCepPesquisado(inputCep.value)
  limparInput()

  console.log(evento.which);
})

inputCep.addEventListener("keypress", (evento) => {
  if (evento.key === 'Enter') {
    evento.preventDefault();
    validarDadosInput(inputCep.value)

    buscarCepApi(inputCep.value);

    pegarCepPesquisado(inputCep.value)
    limparInput()
  }
}); 

