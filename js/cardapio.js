if (document.readyState == 'loading') { //readyState detecta se o html ainda está carregando (loading) ou já terminou de carregar e pode começar o js
    document.addEventListener('DOMContentLoaded', ready) //addEventListener é um ouvidor de eventos, que vai ficar de olho no DOMContentLoaded que indica quando todos os elementos html foram carregados, quando carregar inicia o ready
  } else {
    ready() //quando o html estiver carregado inicia a função ready
  }
  
  var totalAmount = "0,00" //tem que ser uma variável global
  
  function ready() { //todos os ouvidores de evento ficam nessa função
    // Botão remover produto
    const removeCartProductButtons = document.getElementsByClassName("remove-product-button") // pega os elementos do botão remover
    for (var i = 0; i < removeCartProductButtons.length; i++) { //laço roda enquanto tiver botão remover
      removeCartProductButtons[i].addEventListener("click", removeProduct) //ouvir eventos de click, e quando clicar executa a função remover produto
    }
  
    // Mudança valor dos inputs
    const quantityInputs = document.getElementsByClassName("product-qtd-input") //o numero que está no input
    for (var i = 0; i < quantityInputs.length; i++) {
      quantityInputs[i].addEventListener("change", checkIfInputIsNull)// ouvidor para quando o usuário muda a quantidade de produtos
    }//o ouvidor vai ouvir o evento change, que é a mudança no input, e vai atualizar o total, com a função checkIfInputIsNull
  
    // Botão add produto ao carrinho
    const addToCartButtons = document.getElementsByClassName("addbutton") //quando clicar em adicionar ao carrinho
    for (var i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener("click", addProductToCart)// ouvidor do tipo click que vai levar pra função addProductToCart
    }
  
    // Botão comprar
    const purchaseButton = document.getElementsByClassName("purchase-button")[0] //criar uma variável para o botao finalizar compra 
    purchaseButton.addEventListener("click", makePurchase) //colocar um ouvidor para o click no botão, que vai chamar a função markePurchase
  }
  
  function removeProduct(event) { //vai remover o produto do carrinho quando a função for chamada
    event.target.parentElement.parentElement.remove() //parentElement é o elemento pai e .remove vai remover esse elemento pai
    updateTotal() //função para atualizar o valor total do carrinho
  }
  
  function checkIfInputIsNull(event) {//função para remover o produto se o valor do input for 0
    if (event.target.value === "0") {//se o valor do input for 0, é string pq value retorna string no js
      event.target.parentElement.parentElement.remove()//acessa o pai do pai do input e remove.
    }
    updateTotal()
  }
  
  function addProductToCart(event) { //para montar a linha do carrinho
    const button = event.target 
    const productInfos = button.parentElement.parentElement // o pai do pai do elemento button
    const productImage = productInfos.getElementsByClassName("product-image")[0].src //vai procurar dentro de productInfos a classe que tem product-imagem, e vai encontrar o src da imagem
    const productName = productInfos.getElementsByClassName("product-title")[0].innerText //mesma ideia da anterior, e vai pegar o texto do nome do produto
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText //mesma ideia da anterior, e vai pegar o texto do preço do produto
  
    const productsCartNames = document.getElementsByClassName("cart-product-title") //pega todos nos nomes dos produtos
    for (var i = 0; i < productsCartNames.length; i++) {
      if (productsCartNames[i].innerText === productName) { //ver se estou adicionando um produto que já estava antes
        productsCartNames[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++ //pega o input da quantidade é aumenta 1+
        updateTotal() //função de atualizar o valor do carrinho
        return //sair da função e não executar o restante dela, e não repetir o produto
      }
    }
    //criar um elemento utiliza .creatElement, nesse caso vai ser uma tr
    let newCartProduct = document.createElement("tr") //criar tabela com os produtos do carrinho, let pq o valor vai ser alterado
    newCartProduct.classList.add("cart-product") // o nome da classe da tr é cart-product, e o elemento dessa classe é adicionado nesse elemento
  
    newCartProduct.innerHTML = //colocar os elementos que eu preciso pra fazer uma tr, que é o item do carrinho, 
    //eu copio o código da tr que está no html
    // usa crase pq vai misturar string com variáveis
    //substitui as informações das variáveis com $ e as variáveis criadas no js
      `
        <td class="product-identification">
          <img src="${productImage}" alt="${productName}" class="cart-product-image">
          <strong class="cart-product-title">${productName}</strong>
        </td>
        <td>
          <span class="cart-product-price">${productPrice}</span>
        </td>
        <td>
          <input type="number" value="1" min="0" class="product-qtd-input">
          <button type="button" class="remove-product-button">Remover</button>
        </td>
      `
    
    const tableBody = document.querySelector(".cart-table tbody")//pegar a classe do elemento tbody
    tableBody.append(newCartProduct)//.append é responsável por adicionar um novo elemento na tabela do carrinho
    updateTotal()//atualizar o valor do carrinho sempre que adiciona um produto no carrinho
  
    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)//coloca os ouvidores para funcionar depois do adicionar
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)//o mesmo que o anterior
  }
  
  function makePurchase() { //função que roda quando clica no botao finalizar compra
    if (totalAmount === "0,00") { //carrinho vazio
      alert("Seu carrinho está vazio!") //cria um alerta com essa mensagem
    } else {   //carrinho tem produtos
      alert( //mensagem quando tem algo no carrinho:
        ` 
          Obrigado pela sua compra!
          Valor do pedido: R$${totalAmount}\n
          Volte sempre :)
        `
      )
  
      document.querySelector(".cart-table tbody").innerHTML = "" //para tirar tudo dentro do tbody quando finaliza o pagamento, .innerHTML igual a vazio tira tudo
      updateTotal()
    }
  }
  
  // Atualizar o valor total do carrinho
  function updateTotal() { //função para conseguir o valor total atualizado
    const cartProducts = document.getElementsByClassName("cart-product")
    totalAmount = 0 //variavel do total do carrinho
  
    for (var i = 0; i < cartProducts.length; i++) { //laço para analisar cada produto, ele continua até o numero total de produtos no carrinho
      const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".") //pegar o preço, replace para remover R$ e usar espaço, e remover , e colocar .
      const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value //pegar a quantidade de produto
  
      totalAmount += productPrice * productQuantity //o total do carrinho, com a multiplicação do preço pela quantidade e a soma das multiplicações
    }
    
    totalAmount = totalAmount.toFixed(2) //toFixed para arredondar duas casas decimais depois da vírgula
    totalAmount = totalAmount.replace(".", ",") //.replace para trocar , para .
    document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount // querySelector para selecionar a classe do total do carrinho
    //innerText para pegar o texto do totalAmount
  }