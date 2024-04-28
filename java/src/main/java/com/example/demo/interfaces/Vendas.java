package com.example.demo.interfaces;

import java.util.Map;

public interface Vendas {

    public void insertSale(Map<String, Object> sale) throws RuntimeException;

    public Object getAllSales() throws RuntimeException;

    public Object getAllSalesByProduct(int productId) throws RuntimeException;
}
