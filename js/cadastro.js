function salvarDados() {
    let nome = document.getElementById("cNome").value
    let senha = document.getElementById("cSenha").value
    let email = document.getElementById("cEmail").value
    let dataNascimento = document.getElementById("cNasc").value
    let rua = document.getElementById("cRua").value
    let bairro = document.getElementById("cBai").value
    let quadra = document.getElementById("cQua").value
    let lote = document.getElementById("cLot").value
    let cidade = document.getElementById("cCid").value
    let estado = document.getElementById("cEst").value

    if (nome === "" || senha === "" || email === ""){
        alert("Por favor preencha os campos solicitados: Nome, Senha e Email.")
    }else {
        var confirmacao = confirm(
            `Estes são realmente os dados a serem enviados?
            Nome: ${nome}
            Email: ${email}
            Data de Nascimento: ${dataNascimento}
            Rua: ${rua}
            Bairro: ${bairro}
            Quadra: ${quadra}
            Lote: ${lote}
            Cidade: ${cidade}
            Estado: ${estado}`)
        if(confirmacao){
            alert("Seus dados foram enviados com sucesso!")
        }
    }

}