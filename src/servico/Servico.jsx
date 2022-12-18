import React, { useEffect, useState } from 'react';
import './Servico.css';
import axios from 'axios';

function Servico() {

    const [servico, setServico] = useState({
        nomeCliente: '',
        dataInicio: '',
        dataTermino: '',
        descricao: '',
        valorServico: '',
        valorPago: '',
        dataPagamento: '',
    });

    function limpar(){
        setServico({
            nomeCliente: '',
            dataInicio: '',
            dataTermino: '',
            descricao: '',
            valorServico: '',
            valorPago: '',
            dataPagamento: '',
        });
    }

    const [servicos, setServicos] = useState([]);

    const [atualizar, setAtualizar] = useState();

    useEffect(()=>{
        buscarTodos();
    },[atualizar]);

    function handleChange(event) {
        setServico({ ...servico, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(servico.id === undefined){
            axios.post("http://localhost:8089/api/servico/", servico).then((result) => {
                setAtualizar(result);
            });
        } else{
            axios.put("http://localhost:8089/api/servico/", servico).then((result) => {
                setAtualizar(result);
            });
        }
        limpar();
    }

    function excluir(id){
        axios.delete("http://localhost:8089/api/servico/" + id).then(result =>{
            setAtualizar(result)
        });
    }
    function cancelar(id){
        axios.post("http://localhost:8089/api/servico/" + id).then(result =>{
            setAtualizar(result)
        });
    }

    function buscarTodos(){
        axios.get("http://localhost:8089/api/servico/").then(result=>{
            setServicos(result.data);
        });
    } 

    function buscarPagamentosPendentes(){

        axios.get("http://localhost:8089/api/servico/pendentes").then(result => {
            setServicos(result.data);
        });

    }

    function buscarCancelados(){

        axios.get("http://localhost:8089/api/servico/cancelados").then(result => {
            setServicos(result.data);
        });

    }


    return (
        <div className="container">
            <h1>Cadastro de Serviços</h1>
            <form onSubmit={handleSubmit}>
                <div className='col-6'>
                    <div>
                        <label className="form-label">Nome do Cliente</label>
                        <input onChange={handleChange} value={servico.nomeCliente} name='nomeCliente' type="text" className="form-control" />
                    </div>
                    <div>
                        <label className="form-label">Data de Inicio</label>
                        <input onChange={handleChange} value={servico.dataInicio || ''} name='dataInicio' type="date" className="form-control" />
                    </div>
                    <div>
                        <label className="form-label">Data de Termino</label>
                        <input onChange={handleChange} value={servico.dataTermino || ''} name='dataTermino' type="date" className="form-control" />
                    </div>
                    <div>
                        <label className="form-label">Descrição</label>
                        <input onChange={handleChange} value={servico.descricao || ''} name='descricao' type="text" className="form-control" />
                    </div>
                    <div>
                        <label className="form-label">Valor do Serviço</label>
                        <input onChange={handleChange} value={servico.valorServico || ''} name='valorServico' type="number" className="form-control" />
                    </div>
                    <div>
                        <label className="form-label">Valor Pago</label>
                        <input onChange={handleChange} value={servico.valorPago || ''} name='valorPago' type="number" className="form-control" />
                    </div>
                    <div>
                        <label className="form-label">Data de Pagamento</label>
                        <input onChange={handleChange} value={servico.dataPagamento || ''} name='dataPagamento' type="date" className="form-control" />
                    </div>
                    <br />
                    <input type="submit" value="Cadastrar" className="btn btn-success"></input>
                </div>
            </form>
            <br/><br/>
            <button onClick={buscarTodos} type="button" class="btn btn-outline-primary">Listar Todos</button>
            <button onClick={buscarPagamentosPendentes} type="button" class="btn btn-outline-secondary">Serviços Pendentes</button>
            <button onClick={buscarCancelados} type="button" class="btn btn-outline-success">Serviços Cancelados</button>
            <hr /><hr />

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Status</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        servicos.map(serv => (                           
                        <tr key={serv.id}>
                            <td>{serv.nomeCliente}</td>
                            <td>{serv.descricao}</td>
                            <td>{serv.valorServico}</td>
                            <td>{serv.status}</td>
                            <td>
                                {serv.status!=='Cancelado' &&
                                <button onClick={()=>setServico(serv)} className="btn btn-primary">Atualizar</button>
                                }&nbsp;&nbsp;
                                <button onClick={()=>excluir(serv.id)} className="btn btn-danger">Excluir</button>&nbsp;&nbsp;
                                {serv.status!=='Cancelado' &&
                                <button onClick={()=>cancelar(serv.id)} className="btn btn-warning">Cancelar</button>
                                }

                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Servico;
