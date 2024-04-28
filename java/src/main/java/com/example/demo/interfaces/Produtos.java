package com.example.demo.interfaces;

import java.util.Map;

//Comunicação com a camada de negócio da aplicação
public interface Produtos {

    public void insertProduct(Map<String, Object> product) throws RuntimeException;

    public Object getAllProducts() throws RuntimeException;

    public Object getProductById(int id) throws RuntimeException;

    public void updateProductQuantity(int id, Map<String, Object> data) throws RuntimeException;

    public void updateProductPriceDefects(int id, Map<String, Object> data) throws RuntimeException;
}
