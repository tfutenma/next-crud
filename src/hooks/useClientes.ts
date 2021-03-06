import { useEffect, useState } from "react"
import ColecaoCliente from "../backend/db/ColecaoCliente"
import Cliente from "../core/Cliente"
import ClienteRepositorio from "../core/ClienteRepositorio"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useClientes(){
    const repo: ClienteRepositorio = new ColecaoCliente()
    const { formVisivel, tabelaVisivel, exibirForm, exibirTabela} = useTabelaOuForm()
    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
  
    useEffect(obterTodos, [])
  
    function obterTodos(){
      repo.obterTodos().then(clientes => {
        setClientes(clientes)
        exibirTabela()
      })
    }
  
    function selecionarCliente(cliente: Cliente){
      setCliente(cliente)
      exibirForm()
    }
  
    function excluirCliente(cliente: Cliente){
      repo.excluir(cliente)
      obterTodos()
    }
  
    function novoCliente(){
      setCliente(Cliente.vazio())
      exibirForm()
    }
  
    function salvarCliente(cliente: Cliente){
      repo.salvar(cliente)
      obterTodos()
    }

return {
    cliente,
    setCliente,
    clientes,
    setClientes,
    novoCliente,
    salvarCliente,
    selecionarCliente,
    excluirCliente,
    obterTodos,
    tabelaVisivel,
    formVisivel,
    exibirForm,
    exibirTabela,
}

}