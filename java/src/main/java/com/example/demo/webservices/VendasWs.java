package com.example.demo.webservices;

import com.example.demo.interfaces.Produtos;
import com.example.demo.interfaces.Vendas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/vendas")
public class VendasWs {

    @Autowired
    private Vendas vendas;

    @GetMapping()
    public ResponseEntity<Object> getAllSales() {
        return ResponseEntity.ok(vendas.getAllSales());
    }

    @PostMapping()
    public ResponseEntity<?> createSale(@RequestBody Map<String, Object> sale) {
        vendas.insertSale(sale);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/produto/{productId}")
    public ResponseEntity<Object> getAllSalesByProduct(@PathVariable int productId) {
        return ResponseEntity.ok(vendas.getAllSalesByProduct(productId));
    }
}
