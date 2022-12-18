package com.servico.backservice.service;

import com.servico.backservice.entity.Servico;
import com.servico.backservice.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

    public List<Servico> buscarTodos(){

        return servicoRepository.findAll();
    }

    public List<Servico> buscarServicosPagamentoPendente(){
        return servicoRepository.buscarServicosPagamentoPendente();
    }

    public List<Servico> buscarServicosCancelados(){
        return servicoRepository.buscarServicosCancelados();
    }

    public Servico inserir(Servico servico){
        //return servicoRepository.save(servico);
        if(servico.getValorPago() == null || servico.getValorPago() == 0 || servico.getDataPagamento() == null){
            servico.setStatus("Pendente");
        }else{
            servico.setStatus("Realizado");
        }
        Servico servicoBanco = servicoRepository.saveAndFlush(servico);
        return servicoBanco;
    }

    public Servico alterar(Servico servico){
        if(servico.getValorPago() != null && servico.getValorPago() > 0 && servico.getDataPagamento() != null){
            servico.setStatus("Realizado");
        }
        return servicoRepository.saveAndFlush(servico);
    }

    public void cancelar(Long id){
        Servico servico = servicoRepository.findById(id).get();
        servico.setStatus("Cancelado");
        servicoRepository.saveAndFlush(servico);
    }

    public void excluir(Long id){
        Servico servico = servicoRepository.findById(id).get();
        servicoRepository.delete(servico);
    }
}
