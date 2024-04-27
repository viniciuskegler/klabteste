package com.example.demo.interfaces;

import java.sql.SQLException;
import java.util.Map;

//Comunicação com a camada de negócio da aplicação
public interface Produtos {

    public void insertProduct(Map<String, Object> product) throws RuntimeException;

    public Object getAllProducts() throws RuntimeException ;
}
