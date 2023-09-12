
const botao = document.querySelector('#botao');
const adicionarItem = document.querySelector('#addItem');
const listaCompleta = document.querySelector('.lista-tarefas');

let minhaLista = []

function adicionarNovaTarefa() {

    if (adicionarItem.value == ''){
        alert('O campo não pode ser vazio.')
    } else {
    minhaLista.push({
        tarefa: adicionarItem.value,
        concluida: false

    });
    
    adicionarItem.value = ''

    mostrarTarefas()
}}

function mostrarTarefas (){
    let adicionarLI = ''

    minhaLista.forEach((novaTarefa, posicao) => {
        adicionarLI = adicionarLI +
        `    
        <li class="tarefa ${novaTarefa.concluida && "done"}">
            ${novaTarefa.tarefa}
            <div class="imagens">
            <img src="./imagens/delete.png" class="deletar" onclick="deletarItem(${posicao})">
            <img src="./imagens/completar.png" class="completar" onclick="completarItem(${posicao})">
        </div>
        </li>
        `
    })

    listaCompleta.innerHTML = adicionarLI

    localStorage.setItem('guardarLista', JSON.stringify(minhaLista))
}
function deletarItem(posicao) {
    minhaLista.splice(posicao, 1);

    mostrarTarefas();
}
function completarItem(posicao) {
    minhaLista[posicao].concluida = !minhaLista[posicao].concluida;
    document.querySelector('.completar').src = "./imagens/completo.png";

    mostrarTarefas();
}

function recarregarTarefas () {
    const tarefasLocalStorage = localStorage.getItem('guardarLista')
    if (tarefasLocalStorage) {
    minhaLista = JSON.parse(tarefasLocalStorage)
    }
    mostrarTarefas()
}
recarregarTarefas()
botao.addEventListener('click', (evento) =>{
    evento.preventDefault();
    adicionarNovaTarefa(); })
