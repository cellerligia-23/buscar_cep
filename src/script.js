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
      };
     
    });
};

function  limparInputs() {

  inputEndereco.value = "";
  inputBairro.value = "";
  inputCidade.value = "";
  inputUf.value = "";

};

function pegarCepPesquisado(cep) {

  cepPesquisado.innerHTML = `Cep pesquisado: ${cep}`;

};

function validarDadosInput(cepInput) {

  const cepNumber = Number(cepInput.value);
  const cepLength = cepInput.value.length;

  if (isNaN(cepNumber) || cepLength !== 8) {

    cepPesquisado.innerHTML = `Cep pesquisado inválido`;
    cepPesquisado.style.color = "red";

    limparInputs();

  } else {

    buscarCepApi(cepInput.value);
    cepPesquisado.innerHTML = `Cep pesquisado: ${cepInput.value}`;
    cepPesquisado.style.color = "#004364";
    cepInput.value = "";

  };
  
};

button.addEventListener('click', () => {
  
  validarDadosInput(inputCep);

});

inputCep.addEventListener("keypress", (evento) => {

  if (evento.key === 'Enter') {

    evento.preventDefault();
    validarDadosInput(inputCep);

  };

}); 

