const transacaoUl = document.querySelector('#transacoes');
const displayTotal = document.querySelector('#balanco');
const displayRenda = document.querySelector('#real-mais');
const displayEstencao = document.querySelector('#real-menos');
const form = document.querySelector('#form');
const inputName = document.querySelector('#name');
const inputValor = document.querySelector('#valor');



const localStorageTransacoes = JSON.parse(localStorage.getItem('transacao'))
let transacao = localStorage.getItem('transacao') !== null ? localStorageTransacoes : []

const removerTransacoes = ID => {
    transacao.filter(transacoes => transacoes.id !== ID)
    atualizarLocalStorage()
    init()
} 

const adicionarTransacaoDom = transacoes => {
    const operador = transacoes.valor < 0 ? '-' : '+'
    const classeCss = transacoes.valor < 0 ? 'menos' : 'mais'
    const valorSemOperador = Math.abs(transacoes.valor)
    const li = document.createElement('li')

    li.classList.add(classeCss)
    li.innerHTML = `
        <span class="letter-first">${transacoes.name}</span> <span >${operador} R$ ${valorSemOperador}</span><button class="delete-button" title="Excluir" onClick="removerTransacoes(${transacoes.id})"><i class="bi bi-trash"></i></button>
    `
    transacaoUl.append(li)
}

const atualizarValores = () =>{
    const valorTransacoes = transacao.map(transacoes => transacoes.valor)
    const total = valorTransacoes.reduce((acumulador, transacoes) => acumulador + transacoes,0).toFixed(2)
    const renda = valorTransacoes.filter(value => value > 0).reduce((acumulador, value) => acumulador + value,0).toFixed(2)
    const estencao = Math.abs(valorTransacoes.filter(value => value < 0).reduce((acumulador, value) => acumulador + value,0)).toFixed(2)

    displayTotal.textContent = `R$ ${total}`
    displayRenda.textContent = `R$ ${renda}`
    displayEstencao.textContent = `R$ ${estencao}`
}


const init = () => {
    transacaoUl.innerHTML = ''
    transacao.forEach(adicionarTransacaoDom)
    atualizarValores()
}

init()

const atualizarLocalStorage = () => {
    localStorage.setItem('transacao', JSON.stringify('transacao'))
}

const aleatorioId = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()
    const transacoesName = inputName.value.trim()
    const transacoesValor = inputValor.value.trim()

    if(transacoesName === '' ||  transacoesValor === ''){
        alert('Por favor, preencha o nome e o valor da transação')
        return
    }

    const transacoes = { id:aleatorioId(), name: transacoesName, valor: Number(transacoesValor)}

    transacao.push(transacoes)  
    init()
    atualizarLocalStorage()
    
    inputName.value = ''
    inputValor.value = ''
})
